-- Function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment article views
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles 
  SET views = views + 1 
  WHERE id = article_id;
  
  -- Log analytics
  INSERT INTO analytics (article_id, event_type, user_id)
  VALUES (article_id, 'view', auth.uid());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to toggle article like
CREATE OR REPLACE FUNCTION toggle_article_like(article_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_id UUID := auth.uid();
  like_exists BOOLEAN;
BEGIN
  -- Check if like exists
  SELECT EXISTS(
    SELECT 1 FROM article_likes 
    WHERE article_likes.article_id = toggle_article_like.article_id 
    AND article_likes.user_id = toggle_article_like.user_id
  ) INTO like_exists;
  
  IF like_exists THEN
    -- Remove like
    DELETE FROM article_likes 
    WHERE article_likes.article_id = toggle_article_like.article_id 
    AND article_likes.user_id = toggle_article_like.user_id;
    
    -- Decrement likes count
    UPDATE articles 
    SET likes = likes - 1 
    WHERE id = toggle_article_like.article_id;
    
    RETURN FALSE;
  ELSE
    -- Add like
    INSERT INTO article_likes (article_id, user_id)
    VALUES (toggle_article_like.article_id, toggle_article_like.user_id);
    
    -- Increment likes count
    UPDATE articles 
    SET likes = likes + 1 
    WHERE id = toggle_article_like.article_id;
    
    -- Log analytics
    INSERT INTO analytics (article_id, event_type, user_id)
    VALUES (toggle_article_like.article_id, 'like', toggle_article_like.user_id);
    
    RETURN TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search articles
CREATE OR REPLACE FUNCTION search_articles(
  search_query TEXT,
  category_filter UUID DEFAULT NULL,
  tag_filter UUID DEFAULT NULL,
  limit_count INTEGER DEFAULT 20,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  excerpt TEXT,
  featured_image TEXT,
  reading_time INTEGER,
  views INTEGER,
  likes INTEGER,
  published_at TIMESTAMP WITH TIME ZONE,
  author_name TEXT,
  author_avatar TEXT,
  category_name TEXT,
  category_color TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.featured_image,
    a.reading_time,
    a.views,
    a.likes,
    a.published_at,
    p.full_name as author_name,
    p.avatar_url as author_avatar,
    c.name as category_name,
    c.color as category_color,
    ts_rank(to_tsvector('english', a.title || ' ' || a.excerpt || ' ' || a.content), plainto_tsquery('english', search_query)) as rank
  FROM articles a
  JOIN profiles p ON a.author_id = p.id
  LEFT JOIN categories c ON a.category_id = c.id
  WHERE 
    a.status = 'published'
    AND (
      search_query IS NULL OR search_query = '' OR
      to_tsvector('english', a.title || ' ' || a.excerpt || ' ' || a.content) @@ plainto_tsquery('english', search_query)
    )
    AND (category_filter IS NULL OR a.category_id = category_filter)
    AND (
      tag_filter IS NULL OR 
      EXISTS (
        SELECT 1 FROM article_tags at 
        WHERE at.article_id = a.id AND at.tag_id = tag_filter
      )
    )
  ORDER BY 
    CASE WHEN search_query IS NOT NULL AND search_query != '' THEN rank END DESC,
    a.published_at DESC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get article recommendations
CREATE OR REPLACE FUNCTION get_article_recommendations(
  article_id UUID,
  limit_count INTEGER DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  excerpt TEXT,
  featured_image TEXT,
  reading_time INTEGER,
  views INTEGER,
  likes INTEGER,
  published_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.featured_image,
    a.reading_time,
    a.views,
    a.likes,
    a.published_at
  FROM articles a
  WHERE 
    a.status = 'published'
    AND a.id != article_id
    AND (
      -- Same category
      a.category_id = (SELECT category_id FROM articles WHERE id = article_id)
      OR
      -- Shared tags
      EXISTS (
        SELECT 1 FROM article_tags at1
        JOIN article_tags at2 ON at1.tag_id = at2.tag_id
        WHERE at1.article_id = article_id AND at2.article_id = a.id
      )
    )
  ORDER BY 
    a.views DESC,
    a.likes DESC,
    a.published_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

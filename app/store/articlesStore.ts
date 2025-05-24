import { create } from 'zustand';
import { supabase, type Article, type Category, type Tag } from '../lib/supabase';

interface ArticleWithDetails extends Article {
  author: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  category: Category;
  tags: Tag[];
}

interface ArticlesState {
  articles: ArticleWithDetails[];
  featuredArticles: ArticleWithDetails[];
  categories: Category[];
  tags: Tag[];
  loading: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  selectedTag: string | null;

  // Actions
  fetchArticles: (filters?: {
    category?: string;
    tag?: string;
    search?: string;
    featured?: boolean;
    limit?: number;
    offset?: number;
  }) => Promise<void>;
  fetchFeaturedArticles: () => Promise<void>;
  fetchAllArticles: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;
  fetchArticleBySlug: (slug: string) => Promise<ArticleWithDetails | null>;
  incrementViews: (articleId: string) => Promise<void>;
  toggleLike: (articleId: string) => Promise<void>;
  createArticle: (articleData: any) => Promise<{ success: boolean; error?: string; data?: any }>;
  updateArticle: (id: string, articleData: any) => Promise<{ success: boolean; error?: string }>;
  deleteArticle: (id: string) => Promise<{ success: boolean; error?: string }>;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedTag: (tag: string | null) => void;
  clearFilters: () => void;
}

export const useArticlesStore = create<ArticlesState>((set, get) => ({
  articles: [],
  featuredArticles: [],
  categories: [],
  tags: [],
  loading: false,
  searchQuery: '',
  selectedCategory: null,
  selectedTag: null,

  fetchArticles: async (filters = {}) => {
    set({ loading: true });
    try {
      let query = supabase
        .from('articles')
        .select(`
          *,
          author:profiles!articles_author_id_fkey(id, full_name, avatar_url),
          category:categories!articles_category_id_fkey(*),
          article_tags(tag:tags(*))
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
      }

      if (filters.featured) {
        query = query.eq('featured', true);
      }

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching articles:', error);
        return;
      }

      const articlesWithTags = data?.map(article => ({
        ...article,
        tags: article.article_tags?.map((at: any) => at.tag) || []
      })) || [];

      if (filters.featured) {
        set({ featuredArticles: articlesWithTags });
      } else {
        set({ articles: articlesWithTags });
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchFeaturedArticles: async () => {
    await get().fetchArticles({ featured: true, limit: 6 });
  },

  fetchAllArticles: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:profiles!articles_author_id_fkey(id, full_name, avatar_url),
          category:categories!articles_category_id_fkey(*),
          article_tags(tag:tags(*))
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching all articles:', error);
        return;
      }

      const articlesWithTags = data?.map(article => ({
        ...article,
        tags: article.article_tags?.map((at: any) => at.tag) || []
      })) || [];

      set({ articles: articlesWithTags });
    } catch (error) {
      console.error('Error fetching all articles:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      set({ categories: data || [] });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },

  fetchTags: async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching tags:', error);
        return;
      }

      set({ tags: data || [] });
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  },

  fetchArticleBySlug: async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:profiles!articles_author_id_fkey(id, full_name, avatar_url),
          category:categories!articles_category_id_fkey(*),
          article_tags(tag:tags(*))
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching article:', error);
        return null;
      }

      return {
        ...data,
        tags: data.article_tags?.map((at: any) => at.tag) || []
      };
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  },

  incrementViews: async (articleId: string) => {
    try {
      await supabase.rpc('increment_article_views', { article_id: articleId });
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  },

  toggleLike: async (articleId: string) => {
    try {
      await supabase.rpc('toggle_article_like', { article_id: articleId });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  },

  createArticle: async (articleData: any) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert({
          title: articleData.title,
          slug: articleData.slug,
          excerpt: articleData.excerpt,
          content: articleData.content,
          featured_image: articleData.featuredImage,
          author_id: articleData.author_id,
          category_id: articleData.categoryId,
          status: articleData.status,
          featured: articleData.featured || false,
          reading_time: articleData.reading_time,
          published_at: articleData.published_at,
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating article:', error);
        return { success: false, error: error.message };
      }

      // Add tags if provided
      if (articleData.tags && articleData.tags.length > 0) {
        const tagInserts = articleData.tags.map((tagId: string) => ({
          article_id: data.id,
          tag_id: tagId,
        }));

        const { error: tagError } = await supabase
          .from('article_tags')
          .insert(tagInserts);

        if (tagError) {
          console.error('Error adding tags:', tagError);
        }
      }

      // Refresh articles list
      await get().fetchArticles();

      return { success: true, data };
    } catch (error) {
      console.error('Error creating article:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  updateArticle: async (id: string, articleData: any) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({
          title: articleData.title,
          slug: articleData.slug,
          excerpt: articleData.excerpt,
          content: articleData.content,
          featured_image: articleData.featuredImage,
          category_id: articleData.categoryId,
          status: articleData.status,
          featured: articleData.featured,
          reading_time: articleData.reading_time,
          published_at: articleData.published_at,
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating article:', error);
        return { success: false, error: error.message };
      }

      // Update tags if provided
      if (articleData.tags) {
        // Remove existing tags
        await supabase
          .from('article_tags')
          .delete()
          .eq('article_id', id);

        // Add new tags
        if (articleData.tags.length > 0) {
          const tagInserts = articleData.tags.map((tagId: string) => ({
            article_id: id,
            tag_id: tagId,
          }));

          await supabase
            .from('article_tags')
            .insert(tagInserts);
        }
      }

      // Refresh articles list
      await get().fetchArticles();

      return { success: true };
    } catch (error) {
      console.error('Error updating article:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  deleteArticle: async (id: string) => {
    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting article:', error);
        return { success: false, error: error.message };
      }

      // Refresh articles list
      await get().fetchArticles();

      return { success: true };
    } catch (error) {
      console.error('Error deleting article:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedCategory: (category: string | null) => {
    set({ selectedCategory: category });
  },

  setSelectedTag: (tag: string | null) => {
    set({ selectedTag: tag });
  },

  clearFilters: () => {
    set({
      searchQuery: '',
      selectedCategory: null,
      selectedTag: null,
    });
  },
}));

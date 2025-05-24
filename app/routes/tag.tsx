import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { Tag as TagIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useArticlesStore } from '../store/articlesStore';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import type { Route } from "./+types/tag";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Tag: ${params.slug} - Techsy.News` },
    { name: "description", content: "Browse articles by tag on Techsy.News" },
  ];
}

export default function Tag() {
  const { slug } = useParams();
  const { tags, fetchTags } = useArticlesStore();

  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState<any>(null);
  const [tagArticles, setTagArticles] = useState<any[]>([]);

  useEffect(() => {
    loadTagData();
  }, [slug]);

  const loadTagData = async () => {
    setLoading(true);
    try {
      await fetchTags();
    } catch (error) {
      console.error('Error loading tag data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tags.length > 0 && slug) {
      const foundTag = tags.find(t => t.slug === slug);
      setTag(foundTag);

      if (foundTag) {
        loadTagArticles(foundTag.id);
      }
    }
  }, [tags, slug]);

  const loadTagArticles = async (tagId: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:profiles(id, full_name, avatar_url),
          category:categories(id, name, slug, color),
          article_tags!inner(tag_id)
        `)
        .eq('article_tags.tag_id', tagId)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error loading tag articles:', error);
        return;
      }

      setTagArticles(data || []);
    } catch (error) {
      console.error('Error loading tag articles:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tag Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The tag you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-6"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <TagIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                #{tag.name}
              </h1>
              <p className="text-xl text-white/90">
                {tag.description || `Articles tagged with "${tag.name}"`}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80"
          >
            {tagArticles.length} article{tagArticles.length !== 1 ? 's' : ''} with this tag
          </motion.div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {tagArticles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {tagArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-20"
          >
            <TagIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Articles Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              There are no published articles with this tag yet. Check back soon!
            </p>
            <Link to="/">
              <Button>
                Browse All Articles
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

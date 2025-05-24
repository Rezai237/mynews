import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { Folder, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useArticlesStore } from '../store/articlesStore';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import type { Route } from "./+types/category";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Category: ${params.slug} - Techsy.News` },
    { name: "description", content: "Browse articles by category on Techsy.News" },
  ];
}

export default function Category() {
  const { slug } = useParams();
  const { articles, categories, fetchArticles, fetchCategories } = useArticlesStore();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<any>(null);
  const [categoryArticles, setCategoryArticles] = useState<any[]>([]);

  useEffect(() => {
    loadCategoryData();
  }, [slug]);

  const loadCategoryData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchCategories(), fetchArticles()]);
    } catch (error) {
      console.error('Error loading category data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && articles.length > 0 && slug) {
      const foundCategory = categories.find(cat => cat.slug === slug);
      setCategory(foundCategory);

      if (foundCategory) {
        const filtered = articles.filter(article =>
          article.category_id === foundCategory.id && article.status === 'published'
        );
        setCategoryArticles(filtered);
      }
    }
  }, [categories, articles, slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The category you're looking for doesn't exist.
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
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
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
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: category.color }}
            >
              <Folder className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {category.name}
              </h1>
              <p className="text-xl text-white/90">
                {category.description}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80"
          >
            {categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''} in this category
          </motion.div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryArticles.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categoryArticles.map((article, index) => (
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
            <Folder className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Articles Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              There are no published articles in this category yet. Check back soon!
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

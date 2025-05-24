import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Bookmark,
  Share2,
  User,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';
import { useArticlesStore } from '../store/articlesStore';
import { useAuthStore } from '../store/authStore';
import { formatRelativeTime, formatDate, getImageUrl, shareArticle } from '../lib/utils';
import RichTextEditor from '../components/editor/RichTextEditor';
import ArticleCard from '../components/articles/ArticleCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import type { Route } from "./+types/article";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Article: ${params.slug} - Techsy.News` },
    { name: "description", content: "Read the latest technology article on Techsy.News" },
  ];
}

export default function Article() {
  const { slug } = useParams();
  const { user } = useAuthStore();
  const { fetchArticleBySlug, incrementViews, toggleLike } = useArticlesStore();

  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const loadArticle = async () => {
    if (!slug) return;

    setLoading(true);
    try {
      const articleData = await fetchArticleBySlug(slug);
      if (articleData) {
        setArticle(articleData);
        // Increment views
        await incrementViews(articleData.id);
        // Load related articles (mock for now)
        setRelatedArticles([]);
      }
    } catch (error) {
      console.error('Error loading article:', error);
      toast.error('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('Please sign in to like articles');
      return;
    }

    if (!article) return;

    try {
      await toggleLike(article.id);
      setIsLiked(!isLiked);
      setArticle(prev => ({
        ...prev,
        likes: isLiked ? prev.likes - 1 : prev.likes + 1
      }));
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleBookmark = () => {
    if (!user) {
      toast.error('Please sign in to bookmark articles');
      return;
    }

    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = async () => {
    if (!article) return;

    try {
      await shareArticle({
        title: article.title,
        url: window.location.href
      });
      toast.success('Article shared successfully');
    } catch (error) {
      toast.error('Failed to share article');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The article you're looking for doesn't exist or has been removed.
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
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(article.featured_image)}
            alt={article.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>

          {/* Category Badge */}
          <div className="mb-4">
            <span
              className="px-3 py-1 text-sm font-medium text-white rounded-full"
              style={{ backgroundColor: article.category.color }}
            >
              {article.category.name}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            {article.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-8 leading-relaxed"
          >
            {article.excerpt}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 text-white/80"
          >
            <div className="flex items-center space-x-2">
              {article.author.avatar_url ? (
                <img
                  src={article.author.avatar_url}
                  alt={article.author.full_name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6" />
              )}
              <span className="font-medium">{article.author.full_name}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.published_at)}</span>
            </div>

            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.reading_time} min read</span>
            </div>

            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{article.views} views</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            {/* Social Actions */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{article.likes}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>Bookmark</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span>0 comments</span>
              </div>
            </div>

            {/* Article Body */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose dark:prose-invert max-w-none"
            >
              <RichTextEditor
                content={article.content}
                onChange={() => {}}
                editable={false}
                className="border-0"
              />
            </motion.div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/tag/${tag.slug}`}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Author Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-start space-x-4">
                {article.author.avatar_url ? (
                  <img
                    src={article.author.avatar_url}
                    alt={article.author.full_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {article.author.full_name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Technology writer and industry analyst with expertise in emerging technologies and digital transformation.
                  </p>
                  <Link
                    to={`/author/${article.author.id}`}
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    View all articles by {article.author.full_name}
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Comments
              </h3>
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Comments system coming soon!</p>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Table of Contents
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Auto-generated TOC coming soon!
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.slice(0, 3).map((relatedArticle) => (
                      <ArticleCard
                        key={relatedArticle.id}
                        article={relatedArticle}
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">
                  Stay Updated
                </h3>
                <p className="text-blue-100 text-sm mb-4">
                  Get the latest tech news delivered to your inbox.
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded text-gray-900 text-sm"
                  />
                  <Button variant="secondary" size="sm" className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

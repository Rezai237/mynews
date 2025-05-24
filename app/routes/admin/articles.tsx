import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ArrowLeft,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useArticlesStore } from '../../store/articlesStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { formatDate, formatRelativeTime } from '../../lib/utils';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import type { Route } from "./+types/articles";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Manage Articles - Admin - Techsy.News" },
    { name: "description", content: "Manage all articles in Techsy.News admin panel" },
  ];
}

export default function AdminArticles() {
  const { user, profile } = useAuthStore();
  const { articles, fetchAllArticles, deleteArticle } = useArticlesStore();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchAllArticles();
  }, [fetchAllArticles]);

  // Check if user is admin
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to manage articles.
          </p>
        </div>
      </div>
    );
  }

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteArticle = async (articleId: string, articleTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${articleTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleting(articleId);
      const result = await deleteArticle(articleId);
      
      if (result.success) {
        toast.success('Article deleted successfully');
      } else {
        toast.error(result.error || 'Failed to delete article');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles] || styles.draft}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Manage Articles
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Create, edit, and manage all your articles
              </p>
            </div>
          </div>
          <Link to="/admin/articles/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Articles ({filteredArticles.length})
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {articles.filter(a => a.status === 'published').length} published, {articles.filter(a => a.status === 'draft').length} drafts
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery || statusFilter !== 'all' ? 'No articles match your filters' : 'No articles found. Create your first article to get started.'}
              </p>
              {!searchQuery && statusFilter === 'all' && (
                <Link to="/admin/articles/new" className="mt-4 inline-block">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Article
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                          {article.title}
                        </h3>
                        {getStatusBadge(article.status)}
                        {article.featured && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>By {article.author.full_name}</span>
                        <span>•</span>
                        <span>{formatRelativeTime(article.created_at)}</span>
                        <span>•</span>
                        <span>{article.views} views</span>
                        <span>•</span>
                        <span>{article.likes} likes</span>
                        {article.reading_time && (
                          <>
                            <span>•</span>
                            <span>{article.reading_time} min read</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {article.status === 'published' && (
                        <Link
                          to={`/article/${article.slug}`}
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="View Article"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        to={`/admin/articles/${article.id}/edit`}
                        className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        title="Edit Article"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteArticle(article.id, article.title)}
                        disabled={deleting === article.id}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete Article"
                      >
                        {deleting === article.id ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

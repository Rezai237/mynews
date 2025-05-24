import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Trash2, 
  Eye, 
  ArrowLeft,
  User,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router';
import { useAuthStore } from '../../store/authStore';
import { formatDate, formatRelativeTime } from '../../lib/utils';
import { supabase } from '../../lib/supabase';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';
import type { Route } from "./+types/comments";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Manage Comments - Admin - Techsy.News" },
    { name: "description", content: "Moderate and manage comments in Techsy.News admin panel" },
  ];
}

interface CommentWithDetails {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  };
  article: {
    id: string;
    title: string;
    slug: string;
  };
}

export default function AdminComments() {
  const { user, profile } = useAuthStore();
  const [comments, setComments] = useState<CommentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  // Check if user is admin
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to manage comments.
          </p>
        </div>
      </div>
    );
  }

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          user:profiles!comments_user_id_fkey(id, full_name, avatar_url),
          article:articles!comments_article_id_fkey(id, title, slug)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      setDeleting(commentId);
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      
      toast.success('Comment deleted successfully');
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete comment');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                Manage Comments
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Moderate and manage user comments
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-4 h-4" />
            <span>{comments.length} total comments</span>
          </div>
        </div>

        {/* Comments List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Comments
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No comments found. Comments will appear here when users start engaging with your articles.
                </p>
              </div>
            ) : (
              comments.map((comment, index) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Comment Header */}
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-2">
                          {comment.user.avatar_url ? (
                            <img
                              src={comment.user.avatar_url}
                              alt={comment.user.full_name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {comment.user.full_name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>{formatRelativeTime(comment.created_at)}</span>
                        </div>
                      </div>

                      {/* Comment Content */}
                      <div className="mb-3">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {comment.content}
                        </p>
                      </div>

                      {/* Article Reference */}
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">On article:</span>
                        <Link
                          to={`/article/${comment.article.slug}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center space-x-1"
                        >
                          <span>{comment.article.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        to={`/article/${comment.article.slug}`}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="View Article"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        disabled={deleting === comment.id}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete Comment"
                      >
                        {deleting === comment.id ? (
                          <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Stats Summary */}
        {comments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Comment Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {comments.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Comments
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {comments.filter(c => new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This Week
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {new Set(comments.map(c => c.user.id)).size}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Unique Users
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

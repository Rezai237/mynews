import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useArticlesStore } from '../../../store/articlesStore';
import Button from '../../../components/ui/Button';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import type { Route } from "./+types/edit";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Edit Article - Admin - Techsy.News` },
    { name: "description", content: "Edit article in Techsy.News admin panel" },
  ];
}

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Check if user has permission
  if (!user || !profile || !['author', 'admin'].includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to edit articles.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Edit Article
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Editing article ID: {id}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Button>
          </div>
        </div>

        {/* Placeholder Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Article Edit Form
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page will contain the article editing form. For now, you can create new articles using the "New Article" page.
          </p>
          <Button onClick={() => navigate('/admin/articles/new')}>
            Create New Article Instead
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

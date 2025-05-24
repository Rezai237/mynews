import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Eye,
  Heart,
  Plus,
  Settings,
  Calendar,
  Tag,
  Folder
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useArticlesStore } from '../store/articlesStore';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatNumber } from '../lib/utils';
import type { Route } from "./+types/admin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard - Techsy.News" },
    { name: "description", content: "Admin dashboard for managing Techsy.News" },
  ];
}

export default function Admin() {
  const { user, profile } = useAuthStore();
  const { articles, categories, loading, fetchAllArticles } = useArticlesStore();
  const [stats, setStats] = useState({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0,
    totalLikes: 0,
    totalUsers: 0,
    publishedToday: 0
  });

  useEffect(() => {
    // Fetch all articles for admin dashboard (including drafts)
    fetchAllArticles();
  }, [fetchAllArticles]);

  useEffect(() => {
    // Calculate stats from articles
    if (articles.length > 0) {
      const publishedArticles = articles.filter(article => article.status === 'published');
      const draftArticles = articles.filter(article => article.status === 'draft');

      const totalViews = publishedArticles.reduce((sum, article) => sum + article.views, 0);
      const totalLikes = publishedArticles.reduce((sum, article) => sum + article.likes, 0);

      const today = new Date().toDateString();
      const publishedToday = publishedArticles.filter(article =>
        article.published_at && new Date(article.published_at).toDateString() === today
      ).length;

      setStats({
        totalArticles: articles.length,
        publishedArticles: publishedArticles.length,
        draftArticles: draftArticles.length,
        totalViews,
        totalLikes,
        totalUsers: 1250, // Mock data - will be replaced with real data
        publishedToday
      });
    }
  }, [articles]);

  // Check if user is admin
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Articles',
      value: formatNumber(stats.totalArticles),
      subtitle: `${stats.publishedArticles} published, ${stats.draftArticles} drafts`,
      icon: FileText,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Published Articles',
      value: formatNumber(stats.publishedArticles),
      subtitle: `${stats.publishedToday} published today`,
      icon: Eye,
      color: 'green',
      change: '+8%'
    },
    {
      title: 'Total Views',
      value: formatNumber(stats.totalViews),
      subtitle: 'From published articles',
      icon: TrendingUp,
      color: 'purple',
      change: '+15%'
    },
    {
      title: 'Total Likes',
      value: formatNumber(stats.totalLikes),
      subtitle: 'User engagement',
      icon: Heart,
      color: 'red',
      change: '+5%'
    }
  ];

  const quickActions = [
    {
      title: 'New Article',
      description: 'Create a new article',
      icon: Plus,
      href: '/admin/articles/new',
      color: 'blue'
    },
    {
      title: 'Manage Articles',
      description: 'View and edit all articles',
      icon: FileText,
      href: '/admin/articles',
      color: 'indigo'
    },
    {
      title: 'Manage Categories',
      description: 'Add or edit categories',
      icon: Folder,
      href: '/admin/categories',
      color: 'green'
    },
    {
      title: 'Manage Tags',
      description: 'Add or edit tags',
      icon: Tag,
      href: '/admin/tags',
      color: 'yellow'
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'purple'
    },
    {
      title: 'Comments',
      description: 'Moderate comments',
      icon: MessageSquare,
      href: '/admin/comments',
      color: 'orange'
    },
    {
      title: 'Settings',
      description: 'Site configuration',
      icon: Settings,
      href: '/admin/settings',
      color: 'gray'
    }
  ];

  const recentArticles = articles.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {profile?.full_name}. Here's what's happening with your site.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </p>
                        {stat.subtitle && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {stat.subtitle}
                          </p>
                        )}
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.title}
                      to={action.href}
                      className="group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/20 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-900/30 transition-colors`}>
                          <Icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Recent Articles
                  </h2>
                  <Link to="/admin/articles">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentArticles.length > 0 ? (
                    recentArticles.map((article) => (
                      <div key={article.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <img
                          src={article.featured_image || '/images/placeholder.svg'}
                          alt={article.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {article.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {article.author.full_name} • {article.views} views
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className={`px-2 py-1 rounded-full ${
                            article.status === 'published'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {article.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No articles yet</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Analytics Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Analytics Overview
                  </h2>
                  <Link to="/admin/analytics">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Page Views Today
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          +12% from yesterday
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      2,847
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          New Users Today
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          +8% from yesterday
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      127
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                        <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Articles This Week
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          +3 from last week
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      12
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

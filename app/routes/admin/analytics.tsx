import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  Users, 
  FileText, 
  ArrowLeft,
  Calendar,
  Globe
} from 'lucide-react';
import { Link } from 'react-router';
import { useAuthStore } from '../../store/authStore';
import { useArticlesStore } from '../../store/articlesStore';
import { formatNumber, formatDate } from '../../lib/utils';
import { supabase } from '../../lib/supabase';
import type { Route } from "./+types/analytics";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytics - Admin - Techsy.News" },
    { name: "description", content: "View detailed analytics and insights for Techsy.News" },
  ];
}

export default function AdminAnalytics() {
  const { user, profile } = useAuthStore();
  const { articles, categories } = useArticlesStore();
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    totalUsers: 0,
    articlesThisMonth: 0,
    topArticles: [],
    topCategories: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
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
            You don't have permission to view analytics.
          </p>
        </div>
      </div>
    );
  }

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Calculate basic stats from articles
      const totalViews = articles.reduce((sum, article) => sum + article.views, 0);
      const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0);

      // Get articles from this month
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const articlesThisMonth = articles.filter(article => 
        new Date(article.created_at) >= thisMonth
      ).length;

      // Get top articles by views
      const topArticles = [...articles]
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Get category stats
      const categoryStats = categories.map(category => {
        const categoryArticles = articles.filter(article => article.category_id === category.id);
        const totalViews = categoryArticles.reduce((sum, article) => sum + article.views, 0);
        return {
          ...category,
          articleCount: categoryArticles.length,
          totalViews
        };
      }).sort((a, b) => b.totalViews - a.totalViews);

      // Fetch additional data from database
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id');

      const { data: commentsData } = await supabase
        .from('comments')
        .select('id');

      setAnalytics({
        totalViews,
        totalLikes,
        totalComments: commentsData?.length || 0,
        totalUsers: profilesData?.length || 0,
        articlesThisMonth,
        topArticles,
        topCategories: categoryStats.slice(0, 5),
        recentActivity: []
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Views',
      value: formatNumber(analytics.totalViews),
      icon: Eye,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Total Likes',
      value: formatNumber(analytics.totalLikes),
      icon: Heart,
      color: 'red',
      change: '+8%'
    },
    {
      title: 'Total Users',
      value: formatNumber(analytics.totalUsers),
      icon: Users,
      color: 'green',
      change: '+15%'
    },
    {
      title: 'Articles This Month',
      value: analytics.articlesThisMonth.toString(),
      icon: FileText,
      color: 'purple',
      change: '+5%'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

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
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Detailed insights and performance metrics
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {formatDate(new Date())}</span>
          </div>
        </div>

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
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Top Performing Articles
            </h2>
            <div className="space-y-4">
              {analytics.topArticles.length > 0 ? (
                analytics.topArticles.map((article, index) => (
                  <div key={article.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {article.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {formatNumber(article.views)} views
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {formatNumber(article.likes)} likes
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No articles data available
                </p>
              )}
            </div>
          </motion.div>

          {/* Top Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Top Categories
            </h2>
            <div className="space-y-4">
              {analytics.topCategories.length > 0 ? (
                analytics.topCategories.map((category, index) => (
                  <div key={category.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {category.articleCount} articles
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatNumber(category.totalViews)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        views
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No categories data available
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

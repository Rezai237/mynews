import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Eye, 
  Heart, 
  Bookmark, 
  Share2,
  Calendar,
  User
} from 'lucide-react';
import { formatRelativeTime, getImageUrl, cn } from '../../lib/utils';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    reading_time: number;
    views: number;
    likes: number;
    published_at: string;
    author: {
      id: string;
      full_name: string;
      avatar_url: string | null;
    };
    category: {
      id: string;
      name: string;
      color: string;
    };
    tags?: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

export default function ArticleCard({ article, variant = 'default', className }: ArticleCardProps) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700',
        isFeatured && 'lg:flex lg:items-center',
        className
      )}
    >
      {/* Image */}
      <div className={cn(
        'relative overflow-hidden',
        isCompact ? 'aspect-[4/3]' : 'aspect-[16/9]',
        isFeatured && 'lg:w-1/2 lg:aspect-[3/2]'
      )}>
        <Link to={`/article/${article.slug}`}>
          <img
            src={getImageUrl(article.featured_image)}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2 py-1 text-xs font-medium text-white rounded-full"
            style={{ backgroundColor: article.category.color }}
          >
            {article.category.name}
          </span>
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors">
            <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors">
            <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        'p-6',
        isFeatured && 'lg:w-1/2 lg:p-8'
      )}>
        {/* Meta */}
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-2">
            {article.author.avatar_url ? (
              <img
                src={article.author.avatar_url}
                alt={article.author.full_name}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <User className="w-4 h-4" />
            )}
            <span>{article.author.full_name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatRelativeTime(article.published_at)}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/article/${article.slug}`}>
          <h3 className={cn(
            'font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2',
            isCompact ? 'text-lg mb-2' : isFeatured ? 'text-2xl mb-4' : 'text-xl mb-3'
          )}>
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {!isCompact && (
          <p className={cn(
            'text-gray-600 dark:text-gray-300 line-clamp-3 mb-4',
            isFeatured ? 'text-base' : 'text-sm'
          )}>
            {article.excerpt}
          </p>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && !isCompact && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.id}
                to={`/tag/${tag.slug}`}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.reading_time} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{article.views}</span>
            </div>
          </div>
          <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
            <span>{article.likes}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useArticlesStore } from '../../../store/articlesStore';
import RichTextEditor from '../../../components/editor/RichTextEditor';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import ImageUpload from '../../../components/ui/ImageUpload';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { generateSlug, calculateReadingTime } from '../../../lib/utils';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';
import type { Route } from "./+types/edit";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Edit Article - Admin - Techsy.News` },
    { name: "description", content: "Edit article in Techsy.News admin panel" },
  ];
}

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt too long'),
  categoryId: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  status: z.enum(['draft', 'published']),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const { categories, tags, fetchCategories, fetchTags, updateArticle } = useArticlesStore();

  const [article, setArticle] = useState<any>(null);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  });

  const watchTitle = watch('title');

  useEffect(() => {
    fetchCategories();
    fetchTags();
    fetchArticle();
  }, [id, fetchCategories, fetchTags]);

  // Auto-generate slug from title (but only if it's a new slug)
  useEffect(() => {
    if (watchTitle && article && !article.slug_locked) {
      const slug = generateSlug(watchTitle);
      setValue('slug', slug);
    }
  }, [watchTitle, setValue, article]);

  const fetchArticle = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:profiles!articles_author_id_fkey(id, full_name, avatar_url),
          category:categories!articles_category_id_fkey(*),
          article_tags(tag:tags(*))
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching article:', error);
        toast.error('Failed to load article');
        navigate('/admin/articles');
        return;
      }

      setArticle(data);
      setContent(data.content || '');
      setFeaturedImage(data.featured_image || '');
      setSelectedTags(data.article_tags?.map((at: any) => at.tag.id) || []);

      // Set form values
      setValue('title', data.title);
      setValue('slug', data.slug);
      setValue('excerpt', data.excerpt);
      setValue('categoryId', data.category_id);
      setValue('status', data.status);
      setValue('featured', data.featured || false);
      setValue('featuredImage', data.featured_image || '');

    } catch (error) {
      console.error('Error fetching article:', error);
      toast.error('Failed to load article');
      navigate('/admin/articles');
    } finally {
      setLoading(false);
    }
  };

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

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The article you're trying to edit doesn't exist.
          </p>
          <Button onClick={() => navigate('/admin/articles')}>
            Back to Articles
          </Button>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ArticleFormData) => {
    if (!article) return;

    setSaving(true);
    try {
      const readingTime = calculateReadingTime(content);

      const articleData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content,
        featuredImage: featuredImage || data.featuredImage,
        categoryId: data.categoryId,
        status: data.status,
        featured: data.featured || false,
        reading_time: readingTime,
        tags: selectedTags,
        published_at: data.status === 'published' && article.status !== 'published'
          ? new Date().toISOString()
          : article.published_at,
      };

      const result = await updateArticle(article.id, articleData);

      if (result.success) {
        toast.success(`Article ${data.status === 'published' ? 'published' : 'updated'} successfully!`);
        navigate('/admin/articles');
      } else {
        toast.error(result.error || 'Failed to update article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

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
              Editing: {article.title}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? 'Edit' : 'Preview'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/admin/articles')}
            >
              Cancel
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Article Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title *
                    </label>
                    <Input
                      {...register('title')}
                      placeholder="Enter article title"
                      error={errors.title?.message}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Slug *
                    </label>
                    <Input
                      {...register('slug')}
                      placeholder="article-url-slug"
                      error={errors.slug?.message}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      {...register('excerpt')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Brief description of the article"
                    />
                    {errors.excerpt && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.excerpt.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Content Editor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Content
                </h2>

                {previewMode ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                ) : (
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Write your article content here..."
                  />
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publish Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Publish Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      {...register('status')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('featured')}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Featured Article
                    </label>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <Button
                      type="submit"
                      disabled={saving}
                      className="flex-1"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Update Article
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Category
                </h3>

                <select
                  {...register('categoryId')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.categoryId.message}
                  </p>
                )}
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tags
                </h3>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {tags.map((tag) => (
                    <label key={tag.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag.id)}
                        onChange={() => handleTagToggle(tag.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {tag.name}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Featured Image
                </h3>

                <ImageUpload
                  value={featuredImage}
                  onChange={(url) => {
                    setFeaturedImage(url);
                    setValue('featuredImage', url);
                  }}
                  placeholder="Enter image URL"
                />
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Eye, Upload, X } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { useArticlesStore } from '../../../store/articlesStore';
import RichTextEditor from '../../../components/editor/RichTextEditor';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { generateSlug, calculateReadingTime } from '../../../lib/utils';
import toast from 'react-hot-toast';
import type { Route } from "./+types/new";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create New Article - Admin - Techsy.News" },
    { name: "description", content: "Create a new article for Techsy.News" },
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

export default function NewArticle() {
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  const { categories, tags, fetchCategories, fetchTags, createArticle } = useArticlesStore();

  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      status: 'draft',
      featured: false,
    }
  });

  const watchTitle = watch('title');

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, [fetchCategories, fetchTags]);

  // Auto-generate slug from title
  useEffect(() => {
    if (watchTitle) {
      const slug = generateSlug(watchTitle);
      setValue('slug', slug);
    }
  }, [watchTitle, setValue]);

  // Check if user has permission
  if (!user || !profile || !['author', 'admin'].includes(profile.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to create articles.
          </p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ArticleFormData) => {
    if (!content.trim()) {
      toast.error('Article content is required');
      return;
    }

    setLoading(true);
    try {
      const readingTime = calculateReadingTime(content);

      const articleData = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content,
        featuredImage: data.featuredImage,
        author_id: user!.id,
        categoryId: data.categoryId,
        status: data.status,
        featured: data.featured || false,
        reading_time: readingTime,
        tags: selectedTags,
        published_at: data.status === 'published' ? new Date().toISOString() : null,
      };

      const result = await createArticle(articleData);

      if (result.success) {
        toast.success(`Article ${data.status === 'published' ? 'published' : 'saved as draft'} successfully!`);
        navigate('/admin');
      } else {
        toast.error(result.error || 'Failed to save article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Failed to save article');
    } finally {
      setLoading(false);
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
              Create New Article
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Write and publish your technology insights
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
              onClick={() => navigate('/admin')}
            >
              Cancel
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <Input
                  label="Article Title"
                  {...register('title')}
                  error={errors.title?.message}
                  placeholder="Enter a compelling title..."
                  className="text-lg"
                />
              </motion.div>

              {/* Slug */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <Input
                  label="URL Slug"
                  {...register('slug')}
                  error={errors.slug?.message}
                  placeholder="article-url-slug"
                  helperText="This will be used in the article URL"
                />
              </motion.div>

              {/* Excerpt */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Article Excerpt
                </label>
                <textarea
                  {...register('excerpt')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write a brief summary of your article..."
                />
                {errors.excerpt && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {errors.excerpt.message}
                  </p>
                )}
              </motion.div>

              {/* Content Editor */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Article Content
                </label>
                {previewMode ? (
                  <RichTextEditor
                    content={content}
                    onChange={() => {}}
                    editable={false}
                  />
                ) : (
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Start writing your article..."
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
                transition={{ delay: 0.4 }}
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
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('featured')}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Featured article
                    </label>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      loading={loading}
                      className="flex-1"
                      onClick={() => setValue('status', 'draft')}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button
                      type="submit"
                      loading={loading}
                      onClick={() => setValue('status', 'published')}
                    >
                      Publish
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Category
                </h3>
                <select
                  {...register('categoryId')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {errors.categoryId.message}
                  </p>
                )}
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => handleTagToggle(tag.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag.id)
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Featured Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Featured Image
                </h3>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

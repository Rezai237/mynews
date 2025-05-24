import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Tag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthStore } from '../../store/authStore';
import { useArticlesStore } from '../../store/articlesStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import type { Route } from "./+types/tags";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Manage Tags - Admin - Techsy.News" },
    { name: "description", content: "Manage article tags in Techsy.News admin panel" },
  ];
}

export default function AdminTags() {
  const { user, profile } = useAuthStore();
  const { tags, fetchTags } = useArticlesStore();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  });

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  // Check if user is admin
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to manage tags.
          </p>
        </div>
      </div>
    );
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagData = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name)
      };

      if (editingTag) {
        // Update existing tag
        const { error } = await supabase
          .from('tags')
          .update(tagData)
          .eq('id', editingTag.id);

        if (error) throw error;
        toast.success('Tag updated successfully!');
      } else {
        // Create new tag
        const { error } = await supabase
          .from('tags')
          .insert(tagData);

        if (error) throw error;
        toast.success('Tag created successfully!');
      }

      // Reset form and refresh data
      setFormData({ name: '', slug: '' });
      setShowForm(false);
      setEditingTag(null);
      fetchTags();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save tag');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      slug: tag.slug
    });
    setShowForm(true);
  };

  const handleDelete = async (tagId: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;

    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', tagId);

      if (error) throw error;
      toast.success('Tag deleted successfully!');
      fetchTags();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete tag');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', slug: '' });
    setShowForm(false);
    setEditingTag(null);
  };

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
                Manage Tags
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Create and organize content tags
              </p>
            </div>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Tag
          </Button>
        </div>

        {/* Tag Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {editingTag ? 'Edit Tag' : 'Add New Tag'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Tag Name"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      name,
                      slug: generateSlug(name)
                    }));
                  }}
                  placeholder="e.g., Machine Learning"
                  required
                />
                <Input
                  label="Slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="e.g., machine-learning"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <Button type="submit" loading={loading}>
                  {editingTag ? 'Update Tag' : 'Create Tag'}
                </Button>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Tags List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Tags ({tags.length})
            </h2>
          </div>
          <div className="p-6">
            {tags.length === 0 ? (
              <div className="text-center py-12">
                <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No tags found. Create your first tag to get started.
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <motion.div
                    key={tag.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Tag className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {tag.name}
                    </span>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(tag)}
                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(tag.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

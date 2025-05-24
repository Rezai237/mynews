import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Save, 
  ArrowLeft,
  Globe,
  Mail,
  Shield,
  Palette,
  Database
} from 'lucide-react';
import { Link } from 'react-router';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';
import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - Admin - Techsy.News" },
    { name: "description", content: "Configure site settings and preferences" },
  ];
}

export default function AdminSettings() {
  const { user, profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Techsy.News',
    siteDescription: 'Modern Technology News Platform',
    siteUrl: 'https://techsy.news',
    contactEmail: 'contact@techsy.news',
    allowRegistration: true,
    requireEmailVerification: true,
    enableComments: true,
    enableNewsletter: true,
    analyticsId: '',
    socialTwitter: '',
    socialLinkedIn: '',
    socialGitHub: ''
  });

  // Check if user is admin
  if (!user || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access settings.
          </p>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      // In a real app, you would save these settings to your database
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const settingSections = [
    {
      title: 'General Settings',
      icon: Globe,
      fields: [
        { key: 'siteName', label: 'Site Name', type: 'text' },
        { key: 'siteDescription', label: 'Site Description', type: 'text' },
        { key: 'siteUrl', label: 'Site URL', type: 'url' },
        { key: 'contactEmail', label: 'Contact Email', type: 'email' }
      ]
    },
    {
      title: 'User Settings',
      icon: Shield,
      fields: [
        { key: 'allowRegistration', label: 'Allow User Registration', type: 'checkbox' },
        { key: 'requireEmailVerification', label: 'Require Email Verification', type: 'checkbox' }
      ]
    },
    {
      title: 'Feature Settings',
      icon: Settings,
      fields: [
        { key: 'enableComments', label: 'Enable Comments', type: 'checkbox' },
        { key: 'enableNewsletter', label: 'Enable Newsletter', type: 'checkbox' }
      ]
    },
    {
      title: 'Analytics & Tracking',
      icon: Database,
      fields: [
        { key: 'analyticsId', label: 'Google Analytics ID', type: 'text' }
      ]
    },
    {
      title: 'Social Media',
      icon: Mail,
      fields: [
        { key: 'socialTwitter', label: 'Twitter URL', type: 'url' },
        { key: 'socialLinkedIn', label: 'LinkedIn URL', type: 'url' },
        { key: 'socialGitHub', label: 'GitHub URL', type: 'url' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                Site Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Configure your site preferences and features
              </p>
            </div>
          </div>
          <Button onClick={handleSave} loading={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field) => (
                      <div key={field.key}>
                        {field.type === 'checkbox' ? (
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={settings[field.key as keyof typeof settings] as boolean}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                [field.key]: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {field.label}
                            </span>
                          </label>
                        ) : (
                          <Input
                            label={field.label}
                            type={field.type}
                            value={settings[field.key as keyof typeof settings] as string}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              [field.key]: e.target.value
                            }))}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800 mt-8"
        >
          <div className="p-6 border-b border-red-200 dark:border-red-800">
            <h2 className="text-xl font-semibold text-red-900 dark:text-red-100">
              Danger Zone
            </h2>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              These actions are irreversible. Please be careful.
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Reset All Settings
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reset all settings to their default values
                  </p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">
                  Reset Settings
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Clear All Data
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Permanently delete all articles, comments, and user data
                  </p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">
                  Clear Data
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end mt-8">
          <Button onClick={handleSave} loading={loading} size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

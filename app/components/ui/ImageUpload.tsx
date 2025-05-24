import { useState, useRef } from 'react';
import { Upload, X, Link, Image as ImageIcon, AlertCircle } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import { cn, validateImageUrl } from '../../lib/utils';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  className,
  disabled = false,
  placeholder = "https://example.com/image.jpg"
}: ImageUploadProps) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    const url = urlInput.trim();
    if (!url) return;

    if (!validateImageUrl(url)) {
      toast.error('Please enter a valid image URL');
      return;
    }

    // Test if the image loads
    const img = new Image();
    img.onload = () => {
      onChange(url);
      setUrlInput('');
      setShowUrlInput(false);
      toast.success('Image added successfully!');
    };
    img.onerror = () => {
      toast.error('Failed to load image. Please check the URL.');
    };
    img.src = url;
  };

  const handleFileSelect = (file: File) => {
    // For now, we'll show a message about file upload
    // In a real implementation, this would upload to Supabase Storage
    alert('File upload functionality will be implemented with Supabase Storage. For now, please use image URLs.');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));

    if (imageFile) {
      handleFileSelect(imageFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  if (value) {
    return (
      <div className={cn("relative group", className)}>
        <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <img
            src={value}
            alt="Featured image"
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (onRemove) {
                  onRemove();
                } else {
                  onChange('');
                }
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100"
              disabled={disabled}
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
          {value}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          dragActive
            ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        <div className="space-y-3">
          <div className="flex justify-center">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drop an image here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                disabled={disabled}
              >
                browse files
              </button>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowUrlInput(true)}
            disabled={disabled}
          >
            <Link className="w-4 h-4 mr-2" />
            Add Image URL
          </Button>
        </div>
      </div>

      {/* URL Input */}
      {showUrlInput && (
        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Add Image URL
            </span>
          </div>

          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
            disabled={disabled}
          />

          <div className="flex items-center space-x-2">
            <Button
              type="button"
              size="sm"
              onClick={handleUrlSubmit}
              disabled={!urlInput.trim() || disabled}
            >
              Add Image
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowUrlInput(false);
                setUrlInput('');
              }}
              disabled={disabled}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Quick Image Suggestions */}
      <div className="space-y-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Quick suggestions (click to use):
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop'
          ].map((url, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onChange(url)}
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
              disabled={disabled}
            >
              Tech Image {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

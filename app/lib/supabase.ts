import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database Types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          website: string | null;
          role: 'user' | 'author' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          website?: string | null;
          role?: 'user' | 'author' | 'admin';
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          website?: string | null;
          role?: 'user' | 'author' | 'admin';
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          color: string;
          created_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description?: string | null;
          color: string;
        };
        Update: {
          name?: string;
          slug?: string;
          description?: string | null;
          color?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          name: string;
          slug: string;
        };
        Update: {
          name?: string;
          slug?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image: string | null;
          author_id: string;
          category_id: string;
          status: 'draft' | 'published' | 'archived';
          featured: boolean;
          reading_time: number;
          views: number;
          likes: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          featured_image?: string | null;
          author_id: string;
          category_id: string;
          status?: 'draft' | 'published' | 'archived';
          featured?: boolean;
          reading_time?: number;
          published_at?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          featured_image?: string | null;
          category_id?: string;
          status?: 'draft' | 'published' | 'archived';
          featured?: boolean;
          reading_time?: number;
          published_at?: string | null;
        };
      };
      comments: {
        Row: {
          id: string;
          article_id: string;
          user_id: string;
          content: string;
          parent_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          article_id: string;
          user_id: string;
          content: string;
          parent_id?: string | null;
        };
        Update: {
          content?: string;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          article_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          article_id: string;
        };
        Update: never;
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed: boolean;
          created_at: string;
        };
        Insert: {
          email: string;
          subscribed?: boolean;
        };
        Update: {
          subscribed?: boolean;
        };
      };
    };
  };
}

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Article = Database['public']['Tables']['articles']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];
export type Bookmark = Database['public']['Tables']['bookmarks']['Row'];
export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row'];

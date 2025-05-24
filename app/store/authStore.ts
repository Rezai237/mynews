import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, type Profile } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error?: string }>;
  fetchProfile: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      loading: true,

      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            set({ user: session.user });
            await get().fetchProfile();
          }
          
          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
              set({ user: session.user });
              await get().fetchProfile();
            } else {
              set({ user: null, profile: null });
            }
          });
        } catch (error) {
          console.error('Auth initialization error:', error);
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            return { error: error.message };
          }

          set({ user: data.user });
          await get().fetchProfile();
          return {};
        } catch (error) {
          return { error: 'An unexpected error occurred' };
        }
      },

      signUp: async (email: string, password: string, fullName: string) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
              },
            },
          });

          if (error) {
            return { error: error.message };
          }

          if (data.user) {
            // Create profile
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                email: data.user.email!,
                full_name: fullName,
                role: 'user',
              });

            if (profileError) {
              console.error('Profile creation error:', profileError);
            }
          }

          return {};
        } catch (error) {
          return { error: 'An unexpected error occurred' };
        }
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null });
      },

      fetchProfile: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error('Profile fetch error:', error);
            return;
          }

          set({ profile: data });
        } catch (error) {
          console.error('Profile fetch error:', error);
        }
      },

      updateProfile: async (updates: Partial<Profile>) => {
        const { user } = get();
        if (!user) return { error: 'Not authenticated' };

        try {
          const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

          if (error) {
            return { error: error.message };
          }

          set({ profile: data });
          return {};
        } catch (error) {
          return { error: 'An unexpected error occurred' };
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, profile: state.profile }),
    }
  )
);

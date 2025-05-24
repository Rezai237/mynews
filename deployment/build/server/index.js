import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useLocation, Link, useSearchParams, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState, useEffect, forwardRef, useMemo, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Monitor, Moon, Sun, User, Bookmark, Settings, LogOut, X, Menu, Mail, Twitter, Facebook, Instagram, Linkedin, Github, Heart, Share2, Calendar, Clock, Eye, TrendingUp, Zap, Globe, Cpu, Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Link as Link$2, Image as Image$2, Undo, Redo, ArrowLeft, MessageCircle, Folder, Tag, Filter, Lock, EyeOff, Camera, Edit, Save, FileText, Plus, BarChart3, MessageSquare, Users, Trash2, Upload, ExternalLink, Shield, Database } from "lucide-react";
import { clsx } from "clsx";
import { parseISO, formatDistanceToNow, format } from "date-fns";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image$1 from "@tiptap/extension-image";
import Link$1 from "@tiptap/extension-link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout$1({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        dangerouslySetInnerHTML: {
          __html: `
              // Prevent flash of unstyled content
              try {
                const theme = localStorage.getItem('ui-storage');
                if (theme) {
                  const parsed = JSON.parse(theme);
                  if (parsed.state?.theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (parsed.state?.theme === 'system') {
                    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      document.documentElement.classList.add('dark');
                    }
                  }
                }
              } catch (e) {}
            `
        }
      })]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-white dark:bg-gray-900 transition-colors",
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout: Layout$1,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const supabaseUrl = "https://ttputpllkehhtwqfifxe.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0cHV0cGxsa2VoaHR3cWZpZnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMTAwMTYsImV4cCI6MjA2MzY4NjAxNn0.FUK--Lz0zvFuodova5Cf1s7UCsOsYt3yq4_JoVN8V38";
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      loading: true,
      initialize: async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session == null ? void 0 : session.user) {
            set({ user: session.user });
            await get().fetchProfile();
          }
          supabase.auth.onAuthStateChange(async (event, session2) => {
            if (session2 == null ? void 0 : session2.user) {
              set({ user: session2.user });
              await get().fetchProfile();
            } else {
              set({ user: null, profile: null });
            }
          });
        } catch (error) {
          console.error("Auth initialization error:", error);
        } finally {
          set({ loading: false });
        }
      },
      signIn: async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) {
            return { error: error.message };
          }
          set({ user: data.user });
          await get().fetchProfile();
          return {};
        } catch (error) {
          return { error: "An unexpected error occurred" };
        }
      },
      signUp: async (email, password, fullName) => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName
              }
            }
          });
          if (error) {
            return { error: error.message };
          }
          if (data.user) {
            const { error: profileError } = await supabase.from("profiles").insert({
              id: data.user.id,
              email: data.user.email,
              full_name: fullName,
              role: "user"
            });
            if (profileError) {
              console.error("Profile creation error:", profileError);
            }
          }
          return {};
        } catch (error) {
          return { error: "An unexpected error occurred" };
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
          const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
          if (error) {
            console.error("Profile fetch error:", error);
            return;
          }
          set({ profile: data });
        } catch (error) {
          console.error("Profile fetch error:", error);
        }
      },
      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return { error: "Not authenticated" };
        try {
          const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single();
          if (error) {
            return { error: error.message };
          }
          set({ profile: data });
          return {};
        } catch (error) {
          return { error: "An unexpected error occurred" };
        }
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, profile: state.profile })
    }
  )
);
const useUIStore = create()(
  persist(
    (set, get) => ({
      theme: "system",
      sidebarOpen: false,
      searchOpen: false,
      mobileMenuOpen: false,
      readingProgress: 0,
      setTheme: (theme) => {
        set({ theme });
        if (typeof window !== "undefined" && typeof document !== "undefined") {
          const root2 = document.documentElement;
          if (theme === "dark") {
            root2.classList.add("dark");
          } else if (theme === "light") {
            root2.classList.remove("dark");
          } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
              root2.classList.add("dark");
            } else {
              root2.classList.remove("dark");
            }
          }
        }
      },
      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
        get().setTheme(newTheme);
      },
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => {
        const { sidebarOpen } = get();
        set({ sidebarOpen: !sidebarOpen });
      },
      setSearchOpen: (open) => set({ searchOpen: open }),
      toggleSearch: () => {
        const { searchOpen } = get();
        set({ searchOpen: !searchOpen });
      },
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
      toggleMobileMenu: () => {
        const { mobileMenuOpen } = get();
        set({ mobileMenuOpen: !mobileMenuOpen });
      },
      setReadingProgress: (progress) => set({ readingProgress: progress })
    }),
    {
      name: "ui-storage",
      partialize: (state) => ({ theme: state.theme })
    }
  )
);
function cn(...inputs) {
  return clsx(inputs);
}
function formatDate(date, formatStr = "MMM dd, yyyy") {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
}
function formatRelativeTime(date) {
  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}
function generateSlug(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
function getImageUrl(path) {
  if (!path) return "/images/placeholder.svg";
  if (path.startsWith("http")) return path;
  return `${"https://ttputpllkehhtwqfifxe.supabase.co"}/storage/v1/object/public/images/${path}`;
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function validateImageUrl(url) {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || url.includes("unsplash.com") || url.includes("images.") || url.includes("cdn.");
  } catch {
    return false;
  }
}
function validatePassword(password) {
  const errors = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
function copyToClipboard(text) {
  return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
}
function shareArticle(article2) {
  if (navigator.share) {
    return navigator.share({
      title: article2.title,
      url: article2.url
    });
  } else {
    return copyToClipboard(article2.url);
  }
}
function formatNumber(num) {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num.toString();
}
function Header() {
  const location = useLocation();
  const { user, profile: profile2, signOut } = useAuthStore();
  const {
    theme,
    mobileMenuOpen,
    searchOpen,
    setTheme,
    toggleMobileMenu,
    toggleSearch
  } = useUIStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Technology", href: "/category/technology" },
    { name: "Web3", href: "/web3" },
    { name: "AI", href: "/category/ai" },
    { name: "Startups", href: "/category/startups" },
    { name: "Reviews", href: "/category/reviews" }
  ];
  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor
  };
  const ThemeIcon = themeIcons[theme];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "header",
      {
        className: cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800" : "bg-transparent"
        ),
        children: [
          /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-sm", children: "T" }) }),
              /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Techsy.News" })
            ] }),
            /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center space-x-8", children: navigation.map((item) => /* @__PURE__ */ jsx(
              Link,
              {
                to: item.href,
                className: cn(
                  "text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400",
                  location.pathname === item.href ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                ),
                children: item.name
              },
              item.name
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: toggleSearch,
                  className: "p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
                  children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    const themes = ["light", "dark", "system"];
                    const currentIndex = themes.indexOf(theme);
                    const nextTheme = themes[(currentIndex + 1) % themes.length];
                    setTheme(nextTheme);
                  },
                  className: "p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
                  children: /* @__PURE__ */ jsx(ThemeIcon, { className: "w-5 h-5" })
                }
              ),
              user ? /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setUserMenuOpen(!userMenuOpen),
                    className: "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    children: (profile2 == null ? void 0 : profile2.avatar_url) ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: profile2.avatar_url,
                        alt: profile2.full_name || "User",
                        className: "w-8 h-8 rounded-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 text-gray-600 dark:text-gray-400" }) })
                  }
                ),
                /* @__PURE__ */ jsx(AnimatePresence, { children: userMenuOpen && /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 0.95, y: -10 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    exit: { opacity: 0, scale: 0.95, y: -10 },
                    className: "absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1",
                    children: [
                      /* @__PURE__ */ jsxs(
                        Link,
                        {
                          to: "/profile",
                          className: "flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                          onClick: () => setUserMenuOpen(false),
                          children: [
                            /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
                            /* @__PURE__ */ jsx("span", { children: "Profile" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        Link,
                        {
                          to: "/bookmarks",
                          className: "flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                          onClick: () => setUserMenuOpen(false),
                          children: [
                            /* @__PURE__ */ jsx(Bookmark, { className: "w-4 h-4" }),
                            /* @__PURE__ */ jsx("span", { children: "Bookmarks" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        Link,
                        {
                          to: "/settings",
                          className: "flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                          onClick: () => setUserMenuOpen(false),
                          children: [
                            /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" }),
                            /* @__PURE__ */ jsx("span", { children: "Settings" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx("hr", { className: "my-1 border-gray-200 dark:border-gray-700" }),
                      /* @__PURE__ */ jsxs(
                        "button",
                        {
                          onClick: () => {
                            signOut();
                            setUserMenuOpen(false);
                          },
                          className: "flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700",
                          children: [
                            /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
                            /* @__PURE__ */ jsx("span", { children: "Sign Out" })
                          ]
                        }
                      )
                    ]
                  }
                ) })
              ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/auth/signin",
                    className: "text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                    children: "Sign In"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/auth/signup",
                    className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    children: "Sign Up"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: toggleMobileMenu,
                  className: "md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
                  children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800",
              children: /* @__PURE__ */ jsx("div", { className: "px-4 py-4 space-y-2", children: navigation.map((item) => /* @__PURE__ */ jsx(
                Link,
                {
                  to: item.href,
                  className: cn(
                    "block px-3 py-2 rounded-lg text-base font-medium transition-colors",
                    location.pathname === item.href ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  ),
                  onClick: toggleMobileMenu,
                  children: item.name
                },
                item.name
              )) })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: searchOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        onClick: toggleSearch,
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95, y: -20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: -20 },
            className: "max-w-2xl mx-auto mt-20 bg-white dark:bg-gray-800 rounded-lg shadow-xl",
            onClick: (e) => e.stopPropagation(),
            children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [
                /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-gray-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Search articles...",
                    className: "flex-1 bg-transparent border-none outline-none text-lg text-gray-900 dark:text-white placeholder-gray-500",
                    autoFocus: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Press ESC to close" })
            ] })
          }
        )
      }
    ) })
  ] });
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const footerLinks = {
    company: [
      { name: "About", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" }
    ],
    content: [
      { name: "Technology", href: "/category/technology" },
      { name: "Web3", href: "/web3" },
      { name: "AI", href: "/category/ai" },
      { name: "Startups", href: "/category/startups" }
    ],
    resources: [
      { name: "Newsletter", href: "/newsletter" },
      { name: "RSS Feed", href: "/rss" },
      { name: "API", href: "/api" },
      { name: "Sitemap", href: "/sitemap" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "DMCA", href: "/dmca" }
    ]
  };
  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/techsynews", icon: Twitter },
    { name: "Facebook", href: "https://facebook.com/techsynews", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com/techsynews", icon: Instagram },
    { name: "LinkedIn", href: "https://linkedin.com/company/techsynews", icon: Linkedin },
    { name: "GitHub", href: "https://github.com/techsynews", icon: Github }
  ];
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center space-x-2 mb-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-sm", children: "T" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-gray-900 dark:text-white", children: "Techsy.News" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600 dark:text-gray-400 mb-6 max-w-md", children: "Your premier destination for the latest in technology news, insights, and analysis. Stay ahead of the curve with our comprehensive coverage of tech trends, startups, and innovations." }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 dark:text-white mb-2", children: "Subscribe to our newsletter" }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Enter your email",
                className: "flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            ),
            /* @__PURE__ */ jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors", children: /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex space-x-4", children: socialLinks.map((social) => {
          const Icon = social.icon;
          return /* @__PURE__ */ jsx(
            "a",
            {
              href: social.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
              children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5" })
            },
            social.name
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 dark:text-white mb-4", children: "Company" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: footerLinks.company.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: link.href,
            className: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
            children: link.name
          }
        ) }, link.name)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 dark:text-white mb-4", children: "Content" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: footerLinks.content.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: link.href,
            className: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
            children: link.name
          }
        ) }, link.name)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-gray-900 dark:text-white mb-4", children: "Resources" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: footerLinks.resources.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: link.href,
            className: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
            children: link.name
          }
        ) }, link.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-gray-200 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center space-x-6", children: footerLinks.legal.map((link) => /* @__PURE__ */ jsx(
        Link,
        {
          to: link.href,
          className: "text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors",
          children: link.name
        },
        link.name
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "© ",
          currentYear,
          " Techsy.News. Made with"
        ] }),
        /* @__PURE__ */ jsx(Heart, { className: "w-4 h-4 text-red-500" }),
        /* @__PURE__ */ jsx("span", { children: "for the tech community." })
      ] })
    ] }) })
  ] }) });
}
function LoadingSpinner({ size = "md", className }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
        sizeClasses[size],
        className
      )
    }
  );
}
const Layout = withComponentProps(function Layout2() {
  const {
    initialize,
    loading
  } = useAuthStore();
  const {
    setTheme,
    theme
  } = useUIStore();
  useEffect(() => {
    initialize();
    setTheme(theme);
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        if (theme === "system") {
          setTheme("system");
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [initialize, setTheme, theme]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center bg-white dark:bg-gray-900",
      children: /* @__PURE__ */ jsx(LoadingSpinner, {
        size: "lg"
      })
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-white dark:bg-gray-900 transition-colors",
    children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("main", {
      className: "pt-16",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx(Footer, {}), /* @__PURE__ */ jsx(Toaster, {
      position: "top-right",
      toastOptions: {
        duration: 4e3,
        style: {
          background: "var(--toast-bg)",
          color: "var(--toast-color)",
          border: "1px solid var(--toast-border)"
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#ffffff"
          }
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#ffffff"
          }
        }
      }
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Layout
}, Symbol.toStringTag, { value: "Module" }));
const useArticlesStore = create((set, get) => ({
  articles: [],
  featuredArticles: [],
  categories: [],
  tags: [],
  loading: false,
  searchQuery: "",
  selectedCategory: null,
  selectedTag: null,
  fetchArticles: async (filters = {}) => {
    set({ loading: true });
    try {
      let query = supabase.from("articles").select(`
          *,
          author:profiles!articles_author_id_fkey(id, full_name, avatar_url),
          category:categories!articles_category_id_fkey(*),
          article_tags(tag:tags(*))
        `).eq("status", "published").order("published_at", { ascending: false });
      if (filters.category) {
        query = query.eq("category_id", filters.category);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`);
      }
      if (filters.featured) {
        query = query.eq("featured", true);
      }
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }
      const { data, error } = await query;
      if (error) {
        console.error("Error fetching articles:", error);
        return;
      }
      const articlesWithTags = (data == null ? void 0 : data.map((article2) => {
        var _a;
        return {
          ...article2,
          tags: ((_a = article2.article_tags) == null ? void 0 : _a.map((at) => at.tag)) || []
        };
      })) || [];
      if (filters.featured) {
        set({ featuredArticles: articlesWithTags });
      } else {
        set({ articles: articlesWithTags });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      set({ loading: false });
    }
  },
  fetchFeaturedArticles: async () => {
    await get().fetchArticles({ featured: true, limit: 6 });
  },
  fetchAllArticles: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.from("articles").select(`
          *,
          author:profiles!articles_author_id_fkey(id, full_name, avatar_url),
          category:categories!articles_category_id_fkey(*),
          article_tags(tag:tags(*))
        `).order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching all articles:", error);
        return;
      }
      const articlesWithTags = (data == null ? void 0 : data.map((article2) => {
        var _a;
        return {
          ...article2,
          tags: ((_a = article2.article_tags) == null ? void 0 : _a.map((at) => at.tag)) || []
        };
      })) || [];
      set({ articles: articlesWithTags });
    } catch (error) {
      console.error("Error fetching all articles:", error);
    } finally {
      set({ loading: false });
    }
  },
  fetchCategories: async () => {
    try {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      set({ categories: data || [] });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  fetchTags: async () => {
    try {
      const { data, error } = await supabase.from("tags").select("*").order("name");
      if (error) {
        console.error("Error fetching tags:", error);
        return;
      }
      set({ tags: data || [] });
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  },
  fetchArticleBySlug: async (slug) => {
    var _a;
    try {
      const { data, error } = await supabase.from("articles").select(`
          *,
          author:profiles!articles_author_id_fkey(id, full_name, avatar_url),
          category:categories!articles_category_id_fkey(*),
          article_tags(tag:tags(*))
        `).eq("slug", slug).eq("status", "published").single();
      if (error) {
        console.error("Error fetching article:", error);
        return null;
      }
      return {
        ...data,
        tags: ((_a = data.article_tags) == null ? void 0 : _a.map((at) => at.tag)) || []
      };
    } catch (error) {
      console.error("Error fetching article:", error);
      return null;
    }
  },
  incrementViews: async (articleId) => {
    try {
      await supabase.rpc("increment_article_views", { article_id: articleId });
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  },
  toggleLike: async (articleId) => {
    try {
      await supabase.rpc("toggle_article_like", { article_id: articleId });
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  },
  createArticle: async (articleData) => {
    try {
      const { data, error } = await supabase.from("articles").insert({
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        featured_image: articleData.featuredImage,
        author_id: articleData.author_id,
        category_id: articleData.categoryId,
        status: articleData.status,
        featured: articleData.featured || false,
        reading_time: articleData.reading_time,
        published_at: articleData.published_at
      }).select().single();
      if (error) {
        console.error("Error creating article:", error);
        return { success: false, error: error.message };
      }
      if (articleData.tags && articleData.tags.length > 0) {
        const tagInserts = articleData.tags.map((tagId) => ({
          article_id: data.id,
          tag_id: tagId
        }));
        const { error: tagError } = await supabase.from("article_tags").insert(tagInserts);
        if (tagError) {
          console.error("Error adding tags:", tagError);
        }
      }
      await get().fetchArticles();
      return { success: true, data };
    } catch (error) {
      console.error("Error creating article:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  },
  updateArticle: async (id, articleData) => {
    try {
      const { error } = await supabase.from("articles").update({
        title: articleData.title,
        slug: articleData.slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        featured_image: articleData.featuredImage,
        category_id: articleData.categoryId,
        status: articleData.status,
        featured: articleData.featured,
        reading_time: articleData.reading_time,
        published_at: articleData.published_at
      }).eq("id", id);
      if (error) {
        console.error("Error updating article:", error);
        return { success: false, error: error.message };
      }
      if (articleData.tags) {
        await supabase.from("article_tags").delete().eq("article_id", id);
        if (articleData.tags.length > 0) {
          const tagInserts = articleData.tags.map((tagId) => ({
            article_id: id,
            tag_id: tagId
          }));
          await supabase.from("article_tags").insert(tagInserts);
        }
      }
      await get().fetchArticles();
      return { success: true };
    } catch (error) {
      console.error("Error updating article:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  },
  deleteArticle: async (id) => {
    try {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) {
        console.error("Error deleting article:", error);
        return { success: false, error: error.message };
      }
      await get().fetchArticles();
      return { success: true };
    } catch (error) {
      console.error("Error deleting article:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },
  setSelectedCategory: (category2) => {
    set({ selectedCategory: category2 });
  },
  setSelectedTag: (tag2) => {
    set({ selectedTag: tag2 });
  },
  clearFilters: () => {
    set({
      searchQuery: "",
      selectedCategory: null,
      selectedTag: null
    });
  }
}));
function ArticleCard({ article: article2, variant = "default", className }) {
  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";
  return /* @__PURE__ */ jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      whileHover: { y: -4 },
      className: cn(
        "group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700",
        isFeatured && "lg:flex lg:items-center",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: cn(
          "relative overflow-hidden",
          isCompact ? "aspect-[4/3]" : "aspect-[16/9]",
          isFeatured && "lg:w-1/2 lg:aspect-[3/2]"
        ), children: [
          /* @__PURE__ */ jsxs(Link, { to: `/article/${article2.slug}`, children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: getImageUrl(article2.featured_image),
                alt: article2.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsx(
            "span",
            {
              className: "px-2 py-1 text-xs font-medium text-white rounded-full",
              style: { backgroundColor: article2.category.color },
              children: article2.category.name
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
            /* @__PURE__ */ jsx("button", { className: "p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors", children: /* @__PURE__ */ jsx(Bookmark, { className: "w-4 h-4 text-gray-600 dark:text-gray-400" }) }),
            /* @__PURE__ */ jsx("button", { className: "p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors", children: /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 text-gray-600 dark:text-gray-400" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: cn(
          "p-6",
          isFeatured && "lg:w-1/2 lg:p-8"
        ), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              article2.author.avatar_url ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: article2.author.avatar_url,
                  alt: article2.author.full_name,
                  className: "w-5 h-5 rounded-full object-cover"
                }
              ) : /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: article2.author.full_name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: formatRelativeTime(article2.published_at) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: `/article/${article2.slug}`, children: /* @__PURE__ */ jsx("h3", { className: cn(
            "font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2",
            isCompact ? "text-lg mb-2" : isFeatured ? "text-2xl mb-4" : "text-xl mb-3"
          ), children: article2.title }) }),
          !isCompact && /* @__PURE__ */ jsx("p", { className: cn(
            "text-gray-600 dark:text-gray-300 line-clamp-3 mb-4",
            isFeatured ? "text-base" : "text-sm"
          ), children: article2.excerpt }),
          article2.tags && article2.tags.length > 0 && !isCompact && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: article2.tags.slice(0, 3).map((tag2) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/tag/${tag2.slug}`,
              className: "px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
              children: [
                "#",
                tag2.name
              ]
            },
            tag2.id
          )) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  article2.reading_time,
                  " min read"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-1", children: [
                /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: article2.views })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("button", { className: "flex items-center space-x-1 hover:text-red-500 transition-colors", children: [
              /* @__PURE__ */ jsx(Heart, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: article2.likes })
            ] })
          ] })
        ] })
      ]
    }
  );
}
const Button = forwardRef(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500",
      outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white focus:ring-gray-500",
      danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        ),
        disabled: disabled || loading,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsx(LoadingSpinner, { size: "sm", className: "mr-2" }),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";
function meta$l({}) {
  return [{
    title: "Techsy.News - Latest Technology News & Insights"
  }, {
    name: "description",
    content: "Stay ahead of the tech curve with the latest technology news, AI insights, Web3 updates, and innovation stories from industry experts."
  }];
}
const home = withComponentProps(function Home() {
  const {
    articles: articles2,
    featuredArticles,
    categories: categories2,
    loading,
    fetchArticles,
    fetchFeaturedArticles,
    fetchCategories
  } = useArticlesStore();
  useEffect(() => {
    fetchFeaturedArticles();
    fetchArticles({
      limit: 12
    });
    fetchCategories();
  }, [fetchFeaturedArticles, fetchArticles, fetchCategories]);
  const heroStats = [{
    label: "Articles Published",
    value: "2,500+",
    icon: TrendingUp
  }, {
    label: "Tech Experts",
    value: "50+",
    icon: Zap
  }, {
    label: "Global Readers",
    value: "100K+",
    icon: Globe
  }, {
    label: "Topics Covered",
    value: "25+",
    icon: Cpu
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20 lg:py-32",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center",
          children: [/* @__PURE__ */ jsxs(motion.h1, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            className: "text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6",
            children: ["Stay Ahead of the", " ", /* @__PURE__ */ jsx("span", {
              className: "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
              children: "Tech Curve"
            })]
          }), /* @__PURE__ */ jsx(motion.p, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: 0.1
            },
            className: "text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto",
            children: "Discover the latest in technology, AI, Web3, and innovation. Get insights from industry experts and stay informed about the trends shaping our digital future."
          }), /* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: 0.2
            },
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            children: [/* @__PURE__ */ jsx(Button, {
              size: "lg",
              className: "px-8",
              children: "Explore Articles"
            }), /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              size: "lg",
              className: "px-8",
              children: "Subscribe Newsletter"
            })]
          })]
        }), /* @__PURE__ */ jsx(motion.div, {
          initial: {
            opacity: 0,
            y: 40
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.3
          },
          className: "mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8",
          children: heroStats.map((stat, index) => {
            const Icon = stat.icon;
            return /* @__PURE__ */ jsxs("div", {
              className: "text-center",
              children: [/* @__PURE__ */ jsx("div", {
                className: "inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mb-4",
                children: /* @__PURE__ */ jsx(Icon, {
                  className: "w-6 h-6 text-blue-600 dark:text-blue-400"
                })
              }), /* @__PURE__ */ jsx("div", {
                className: "text-2xl font-bold text-gray-900 dark:text-white mb-1",
                children: stat.value
              }), /* @__PURE__ */ jsx("div", {
                className: "text-sm text-gray-600 dark:text-gray-400",
                children: stat.label
              })]
            }, stat.label);
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16 bg-white dark:bg-gray-900",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between mb-12",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-gray-900 dark:text-white mb-2",
              children: "Featured Stories"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Hand-picked articles from our editorial team"
            })]
          }), /* @__PURE__ */ jsx(Button, {
            variant: "outline",
            children: "View All"
          })]
        }), loading ? /* @__PURE__ */ jsx("div", {
          className: "flex justify-center py-12",
          children: /* @__PURE__ */ jsx(LoadingSpinner, {
            size: "lg"
          })
        }) : /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
          children: featuredArticles.slice(0, 4).map((article2, index) => /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: index * 0.1
            },
            children: /* @__PURE__ */ jsx(ArticleCard, {
              article: article2,
              variant: index === 0 ? "featured" : "default"
            })
          }, article2.id))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16 bg-gray-50 dark:bg-gray-800",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-12",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 dark:text-white mb-4",
            children: "Explore by Category"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 dark:text-gray-400 max-w-2xl mx-auto",
            children: "Dive deep into specific areas of technology that interest you most"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
          children: categories2.map((category2, index) => /* @__PURE__ */ jsxs(motion.a, {
            href: `/category/${category2.slug}`,
            initial: {
              opacity: 0,
              scale: 0.9
            },
            animate: {
              opacity: 1,
              scale: 1
            },
            transition: {
              delay: index * 0.05
            },
            whileHover: {
              scale: 1.05
            },
            className: "group p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 text-center border border-gray-200 dark:border-gray-700",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center",
              style: {
                backgroundColor: `${category2.color}20`
              },
              children: /* @__PURE__ */ jsx("div", {
                className: "w-6 h-6 rounded",
                style: {
                  backgroundColor: category2.color
                }
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
              children: category2.name
            }), category2.description && /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 dark:text-gray-400 mt-2",
              children: category2.description
            })]
          }, category2.id))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16 bg-white dark:bg-gray-900",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between mb-12",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-3xl font-bold text-gray-900 dark:text-white mb-2",
              children: "Latest Articles"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400",
              children: "Fresh insights and breaking news from the tech world"
            })]
          }), /* @__PURE__ */ jsx(Button, {
            variant: "outline",
            children: "View All Articles"
          })]
        }), loading ? /* @__PURE__ */ jsx("div", {
          className: "flex justify-center py-12",
          children: /* @__PURE__ */ jsx(LoadingSpinner, {
            size: "lg"
          })
        }) : /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: articles2.slice(0, 9).map((article2, index) => /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: index * 0.05
            },
            children: /* @__PURE__ */ jsx(ArticleCard, {
              article: article2
            })
          }, article2.id))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16 bg-gradient-to-r from-blue-600 to-purple-600",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          whileInView: {
            opacity: 1,
            y: 0
          },
          viewport: {
            once: true
          },
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-white mb-4",
            children: "Never Miss a Tech Update"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-blue-100 mb-8 text-lg",
            children: "Join 50,000+ tech enthusiasts and get the latest news delivered to your inbox"
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-4 max-w-md mx-auto",
            children: [/* @__PURE__ */ jsx("input", {
              type: "email",
              placeholder: "Enter your email",
              className: "flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
            }), /* @__PURE__ */ jsx(Button, {
              variant: "secondary",
              size: "lg",
              className: "bg-white text-blue-600 hover:bg-gray-100",
              children: "Subscribe"
            })]
          })]
        })
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$l
}, Symbol.toStringTag, { value: "Module" }));
function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  className,
  editable = true
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image$1.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg"
        }
      }),
      Link$1.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:text-blue-800 underline"
        }
      })
    ],
    content,
    editable,
    onUpdate: ({ editor: editor2 }) => {
      onChange(editor2.getHTML());
    }
  });
  if (!editor) {
    return null;
  }
  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };
  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };
  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title
  }) => /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      title,
      className: cn(
        "p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
        isActive && "bg-gray-200 dark:bg-gray-600"
      ),
      children
    }
  );
  if (!editable) {
    return /* @__PURE__ */ jsx("div", { className: cn("prose dark:prose-invert max-w-none", className), children: /* @__PURE__ */ jsx(EditorContent, { editor }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden", className), children: [
    /* @__PURE__ */ jsx("div", { className: "border-b border-gray-300 dark:border-gray-600 p-2 bg-gray-50 dark:bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1", children: [
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBold().run(),
          isActive: editor.isActive("bold"),
          title: "Bold",
          children: /* @__PURE__ */ jsx(Bold, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleItalic().run(),
          isActive: editor.isActive("italic"),
          title: "Italic",
          children: /* @__PURE__ */ jsx(Italic, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleStrike().run(),
          isActive: editor.isActive("strike"),
          title: "Strikethrough",
          children: /* @__PURE__ */ jsx(Strikethrough, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleCode().run(),
          isActive: editor.isActive("code"),
          title: "Code",
          children: /* @__PURE__ */ jsx(Code, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: editor.isActive("heading", { level: 1 }),
          title: "Heading 1",
          children: /* @__PURE__ */ jsx(Heading1, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: editor.isActive("heading", { level: 2 }),
          title: "Heading 2",
          children: /* @__PURE__ */ jsx(Heading2, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: editor.isActive("heading", { level: 3 }),
          title: "Heading 3",
          children: /* @__PURE__ */ jsx(Heading3, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          isActive: editor.isActive("bulletList"),
          title: "Bullet List",
          children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: editor.isActive("orderedList"),
          title: "Numbered List",
          children: /* @__PURE__ */ jsx(ListOrdered, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().toggleBlockquote().run(),
          isActive: editor.isActive("blockquote"),
          title: "Quote",
          children: /* @__PURE__ */ jsx(Quote, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: addLink,
          title: "Add Link",
          children: /* @__PURE__ */ jsx(Link$2, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: addImage,
          title: "Add Image",
          children: /* @__PURE__ */ jsx(Image$2, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" }),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().undo().run(),
          title: "Undo",
          children: /* @__PURE__ */ jsx(Undo, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsx(
        ToolbarButton,
        {
          onClick: () => editor.chain().focus().redo().run(),
          title: "Redo",
          children: /* @__PURE__ */ jsx(Redo, { className: "w-4 h-4" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "p-4 min-h-[300px]", children: /* @__PURE__ */ jsx(
      EditorContent,
      {
        editor,
        className: "prose dark:prose-invert max-w-none focus:outline-none"
      }
    ) })
  ] });
}
function meta$k({
  params
}) {
  return [{
    title: `Article: ${params.slug} - Techsy.News`
  }, {
    name: "description",
    content: "Read the latest technology article on Techsy.News"
  }];
}
const article = withComponentProps(function Article() {
  const {
    slug
  } = useParams();
  const {
    user
  } = useAuthStore();
  const {
    fetchArticleBySlug,
    incrementViews,
    toggleLike
  } = useArticlesStore();
  const [article2, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);
  const loadArticle = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const articleData = await fetchArticleBySlug(slug);
      if (articleData) {
        setArticle(articleData);
        await incrementViews(articleData.id);
        setRelatedArticles([]);
      }
    } catch (error) {
      console.error("Error loading article:", error);
      toast.error("Failed to load article");
    } finally {
      setLoading(false);
    }
  };
  const handleLike = async () => {
    if (!user) {
      toast.error("Please sign in to like articles");
      return;
    }
    if (!article2) return;
    try {
      await toggleLike(article2.id);
      setIsLiked(!isLiked);
      setArticle((prev) => ({
        ...prev,
        likes: isLiked ? prev.likes - 1 : prev.likes + 1
      }));
    } catch (error) {
      toast.error("Failed to update like");
    }
  };
  const handleBookmark = () => {
    if (!user) {
      toast.error("Please sign in to bookmark articles");
      return;
    }
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };
  const handleShare = async () => {
    if (!article2) return;
    try {
      await shareArticle({
        title: article2.title,
        url: window.location.href
      });
      toast.success("Article shared successfully");
    } catch (error) {
      toast.error("Failed to share article");
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsx(LoadingSpinner, {
        size: "lg"
      })
    });
  }
  if (!article2) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Article Not Found"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400 mb-8",
          children: "The article you're looking for doesn't exist or has been removed."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/",
          children: /* @__PURE__ */ jsxs(Button, {
            children: [/* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 mr-2"
            }), "Back to Home"]
          })
        })]
      })
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "relative bg-gray-900 text-white",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "absolute inset-0",
        children: [/* @__PURE__ */ jsx("img", {
          src: getImageUrl(article2.featured_image),
          alt: article2.title,
          className: "w-full h-full object-cover opacity-50"
        }), /* @__PURE__ */ jsx("div", {
          className: "absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20",
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors",
          children: [/* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-4 h-4 mr-2"
          }), "Back to Articles"]
        }), /* @__PURE__ */ jsx("div", {
          className: "mb-4",
          children: /* @__PURE__ */ jsx("span", {
            className: "px-3 py-1 text-sm font-medium text-white rounded-full",
            style: {
              backgroundColor: article2.category.color
            },
            children: article2.category.name
          })
        }), /* @__PURE__ */ jsx(motion.h1, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          className: "text-4xl md:text-5xl font-bold mb-6 leading-tight",
          children: article2.title
        }), /* @__PURE__ */ jsx(motion.p, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.1
          },
          className: "text-xl text-white/90 mb-8 leading-relaxed",
          children: article2.excerpt
        }), /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.2
          },
          className: "flex flex-wrap items-center gap-6 text-white/80",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center space-x-2",
            children: [article2.author.avatar_url ? /* @__PURE__ */ jsx("img", {
              src: article2.author.avatar_url,
              alt: article2.author.full_name,
              className: "w-8 h-8 rounded-full object-cover"
            }) : /* @__PURE__ */ jsx(User, {
              className: "w-6 h-6"
            }), /* @__PURE__ */ jsx("span", {
              className: "font-medium",
              children: article2.author.full_name
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center space-x-1",
            children: [/* @__PURE__ */ jsx(Calendar, {
              className: "w-4 h-4"
            }), /* @__PURE__ */ jsx("span", {
              children: formatDate(article2.published_at)
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center space-x-1",
            children: [/* @__PURE__ */ jsx(Clock, {
              className: "w-4 h-4"
            }), /* @__PURE__ */ jsxs("span", {
              children: [article2.reading_time, " min read"]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center space-x-1",
            children: [/* @__PURE__ */ jsx(Eye, {
              className: "w-4 h-4"
            }), /* @__PURE__ */ jsxs("span", {
              children: [article2.views, " views"]
            })]
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
      children: /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-4 gap-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "lg:col-span-3",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center space-x-4",
              children: [/* @__PURE__ */ jsxs("button", {
                onClick: handleLike,
                className: `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isLiked ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"}`,
                children: [/* @__PURE__ */ jsx(Heart, {
                  className: `w-5 h-5 ${isLiked ? "fill-current" : ""}`
                }), /* @__PURE__ */ jsx("span", {
                  children: article2.likes
                })]
              }), /* @__PURE__ */ jsxs("button", {
                onClick: handleBookmark,
                className: `flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${isBookmarked ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"}`,
                children: [/* @__PURE__ */ jsx(Bookmark, {
                  className: `w-5 h-5 ${isBookmarked ? "fill-current" : ""}`
                }), /* @__PURE__ */ jsx("span", {
                  children: "Bookmark"
                })]
              }), /* @__PURE__ */ jsxs("button", {
                onClick: handleShare,
                className: "flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors",
                children: [/* @__PURE__ */ jsx(Share2, {
                  className: "w-5 h-5"
                }), /* @__PURE__ */ jsx("span", {
                  children: "Share"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400",
              children: [/* @__PURE__ */ jsx(MessageCircle, {
                className: "w-4 h-4"
              }), /* @__PURE__ */ jsx("span", {
                children: "0 comments"
              })]
            })]
          }), /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: 0.3
            },
            className: "prose dark:prose-invert max-w-none",
            children: /* @__PURE__ */ jsx(RichTextEditor, {
              content: article2.content,
              onChange: () => {
              },
              editable: false,
              className: "border-0"
            })
          }), article2.tags && article2.tags.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: 0.4
            },
            className: "mt-8 pt-8 border-t border-gray-200 dark:border-gray-700",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
              children: "Tags"
            }), /* @__PURE__ */ jsx("div", {
              className: "flex flex-wrap gap-2",
              children: article2.tags.map((tag2) => /* @__PURE__ */ jsxs(Link, {
                to: `/tag/${tag2.slug}`,
                className: "px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
                children: ["#", tag2.name]
              }, tag2.id))
            })]
          }), /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: 0.5
            },
            className: "mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-start space-x-4",
              children: [article2.author.avatar_url ? /* @__PURE__ */ jsx("img", {
                src: article2.author.avatar_url,
                alt: article2.author.full_name,
                className: "w-16 h-16 rounded-full object-cover"
              }) : /* @__PURE__ */ jsx("div", {
                className: "w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsx(User, {
                  className: "w-8 h-8 text-gray-600 dark:text-gray-400"
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex-1",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-lg font-semibold text-gray-900 dark:text-white mb-2",
                  children: article2.author.full_name
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 dark:text-gray-400 mb-4",
                  children: "Technology writer and industry analyst with expertise in emerging technologies and digital transformation."
                }), /* @__PURE__ */ jsxs(Link, {
                  to: `/author/${article2.author.id}`,
                  className: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium",
                  children: ["View all articles by ", article2.author.full_name]
                })]
              })]
            })
          }), /* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: 0.6
            },
            className: "mt-12",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 dark:text-white mb-8",
              children: "Comments"
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-center py-12 text-gray-500 dark:text-gray-400",
              children: [/* @__PURE__ */ jsx(MessageCircle, {
                className: "w-12 h-12 mx-auto mb-4 opacity-50"
              }), /* @__PURE__ */ jsx("p", {
                children: "Comments system coming soon!"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "lg:col-span-1",
          children: /* @__PURE__ */ jsxs("div", {
            className: "sticky top-24 space-y-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "bg-gray-50 dark:bg-gray-800 rounded-lg p-6",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Table of Contents"
              }), /* @__PURE__ */ jsx("div", {
                className: "text-sm text-gray-500 dark:text-gray-400",
                children: "Auto-generated TOC coming soon!"
              })]
            }), relatedArticles.length > 0 && /* @__PURE__ */ jsxs("div", {
              className: "bg-gray-50 dark:bg-gray-800 rounded-lg p-6",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Related Articles"
              }), /* @__PURE__ */ jsx("div", {
                className: "space-y-4",
                children: relatedArticles.slice(0, 3).map((relatedArticle) => /* @__PURE__ */ jsx(ArticleCard, {
                  article: relatedArticle,
                  variant: "compact"
                }, relatedArticle.id))
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold mb-2",
                children: "Stay Updated"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-blue-100 text-sm mb-4",
                children: "Get the latest tech news delivered to your inbox."
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-2",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "email",
                  placeholder: "Enter your email",
                  className: "w-full px-3 py-2 rounded text-gray-900 text-sm"
                }), /* @__PURE__ */ jsx(Button, {
                  variant: "secondary",
                  size: "sm",
                  className: "w-full bg-white text-blue-600 hover:bg-gray-100",
                  children: "Subscribe"
                })]
              })]
            })]
          })
        })]
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: article,
  meta: meta$k
}, Symbol.toStringTag, { value: "Module" }));
function meta$j({
  params
}) {
  return [{
    title: `Category: ${params.slug} - Techsy.News`
  }, {
    name: "description",
    content: "Browse articles by category on Techsy.News"
  }];
}
const category = withComponentProps(function Category() {
  const {
    slug
  } = useParams();
  const {
    articles: articles2,
    categories: categories2,
    fetchArticles,
    fetchCategories
  } = useArticlesStore();
  const [loading, setLoading] = useState(true);
  const [category2, setCategory] = useState(null);
  const [categoryArticles, setCategoryArticles] = useState([]);
  useEffect(() => {
    loadCategoryData();
  }, [slug]);
  const loadCategoryData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchCategories(), fetchArticles()]);
    } catch (error) {
      console.error("Error loading category data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (categories2.length > 0 && articles2.length > 0 && slug) {
      const foundCategory = categories2.find((cat) => cat.slug === slug);
      setCategory(foundCategory);
      if (foundCategory) {
        const filtered = articles2.filter((article2) => article2.category_id === foundCategory.id && article2.status === "published");
        setCategoryArticles(filtered);
      }
    }
  }, [categories2, articles2, slug]);
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsx(LoadingSpinner, {
        size: "lg"
      })
    });
  }
  if (!category2) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Category Not Found"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400 mb-8",
          children: "The category you're looking for doesn't exist."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/",
          children: /* @__PURE__ */ jsxs(Button, {
            children: [/* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 mr-2"
            }), "Back to Home"]
          })
        })]
      })
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsx("div", {
      className: "bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors",
          children: [/* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-4 h-4 mr-2"
          }), "Back to Home"]
        }), /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          className: "flex items-center space-x-4 mb-6",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 rounded-full flex items-center justify-center",
            style: {
              backgroundColor: category2.color
            },
            children: /* @__PURE__ */ jsx(Folder, {
              className: "w-8 h-8 text-white"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-4xl md:text-5xl font-bold mb-2",
              children: category2.name
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-white/90",
              children: category2.description
            })]
          })]
        }), /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.1
          },
          className: "text-white/80",
          children: [categoryArticles.length, " article", categoryArticles.length !== 1 ? "s" : "", " in this category"]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
      children: categoryArticles.length > 0 ? /* @__PURE__ */ jsx(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.2
        },
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        children: categoryArticles.map((article2, index) => /* @__PURE__ */ jsx(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.1 * index
          },
          children: /* @__PURE__ */ jsx(ArticleCard, {
            article: article2
          })
        }, article2.id))
      }) : /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.2
        },
        className: "text-center py-20",
        children: [/* @__PURE__ */ jsx(Folder, {
          className: "w-16 h-16 mx-auto text-gray-400 mb-4"
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "No Articles Yet"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400 mb-8",
          children: "There are no published articles in this category yet. Check back soon!"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/",
          children: /* @__PURE__ */ jsx(Button, {
            children: "Browse All Articles"
          })
        })]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: category,
  meta: meta$j
}, Symbol.toStringTag, { value: "Module" }));
function meta$i({
  params
}) {
  return [{
    title: `Tag: ${params.slug} - Techsy.News`
  }, {
    name: "description",
    content: "Browse articles by tag on Techsy.News"
  }];
}
const tag = withComponentProps(function Tag$1() {
  const {
    slug
  } = useParams();
  const {
    tags: tags2,
    fetchTags
  } = useArticlesStore();
  const [loading, setLoading] = useState(true);
  const [tag2, setTag] = useState(null);
  const [tagArticles, setTagArticles] = useState([]);
  useEffect(() => {
    loadTagData();
  }, [slug]);
  const loadTagData = async () => {
    setLoading(true);
    try {
      await fetchTags();
    } catch (error) {
      console.error("Error loading tag data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tags2.length > 0 && slug) {
      const foundTag = tags2.find((t) => t.slug === slug);
      setTag(foundTag);
      if (foundTag) {
        loadTagArticles(foundTag.id);
      }
    }
  }, [tags2, slug]);
  const loadTagArticles = async (tagId) => {
    try {
      const {
        data,
        error
      } = await supabase.from("articles").select(`
          *,
          author:profiles(id, full_name, avatar_url),
          category:categories(id, name, slug, color),
          article_tags!inner(tag_id)
        `).eq("article_tags.tag_id", tagId).eq("status", "published").order("published_at", {
        ascending: false
      });
      if (error) {
        console.error("Error loading tag articles:", error);
        return;
      }
      setTagArticles(data || []);
    } catch (error) {
      console.error("Error loading tag articles:", error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsx(LoadingSpinner, {
        size: "lg"
      })
    });
  }
  if (!tag2) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Tag Not Found"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400 mb-8",
          children: "The tag you're looking for doesn't exist."
        }), /* @__PURE__ */ jsx(Link, {
          to: "/",
          children: /* @__PURE__ */ jsxs(Button, {
            children: [/* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 mr-2"
            }), "Back to Home"]
          })
        })]
      })
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsx("div", {
      className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors",
          children: [/* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-4 h-4 mr-2"
          }), "Back to Home"]
        }), /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          className: "flex items-center space-x-4 mb-6",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-16 h-16 bg-white/20 rounded-full flex items-center justify-center",
            children: /* @__PURE__ */ jsx(Tag, {
              className: "w-8 h-8 text-white"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsxs("h1", {
              className: "text-4xl md:text-5xl font-bold mb-2",
              children: ["#", tag2.name]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-white/90",
              children: tag2.description || `Articles tagged with "${tag2.name}"`
            })]
          })]
        }), /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.1
          },
          className: "text-white/80",
          children: [tagArticles.length, " article", tagArticles.length !== 1 ? "s" : "", " with this tag"]
        })]
      })
    }), /* @__PURE__ */ jsx("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",
      children: tagArticles.length > 0 ? /* @__PURE__ */ jsx(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.2
        },
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        children: tagArticles.map((article2, index) => /* @__PURE__ */ jsx(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.1 * index
          },
          children: /* @__PURE__ */ jsx(ArticleCard, {
            article: article2
          })
        }, article2.id))
      }) : /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.2
        },
        className: "text-center py-20",
        children: [/* @__PURE__ */ jsx(Tag, {
          className: "w-16 h-16 mx-auto text-gray-400 mb-4"
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "No Articles Yet"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400 mb-8",
          children: "There are no published articles with this tag yet. Check back soon!"
        }), /* @__PURE__ */ jsx(Link, {
          to: "/",
          children: /* @__PURE__ */ jsx(Button, {
            children: "Browse All Articles"
          })
        })]
      })
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tag,
  meta: meta$i
}, Symbol.toStringTag, { value: "Module" }));
function meta$h({}) {
  return [{
    title: "Web3 & Blockchain - Techsy.News"
  }, {
    name: "description",
    content: "Latest Web3, blockchain, and cryptocurrency news and insights"
  }];
}
const web3 = withComponentProps(function Web3() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-3xl font-bold text-gray-900 dark:text-white mb-8",
        children: "Web3 & Blockchain"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-gray-600 dark:text-gray-400",
        children: "This page will display Web3 and blockchain content. Coming soon!"
      })]
    })
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: web3,
  meta: meta$h
}, Symbol.toStringTag, { value: "Module" }));
function meta$g({}) {
  return [{
    title: "Search - Techsy.News"
  }, {
    name: "description",
    content: "Search for articles, topics, and content on Techsy.News"
  }];
}
const search = withComponentProps(function Search$1() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    articles: articles2,
    categories: categories2,
    tags: tags2,
    loading,
    fetchArticles,
    fetchCategories,
    fetchTags
  } = useArticlesStore();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    fetchCategories();
    fetchTags();
    fetchArticles();
  }, [fetchCategories, fetchTags, fetchArticles]);
  const debouncedSearch = useMemo(() => debounce((query) => {
    performSearch(query);
  }, 300), []);
  useEffect(() => {
    if (searchQuery) {
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, selectedCategory, selectedTag, sortBy, debouncedSearch]);
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      let filtered = articles2.filter((article2) => {
        var _a;
        const matchesQuery = article2.title.toLowerCase().includes(query.toLowerCase()) || article2.excerpt.toLowerCase().includes(query.toLowerCase()) || article2.content.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = !selectedCategory || article2.category.id === selectedCategory;
        const matchesTag = !selectedTag || ((_a = article2.tags) == null ? void 0 : _a.some((tag2) => tag2.id === selectedTag));
        return matchesQuery && matchesCategory && matchesTag;
      });
      switch (sortBy) {
        case "date":
          filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
          break;
        case "views":
          filtered.sort((a, b) => b.views - a.views);
          break;
        case "likes":
          filtered.sort((a, b) => b.likes - a.likes);
          break;
        default:
          filtered.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
      }
      setSearchResults(filtered);
      const params = new URLSearchParams();
      if (query) params.set("q", query);
      if (selectedCategory) params.set("category", selectedCategory);
      if (selectedTag) params.set("tag", selectedTag);
      if (sortBy !== "relevance") params.set("sort", sortBy);
      setSearchParams(params);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedTag("");
    setSortBy("relevance");
    setSearchParams(searchQuery ? {
      q: searchQuery
    } : {});
  };
  const hasActiveFilters = selectedCategory || selectedTag || sortBy !== "relevance";
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center mb-12",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Search Articles"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto",
          children: "Find the latest technology insights, tutorials, and news"
        })]
      }), /* @__PURE__ */ jsx(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        className: "max-w-4xl mx-auto mb-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "relative",
          children: [/* @__PURE__ */ jsx(Search, {
            className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6"
          }), /* @__PURE__ */ jsx("input", {
            type: "text",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: "Search for articles, topics, technologies...",
            className: "w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
          })]
        })
      }), /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.1
        },
        className: "mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex flex-wrap items-center justify-between gap-4 mb-4",
          children: [/* @__PURE__ */ jsxs(Button, {
            variant: "outline",
            onClick: () => setShowFilters(!showFilters),
            className: "flex items-center space-x-2",
            children: [/* @__PURE__ */ jsx(Filter, {
              className: "w-4 h-4"
            }), /* @__PURE__ */ jsx("span", {
              children: "Filters"
            }), hasActiveFilters && /* @__PURE__ */ jsx("span", {
              className: "bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
              children: [selectedCategory, selectedTag, sortBy !== "relevance"].filter(Boolean).length
            })]
          }), hasActiveFilters && /* @__PURE__ */ jsxs(Button, {
            variant: "ghost",
            onClick: clearFilters,
            className: "text-gray-600 dark:text-gray-400",
            children: [/* @__PURE__ */ jsx(X, {
              className: "w-4 h-4 mr-2"
            }), "Clear Filters"]
          })]
        }), /* @__PURE__ */ jsx(AnimatePresence, {
          children: showFilters && /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              height: 0
            },
            animate: {
              opacity: 1,
              height: "auto"
            },
            exit: {
              opacity: 0,
              height: 0
            },
            className: "bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm",
            children: /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsxs("label", {
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  children: [/* @__PURE__ */ jsx(Folder, {
                    className: "w-4 h-4 inline mr-2"
                  }), "Category"]
                }), /* @__PURE__ */ jsxs("select", {
                  value: selectedCategory,
                  onChange: (e) => setSelectedCategory(e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                  children: [/* @__PURE__ */ jsx("option", {
                    value: "",
                    children: "All Categories"
                  }), categories2.map((category2) => /* @__PURE__ */ jsx("option", {
                    value: category2.id,
                    children: category2.name
                  }, category2.id))]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsxs("label", {
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  children: [/* @__PURE__ */ jsx(Tag, {
                    className: "w-4 h-4 inline mr-2"
                  }), "Tag"]
                }), /* @__PURE__ */ jsxs("select", {
                  value: selectedTag,
                  onChange: (e) => setSelectedTag(e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                  children: [/* @__PURE__ */ jsx("option", {
                    value: "",
                    children: "All Tags"
                  }), tags2.map((tag2) => /* @__PURE__ */ jsx("option", {
                    value: tag2.id,
                    children: tag2.name
                  }, tag2.id))]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsxs("label", {
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  children: [/* @__PURE__ */ jsx(Calendar, {
                    className: "w-4 h-4 inline mr-2"
                  }), "Sort By"]
                }), /* @__PURE__ */ jsxs("select", {
                  value: sortBy,
                  onChange: (e) => setSortBy(e.target.value),
                  className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                  children: [/* @__PURE__ */ jsx("option", {
                    value: "relevance",
                    children: "Relevance"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "date",
                    children: "Latest"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "views",
                    children: "Most Viewed"
                  }), /* @__PURE__ */ jsx("option", {
                    value: "likes",
                    children: "Most Liked"
                  })]
                })]
              })]
            })
          })
        })]
      }), /* @__PURE__ */ jsx(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.2
        },
        children: searching || loading ? /* @__PURE__ */ jsx("div", {
          className: "flex justify-center py-12",
          children: /* @__PURE__ */ jsx(LoadingSpinner, {
            size: "lg"
          })
        }) : searchQuery ? /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex items-center justify-between mb-6",
            children: /* @__PURE__ */ jsxs("div", {
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-bold text-gray-900 dark:text-white",
                children: "Search Results"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-gray-600 dark:text-gray-400 mt-1",
                children: [searchResults.length, " ", searchResults.length === 1 ? "result" : "results", ' for "', searchQuery, '"']
              })]
            })
          }), searchResults.length > 0 ? /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
            children: searchResults.map((article2, index) => /* @__PURE__ */ jsx(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: index * 0.05
              },
              children: /* @__PURE__ */ jsx(ArticleCard, {
                article: article2
              })
            }, article2.id))
          }) : /* @__PURE__ */ jsxs("div", {
            className: "text-center py-16",
            children: [/* @__PURE__ */ jsx(Search, {
              className: "w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-white mb-2",
              children: "No results found"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto",
              children: "We couldn't find any articles matching your search. Try adjusting your search terms or filters."
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-2",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-500 dark:text-gray-400",
                children: "Suggestions:"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "text-sm text-gray-600 dark:text-gray-400 space-y-1",
                children: [/* @__PURE__ */ jsx("li", {
                  children: "• Check your spelling"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Try more general keywords"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Remove some filters"
                }), /* @__PURE__ */ jsx("li", {
                  children: "• Browse our categories instead"
                })]
              })]
            })]
          })]
        }) : (
          /* No Search Query - Show Popular Articles */
          /* @__PURE__ */ jsxs("div", {
            className: "text-center py-16",
            children: [/* @__PURE__ */ jsx(Search, {
              className: "w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-semibold text-gray-900 dark:text-white mb-2",
              children: "Start your search"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto",
              children: "Enter keywords above to find articles, tutorials, and insights on technology topics."
            }), /* @__PURE__ */ jsxs("div", {
              className: "max-w-2xl mx-auto",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "text-lg font-medium text-gray-900 dark:text-white mb-4",
                children: "Popular Searches"
              }), /* @__PURE__ */ jsx("div", {
                className: "flex flex-wrap justify-center gap-2",
                children: ["React", "AI", "Blockchain", "JavaScript", "Python", "Machine Learning", "Web3", "DevOps"].map((term) => /* @__PURE__ */ jsx("button", {
                  onClick: () => setSearchQuery(term),
                  className: "px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm",
                  children: term
                }, term))
              })]
            }), articles2.length > 0 && /* @__PURE__ */ jsxs("div", {
              className: "mt-16",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "text-lg font-medium text-gray-900 dark:text-white mb-8",
                children: "Recent Articles"
              }), /* @__PURE__ */ jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                children: articles2.slice(0, 6).map((article2, index) => /* @__PURE__ */ jsx(motion.div, {
                  initial: {
                    opacity: 0,
                    y: 20
                  },
                  animate: {
                    opacity: 1,
                    y: 0
                  },
                  transition: {
                    delay: index * 0.1
                  },
                  children: /* @__PURE__ */ jsx(ArticleCard, {
                    article: article2
                  })
                }, article2.id))
              })]
            })]
          })
        )
      })]
    })
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: search,
  meta: meta$g
}, Symbol.toStringTag, { value: "Module" }));
function meta$f({}) {
  return [{
    title: "About Us - Techsy.News"
  }, {
    name: "description",
    content: "Learn about Techsy.News and our mission to deliver the latest technology insights"
  }];
}
const about = withComponentProps(function About() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-3xl font-bold text-gray-900 dark:text-white mb-8",
        children: "About Techsy.News"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-gray-600 dark:text-gray-400",
        children: "This page will contain information about the platform. Coming soon!"
      })]
    })
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$f
}, Symbol.toStringTag, { value: "Module" }));
function meta$e({}) {
  return [{
    title: "Contact Us - Techsy.News"
  }, {
    name: "description",
    content: "Get in touch with the Techsy.News team"
  }];
}
const contact = withComponentProps(function Contact() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-3xl font-bold text-gray-900 dark:text-white mb-8",
        children: "Contact Us"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-gray-600 dark:text-gray-400",
        children: "This page will contain contact information and forms. Coming soon!"
      })]
    })
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact,
  meta: meta$e
}, Symbol.toStringTag, { value: "Module" }));
const Input = forwardRef(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: inputId,
          className: "block text-sm font-medium text-gray-700 dark:text-gray-300",
          children: label
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          ref,
          id: inputId,
          className: cn(
            "block w-full px-3 py-2 border rounded-lg shadow-sm transition-colors",
            "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0",
            error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500",
            "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
            "disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:text-gray-500",
            className
          ),
          ...props
        }
      ),
      error && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: error }),
      helperText && !error && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: helperText })
    ] });
  }
);
Input.displayName = "Input";
function meta$d({}) {
  return [{
    title: "Sign In - Techsy.News"
  }, {
    name: "description",
    content: "Sign in to your Techsy.News account to access exclusive content and features."
  }];
}
const signin = withComponentProps(function SignIn() {
  const navigate = useNavigate();
  const {
    signIn
  } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const {
        error
      } = await signIn(formData.email, formData.password);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Welcome back!");
        navigate("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8",
    children: /* @__PURE__ */ jsxs(motion.div, {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      className: "max-w-md w-full space-y-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "inline-flex items-center space-x-2 mb-6",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center",
            children: /* @__PURE__ */ jsx("span", {
              className: "text-white font-bold",
              children: "T"
            })
          }), /* @__PURE__ */ jsx("span", {
            className: "text-2xl font-bold text-gray-900 dark:text-white",
            children: "Techsy.News"
          })]
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold text-gray-900 dark:text-white",
          children: "Welcome back"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-2 text-gray-600 dark:text-gray-400",
          children: "Sign in to your account to continue"
        })]
      }), /* @__PURE__ */ jsxs(motion.form, {
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        transition: {
          delay: 0.1
        },
        className: "mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700",
        onSubmit: handleSubmit,
        children: [/* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [/* @__PURE__ */ jsx(Mail, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            }), /* @__PURE__ */ jsx(Input, {
              name: "email",
              type: "email",
              placeholder: "Enter your email",
              value: formData.email,
              onChange: handleChange,
              error: errors.email,
              className: "pl-10",
              autoComplete: "email"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [/* @__PURE__ */ jsx(Lock, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            }), /* @__PURE__ */ jsx(Input, {
              name: "password",
              type: showPassword ? "text" : "password",
              placeholder: "Enter your password",
              value: formData.password,
              onChange: handleChange,
              error: errors.password,
              className: "pl-10 pr-10",
              autoComplete: "current-password"
            }), /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setShowPassword(!showPassword),
              className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
              children: showPassword ? /* @__PURE__ */ jsx(EyeOff, {
                className: "w-5 h-5"
              }) : /* @__PURE__ */ jsx(Eye, {
                className: "w-5 h-5"
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center justify-between",
          children: [/* @__PURE__ */ jsxs("label", {
            className: "flex items-center",
            children: [/* @__PURE__ */ jsx("input", {
              type: "checkbox",
              className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            }), /* @__PURE__ */ jsx("span", {
              className: "ml-2 text-sm text-gray-600 dark:text-gray-400",
              children: "Remember me"
            })]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/auth/forgot-password",
            className: "text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300",
            children: "Forgot password?"
          })]
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          loading,
          className: "w-full",
          size: "lg",
          children: "Sign In"
        }), /* @__PURE__ */ jsxs("div", {
          className: "text-center",
          children: [/* @__PURE__ */ jsxs("span", {
            className: "text-gray-600 dark:text-gray-400",
            children: ["Don't have an account?", " "]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/auth/signup",
            className: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium",
            children: "Sign up"
          })]
        })]
      }), /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        transition: {
          delay: 0.2
        },
        className: "bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-sm font-medium text-blue-900 dark:text-blue-100 mb-2",
          children: "Demo Credentials"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-xs text-blue-700 dark:text-blue-300",
          children: ["Email: demo@techsy.news", /* @__PURE__ */ jsx("br", {}), "Password: demo123456"]
        })]
      })]
    })
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signin,
  meta: meta$d
}, Symbol.toStringTag, { value: "Module" }));
function meta$c({}) {
  return [{
    title: "Sign Up - Techsy.News"
  }, {
    name: "description",
    content: "Create your Techsy.News account to access exclusive content and join our tech community."
  }];
}
const signup = withComponentProps(function SignUp() {
  const navigate = useNavigate();
  const {
    signUp
  } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const {
      name,
      value
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const {
        error
      } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Account created successfully! Please check your email to verify your account.");
        navigate("/auth/signin");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8",
    children: /* @__PURE__ */ jsxs(motion.div, {
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      className: "max-w-md w-full space-y-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "inline-flex items-center space-x-2 mb-6",
          children: [/* @__PURE__ */ jsx("div", {
            className: "w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center",
            children: /* @__PURE__ */ jsx("span", {
              className: "text-white font-bold",
              children: "T"
            })
          }), /* @__PURE__ */ jsx("span", {
            className: "text-2xl font-bold text-gray-900 dark:text-white",
            children: "Techsy.News"
          })]
        }), /* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold text-gray-900 dark:text-white",
          children: "Join our community"
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-2 text-gray-600 dark:text-gray-400",
          children: "Create your account to get started"
        })]
      }), /* @__PURE__ */ jsxs(motion.form, {
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        transition: {
          delay: 0.1
        },
        className: "mt-8 space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700",
        onSubmit: handleSubmit,
        children: [/* @__PURE__ */ jsxs("div", {
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [/* @__PURE__ */ jsx(User, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            }), /* @__PURE__ */ jsx(Input, {
              name: "fullName",
              type: "text",
              placeholder: "Enter your full name",
              value: formData.fullName,
              onChange: handleChange,
              error: errors.fullName,
              className: "pl-10",
              autoComplete: "name"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [/* @__PURE__ */ jsx(Mail, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            }), /* @__PURE__ */ jsx(Input, {
              name: "email",
              type: "email",
              placeholder: "Enter your email",
              value: formData.email,
              onChange: handleChange,
              error: errors.email,
              className: "pl-10",
              autoComplete: "email"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [/* @__PURE__ */ jsx(Lock, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            }), /* @__PURE__ */ jsx(Input, {
              name: "password",
              type: showPassword ? "text" : "password",
              placeholder: "Create a password",
              value: formData.password,
              onChange: handleChange,
              error: errors.password,
              className: "pl-10 pr-10",
              autoComplete: "new-password"
            }), /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setShowPassword(!showPassword),
              className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
              children: showPassword ? /* @__PURE__ */ jsx(EyeOff, {
                className: "w-5 h-5"
              }) : /* @__PURE__ */ jsx(Eye, {
                className: "w-5 h-5"
              })
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "relative",
            children: [/* @__PURE__ */ jsx(Lock, {
              className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            }), /* @__PURE__ */ jsx(Input, {
              name: "confirmPassword",
              type: showConfirmPassword ? "text" : "password",
              placeholder: "Confirm your password",
              value: formData.confirmPassword,
              onChange: handleChange,
              error: errors.confirmPassword,
              className: "pl-10 pr-10",
              autoComplete: "new-password"
            }), /* @__PURE__ */ jsx("button", {
              type: "button",
              onClick: () => setShowConfirmPassword(!showConfirmPassword),
              className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
              children: showConfirmPassword ? /* @__PURE__ */ jsx(EyeOff, {
                className: "w-5 h-5"
              }) : /* @__PURE__ */ jsx(Eye, {
                className: "w-5 h-5"
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-start",
          children: [/* @__PURE__ */ jsx("input", {
            type: "checkbox",
            required: true,
            className: "mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          }), /* @__PURE__ */ jsxs("span", {
            className: "ml-2 text-sm text-gray-600 dark:text-gray-400",
            children: ["I agree to the", " ", /* @__PURE__ */ jsx(Link, {
              to: "/terms",
              className: "text-blue-600 hover:text-blue-500 dark:text-blue-400",
              children: "Terms of Service"
            }), " ", "and", " ", /* @__PURE__ */ jsx(Link, {
              to: "/privacy",
              className: "text-blue-600 hover:text-blue-500 dark:text-blue-400",
              children: "Privacy Policy"
            })]
          })]
        }), /* @__PURE__ */ jsx(Button, {
          type: "submit",
          loading,
          className: "w-full",
          size: "lg",
          children: "Create Account"
        }), /* @__PURE__ */ jsxs("div", {
          className: "text-center",
          children: [/* @__PURE__ */ jsxs("span", {
            className: "text-gray-600 dark:text-gray-400",
            children: ["Already have an account?", " "]
          }), /* @__PURE__ */ jsx(Link, {
            to: "/auth/signin",
            className: "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium",
            children: "Sign in"
          })]
        })]
      })]
    })
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signup,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
function meta$b({}) {
  return [{
    title: "Profile - Techsy.News"
  }, {
    name: "description",
    content: "Manage your Techsy.News profile and settings"
  }];
}
const profile = withComponentProps(function Profile() {
  const {
    user,
    profile: profile2,
    updateProfile
  } = useAuthStore();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    website: "",
    twitter: "",
    linkedin: ""
  });
  useEffect(() => {
    if (!user) {
      navigate("/auth/signin");
      return;
    }
    if (profile2) {
      setFormData({
        full_name: profile2.full_name || "",
        bio: profile2.bio || "",
        website: profile2.website || "",
        twitter: profile2.twitter || "",
        linkedin: profile2.linkedin || ""
      });
    }
  }, [user, profile2, navigate]);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = async () => {
    if (!user || !profile2) return;
    setLoading(true);
    try {
      const {
        error
      } = await supabase.from("profiles").update(formData).eq("id", user.id);
      if (error) {
        toast.error("Failed to update profile");
        return;
      }
      await updateProfile();
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    if (profile2) {
      setFormData({
        full_name: profile2.full_name || "",
        bio: profile2.bio || "",
        website: profile2.website || "",
        twitter: profile2.twitter || "",
        linkedin: profile2.linkedin || ""
      });
    }
    setIsEditing(false);
  };
  if (!user || !profile2) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsx(LoadingSpinner, {
        size: "lg"
      })
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        className: "text-center mb-12",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl font-bold text-gray-900 dark:text-white mb-4",
          children: "My Profile"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-gray-600 dark:text-gray-400",
          children: "Manage your account information and preferences"
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
        children: [/* @__PURE__ */ jsx(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.1
          },
          className: "lg:col-span-1",
          children: /* @__PURE__ */ jsxs("div", {
            className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "text-center mb-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "relative inline-block",
                children: [profile2.avatar_url ? /* @__PURE__ */ jsx("img", {
                  src: profile2.avatar_url,
                  alt: profile2.full_name,
                  className: "w-24 h-24 rounded-full object-cover mx-auto"
                }) : /* @__PURE__ */ jsx("div", {
                  className: "w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto",
                  children: /* @__PURE__ */ jsx(User, {
                    className: "w-12 h-12 text-gray-600 dark:text-gray-400"
                  })
                }), /* @__PURE__ */ jsx("button", {
                  className: "absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors",
                  children: /* @__PURE__ */ jsx(Camera, {
                    className: "w-4 h-4"
                  })
                })]
              }), /* @__PURE__ */ jsx("h2", {
                className: "text-xl font-semibold text-gray-900 dark:text-white mt-4",
                children: profile2.full_name || "Anonymous User"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 dark:text-gray-400 capitalize",
                children: profile2.role
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center space-x-3 text-gray-600 dark:text-gray-400",
                children: [/* @__PURE__ */ jsx(Mail, {
                  className: "w-5 h-5"
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-sm",
                  children: user.email
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center space-x-3 text-gray-600 dark:text-gray-400",
                children: [/* @__PURE__ */ jsx(Calendar, {
                  className: "w-5 h-5"
                }), /* @__PURE__ */ jsxs("span", {
                  className: "text-sm",
                  children: ["Joined ", new Date(profile2.created_at).toLocaleDateString()]
                })]
              })]
            })]
          })
        }), /* @__PURE__ */ jsx(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.2
          },
          className: "lg:col-span-2",
          children: /* @__PURE__ */ jsxs("div", {
            className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between mb-6",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white",
                children: "Profile Information"
              }), !isEditing ? /* @__PURE__ */ jsxs(Button, {
                variant: "outline",
                onClick: () => setIsEditing(true),
                children: [/* @__PURE__ */ jsx(Edit, {
                  className: "w-4 h-4 mr-2"
                }), "Edit"]
              }) : /* @__PURE__ */ jsxs("div", {
                className: "flex space-x-2",
                children: [/* @__PURE__ */ jsxs(Button, {
                  variant: "outline",
                  onClick: handleCancel,
                  disabled: loading,
                  children: [/* @__PURE__ */ jsx(X, {
                    className: "w-4 h-4 mr-2"
                  }), "Cancel"]
                }), /* @__PURE__ */ jsxs(Button, {
                  onClick: handleSave,
                  loading,
                  children: [/* @__PURE__ */ jsx(Save, {
                    className: "w-4 h-4 mr-2"
                  }), "Save"]
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsx(Input, {
                label: "Full Name",
                value: formData.full_name,
                onChange: (e) => handleInputChange("full_name", e.target.value),
                disabled: !isEditing,
                placeholder: "Enter your full name"
              }), /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("label", {
                  className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                  children: "Bio"
                }), /* @__PURE__ */ jsx("textarea", {
                  value: formData.bio,
                  onChange: (e) => handleInputChange("bio", e.target.value),
                  disabled: !isEditing,
                  rows: 4,
                  placeholder: "Tell us about yourself...",
                  className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:text-gray-500"
                })]
              }), /* @__PURE__ */ jsx(Input, {
                label: "Website",
                value: formData.website,
                onChange: (e) => handleInputChange("website", e.target.value),
                disabled: !isEditing,
                placeholder: "https://yourwebsite.com",
                type: "url"
              }), /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [/* @__PURE__ */ jsx(Input, {
                  label: "Twitter",
                  value: formData.twitter,
                  onChange: (e) => handleInputChange("twitter", e.target.value),
                  disabled: !isEditing,
                  placeholder: "@username"
                }), /* @__PURE__ */ jsx(Input, {
                  label: "LinkedIn",
                  value: formData.linkedin,
                  onChange: (e) => handleInputChange("linkedin", e.target.value),
                  disabled: !isEditing,
                  placeholder: "linkedin.com/in/username"
                })]
              })]
            })]
          })
        })]
      }), /* @__PURE__ */ jsx(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.3
        },
        className: "mt-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-lg font-semibold text-gray-900 dark:text-white mb-6",
            children: "Account Settings"
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h4", {
                  className: "font-medium text-gray-900 dark:text-white",
                  children: "Email Notifications"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: "Receive notifications about new articles and updates"
                })]
              }), /* @__PURE__ */ jsxs("label", {
                className: "relative inline-flex items-center cursor-pointer",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "checkbox",
                  className: "sr-only peer",
                  defaultChecked: true
                }), /* @__PURE__ */ jsx("div", {
                  className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between py-3",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h4", {
                  className: "font-medium text-gray-900 dark:text-white",
                  children: "Newsletter Subscription"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: "Weekly digest of the latest tech news and articles"
                })]
              }), /* @__PURE__ */ jsxs("label", {
                className: "relative inline-flex items-center cursor-pointer",
                children: [/* @__PURE__ */ jsx("input", {
                  type: "checkbox",
                  className: "sr-only peer"
                }), /* @__PURE__ */ jsx("div", {
                  className: "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                })]
              })]
            })]
          })]
        })
      })]
    })
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: profile,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
function meta$a({}) {
  return [{
    title: "Settings - Techsy.News"
  }, {
    name: "description",
    content: "Manage your account settings and preferences"
  }];
}
const settings$1 = withComponentProps(function Settings2() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-3xl font-bold text-gray-900 dark:text-white mb-8",
        children: "Settings"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-gray-600 dark:text-gray-400",
        children: "This page will contain user settings and preferences. Coming soon!"
      })]
    })
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings$1,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
function meta$9({}) {
  return [{
    title: "Bookmarks - Techsy.News"
  }, {
    name: "description",
    content: "Your saved articles and bookmarks"
  }];
}
const bookmarks = withComponentProps(function Bookmarks() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen py-12",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-3xl font-bold text-gray-900 dark:text-white mb-8",
        children: "Bookmarks"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-gray-600 dark:text-gray-400",
        children: "This page will display your saved articles. Coming soon!"
      })]
    })
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bookmarks,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
function meta$8({}) {
  return [{
    title: "Admin Dashboard - Techsy.News"
  }, {
    name: "description",
    content: "Admin dashboard for managing Techsy.News"
  }];
}
const admin = withComponentProps(function Admin() {
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const {
    articles: articles2,
    categories: categories2,
    loading,
    fetchAllArticles
  } = useArticlesStore();
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
    fetchAllArticles();
  }, [fetchAllArticles]);
  useEffect(() => {
    if (articles2.length > 0) {
      const publishedArticles = articles2.filter((article2) => article2.status === "published");
      const draftArticles = articles2.filter((article2) => article2.status === "draft");
      const totalViews = publishedArticles.reduce((sum, article2) => sum + article2.views, 0);
      const totalLikes = publishedArticles.reduce((sum, article2) => sum + article2.likes, 0);
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const publishedToday = publishedArticles.filter((article2) => article2.published_at && new Date(article2.published_at).toDateString() === today).length;
      setStats({
        totalArticles: articles2.length,
        publishedArticles: publishedArticles.length,
        draftArticles: draftArticles.length,
        totalViews,
        totalLikes,
        totalUsers: 1250,
        // Mock data - will be replaced with real data
        publishedToday
      });
    }
  }, [articles2]);
  if (!user || (profile2 == null ? void 0 : profile2.role) !== "admin") {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to access the admin dashboard."
        })]
      })
    });
  }
  const statCards = [{
    title: "Total Articles",
    value: formatNumber(stats.totalArticles),
    subtitle: `${stats.publishedArticles} published, ${stats.draftArticles} drafts`,
    icon: FileText,
    color: "blue",
    change: "+12%"
  }, {
    title: "Published Articles",
    value: formatNumber(stats.publishedArticles),
    subtitle: `${stats.publishedToday} published today`,
    icon: Eye,
    color: "green",
    change: "+8%"
  }, {
    title: "Total Views",
    value: formatNumber(stats.totalViews),
    subtitle: "From published articles",
    icon: TrendingUp,
    color: "purple",
    change: "+15%"
  }, {
    title: "Total Likes",
    value: formatNumber(stats.totalLikes),
    subtitle: "User engagement",
    icon: Heart,
    color: "red",
    change: "+5%"
  }];
  const quickActions = [{
    title: "New Article",
    description: "Create a new article",
    icon: Plus,
    href: "/admin/articles/new",
    color: "blue"
  }, {
    title: "Manage Articles",
    description: "View and edit all articles",
    icon: FileText,
    href: "/admin/articles",
    color: "indigo"
  }, {
    title: "Manage Categories",
    description: "Add or edit categories",
    icon: Folder,
    href: "/admin/categories",
    color: "green"
  }, {
    title: "Manage Tags",
    description: "Add or edit tags",
    icon: Tag,
    href: "/admin/tags",
    color: "yellow"
  }, {
    title: "Analytics",
    description: "View detailed analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "purple"
  }, {
    title: "Comments",
    description: "Moderate comments",
    icon: MessageSquare,
    href: "/admin/comments",
    color: "orange"
  }, {
    title: "Settings",
    description: "Site configuration",
    icon: Settings,
    href: "/admin/settings",
    color: "gray"
  }];
  const recentArticles = articles2.slice(0, 5);
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "mb-8",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-3xl font-bold text-gray-900 dark:text-white mb-2",
          children: "Admin Dashboard"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: ["Welcome back, ", profile2 == null ? void 0 : profile2.full_name, ". Here's what's happening with your site."]
        })]
      }), loading ? /* @__PURE__ */ jsx("div", {
        className: "flex justify-center py-12",
        children: /* @__PURE__ */ jsx(LoadingSpinner, {
          size: "lg"
        })
      }) : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
          children: statCards.map((stat, index) => {
            const Icon = stat.icon;
            return /* @__PURE__ */ jsx(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: index * 0.1
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                    children: stat.title
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-2xl font-bold text-gray-900 dark:text-white",
                    children: stat.value
                  }), stat.subtitle && /* @__PURE__ */ jsx("p", {
                    className: "text-xs text-gray-500 dark:text-gray-400 mt-1",
                    children: stat.subtitle
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-sm text-green-600 dark:text-green-400 mt-1",
                    children: [stat.change, " from last month"]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: `p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`,
                  children: /* @__PURE__ */ jsx(Icon, {
                    className: `w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`
                  })
                })]
              })
            }, stat.title);
          })
        }), /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.4
          },
          className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-xl font-semibold text-gray-900 dark:text-white mb-6",
            children: "Quick Actions"
          }), /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            children: quickActions.map((action) => {
              const Icon = action.icon;
              return /* @__PURE__ */ jsx(Link, {
                to: action.href,
                className: "group p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors",
                children: /* @__PURE__ */ jsxs("div", {
                  className: "flex items-start space-x-3",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: `p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/20 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-900/30 transition-colors`,
                    children: /* @__PURE__ */ jsx(Icon, {
                      className: `w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`
                    })
                  }), /* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("h3", {
                      className: "font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
                      children: action.title
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-sm text-gray-600 dark:text-gray-400",
                      children: action.description
                    })]
                  })]
                })
              }, action.title);
            })
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
          children: [/* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: 0.5
            },
            className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between mb-6",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-xl font-semibold text-gray-900 dark:text-white",
                children: "Recent Articles"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/admin/articles",
                children: /* @__PURE__ */ jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View All"
                })
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "space-y-4",
              children: recentArticles.length > 0 ? recentArticles.map((article2) => /* @__PURE__ */ jsxs("div", {
                className: "flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
                children: [/* @__PURE__ */ jsx("img", {
                  src: article2.featured_image || "/images/placeholder.svg",
                  alt: article2.title,
                  className: "w-12 h-12 rounded object-cover"
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "text-sm font-medium text-gray-900 dark:text-white truncate",
                    children: article2.title
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-xs text-gray-500 dark:text-gray-400 mt-1",
                    children: [article2.author.full_name, " • ", article2.views, " views"]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400",
                  children: /* @__PURE__ */ jsx("span", {
                    className: `px-2 py-1 rounded-full ${article2.status === "published" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"}`,
                    children: article2.status
                  })
                })]
              }, article2.id)) : /* @__PURE__ */ jsxs("div", {
                className: "text-center py-8 text-gray-500 dark:text-gray-400",
                children: [/* @__PURE__ */ jsx(FileText, {
                  className: "w-8 h-8 mx-auto mb-2 opacity-50"
                }), /* @__PURE__ */ jsx("p", {
                  children: "No articles yet"
                })]
              })
            })]
          }), /* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: 0.6
            },
            className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between mb-6",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-xl font-semibold text-gray-900 dark:text-white",
                children: "Analytics Overview"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/admin/analytics",
                children: /* @__PURE__ */ jsx(Button, {
                  variant: "outline",
                  size: "sm",
                  children: "View Details"
                })
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg",
                    children: /* @__PURE__ */ jsx(TrendingUp, {
                      className: "w-4 h-4 text-blue-600 dark:text-blue-400"
                    })
                  }), /* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-sm font-medium text-gray-900 dark:text-white",
                      children: "Page Views Today"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-gray-500 dark:text-gray-400",
                      children: "+12% from yesterday"
                    })]
                  })]
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-lg font-bold text-gray-900 dark:text-white",
                  children: "2,847"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "p-2 bg-green-100 dark:bg-green-900/20 rounded-lg",
                    children: /* @__PURE__ */ jsx(Users, {
                      className: "w-4 h-4 text-green-600 dark:text-green-400"
                    })
                  }), /* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-sm font-medium text-gray-900 dark:text-white",
                      children: "New Users Today"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-gray-500 dark:text-gray-400",
                      children: "+8% from yesterday"
                    })]
                  })]
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-lg font-bold text-gray-900 dark:text-white",
                  children: "127"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg",
                    children: /* @__PURE__ */ jsx(Calendar, {
                      className: "w-4 h-4 text-purple-600 dark:text-purple-400"
                    })
                  }), /* @__PURE__ */ jsxs("div", {
                    children: [/* @__PURE__ */ jsx("p", {
                      className: "text-sm font-medium text-gray-900 dark:text-white",
                      children: "Articles This Week"
                    }), /* @__PURE__ */ jsx("p", {
                      className: "text-xs text-gray-500 dark:text-gray-400",
                      children: "+3 from last week"
                    })]
                  })]
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-lg font-bold text-gray-900 dark:text-white",
                  children: "12"
                })]
              })]
            })]
          })]
        })]
      })]
    })
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: admin,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
function meta$7({}) {
  return [{
    title: "Manage Articles - Admin - Techsy.News"
  }, {
    name: "description",
    content: "Manage all articles in Techsy.News admin panel"
  }];
}
const articles = withComponentProps(function AdminArticles() {
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const {
    articles: articles2,
    fetchAllArticles,
    deleteArticle
  } = useArticlesStore();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleting, setDeleting] = useState(null);
  useEffect(() => {
    fetchAllArticles();
  }, [fetchAllArticles]);
  if (!user || (profile2 == null ? void 0 : profile2.role) !== "admin") {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to manage articles."
        })]
      })
    });
  }
  const filteredArticles = articles2.filter((article2) => {
    const matchesSearch = article2.title.toLowerCase().includes(searchQuery.toLowerCase()) || article2.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || article2.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const handleDeleteArticle = async (articleId, articleTitle) => {
    if (!confirm(`Are you sure you want to delete "${articleTitle}"? This action cannot be undone.`)) {
      return;
    }
    try {
      setDeleting(articleId);
      const result = await deleteArticle(articleId);
      if (result.success) {
        toast.success("Article deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete article");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setDeleting(null);
    }
  };
  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      archived: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    };
    return /* @__PURE__ */ jsx("span", {
      className: `px-2 py-1 text-xs font-medium rounded-full ${styles[status] || styles.draft}`,
      children: status.charAt(0).toUpperCase() + status.slice(1)
    });
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/admin",
            className: "p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-5 h-5 text-gray-600 dark:text-gray-400"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-white",
              children: "Manage Articles"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mt-2",
              children: "Create, edit, and manage all your articles"
            })]
          })]
        }), /* @__PURE__ */ jsx(Link, {
          to: "/admin/articles/new",
          children: /* @__PURE__ */ jsxs(Button, {
            children: [/* @__PURE__ */ jsx(Plus, {
              className: "w-4 h-4 mr-2"
            }), "New Article"]
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row gap-4",
          children: [/* @__PURE__ */ jsx("div", {
            className: "flex-1",
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative",
              children: [/* @__PURE__ */ jsx(Search, {
                className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
              }), /* @__PURE__ */ jsx(Input, {
                placeholder: "Search articles...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-10"
              })]
            })
          }), /* @__PURE__ */ jsx("div", {
            className: "sm:w-48",
            children: /* @__PURE__ */ jsxs("select", {
              value: statusFilter,
              onChange: (e) => setStatusFilter(e.target.value),
              className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              children: [/* @__PURE__ */ jsx("option", {
                value: "all",
                children: "All Status"
              }), /* @__PURE__ */ jsx("option", {
                value: "published",
                children: "Published"
              }), /* @__PURE__ */ jsx("option", {
                value: "draft",
                children: "Draft"
              }), /* @__PURE__ */ jsx("option", {
                value: "archived",
                children: "Archived"
              })]
            })
          })]
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        children: [/* @__PURE__ */ jsx("div", {
          className: "p-6 border-b border-gray-200 dark:border-gray-700",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex items-center justify-between",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-xl font-semibold text-gray-900 dark:text-white",
              children: ["Articles (", filteredArticles.length, ")"]
            }), /* @__PURE__ */ jsxs("div", {
              className: "text-sm text-gray-500 dark:text-gray-400",
              children: [articles2.filter((a) => a.status === "published").length, " published, ", articles2.filter((a) => a.status === "draft").length, " drafts"]
            })]
          })
        }), loading ? /* @__PURE__ */ jsx("div", {
          className: "flex justify-center py-12",
          children: /* @__PURE__ */ jsx(LoadingSpinner, {
            size: "lg"
          })
        }) : filteredArticles.length === 0 ? /* @__PURE__ */ jsxs("div", {
          className: "text-center py-12",
          children: [/* @__PURE__ */ jsx(Eye, {
            className: "w-12 h-12 text-gray-400 mx-auto mb-4"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-500 dark:text-gray-400",
            children: searchQuery || statusFilter !== "all" ? "No articles match your filters" : "No articles found. Create your first article to get started."
          }), !searchQuery && statusFilter === "all" && /* @__PURE__ */ jsx(Link, {
            to: "/admin/articles/new",
            className: "mt-4 inline-block",
            children: /* @__PURE__ */ jsxs(Button, {
              children: [/* @__PURE__ */ jsx(Plus, {
                className: "w-4 h-4 mr-2"
              }), "Create First Article"]
            })
          })]
        }) : /* @__PURE__ */ jsx("div", {
          className: "divide-y divide-gray-200 dark:divide-gray-700",
          children: filteredArticles.map((article2, index) => /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: index * 0.05
            },
            className: "p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-start justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex-1 min-w-0",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3 mb-2",
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "text-lg font-medium text-gray-900 dark:text-white truncate",
                    children: article2.title
                  }), getStatusBadge(article2.status), article2.featured && /* @__PURE__ */ jsx("span", {
                    className: "px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
                    children: "Featured"
                  })]
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2",
                  children: article2.excerpt
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400",
                  children: [/* @__PURE__ */ jsxs("span", {
                    children: ["By ", article2.author.full_name]
                  }), /* @__PURE__ */ jsx("span", {
                    children: "•"
                  }), /* @__PURE__ */ jsx("span", {
                    children: formatRelativeTime(article2.created_at)
                  }), /* @__PURE__ */ jsx("span", {
                    children: "•"
                  }), /* @__PURE__ */ jsxs("span", {
                    children: [article2.views, " views"]
                  }), /* @__PURE__ */ jsx("span", {
                    children: "•"
                  }), /* @__PURE__ */ jsxs("span", {
                    children: [article2.likes, " likes"]
                  }), article2.reading_time && /* @__PURE__ */ jsxs(Fragment, {
                    children: [/* @__PURE__ */ jsx("span", {
                      children: "•"
                    }), /* @__PURE__ */ jsxs("span", {
                      children: [article2.reading_time, " min read"]
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center space-x-2 ml-4",
                children: [article2.status === "published" && /* @__PURE__ */ jsx(Link, {
                  to: `/article/${article2.slug}`,
                  className: "p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                  title: "View Article",
                  children: /* @__PURE__ */ jsx(Eye, {
                    className: "w-4 h-4"
                  })
                }), /* @__PURE__ */ jsx(Link, {
                  to: `/admin/articles/${article2.id}/edit`,
                  className: "p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors",
                  title: "Edit Article",
                  children: /* @__PURE__ */ jsx(Edit, {
                    className: "w-4 h-4"
                  })
                }), /* @__PURE__ */ jsx("button", {
                  onClick: () => handleDeleteArticle(article2.id, article2.title),
                  disabled: deleting === article2.id,
                  className: "p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50",
                  title: "Delete Article",
                  children: deleting === article2.id ? /* @__PURE__ */ jsx("div", {
                    className: "w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"
                  }) : /* @__PURE__ */ jsx(Trash2, {
                    className: "w-4 h-4"
                  })
                })]
              })]
            })
          }, article2.id))
        })]
      })]
    })
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: articles,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function ImageUpload({
  value,
  onChange,
  onRemove,
  className,
  disabled = false,
  placeholder = "https://example.com/image.jpg"
}) {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const handleUrlSubmit = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (!validateImageUrl(url)) {
      toast.error("Please enter a valid image URL");
      return;
    }
    const img = new Image();
    img.onload = () => {
      onChange(url);
      setUrlInput("");
      setShowUrlInput(false);
      toast.success("Image added successfully!");
    };
    img.onerror = () => {
      toast.error("Failed to load image. Please check the URL.");
    };
    img.src = url;
  };
  const handleFileSelect = (file) => {
    alert("File upload functionality will be implemented with Supabase Storage. For now, please use image URLs.");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find((file) => file.type.startsWith("image/"));
    if (imageFile) {
      handleFileSelect();
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleFileInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      handleFileSelect();
    }
  };
  if (value) {
    return /* @__PURE__ */ jsxs("div", { className: cn("relative group", className), children: [
      /* @__PURE__ */ jsxs("div", { className: "relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: value,
            alt: "Featured image",
            className: "w-full h-48 object-cover",
            onError: (e) => {
              const target = e.target;
              target.src = "/images/placeholder.svg";
            }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center", children: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              if (onRemove) {
                onRemove();
              } else {
                onChange("");
              }
            },
            className: "opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 hover:bg-gray-100",
            disabled,
            children: [
              /* @__PURE__ */ jsx(X, { className: "w-4 h-4 mr-2" }),
              "Remove"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-2 truncate", children: value })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-4", className), children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          dragActive ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
          disabled && "opacity-50 cursor-not-allowed"
        ),
        onDrop: handleDrop,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              onChange: handleFileInputChange,
              className: "hidden",
              disabled
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-gray-400" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
                "Drop an image here, or",
                " ",
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      var _a;
                      return (_a = fileInputRef.current) == null ? void 0 : _a.click();
                    },
                    className: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium",
                    disabled,
                    children: "browse files"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-500 mt-1", children: "PNG, JPG, GIF up to 10MB" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-gray-300 dark:bg-gray-600" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: "OR" }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-gray-300 dark:bg-gray-600" })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: () => setShowUrlInput(true),
                disabled,
                children: [
                  /* @__PURE__ */ jsx(Link$2, { className: "w-4 h-4 mr-2" }),
                  "Add Image URL"
                ]
              }
            )
          ] })
        ]
      }
    ),
    showUrlInput && /* @__PURE__ */ jsxs("div", { className: "space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Image$2, { className: "w-4 h-4 text-gray-500" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: "Add Image URL" })
      ] }),
      /* @__PURE__ */ jsx(
        Input,
        {
          value: urlInput,
          onChange: (e) => setUrlInput(e.target.value),
          placeholder,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleUrlSubmit();
            }
          },
          disabled
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            size: "sm",
            onClick: handleUrlSubmit,
            disabled: !urlInput.trim() || disabled,
            children: "Add Image"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: () => {
              setShowUrlInput(false);
              setUrlInput("");
            },
            disabled,
            children: "Cancel"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Quick suggestions (click to use):" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop"
      ].map((url, index) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onChange(url),
          className: "text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors",
          disabled,
          children: [
            "Tech Image ",
            index + 1
          ]
        },
        index
      )) })
    ] })
  ] });
}
function meta$6({}) {
  return [{
    title: "Create New Article - Admin - Techsy.News"
  }, {
    name: "description",
    content: "Create a new article for Techsy.News"
  }];
}
const articleSchema$1 = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt too long"),
  categoryId: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional()
});
const _new = withComponentProps(function NewArticle() {
  var _a, _b;
  const navigate = useNavigate();
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const {
    categories: categories2,
    tags: tags2,
    fetchCategories,
    fetchTags,
    createArticle
  } = useArticlesStore();
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(articleSchema$1),
    defaultValues: {
      status: "draft",
      featured: false
    }
  });
  const watchTitle = watch("title");
  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, [fetchCategories, fetchTags]);
  useEffect(() => {
    if (watchTitle) {
      const slug = generateSlug(watchTitle);
      setValue("slug", slug);
    }
  }, [watchTitle, setValue]);
  if (!user || !profile2 || !["author", "admin"].includes(profile2.role)) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to create articles."
        })]
      })
    });
  }
  const onSubmit = async (data) => {
    if (!content.trim()) {
      toast.error("Article content is required");
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
        featuredImage: featuredImage || data.featuredImage,
        author_id: user.id,
        categoryId: data.categoryId,
        status: data.status,
        featured: data.featured || false,
        reading_time: readingTime,
        tags: selectedTags,
        published_at: data.status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null
      };
      const result = await createArticle(articleData);
      if (result.success) {
        toast.success(`Article ${data.status === "published" ? "published" : "saved as draft"} successfully!`);
        navigate("/admin");
      } else {
        toast.error(result.error || "Failed to save article");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Failed to save article");
    } finally {
      setLoading(false);
    }
  };
  const handleTagToggle = (tagId) => {
    setSelectedTags((prev) => prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-3xl font-bold text-gray-900 dark:text-white",
            children: "Create New Article"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-600 dark:text-gray-400 mt-2",
            children: "Write and publish your technology insights"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsxs(Button, {
            variant: "outline",
            onClick: () => setPreviewMode(!previewMode),
            children: [/* @__PURE__ */ jsx(Eye, {
              className: "w-4 h-4 mr-2"
            }), previewMode ? "Edit" : "Preview"]
          }), /* @__PURE__ */ jsx(Button, {
            variant: "outline",
            onClick: () => navigate("/admin"),
            children: "Cancel"
          })]
        })]
      }), /* @__PURE__ */ jsx("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-2 space-y-6",
            children: [/* @__PURE__ */ jsx(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsx(Input, {
                label: "Article Title",
                ...register("title"),
                error: (_a = errors.title) == null ? void 0 : _a.message,
                placeholder: "Enter a compelling title...",
                className: "text-lg"
              })
            }), /* @__PURE__ */ jsx(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.1
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsx(Input, {
                label: "URL Slug",
                ...register("slug"),
                error: (_b = errors.slug) == null ? void 0 : _b.message,
                placeholder: "article-url-slug",
                helperText: "This will be used in the article URL"
              })
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.2
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                children: "Article Excerpt"
              }), /* @__PURE__ */ jsx("textarea", {
                ...register("excerpt"),
                rows: 3,
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
                placeholder: "Write a brief summary of your article..."
              }), errors.excerpt && /* @__PURE__ */ jsx("p", {
                className: "text-sm text-red-600 dark:text-red-400 mt-1",
                children: errors.excerpt.message
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.3
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("label", {
                className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4",
                children: "Article Content"
              }), previewMode ? /* @__PURE__ */ jsx(RichTextEditor, {
                content,
                onChange: () => {
                },
                editable: false
              }) : /* @__PURE__ */ jsx(RichTextEditor, {
                content,
                onChange: setContent,
                placeholder: "Start writing your article..."
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.4
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Publish Settings"
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Status"
                  }), /* @__PURE__ */ jsxs("select", {
                    ...register("status"),
                    className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      value: "draft",
                      children: "Draft"
                    }), /* @__PURE__ */ jsx("option", {
                      value: "published",
                      children: "Published"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center",
                  children: [/* @__PURE__ */ jsx("input", {
                    type: "checkbox",
                    ...register("featured"),
                    className: "rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  }), /* @__PURE__ */ jsx("label", {
                    className: "ml-2 text-sm text-gray-700 dark:text-gray-300",
                    children: "Featured article"
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex space-x-2",
                  children: [/* @__PURE__ */ jsxs(Button, {
                    type: "submit",
                    loading,
                    className: "flex-1",
                    onClick: () => setValue("status", "draft"),
                    children: [/* @__PURE__ */ jsx(Save, {
                      className: "w-4 h-4 mr-2"
                    }), "Save Draft"]
                  }), /* @__PURE__ */ jsx(Button, {
                    type: "submit",
                    loading,
                    onClick: () => setValue("status", "published"),
                    children: "Publish"
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.5
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Category"
              }), /* @__PURE__ */ jsxs("select", {
                ...register("categoryId"),
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
                children: [/* @__PURE__ */ jsx("option", {
                  value: "",
                  children: "Select a category"
                }), categories2.map((category2) => /* @__PURE__ */ jsx("option", {
                  value: category2.id,
                  children: category2.name
                }, category2.id))]
              }), errors.categoryId && /* @__PURE__ */ jsx("p", {
                className: "text-sm text-red-600 dark:text-red-400 mt-1",
                children: errors.categoryId.message
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.6
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Tags"
              }), /* @__PURE__ */ jsx("div", {
                className: "flex flex-wrap gap-2",
                children: tags2.map((tag2) => /* @__PURE__ */ jsx("button", {
                  type: "button",
                  onClick: () => handleTagToggle(tag2.id),
                  className: `px-3 py-1 rounded-full text-sm transition-colors ${selectedTags.includes(tag2.id) ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`,
                  children: tag2.name
                }, tag2.id))
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.7
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Featured Image"
              }), /* @__PURE__ */ jsx(ImageUpload, {
                value: featuredImage,
                onChange: (url) => {
                  setFeaturedImage(url);
                  setValue("featuredImage", url);
                },
                placeholder: "Enter image URL"
              })]
            })]
          })]
        })
      })]
    })
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _new,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({
  params
}) {
  return [{
    title: `Edit Article - Admin - Techsy.News`
  }, {
    name: "description",
    content: "Edit article in Techsy.News admin panel"
  }];
}
const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required").max(500, "Excerpt too long"),
  categoryId: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional()
});
const edit = withComponentProps(function EditArticle() {
  var _a, _b;
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const {
    categories: categories2,
    tags: tags2,
    fetchCategories,
    fetchTags,
    updateArticle
  } = useArticlesStore();
  const [article2, setArticle] = useState(null);
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(articleSchema)
  });
  const watchTitle = watch("title");
  useEffect(() => {
    fetchCategories();
    fetchTags();
    fetchArticle();
  }, [id, fetchCategories, fetchTags]);
  useEffect(() => {
    if (watchTitle && article2 && !article2.slug_locked) {
      const slug = generateSlug(watchTitle);
      setValue("slug", slug);
    }
  }, [watchTitle, setValue, article2]);
  const fetchArticle = async () => {
    var _a2;
    if (!id) return;
    try {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from("articles").select(`
          *,
          author:profiles!articles_author_id_fkey(id, full_name, avatar_url),
          category:categories!articles_category_id_fkey(*),
          article_tags(tag:tags(*))
        `).eq("id", id).single();
      if (error) {
        console.error("Error fetching article:", error);
        toast.error("Failed to load article");
        navigate("/admin/articles");
        return;
      }
      setArticle(data);
      setContent(data.content || "");
      setFeaturedImage(data.featured_image || "");
      setSelectedTags(((_a2 = data.article_tags) == null ? void 0 : _a2.map((at) => at.tag.id)) || []);
      setValue("title", data.title);
      setValue("slug", data.slug);
      setValue("excerpt", data.excerpt);
      setValue("categoryId", data.category_id);
      setValue("status", data.status);
      setValue("featured", data.featured || false);
      setValue("featuredImage", data.featured_image || "");
    } catch (error) {
      console.error("Error fetching article:", error);
      toast.error("Failed to load article");
      navigate("/admin/articles");
    } finally {
      setLoading(false);
    }
  };
  if (!user || !profile2 || !["author", "admin"].includes(profile2.role)) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to edit articles."
        })]
      })
    });
  }
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsx(LoadingSpinner, {
        size: "lg"
      })
    });
  }
  if (!article2) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Article Not Found"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400 mb-4",
          children: "The article you're trying to edit doesn't exist."
        }), /* @__PURE__ */ jsx(Button, {
          onClick: () => navigate("/admin/articles"),
          children: "Back to Articles"
        })]
      })
    });
  }
  const onSubmit = async (data) => {
    if (!article2) return;
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
        published_at: data.status === "published" && article2.status !== "published" ? (/* @__PURE__ */ new Date()).toISOString() : article2.published_at
      };
      const result = await updateArticle(article2.id, articleData);
      if (result.success) {
        toast.success(`Article ${data.status === "published" ? "published" : "updated"} successfully!`);
        navigate("/admin/articles");
      } else {
        toast.error(result.error || "Failed to update article");
      }
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };
  const handleTagToggle = (tagId) => {
    setSelectedTags((prev) => prev.includes(tagId) ? prev.filter((id2) => id2 !== tagId) : [...prev, tagId]);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-3xl font-bold text-gray-900 dark:text-white",
            children: "Edit Article"
          }), /* @__PURE__ */ jsxs("p", {
            className: "text-gray-600 dark:text-gray-400 mt-2",
            children: ["Editing: ", article2.title]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsxs(Button, {
            variant: "outline",
            onClick: () => setPreviewMode(!previewMode),
            children: [/* @__PURE__ */ jsx(Eye, {
              className: "w-4 h-4 mr-2"
            }), previewMode ? "Edit" : "Preview"]
          }), /* @__PURE__ */ jsx(Button, {
            variant: "outline",
            onClick: () => navigate("/admin/articles"),
            children: "Cancel"
          })]
        })]
      }), /* @__PURE__ */ jsx("form", {
        onSubmit: handleSubmit(onSubmit),
        className: "space-y-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "lg:col-span-2 space-y-6",
            children: [/* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-xl font-semibold text-gray-900 dark:text-white mb-6",
                children: "Article Information"
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Title *"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register("title"),
                    placeholder: "Enter article title",
                    error: (_a = errors.title) == null ? void 0 : _a.message
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Slug *"
                  }), /* @__PURE__ */ jsx(Input, {
                    ...register("slug"),
                    placeholder: "article-url-slug",
                    error: (_b = errors.slug) == null ? void 0 : _b.message
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Excerpt *"
                  }), /* @__PURE__ */ jsx("textarea", {
                    ...register("excerpt"),
                    rows: 3,
                    className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                    placeholder: "Brief description of the article"
                  }), errors.excerpt && /* @__PURE__ */ jsx("p", {
                    className: "mt-1 text-sm text-red-600 dark:text-red-400",
                    children: errors.excerpt.message
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.1
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-xl font-semibold text-gray-900 dark:text-white mb-6",
                children: "Content"
              }), previewMode ? /* @__PURE__ */ jsx("div", {
                className: "prose dark:prose-invert max-w-none",
                children: /* @__PURE__ */ jsx("div", {
                  dangerouslySetInnerHTML: {
                    __html: content
                  }
                })
              }) : /* @__PURE__ */ jsx(RichTextEditor, {
                content,
                onChange: setContent,
                placeholder: "Write your article content here..."
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "space-y-6",
            children: [/* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.2
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Publish Settings"
              }), /* @__PURE__ */ jsxs("div", {
                className: "space-y-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("label", {
                    className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                    children: "Status"
                  }), /* @__PURE__ */ jsxs("select", {
                    ...register("status"),
                    className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    children: [/* @__PURE__ */ jsx("option", {
                      value: "draft",
                      children: "Draft"
                    }), /* @__PURE__ */ jsx("option", {
                      value: "published",
                      children: "Published"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center",
                  children: [/* @__PURE__ */ jsx("input", {
                    type: "checkbox",
                    ...register("featured"),
                    className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  }), /* @__PURE__ */ jsx("label", {
                    className: "ml-2 text-sm text-gray-700 dark:text-gray-300",
                    children: "Featured Article"
                  })]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-700",
                children: /* @__PURE__ */ jsx("div", {
                  className: "flex space-x-3",
                  children: /* @__PURE__ */ jsx(Button, {
                    type: "submit",
                    disabled: saving,
                    className: "flex-1",
                    children: saving ? /* @__PURE__ */ jsxs(Fragment, {
                      children: [/* @__PURE__ */ jsx("div", {
                        className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"
                      }), "Saving..."]
                    }) : /* @__PURE__ */ jsxs(Fragment, {
                      children: [/* @__PURE__ */ jsx(Save, {
                        className: "w-4 h-4 mr-2"
                      }), "Update Article"]
                    })
                  })
                })
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.3
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Category"
              }), /* @__PURE__ */ jsxs("select", {
                ...register("categoryId"),
                className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                children: [/* @__PURE__ */ jsx("option", {
                  value: "",
                  children: "Select a category"
                }), categories2.map((category2) => /* @__PURE__ */ jsx("option", {
                  value: category2.id,
                  children: category2.name
                }, category2.id))]
              }), errors.categoryId && /* @__PURE__ */ jsx("p", {
                className: "mt-1 text-sm text-red-600 dark:text-red-400",
                children: errors.categoryId.message
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.4
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Tags"
              }), /* @__PURE__ */ jsx("div", {
                className: "space-y-2 max-h-48 overflow-y-auto",
                children: tags2.map((tag2) => /* @__PURE__ */ jsxs("label", {
                  className: "flex items-center",
                  children: [/* @__PURE__ */ jsx("input", {
                    type: "checkbox",
                    checked: selectedTags.includes(tag2.id),
                    onChange: () => handleTagToggle(tag2.id),
                    className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  }), /* @__PURE__ */ jsx("span", {
                    className: "ml-2 text-sm text-gray-700 dark:text-gray-300",
                    children: tag2.name
                  })]
                }, tag2.id))
              })]
            }), /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                y: 20
              },
              animate: {
                opacity: 1,
                y: 0
              },
              transition: {
                delay: 0.5
              },
              className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
                children: "Featured Image"
              }), /* @__PURE__ */ jsx(ImageUpload, {
                value: featuredImage,
                onChange: (url) => {
                  setFeaturedImage(url);
                  setValue("featuredImage", url);
                },
                placeholder: "Enter image URL"
              })]
            })]
          })]
        })
      })]
    })
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: edit,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [{
    title: "Manage Categories - Admin - Techsy.News"
  }, {
    name: "description",
    content: "Manage article categories in Techsy.News admin panel"
  }];
}
const categories = withComponentProps(function AdminCategories() {
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const {
    categories: categories2,
    fetchCategories
  } = useArticlesStore();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#3b82f6"
  });
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  if (!user || (profile2 == null ? void 0 : profile2.role) !== "admin") {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to manage categories."
        })]
      })
    });
  }
  const generateSlug2 = (name) => {
    return name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const categoryData = {
        name: formData.name,
        slug: formData.slug || generateSlug2(formData.name),
        description: formData.description,
        color: formData.color
      };
      if (editingCategory) {
        const {
          error
        } = await supabase.from("categories").update(categoryData).eq("id", editingCategory.id);
        if (error) throw error;
        toast.success("Category updated successfully!");
      } else {
        const {
          error
        } = await supabase.from("categories").insert(categoryData);
        if (error) throw error;
        toast.success("Category created successfully!");
      }
      setFormData({
        name: "",
        slug: "",
        description: "",
        color: "#3b82f6"
      });
      setShowForm(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      toast.error(error.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (category2) => {
    setEditingCategory(category2);
    setFormData({
      name: category2.name,
      slug: category2.slug,
      description: category2.description || "",
      color: category2.color
    });
    setShowForm(true);
  };
  const handleDelete = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const {
        error
      } = await supabase.from("categories").delete().eq("id", categoryId);
      if (error) throw error;
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      toast.error(error.message || "Failed to delete category");
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "#3b82f6"
    });
    setShowForm(false);
    setEditingCategory(null);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/admin",
            className: "p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-5 h-5 text-gray-600 dark:text-gray-400"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-white",
              children: "Manage Categories"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mt-2",
              children: "Organize your content with categories"
            })]
          })]
        }), /* @__PURE__ */ jsxs(Button, {
          onClick: () => setShowForm(true),
          children: [/* @__PURE__ */ jsx(Plus, {
            className: "w-4 h-4 mr-2"
          }), "Add Category"]
        })]
      }), showForm && /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: -20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-xl font-semibold text-gray-900 dark:text-white mb-6",
          children: editingCategory ? "Edit Category" : "Add New Category"
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit,
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsx(Input, {
              label: "Category Name",
              value: formData.name,
              onChange: (e) => {
                const name = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  name,
                  slug: generateSlug2(name)
                }));
              },
              placeholder: "e.g., Artificial Intelligence",
              required: true
            }), /* @__PURE__ */ jsx(Input, {
              label: "Slug",
              value: formData.slug,
              onChange: (e) => setFormData((prev) => ({
                ...prev,
                slug: e.target.value
              })),
              placeholder: "e.g., artificial-intelligence",
              required: true
            })]
          }), /* @__PURE__ */ jsx(Input, {
            label: "Description",
            value: formData.description,
            onChange: (e) => setFormData((prev) => ({
              ...prev,
              description: e.target.value
            })),
            placeholder: "Brief description of the category"
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("label", {
              className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              children: "Color"
            }), /* @__PURE__ */ jsx("input", {
              type: "color",
              value: formData.color,
              onChange: (e) => setFormData((prev) => ({
                ...prev,
                color: e.target.value
              })),
              className: "w-16 h-10 rounded border border-gray-300 dark:border-gray-600"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center space-x-4",
            children: [/* @__PURE__ */ jsx(Button, {
              type: "submit",
              loading,
              children: editingCategory ? "Update Category" : "Create Category"
            }), /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: resetForm,
              children: "Cancel"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        children: [/* @__PURE__ */ jsx("div", {
          className: "p-6 border-b border-gray-200 dark:border-gray-700",
          children: /* @__PURE__ */ jsxs("h2", {
            className: "text-xl font-semibold text-gray-900 dark:text-white",
            children: ["Categories (", categories2.length, ")"]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "p-6",
          children: categories2.length === 0 ? /* @__PURE__ */ jsxs("div", {
            className: "text-center py-12",
            children: [/* @__PURE__ */ jsx(Folder, {
              className: "w-12 h-12 text-gray-400 mx-auto mb-4"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-500 dark:text-gray-400",
              children: "No categories found. Create your first category to get started."
            })]
          }) : /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            children: categories2.map((category2) => /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                scale: 0.95
              },
              animate: {
                opacity: 1,
                scale: 1
              },
              className: "p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start justify-between mb-3",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3",
                  children: [/* @__PURE__ */ jsx("div", {
                    className: "w-4 h-4 rounded",
                    style: {
                      backgroundColor: category2.color
                    }
                  }), /* @__PURE__ */ jsx("h3", {
                    className: "font-medium text-gray-900 dark:text-white",
                    children: category2.name
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-2",
                  children: [/* @__PURE__ */ jsx("button", {
                    onClick: () => handleEdit(category2),
                    className: "p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                    children: /* @__PURE__ */ jsx(Edit, {
                      className: "w-4 h-4"
                    })
                  }), /* @__PURE__ */ jsx("button", {
                    onClick: () => handleDelete(category2.id),
                    className: "p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors",
                    children: /* @__PURE__ */ jsx(Trash2, {
                      className: "w-4 h-4"
                    })
                  })]
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-600 dark:text-gray-400 mb-2",
                children: category2.description || "No description"
              }), /* @__PURE__ */ jsxs("p", {
                className: "text-xs text-gray-500 dark:text-gray-500",
                children: ["Slug: ", category2.slug]
              })]
            }, category2.id))
          })
        })]
      })]
    })
  });
});
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: categories,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [{
    title: "Manage Tags - Admin - Techsy.News"
  }, {
    name: "description",
    content: "Manage article tags in Techsy.News admin panel"
  }];
}
const tags = withComponentProps(function AdminTags() {
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const {
    tags: tags2,
    fetchTags
  } = useArticlesStore();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);
  if (!user || (profile2 == null ? void 0 : profile2.role) !== "admin") {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to manage tags."
        })]
      })
    });
  }
  const generateSlug2 = (name) => {
    return name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagData = {
        name: formData.name,
        slug: formData.slug || generateSlug2(formData.name)
      };
      if (editingTag) {
        const {
          error
        } = await supabase.from("tags").update(tagData).eq("id", editingTag.id);
        if (error) throw error;
        toast.success("Tag updated successfully!");
      } else {
        const {
          error
        } = await supabase.from("tags").insert(tagData);
        if (error) throw error;
        toast.success("Tag created successfully!");
      }
      setFormData({
        name: "",
        slug: ""
      });
      setShowForm(false);
      setEditingTag(null);
      fetchTags();
    } catch (error) {
      toast.error(error.message || "Failed to save tag");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (tag2) => {
    setEditingTag(tag2);
    setFormData({
      name: tag2.name,
      slug: tag2.slug
    });
    setShowForm(true);
  };
  const handleDelete = async (tagId) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    try {
      const {
        error
      } = await supabase.from("tags").delete().eq("id", tagId);
      if (error) throw error;
      toast.success("Tag deleted successfully!");
      fetchTags();
    } catch (error) {
      toast.error(error.message || "Failed to delete tag");
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      slug: ""
    });
    setShowForm(false);
    setEditingTag(null);
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/admin",
            className: "p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-5 h-5 text-gray-600 dark:text-gray-400"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-white",
              children: "Manage Tags"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mt-2",
              children: "Create and organize content tags"
            })]
          })]
        }), /* @__PURE__ */ jsxs(Button, {
          onClick: () => setShowForm(true),
          children: [/* @__PURE__ */ jsx(Plus, {
            className: "w-4 h-4 mr-2"
          }), "Add Tag"]
        })]
      }), showForm && /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: -20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-xl font-semibold text-gray-900 dark:text-white mb-6",
          children: editingTag ? "Edit Tag" : "Add New Tag"
        }), /* @__PURE__ */ jsxs("form", {
          onSubmit: handleSubmit,
          className: "space-y-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [/* @__PURE__ */ jsx(Input, {
              label: "Tag Name",
              value: formData.name,
              onChange: (e) => {
                const name = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  name,
                  slug: generateSlug2(name)
                }));
              },
              placeholder: "e.g., Machine Learning",
              required: true
            }), /* @__PURE__ */ jsx(Input, {
              label: "Slug",
              value: formData.slug,
              onChange: (e) => setFormData((prev) => ({
                ...prev,
                slug: e.target.value
              })),
              placeholder: "e.g., machine-learning",
              required: true
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "flex items-center space-x-4",
            children: [/* @__PURE__ */ jsx(Button, {
              type: "submit",
              loading,
              children: editingTag ? "Update Tag" : "Create Tag"
            }), /* @__PURE__ */ jsx(Button, {
              variant: "outline",
              onClick: resetForm,
              children: "Cancel"
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        children: [/* @__PURE__ */ jsx("div", {
          className: "p-6 border-b border-gray-200 dark:border-gray-700",
          children: /* @__PURE__ */ jsxs("h2", {
            className: "text-xl font-semibold text-gray-900 dark:text-white",
            children: ["Tags (", tags2.length, ")"]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "p-6",
          children: tags2.length === 0 ? /* @__PURE__ */ jsxs("div", {
            className: "text-center py-12",
            children: [/* @__PURE__ */ jsx(Tag, {
              className: "w-12 h-12 text-gray-400 mx-auto mb-4"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-500 dark:text-gray-400",
              children: "No tags found. Create your first tag to get started."
            })]
          }) : /* @__PURE__ */ jsx("div", {
            className: "flex flex-wrap gap-3",
            children: tags2.map((tag2) => /* @__PURE__ */ jsxs(motion.div, {
              initial: {
                opacity: 0,
                scale: 0.95
              },
              animate: {
                opacity: 1,
                scale: 1
              },
              className: "group flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors",
              children: [/* @__PURE__ */ jsx(Tag, {
                className: "w-3 h-3 text-gray-500 dark:text-gray-400"
              }), /* @__PURE__ */ jsx("span", {
                className: "text-sm text-gray-700 dark:text-gray-300",
                children: tag2.name
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity",
                children: [/* @__PURE__ */ jsx("button", {
                  onClick: () => handleEdit(tag2),
                  className: "p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                  children: /* @__PURE__ */ jsx(Edit, {
                    className: "w-3 h-3"
                  })
                }), /* @__PURE__ */ jsx("button", {
                  onClick: () => handleDelete(tag2.id),
                  className: "p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors",
                  children: /* @__PURE__ */ jsx(Trash2, {
                    className: "w-3 h-3"
                  })
                })]
              })]
            }, tag2.id))
          })
        })]
      })]
    })
  });
});
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tags,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Analytics - Admin - Techsy.News"
  }, {
    name: "description",
    content: "View detailed analytics and insights for Techsy.News"
  }];
}
const analytics = withComponentProps(function AdminAnalytics() {
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const {
    articles: articles2,
    categories: categories2
  } = useArticlesStore();
  const [analytics2, setAnalytics] = useState({
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
  }, [articles2]);
  if (!user || (profile2 == null ? void 0 : profile2.role) !== "admin") {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to view analytics."
        })]
      })
    });
  }
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const totalViews = articles2.reduce((sum, article2) => sum + article2.views, 0);
      const totalLikes = articles2.reduce((sum, article2) => sum + article2.likes, 0);
      const thisMonth = /* @__PURE__ */ new Date();
      thisMonth.setDate(1);
      const articlesThisMonth = articles2.filter((article2) => new Date(article2.created_at) >= thisMonth).length;
      const topArticles = [...articles2].sort((a, b) => b.views - a.views).slice(0, 5);
      const categoryStats = categories2.map((category2) => {
        const categoryArticles = articles2.filter((article2) => article2.category_id === category2.id);
        const totalViews2 = categoryArticles.reduce((sum, article2) => sum + article2.views, 0);
        return {
          ...category2,
          articleCount: categoryArticles.length,
          totalViews: totalViews2
        };
      }).sort((a, b) => b.totalViews - a.totalViews);
      const {
        data: profilesData
      } = await supabase.from("profiles").select("id");
      const {
        data: commentsData
      } = await supabase.from("comments").select("id");
      setAnalytics({
        totalViews,
        totalLikes,
        totalComments: (commentsData == null ? void 0 : commentsData.length) || 0,
        totalUsers: (profilesData == null ? void 0 : profilesData.length) || 0,
        articlesThisMonth,
        topArticles,
        topCategories: categoryStats.slice(0, 5),
        recentActivity: []
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };
  const statCards = [{
    title: "Total Views",
    value: formatNumber(analytics2.totalViews),
    icon: Eye,
    color: "blue",
    change: "+12%"
  }, {
    title: "Total Likes",
    value: formatNumber(analytics2.totalLikes),
    icon: Heart,
    color: "red",
    change: "+8%"
  }, {
    title: "Total Users",
    value: formatNumber(analytics2.totalUsers),
    icon: Users,
    color: "green",
    change: "+15%"
  }, {
    title: "Articles This Month",
    value: analytics2.articlesThisMonth.toString(),
    icon: FileText,
    color: "purple",
    change: "+5%"
  }];
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx(BarChart3, {
          className: "w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-500 dark:text-gray-400",
          children: "Loading analytics..."
        })]
      })
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/admin",
            className: "p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-5 h-5 text-gray-600 dark:text-gray-400"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-white",
              children: "Analytics Dashboard"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mt-2",
              children: "Detailed insights and performance metrics"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400",
          children: [/* @__PURE__ */ jsx(Calendar, {
            className: "w-4 h-4"
          }), /* @__PURE__ */ jsxs("span", {
            children: ["Last updated: ", formatDate(/* @__PURE__ */ new Date())]
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
        children: statCards.map((stat, index) => {
          const Icon = stat.icon;
          return /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: index * 0.1
            },
            className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400 mb-1",
                  children: stat.title
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-2xl font-bold text-gray-900 dark:text-white",
                  children: stat.value
                }), /* @__PURE__ */ jsxs("p", {
                  className: "text-xs text-green-600 dark:text-green-400 mt-1",
                  children: [stat.change, " from last month"]
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: `p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`,
                children: /* @__PURE__ */ jsx(Icon, {
                  className: `w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`
                })
              })]
            })
          }, stat.title);
        })
      }), /* @__PURE__ */ jsxs("div", {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
        children: [/* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.4
          },
          className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-xl font-semibold text-gray-900 dark:text-white mb-6",
            children: "Top Performing Articles"
          }), /* @__PURE__ */ jsx("div", {
            className: "space-y-4",
            children: analytics2.topArticles.length > 0 ? analytics2.topArticles.map((article2, index) => /* @__PURE__ */ jsxs("div", {
              className: "flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
              children: [/* @__PURE__ */ jsx("div", {
                className: "flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center",
                children: /* @__PURE__ */ jsx("span", {
                  className: "text-sm font-medium text-blue-600 dark:text-blue-400",
                  children: index + 1
                })
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex-1 min-w-0",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-sm font-medium text-gray-900 dark:text-white truncate",
                  children: article2.title
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400",
                  children: [/* @__PURE__ */ jsxs("span", {
                    className: "flex items-center",
                    children: [/* @__PURE__ */ jsx(Eye, {
                      className: "w-3 h-3 mr-1"
                    }), formatNumber(article2.views), " views"]
                  }), /* @__PURE__ */ jsxs("span", {
                    className: "flex items-center",
                    children: [/* @__PURE__ */ jsx(Heart, {
                      className: "w-3 h-3 mr-1"
                    }), formatNumber(article2.likes), " likes"]
                  })]
                })]
              })]
            }, article2.id)) : /* @__PURE__ */ jsx("p", {
              className: "text-gray-500 dark:text-gray-400 text-center py-8",
              children: "No articles data available"
            })
          })]
        }), /* @__PURE__ */ jsxs(motion.div, {
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: 0.5
          },
          className: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-xl font-semibold text-gray-900 dark:text-white mb-6",
            children: "Top Categories"
          }), /* @__PURE__ */ jsx("div", {
            className: "space-y-4",
            children: analytics2.topCategories.length > 0 ? analytics2.topCategories.map((category2, index) => /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center space-x-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-4 h-4 rounded",
                  style: {
                    backgroundColor: category2.color
                  }
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h3", {
                    className: "text-sm font-medium text-gray-900 dark:text-white",
                    children: category2.name
                  }), /* @__PURE__ */ jsxs("p", {
                    className: "text-xs text-gray-500 dark:text-gray-400",
                    children: [category2.articleCount, " articles"]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "text-right",
                children: [/* @__PURE__ */ jsx("p", {
                  className: "text-sm font-medium text-gray-900 dark:text-white",
                  children: formatNumber(category2.totalViews)
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-xs text-gray-500 dark:text-gray-400",
                  children: "views"
                })]
              })]
            }, category2.id)) : /* @__PURE__ */ jsx("p", {
              className: "text-gray-500 dark:text-gray-400 text-center py-8",
              children: "No categories data available"
            })
          })]
        })]
      })]
    })
  });
});
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: analytics,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Manage Comments - Admin - Techsy.News"
  }, {
    name: "description",
    content: "Moderate and manage comments in Techsy.News admin panel"
  }];
}
const comments = withComponentProps(function AdminComments() {
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const [comments2, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  useEffect(() => {
    fetchComments();
  }, []);
  if (!user || (profile2 == null ? void 0 : profile2.role) !== "admin") {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to manage comments."
        })]
      })
    });
  }
  const fetchComments = async () => {
    try {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from("comments").select(`
          id,
          content,
          created_at,
          user:profiles!comments_user_id_fkey(id, full_name, avatar_url),
          article:articles!comments_article_id_fkey(id, title, slug)
        `).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteComment = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      setDeleting(commentId);
      const {
        error
      } = await supabase.from("comments").delete().eq("id", commentId);
      if (error) throw error;
      toast.success("Comment deleted successfully");
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      toast.error(error.message || "Failed to delete comment");
    } finally {
      setDeleting(null);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center",
      children: /* @__PURE__ */ jsx(LoadingSpinner, {
        size: "lg"
      })
    });
  }
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/admin",
            className: "p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-5 h-5 text-gray-600 dark:text-gray-400"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-white",
              children: "Manage Comments"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mt-2",
              children: "Moderate and manage user comments"
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400",
          children: [/* @__PURE__ */ jsx(MessageSquare, {
            className: "w-4 h-4"
          }), /* @__PURE__ */ jsxs("span", {
            children: [comments2.length, " total comments"]
          })]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        children: [/* @__PURE__ */ jsx("div", {
          className: "p-6 border-b border-gray-200 dark:border-gray-700",
          children: /* @__PURE__ */ jsx("h2", {
            className: "text-xl font-semibold text-gray-900 dark:text-white",
            children: "Recent Comments"
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "divide-y divide-gray-200 dark:divide-gray-700",
          children: comments2.length === 0 ? /* @__PURE__ */ jsxs("div", {
            className: "text-center py-12",
            children: [/* @__PURE__ */ jsx(MessageSquare, {
              className: "w-12 h-12 text-gray-400 mx-auto mb-4"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-500 dark:text-gray-400",
              children: "No comments found. Comments will appear here when users start engaging with your articles."
            })]
          }) : comments2.map((comment, index) => /* @__PURE__ */ jsx(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: index * 0.05
            },
            className: "p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
            children: /* @__PURE__ */ jsxs("div", {
              className: "flex items-start justify-between",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex-1",
                children: [/* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-3 mb-3",
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center space-x-2",
                    children: [comment.user.avatar_url ? /* @__PURE__ */ jsx("img", {
                      src: comment.user.avatar_url,
                      alt: comment.user.full_name,
                      className: "w-8 h-8 rounded-full"
                    }) : /* @__PURE__ */ jsx("div", {
                      className: "w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center",
                      children: /* @__PURE__ */ jsx(User, {
                        className: "w-4 h-4 text-gray-500 dark:text-gray-400"
                      })
                    }), /* @__PURE__ */ jsx("span", {
                      className: "font-medium text-gray-900 dark:text-white",
                      children: comment.user.full_name
                    })]
                  }), /* @__PURE__ */ jsxs("div", {
                    className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400",
                    children: [/* @__PURE__ */ jsx(Calendar, {
                      className: "w-4 h-4"
                    }), /* @__PURE__ */ jsx("span", {
                      children: formatRelativeTime(comment.created_at)
                    })]
                  })]
                }), /* @__PURE__ */ jsx("div", {
                  className: "mb-3",
                  children: /* @__PURE__ */ jsx("p", {
                    className: "text-gray-700 dark:text-gray-300 leading-relaxed",
                    children: comment.content
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  className: "flex items-center space-x-2 text-sm",
                  children: [/* @__PURE__ */ jsx("span", {
                    className: "text-gray-500 dark:text-gray-400",
                    children: "On article:"
                  }), /* @__PURE__ */ jsxs(Link, {
                    to: `/article/${comment.article.slug}`,
                    className: "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center space-x-1",
                    children: [/* @__PURE__ */ jsx("span", {
                      children: comment.article.title
                    }), /* @__PURE__ */ jsx(ExternalLink, {
                      className: "w-3 h-3"
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center space-x-2 ml-4",
                children: [/* @__PURE__ */ jsx(Link, {
                  to: `/article/${comment.article.slug}`,
                  className: "p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
                  title: "View Article",
                  children: /* @__PURE__ */ jsx(Eye, {
                    className: "w-4 h-4"
                  })
                }), /* @__PURE__ */ jsx("button", {
                  onClick: () => handleDeleteComment(comment.id),
                  disabled: deleting === comment.id,
                  className: "p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50",
                  title: "Delete Comment",
                  children: deleting === comment.id ? /* @__PURE__ */ jsx("div", {
                    className: "w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"
                  }) : /* @__PURE__ */ jsx(Trash2, {
                    className: "w-4 h-4"
                  })
                })]
              })]
            })
          }, comment.id))
        })]
      }), comments2.length > 0 && /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.3
        },
        className: "mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700",
        children: [/* @__PURE__ */ jsx("h3", {
          className: "text-lg font-semibold text-gray-900 dark:text-white mb-4",
          children: "Comment Statistics"
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-4",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-2xl font-bold text-blue-600 dark:text-blue-400",
              children: comments2.length
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 dark:text-gray-400",
              children: "Total Comments"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-2xl font-bold text-green-600 dark:text-green-400",
              children: comments2.filter((c) => new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3)).length
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 dark:text-gray-400",
              children: "This Week"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("p", {
              className: "text-2xl font-bold text-purple-600 dark:text-purple-400",
              children: new Set(comments2.map((c) => c.user.id)).size
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 dark:text-gray-400",
              children: "Unique Users"
            })]
          })]
        })]
      })]
    })
  });
});
const route22 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: comments,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Settings - Admin - Techsy.News"
  }, {
    name: "description",
    content: "Configure site settings and preferences"
  }];
}
const settings = withComponentProps(function AdminSettings() {
  const {
    user,
    profile: profile2
  } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [settings2, setSettings] = useState({
    siteName: "Techsy.News",
    siteDescription: "Modern Technology News Platform",
    siteUrl: "https://techsy.news",
    contactEmail: "contact@techsy.news",
    allowRegistration: true,
    requireEmailVerification: true,
    enableComments: true,
    enableNewsletter: true,
    analyticsId: "",
    socialTwitter: "",
    socialLinkedIn: "",
    socialGitHub: ""
  });
  if (!user || (profile2 == null ? void 0 : profile2.role) !== "admin") {
    return /* @__PURE__ */ jsx("div", {
      className: "min-h-screen flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-2xl font-bold text-gray-900 dark:text-white mb-4",
          children: "Access Denied"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600 dark:text-gray-400",
          children: "You don't have permission to access settings."
        })]
      })
    });
  }
  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };
  const settingSections = [{
    title: "General Settings",
    icon: Globe,
    fields: [{
      key: "siteName",
      label: "Site Name",
      type: "text"
    }, {
      key: "siteDescription",
      label: "Site Description",
      type: "text"
    }, {
      key: "siteUrl",
      label: "Site URL",
      type: "url"
    }, {
      key: "contactEmail",
      label: "Contact Email",
      type: "email"
    }]
  }, {
    title: "User Settings",
    icon: Shield,
    fields: [{
      key: "allowRegistration",
      label: "Allow User Registration",
      type: "checkbox"
    }, {
      key: "requireEmailVerification",
      label: "Require Email Verification",
      type: "checkbox"
    }]
  }, {
    title: "Feature Settings",
    icon: Settings,
    fields: [{
      key: "enableComments",
      label: "Enable Comments",
      type: "checkbox"
    }, {
      key: "enableNewsletter",
      label: "Enable Newsletter",
      type: "checkbox"
    }]
  }, {
    title: "Analytics & Tracking",
    icon: Database,
    fields: [{
      key: "analyticsId",
      label: "Google Analytics ID",
      type: "text"
    }]
  }, {
    title: "Social Media",
    icon: Mail,
    fields: [{
      key: "socialTwitter",
      label: "Twitter URL",
      type: "url"
    }, {
      key: "socialLinkedIn",
      label: "LinkedIn URL",
      type: "url"
    }, {
      key: "socialGitHub",
      label: "GitHub URL",
      type: "url"
    }]
  }];
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gray-50 dark:bg-gray-900",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "flex items-center justify-between mb-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "flex items-center space-x-4",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/admin",
            className: "p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-5 h-5 text-gray-600 dark:text-gray-400"
            })
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-3xl font-bold text-gray-900 dark:text-white",
              children: "Site Settings"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 dark:text-gray-400 mt-2",
              children: "Configure your site preferences and features"
            })]
          })]
        }), /* @__PURE__ */ jsxs(Button, {
          onClick: handleSave,
          loading,
          children: [/* @__PURE__ */ jsx(Save, {
            className: "w-4 h-4 mr-2"
          }), "Save Changes"]
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "space-y-8",
        children: settingSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return /* @__PURE__ */ jsxs(motion.div, {
            initial: {
              opacity: 0,
              y: 20
            },
            animate: {
              opacity: 1,
              y: 0
            },
            transition: {
              delay: sectionIndex * 0.1
            },
            className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
            children: [/* @__PURE__ */ jsx("div", {
              className: "p-6 border-b border-gray-200 dark:border-gray-700",
              children: /* @__PURE__ */ jsxs("div", {
                className: "flex items-center space-x-3",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg",
                  children: /* @__PURE__ */ jsx(Icon, {
                    className: "w-5 h-5 text-blue-600 dark:text-blue-400"
                  })
                }), /* @__PURE__ */ jsx("h2", {
                  className: "text-xl font-semibold text-gray-900 dark:text-white",
                  children: section.title
                })]
              })
            }), /* @__PURE__ */ jsx("div", {
              className: "p-6",
              children: /* @__PURE__ */ jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                children: section.fields.map((field) => /* @__PURE__ */ jsx("div", {
                  children: field.type === "checkbox" ? /* @__PURE__ */ jsxs("label", {
                    className: "flex items-center space-x-3",
                    children: [/* @__PURE__ */ jsx("input", {
                      type: "checkbox",
                      checked: settings2[field.key],
                      onChange: (e) => setSettings((prev) => ({
                        ...prev,
                        [field.key]: e.target.checked
                      })),
                      className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-sm font-medium text-gray-900 dark:text-white",
                      children: field.label
                    })]
                  }) : /* @__PURE__ */ jsx(Input, {
                    label: field.label,
                    type: field.type,
                    value: settings2[field.key],
                    onChange: (e) => setSettings((prev) => ({
                      ...prev,
                      [field.key]: e.target.value
                    })),
                    placeholder: `Enter ${field.label.toLowerCase()}`
                  })
                }, field.key))
              })
            })]
          }, section.title);
        })
      }), /* @__PURE__ */ jsxs(motion.div, {
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          delay: 0.6
        },
        className: "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-red-200 dark:border-red-800 mt-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "p-6 border-b border-red-200 dark:border-red-800",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-xl font-semibold text-red-900 dark:text-red-100",
            children: "Danger Zone"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-sm text-red-600 dark:text-red-400 mt-1",
            children: "These actions are irreversible. Please be careful."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "p-6",
          children: /* @__PURE__ */ jsxs("div", {
            className: "space-y-4",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "font-medium text-gray-900 dark:text-white",
                  children: "Reset All Settings"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: "Reset all settings to their default values"
                })]
              }), /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                className: "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20",
                children: "Reset Settings"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg",
              children: [/* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "font-medium text-gray-900 dark:text-white",
                  children: "Clear All Data"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: "Permanently delete all articles, comments, and user data"
                })]
              }), /* @__PURE__ */ jsx(Button, {
                variant: "outline",
                className: "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20",
                children: "Clear Data"
              })]
            })]
          })
        })]
      }), /* @__PURE__ */ jsx("div", {
        className: "flex justify-end mt-8",
        children: /* @__PURE__ */ jsxs(Button, {
          onClick: handleSave,
          loading,
          size: "lg",
          children: [/* @__PURE__ */ jsx(Save, {
            className: "w-4 h-4 mr-2"
          }), "Save All Settings"]
        })
      })]
    })
  });
});
const route23 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: settings,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-KmG5kZ5t.js", "imports": ["/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/index-BeYXFHcR.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-n6Zqs-PM.js", "imports": ["/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/index-BeYXFHcR.js", "/assets/with-props-DRM106Ts.js"], "css": ["/assets/root-NJbuF5Kk.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "components/layout/Layout": { "id": "components/layout/Layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/Layout-CcUsu1f4.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/index-BvIfFWLG.js", "/assets/authStore-CBBhFNwG.js", "/assets/utils-Dmsv2dCC.js", "/assets/search-DmgkZgui.js", "/assets/user-bkK-Sprj.js", "/assets/index-o_nr5B-J.js", "/assets/bookmark-CtmUuJhp.js", "/assets/settings-B96QZ12n.js", "/assets/x--Nl2gWzB.js", "/assets/mail-DDVX_-Jv.js", "/assets/heart-BD4QhLHz.js", "/assets/LoadingSpinner-njtnuVwo.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "components/layout/Layout", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-DgsEaIkN.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/ArticleCard-DAKA9Mgc.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/Button-D7YxVoDp.js", "/assets/utils-Dmsv2dCC.js", "/assets/trending-up-60w_rjpJ.js", "/assets/globe-DhxI0bV9.js", "/assets/bookmark-CtmUuJhp.js", "/assets/user-bkK-Sprj.js", "/assets/calendar-sW80RKu2.js", "/assets/eye-D66ep1xE.js", "/assets/heart-BD4QhLHz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/article": { "id": "routes/article", "parentId": "components/layout/Layout", "path": "article/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/article-BHsYTT8O.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/authStore-CBBhFNwG.js", "/assets/utils-Dmsv2dCC.js", "/assets/RichTextEditor-n2aN1D3D.js", "/assets/ArticleCard-DAKA9Mgc.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/Button-D7YxVoDp.js", "/assets/index-BvIfFWLG.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/user-bkK-Sprj.js", "/assets/calendar-sW80RKu2.js", "/assets/eye-D66ep1xE.js", "/assets/heart-BD4QhLHz.js", "/assets/bookmark-CtmUuJhp.js", "/assets/index-BeYXFHcR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/category": { "id": "routes/category", "parentId": "components/layout/Layout", "path": "category/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/category-D4P--9rk.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/ArticleCard-DAKA9Mgc.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/Button-D7YxVoDp.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/utils-Dmsv2dCC.js", "/assets/folder-ClYMstKx.js", "/assets/bookmark-CtmUuJhp.js", "/assets/user-bkK-Sprj.js", "/assets/calendar-sW80RKu2.js", "/assets/eye-D66ep1xE.js", "/assets/heart-BD4QhLHz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/tag": { "id": "routes/tag", "parentId": "components/layout/Layout", "path": "tag/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/tag-UdIBTXJC.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/ArticleCard-DAKA9Mgc.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/Button-D7YxVoDp.js", "/assets/utils-Dmsv2dCC.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/tag-DO6hg1IZ.js", "/assets/bookmark-CtmUuJhp.js", "/assets/user-bkK-Sprj.js", "/assets/calendar-sW80RKu2.js", "/assets/eye-D66ep1xE.js", "/assets/heart-BD4QhLHz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/web3": { "id": "routes/web3", "parentId": "components/layout/Layout", "path": "web3", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/web3-ChlTxd1s.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/search": { "id": "routes/search", "parentId": "components/layout/Layout", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/search-B_0wGz9Y.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/ArticleCard-DAKA9Mgc.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/Button-D7YxVoDp.js", "/assets/utils-Dmsv2dCC.js", "/assets/search-DmgkZgui.js", "/assets/x--Nl2gWzB.js", "/assets/index-o_nr5B-J.js", "/assets/folder-ClYMstKx.js", "/assets/tag-DO6hg1IZ.js", "/assets/calendar-sW80RKu2.js", "/assets/bookmark-CtmUuJhp.js", "/assets/user-bkK-Sprj.js", "/assets/eye-D66ep1xE.js", "/assets/heart-BD4QhLHz.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "components/layout/Layout", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-Bf5f5G8D.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "components/layout/Layout", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-DJinY1gs.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth/signin": { "id": "routes/auth/signin", "parentId": "components/layout/Layout", "path": "auth/signin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signin-C3UUlSQb.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/utils-Dmsv2dCC.js", "/assets/index-BvIfFWLG.js", "/assets/mail-DDVX_-Jv.js", "/assets/lock-9d3mVBw0.js", "/assets/eye-D66ep1xE.js", "/assets/LoadingSpinner-njtnuVwo.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth/signup": { "id": "routes/auth/signup", "parentId": "components/layout/Layout", "path": "auth/signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-BuMDQySa.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/utils-Dmsv2dCC.js", "/assets/index-BvIfFWLG.js", "/assets/user-bkK-Sprj.js", "/assets/mail-DDVX_-Jv.js", "/assets/lock-9d3mVBw0.js", "/assets/eye-D66ep1xE.js", "/assets/LoadingSpinner-njtnuVwo.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/profile": { "id": "routes/profile", "parentId": "components/layout/Layout", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/profile-CFtGBytM.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/utils-Dmsv2dCC.js", "/assets/index-BvIfFWLG.js", "/assets/user-bkK-Sprj.js", "/assets/mail-DDVX_-Jv.js", "/assets/calendar-sW80RKu2.js", "/assets/square-pen-C_NUI9iH.js", "/assets/x--Nl2gWzB.js", "/assets/save-BYoAHb2A.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/settings": { "id": "routes/settings", "parentId": "components/layout/Layout", "path": "settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-CQlvxWap.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/bookmarks": { "id": "routes/bookmarks", "parentId": "components/layout/Layout", "path": "bookmarks", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/bookmarks-DmgFXIw3.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin": { "id": "routes/admin", "parentId": "components/layout/Layout", "path": "admin", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/admin-B1PTHbLh.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/Button-D7YxVoDp.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/utils-Dmsv2dCC.js", "/assets/users-DpUEI1LK.js", "/assets/eye-D66ep1xE.js", "/assets/trending-up-60w_rjpJ.js", "/assets/heart-BD4QhLHz.js", "/assets/plus-vaOFuVxj.js", "/assets/folder-ClYMstKx.js", "/assets/tag-DO6hg1IZ.js", "/assets/message-square-DrCx0BaE.js", "/assets/settings-B96QZ12n.js", "/assets/calendar-sW80RKu2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/articles": { "id": "routes/admin/articles", "parentId": "components/layout/Layout", "path": "admin/articles", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/articles-DlD1bPQs.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/utils-Dmsv2dCC.js", "/assets/index-BvIfFWLG.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/plus-vaOFuVxj.js", "/assets/search-DmgkZgui.js", "/assets/eye-D66ep1xE.js", "/assets/square-pen-C_NUI9iH.js", "/assets/trash-2-C5GLs__0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/articles/new": { "id": "routes/admin/articles/new", "parentId": "components/layout/Layout", "path": "admin/articles/new", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/new-CnhakfF0.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/ImageUpload-3d2uJo5a.js", "/assets/authStore-CBBhFNwG.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/RichTextEditor-n2aN1D3D.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/utils-Dmsv2dCC.js", "/assets/index-BvIfFWLG.js", "/assets/eye-D66ep1xE.js", "/assets/save-BYoAHb2A.js", "/assets/x--Nl2gWzB.js", "/assets/index-BeYXFHcR.js", "/assets/LoadingSpinner-njtnuVwo.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/articles/edit": { "id": "routes/admin/articles/edit", "parentId": "components/layout/Layout", "path": "admin/articles/:id/edit", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/edit-Chtl8H8J.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/ImageUpload-3d2uJo5a.js", "/assets/authStore-CBBhFNwG.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/RichTextEditor-n2aN1D3D.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/utils-Dmsv2dCC.js", "/assets/index-BvIfFWLG.js", "/assets/eye-D66ep1xE.js", "/assets/save-BYoAHb2A.js", "/assets/x--Nl2gWzB.js", "/assets/index-BeYXFHcR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/categories": { "id": "routes/admin/categories", "parentId": "components/layout/Layout", "path": "admin/categories", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/categories-9eOgab04.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/utils-Dmsv2dCC.js", "/assets/index-BvIfFWLG.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/plus-vaOFuVxj.js", "/assets/folder-ClYMstKx.js", "/assets/square-pen-C_NUI9iH.js", "/assets/trash-2-C5GLs__0.js", "/assets/LoadingSpinner-njtnuVwo.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/tags": { "id": "routes/admin/tags", "parentId": "components/layout/Layout", "path": "admin/tags", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/tags-mHOXYmY_.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/utils-Dmsv2dCC.js", "/assets/index-BvIfFWLG.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/plus-vaOFuVxj.js", "/assets/tag-DO6hg1IZ.js", "/assets/square-pen-C_NUI9iH.js", "/assets/trash-2-C5GLs__0.js", "/assets/LoadingSpinner-njtnuVwo.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/analytics": { "id": "routes/admin/analytics", "parentId": "components/layout/Layout", "path": "admin/analytics", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/analytics-DrnwlaQI.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/articlesStore-C2OzSC6v.js", "/assets/utils-Dmsv2dCC.js", "/assets/eye-D66ep1xE.js", "/assets/heart-BD4QhLHz.js", "/assets/users-DpUEI1LK.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/calendar-sW80RKu2.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/comments": { "id": "routes/admin/comments", "parentId": "components/layout/Layout", "path": "admin/comments", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/comments-Bl9bZh8l.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/utils-Dmsv2dCC.js", "/assets/Button-D7YxVoDp.js", "/assets/LoadingSpinner-njtnuVwo.js", "/assets/index-BvIfFWLG.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/message-square-DrCx0BaE.js", "/assets/user-bkK-Sprj.js", "/assets/calendar-sW80RKu2.js", "/assets/eye-D66ep1xE.js", "/assets/trash-2-C5GLs__0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/admin/settings": { "id": "routes/admin/settings", "parentId": "components/layout/Layout", "path": "admin/settings", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/settings-O4oGk8gE.js", "imports": ["/assets/with-props-DRM106Ts.js", "/assets/chunk-D4RADZKF-DUJFVFZr.js", "/assets/authStore-CBBhFNwG.js", "/assets/Button-D7YxVoDp.js", "/assets/Input-BZbkvE__.js", "/assets/index-BvIfFWLG.js", "/assets/arrow-left-CB9Wz_nk.js", "/assets/save-BYoAHb2A.js", "/assets/globe-DhxI0bV9.js", "/assets/utils-Dmsv2dCC.js", "/assets/settings-B96QZ12n.js", "/assets/mail-DDVX_-Jv.js", "/assets/LoadingSpinner-njtnuVwo.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-5294d28d.js", "version": "5294d28d", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "components/layout/Layout": {
    id: "components/layout/Layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/home": {
    id: "routes/home",
    parentId: "components/layout/Layout",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/article": {
    id: "routes/article",
    parentId: "components/layout/Layout",
    path: "article/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/category": {
    id: "routes/category",
    parentId: "components/layout/Layout",
    path: "category/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/tag": {
    id: "routes/tag",
    parentId: "components/layout/Layout",
    path: "tag/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/web3": {
    id: "routes/web3",
    parentId: "components/layout/Layout",
    path: "web3",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/search": {
    id: "routes/search",
    parentId: "components/layout/Layout",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/about": {
    id: "routes/about",
    parentId: "components/layout/Layout",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "components/layout/Layout",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/auth/signin": {
    id: "routes/auth/signin",
    parentId: "components/layout/Layout",
    path: "auth/signin",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/auth/signup": {
    id: "routes/auth/signup",
    parentId: "components/layout/Layout",
    path: "auth/signup",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "components/layout/Layout",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "components/layout/Layout",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/bookmarks": {
    id: "routes/bookmarks",
    parentId: "components/layout/Layout",
    path: "bookmarks",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "components/layout/Layout",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/admin/articles": {
    id: "routes/admin/articles",
    parentId: "components/layout/Layout",
    path: "admin/articles",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/admin/articles/new": {
    id: "routes/admin/articles/new",
    parentId: "components/layout/Layout",
    path: "admin/articles/new",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/admin/articles/edit": {
    id: "routes/admin/articles/edit",
    parentId: "components/layout/Layout",
    path: "admin/articles/:id/edit",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/admin/categories": {
    id: "routes/admin/categories",
    parentId: "components/layout/Layout",
    path: "admin/categories",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/admin/tags": {
    id: "routes/admin/tags",
    parentId: "components/layout/Layout",
    path: "admin/tags",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/admin/analytics": {
    id: "routes/admin/analytics",
    parentId: "components/layout/Layout",
    path: "admin/analytics",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  },
  "routes/admin/comments": {
    id: "routes/admin/comments",
    parentId: "components/layout/Layout",
    path: "admin/comments",
    index: void 0,
    caseSensitive: void 0,
    module: route22
  },
  "routes/admin/settings": {
    id: "routes/admin/settings",
    parentId: "components/layout/Layout",
    path: "admin/settings",
    index: void 0,
    caseSensitive: void 0,
    module: route23
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};

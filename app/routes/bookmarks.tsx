import type { Route } from "./+types/bookmarks";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bookmarks - Techsy.News" },
    { name: "description", content: "Your saved articles and bookmarks" },
  ];
}

export default function Bookmarks() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Bookmarks
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page will display your saved articles. Coming soon!
        </p>
      </div>
    </div>
  );
}

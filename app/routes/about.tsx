import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - Techsy.News" },
    { name: "description", content: "Learn about Techsy.News and our mission to deliver the latest technology insights" },
  ];
}

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          About Techsy.News
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page will contain information about the platform. Coming soon!
        </p>
      </div>
    </div>
  );
}

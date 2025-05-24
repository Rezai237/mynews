import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - Techsy.News" },
    { name: "description", content: "Manage your account settings and preferences" },
  ];
}

export default function Settings() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page will contain user settings and preferences. Coming soon!
        </p>
      </div>
    </div>
  );
}

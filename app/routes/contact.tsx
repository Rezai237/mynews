import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - Techsy.News" },
    { name: "description", content: "Get in touch with the Techsy.News team" },
  ];
}

export default function Contact() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page will contain contact information and forms. Coming soon!
        </p>
      </div>
    </div>
  );
}

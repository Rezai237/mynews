import type { Route } from "./+types/web3";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Web3 & Blockchain - Techsy.News" },
    { name: "description", content: "Latest Web3, blockchain, and cryptocurrency news and insights" },
  ];
}

export default function Web3() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Web3 & Blockchain
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          This page will display Web3 and blockchain content. Coming soon!
        </p>
      </div>
    </div>
  );
}

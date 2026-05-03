import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
      <Helmet>
        <title>404 — Page Not Found | QuickToolsHub</title>
        <meta name="description" content="The page you're looking for doesn't exist. Browse our free online tools for PDF, images, and calculations." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <p className="text-8xl font-bold text-primary/20 mb-4 leading-none">404</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
            Head back to the homepage to find the tool you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Home className="w-4 h-4" /> Go to Homepage
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Search className="w-4 h-4" /> Browse All Tools
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

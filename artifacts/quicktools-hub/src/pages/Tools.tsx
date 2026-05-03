import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ToolCard } from "@/components/tools/ToolCard";
import { tools, ToolCategory } from "@/data/tools";

const categories: ToolCategory[] = ["PDF Tools", "Image Tools", "Calculators", "Other Tools"];

export default function Tools() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "All">("All");

  const filtered = tools.filter((tool) => {
    const matchesQuery =
      query === "" ||
      tool.title.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <Layout>
      <Helmet>
        <title>All Free Online Tools — PDF, Image & Calculators | QuickToolsHub</title>
        <meta name="description" content="Browse all free online tools on QuickToolsHub — PDF converters, image tools, calculators and more. No registration required." />
        <meta property="og:title" content="All Free Online Tools | QuickToolsHub" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://quicktoolshub.com/tools" />
      </Helmet>

      <div className="bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">All Online Tools</h1>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">14 free tools for PDF, images, and calculations — all browser-based, all free</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              data-testid="tools-search"
              placeholder="Search tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-gray-800 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center gap-2 py-6 overflow-x-auto">
          {(["All", ...categories] as (ToolCategory | "All")[]).map((cat) => (
            <button
              key={cat}
              data-testid={`filter-${cat.replace(/\s/g, "-").toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No tools found for "{query}"</p>
          </div>
        ) : (
          categories
            .filter((cat) => activeCategory === "All" || activeCategory === cat)
            .map((cat) => {
              const categoryTools = filtered.filter((t) => t.category === cat);
              if (categoryTools.length === 0) return null;
              return (
                <div key={cat} className="mb-10">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-6 bg-primary rounded-full" />
                    {cat}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categoryTools.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              );
            })
        )}
      </div>
    </Layout>
  );
}

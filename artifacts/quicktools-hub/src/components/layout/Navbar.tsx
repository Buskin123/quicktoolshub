import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Zap, Menu, X, ChevronDown } from "lucide-react";
import { tools } from "@/data/tools";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [location] = useLocation();

  const categories = ["PDF Tools", "Image Tools", "Calculators", "Other Tools"] as const;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              QuickTools<span className="text-primary">Hub</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.label === "Tools" ? (
                <div key="tools" className="relative" onMouseLeave={() => setToolsOpen(false)}>
                  <button
                    data-testid="nav-tools-dropdown"
                    onMouseEnter={() => setToolsOpen(true)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.startsWith("/tools")
                        ? "text-primary bg-blue-50"
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    Tools <ChevronDown className="w-3 h-3" />
                  </button>
                  {toolsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-2 grid grid-cols-1 gap-1">
                      {categories.map((cat) => (
                        <div key={cat}>
                          <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">{cat}</div>
                          {tools
                            .filter((t) => t.category === cat)
                            .map((tool) => (
                              <Link
                                key={tool.id}
                                href={tool.path}
                                data-testid={`nav-tool-${tool.id}`}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                onClick={() => setToolsOpen(false)}
                              >
                                <tool.icon className="w-4 h-4" />
                                {tool.title}
                              </Link>
                            ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-${link.label.toLowerCase()}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location === link.href
                      ? "text-primary bg-blue-50"
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`mobile-nav-${link.label.toLowerCase()}`}
              className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location === link.href || (link.href === "/tools" && location.startsWith("/tools"))
                  ? "text-primary bg-blue-50"
                  : "text-gray-600 hover:text-primary hover:bg-gray-50"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-2 mt-2">
            <p className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Popular Tools</p>
            {tools
              .filter((t) => t.isPopular)
              .map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  <tool.icon className="w-4 h-4" />
                  {tool.title}
                </Link>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
}

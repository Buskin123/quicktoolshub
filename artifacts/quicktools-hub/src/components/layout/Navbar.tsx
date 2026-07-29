import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Zap, Menu, X, ChevronDown, Moon, Sun, Search } from "lucide-react";
import { tools } from "@/data/tools";
import { useTheme } from "@/hooks/useTheme";
import { GlobalSearch } from "./GlobalSearch";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const [location] = useLocation();
  const { isDark, toggle } = useTheme();

  const categories = ["PDF Tools", "Image Tools", "Calculators", "Other Tools"] as const;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
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
                        ? "text-primary bg-blue-50 dark:bg-blue-900/30"
                        : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    Tools <ChevronDown className="w-3 h-3" />
                  </button>
                  {toolsOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-2 grid grid-cols-1 gap-1">
                      {categories.map((cat) => (
                        <div key={cat}>
                          <div className="px-3 py-1 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{cat}</div>
                          {tools
                            .filter((t) => t.category === cat)
                            .map((tool) => (
                              <Link
                                key={tool.id}
                                href={tool.path}
                                data-testid={`nav-tool-${tool.id}`}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary transition-colors"
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
                      ? "text-primary bg-blue-50 dark:bg-blue-900/30"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="relative ml-2 flex items-center">
              {desktopSearchOpen ? (
                <div className="animate-in fade-in slide-in-from-right-5 duration-200">
                  <GlobalSearch onClose={() => setDesktopSearchOpen(false)} />
                </div>
              ) : (
                <button
                  onClick={() => setDesktopSearchOpen(true)}
                  aria-label="Search tools"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Theme toggle — desktop */}
            <button
              data-testid="theme-toggle"
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-2 w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {/* Theme toggle — mobile */}
            <button
              data-testid="theme-toggle-mobile"
              onClick={toggle}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              data-testid="mobile-menu-toggle"
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out overflow-hidden ${
          mobileOpen ? 'max-h-[1000px] border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          <div className="mb-4">
            <GlobalSearch isMobile onClose={() => setMobileOpen(false)} />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-testid={`mobile-nav-${link.label.toLowerCase()}`}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location === link.href || (link.href === "/tools" && location.startsWith("/tools"))
                  ? "text-primary bg-blue-50 dark:bg-blue-900/30"
                  : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
          <div className="pt-2">
            <p className="px-4 py-1 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Popular Tools</p>
            {tools
              .filter((t) => t.isPopular)
              .map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.path}
                  className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <tool.icon className="w-4 h-4" />
                  {tool.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

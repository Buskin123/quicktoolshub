import { Link } from "wouter";
import { Zap, Github, Twitter, Mail } from "lucide-react";
import { tools } from "@/data/tools";

const footerLinks = {
  "PDF Tools": tools.filter((t) => t.category === "PDF Tools"),
  "Image Tools": tools.filter((t) => t.category === "Image Tools"),
  "Calculators": tools.filter((t) => t.category === "Calculators"),
  "Other Tools": tools.filter((t) => t.category === "Other Tools"),
};

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "All Tools", href: "/tools" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                QuickTools<span className="text-blue-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Free online tools for PDF, image conversion, and everyday calculations. Fast, secure, and no registration required.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="/contact" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([category, categoryTools]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2">
                {categoryTools.map((tool) => (
                  <li key={tool.id}>
                    <Link href={tool.path} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {tool.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} QuickToolsHub. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">Terms</Link>
            <Link href="/disclaimer" className="text-xs text-gray-500 hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

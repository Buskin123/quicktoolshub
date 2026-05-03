import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AdBanner } from "./AdBanner";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors">
      <Navbar />
      <div className="bg-gray-50 dark:bg-gray-900 py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto">
          <AdBanner size="leaderboard" className="max-w-full hidden md:flex" />
          <AdBanner size="mobile" className="md:hidden" />
        </div>
      </div>
      <main className="flex-1">
        {showSidebar ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">{children}</div>
              <aside className="hidden lg:block w-[300px] flex-shrink-0">
                <div className="sticky top-24 space-y-4">
                  <AdBanner size="rectangle" label="Advertisement" />
                  <AdBanner size="rectangle" label="Advertisement" />
                </div>
              </aside>
            </div>
          </div>
        ) : (
          children
        )}
      </main>
      <div className="bg-gray-50 dark:bg-gray-900 py-4 px-4 transition-colors">
        <div className="max-w-7xl mx-auto">
          <AdBanner size="leaderboard" className="max-w-full hidden md:flex" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

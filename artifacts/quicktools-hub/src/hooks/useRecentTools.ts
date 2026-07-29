import { useState, useCallback } from 'react';

const RECENT_TOOLS_KEY = 'qt_recent_tools';

export function useRecentTools() {
  const [recentToolIds, setRecentToolIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem(RECENT_TOOLS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const addRecentTool = useCallback((id: string) => {
    setRecentToolIds(prev => {
      const filtered = prev.filter(tId => tId !== id);
      const updated = [id, ...filtered].slice(0, 5);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  return { recentToolIds, addRecentTool };
}

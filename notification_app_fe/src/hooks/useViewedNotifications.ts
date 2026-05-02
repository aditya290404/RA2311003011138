import { useState, useEffect } from 'react';
import { Log } from '../../../logging_middleware';

export function useViewedNotifications() {
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('viewed_notifications');
      if (stored) {
        setViewedIds(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      Log("frontend", "warn", "hook", "Failed to load viewed notifications from localStorage");
    }
  }, []);

  const markAsViewed = (id: string) => {
    setViewedIds((prev) => {
      if (prev.has(id)) return prev;
      
      const next = new Set(prev);
      next.add(id);
      
      try {
        localStorage.setItem('viewed_notifications', JSON.stringify(Array.from(next)));
        Log("frontend", "info", "state", `Marked notification ${id} as viewed`);
      } catch (e) {
        Log("frontend", "error", "hook", "Failed to save viewed notifications to localStorage");
      }
      
      return next;
    });
  };

  return { viewedIds, markAsViewed };
}

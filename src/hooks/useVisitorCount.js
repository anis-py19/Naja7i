import { useState, useEffect } from 'react';
import { trackAndGetVisitorCount, subscribeToVisitorCount } from '../services/visitorTracker';

/**
 * React Hook للحصول على عدد الزوار الحقيقي المباشر
 */
export function useVisitorCount() {
  const [count, setCount] = useState(() => {
    try {
      const stored = localStorage.getItem('naja7i_real_visitor_count');
      return stored && !isNaN(Number(stored)) ? Number(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(count === null);

  useEffect(() => {
    const unsubscribe = subscribeToVisitorCount((newCount) => {
      setCount(newCount);
      setLoading(false);
    });

    trackAndGetVisitorCount().then((res) => {
      if (res !== null && res !== undefined) {
        setCount(res);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { count, loading, formattedCount: count !== null ? count.toLocaleString('ar-DZ') : '...' };
}

export default useVisitorCount;

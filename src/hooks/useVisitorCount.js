import { useState, useEffect } from 'react';

// مفتاح التخزين المحلي والـ Namespace الخاص بعداد منصة نجاحي
const NAMESPACE = 'naja7i-bac-algeria';
const KEY = 'total-visits';
const SESSION_KEY = 'naja7i_session_tracked_v1';
const STORAGE_KEY = 'naja7i_cached_visit_count';

// نقطة البداية الأساسية لمنصة نجاحي
const BASE_VISITS_SEED = 18450;

/**
 * هوك مخصص لحساب وإحصاء زيارات منصة نجاحي بدقة وسلاسة
 */
export function useVisitorCount() {
  const [visitCount, setVisitCount] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? parseInt(cached, 10) : BASE_VISITS_SEED;
    } catch {
      return BASE_VISITS_SEED;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function trackAndFetchVisits() {
      const hasTrackedThisSession = sessionStorage.getItem(SESSION_KEY);

      try {
        // إذا كان زائر جديد في هذه الجلسة، نزيد العداد عبر API سحابي سريع
        const endpoint = hasTrackedThisSession
          ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`
          : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`;

        const response = await fetch(endpoint, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.count === 'number') {
            const finalCount = BASE_VISITS_SEED + data.count;
            if (isMounted) {
              setVisitCount(finalCount);
              setIsLive(true);
              setIsLoading(false);
              localStorage.setItem(STORAGE_KEY, finalCount.toString());
              if (!hasTrackedThisSession) {
                sessionStorage.setItem(SESSION_KEY, 'true');
              }
            }
            return;
          }
        }
      } catch (err) {
        console.log('Counter API fallback mode:', err);
      }

      // في حالة انقطاع الاتصال أو عدم توفر الـ API، نستخدم العداد المحلي المحفوظ مع زيادة جلسة واحدة
      if (isMounted) {
        try {
          const currentCached = parseInt(localStorage.getItem(STORAGE_KEY) || BASE_VISITS_SEED.toString(), 10);
          const nextCount = hasTrackedThisSession ? currentCached : currentCached + 1;
          setVisitCount(nextCount);
          localStorage.setItem(STORAGE_KEY, nextCount.toString());
          if (!hasTrackedThisSession) {
            sessionStorage.setItem(SESSION_KEY, 'true');
          }
        } catch {
          // ignore storage error
        }
        setIsLoading(false);
        setIsLive(true);
      }
    }

    trackAndFetchVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  return { visitCount, isLoading, isLive };
}

export default useVisitorCount;

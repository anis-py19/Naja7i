/**
 * 📊 نظام تتبع وإحصاء الزيارات الحقيقية لمنصة نجاحي (Real Live Cloud Visitor Tracker)
 * متصل بسحابة حقيقية تسجل كل زيارة فعلية للطلبة بدون أرقام وهمية أو تضخيم.
 */

const COUNTER_NAMESPACE = 'naja7i-algeria-bac-official';
const COUNTER_KEY = 'visits';
const API_URL = `https://counterapi.com/api/${COUNTER_NAMESPACE}/${COUNTER_KEY}`;
const STORAGE_KEY = 'naja7i_real_visitor_count';
const SESSION_KEY = 'naja7i_session_tracked';

let cachedCount = null;
let isFetching = false;
const listeners = new Set();

/**
 * جلب وتحديث عدد الزوار الحقيقيين من السحابة
 */
export async function trackAndGetVisitorCount() {
  // 1. استرجاع آخر قيمة مخزنة محلياً لسرعة العرض الفوري
  if (cachedCount === null) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && !isNaN(Number(stored))) {
        cachedCount = Number(stored);
      }
    } catch (e) {
      console.warn('LocalStorage not available', e);
    }
  }

  // 2. إذا تم الجلب بالفعل في هذه الجلسة، نعيد القيمة المحفوظة
  if (isFetching) {
    return cachedCount || 1;
  }

  isFetching = true;

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.value === 'number') {
        cachedCount = data.value;
        try {
          localStorage.setItem(STORAGE_KEY, String(cachedCount));
          sessionStorage.setItem(SESSION_KEY, 'true');
        } catch (err) {
          // ignore storage quota
        }
        notifyListeners(cachedCount);
        isFetching = false;
        return cachedCount;
      }
    }
  } catch (error) {
    console.warn('Visitor tracker transient network notice:', error.message);
  }

  isFetching = false;
  return cachedCount || 1;
}

function notifyListeners(count) {
  listeners.forEach((callback) => {
    try {
      callback(count);
    } catch (e) {
      console.error(e);
    }
  });
}

export function subscribeToVisitorCount(callback) {
  listeners.add(callback);
  if (cachedCount !== null) {
    callback(cachedCount);
  }
  return () => {
    listeners.delete(callback);
  };
}

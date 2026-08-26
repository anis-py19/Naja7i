/**
 * 🦅 Naja7i (نجاحي) — Deep Research & BAC Sources Hunter Agent
 * وكيل البحث والتقصي العميق عن المصادر والدروس والتمارين ومواضيع البكالوريا الجديدة
 */

export function getPlatformDefaultApiKey() {
  if (process.env.VITE_GEMINI_API_KEY) {
    return process.env.VITE_GEMINI_API_KEY;
  }
  try {
    return Buffer.from('QVEuQWI4Uk42TFA5U1NEX2VNZjNnZ0J0U0FEbkdERlJvY2FEaUJzWHVoc0FIenZNdjV1T2c=', 'base64').toString('utf8');
  } catch {
    return '';
  }
}

// Curated High-Authority Algerian BAC Repositories & Teacher Networks
export const HIGH_AUTHORITY_SOURCES = [
  { name: 'موقع الأستاذ قزوري (الفيزياء)', domain: 'guezouri.org', category: 'العلوم الفيزيائية' },
  { name: 'موقع بناني للرياضيات', domain: 'prof-bennani.com', category: 'الرياضيات' },
  { name: 'موقع الدراسة الجزائري', domain: 'edudz.net / dzexams.com', category: 'جميع المواد والشعب' },
  { name: 'بنك مذكرات الأستاذ بوالريش أحمد', domain: 'bourrich-svt.com', category: 'علوم الطبيعة والحياة' },
  { name: 'موقع الأستاذ سعيداني خليل (الفلسفة)', domain: 'saadani-philo.dz', category: 'الفلسفة' },
  { name: 'حقائب المتفوقين في البكالوريا (Google Drive)', domain: 'drive.google.com', category: 'جميع الشعب' },
  { name: 'قنوات أساتذة اليوتيوب الجزائريين', domain: 'youtube.com', category: 'دروس وسلاسل فيديو' }
];

/**
 * 🔍 Perform Deep Research for BAC Resources via Gemini AI & Search Logic
 */
export async function performDeepBacResearch({
  topic = 'مواضيع وتمارين مقترحة لبكالوريا 2026',
  subject = 'جميع المواد',
  stream = 'جميع الشعب',
  apiKey = null
}) {
  const activeKey = apiKey || getPlatformDefaultApiKey() || process.env.VITE_GEMINI_API_KEY;

  if (!activeKey) {
    throw new Error('مفتاح الذكاء الاصطناعي غير متوفر لبدء البحث العميق.');
  }

  const prompt = `
أنت "وكيل البحث والتقصي الأكاديمي العميق لمنصة نجاحي الجزائرية (Naja7i Deep Research Agent)"، خبير وباحث رقمي في مصادر وكتب ومذكرات شهادة البكالوريا الجزائرية (3AS) لجميع الشعب الست.

المهمة المطلوبة:
قم بإجراء بحث أكاديمي عميق ومنظم حول: "${topic}"
المادة المستهدفة: "${subject}"
الشعبة المستهدفة: "${stream}"

المطلوب استخراجه وترتيبه في تقرير أكاديمي عالي الدقة:
1. استخرج أفضل 4 إلى 6 مصادر تعليمية جزائرية معتمدة وموثوقة (ملخصات PDF، سلاسل تمارين محلولة، مذكرات أساتذة مشهورين مثل قزوري، بوالريش، نور الدين، الجوفر، شوشاخ، طيايبة، كتاف، سعيداني، إلخ).
2. لكل مصدر، حدد:
   - 📌 **اسم المصدر / الدرس / الموضوع بدقة**
   - 👨‍🏫 **الأستاذ أو المنصة المرجعية**
   - 🎯 **الشعبة والمادة والسنة**
   - 💡 **أبرز ما يميز هذا المصدر ولماذا سيفيد طالب البكالوريا**
   - 🔗 **رابط المصدر أو المنصة المرجعية أو رابط الوصول النموذجي (Direct / Platform URL)**
   - ⭐ **تقييم الجودة الأكاديمية (مثال: 9.8 / 10)**

نسق إجابتك بطريقة نظيفة ومرتبة جداً مع العناوين والرموز والروابط لتكون جاهزة للمعاينة والاعتماد بضغطة زر.
`;

  const candidateModels = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite'
  ];

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey.trim()}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            topP: 0.95,
            maxOutputTokens: 3500
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n');
        if (text) {
          return {
            success: true,
            model,
            topic,
            subject,
            stream,
            report: text,
            date: new Date().toISOString()
          };
        }
      } else {
        const err = await res.json().catch(() => ({}));
        lastError = new Error(err.error?.message || `Status: ${res.status}`);
      }
    } catch (e) {
      lastError = e;
    }
  }

  throw lastError || new Error('تعذر إكمال البحث العميق.');
}

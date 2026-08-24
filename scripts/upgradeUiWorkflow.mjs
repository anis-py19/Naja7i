import fs from 'fs';
import path from 'path';

const uiFrontendWorkflowContent = `---
description: "الدليل المعماري والهندسي الشامل للواجهات، تجربة المستخدم (UI/UX)، التصميم المتجاوب، ومستعرض الـ PDF لمنصة نجاحي"
---

# 🎨 الدليل المعماري للواجهات وتجربة المستخدم (UI/UX & Frontend Architect Workflow)

دليل هندسي صارم ومتقدم مستمد من نخبة معايير هندسة الواجهات (**React Frontend Expert**, **Frontend Architect**, **Tailwind v4 Patterns**, **UI Resources & React Bits**, **Web Performance Optimization**).

---

## 💎 1. المبادئ الجوهرية (Core Directives & Philosophy)

1. **التميز الافتراضي (Excellence by Default):**
   - لا مكان للتصاميم العادية أو الواجهات البسيطة. يجب أن تكون كل صفحة ومكون بلمسة جمالية عصرية فائقة النقاء (Apple / Linear / Vercel level aesthetics).
   - تناسق الألوان: خلفية دافئة ناعمة (\`#F8FAFC\`)، نص كحلي عميق عالي التباين (\`#0F172A\` / \`#334155\`)، لمسات مميزة باللون الوردي الأكاديمي (\`#E11D48\` Rose-600)، وتدرجات أردوازية ناعمة.

2. **العربية أولاً والتصميم المتجاوب (RTL & Mobile-First Excellence):**
   - دعم كامل للغة العربية (\`dir="rtl"\`) مع خط **Cairo / Tajawal** الأصيل وتجنب تطبيق خطوط الـ monospace على الحروف العربية نهائياً.
   - استجابة مثالية على جميع الشاشات (الهواتف الذكية من 320px، التابلت، الحواسيب والشاشات الكبيرة).
   - مساحات لمس مريحة للأزرار (Touch Targets لا تقل عن \`44x44px\`).

3. **تجربة مستخدم حية وتفاعلية (Micro-Interactions & Transitions):**
   - حركات سلسة عبر **Framer Motion** وانتقالات ناعمة عند التحويم (\`hover:scale-[1.02]\`, \`active:scale-[0.98]\`, \`transition-all duration-200\`).
   - بطاقات زجاجية خفيفة (Subtle Glassmorphism)، حواف دائرية ناعمة (\`rounded-2xl\`), وظلال طبيعية (\`shadow-2xs\` إلى \`shadow-md\`).

---

## 🛠️ 2. المعايير البرمجية والتقنية (React 19 + Tailwind v4 Standards)

1. **معمارية المكونات النظيفة (Clean Component Architecture):**
   - فصل منطق البيانات والحسابات عن مكونات العرض (Presentation vs Logic).
   - حصر الحالة (State Locality): إبقاء الـ state في أصغر نطاق ممكن ورفعه فقط عند الضرورة.
   - تجنب الـ Prop Drilling واستخدام الـ Callbacks أو الـ Context بحكمة.

2. **الاستجابة للأخطاء وحالات التحميل (Resilience & Edge Cases):**
   - معالجة جميع الحالات: التحميل (Skeleton Loaders و Spinners دائرية أنيقة)، البيانات الفارغة (Empty States جذابة)، ومعالجة الأخطاء (Error Boundaries).

3. **مستعرض الـ PDF فائق الأداء (Bulletproof In-App PDF Viewer):**
   - دعم كامل ومزدوج:
     1. **In-App Canvas PDF.js:** رسم الصفحات على Canvas مع التحكم بالصفحات والزووم بدون مقاطعة برامج التحميل الخارجية (IDM).
     2. **Google Drive Preview Embed:** دعم فوري لأي رابط من قوقل درايف وتحويله تلقائياً لـ \`iframe\` تفاعلي وسريع.
   - أزرار سريعة دائماً: تحميل مباشر + فتح في نافذة جديدة + ملء الشاشة.

4. **أداء الويب والسرعة (Web Performance Optimization):**
   - تنظيف الذاكرة ومؤقتات المتصفح وإلغاء الـ Object URLs عبر \`URL.revokeObjectURL\`.
   - تجنب التسبب في وميض الشاشة أو إعادة الرسم غير الضرورية (Zero Layout Shifts - CLS = 0).
   - فحص مستمر للبناء عبر \`npm run build\` للتأكد من انعدام أي تحذيرات أو أخطاء برمجية.

---

## 🎨 3. مكتبات ومصادر التصميم المعتمدة (Trusted UI Resources)

يجب الرجوع دائماً واستلهام أفضل المكونات والأنماط من:
- **[Shadcn UI](https://ui.shadcn.com/):** لمعايير المكونات والـ Modals، الـ Dropdowns، والأزرار المريحة.
- **[React Bits](https://www.reactbits.dev/):** للمؤثرات البصرية التفاعلية، الأنماط الحركية المبتكرة، وبطاقات الهبوط.
- **[PrebuiltUI](https://prebuiltui.com/):** لهندسة أقسام الصفحات المتكاملة وجداول المحتوى.

---

## 📋 4. قائمة الفحص الإلزامية قبل تسليم أي تعديل في الواجهات (Frontend QA Checklist)

- [ ] **الخط واللغة:** هل الخط عربي أصيل ومريح، وهل الكلمات متصلة بدون تقطيع؟
- [ ] **التجاوب:** هل تظهر الواجهة بشكل مثالي ومريح على الهاتف الذكي والتابلت والحاسوب؟
- [ ] **التباين اللوني (Contrast):** هل النصوص مقروءة بوضوح مع الخلفيات وفق معايير WCAG؟
- [ ] **مستعرض الـ PDF:** هل يفتح المستند فوراً مع إمكانية التحميل والزووم والتكبير؟
- [ ] **أدوات التحكم:** هل الأزرار واضحة، تفاعلية، وتعطي رد فعل بصري عند الضغط؟
- [ ] **فحص الـ Build:** هل المشروع يُبنى بدون أي خطأ أو تحذير (\`npm run build -> code 0\`)؟
`;

const targetDirectories = [
  'c:/Users/anisr/OneDrive/Desktop/Naja7i/.agent/workflows',
  'c:/Users/anisr/OneDrive/Desktop/Naja7i/.agents/workflows',
  'c:/Users/anisr/OneDrive/Desktop/Naja7i/.gemini/workflows',
  'c:/Users/anisr/OneDrive/Desktop/Naja7i/naja7i/.agent/workflows',
  'c:/Users/anisr/OneDrive/Desktop/Naja7i/naja7i/.agents/workflows',
  'c:/Users/anisr/OneDrive/Desktop/Naja7i/naja7i/.gemini/workflows'
];

for (const dir of targetDirectories) {
  const resolvedDir = path.resolve(dir);
  if (!fs.existsSync(resolvedDir)) {
    fs.mkdirSync(resolvedDir, { recursive: true });
  }

  const filePath = path.join(resolvedDir, '6-ui-frontend.md');
  fs.writeFileSync(filePath, uiFrontendWorkflowContent, 'utf8');
}

console.log('✅ Successfully upgraded 6-ui-frontend.md with Elite Frontend Skills across all workflow paths!');

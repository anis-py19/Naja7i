# 🎓 Naja7i (نجاحي) — Workspace Architecture & Agent Ecosystem

## 📌 Project Overview
**Naja7i (نجاحي)** is a modern, high-performance, and visually captivating educational web platform tailored for Algerian Baccalaureate (BAC) students across all 6 streams.

---

## 🤖 1. Multi-Agent Ecosystem (فريق الوكلاء المتخصصين)

لكل قسم وميزة في الموقع وكيل ذكاء اصطناعي مخصص بصلاحيات ومسؤوليات مستقلة لضمان التنظيم وعدم التداخل:

| اسم الوكيل (Agent Name) | الاختصاص والمهمة الأساسية | الملفات والوحدات التابعة له |
| :--- | :--- | :--- |
| 📚 **`lessons_curriculum_agent`** | **الدروس، المذكرات، والمنهاج الوزاري**<br>تصنيف وهيكلة ملفات الملخصات وسلاسل التمارين لجميع الشعب الست. | `src/data/userFilesData.js`<br>`src/pages/LibraryPage.jsx`<br>`src/components/SubjectViewer.jsx` |
| 🏛️ **`bac_archive_agent`** | **أرشيف مواضيع وحلول البكالوريا (2008-2026)**<br>مواضيع، حلول نموذجية، بكالوريات تجريبية، وسلم التنقيط. | `src/data/bacArchiveFullData.js`<br>`src/pages/BacArchivePage.jsx`<br>`public/BAC_Archive/` |
| ⏱️ **`quiz_engine_agent`** | **بنك الأسئلة والاختبارات التفاعلية السريعة**<br>أسئلة QCM، التحديات الموقوتة، والتعليلات المنهجية. | `src/data/quizData.js`<br>`src/pages/QuizBankPage.jsx` |
| 🧮 **`smart_tools_agent`** | **الأدوات الذكية وحاسبة المعدل ومخطط A4**<br>المعاملات الرسمية، التوجيه الجامعي، وجدول المراجعة الأسبوعي. | `src/data/plannerData.js`<br>`src/pages/StudyPlannerPage.jsx`<br>`src/pages/CalculatorPage.jsx`<br>`src/pages/CountdownPage.jsx` |
| 🎥 **`youtube_media_agent`** | **دليل قنوات وأساتذة اليوتيوب**<br>ترتيب وتصنيف أفضل الأساتذة الجزائريين وقوائم التشغيل. | `src/data/bacData.js` (قنوات اليوتيوب)<br>`src/pages/YouTubeTeachersPage.jsx` |
| 🎨 **`ui_frontend_agent`** | **هندسة الواجهات وتجربة المستخدم والمستعرض**<br>تصميم React 19، Tailwind v4، ومستعرض PDF (Canvas/Drive).<br>*(معيار الشارات: جميع الـ Badges بسيطة، هادئة، وبستايل Minimalist ناعم)*. | `src/components/Navbar.jsx`<br>`src/components/PdfReaderModal.jsx`<br>`src/App.jsx`<br>`src/index.css` |

---

## 🏛️ 2. Algerian BAC Streams Coverage (الشعب الست)
1. **شعبة علوم تجريبية (Sciences Expérimentales)**
2. **شعبة رياضيات (Mathématiques)**
3. **شعبة تقني رياضي (Technique Mathématique):** مدنية / ميكانيك / كهرباء / طرائق
4. **شعبة تسيير واقتصاد (Gestion et Économie)**
5. **شعبة آداب وفلسفة (Lettres et Philosophie)**
6. **شعبة لغات أجنبية (Langues Étrangères):** فرنسية / إنجليزية / إسبانية / ألمانية / إيطالية

---

## 🛠️ 3. Tech Stack & Engineering Standards
- **Framework:** React 19 + Vite (Fast HMR)
- **Styling:** Tailwind CSS v4 + Modern Slate/Rose CSS Design Tokens
- **Badge & Pill Design Standard:** جميع الشارات والوسوم (Badges & Pills) عبر كل صفحات ومكونات الموقع تكون **Simple & Clean** بخلفيات هادئة (`bg-slate-100` / `bg-rose-50`)، حواف `rounded-md`، وحدود ناعمة (`border-slate-200/60`) وخط متوازن (`font-medium`) بعيداً عن الألوان الفاقعة والظلال الثقيلة.
- **Animations:** Framer Motion (page transitions, micro-interactions, modal overlays)
- **PDF Engine:** Dual In-App Canvas PDF.js Renderer + Google Drive Embed
- **Direction & Language:** Arabic First (`dir="rtl"`, Cairo font), French/English terms supported.

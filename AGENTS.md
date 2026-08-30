# 🎓 Naja7i (نجاحي) — Workspace Architecture & Multi-Agent Skill Ecosystem

## 📌 Project Overview
**Naja7i (نجاحي)** is a modern, high-performance, and visually captivating educational web platform tailored specifically for Algerian Baccalaureate (BAC) students across all 6 official streams.

---

## 🤖 1. Multi-Agent Ecosystem (فريق الوكلاء المتخصصين والمهارات)

لكل قسم وميزة في الموقع وكيل ذكاء اصطناعي مخصص بصلاحيات ومسؤوليات مستقلة لضمان التنظيم، الدقة، وعدم التداخل:

| اسم الوكيل (Agent Name) | الاختصاص والمهمة الأساسية | الملفات والوحدات التابعة له |
| :--- | :--- | :--- |
| 🏛️ **`bac_archive_agent`** | **أرشيف مواضيع وحلول البكالوريا (2008—2026)**<br>فهرسة وإدارة 2,511 ملف PDF محلي + 2,526 ملف سحابي Drive للمواضيع والحلول وسلالم التنقيط الرسمية. | `src/data/bacArchiveFullData.js`<br>`src/pages/BacArchivePage.jsx`<br>`public/BAC_Archive/` |
| 📓 **`mistakes_traps_agent`** | **كراس الأخطاء الذكي وفخاخ المنهجية (Carnet d'Erreurs)**<br>سجل الأخطاء الشخصي، قاعدة فخاخ البكالوريا الشائعة، التصفية حسب المادة والخطورة، وتوليد ورقة المراجعة A4. | `src/data/commonBacTrapsData.js`<br>`src/pages/MistakesNotebookPage.jsx` |
| 🎧 **`focus_pomodoro_agent`** | **غرفة التركيز وبومودورو (Focus Room)**<br>مؤقت بومودورو مينيمالي ذكي، محرك أصوات محيطية (Web Audio API)، ونظام نصائح دوري (كل 20 ثانية). | `src/utils/focusSoundEngine.js`<br>`src/pages/FocusRoomPage.jsx`<br>`src/data/focusTipsData.js` |
| 📱 **`pwa_offline_agent`** | **تطبيق الهاتف والعمل بدون إنترنت (PWA & Offline Mode)**<br>تطبيق ويب تقدمي قابل للتثبيت، Service Worker للكاش الذكي، وشريط متابعة حالة الاتصال. | `public/manifest.json`<br>`public/sw.js`<br>`src/components/PwaInstallPrompt.jsx` |
| 📚 **`lessons_curriculum_agent`** | **الدروس، المذكرات، والمنهاج الوزاري**<br>تصنيف وهيكلة ملفات الملخصات، الدروس، وسلاسل التمارين لجميع الشعب الست. | `src/data/curriculumData.js`<br>`src/data/userFilesData.js`<br>`src/pages/LibraryPage.jsx`<br>`src/components/SubjectViewer.jsx` |
| ⏱️ **`quiz_engine_agent`** | **بنك الأسئلة والاختبارات التفاعلية السريعة**<br>أسئلة QCM، التحديات الموقوتة، والتعليلات المنهجية لجميع المواد. | `src/data/quizData.js`<br>`src/pages/QuizBankPage.jsx` |
| 🧮 **`smart_tools_agent`** | **الأدوات الذكية، حاسبة المعدل، ومخطط A4**<br>المعاملات الرسمية، التوجيه الجامعي، العد التنازلي للبكالوريا، وجدول المراجعة الأسبوعي القابل للطباعة. | `src/data/plannerData.js`<br>`src/pages/StudyPlannerPage.jsx`<br>`src/pages/CalculatorPage.jsx`<br>`src/pages/CountdownPage.jsx` |
| 🎥 **`youtube_media_agent`** | **دليل قنوات وأساتذة اليوتيوب الجزائريين**<br>ترتيب وتصنيف أفضل الأساتذة الجزائريين، شروحات المواد، وقوائم التشغيل المرتبة. | `src/data/youtubeData.js`<br>`src/pages/YouTubeTeachersPage.jsx`<br>`src/components/YouTubeRoadmaps.jsx` |
| 🎨 **`ui_frontend_agent`** | **هندسة الواجهات، تجربة المستخدم، ومستعرض PDF**<br>تصميم React 19، Tailwind CSS v4، عارض PDF المزدوج (Canvas PDF.js + Fallback)، وتناسق هوية الموقع. | `src/components/Navbar.jsx`<br>`src/components/PdfReaderModal.jsx`<br>`src/App.jsx`<br>`src/index.css` |

---

## 🏛️ 2. Algerian BAC Streams Coverage (الشعب الست والمعاملات الرسمية)

1. **شعبة علوم تجريبية (Sciences Expérimentales):**
   - المواد الأساسية: علوم الطبيعة والحياة (معامل 6)، العلوم الفيزيائية (معامل 5)، الرياضيات (معامل 5).
   - المواد المشتركة: اللغة العربية (3)، الفرنسية (2)، الإنجليزية (2)، التاريخ والجغرافيا (2)، العلوم الإسلامية (2)، الفلسفة (2)، الأمازيغية (2).
2. **شعبة رياضيات (Mathématiques):**
   - المواد الأساسية: الرياضيات (معامل 7)، العلوم الفيزيائية (معامل 6)، علوم الطبيعة والحياة (معامل 2).
   - المواد المشتركة: اللغة العربية (3)، الفرنسية (2)، الإنجليزية (2)، التاريخ والجغرافيا (2)، العلوم الإسلامية (2)، الفلسفة (2)، الأمازيغية (2).
3. **شعبة تقني رياضي (Technique Mathématique):**
   - الفروع الأربعة: هندسة مدنية / هندسة ميكانيكية / هندسة كهربائية / هندسة الطرائق (المادة التقنية معامل 7).
   - المواد الأساسية: الرياضيات (6)، العلوم الفيزيائية (6) مع اللغات والمواد المشتركة.
4. **شعبة تسيير واقتصاد (Gestion et Économie):**
   - المواد الأساسية: التسيير المحاسبي والمالي (معامل 6)، الاقتصاد والمناجمنت (معامل 5)، الرياضيات (معامل 5)، القانون (معامل 2).
   - المواد المشتركة: التاريخ والجغرافيا (4)، اللغة العربية (3)، الفرنسية (2)، الإنجليزية (2)، العلوم الإسلامية (2)، الفلسفة (2)، الأمازيغية (2).
5. **شعبة آداب وفلسفة (Lettres et Philosophie):**
   - المواد الأساسية: الفلسفة (معامل 6)، اللغة العربية وآدابها (معامل 6)، التاريخ والجغرافيا (معامل 4).
   - المواد المشتركة: الفرنسية (3)، الإنجليزية (3)، الرياضيات (2)، العلوم الإسلامية (2)، الأمازيغية (2).
6. **شعبة لغات أجنبية (Langues Étrangères):**
   - المواد الأساسية: اللغة الفرنسية (معامل 5)، اللغة الإنجليزية (معامل 5)، اللغة العربية (معامل 5)، اللغة الثالثة [ألمانية / إسبانية / إيطالية] (معامل 4).
   - المواد المشتركة: التاريخ والجغرافيا (2)، العلوم الإسلامية (2)، الفلسفة (2)، الرياضيات (2)، الأمازيغية (2).

---

## 🛠️ 3. Tech Stack & Engineering Standards

- **Framework & Build:** React 19 + Vite (Fast HMR & Optimized Tree-Shaking).
- **Styling:** Tailwind CSS v4 + Modern Slate/Rose CSS Design Tokens.
- **Badge & Pill Design Standard:** جميع الشارات والوسوم (Badges & Pills) عبر كل صفحات ومكونات الموقع تكون **Simple & Clean** بخلفيات هادئة (`bg-slate-100` / `bg-rose-50` / `bg-emerald-50`)، حواف `rounded-md`، وحدود ناعمة (`border-slate-200/60`) وخط متوازن (`font-medium`) بعيداً عن الألوان الفاقعة والظلال الثقيلة.
- **Animations:** Framer Motion (page transitions, micro-interactions, modal overlays).
- **Audio Engine:** Pure Web Audio API Synthesizer (zero external audio asset dependencies, binaural beats, noise filters).
- **PDF Engine:** Dual In-App Canvas PDF.js Renderer + Google Drive Cloud Preview & Direct Offline Serving (`public/BAC_Archive/`).
- **Direction & Language:** Arabic First (`dir="rtl"`, Cairo font), French & English technical terms supported seamlessly.
- **Offline First:** Service Worker caching + Web App Manifest for mobile and desktop standalone installation.

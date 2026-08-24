# 🧭 مخطط سير العمل الشامل لمنصة نجاحي (Naja7i Platform Workflow)

دليل بصري شامل يوضح كيف تعمل منصة **نجاحي (Naja7i)**، مسار الطالب (User Journey)، وهيكلة فريق الوكلاء الذكية.

---

## 🎯 1. المخطط العام للرحلة والتجربة (Student User Journey Workflow)

```mermaid
flowchart TD
    Start(["🚀 دخول الطالب لمنصة نجاحي"]) --> Home["🏠 الصفحة الرئيسية (Home Portal)"]
    
    Home --> Choice{"ماذا يريد الطالب؟"}
    
    %% المسار 1: الملخصات والدروس
    Choice -->|"📚 دراسة ومراجعة"| StreamSelect["اختر الشعبة من الـ 6 شعب"]
    StreamSelect --> SubjectPage["فضاء المادة والوحدات"]
    SubjectPage --> ViewPDF["📑 مستعرض PDF الذكي المدمج (Canvas / Google Drive)"]
    
    %% المسار 2: التقييم والاختبار
    Choice -->|"⏱️ اختبار سريع"| QuizEngine["🎯 بنك الأسئلة (Quiz & QCM)"]
    QuizEngine --> QuizRun["حل الأسئلة + مؤقت 60 ثانية"]
    QuizRun --> InstantFeedback["💡 تصحيح فوري + شرح منهجي معلل"]
    QuizRun --> ScoreCard["📊 كشف النتيجة وعلامة /20 + تشخيص الأداء"]
    
    %% المسار 3: التنظيم والمخطط
    Choice -->|"📅 تخطيط أسبوعي"| Planner["مخطط الأهداف الأسبوعي"]
    Planner --> PrintA4["🖨️ طباعة جدول A4 جاهز للتأشير (Cocher)"]
    
    %% المسار 4: حساب المعدل
    Choice -->|"🧮 حساب المعدل"| Calc["حاسبة معدل البكالوريا"]
    Calc --> UniGuide["🎓 المعاملات الرسمية + التوجيه الجامعي"]
    
    %% المسار 5: الفيديوهات
    Choice -->|"🎥 شروحات يوتيوب"| Teachers["دليل أفضل أساتذة اليوتيوب في الجزائر"]
```

---

## 🤖 2. مخطط توزيع مهام الوكلاء (Multi-Agent Coordination System)

```mermaid
graph TD
    subgraph Core ["🏛️ إدارة النظام الرئيسية (Antigravity Elite)"]
        LeadAgent["المهندس المعماري الرئيسي للمشروع"]
    end

    subgraph Agents ["🤖 فريق الوكلاء المتخصصين"]
        A1["📚 lessons_curriculum_agent<br/><b>وكيل الدروس والمنهاج الوزاري</b><br/>• فهرسة 326 ملف ملخص وسلسلة تمارين<br/>• تصنيف المواد لجميع الشعب"]
        A2["🏛️ bac_archive_agent<br/><b>وكيل أرشيف البكالوريا</b><br/>• مواضيع وحلول (2008-2026)<br/>• سلم التنقيط الوزاري"]
        A3["⏱️ quiz_engine_agent<br/><b>وكيل بنك الأسئلة QCM</b><br/>• صياغة الأسئلة والخيارات<br/>• الشروحات المنهجية المعتمدة"]
        A4["🧮 smart_tools_agent<br/><b>وكيل الأدوات والمخططات</b><br/>• حاسبة المعاملات الرسمية<br/>• جدول طباعة A4 والعداد التنازلي"]
        A5["🎥 youtube_media_agent<br/><b>وكيل المحتوى المرئي</b><br/>• تصنيف أفضل الأساتذة والقنوات"]
        A6["🎨 ui_frontend_agent<br/><b>وكيل الواجهات وتجربة المستخدم</b><br/>• React 19 + Tailwind v4 + Canvas PDF Viewer"]
    end

    LeadAgent --> A1
    LeadAgent --> A2
    LeadAgent --> A3
    LeadAgent --> A4
    LeadAgent --> A5
    LeadAgent --> A6
```

---

## 🗂️ 3. مخطط تدفق البيانات والمستندات (Data & Document Flow)

| القسم / الميزة | مصدر البيانات (Data Source) | طريقة العرض والتفاعل (Presentation) | آلية الحماية والأداء |
| :--- | :--- | :--- | :--- |
| **مكتبة الملفات والدروس** | `userFilesData.js` (326 ملف مفهرس) | `LibraryPage.jsx` & `SubjectViewer.jsx` | فلترة فورية بالبحث والشعبة + تصفح صفحات سريع |
| **مستعرض الـ PDF** | روابط Google Drive أو ملفات محلية | `PdfReaderModal.jsx` | رسم Canvas بدقة عالية أو تضمين Drive مباشر (منيع ضد IDM) |
| **بنك الأسئلة QCM** | `quizData.js` (أسئلة بـ 4 خيارات) | `QuizBankPage.jsx` | عداد زمني + تصحيح فوري وشرح منهجي + حفظ النتائج محلياً |
| **مخطط المراجعة** | `plannerData.js` | `StudyPlannerPage.jsx` | أهداف يومية للمتمدرسين والأحرار + ستايل مخصص لطباعة ورقة A4 واحدة |
| **حاسبة المعدل** | `bacData.js` (معاملات وزارة التربية) | `CalculatorPage.jsx` | حساب فوري للمعدل وتحديد التخصصات الجامعية المتاحة |

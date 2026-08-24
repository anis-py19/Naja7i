import fs from 'fs';
import path from 'path';

const workflows = [
  {
    filename: '1-lessons-curriculum.md',
    content: `---
description: "سير عمل تنظيم وفهرسة الدروس والملخصات وسلاسل التمارين لجميع شعب البكالوريا"
---

# 📚 سير عمل الدروس والمنهاج الوزاري (Curriculum & Lessons Workflow)

دليل سير العمل المخصص لإدارة المذكرات والملخصات وسلاسل التمارين لجميع الشعب الست.

## 📌 خطوات التنفيذ:
1. **تحديد الشعبة والمادة:** مطابقة الملف مع الشعبة المستهدفة والمادة الرسمية.
2. **تنقية وتدقيق البيانات:** التحقق من العنوان الأكاديمي، اسم الأستاذ، نوع الملف (ملخص / تمارين / سلاسل)، وصيغته.
3. **التحديث في الكتالوج:** تسجيل بيانات الملف في \`src/data/userFilesData.js\`.
4. **فحص العرض والمستعرض:** التحقق من فتح الملف في مكتبة الموقع والمستعرض المدمج.
`
  },
  {
    filename: '2-bac-archive.md',
    content: `---
description: "سير عمل إدارة مواضيع وحلول شهادة البكالوريا الرسمية (2008-2026) والبكالوريات التجريبية"
---

# 🏛️ سير عمل أرشيف البكالوريا (BAC Archive Workflow)

دليل سير العمل المخصص لمواضيع وحلول البكالوريا الرسمية وسلم التنقيط لجميع الشعب.

## 📌 خطوات التنفيذ:
1. **اختيار السنة والشعبة:** تحديد السنة (من 2008 حتى 2026) والشعبة والمادة.
2. **فهرسة الموضوع والحل:** التأكد من وجود ملف الموضوع وملف الحل النموذجي مع سلم التنقيط.
3. **التحديث في قاعدة البيانات:** تسجيل الرابط في \`src/data/bacArchiveFullData.js\` أو مجلدات \`public/BAC_Archive/\`.
4. **الربط مع Google Drive:** توفير الروابط التفاعلية المباشرة.
`
  },
  {
    filename: '3-quiz-engine.md',
    content: `---
description: "سير عمل إعداد وتطوير بنك الأسئلة والاختبارات التفاعلية السريعة QCM"
---

# ⏱️ سير عمل بنك الأسئلة والاختبارات (Quiz Engine Workflow)

دليل سير العمل المخصص لإضافة وتطوير أسئلة الـ QCM والتحديات الموقوتة.

## 📌 خطوات التنفيذ:
1. **اختيار الوحدة والمنهاج:** تحديد المادة والوحدة الدراسية وفق المنهاج الوزاري الرسمي.
2. **صياغة السؤال والخيارات:** كتابة 4 خيارات متوازنة وتحديد الإجابة الصحيحة.
3. **كتابة الشرح النموذجي المعلل:** تقديم تعليل تربوي يرسخ المعلومة لدى الطالب.
4. **التحديث في بنك الأسئلة:** إضافة السؤال إلى \`src/data/quizData.js\` والتحقق من حساب النتيجة.
`
  },
  {
    filename: '4-smart-tools.md',
    content: `---
description: "سير عمل تطوير حاسبة معدل البكالوريا، مخطط المراجعة الأسبوعي A4، والعداد التنازلي"
---

# 🧮 سير عمل الأدوات الذكية ومخطط المراجعة (Smart Tools Workflow)

دليل سير العمل المخصص لحاسبة المعدل، التوجيه الجامعي، وجدول الطباعة A4.

## 📌 خطوات التنفيذ:
1. **تدقيق المعاملات الرسمية:** مطابقة المعاملات مع الجريدة الرسمية لوزارة التربية الوطنية.
2. **تطوير مخطط A4:** ضبط مهام المراجعة الأسبوعية والتأكد من مناسبة القياسات لصفحة A4 واحدة.
3. **تحديث العداد التنازلي:** ضبط تواريخ امتحان البكالوريا ورزنامة المحطات الرسمية.
`
  },
  {
    filename: '5-youtube-teachers.md',
    content: `---
description: "سير عمل تصنيف وتحديث دليل أفضل أساتذة وقنوات اليوتيوب التعليمية للبكالوريا"
---

# 🎥 سير عمل أساتذة وقنوات اليوتيوب (YouTube Media Workflow)

دليل سير العمل المخصص لدليل قنوات الشرح والأساتذة الجزائريين.

## 📌 خطوات التنفيذ:
1. **فرز وتصنيف الأساتذة:** ترتيب القنوات حسب المادة، الشعبة، ونشاط القناة.
2. **إضافة البلاي ليست:** ربط قوائم التشغيل المباشرة لشروحات الدروس وحلول التمارين.
3. **التحديث في قاعدة البيانات:** حفظ البيانات في \`src/data/bacData.js\`.
`
  },
  {
    filename: '6-ui-frontend.md',
    content: `---
description: "سير عمل هندسة الواجهات، التصميم المتجاوب، وتطوير مستعرض الـ PDF"
---

# 🎨 سير عمل الواجهات والمستعرض (UI/UX & Frontend Workflow)

دليل سير العمل المخصص لهندسة الواجهات، الألوان، الخطوط، ومستعرض الـ PDF.

## 📌 خطوات التنفيذ:
1. **هندسة المكونات:** تطوير مكونات React 19 نظيفة مع Tailwind CSS v4.
2. **دعم اللغة العربية والـ RTL:** ضبط خط كايرو (Cairo) وتناسق الاتجاهات والبطاقات.
3. **تطوير مستعرض الـ PDF:** ضمان عمل Canvas و Google Drive Preview بدون أي أخطاء أو مقاطعة IDM.
4. **فحص الـ Build والأداء:** تشغيل \`npm run build\` للتأكد من خلو المشروع من أي خطأ.
`
  }
];

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

  for (const wf of workflows) {
    const filePath = path.join(resolvedDir, wf.filename);
    fs.writeFileSync(filePath, wf.content, 'utf8');
  }
}

console.log('✅ Successfully created all Workflows across workspace directories!');

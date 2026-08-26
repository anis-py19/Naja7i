import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure worker for in-browser PDF text extraction
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * 📄 Extract raw text from a PDF File or Blob in the browser
 */
export async function extractTextFromPdf(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    
    let fullText = '';
    const maxPages = Math.min(pdfDoc.numPages, 30); // Up to 30 pages

    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += `\n--- [صفحة ${pageNum}] ---\n` + pageText;
    }

    return {
      text: fullText.trim(),
      pagesCount: pdfDoc.numPages,
      extractedPages: maxPages
    };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('تعذر استخراج النص من ملف الـ PDF. يرجى التأكد من أن الملف غير محمي بكلمة سر.');
  }
}

/**
 * 🖼️ Convert File to Base64 (for Images or PDF multi-modal transmission)
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      resolve({
        mimeType: file.type || 'application/pdf',
        data: base64Data
      });
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * 🤖 Generate AI Summary via Google Gemini API (Gemini 1.5 Flash)
 */
export async function generateAiSummary({
  apiKey,
  mode = 'comprehensive', // 'comprehensive' | 'high_yield' | 'questions' | 'mindmap'
  rawText = '',
  inlineFile = null // { mimeType, data }
}) {
  const activeKey = (apiKey && apiKey.trim()) || import.meta.env.VITE_GEMINI_API_KEY;
  if (!activeKey || !activeKey.trim()) {
    throw new Error('يرجى إدخال مفتاح Google Gemini API للمتابعة. (المفتاح مجاني بالكامل)');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey.trim()}`;

  let modeInstruction = '';
  switch (mode) {
    case 'high_yield':
      modeInstruction = `
النمط المطلوب: ملخص مركز ليلة الامتحان (High-Yield Quick Revision).
ركز فقط وبشكل مكثف على:
1. القوانين والمعادلات الرياضية/العلمية الأساسية
2. أهم التعاريف والمصطلحات التي تتكرر في التصحيح النموذجي للبكالوريا
3. 5 فخاخ منهجية شائعة يقع فيها الطلبة في هذه الوحدة وكيفية تجنبها
4. ملخص سريع في نقاط موجزة للحفظ السريع.
`;
      break;

    case 'questions':
      modeInstruction = `
النمط المطلوب: بنك أسئلة وتطبيقات مقترحة للبكالوريا (Practice Exam Questions).
قم بتوليد:
1. 5 أسئلة اختيار من متعدد (QCM) مع تحديد الإجابة الصحيحة وشرح سببها
2. مسألة / سؤال مركب على طريقة البكالوريا مع سلم التنقيط التقديري
3. الإجابة النموذجية المنهجية خطوة بخطوة مع الكلمات المفتاحية الوزارية (Mots-clés).
`;
      break;

    case 'mindmap':
      modeInstruction = `
النمط المطلوب: مخطط ذهني هيكلي وتسلسل مفاهيمي (Structured Mindmap).
قم بتنظيم محتوى الدرس في هيكل شجري منطقي:
- الفكرة العامة للوحدة
  └── المحور 1
      ├── المفاهيم الفرعية
      └── التطبيقات
  └── المحور 2
      ├── القواعد
      └── الاستنتاجات
- جدول المقارنة بين العناصر الأساسية المتشابهة إن وجدت.
`;
      break;

    case 'comprehensive':
    default:
      modeInstruction = `
النمط المطلوب: ملخص أكاديمي شامل ومفصل (Comprehensive Study Notes).
نظم الملخص وفق الهيكل التالي بالضبط:
## 📌 أولاً: مدخل والمفاهيم الأساسية للوحدة
(شرح مبسط ومباشر للأفكار الرئيسية)

## 📝 ثانياً: القوانين، القواعد والتعاريف المعتمدة
(جدول أو قائمة واضحة بكل العلاقات والقوانين والتعاريف الدقيقة للحفظ)

## 🎯 ثالثاً: منهجية الإجابة وأسرار البكالوريا
(كيف تطرح أسئلة هذه الوحدة في امتحانات البكالوريا السابقة وما هي الكلمات المفتاحية المطلوبة في التصحيح)

## 💡 رابعاً: بطاقات المراجعة السريعة (Flashcards)
(3 إلى 5 بطاقات سؤال وجواب سريع للمراجعة وتثبيت المعلومة).
`;
      break;
  }

  const systemPrompt = `
أنت "المستشار الأكاديمي الذكي لمنصة نجاحي (Naja7i.com)"، خبير أول ومحصور حصرياً في المنهاج وبرامج شهادة البكالوريا الجزائرية (3AS) والتعليم الثانوي لدى وزارة التربية الوطنية (جميع الشعب: علوم تجريبية، رياضيات، تقني رياضي، تسيير واقتصاد، آداب وفلسفة، لغات أجنبية).

⛔ **شرط التحقق الأكاديمي الإلزامي (BAC Curriculum Validation):**
- قبل البدء بالتلخيص، تحقق من أن الوثيقة أو النص المرفق يمثل درساً، ملخصاً، مصفوفة مفاهيم، أو مسألة/تمريناً يتعلق بمواد ومقررات شهادة البكالوريا الجزائرية (العلوم الطبيعية، العلوم الفيزيائية، الرياضيات، الفلسفة، العلوم الإسلامية، التاريخ والجغرافيا، اللغة العربية، اللغات الأجنبية، التسيير المحاسبي والمالي، الاقتصاد والمناجمنت، القانون، أو الهندسات الأربع: الميكانيكية، المدنية، الكهربائية، الطرائق).
- إذا كان المحتوى المرفق **خارجاً عن المنهاج الدراسي للبكالوريا** (مثل: نصوص عشوائية، مقالات عامة غير دراسية، دردشات، مواضيع ترفيهية، أو مجالات لا تدرس في البكالوريا الجزائرية)، **يجب عليك التوقف فوراً وإرجاع النص التالي بالضبط وبدون أي ملخص إضافي:**
[NOT_BAC_CURRICULUM]

إذا كان المحتوى دراسياً متعلقاً بالبكالوريا، التزم بالقواعد والمراحل الأربع الذهبية التالية:

---
### 🌟 القواعد المنهجية الأربع الإلزامية في التلخيص:

1. 🛡️ **الحفاظ التام على المحتوى العلمي والأكاديمي (Zero Loss of Academic Content):**
   - لا تحذف أو تتجاهل أي قانون، قاعدة، شرط، معادلة، أو مصطلح علمي ورد في الوثيقة أو الدرس.
   - انقل المفاهيم بدقة علمية مطابقة للمنهاج الجزائري الرسمي وسلم التنقيط الوزاري.

2. 🗺️ **الاعتماد على المخططات والهياكل والجداول (Diagrams, Mindmaps & Tables):**
   - حول العمليات المعقدة والمقارنات إلى **جداول Markdown منظمة** ومقارنات واضحة.
   - استخدم الهياكل الشجرية النصية والتسلسل السهمي (مثال: الفكرة ➔ الخطوة 1 ➔ الخطوة 2 ➔ النتيجة) لتبسيط الفهم.
   - استخدم المخططات الهيكلية (├── └──) لتقسيم الوحدات الكبيرة إلى فروع سهلة.

3. 💬 **لغة واضحة، دقيقة، ومباشرة (Crystal-Clear Language):**
   - اكتب بلغة عربية فصيحة وسلسة ومفهومة جداً للطالب بدون تعقيد لغوي أو كلام إنشائي زائد.
   - اذكر المصطلحات العلمية الدقيقة والمصطلحات بالفرنسية/الإنجليزية بين قوسين عند الحاجة (مثال: الانقسام الخيطي المتساوي (Mitose)).

4. 📑 **تنظيم وتستيف بصري فائق الراحة للقراءة (Effortless Visual Scanning & Layout):**
   - نسّق النص بعناوين واضحة، أرقام مميزة (1️⃣، 2️⃣، 3️⃣)، نقاط محددة، وتظليل للكلمات المفتاحية الأساسية (**Bold**).
   - أضف صناديق تنبيه للملاحظات والفخاخ المنهجية (> 💡 ملاحظة هامة: / > ⚠️ فخ شائع في البكالوريا:).
   - اجعل الملخص ممتعاً وسهل المراجعة والحفظ ليلة الامتحان.
---

${modeInstruction}
`;

  const contentsParts = [
    { text: systemPrompt }
  ];

  if (inlineFile && inlineFile.data) {
    contentsParts.push({
      inlineData: {
        mimeType: inlineFile.mimeType,
        data: inlineFile.data
      }
    });
    contentsParts.push({
      text: `يرجى تحليل هذا الملف المرفق وتلخيصه وفق النمط والتعليمات المحددة.`
    });
  } else if (rawText && rawText.trim()) {
    contentsParts.push({
      text: `إليك نص الدرس / الوثيقة المراد تلخيصها:\n\n${rawText}`
    });
  } else {
    throw new Error('يرجى تقديم نص أو رفع ملف للتلخيص.');
  }

  const candidateModels = [
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-1.5-flash'
  ];

  let lastError = null;

  for (const modelName of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${activeKey.trim()}`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: contentsParts
            }
          ],
          generationConfig: {
            temperature: 0.4,
            topP: 0.95,
            maxOutputTokens: 3000
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        const candidate = result.candidates?.[0];
        const summaryText = candidate?.content?.parts?.map(p => p.text).join('\n') || '';

        if (summaryText) {
          return summaryText;
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `فشل الاتصال بالنموذج ${modelName} (رمز الخطأ: ${response.status})`;
        lastError = new Error(message);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('تعذر توليد الملخص عبر نماذج الذكاء الاصطناعي المتاحة. يرجى التحقق من صلاحية مفتاح API.');
}

/**
 * ⚡ Offline Local Heuristic BAC Summarizer (يعمل محلياً بدون إنترنت في حال عدم توفر مفتاح)
 */
export function generateLocalHeuristicSummary({ text, subjectName = 'المادة', streamName = 'جميع الشعب' }) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  
  // Extract definitions and equations heuristics
  const definitions = lines.filter(l => 
    l.includes('هو') || l.includes('هي') || l.includes('تعريف') || l.includes('يقصد ب') || l.includes('مفهوم')
  ).slice(0, 5);

  const keyPoints = lines.filter(l => 
    l.startsWith('-') || l.startsWith('•') || l.startsWith('*') || l.match(/^\d+[\.\-\)]/)
  ).slice(0, 10);

  return `
# 📑 ملخص الدرس الأكاديمي (الوضع المحلي التلقائي)
**المادة:** ${subjectName} | **الشعبة:** ${streamName}

---

## 📌 1. أبرز المفاهيم المستخرجة من الوثيقة:
${definitions.length > 0 ? definitions.map(d => `- **مفهوم:** ${d}`).join('\n') : '- يحتوي الملف على مفاهيم أساسية تتطلب مراجعة شاملة لجميع العناصر.'}

## 📝 2. النقاط والعناصر المحورية:
${keyPoints.length > 0 ? keyPoints.map(k => `${k}`).join('\n') : lines.slice(0, 8).map(l => `- ${l}`).join('\n')}

## 🎯 3. نصائح منهجية لبكالوريا الجزائر 🇩🇿:
- احرص على حفظ المصطلحات والكلمات المفتاحية المعتمدة في التصحيح النموذجي.
- قم بحل تمارين البكالوريا السابقة الخاصة بهذه الوحدة لتثبيت طرق طرح الأسئلة.

> 💡 **ملاحظة:** هذا ملخص مستخرج محلياً. للحصول على تحليل ذكي فائق الدقة وتوليد أسئلة ونقاط حفظ تفاعلية، أضف مفتاح **Google Gemini API** المجاني من خيار الإعدادات بالأعلى.
`;
}

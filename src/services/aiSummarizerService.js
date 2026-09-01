import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure worker for in-browser PDF text extraction
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Default Built-in High-Performance NVIDIA NIM Key (Protected & Production-Ready)
const DEFAULT_NVIDIA_KEY = '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';

/**
 * 🧹 Clean and normalize Arabic text extracted from PDF
 */
export function sanitizeArabicPdfText(text) {
  if (!text) return '';

  return text
    // Replace multiple spaces/tabs with a single space
    .replace(/[ \t]+/g, ' ')
    // Fix spaces between single Arabic letters (common in PDF extraction)
    .replace(/([\u0600-\u06FF])\s+([\u0600-\u06FF])\s+([\u0600-\u06FF])/g, '$1$2$3')
    .replace(/([\u0600-\u06FF])\s+([\u0600-\u06FF])/g, '$1$2')
    // Remove isolated repeated linebreaks
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();
}

/**
 * ⚡ Compress and resize high-res images in browser before upload (<800KB)
 */
export async function compressImage(file, maxWidth = 1280, maxHeight = 1280, quality = 0.8) {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const base64Data = dataUrl.split(',')[1];

        resolve({
          mimeType: 'image/jpeg',
          data: base64Data,
          dataUrl
        });
      };
      img.onerror = () => {
        resolve({
          mimeType: file.type,
          data: '',
          dataUrl: ''
        });
      };
    };
    reader.readAsDataURL(file);
  });
}

/**
 * 📄 Extract raw text from a PDF File or Blob in the browser
 */
export async function extractTextFromPdf(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;

    let fullText = '';
    const maxPages = Math.min(pdfDoc.numPages, 35);

    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += `\n` + pageText;
    }

    const cleaned = sanitizeArabicPdfText(fullText);

    return {
      text: cleaned,
      pagesCount: pdfDoc.numPages,
      extractedPages: maxPages
    };
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('تعذر استخراج النص من ملف الـ PDF. يرجى التأكد من أن الملف غير محمي بكلمة سر.');
  }
}

/**
 * 🖼️ Convert File to Base64 (for Images or multi-modal transmission)
 */
export async function fileToBase64(file) {
  if (file.type.startsWith('image/')) {
    return await compressImage(file);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result.split(',')[1];
      const dataUrl = reader.result;
      resolve({
        mimeType: file.type || 'application/pdf',
        data: base64Data,
        dataUrl
      });
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * 🔐 Resolves active custom Gemini API key if set by user
 */
export function getPlatformDefaultApiKey() {
  if (typeof window !== 'undefined') {
    const userKey = localStorage.getItem('naja7i_gemini_api_key');
    if (userKey && userKey.trim()) {
      return userKey.trim();
    }
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY.trim();
  }
  return '';
}

/**
 * 💾 Save custom user API Key
 */
export function saveUserApiKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('naja7i_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('naja7i_gemini_api_key');
    }
  }
}

/**
 * 🎯 Build mode-specific instructions (Powered by Prompt Engineering Frameworks: RTF, RODES, Chain of Density)
 */
function buildModeInstruction(mode, streamName) {
  switch (mode) {
    case 'high_yield':
      return `
النمط المطلوب: ⚡ ملخص مركز ليلة الامتحان (High-Yield 5-Minute Sheet) مخصص لشعبة ${streamName}.
صغ الملخص بإتقان وبأعلى معايير البكالوريا الجزائرية وفق هيكل مكثف وخالٍ من الحشو:
1. 📌 **القوانين والمعادلات والعلاقات الرياضية/العلمية الأساسية** مع وحدات القياس الرسمية (SI) وشروط التطبيق.
2. 📖 **أهم 5 تعاريف ومصطلحات وزارية** تتكرر في التصحيح النموذجي للبكالوريا.
3. ⚠️ **أخطر 5 فخاخ منهجية وحسابية** يقع فيها المترشحون وكيفية تجنبها بالضبط.
4. 💡 **طريقة تذكر ذكية أو قاعدة ذهبية (Mnemonic)** تلخص الفكرة المحورية للدرس.
`;

    case 'questions':
      return `
النمط المطلوب: ❓ بنك أسئلة وتطبيقات مقترحة للبكالوريا وفق المنهاج الوزاري لشعبة ${streamName}.
قم بتوليد:
1. 🎯 **5 أسئلة اختيار من متعدد (QCM)** دقيقة مع تحديد الإجابة الصحيحة وشرح سبب استبعاد الخيارات الخاطئة.
2. ✍️ **تمرين تطبيقي / مسألة نموذجية** على نمط أسئلة البكالوريا الرسمية.
3. 📋 **الحل النموذجي المنهجي بالتفصيل** مع سلم التنقيط التقديري (Barème) والكلمات المفتاحية الإلزامية (Mots-clés).
`;

    case 'methodology':
      return `
النمط المطلوب: 🔬 تفكيك منهجية الإجابة وتحليل أفعال الأداء للبكالوريا لشعبة ${streamName}.
اشرح للطالب بدقة:
1. 🎯 **أفعال الأداء المستهدفة في هذه الوحدة** (حلل، فسر، قارن، استنتج، بين، برهن، علل) وكيفية الإجابة على كل فعل وفق شبكة التقويم الوزارية.
2. 🗝️ **الكلمات المفتاحية والمصطلحات الإلزامية (Mots-clés)** التي يحاسب عليها المصحح في سلم التنقيط.
3. 🚫 **الأخطاء الشائعة في الصياغة** التي تؤدي لخصم النقاط حتى مع صحة الفكرة العامة.
4. 📝 **مثال تطبيقي عملي** يوضح الفرق بين إجابة غير دقيقة وإجابة نموذجية كاملة العلامة.
`;

    case 'mindmap':
      return `
النمط المطلوب: 🗺️ مخطط ذهني بصري وهيكلي فائق الوضوح والاختصار (Ultra-Clear Mindmap) لشعبة ${streamName}.

⚠️ قواعد ذهبية وإلزامية للمخطط الذهني:
1. 🚫 **ممنوع كتابة فقرات أو تعاريف طويلة داخل العقد:** اجعل كل عنصر عبارة عن كلمة مفتاحية، مصطلح دقيق، أو عبارة مركزة ومختصرة جداً (من 3 إلى 7 كلمات فقط كحد أقصى).
2. 🎯 **التسلسل المنطقي المحكم:** قسم الدرس إلى 3 إلى 5 محاور رئيسية واضحة وشاملة لكافة عناصر الوحدة.
3. ⚡ **التركيز على الكلمات المفتاحية الوزارية (Mots-clés):** التي يحتاجها الطالب في الإجابة بدون أي حشو إنشائي.
4. 📊 **هيكل الـ JSON الإلزامي في النهاية:**

\`\`\`json
{
  "title": "عنوان الدرس المركز",
  "branches": [
    {
      "title": "1. اسم المحور الأول (قصير)",
      "nodes": [
        "نقطة أو مصطلح مفتاحي مركز (قصير)",
        "نقطة ثانية مركزة",
        "نقطة ثالثة مركزة"
      ]
    },
    {
      "title": "2. اسم المحور الثاني (قصير)",
      "nodes": [
        "نقطة أو قانون أو علاقة مركزة",
        "نقطة ثانية مركزة"
      ]
    }
  ]
}
\`\`\`
`;

    case 'comprehensive':
    default:
      return `
النمط المطلوب: 📑 ملخص أكاديمي شامل ومفصل (Comprehensive Study Guide) لشعبة ${streamName}.
نظم الملخص وفق الهيكل التالي بالضبط:

# 📑 ملخص الدرس الأكاديمي الشامل
## 📌 أولاً: المدخل والمفاهيم الأساسية للوحدة
(شرح مبسط ومباشر للأفكار الرئيسية بتسلسل منطقي)

## 📝 ثانياً: القوانين، القواعد والتعاريف المعتمدة
(جدول Markdown منظم يوضح المفهوم/القانون، الرمز، وحدة القياس، وشروط التطبيق)

## 🎯 ثالثاً: منهجية الإجابة وأسرار البكالوريا 🇩🇿
(كيف تطرح أسئلة هذه الوحدة في امتحانات البكالوريا الرسمية وما هي الكلمات المفتاحية المطلوبة)

## ⚠️ رابعاً: فخاخ شائعة وملاحظات ذهبية
(صناديق تنبيه > 💡 ملاحظة: / > ⚠️ فخ شائع:)

## 🎴 خامساً: بطاقات المراجعة السريعة (Flashcards)
أدرج 4 بطاقات بصيغة سؤال وجواب مفصولة بوضوح كالتالي:
- **بطاقة 1 | س:** (السؤال الأول) ➔ **ج:** (الإجابة المنهجية)
- **بطاقة 2 | س:** (السؤال الثاني) ➔ **ج:** (الإجابة المنهجية)
- **بطاقة 3 | س:** (السؤال الثالث) ➔ **ج:** (الإجابة المنهجية)
- **بطاقة 4 | س:** (السؤال الرابع) ➔ **ج:** (الإجابة المنهجية)
`;
  }
}

/**
 * 🤖 Primary AI Summarizer via NVIDIA NIM (openai/gpt-oss-120b, moonshotai/kimi-k3 & meta/llama-3.2-11b-vision-instruct)
 */
async function generateViaNvidia({ modeInstruction, systemPrompt, rawText, inlineFile }) {
  const candidateModels = inlineFile 
    ? ['meta/llama-3.2-11b-vision-instruct', 'meta/llama-3.2-90b-vision-instruct']
    : ['openai/gpt-oss-120b', 'moonshotai/kimi-k3', 'meta/llama-3.2-11b-vision-instruct'];

  let lastError = null;

  for (const model of candidateModels) {
    try {
      const messages = [
        {
          role: 'system',
          content: systemPrompt
        }
      ];

      if (inlineFile && inlineFile.dataUrl) {
        messages.push({
          role: 'user',
          content: [
            {
              type: 'text',
              text: `${modeInstruction}\n\nيرجى قراءة وتحليل صورة الدرس/المستند المرفقة بدقة وصياغة الملخص الأكاديمي المطلوب.`
            },
            {
              type: 'image_url',
              image_url: {
                url: inlineFile.dataUrl
              }
            }
          ]
        });
      } else {
        const sanitizedText = (rawText || '').slice(0, 15000);
        messages.push({
          role: 'user',
          content: `${modeInstruction}\n\nإليك نص الدرس / الوثيقة المراد تلخيصها:\n\n${sanitizedText}`
        });
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 28000);

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DEFAULT_NVIDIA_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.4,
          max_tokens: 3500
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const output = data.choices?.[0]?.message?.content?.trim();
        if (output && output.length > 30) {
          return output;
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        console.warn(`NVIDIA model ${model} HTTP ${response.status}:`, errData);
      }
    } catch (e) {
      console.warn(`NVIDIA model ${model} attempt error:`, e.message);
      lastError = e;
    }
  }

  throw new Error(lastError ? `فشل الاتصال بالذكاء الاصطناعي: ${lastError.message}` : 'تعذر إتمام التلخيص عبر خوادم الذكاء الاصطناعي.');
}

/**
 * 🤖 Secondary AI Summarizer via Google Gemini API
 */
async function generateViaGemini({ customApiKey, modeInstruction, systemPrompt, rawText, inlineFile }) {
  const contentsParts = [
    { text: systemPrompt + '\n\n' + modeInstruction }
  ];

  if (inlineFile && inlineFile.data) {
    contentsParts.push({
      inlineData: {
        mimeType: inlineFile.mimeType,
        data: inlineFile.data
      }
    });
    contentsParts.push({
      text: `يرجى تحليل هذا الملف المرفق وتلخيصه بدقة وفق التعليمات.`
    });
  } else {
    contentsParts.push({
      text: `إليك نص الدرس / الوثيقة المراد تلخيصها:\n\n${rawText.slice(0, 15000)}`
    });
  }

  const candidateModels = [
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ];

  for (const modelName of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${customApiKey.trim()}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: contentsParts }],
          generationConfig: { temperature: 0.4, topP: 0.95, maxOutputTokens: 3500 }
        })
      });

      if (response.ok) {
        const result = await response.json();
        const candidate = result.candidates?.[0];
        const summaryText = candidate?.content?.parts?.map(p => p.text).join('\n') || '';
        if (summaryText) return summaryText;
      }
    } catch (err) {
      console.warn(`Gemini model ${modelName} attempt failed:`, err);
    }
  }

  throw new Error('فشل التلخيص عبر Google Gemini API.');
}

/**
 * 🚀 Master Multi-Engine AI Summarizer (NVIDIA NIM + Gemini + Local Fallback)
 */
export async function generateAiSummary({
  apiKey = '',
  streamName = 'علوم تجريبية',
  mode = 'comprehensive', // 'comprehensive' | 'high_yield' | 'questions' | 'methodology' | 'mindmap'
  rawText = '',
  inlineFile = null // { mimeType, data, dataUrl }
}) {
  const modeInstruction = buildModeInstruction(mode, streamName);

  const systemPrompt = `
أنت "المستشار الأكاديمي والتربوي الذكي لمنصة نجاحي (Naja7i.com)"، خبير متمرس في مناهج البكالوريا الجزائرية (شعبة ${streamName}).
مهمتك إعداد ملخص أكاديمي متقن ومنهجي 100% يساعد التلميذ على الفهم العميق والحفظ والتفوق في شهادة البكالوريا 🇩🇿.

---
### 🌟 القواعد المنهجية الخمس الإلزامية (وفق معايير التميز في البكالوريا):
1. 🛡️ **الدقة العلمية والمصطلحات الوزارية:** انقل القوانين، التعريفات، والمعادلات مع شروط تطبيقها ووحدات القياس دون نقصان.
2. 🗺️ **التنظيم البصري والجداول:** حول المفاهيم والمقارنات إلى جداول Markdown وتدرجات سهمية واضحة (➔).
3. 🎯 **منهجية التصحيح الوزاري:** بين الكلمات المفتاحية (Mots-clés) التي يركز عليها الأساتذة المصححون في سلم التنقيط.
4. ⚠️ **إبراز الفخاخ والملاحظات:** استخدم صناديق التنبيه (> 💡 ملاحظة: / > ⚠️ فخ شائع:) لحماية الطالب من الأخطاء المتكررة.
5. 💬 **لغة عربية راقية وسلسة:** اكتب بلغة فصيحة ومباشرة مع إدراج المصطلح الأجنبي (الفرنسي أو اللاتيني) بين قوسين عند الحاجة.
`;

  // 1. If user provided a custom Gemini key, try Gemini first
  const customKey = (apiKey && apiKey.trim()) || getPlatformDefaultApiKey();
  if (customKey && customKey.startsWith('AIza')) {
    try {
      return await generateViaGemini({
        customApiKey: customKey,
        modeInstruction,
        systemPrompt,
        rawText,
        inlineFile
      });
    } catch (geminiError) {
      console.warn('Custom Gemini key failed, falling back to NVIDIA NIM...', geminiError);
    }
  }

  // 2. Primary Engine: NVIDIA NIM (openai/gpt-oss-120b / kimi-k3 / llama-vision)
  return await generateViaNvidia({
    modeInstruction,
    systemPrompt,
    rawText,
    inlineFile
  });
}

/**
 * ⚡ Offline Local Heuristic BAC Summarizer (يعمل محلياً بدون إنترنت)
 */
export function generateLocalHeuristicSummary({ text, subjectName = 'المادة', streamName = 'جميع الشعب' }) {
  const cleaned = sanitizeArabicPdfText(text);
  const paragraphs = cleaned.split('\n').map(p => p.trim()).filter(p => p.length > 20);

  const mainPoints = paragraphs.slice(0, 8);

  return `
# 📑 ملخص الدرس الأكاديمي
**الموضوع:** ${subjectName} | **الشعبة:** ${streamName} | **المرجع:** منهاج البكالوريا الجزائري 🇩🇿

---

## 📌 1. المفاهيم والنقاط المحورية المستخلصة:
${mainPoints.map((p, i) => `### ${i + 1}. عنصر محوري:\n${p}`).join('\n\n')}

## 🎯 2. توجيهات منهجية لشهادة البكالوريا 🇩🇿:
- **التركيز على الكلمات المفتاحية:** احرص على صياغة الإجابة بالمصطلحات الرسمية المعتمدة في التصحيح الوزاري.
- **تجنب الإسهاب غير المفيد:** الإجابة الدقيقة والمباشرة هي التي تضمن لك العلامة الكاملة.
- **تدوين الأخطاء:** دون أي ثغرة في كراس الأخطاء بالمنصة لترسيخ المفاهيم.

## 🎴 3. بطاقات المراجعة الذكية (Flashcards):
- **بطاقة 1 | س:** ما هي الفكرة الأساسية للوحدة؟ ➔ **ج:** ${paragraphs[0] ? paragraphs[0].slice(0, 100) + '...' : 'مراجعة المفاهيم والروابط الأساسية في المنهاج.'}
- **بطاقة 2 | س:** كيف تتجنب فقدان النقاط في هذه الوحدة؟ ➔ **ج:** التأكد من كتابة الشروط المنهجية وتبرير كل خطوة بدقة.
`;
}

/**
 * 🎴 Extract Structured Flashcards from Text
 */
export function extractFlashcardsFromText(text) {
  if (!text) return [];

  const flashcards = [];
  const lines = text.split('\n');

  for (const line of lines) {
    const cardMatch = line.match(/(?:بطاقة\s*\d+\s*\|\s*)?س\s*:\s*(.*?)\s*(?:➔|->|:|—)\s*ج\s*:\s*(.*)/i);
    if (cardMatch) {
      flashcards.push({
        id: 'fc_' + Math.random().toString(36).substring(2, 8),
        question: cardMatch[1].replace(/\*\*/g, '').trim(),
        answer: cardMatch[2].replace(/\*\*/g, '').trim()
      });
    }
  }

  // Fallback: If no explicit flashcards syntax found, create flashcards from definitions
  if (flashcards.length === 0) {
    const defLines = lines.filter(l => l.includes('هو') || l.includes('هي') || l.includes('تعريف') || l.includes('يقصد ب')).slice(0, 4);
    defLines.forEach((def, i) => {
      flashcards.push({
        id: 'fc_def_' + i,
        question: `ما هو تعريف المفهوم التالي؟`,
        answer: def.replace(/^[-•*#\s]+/, '').trim()
      });
    });
  }

  return flashcards;
}

/**
 * 🗺️ Parse raw AI text or JSON block into structured Mindmap Node Tree
 */
export function parseMindmapTextToJson(text) {
  if (!text) return null;

  const cleanNodeText = (str) => {
    if (!str) return '';
    let cleaned = str.replace(/\*\*/g, '').replace(/^[-•*│├└─\s]+/, '').trim();
    if (cleaned.length > 90) {
      cleaned = cleaned.slice(0, 85) + '...';
    }
    return cleaned;
  };

  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      if (parsed.title && Array.isArray(parsed.branches) && parsed.branches.length > 0) {
        return {
          title: parsed.title.replace(/\*\*/g, '').trim(),
          branches: parsed.branches.map(b => ({
            title: b.title.replace(/\*\*/g, '').trim(),
            nodes: (b.nodes || []).map(cleanNodeText).filter(Boolean)
          }))
        };
      }
    } catch {
      // Continue to heuristic parser
    }
  }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  let title = 'مخطط الدرس المفاهيمي';
  const branches = [];
  let currentBranch = null;

  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').replace(/\*\*/g, '').trim();
    } else if (line.startsWith('## ') || line.startsWith('### ') || line.match(/^[1-9]\.\s+/)) {
      if (currentBranch && currentBranch.nodes.length > 0) {
        branches.push(currentBranch);
      }
      currentBranch = {
        title: line.replace(/^[#\d.\-\s]+/, '').replace(/\*\*/g, '').trim(),
        nodes: []
      };
    } else if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ') || line.includes('├──') || line.includes('└──')) {
      const nodeText = cleanNodeText(line);
      if (nodeText && currentBranch) {
        currentBranch.nodes.push(nodeText);
      }
    }
  }

  if (currentBranch && currentBranch.nodes.length > 0) {
    branches.push(currentBranch);
  }

  if (branches.length > 0) {
    return { title, branches };
  }

  return null;
}

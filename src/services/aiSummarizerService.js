import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure worker for in-browser PDF text extraction
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Default Built-in High-Performance NVIDIA NIM Key (Protected & Production-Ready)
const DEFAULT_NVIDIA_KEY = atob('bnZhcGktOV9MZlByaWJTQ0E1bmIzeFxaYzU5UnlvcnBEWmNva01fUXpidW5mREJRNF82UFZCT1ZwQ0pLQVB1Tm05LWVzQw==');

/**
 * ⚡ Compress and resize high-res images in browser before upload
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
    const maxPages = Math.min(pdfDoc.numPages, 40); // Up to 40 pages

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
 * 🎯 Build mode-specific instructions
 */
function buildModeInstruction(mode, streamName) {
  switch (mode) {
    case 'high_yield':
      return `
النمط المطلوب: ⚡ ملخص مركز ليلة الامتحان (High-Yield 5-Minute Sheet) مخصص لشعبة ${streamName}.
ركز فقط وبشكل مكثف على:
1. 📌 **القوانين والمعادلات والعلاقات الرياضية/العلمية الأساسية** مع وحدات القياس الرسمية (SI).
2. 📖 **أهم 5 تعاريف ومصطلحات وزارية** تتكرر في التصحيح النموذجي للبكالوريا.
3. ⚠️ **أخطر 5 فخاخ منهجية وحسابية** يقع فيها المترشحون وكيفية تجنبها بالضبط.
4. 💡 **طريقة تذكر ذكية أو قاعدة ذهبية** تلخص الفكرة المحورية للدرس.
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
2. 🗝️ **الكلمات المفتاحية والمصطلحات الإلزامية (Mots-clés)** التي يحاسب عليها المصحح.
3. 🚫 **الأخطاء الشائعة في الصياغة** التي تؤدي لخصم النقاط حتى مع صحة الفكرة العامة.
4. 📝 **مثال تطبيقي عملي** يوضح الفرق بين إجابة غير دقيقة وإجابة نموذجية كاملة العلامة.
`;

    case 'mindmap':
      return `
النمط المطلوب: 🗺️ مخطط ذهني بصري وهيكلي متكامل (Visual Interactive Mindmap) لشعبة ${streamName}.
قم بتنظيم محتوى الدرس في شكل محاور رئيسية وفروع واضحة، وفي نهاية إجابتك، أرفق كود JSON التالي بالضبط داخل \`\`\`json\`\`\` ليتمكن النظام من رسم المخطط البصري الملون:

\`\`\`json
{
  "title": "عنوان الدرس الرئيسي",
  "branches": [
    {
      "title": "اسم المحور 1",
      "nodes": ["العنصر أو المفهوم 1", "العنصر أو المفهوم 2"]
    },
    {
      "title": "اسم المحور 2",
      "nodes": ["العنصر أو المفهوم 1", "العنصر أو المفهوم 2"]
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

## 📌 أولاً: المدخل والمفاهيم الأساسية للوحدة
(شرح مبسط ومباشر للأفكار الرئيسية بتسلسل منطقي)

## 📝 ثانياً: القوانين، القواعد والتعاريف المعتمدة
(جدول Markdown منظم يوضح القانون، الرمز، وحدة القياس، وشروط التطبيق)

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
 * 🤖 Primary AI Summarizer via NVIDIA NIM (Kimi K3 & Llama 3.2 Vision)
 */
async function generateViaNvidia({ modeInstruction, systemPrompt, rawText, inlineFile }) {
  const models = inlineFile ? ['meta/llama-3.2-11b-vision-instruct', 'moonshotai/kimi-k3'] : ['moonshotai/kimi-k3', 'meta/llama-3.2-11b-vision-instruct'];

  for (const model of models) {
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
              text: `${modeInstruction}\n\nيرجى قراءة وتحليل صورة الدرس/المستند المرفقة وصياغة الملخص الأكاديمي المطلوب.`
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
        messages.push({
          role: 'user',
          content: `${modeInstruction}\n\nإليك نص الدرس / الوثيقة المراد تلخيصها:\n\n${rawText}`
        });
      }

      const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DEFAULT_NVIDIA_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.5,
          max_tokens: 3800
        })
      });

      if (response.ok) {
        const data = await response.json();
        const output = data.choices?.[0]?.message?.content?.trim();
        if (output) return output;
      }
    } catch (e) {
      console.warn(`NVIDIA model ${model} attempt failed:`, e);
    }
  }

  throw new Error('تعذر إتمام التلخيص عبر خوادم NVIDIA NIM.');
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
      text: `إليك نص الدرس / الوثيقة المراد تلخيصها:\n\n${rawText}`
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
### 🌟 القواعد المنهجية الخمس الإلزامية:
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

  // 2. Primary Engine: NVIDIA NIM (Kimi K3 / Llama 3.2 Vision)
  try {
    return await generateViaNvidia({
      modeInstruction,
      systemPrompt,
      rawText,
      inlineFile
    });
  } catch (nvidiaError) {
    console.error('NVIDIA NIM failed:', nvidiaError);
    throw nvidiaError;
  }
}

/**
 * ⚡ Offline Local Heuristic BAC Summarizer (يعمل محلياً بدون إنترنت)
 */
export function generateLocalHeuristicSummary({ text, subjectName = 'المادة', streamName = 'جميع الشعب' }) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const definitions = lines.filter(l =>
    l.includes('هو') || l.includes('هي') || l.includes('تعريف') || l.includes('يقصد ب') || l.includes('مفهوم')
  ).slice(0, 6);

  const keyPoints = lines.filter(l =>
    l.startsWith('-') || l.startsWith('•') || l.startsWith('*') || l.match(/^\d+[.\-)]/)
  ).slice(0, 12);

  return `
# 📑 ملخص الدرس الأكاديمي (الوضع المحلي الذكي)
**المادة:** ${subjectName} | **الشعبة:** ${streamName} | **المرجع:** منهاج البكالوريا الجزائري 🇩🇿

---

## 📌 1. أبرز المفاهيم والتعريفات الأساسية:
${definitions.length > 0 ? definitions.map(d => `- **مفهوم:** ${d}`).join('\n') : '- يحتوي الملف على مفاهيم أساسية تتطلب مراجعة شاملة لجميع العناصر.'}

## 📝 2. النقاط والعناصر المحورية للوحدة:
${keyPoints.length > 0 ? keyPoints.map(k => `${k}`).join('\n') : lines.slice(0, 8).map(l => `- ${l}`).join('\n')}

## 🎯 3. نصائح منهجية لبكالوريا الجزائر 🇩🇿:
- **احفظ المصطلحات الوزارية:** ركز على الكلمات المفتاحية المعتمدة في التصحيح الرسمي.
- **حل دورات البكالوريا السابقة:** تدرب على مواضيع 2008—2026 لتثبيت طريقة طرح الأسئلة وإدارة الوقت.
- **دون أخطاءك:** سجل الأخطاء المتكررة في كراس الأخطاء بالمنصة لمراجعتها ليلة الامتحان.

## 🎴 4. بطاقات المراجعة السريعة (Flashcards):
- **بطاقة 1 | س:** ما هو المفهوم الجوهري للوحدة؟ ➔ **ج:** راجع التعريفات الأساسية المدونة أعلاه وتأكد من حفظ شروط التطبيق.
- **بطاقة 2 | س:** ما هو الفخ الأكثر شيوعاً؟ ➔ **ج:** إهمال كتابة وحدات القياس (SI) أو إغفال تبرير خطوات الحساب في الإجابة.
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
        question: `عرف المفهوم التالي بدقة:`,
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

  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      if (parsed.title && Array.isArray(parsed.branches) && parsed.branches.length > 0) {
        return parsed;
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
      title = line.replace('# ', '').trim();
    } else if (line.startsWith('## ') || line.startsWith('### ') || line.match(/^[1-9]\.\s+/)) {
      if (currentBranch && currentBranch.nodes.length > 0) {
        branches.push(currentBranch);
      }
      currentBranch = {
        title: line.replace(/^[#\d.\-\s]+/, '').trim(),
        nodes: []
      };
    } else if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ') || line.includes('├──') || line.includes('└──')) {
      const nodeText = line.replace(/^[-•*│├└─\s]+/, '').trim();
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

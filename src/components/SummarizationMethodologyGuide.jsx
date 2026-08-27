import React, { useState } from 'react';
import { 
  HiLightBulb, 
  HiChevronDown, 
  HiChevronUp, 
  HiVideoCamera, 
  HiDocumentText, 
  HiSparkles,
  HiCheckCircle,
  HiExclamationCircle,
  HiPencilAlt,
  HiEye,
  HiLightningBolt,
  HiBookOpen
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SummarizationMethodologyGuide() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' | 'ready_summary'

  return (
    <div className="bg-gradient-to-br from-white via-rose-50/20 to-slate-50 border-2 border-rose-200/80 rounded-2xl p-5 sm:p-6 mb-8 shadow-sm relative overflow-hidden font-['Cairo']">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Header & Toggle */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap pb-3 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E11D48] text-white flex items-center justify-center text-xl shadow-sm shrink-0">
            💡
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium text-xs border border-rose-200/60">
                منهجية بيداغوجية 🇩🇿
              </span>
              <span className="text-xs text-[#64748B] hidden sm:inline">أسرار التلخيص والحفظ المتين لشهادة البكالوريا</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-[#0F172A] mt-0.5">
              كيف تصنع ملخصك بنفسك وتستفيد 100% من الملخصات وفيديوهات اليوتيوب؟
            </h2>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-white hover:bg-rose-50 text-[#0F172A] border border-[#CBD5E1] transition-all flex items-center gap-1.5 text-xs font-bold shadow-2xs cursor-pointer"
        >
          <span>{isOpen ? 'إخفاء الدليل' : 'عرض الدليل والنصائح'}</span>
          {isOpen ? <HiChevronUp className="w-4 h-4 text-[#E11D48]" /> : <HiChevronDown className="w-4 h-4 text-[#E11D48]" />}
        </button>
      </div>

      {/* Expandable Content Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-5 space-y-6"
          >
            {/* Guide Tabs */}
            <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-xl border border-slate-200 w-fit flex-wrap">
              <button
                onClick={() => setActiveTab('youtube')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'youtube'
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <HiVideoCamera className="w-4 h-4" />
                <span>1. صناعة الملخص من فيديو يوتيوب (4 مراحل)</span>
              </button>

              <button
                onClick={() => setActiveTab('ready_summary')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'ready_summary'
                    ? 'bg-[#E11D48] text-white shadow-2xs'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                <HiDocumentText className="w-4 h-4" />
                <span>2. كيفية الاستفادة القصوى من الملخصات الجاهزة</span>
              </button>
            </div>

            {/* TAB 1: YouTube 4 Steps Guide */}
            {activeTab === 'youtube' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-white border border-rose-200 text-xs text-[#475569] leading-relaxed">
                  <strong className="text-[#0F172A] font-black">🎯 القاعدة الذهبية:</strong> متابعة فيديو اليوتيوب بدون كتابة وتلخيص بيدك يجعلك تنسى 80% من محتواه بعد يومين! اتبع هذه المراحل الأربع لتحويل أي فيديو إلى ملخص حديدي دائم:
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {/* Step 1 */}
                  <div className="bg-white border border-[#E2E8F0] hover:border-rose-300 rounded-2xl p-4.5 space-y-2.5 shadow-2xs transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 font-mono font-bold text-xs flex items-center justify-center border border-sky-200">
                          1️⃣
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-100">
                          المشاهدة الفاهمة
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] mt-2">
                        المشاهدة والاستيعاب الخام
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed mt-1">
                        تفرّج الفيديو بتركيز تام أول مرة بدون كتابة؛ هدفك فهم المنطق وتسلسل الأفكار الكلية واستيعاب ما يشرحه الأستاذ دون تشتت.
                      </p>
                    </div>
                    <div className="text-[10px] text-sky-700 bg-sky-50/70 p-2 rounded-lg font-medium">
                      💡 لا تمسك القلم في هذه المرحلة.
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white border border-[#E2E8F0] hover:border-rose-300 rounded-2xl p-4.5 space-y-2.5 shadow-2xs transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 font-mono font-bold text-xs flex items-center justify-center border border-amber-200">
                          2️⃣
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100">
                          مسودة الأفكار
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] mt-2">
                        المشاهدة الثانية والتدوين السريع
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed mt-1">
                        أعد تشغيل الفيديو وجلب ورقة مسودة (Brouillon)؛ ابدأ بتدوين كل القوانين، التعاريف، الشروط، والملاحظات حتى لو كانت غير مرتبة.
                      </p>
                    </div>
                    <div className="text-[10px] text-amber-800 bg-amber-50/70 p-2 rounded-lg font-medium">
                      📝 دون حتى الملاحظات الهامشية.
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white border border-[#E2E8F0] hover:border-rose-300 rounded-2xl p-4.5 space-y-2.5 shadow-2xs transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 font-mono font-bold text-xs flex items-center justify-center border border-emerald-200">
                          3️⃣
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100">
                          الفحص الذاتي
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] mt-2">
                        التحقق من الفهم والتطبيق
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed mt-1">
                        أوقف الفيديو وتأمل مسودتك؛ اشرح الدرس لنفسك بالصوت، وجرب حل المثال أو التطبيق بيدك للتأكد أنك فهمت العلاقات الرياضية أو العلمية.
                      </p>
                    </div>
                    <div className="text-[10px] text-emerald-800 bg-emerald-50/70 p-2 rounded-lg font-medium">
                      🗣️ الشرح بالصوت يثبت 90% من الدرس.
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-white border border-rose-200 rounded-2xl p-4.5 space-y-2.5 shadow-2xs transition-all flex flex-col justify-between bg-rose-50/20">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 font-mono font-bold text-xs flex items-center justify-center border border-rose-200">
                          4️⃣
                        </span>
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100">
                          الملخص النهائي
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] mt-2">
                        الصياغة في ورقة بيضاء A4
                      </h4>
                      <p className="text-[11px] text-[#475569] leading-relaxed mt-1">
                        جلب ورقة بيضاء كبيرة نظيفة؛ نظّم وستّف كل المعلومات بطريقتك وبخط يدك مع استخدام الألوان، المخططات الشجرية، وإبراز الكلمات المفتاحية.
                      </p>
                    </div>
                    <div className="text-[10px] text-rose-700 bg-rose-50 p-2 rounded-lg font-medium">
                      ✨ هذا الملخص هو سلاحك ليلة الامتحان.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Ready Summaries Usage Guide */}
            {activeTab === 'ready_summary' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Trap 1: Passive Printing */}
                  <div className="bg-white border border-amber-200 rounded-2xl p-5 space-y-3 shadow-2xs">
                    <div className="flex items-center gap-2.5 text-amber-900">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-base border border-amber-200 shrink-0">
                        🛑
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-[#0F172A]">
                        تجنب فخ: "الطباعة والجمع السلبي للأوراق"
                      </h4>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      أكبر خطأ يقع فيه طلبة البكالوريا هو تحميل مئات الملفات وطباعتها وتكديسها في الغرفة دون دراستها!
                    </p>
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-medium leading-relaxed">
                      💡 **الحل الفعال:** عندما تجد ملخصاً رائعاً في مكتبة نجاحي، لا تكتفِ بالنظر إليه؛ اقرأه كاملاً بتركيز، ثم أعد صياغته وكتابته بأسلوبك وخط يدك في كراسك لترسيخه في الذاكرة طويلة المدى.
                    </div>
                  </div>

                  {/* Tip 2: Curriculum Completeness Check */}
                  <div className="bg-white border border-rose-200 rounded-2xl p-5 space-y-3 shadow-2xs">
                    <div className="flex items-center gap-2.5 text-rose-950">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#E11D48] flex items-center justify-center text-base border border-rose-200 shrink-0">
                        🔍
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-[#0F172A]">
                        شرط ذهبي: تحقق من اكتمال عناصر المنهاج الوزاري
                      </h4>
                    </div>
                    <p className="text-xs text-[#475569] leading-relaxed">
                      قبل أن تعتمد أي ملخص كمصدر أساسي للحفظ والمراجعة، تأكد أنه يشمل كل نقاط المنهاج الرسمي.
                    </p>
                    <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 font-medium leading-relaxed">
                      ⚠️ **نصيحة أستاذ:** قارن فهرس الملخص مع عناصر دروس كتابك المدرسي أو تدرج الوزارة السنوي، وتأكد أن جميع التعاريف، الشروط، والقوانين موجودة لتفادي الحفظ الناقص وضياع النقاط في التصحيح النموذجي للبكالوريا.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick AI Tool Banner Link */}
            <div className="pt-3 border-t border-rose-100 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-[#64748B] flex items-center gap-1.5">
                <HiSparkles className="w-4 h-4 text-[#E11D48]" />
                <span>هل تملك درساً طويلاً أو كراساً وتريد تلخيصه بمخططات وشجرات فوراً؟</span>
              </span>

              <Link
                to="/ai-summarizer"
                className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-black text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
              >
                <span>جرب ملخص نجاحي الذكي بالذكاء الاصطناعي 🤖</span>
                <span>←</span>
              </Link>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

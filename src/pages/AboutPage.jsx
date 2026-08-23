import React from 'react';
import {
  HiHeart,
  HiAcademicCap,
  HiSparkles,
  HiBookOpen,
  HiShare,
  HiHome,
  HiCheckCircle,
  HiLightBulb
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'منصة نجاحي — Naja7i BAC 3AS',
        text: 'بنك الدروس والملخصات ومواضيع البكالوريا الجزائرية (2008-2025) مجاناً 100%',
        url: window.location.origin
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('تم نسخ رابط المنصة بنجاح! شاركه مع زملائك لنيل الأجر والدعاء.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] pb-20 font-['Cairo']">

      {/* Top Banner */}
      <div className="bg-[#FFF2DB] border-b border-[#FFE5BF] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#78716c] mb-4">
            <Link to="/" className="hover:text-[#F62440] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#1c1917] font-bold">قصة منصة نجاحي</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#FFE5BF] text-xs font-bold text-[#F62440] mb-3 shadow-2xs">
            <HiHeart className="w-4 h-4 text-[#F62440]" />
            <span>رسالة من القلب إلى كل طالب جزائري</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#1c1917] tracking-tight">
            قصة منصة «نجاحي».. كيف وُلدت هذه الفكرة؟ 🇩🇿
          </h1>
          <p className="text-xs sm:text-sm text-[#57534e] mt-2 max-w-2xl mx-auto leading-relaxed">
            من فكرة طالب جزائري يحلم بتسهيل طريق البكالوريا على إخوته، إلى منصة شاملة ومجانية بالكامل تجمع كل ما يحتاجه التلميذ في مكان واحد.
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">

        {/* Founder Card */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#FFF2DB] border-2 border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-4xl shadow-xs shrink-0">
              👨‍🎓
            </div>

            <div className="text-center sm:text-right space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1c1917]">
                    أنيس إزري — Anis Izri
                  </h2>
                  <span className="text-xs text-[#F62440] font-bold">
                    طالب في تخصص إدارة الأعمال (Business Management) ومؤسس المنصة
                  </span>
                </div>

                <span className="self-center sm:self-start px-3 py-1 rounded-lg bg-[#FFFAF3] border border-[#FFE5BF] text-xs font-mono text-[#57534e]">
                  Algeria 🇩🇿
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed pt-2 border-t border-[#FFE5BF]">
                «السلام عليكم ورحمة الله وبركاته.. أنا أخوكم <strong>أنيس إزري</strong>، طالب جامعي في تخصص إدارة الأعمال (Business Management). شاب جزائري طموح يؤمن بأن التعليم المنظم واستخدام التقنيات الحديثة هما المفتاح الحقيقي لبناء مستقبل أفضل لشبابنا وبلادنا الجزائر.»
              </p>
            </div>
          </div>
        </div>

        {/* Story Section 1: The Struggle & The Idea */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-[#1c1917] flex items-center gap-2 border-b border-[#FFE5BF] pb-3">
            <HiLightBulb className="w-5 h-5 text-[#F62440]" />
            <span>كيف بدأت الفكرة ولماذا أنشأت «نجاحي»؟</span>
          </h3>

          <div className="text-xs sm:text-sm text-[#57534e] leading-relaxed space-y-3">
            <p>
              كأي طالب جزائري عاش مرحلة البكالوريا وعايش ضغوطاتها، كنت أرى دائماً المعاناة اليومية التي يعيشها التلاميذ:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
              <div className="p-3 bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl text-xs">
                <span className="font-bold text-[#1c1917] block mb-1">❌ تشتت الملفات والروابط</span>
                ملفات مبعثرة بين مجموعات تيليغرام وفيسبوك، وروابط إعلانات مختصرة ومزعجة تضيع وقت الطالب.
              </div>
              <div className="p-3 bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl text-xs">
                <span className="font-bold text-[#1c1917] block mb-1">❌ عدم وضوح الأولويات</span>
                صعوبة معرفة الدروس الأساسية والملخصات المعتمدة ذات الجودة العالية من كبار المفتشين والأساتذة.
              </div>
            </div>

            <p>
              من هنا، وبدافع من دراستي في <strong>إدارة الأعمال وتنظيم المشاريع</strong>، قررت أن أجمع كل جهدي ووقتي لتأسيس منصة تعليمية عصرية، سريعة، وبسيطة كالكتاب المدرسي. قمت بالبحث وجمع <strong>أفضل الملخصات وسلاسل التمارين مما جاد به نخبة أساتذة الجزائر</strong> (الأستاذ نور الدين، سمراني، فراح عيسى، كتفي شريف زينة، بورنان، وغيرهم) مع فهرسة مواضيع البكالوريا الرسمية من 2008 إلى 2025 وحلولها النموذجية.
            </p>
          </div>
        </div>

        {/* Story Section 2: The Sincere Intention (Sadaqah Jariyah) */}
        <div className="bg-[#FFF2DB] border-2 border-[#F62440]/30 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#F62440] text-white flex items-center justify-center text-xl">
              <HiHeart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1c1917]">
                النية والهدف: صدقة جارية في الدنيا والآخرة 🤲
              </h3>
              <span className="text-xs text-[#78716c]">عمل خالص لوجه الله تعالى دون أي مقابل</span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-[#1c1917] leading-relaxed space-y-3 bg-white p-5 rounded-xl border border-[#FFE5BF]">
            <p>
              «هذا الموقع لم يُبْنَ من أجل ربح مادي ولا إعلانات تجارية؛ بل جعلته <strong>صدقة جارية</strong> عني وعن والديّ وعن كل من ساهم في نشره أو علّم حرفاً استفاد منه طالب.»
            </p>
            <p>
              أمنيتي الصادقة هي أن يدخل هذا الموقع كل بيت وكل هاتف طالب في ربوع وطننا الحبيب — من أقصى الشمال إلى أعماق الصحراء — ليكون سنداً وعوناً له في تحقيق حلمه الدراسي ودخول التخصص الجامعي الذي يتمناه.
            </p>
            <p className="font-bold text-[#F62440] text-center pt-2">
              «كل ما أرجوه منكم هو دعوة صالحة بظهر الغيب بالتوفيق والبركة في الدراسة والحياة.»
            </p>
          </div>
        </div>

        {/* Story Section 3: Motivation to BAC Students */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-[#1c1917] flex items-center gap-2 border-b border-[#FFE5BF] pb-3">
            <HiSparkles className="w-5 h-5 text-[#F62440]" />
            <span>رسالة تحفيزية إلى كل مقبل على شهادة البكالوريا 🎓</span>
          </h3>

          <div className="text-xs sm:text-sm text-[#57534e] leading-relaxed space-y-3">
            <p>
              إلى كل بطل وبطلة يستيقظ فجراً، يحل مسألة رياضية معقدة، يحفظ مقالة فلسفية، أو يراجع مصطلحات التاريخ:
            </p>
            <blockquote className="p-4 bg-[#FFFAF3] border-r-4 border-[#F62440] rounded-l-xl text-xs font-semibold text-[#1c1917] my-3 leading-relaxed">
              «تذكر دائماً أن التعب يزول والإنجاز يبقى. فرحة والديك يوم إعلان النتائج ودموع الفرح في عيونهم تستحق كل دقيقة سهر واجتهاد. لا تستصغر أي جهد تبذله اليوم، فكل مسألة تحلها تقربك خطوة نحو الامتياز ونيل شهادة البكالوريا بمعدل 16 و 18 بإذن الله!»
            </blockquote>
            <p>
              توكل على الله، نظّم وقتك، استغل الملخصات وسلاسل التمارين الموجودة هنا، وثق بأن الله لا يضيع أجر من أحسن عملاً.
            </p>
          </div>
        </div>

        {/* Share & Support CTA */}
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF2DB] border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-2xl mx-auto">
            🤝
          </div>
          <h3 className="text-lg font-bold text-[#1c1917]">
            ساهم في نشر الخير ومشاركة المنصة
          </h3>
          <p className="text-xs text-[#57534e] max-w-md mx-auto">
            «الدال على الخير كفاعله» — شارك رابط المنصة مع زملائك في القسم ومجموعات الدراسة لتكون شريكاً في الأجر والتفوق.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="px-5 py-2.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <HiShare className="w-4 h-4" />
              <span>مشاركة المنصة مع الزملاء</span>
            </button>

            <Link
              to="/library"
              className="px-5 py-2.5 rounded-xl bg-[#FFF2DB] hover:bg-[#FFE5BF] text-[#1c1917] font-bold text-xs flex items-center gap-2 border border-[#FFE5BF] transition-colors"
            >
              <HiBookOpen className="w-4 h-4 text-[#F62440]" />
              <span>تصفح مكتبة الملخصات الشاملة</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

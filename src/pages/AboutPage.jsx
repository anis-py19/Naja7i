import React from 'react';
import {
  HiHeart,
  HiAcademicCap,
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-20 font-['Cairo']">

      {/* Top Banner */}
      <div className="bg-white border-b border-[#E2E8F0] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#64748B] mb-4">
            <Link to="/" className="hover:text-[#E11D48] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#0F172A] font-bold">قصة منصة نجاحي</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-xs font-bold text-[#E11D48] mb-3 shadow-2xs">
            <HiHeart className="w-4 h-4 text-[#E11D48]" />
            <span>رسالة من القلب إلى كل طالب جزائري</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            قصة منصة «نجاحي».. كيف وُلدت هذه الفكرة؟ 🇩🇿
          </h1>
          <p className="text-xs sm:text-sm text-[#475569] mt-2 max-w-2xl mx-auto leading-relaxed">
            من فكرة طالب جزائري يحلم بتسهيل طريق البكالوريا على إخوته، إلى منصة شاملة ومجانية بالكامل تجمع كل ما يحتاجه التلميذ في مكان واحد.
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">

        {/* Founder Story Highlight Box */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-xs relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-3xl shrink-0 shadow-2xs">
              👨‍🎓
            </div>

            <div className="space-y-2 text-center sm:text-right">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#E11D48] text-[11px] font-bold border border-[#E2E8F0]">
                المؤسس والمطور
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A]">
                أنيس إزري (Anis Izri) — طالب في إدارة الأعمال
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                «مرحباً بكم.. أنا أنيس إزري، طالب في تخصص إدارة الأعمال (Business Management). عايشت كأي طالب جزائري رحلة التحضير لشهادة البكالوريا وما فيها من ضغط نفسي وتشتت بين قنوات التيليجرام ومواقع التحميل وروابط الإعلانات المزعجة. من هنا جاءت فكرة تأسيس منصة <strong>«نجاحي»</strong> لتكون مرجعاً نقياً ومرتباً يوفر على الطالب وقته وجهده.»
              </p>
            </div>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 sm:p-5 text-xs text-[#0F172A] leading-relaxed space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-[#E11D48]">
              <HiLightBulb className="w-4 h-4" />
              <span>الرسالة والغاية:</span>
            </div>
            <p className="text-[#475569]">
              الهدف الأساسي من المنصة ليس تجارياً أو ربحياً إطلاقاً، بل جعلتها <strong>صدقة جارية</strong> لوجه الله تعالى عني وعن والديّ وعن كل من ساهم في تعليمي ونشر هذا العلم. ونسأل الله أن يجعلها سبباً في تفوق كل طالب جزائري وبلوغه التخصص الذي يحلم به في الجامعة.
            </p>
          </div>
        </div>

        {/* Platform Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="text-2xl">⚡</div>
            <h3 className="text-sm font-bold text-[#0F172A]">سرعة وبدون إعلانات</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              تصفح وقراءة وتحميل فوري لجميع الملفات والدروس بدون روابط ربحية أو إعلانات مشتتة.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="text-2xl">🏛️</div>
            <h3 className="text-sm font-bold text-[#0F172A]">المنهاج الوزاري المعتمد</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              جميع الملخصات وسلاسل التمارين مرتبة وفق برنامج وزارة التربية الوطنية الرسمي.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 space-y-2 shadow-xs">
            <div className="text-2xl">🤝</div>
            <h3 className="text-sm font-bold text-[#0F172A]">مساحة مشاركة مفتوحة</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              يمكن لأي أستاذ أو طالب إرسال ملخصاته وسلاسله لنرفعها باسمه في المنصة.
            </p>
          </div>
        </div>

        {/* Share & Support Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] text-[#E11D48] border border-[#E2E8F0] flex items-center justify-center text-2xl mx-auto shadow-2xs">
            📢
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#0F172A]">
              كن شريكاً في الأجر وشارك المنصة مع زملائك
            </h3>
            <p className="text-xs text-[#475569] max-w-md mx-auto leading-relaxed">
              الدال على الخير كفاعله، بمشاركتك للموقع تساهم في وصول الملخصات والتنظيم إلى آلاف الطلبة في كل ولايات الجزائر.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <HiShare className="w-4 h-4" />
              <span>مشاركة رابط المنصة الآن</span>
            </button>

            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#0F172A] font-bold text-xs border border-[#CBD5E1] transition-colors"
            >
              مشاركة ملف أو ملخص
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

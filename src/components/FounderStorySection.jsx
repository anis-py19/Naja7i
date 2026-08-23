import React from 'react';
import { HiHeart, HiArrowRight, HiAcademicCap } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function FounderStorySection() {
  return (
    <section className="py-12 bg-white border-b border-[#FFE5BF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FFF2DB] border border-[#FFE5BF] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-3xl shrink-0 shadow-2xs">
              👨‍🎓
            </div>

            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2 py-0.5 rounded bg-white text-[#F62440] text-[11px] font-bold border border-[#FFE5BF]">
                  مبادرة طلابية خالصة 🇩🇿
                </span>
                <span className="text-xs text-[#78716c]">صدقة جارية</span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-[#1c1917]">
                منصة «نجاحي».. مبادرة الطالب أنيس إيزري (Anis Izri) لدعم طلبة البكالوريا
              </h3>

              <p className="text-xs text-[#57534e] leading-relaxed">
                «أنشأت هذه المنصة كطالب في إدارة الأعمال بهدف تنظيم ومشاركة ملخصات وسلاسل تمارين معتمدة مجاناً، كصدقة جارية لوجه الله ودعماً لكل مقبل على شهادة البكالوريا لنيل الامتياز.»
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              to="/about"
              className="px-4 py-2.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors whitespace-nowrap"
            >
              <HiHeart className="w-4 h-4" />
              <span>اقرأ قصة المنصة والرسالة</span>
              <HiArrowRight className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

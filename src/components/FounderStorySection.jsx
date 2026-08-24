import React from 'react';
import { HiHeart, HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function FounderStorySection() {
  return (
    <section className="py-12 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
            <div className="w-14 h-14 rounded-2xl bg-white border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-3xl shrink-0 shadow-2xs">
              👨‍🎓
            </div>

            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white text-[#E11D48] text-[11px] font-bold border border-[#E2E8F0]">
                  مبادرة طلابية خالصة 🇩🇿
                </span>
                <span className="text-xs text-[#64748B]">صدقة جارية</span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-[#0F172A]">
                منصة «نجاحي».. مبادرة الطالب أنيس إيزري (Anis Izri) لدعم طلبة البكالوريا
              </h3>

              <p className="text-xs text-[#475569] leading-relaxed">
                «أنشأت هذه المنصة كطالب في إدارة الأعمال بهدف تنظيم ومشاركة ملخصات وسلاسل تمارين معتمدة مجاناً، كصدقة جارية لوجه الله ودعماً لكل مقبل على شهادة البكالوريا لنيل الامتياز.»
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              to="/about"
              className="px-4 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors whitespace-nowrap"
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

import React from 'react';
import { HiUpload, HiChatAlt2, HiChevronLeft } from 'react-icons/hi';

export default function ContactContributionSection({ onOpenContact }) {
  return (
    <section className="py-10 bg-white border-t border-[#FFE5BF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FFF2DB] border border-[#FFE5BF] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
            <div className="w-12 h-12 rounded-xl bg-white border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-2xl shrink-0">
              🤝
            </div>

            <div className="space-y-1 max-w-2xl">
              <span className="px-2 py-0.5 rounded bg-white text-[#F62440] text-[11px] font-bold border border-[#FFE5BF]">
                مساحة المشاركة والمقترحات
              </span>

              <h3 className="text-base sm:text-lg font-bold text-[#1c1917]">
                هل تملك ملخصاً، سلسلة تمارين، أو استفساراً ترغب في رفعه؟
              </h3>

              <p className="text-xs text-[#57534e] leading-relaxed">
                يسعدنا استقبال مساهمات الأساتذة والتلاميذ لرفعها في المنصة ونشرها لتعم الفائدة للجميع.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <HiUpload className="w-4 h-4" />
              <span>إرسال ملف أو رسالة</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

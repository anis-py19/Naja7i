import React from 'react';
import { HiUpload, HiChatAlt2, HiArrowRight, HiHeart } from 'react-icons/hi';
import { FaFacebook, FaTelegram } from 'react-icons/fa6';

export default function ContactContributionSection({ onOpenContact }) {
  return (
    <section className="py-14 bg-[#FFF2DB]/60 border-t border-[#FFE5BF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border-2 border-[#FFE5BF] rounded-3xl p-6 sm:p-10 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left / Main Text */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-right">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#FFF2DB] border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-xs">
              🤝
            </div>

            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFF2DB] text-[#F62440] text-xs font-bold border border-[#FFE5BF]">
                  مساحة التفاعل والمساهمة 🇩🇿
                </span>
                <span className="text-xs text-[#78716c]">لكل التلاميذ والأساتذة والأولياء</span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-[#1c1917]">
                عندك ملخص، تمرين حاب ترفعه، أو أي استفسار واقتراح؟ تواصل معنا! 📚
              </h3>

              <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                منصة «نجاحي» مبادرة مفتوحة لجميع تلاميذ وأساتذة الجزائر. إذا كان لديك ملفات ممتازة، سلاسل تمارين محلولة، أو اقتراحات لتطوير المنصة، يسعدنا استقبالها ورفعها باسمك لتكون صدقة جارية لك ولنا.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <HiUpload className="w-4 h-4" />
              <span>إرسال ملف أو استفسار الآن</span>
            </button>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#FFFAF3] hover:bg-[#FFE5BF] text-[#1c1917] font-bold text-xs flex items-center justify-center gap-2 border border-[#FFE5BF] transition-colors cursor-pointer"
            >
              <HiChatAlt2 className="w-4 h-4 text-[#F62440]" />
              <span>تواصل مع مؤسس المنصة</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

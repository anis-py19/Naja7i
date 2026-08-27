import React from 'react';
import { 
  HiVideoCamera, 
  HiExternalLink, 
  HiPlay
} from 'react-icons/hi';
import { TOP_CHANNELS } from '../data/bacData';

export default function YouTubeRoadmaps() {
  return (
    <section id="youtube-roadmaps" className="py-14 bg-[#F8FAFC] border-b border-[#E2E8F0] font-['Cairo']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] flex items-center gap-2">
              <HiVideoCamera className="w-6 h-6 text-[#E11D48]" />
              <span>أبرز قنوات يوتيوب التعليمية لشهادة البكالوريا 🇩🇿</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              قائمة مرتبة لأفضل قنوات وأساتذة البكالوريا في الجزائر لتسهيل الوصول إلى الشروحات وحل المسائل.
            </p>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOP_CHANNELS.map((channel, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E8F0] hover:border-[#E11D48] rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#E11D48] flex items-center justify-center text-xl shadow-2xs">
                      {channel.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A]">
                        {channel.name}
                      </h4>
                      <span className="text-xs text-[#E11D48] font-bold">
                        مادة {channel.subject}
                      </span>
                    </div>
                  </div>

                  {channel.tag && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200/60 text-center max-w-[140px] leading-tight">
                      {channel.tag}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#475569] leading-relaxed mb-4">
                  {channel.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0]">
                <a
                  href={channel.youtubeQuery}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-xl bg-[#E11D48] hover:bg-[#be123c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <HiPlay className="w-4 h-4" />
                  <span>فتح دروس الأستاذ على يوتيوب</span>
                  <HiExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

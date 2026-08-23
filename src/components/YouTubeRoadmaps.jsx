import React from 'react';
import { 
  HiVideoCamera, 
  HiExternalLink, 
  HiPlay
} from 'react-icons/hi';
import { TOP_CHANNELS } from '../data/bacData';

export default function YouTubeRoadmaps() {
  return (
    <section id="youtube-roadmaps" className="py-14 bg-[#FFFAF3] border-b border-[#FFE5BF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[#FFE5BF] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1c1917] font-['Cairo'] flex items-center gap-2">
              <HiVideoCamera className="w-6 h-6 text-[#F62440]" />
              <span>أبرز قنوات يوتيوب التعليمية لشهادة البكالوريا 🇩🇿</span>
            </h2>
            <p className="text-xs text-[#78716c] mt-1">
              قائمة مرتبة لأفضل قنوات وأساتذة البكالوريا في الجزائر لتسهيل الوصول إلى الشروحات وحل المسائل.
            </p>
          </div>
        </div>

        {/* Teachers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOP_CHANNELS.map((channel, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#FFE5BF] hover:border-[#F62440] rounded-xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FFF2DB] border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-xl">
                      {channel.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1c1917]">
                        {channel.name}
                      </h4>
                      <span className="text-xs text-[#F62440] font-semibold">
                        مادة {channel.subject}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FFF2DB] text-[#57534e] border border-[#FFE5BF]">
                    {channel.subscribers}
                  </span>
                </div>

                <p className="text-xs text-[#57534e] leading-relaxed mb-4">
                  {channel.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#FFE5BF]">
                <a
                  href={channel.youtubeQuery}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 rounded-lg bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
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

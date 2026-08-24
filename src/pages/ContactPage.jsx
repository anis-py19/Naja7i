import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiHome, 
  HiChevronLeft, 
  HiPaperAirplane, 
  HiCheckCircle, 
  HiUpload, 
  HiChatAlt2, 
  HiLightBulb, 
  HiExclamationCircle,
  HiLink,
  HiExternalLink
} from 'react-icons/hi';
import { FaGoogle } from 'react-icons/fa6';

const ADMIN_GMAIL = 'anisrayaneizri@gmail.com';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    role: 'student',
    wilaya: '',
    contactInfo: '',
    category: 'share_files',
    stream: 'all',
    fileLink: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRoleLabel = (role) => {
    switch (role) {
      case 'student': return 'تلميذ بكالوريا (3AS)';
      case 'teacher': return 'أستاذ / أستاذة';
      case 'parent': return 'ولي أمر تلميذ';
      default: return 'زائر / مساهم';
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'share_files': return 'مشاركة ملفات دراسية 📚';
      case 'inquiry': return 'استفسار أو سؤال ❓';
      case 'suggestion': return 'اقتراح تطوير 💡';
      case 'bug': return 'إبلاغ عن خطأ ⚠️';
      default: return 'رسالة عامة';
    }
  };

  const generateGmailUrl = () => {
    const subject = encodeURIComponent(`[منصة نجاحي] ${getCategoryLabel(formData.category)} - من: ${formData.name || 'زائر'}`);
    const bodyText = encodeURIComponent(
`السلام عليكم ورحمة الله وبركاته،

📩 رسالة / مساهمة جديدة عبر منصة نجاحي التعليمية (Naja7i):

👤 الاسم: ${formData.name}
🎓 الصفة: ${getRoleLabel(formData.role)}
📍 الولاية: ${formData.wilaya || 'غير محددة'}
📞 وسيلة التواصل: ${formData.contactInfo}
📌 التصنيف: ${getCategoryLabel(formData.category)}
🏛️ الشعبة: ${formData.stream}
${formData.fileLink ? `🔗 رابط الملف: ${formData.fileLink}\n` : ''}
📝 نص الرسالة:
${formData.message}

--
تم الإرسال عبر منصة نجاحي التعليمية 🇩🇿`
    );

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ADMIN_GMAIL)}&su=${subject}&body=${bodyText}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const existing = JSON.parse(localStorage.getItem('naja7i_submissions') || '[]');
      existing.push({
        id: 'sub_' + Date.now(),
        date: new Date().toISOString(),
        ...formData
      });
      localStorage.setItem('naja7i_submissions', JSON.stringify(existing));
    } catch (err) {
      console.error('Error saving local backup', err);
    }

    try {
      await fetch(`https://formsubmit.co/ajax/${ADMIN_GMAIL}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[منصة نجاحي] ${getCategoryLabel(formData.category)} - من ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
          'الاسم الكامل': formData.name,
          'الصفة': getRoleLabel(formData.role),
          'الولاية': formData.wilaya || 'غير محددة',
          'وسيلة التواصل': formData.contactInfo,
          'نوع الرسالة': getCategoryLabel(formData.category),
          'الشعبة المعنية': formData.stream,
          'رابط الملف المرفوع': formData.fileLink || 'لا يوجد رابط',
          'نص الرسالة والملاحظات': formData.message
        })
      });
    } catch (err) {
      console.log('Dispatch status:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFAF3] text-[#1c1917] pb-16 font-['Cairo']">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-[#FFF2DB] border-b border-[#FFE5BF] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#78716c] mb-3">
            <Link to="/" className="hover:text-[#F62440] flex items-center gap-1 transition-colors">
              <HiHome className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <span className="text-[#1c1917] font-bold">تواصل معنا ومشاركة الملفات</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded bg-[#F62440] text-white font-bold text-xs">
                  إرسال مباشر إلى Gmail
                </span>
                <span className="text-xs text-[#78716c]">استقبال ملفات ومقترحات الأساتذة والطلبة</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1c1917]">
                تواصل معنا وشاركنا ملفاتك ومقترحاتك 🤝
              </h1>
              <p className="text-xs text-[#57534e] mt-1 max-w-xl">
                عندك ملخص، سلسلة تمارين، أو استفسار؟ يسعدنا استقبال رسالتك لرفعها باسمك كصدقة جارية.
              </p>
            </div>

            <Link
              to="/"
              className="self-start md:self-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FFE5BF] text-[#1c1917] text-xs font-bold border border-[#FFE5BF] transition-colors flex items-center gap-1.5"
            >
              <span>العودة للرئيسية</span>
              <HiChevronLeft className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="bg-white border border-[#FFE5BF] rounded-2xl p-6 sm:p-8">
          
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#FFF2DB] text-emerald-600 border border-[#FFE5BF] flex items-center justify-center text-3xl mx-auto">
                <HiCheckCircle className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-[#1c1917]">
                تم استلام رسالتك وإرسالها إلى Gmail بنجاح 📨
              </h3>
              
              <p className="text-xs sm:text-sm text-[#57534e] max-w-md mx-auto leading-relaxed">
                شكراً لمساهمتك. تم إرسال البيانات وسيتم مراجعة المحتوى ورفعه للمنصة قريباً بإذن الله.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateGmailUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#FFF2DB] hover:bg-[#FFE5BF] text-[#1c1917] font-bold text-xs flex items-center gap-2 border border-[#FFE5BF] transition-colors"
                >
                  <FaGoogle className="w-4 h-4 text-[#EA4335]" />
                  <span>فتح وتأكيد الإرسال عبر تطبيق Gmail</span>
                  <HiExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  to="/"
                  className="px-5 py-2 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs transition-colors"
                >
                  العودة للرئيسية
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Category Pills */}
              <div>
                <span className="block text-xs font-bold text-[#1c1917] mb-2">
                  حدد نوع الرسالة أو المساهمة:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'share_files' })}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      formData.category === 'share_files'
                        ? 'bg-[#F62440] text-white border-[#F62440]'
                        : 'bg-[#FFFAF3] text-[#1c1917] border-[#FFE5BF] hover:bg-[#FFF2DB]'
                    }`}
                  >
                    <HiUpload className="w-4 h-4" />
                    <span>مشاركة ملفات</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'inquiry' })}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      formData.category === 'inquiry'
                        ? 'bg-[#F62440] text-white border-[#F62440]'
                        : 'bg-[#FFFAF3] text-[#1c1917] border-[#FFE5BF] hover:bg-[#FFF2DB]'
                    }`}
                  >
                    <HiChatAlt2 className="w-4 h-4" />
                    <span>استفسار أو سؤال</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'suggestion' })}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      formData.category === 'suggestion'
                        ? 'bg-[#F62440] text-white border-[#F62440]'
                        : 'bg-[#FFFAF3] text-[#1c1917] border-[#FFE5BF] hover:bg-[#FFF2DB]'
                    }`}
                  >
                    <HiLightBulb className="w-4 h-4" />
                    <span>اقتراح تحسين</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, category: 'bug' })}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                      formData.category === 'bug'
                        ? 'bg-[#F62440] text-white border-[#F62440]'
                        : 'bg-[#FFFAF3] text-[#1c1917] border-[#FFE5BF] hover:bg-[#FFF2DB]'
                    }`}
                  >
                    <HiExclamationCircle className="w-4 h-4" />
                    <span>إبلاغ عن خطأ</span>
                  </button>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1">
                    الاسم واللقب:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1">
                    الصفة:
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] cursor-pointer"
                  >
                    <option value="student">تلميذ بكالوريا (3AS)</option>
                    <option value="teacher">أستاذ / أستاذة</option>
                    <option value="parent">ولي أمر تلميذ</option>
                    <option value="other">زائر / مساهم</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1">
                    الولاية:
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: سطيف، الجزائر..."
                    value={formData.wilaya}
                    onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                    className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e]"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <label className="block text-xs font-bold text-[#1c1917] mb-1">
                  وسيلة التواصل (بريد إلكتروني، هاتف، أو حسابك للرد عليك):
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: yourname@gmail.com أو رقم هاتفك"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e]"
                />
              </div>

              {/* File details if category is sharing files */}
              {formData.category === 'share_files' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#FFF2DB]/60 border border-[#FFE5BF] rounded-xl">
                  <div>
                    <label className="block text-xs font-bold text-[#1c1917] mb-1">
                      الشعبة المعنية بالملف:
                    </label>
                    <select
                      value={formData.stream}
                      onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                      className="w-full bg-white border border-[#FFE5BF] rounded-xl px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] cursor-pointer"
                    >
                      <option value="all">جميع الشعب المشتركة</option>
                      <option value="sciences">شعبة علوم تجريبية</option>
                      <option value="math">شعبة رياضيات</option>
                      <option value="technique">شعبة تقني رياضي</option>
                      <option value="gestion">شعبة تسيير واقتصاد</option>
                      <option value="philo">شعبة آداب وفلسفة</option>
                      <option value="langues">شعبة لغات أجنبية</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1c1917] mb-1 flex items-center gap-1">
                      <HiLink className="w-3.5 h-3.5 text-[#F62440]" />
                      <span>رابط الملف (Google Drive / Telegram / Mega):</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={formData.fileLink}
                      onChange={(e) => setFormData({ ...formData, fileLink: e.target.value })}
                      className="w-full bg-white border border-[#FFE5BF] rounded-xl px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e] ltr text-left"
                    />
                  </div>
                </div>
              )}

              {/* Message text */}
              <div>
                <label className="block text-xs font-bold text-[#1c1917] mb-1">
                  {formData.category === 'share_files' 
                    ? 'وصف الملف أو الملاحظات (اسم الأستاذ، المحتوى، إلخ):' 
                    : 'نص رسالتك أو استفسارك:'}
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder={
                    formData.category === 'share_files'
                      ? 'مثال: سلسلة تمارين شاملة في المتتاليات للأستاذ فلان...'
                      : 'اكتب استفسارك أو اقتراحك هنا...'
                  }
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl p-3 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e] resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={generateGmailUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#57534e] hover:text-[#F62440] flex items-center gap-1.5 font-bold transition-colors"
                >
                  <FaGoogle className="w-3.5 h-3.5 text-[#EA4335]" />
                  <span>أو افتح مسودة جاهزة في بريد Gmail</span>
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <HiPaperAirplane className="w-4 h-4 rotate-180" />
                  <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال مباشر إلى Gmail'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
}

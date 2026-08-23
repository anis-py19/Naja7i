import React, { useState } from 'react';
import { 
  HiX, 
  HiPaperAirplane, 
  HiCheckCircle, 
  HiUpload, 
  HiChatAlt2, 
  HiLightBulb, 
  HiExclamationCircle,
  HiMail,
  HiUser,
  HiLink,
  HiExternalLink
} from 'react-icons/hi';
import { FaFacebook, FaTelegram, FaGoogle } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

// Configured recipient Gmail address
const ADMIN_GMAIL = 'anisrayaneizri@gmail.com'; 

export default function ContactContributionModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    role: 'student', // 'student' | 'teacher' | 'parent'
    wilaya: '',
    contactInfo: '', // Email or phone
    category: 'share_files', // 'share_files' | 'inquiry' | 'suggestion' | 'bug'
    stream: 'all',
    fileLink: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

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
      case 'share_files': return 'مشاركة ملفات دراسية وسلاسل 📚';
      case 'inquiry': return 'استفسار أو سؤال ❓';
      case 'suggestion': return 'اقتراح تطوير 💡';
      case 'bug': return 'إبلاغ عن خطأ ⚠️';
      default: return 'رسالة عامة';
    }
  };

  // Generate direct Gmail URL
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
📝 نص الرسالة / الملاحظات:
${formData.message}

--
تم الإرسال عبر منصة نجاحي التعليمية 🇩🇿`
    );

    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(ADMIN_GMAIL)}&su=${subject}&body=${bodyText}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const submissionData = {
      id: 'sub_' + Date.now(),
      date: new Date().toISOString(),
      ...formData
    };

    // 1. Save to localStorage backup
    try {
      const existing = JSON.parse(localStorage.getItem('naja7i_submissions') || '[]');
      existing.push(submissionData);
      localStorage.setItem('naja7i_submissions', JSON.stringify(existing));
    } catch (err) {
      console.error('Error saving local backup', err);
    }

    // 2. Direct dispatch to anisrayaneizri@gmail.com via FormSubmit AJAX
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

  const handleReset = () => {
    setFormData({
      name: '',
      role: 'student',
      wilaya: '',
      contactInfo: '',
      category: 'share_files',
      stream: 'all',
      fileLink: '',
      message: ''
    });
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 font-['Cairo']">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-white rounded-3xl border border-[#FFE5BF] shadow-2xl max-w-2xl w-full overflow-hidden z-10 my-8 text-right"
        >
          {/* Header */}
          <div className="bg-[#FFF2DB] border-b border-[#FFE5BF] p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#FFE5BF] text-[#F62440] flex items-center justify-center text-2xl shadow-2xs">
                📧
              </div>
              <div>
                <h3 className="text-lg font-black text-[#1c1917]">
                  تواصل معنا • إرسال مباشر إلى Gmail 🇩🇿
                </h3>
                <p className="text-xs text-[#78716c]">
                  أرسل ملخصاتك، استفساراتك، ومقترحاتك لتصل فوراً إلى بريد إدارة المنصة
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#78716c] hover:text-[#1c1917] hover:bg-[#FFE5BF] transition-colors cursor-pointer"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 max-h-[75vh] overflow-y-auto">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-20 h-20 rounded-full bg-[#FFF2DB] text-[#F62440] border-2 border-[#FFE5BF] flex items-center justify-center text-4xl mx-auto shadow-xs">
                  <HiCheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
                
                <h4 className="text-xl font-black text-[#1c1917]">
                  تم إرسال رسالتك بنجاح! 📨
                </h4>
                
                <p className="text-xs sm:text-sm text-[#57534e] max-w-md mx-auto leading-relaxed">
                  شكراً لمساهمتك القيمة. وصلت رسالتك إلى بريد المنصة (Gmail) وسيتم مراجعة الملفات ورفعها للموقع قريباً بإذن الله.
                </p>

                {/* Direct Gmail Open Backup Option */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateGmailUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#FFF2DB] hover:bg-[#FFE5BF] text-[#1c1917] font-bold text-xs flex items-center gap-2 border border-[#FFE5BF] transition-colors shadow-2xs"
                  >
                    <FaGoogle className="w-4 h-4 text-[#EA4335]" />
                    <span>فتح وتأكيد الإرسال عبر تطبيق Gmail</span>
                    <HiExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    إغلاق والعودة للمنصة
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* 1. Purpose Selector Pills */}
                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-2">
                    نوع الرسالة أو المساهمة:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'share_files' })}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        formData.category === 'share_files'
                          ? 'bg-[#F62440] text-white border-[#F62440] shadow-xs'
                          : 'bg-[#FFFAF3] text-[#1c1917] border-[#FFE5BF] hover:bg-[#FFF2DB]'
                      }`}
                    >
                      <HiUpload className="w-4 h-4" />
                      <span>مشاركة ملفات 📚</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'inquiry' })}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        formData.category === 'inquiry'
                          ? 'bg-[#F62440] text-white border-[#F62440] shadow-xs'
                          : 'bg-[#FFFAF3] text-[#1c1917] border-[#FFE5BF] hover:bg-[#FFF2DB]'
                      }`}
                    >
                      <HiChatAlt2 className="w-4 h-4" />
                      <span>استفسار أو سؤال ❓</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'suggestion' })}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        formData.category === 'suggestion'
                          ? 'bg-[#F62440] text-white border-[#F62440] shadow-xs'
                          : 'bg-[#FFFAF3] text-[#1c1917] border-[#FFE5BF] hover:bg-[#FFF2DB]'
                      }`}
                    >
                      <HiLightBulb className="w-4 h-4" />
                      <span>اقتراح تحسين 💡</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, category: 'bug' })}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                        formData.category === 'bug'
                          ? 'bg-[#F62440] text-white border-[#F62440] shadow-xs'
                          : 'bg-[#FFFAF3] text-[#1c1917] border-[#FFE5BF] hover:bg-[#FFF2DB]'
                      }`}
                    >
                      <HiExclamationCircle className="w-4 h-4" />
                      <span>إبلاغ عن خطأ ⚠️</span>
                    </button>
                  </div>
                </div>

                {/* 2. Personal Info (Name, Role, Wilaya) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1c1917] mb-1">
                      الاسم الكامل / اللقب:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك الكريم"
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
                      placeholder="مثال: الجزائر، سطيف، وهران..."
                      value={formData.wilaya}
                      onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                      className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e]"
                    />
                  </div>
                </div>

                {/* 3. Contact Info (Email or Phone) */}
                <div>
                  <label className="block text-xs font-bold text-[#1c1917] mb-1">
                    وسيلة التواصل (بريدك الإلكتروني، رقم الهاتف، أو حسابك):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: yourname@gmail.com أو رقم هاتفك للتواصل معك"
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl px-3 py-2 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e]"
                  />
                </div>

                {/* 4. Stream & File Link (if sharing files) */}
                {formData.category === 'share_files' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#FFF2DB]/60 border border-[#FFE5BF] rounded-2xl">
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

                {/* 5. Message Content */}
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
                        ? 'مثال: ملخص شامل في المتتاليات للأستاذ فلان، أو تمارين ممتازة في العلوم...'
                        : 'اكتب استفسارك أو اقتراحك هنا بكل وضوح...'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FFFAF3] border border-[#FFE5BF] rounded-xl p-3 text-xs text-[#1c1917] focus:outline-none focus:border-[#F62440] placeholder-[#a8a29e] resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  
                  {/* Direct Gmail Option */}
                  <a
                    href={generateGmailUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#57534e] hover:text-[#F62440] flex items-center gap-1.5 font-bold transition-colors"
                  >
                    <FaGoogle className="w-3.5 h-3.5 text-[#EA4335]" />
                    <span>أو افتح مسودة جاهزة في Gmail</span>
                  </a>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#F62440] hover:bg-[#d81b34] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <HiPaperAirplane className="w-4 h-4 rotate-180" />
                    <span>{isSubmitting ? 'جاري الإرسال إلى Gmail...' : 'إرسال مباشر إلى Gmail'}</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

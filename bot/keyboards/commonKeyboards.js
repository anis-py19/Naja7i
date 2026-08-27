import { InlineKeyboard } from 'grammy';

/**
 * زر الرجوع البسيط
 */
export function getBackKeyboard(backCallback = 'main_menu') {
  return new InlineKeyboard().text('🔙 رجوع', backCallback);
}

/**
 * لوحة أزرار مع ترقيم الصفحات (Pagination)
 */
export function getPaginationKeyboard({
  currentPage = 1,
  totalPages = 1,
  prefix = 'page',
  backCallback = 'main_menu',
  extraButtons = []
}) {
  const kb = new InlineKeyboard();

  // أزرار مخصصة إضافية إن وجدت
  extraButtons.forEach(btn => {
    kb.text(btn.text, btn.callback_data);
    kb.row();
  });

  // أزرار التنقل بين الصفحات
  if (totalPages > 1) {
    if (currentPage > 1) {
      kb.text('⬅️ السابق', `${prefix}:${currentPage - 1}`);
    }
    kb.text(`📄 ${currentPage} / ${totalPages}`, 'noop');
    if (currentPage < totalPages) {
      kb.text('التالي ➡️', `${prefix}:${currentPage + 1}`);
    }
    kb.row();
  }

  kb.text('🔙 رجوع', backCallback);
  return kb;
}

import { InlineKeyboard } from 'grammy';
import { truncate } from '../utils/helpers.js';

/**
 * Generic Dynamic Paginator for Files / Items
 * @param {Array} items - List of items
 * @param {number} page - Current page (1-based)
 * @param {number} pageSize - Number of items per page
 * @param {string} callbackPrefix - Base callback string (e.g. 'files:sciences:math:all')
 * @param {string} backCallback - Callback for back button
 */
export function getPaginatedFilesKeyboard(items, page = 1, pageSize = 5, callbackPrefix = 'files', backCallback = 'menu_home') {
  const totalPages = Math.ceil(items.length / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const pageItems = items.slice(startIndex, startIndex + pageSize);

  const keyboard = new InlineKeyboard();

  // Item action rows
  pageItems.forEach((file, index) => {
    const itemNum = startIndex + index + 1;
    const cleanTitle = truncate(file.title || file.rawFileName, 35);
    
    // File details callback
    keyboard.text(`${itemNum}. 📄 ${cleanTitle}`, `fview:${file.id}`).row();

    // Direct Google Drive / Preview links
    const previewUrl = file.drivePreviewUrl || file.driveFileUrl || file.fileUrl;
    const downloadUrl = file.driveDownloadUrl || file.driveFileUrl || file.fileUrl;

    if (previewUrl && previewUrl.startsWith('http')) {
      keyboard.url('👁️ معاينة', previewUrl);
    }
    if (downloadUrl && downloadUrl.startsWith('http')) {
      keyboard.url('📥 تحميل مباشر', downloadUrl);
    }
    if (previewUrl || downloadUrl) {
      keyboard.row();
    }
  });

  // Pagination navigation row
  if (currentPage > 1) {
    keyboard.text('⬅️ السابق', `${callbackPrefix}:${currentPage - 1}`);
  }
  keyboard.text(`📄 ${currentPage} / ${totalPages}`, `noop`);
  if (currentPage < totalPages) {
    keyboard.text('التالي ➡️', `${callbackPrefix}:${currentPage + 1}`);
  }
  keyboard.row();

  // Back button
  if (backCallback) {
    keyboard.text('🔙 رجوع', backCallback).text('🏠 الرئيسية', 'menu_home');
  } else {
    keyboard.text('🏠 الرئيسية', 'menu_home');
  }

  return {
    keyboard,
    currentPage,
    totalPages,
    totalItems: items.length,
    pageItems
  };
}

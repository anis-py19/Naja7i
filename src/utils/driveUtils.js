/**
 * 🛠️ Google Drive URL transformation helpers
 */
export function getDrivePreviewUrl(url) {
  if (!url) return null;
  
  // 1. Match file/d/FILE_ID
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch && fileMatch[1]) {
    return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
  }

  // 2. Match open?id=FILE_ID or uc?id=FILE_ID
  const idMatch = url.match(/drive\.google\.com\/(?:open|uc)\?(?:.*&)?id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
  }

  // 3. Match folder URLs: drive.google.com/drive/folders/FOLDER_ID
  const folderMatch = url.match(/drive\.google\.com\/drive\/(?:u\/\d+\/)?folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) {
    return `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#grid`;
  }

  return null;
}

// 📥 Universal robust PDF download utility for Naja7i
// Handles cross-origin, mobile browsers, Arabic file names, and direct blobs

export async function downloadPdfFile(fileUrl, fileName = 'ملخص_دراسي_نجاحي') {
  if (!fileUrl) return false;

  try {
    // Determine extension from original fileUrl or fileName
    let ext = '.pdf';
    if (fileUrl.toLowerCase().endsWith('.doc')) ext = '.doc';
    else if (fileUrl.toLowerCase().endsWith('.docx')) ext = '.docx';
    else if (fileUrl.toLowerCase().endsWith('.pdf')) ext = '.pdf';

    // Clean filename
    let cleanName = fileName.trim().replace(/[\\/:*?"<>|]/g, '_');
    if (!cleanName.toLowerCase().endsWith(ext)) {
      cleanName += ext;
    }

    // Resolve URL
    const targetUrl = fileUrl.startsWith('http') 
      ? fileUrl 
      : window.location.origin + fileUrl;

    // Fetch the file as blob to force a real download dialog
    const response = await fetch(targetUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobUrl;
    tempLink.setAttribute('download', cleanName);

    document.body.appendChild(tempLink);
    tempLink.click();

    // Clean up memory
    setTimeout(() => {
      if (document.body.contains(tempLink)) {
        document.body.removeChild(tempLink);
      }
      window.URL.revokeObjectURL(blobUrl);
    }, 400);

    return true;
  } catch (err) {
    console.warn('Direct blob download failed, falling back to direct browser download:', err);
    // Fallback: direct anchor trigger
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 400);
    return false;
  }
}

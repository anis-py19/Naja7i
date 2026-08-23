// 📥 Universal robust PDF download utility for Naja7i
// Handles cross-origin, mobile browsers, Arabic file names, and direct blobs

export async function downloadPdfFile(fileUrl, fileName = 'naja7i-study-file.pdf') {
  try {
    // 1. Clean filename
    let cleanName = fileName.trim();
    if (!cleanName.toLowerCase().endsWith('.pdf')) {
      cleanName += '.pdf';
    }

    // 2. Fetch the file as blob to force a real download prompt
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
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
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobUrl);
    }, 200);

    return true;
  } catch (err) {
    console.warn('Direct blob download failed, falling back to direct window link:', err);
    // Fallback: direct anchor trigger
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }
}

export const getImageUrl = (url: string | undefined): string => {
  const FALLBACK_IMAGE = '/images/medicine-placeholder.jpg';
  
  if (!url) return FALLBACK_IMAGE;
  
  try {
    // Перевіряємо чи це відносний шлях
    if (url.startsWith('/')) return url;
    
    // Перевіряємо чи це валідний URL
    new URL(url);
    return url;
  } catch (error) {
    console.error('Error validating image URL:', error);
    return FALLBACK_IMAGE;
  }
}; 
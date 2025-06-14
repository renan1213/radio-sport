export const formatDate = (dateString) => {
  if (!dateString) return 'Data indisponível';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const handleImageError = (e) => {
  e.target.onerror = null; 
  const placeholder = e.target.nextElementSibling;
  if (placeholder && placeholder.classList.contains('image-placeholder')) {
    placeholder.style.display = 'flex';
  }
  e.target.style.display = 'none';
};

export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
};
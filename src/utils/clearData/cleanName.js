export const cleanName = (name) => {
  if (!name) {
    return ''; 
  }

  return name
    .toLowerCase() 
    .replace(/_/g, ' ') 
    .split(' ') 
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); 
};
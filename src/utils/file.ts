export const getMimeTypeFromName = (name = "") => {
  const lower = name.toLowerCase();
  if (lower.match(/\.(jpg|jpeg|png|gif|webp|bmp)(\.|$)/)) return "image";
  if (lower.match(/\.(mp4|webm|ogg|mov)(\.|$)/)) return "video";
  if (lower.match(/\.(pdf)(\.|$)/)) return "pdf";
  if (lower.match(/\.(doc|docx|ppt|pptx|xls|xlsx)(\.|$)/)) return "office";
  if (lower.match(/\.(svg)(\.|$)/)) return "svg";
  if (lower.match(/\.(xxml)(\.|$)/)) return "svg";
  return "other";
};
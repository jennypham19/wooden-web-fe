import imageCompression from "browser-image-compression";

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

// Lấy độ dài của video khi upload
export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };

    video.onerror = () => reject("Không đọc được metadata video");

    video.src = URL.createObjectURL(file);
  });
};

// Chuyển sang phút : giây
export const formatDuration = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min} : ${sec.toString().padStart(2, "0")}`;
};

export const compressImage = async (file: File): Promise<File> => {
    try {
        // chỉ nén ảnh
        if (!file.type.startsWith("image/")) {
            return file;
        }

        const options = {
            maxSizeMB: 1, // ảnh sau nén ~1MB
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        return new File(
            [compressedFile],
            file.name,
            {
                type: compressedFile.type,
                lastModified: Date.now(),
            }
        );
    } catch (error) {
        console.error("Compress image error:", error);
        return file;
    }
};
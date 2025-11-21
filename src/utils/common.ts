import { AxiosResponse } from 'axios';
import _ from 'lodash';
import Papa from 'papaparse';
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
// import { createFFmpeg } from "@ffmpeg/ffmpeg";


export const exportDataCSV = ({ name = '', data = [] as any[] }) => {
  try {
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error export file:', error);
  }
};

export const downloadFileCSV = async ({
  name = '',
  request,
}: {
  name?: string;
  request: Promise<any>;
}) => {
  try {
    const response = (await request) as AxiosResponse;
    const bom = '\uFEFF';
    const blob = new Blob([bom + response.data], { type: response.headers['content-type'] });
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};

export const findDuplicateKey = (data: any, iteratee: string) => {
  const result = _.chain(data)
    .filter((item) => item[iteratee] != null)
    .countBy(iteratee)
    .pickBy((count) => count > 1)
    .keys()
    .value();
  return result;
};

// Resize ảnh
export const resizeImage = (file: File, maxSize: number): Promise<{ blob: Blob; previewUrl: string; name?: string }> => {
        return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
            img.src = reader.result;
            }
        };

        img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > maxSize) {
                  height = Math.round((height *= maxSize / width));
                  width = maxSize;
              }
            } else {
              if (height > maxSize) {
                  width = Math.round((width *= maxSize / height));
                  height = maxSize;
              }
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (!ctx) return reject(new Error("Canvas context not found"));

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
            (blob) => {
                if (blob) {
                  resolve({
                      blob,
                      previewUrl: URL.createObjectURL(blob),
                      name: file.name
                  });
                } else {
                  reject(new Error("Resize failed"));
                }
            },
            file.type,
            0.8
            );
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
        });
};

// Resize PDF (giảm dung lượng, không đổi nội dung)
export const compressPDF = async(file: File): Promise<File> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
  const pages = pdfDoc.getPages();
  pages.forEach((page) => {
    page.setFontSize(10); // Giảm metadata -> nhẹ hơn
  });

  const compressPdf = await pdfDoc.save({ useObjectStreams: true });
  return new File([new Uint8Array(compressPdf)], file.name, { type: "application/pdf"})
}

export const resizeImages = (file: File, maxWidth = 1200, maxHeight = 1200): Promise<File> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      let { width, height } = img;

      // giữ tỉ lệ
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        resolve(new File([blob!], file.name, { type: file.type }));
      }, file.type);
    };
  });
};


// Resize word
export const compressDocx = async (file: File): Promise<File> => {
  const buffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  const media = zip.folder("word/media");
  if (media) {
    const files = Object.keys(media.files);

    for (const fileName of files) {
      const fileEntry = media.file(fileName);
      if (!fileEntry) continue; // bỏ qua nếu file null
      const imageBlob = await fileEntry.async("blob");
      const resized = await resizeImages(new File([imageBlob], fileName, { type: imageBlob.type }));
      media.file(fileName, resized);
    }
  }

  const newDocx = await zip.generateAsync({ type: "blob" });
  return new File([newDocx], file.name, { type: file.type });
};

// Resize video
// const ffmpeg = createFFmpeg({ log: true });

// export const compressVideo = async (file: File): Promise<File> => {
//   if (!ffmpeg.isLoaded()) await ffmpeg.load();

//   // Use ffmpeg.fetchFile instead of import
//   ffmpeg.FS("writeFile", "input.mp4", await ffmpeg.fetchFile(file));

//   await ffmpeg.run("-i", "input.mp4", "-vf", "scale=1280:-1", "output.mp4");

//   const data = ffmpeg.FS("readFile", "output.mp4");

//   return new File([data.buffer], file.name, { type: "video/mp4" });
// };
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { resizeImage } from '@/utils/common';

interface ImageUploadProps {
  onFileSelect: (file: File | null, index?: number) => void;
  initialImage?: string | null;
  height?: number;
  index?: number
  errorImage?: string | null
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect, initialImage, height, index, errorImage }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if(initialImage){
      setPreview(initialImage)
    }else{
      setPreview(null);
    };
  }, [initialImage]);

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const { blob, previewUrl } = await resizeImage(file, 800);
      const newFile = new File([blob], file.name, { type: "image/jpeg" });
      onFileSelect(newFile, index);
      setPreview(previewUrl);
    }
    event.target.value = "";
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelect(null, index)
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {preview ? (
        <Box sx={{ position: 'relative', width: '100%', height: '300px', border: '1px dashed grey', borderRadius: 2, overflow: 'hidden' }}>
          <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
          <IconButton
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          onClick={handleBoxClick}
          sx={{
            border: errorImage ? '2px dashed #d82020ff' : '2px dashed #ccc',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': { borderColor: 'primary.main' },
            height: height,
            display: 'flex'
          }}
        >
          <Box sx={{ margin: 'auto 0'}}>
            <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
            <Typography>Kéo và thả ảnh vào đây, hoặc nhấn để chọn ảnh</Typography>
            <Button variant="contained" component="span" sx={{ mt: 2 }}>
              Tải ảnh lên
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;

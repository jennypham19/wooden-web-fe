import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FolderCopyOutlined } from '@mui/icons-material';

interface FilesUploadProps {
  onFilesSelect: (files: File[]) => void;
  initialImages?: string[]
  height?: number;
  errorImage?: string | null
}

const FilesUpload: React.FC<FilesUploadProps> = ({ onFilesSelect, initialImages, height = 250, errorImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [urlFiles, setUrlFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  
  useEffect(() => {
    if (initialImages) {
        setUrlFiles(initialImages);
    }
  }, [initialImages]);

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
        const arrFiles = Array.from(files); // Convert FileList => File[]
        onFilesSelect(arrFiles);
        setFiles(arrFiles);

        // Update preview images
        const previewUrls = arrFiles.map(file => URL.createObjectURL(file));
        setUrlFiles(previewUrls)
    }
    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setUrlFiles(prev => prev.filter((_, i) => i !== index));
    setFiles(prev => prev.filter((_, i) => i !== index));

    onFilesSelect(files.filter((_, i) => i !== index));

    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  console.log("files: ", files);
  
  return (
    <Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        style={{ display: 'none' }}
      />
      
      {urlFiles && urlFiles.length > 0 ? (
        urlFiles.map((file, index) => (
            <Box key={index} sx={{ position: 'relative', width: '100%', height: '300px', border: '1px dashed grey', borderRadius: 2, overflow: 'hidden' }}>
                <img src={file} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
                <IconButton
                    onClick={() => handleRemoveImage(index)}
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
        ))
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
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ margin: 'auto 0'}}>
            <FolderCopyOutlined sx={{ fontSize: 48, color: 'text.secondary' }} />
            <Typography>Thêm files dữ liệu: PDF, XXML, PPTX, SVG, AI,...</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FilesUpload;

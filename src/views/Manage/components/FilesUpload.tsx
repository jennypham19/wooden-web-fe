import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton, InputAdornment } from '@mui/material';
import { Add, Close, FolderCopyOutlined, InsertDriveFile } from '@mui/icons-material';
import InputText from '@/components/InputText';
import LabeledStack from '@/components/LabeledStack';
import { COLORS } from '@/constants/colors';

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
  const [openFiles, setOpenFiles] = useState(false);
  
  useEffect(() => {
    if (initialImages) {
        setUrlFiles(initialImages);
    }
  }, [initialImages]);

  const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
        const arrFiles = Array.from(files); // Convert FileList => File[]

        // Callback to parent
        onFilesSelect([...(files || []), ...arrFiles]);

        // update files
        setFiles(prev => [...(prev || []), ...arrFiles]);

        // Update preview images
        const previewUrls = arrFiles.map(file => URL.createObjectURL(file));
        setUrlFiles(prev => [...(prev || []), ...previewUrls]);
    }
    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = (files || []).filter((_, i) => i !== index);
    const newUrls = (urlFiles || []).filter((_, i) => i !== index);

    setUrlFiles(newUrls);
    setFiles(newFiles);

    onFilesSelect(newFiles);

    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
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
        multiple
        style={{ display: 'none' }}
      />
      
      {files && files.length > 0 ? (
        <LabeledStack
          sx={{ borderRadius: 3 }}
          label='Files dữ liệu'
          stackProps={{ direction: 'column', my: 2, p: 2 }}
        >          
          {files.map((file, index) => (
            <Box key={index} sx={{ position: 'relative', overflow: 'hidden' }}>
                <InputText
                  label=''
                  placeholder='Tài liệu'
                  value={file.name}
                  name=''
                  type='text'
                  onChange={() => {}}
                  startAdornment={
                    <InputAdornment position='start'>
                      <InsertDriveFile/>
                    </InputAdornment>
                  }
                />
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
                    <Close />
                </IconButton>
            </Box>
          ))}
          <Button
            variant="outlined"
            startIcon={<Add sx={{ color: COLORS.BUTTON }}/>}
            onClick={() => { setOpenFiles(true) }}
            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
          >
            Thêm files dữ liệu
          </Button>
          {openFiles && (
            <Box
              onClick={handleBoxClick}
              sx={{
                border: errorImage ? '2px dashed #d82020ff' : '2px dashed #ccc',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': { borderColor: 'primary.main' },
                height: 200,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ margin: 'auto 0'}}>
                <FolderCopyOutlined sx={{ fontSize: 48, color: 'text.secondary' }} />
                <Typography>Thêm files dữ liệu: PDF, XXML, PPTX, SVG, AI,...</Typography>
              </Box>
            </Box>
          )}
        </LabeledStack>  
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

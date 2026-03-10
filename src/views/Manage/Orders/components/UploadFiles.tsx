import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, IconButton, InputAdornment } from '@mui/material';
import { Add, Close, FolderCopyOutlined, InsertDriveFile } from '@mui/icons-material';
import InputText from '@/components/InputText';
import LabeledStack from '@/components/LabeledStack';
import { COLORS } from '@/constants/colors';

interface FilesUploadProps {
  onFilesSelect: (files: File[]) => void;
  height?: number;
  errorImage?: string | null,
  isRemove: boolean
}

const UploadFiles: React.FC<FilesUploadProps> = ({ isRemove, onFilesSelect, height = 250, errorImage }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isRemove){
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    }, [isRemove])

    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const arrFiles = Array.from(files); // Convert FileList => File[]
            onFilesSelect(arrFiles)
        }
        event.target.value = "";
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
        </Box>
    );
};

export default UploadFiles;

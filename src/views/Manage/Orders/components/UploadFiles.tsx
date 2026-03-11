import React, { useState, useRef } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import { Close, Description, FolderCopyOutlined, Image, VideoCameraBack } from '@mui/icons-material';

interface FilesUploadProps {
  onFilesSelect: (files: File[]) => void;
  height?: number;
  errorImage?: string | null,
}

const UploadFiles: React.FC<FilesUploadProps> = ({ onFilesSelect, height = 250, errorImage }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const arrFiles = Array.from(files); // Convert FileList => File[]

            // update files
            setFiles(prev => {
                const newFiles = [...(prev || []), ...arrFiles];
                onFilesSelect(newFiles);  // cb đồng bộ với state
                return newFiles
            });
        }
        event.target.value = "";
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = (files || []).filter((_, i) => i !== index);
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
                    <Box mt={2}>
                        {files && files.length > 0 && files.map((file, index) => {
                            const showIcon = file.type.includes('mp4') ? <VideoCameraBack/> : file.type.includes("image") ? <Image/> : <Description/>
                            return(
                                <Box display='flex' justifyContent='space-between'>
                                    <Stack py={0.5} key={index} direction='row'>
                                        {showIcon}
                                        <Typography variant="subtitle2">{file.name}</Typography>
                                    </Stack>
                                    <IconButton
                                        onClick={() => handleRemoveFile(index)}
                                        sx={{
                                            bgcolor: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
                                        }}
                                    >
                                        <Close/>
                                    </IconButton>
                                </Box>
                            )
                        })}
                    </Box>
        </Box>
    );
};

export default UploadFiles;

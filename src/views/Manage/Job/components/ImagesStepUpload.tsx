import { CameraAlt } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface ImagesStepUploadProps{
    fileInputImageRef: React.RefObject<HTMLInputElement>;
    onChangeImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBoxClick: () => void;
    errorImageFiles: string;
    isSmall: boolean,
}

const ImagesStepUpload = (props: ImagesStepUploadProps) => {
    const { fileInputImageRef, onChangeImages, onBoxClick, errorImageFiles, isSmall } = props;
    return(
        <Box>
            <input
                type="file"
                accept="image/*"
                capture="environment"
                hidden
                ref={fileInputImageRef}
                onChange={onChangeImages}
                multiple
            />
            <Box
                onClick={onBoxClick}
                sx={{
                    border: errorImageFiles ? "2px dashed red" : "2px dashed #ccc",
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { borderColor: 'primary.main' },
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box sx={{ margin: 'auto 0'}}>
                    <CameraAlt sx={{ fontSize: 48, color: 'text.secondary'}}/>
                    <Typography fontSize='14px'>{isSmall ? 'Chụp ảnh từ camera của bạn.' : 'Tải lên dữ liệu files ảnh trong thư viện.'}</Typography>
                    <Typography fontSize='14px'>{'JPG, JPEG, PNG, MOV,...'}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ImagesStepUpload;
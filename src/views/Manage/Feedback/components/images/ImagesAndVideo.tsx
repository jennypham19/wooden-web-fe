import CommonImage from "@/components/Image/index";
import CommonVideo from "@/components/Video";
import { COLORS } from "@/constants/colors";
import { CameraAlt, Close, VideoCameraBack } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { useState } from "react";
import DialogShowVideo from "./DialogShowVideo";
interface ImagesAndVideoProps{
    imagesUrl: string[];
    videoUrl: string | null;
    onRemoveVideo: () => void;
    onRemoveImages: (index: number) => void;
    onBoxClickImage: () => void;
    onBoxClickVideo: () => void;
    imagesRef: React.RefObject<HTMLInputElement>;
    videoRef: React.RefObject<HTMLInputElement>;
    onFileVideoChange: (event: React.ChangeEvent<HTMLInputElement>) =>  void;
    onFileImagesChange: (event: React.ChangeEvent<HTMLInputElement>) =>  void;
    duration: string | null
}

const ImagesAndVideo = (props: ImagesAndVideoProps) => {
    const { imagesUrl, videoUrl, onBoxClickImage, onBoxClickVideo, onRemoveImages, onRemoveVideo, onFileImagesChange, onFileVideoChange, imagesRef, videoRef, duration } = props;
    const [openFile, setOpenFile] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    })
    const [fileUrl, setFileUrl] = useState<{ type: string, url: string }>({
        type: '',
        url: ''
    })

    const handleOpenFile = (type: string, url: string) => {
        setOpenFile({ open: true, type: type });
        setFileUrl({ type: type, url: url })
    }

    const handleCloseFile = (type: string) => {
        setOpenFile({ open: false, type: type })
    }

    return(
        <Grid container spacing={2}>
            {videoUrl && (
                <Grid size={{ xs: 12, md: 3 }}>
                    <Box onClick={() => handleOpenFile('video', videoUrl)} sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CommonVideo
                            src={videoUrl}
                            sx={{ height: 150, width: '100%' }}
                            borderRadius={0}
                        />
                        <Box sx={{ position: 'absolute', bgcolor: 'rgba(0,0,0,0.5)', bottom: 7, width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 0.5, mt: 0.5 }}>
                                <VideoCameraBack sx={{ color: '#fff' }}/>
                                <Typography variant="subtitle2" sx={{ color: '#fff' }}>{duration}</Typography>
                            </Box>
                        </Box>
                        <IconButton
                            onClick={onRemoveVideo}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                borderRadius: 0,
                                backgroundColor: 'rgba(85, 84, 84, 0.6)',
                                '&:hover': { backgroundColor: 'rgba(85, 84, 84, 0.6)' }
                            }}
                        >
                            <Close sx={{ color: '#fff' }}/>
                        </IconButton>                        
                    </Box>
                </Grid>
            )}
            {imagesUrl.map((url, index) => (
                <Grid key={index} size={{ xs: 12, md: 3 }}>
                    <Box onClick={() => handleOpenFile('image', url)} sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CommonImage
                            src={url}
                            sx={{ height: 150, width: '100%' }}
                            borderRadius={0}
                        />
                        <IconButton
                            onClick={() => onRemoveImages(index)}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                borderRadius: 0,
                                backgroundColor: 'rgba(85, 84, 84, 0.6)',
                                '&:hover': { backgroundColor: 'rgba(85, 84, 84, 0.6)' }
                            }}
                        >
                            <Close sx={{ color: '#fff' }}/>
                        </IconButton>                        
                    </Box>
                </Grid>
            ))}
            {imagesUrl.length !== 5 && (
                <Grid size={{ xs: 12, md: 3 }}>
                    <Box>
                        <input ref={imagesRef} onChange={onFileImagesChange} hidden type="file" capture="environment" multiple accept="image/*"/>
                        <Box
                            onClick={onBoxClickImage}
                            sx={{
                                border: `1px dashed ${COLORS.BUTTON}`,
                                p: 3,
                                cursor: 'pointer',
                                '&:hover': { borderColor: 'primary.main' },
                                height: 150,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Stack direction='column' alignItems='center'>
                                <CameraAlt sx={{ fontSize: 30, color: 'text.secondary' }} />
                                <Typography variant="caption">{5 - imagesUrl.length}/5</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            )}
            {!videoUrl && (
                <Grid size={{ xs: 12, md: 3 }}>
                    <Box>
                        <input ref={videoRef} onChange={onFileVideoChange} hidden type="file" multiple capture="environment" accept="video/*"/>
                        <Box
                            onClick={onBoxClickVideo}
                            sx={{
                                border: `1px dashed ${COLORS.BUTTON}`,
                                p: 3,
                                cursor: 'pointer',
                                '&:hover': { borderColor: 'primary.main' },
                                height: 150,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Stack direction='column' alignItems='center'>
                                <VideoCameraBack sx={{ fontSize: 30, color: 'text.secondary' }} />
                                <Typography variant="caption">Video</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            )}
            {openFile.open && openFile.type === 'video' && fileUrl.type === 'video' && fileUrl.url && (
                <DialogShowVideo
                    open={openFile.open}
                    onClose={handleCloseFile}
                    videoUrl={fileUrl.url}
                />
            )}
        </Grid>
    )
}

export default ImagesAndVideo;
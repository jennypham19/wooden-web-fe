import DialogComponent from "@/components/DialogComponent";
import CommonVideo from "@/components/Video";
import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

interface DialogShowVideoProps{
    open: boolean,
    onClose: (type: string) => void;
    videoUrl: string
}

const DialogShowVideo = (props: DialogShowVideoProps) => {
    const { open, onClose, videoUrl } = props;
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={() => onClose('video')}
            isActiveFooter={false}
            isActiveHeader={false}
            maxWidth={'md'}
        >
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CommonVideo
                    src={videoUrl}
                    sx={{ height: '100%', width: '100%'}}
                    borderRadius={0}
                    controls={true}
                    autoPlay={true}
                />
                <IconButton
                    onClick={() => onClose('video')}
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
        </DialogComponent>
    )
}

export default DialogShowVideo;
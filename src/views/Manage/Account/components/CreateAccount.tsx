import { Avatar, Box, Button } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, useRef, useState } from "react";
import { resizeImage } from "@/utils/common";
import { PhotoCamera } from "@mui/icons-material";
import { getRoleCode } from "@/utils/labelEntoVni";

interface CreateAccountProps {
    onClose: () => void;
}

const CreateAccount = ( props: CreateAccountProps ) => {
    const { onClose } = props;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [errorImage, setErrorImage] = useState<string | null>(null);

    const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file && file.type.startsWith('image/')) {
            const { blob, previewUrl } = await resizeImage(file, 800);
            const newFile = new File([blob], file.name, { type: "image/jpeg" });
            setImageFile(newFile);
            setAvatarPreview(previewUrl);
        }else{
            if(!file) setErrorImage('Vui lòng chọn ảnh');
            setAvatarPreview(null);
            event.target.value = "";
        }
        //Reset lại input để onChange được gọi nếu chọn lại cùng 1 ảnh
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    let finalDisplayAvatarSrc: string | undefined = undefined;
    if(avatarPreview) finalDisplayAvatarSrc = avatarPreview; 
    
    return (
        <>
            <NavigateBack
                title="Tạo tài khoản mới"
                onBack={onClose}
            />
            <Box borderRadius={2} m={2} bgcolor='#fff' boxShadow="0px 2px 1px 1px rgba(0, 0, 0, 0.2)">
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12}} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}>
                        <Box sx={{ position: 'relative', width: 120, height: 120}}>
                            <Avatar
                                src={finalDisplayAvatarSrc}
                                sx={{ width: '100%', height: '100%', mb: 2, bgcolor: 'grey.600', borderRadius: '50%' }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'grey.300',
                                    borderRadius: '50%',
                                    minWidth: '30px',
                                    width: '30px',
                                    height: '30px',
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 5
                                }}
                                component='label'
                                startIcon={<PhotoCamera sx={{ width: '25px', height: '25px', ml: 1.2, color: '#1C1A1B'}}/>}
                            >
                                <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleChangeAvatar}/>
                            </Button>
                        </Box> 
                    </Grid>
                    <Grid></Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CreateAccount;
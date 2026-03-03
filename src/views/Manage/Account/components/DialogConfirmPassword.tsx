import React from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import DialogComponent from "@/components/DialogComponent";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { IUser } from "@/types/user";
import { ContentCopy } from "@mui/icons-material";

interface DialogConfirmPasswordProps {
    open: boolean,
    handleClose: () => void,
    user: IUser;
}

const DialogConfirmPassword: React.FC<DialogConfirmPasswordProps> = (props) => {
    const { open, handleClose, user} = props;
    const notify = useNotification();
    const handleCopy = async () => {
        if(user.password){
            await navigator.clipboard.writeText(user.password);
            notify({
                message: "Đã sao chép mật khẩu",
                severity: 'success'
            })  
        }

    };
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            isActiveHeader={false}
            isCenter={false}
        >
            <Typography variant="body1" fontWeight={500}>
                Mật khẩu của nhân viên {user.fullName} đã được đặt lại theo yêu cầu.
            </Typography>
            <Typography variant="subtitle1">
                <b>Tài khoản:</b> {user.email}
            </Typography>
            <Stack direction='row' display='flex' justifyContent='center' alignItems='center'>
                <Typography variant="subtitle1">
                    <b>Mật khẩu:</b> {user.password}
                </Typography>
                <IconButton edge='end' onClick={handleCopy}>
                    <ContentCopy sx={{ width: '15px', height: '15px'}}/>
                </IconButton>
            </Stack>
            <Button
                variant="contained"
                onClick={handleClose}
                sx={{ mt: 2, ml: 2, color: 'white', backgroundColor: "#1C1A1B", borderRadius: '20px', width: '100px' }}
            >
                Đóng
            </Button>
        </DialogComponent>
    )
}

export default DialogConfirmPassword;
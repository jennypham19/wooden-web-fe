import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DialogComponent from "@/components/DialogComponent";
import { COLORS } from "@/constants/colors";

interface DialogConfirmProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onAgree: () => void;
}

const DialogConfirm: React.FC<DialogConfirmProps> = (props) => {
    const { open, onClose, title, onAgree } = props;
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveFooter={false}
            isActiveHeader={false}
            isCenter={false}
            maxWidth='xs'
        >
            <Typography fontWeight={700}>{title}</Typography>
            <Box mt={1} display='flex' justifyContent='center'>
                <Button
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, mr: 1.5, width: 100 }}
                    onClick={onAgree}
                >
                    Đồng ý
                </Button>
                <Button
                    sx={{ bgcolor: COLORS.BUTTON, width: 100 }}
                    onClick={onClose}
                >
                    Hủy
                </Button>
            </Box>
        </DialogComponent>
    )
}

export default DialogConfirm;
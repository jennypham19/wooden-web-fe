import { CircularProgress, Backdrop as MuiBackdrop, BackdropProps as MuiBackdropProps } from "@mui/material";
import React from "react";

interface BackdropProps extends MuiBackdropProps{
    open: boolean
}

const Backdrop: React.FC<BackdropProps> = ({ open }) => {
    return (
        <MuiBackdrop
            open={open}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        >
            <CircularProgress color="inherit"/>
        </MuiBackdrop>
    )
}

export default Backdrop;
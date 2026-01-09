import { Box, SxProps } from "@mui/material";
import React, { useState, VideoHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";


interface CommonVideoProps extends VideoHTMLAttributes<HTMLVideoElement>{
    fallbackSrc?: string;
    sx?: SxProps;
    borderRadius?: string | number;
    route?: string,
    autoPlay?: boolean,
    controls?: boolean,
}

const CommonVideo: React.FC<CommonVideoProps> = ({
    src,
    fallbackSrc,
    sx= {},
    onError,
    borderRadius,
    route,
    autoPlay = false,
    controls = false,
    ...rest
}) => {
    const navigate = useNavigate()
    const [videoSrc, setVideoSrc] = useState(src);

    const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        setVideoSrc(fallbackSrc);
        if(onError) onError(e)
    }

    return(
        <Box
            component='video'
            src={videoSrc}
            autoPlay={autoPlay}
            loop
            muted
            playsInline
            controls={controls}
            onError={handleError}
            onClick={() => route && navigate(route)}
            sx={{
                maxWidth: '100%',
                height:'auto',
                borderRadius: borderRadius,
                cursor: 'pointer',
                objectFit: 'fill',
                ...sx
            }}
            {...rest}
        />
    )
}

export default CommonVideo;
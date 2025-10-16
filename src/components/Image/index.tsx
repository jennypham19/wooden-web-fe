import { Box, SxProps } from "@mui/material";
import React, { ImgHTMLAttributes, useState } from "react";
import { useNavigate } from "react-router-dom";


interface CommonImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    fallbackSrc?: string;
    sx?: SxProps;
    borderRadius?: string;
    route?: string
}

const CommonImage: React.FC<CommonImageProps> = ({
    src,
    alt = 'image',
    fallbackSrc,
    sx= {},
    onError,
    borderRadius,
    route,
    ...rest
}) => {
    const navigate = useNavigate()
    const [imgSrc, setImgSrc] = useState(src);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setImgSrc(fallbackSrc);
        if(onError) onError(e)
    }

    return(
        <Box
            component='img'
            src={imgSrc}
            alt={alt}
            loading="lazy"
            onError={handleError}
            onClick={() => route && navigate(route)}
            sx={{
                maxWidth: '100%',
                height:'auto',
                borderRadius: borderRadius,
                objectFit: 'fill',
                ...sx,
                cursor: 'pointer'
            }}
            {...rest}
        />
    )
}

export default CommonImage;
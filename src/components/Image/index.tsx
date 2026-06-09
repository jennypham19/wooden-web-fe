import { Box, SxProps } from "@mui/material";
import React, { ImgHTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface CommonImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    fallbackSrc?: string;
    sx?: SxProps;
    borderRadius?: string | number;
    route?: string,
    handleFunt?: (e: React.MouseEvent<HTMLImageElement>) => void,
}

const CommonImage: React.FC<CommonImageProps> = ({
    src,
    alt = 'image',
    fallbackSrc,
    sx= {},
    onError,
    borderRadius,
    route,
    handleFunt,
    ...rest
}) => {
    const navigate = useNavigate()
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setImgSrc(fallbackSrc);
        if(onError) onError(e)
    }

    const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
        if(handleFunt) handleFunt(e);
        if(route) navigate(route);
    }

    return(
        <Box
            component='img'
            src={imgSrc}
            alt={alt}
            loading="lazy"
            onError={handleError}
            onClick={handleClick}
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
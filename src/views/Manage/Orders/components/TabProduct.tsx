import { IProduct } from "@/types/product";
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface TabProductProps {
    viewMode: any;
    onChange: (mode: any) => void;
    data: any[];
    onId: (id: string) => void;
}

const TabProduct: React.FC<TabProductProps> = ({ viewMode, onChange, data, onId }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    
    const handleChange = (index: number, data: any) => {
        onChange(index);
        onId(data.id)
    }
    return (
        <Box
            display='flex'
            flexDirection={isSmall ? "column" : "row"}
            alignItems='center'
            gap={2}
        >
            {data.map((item, index) => (
                viewMode === index ? (
                    <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer',borderBottom: "3px solid black", pb: '2px' }} onClick={() => handleChange(index, item)}>
                        <Typography fontWeight={500} fontStyle='italic' fontSize='15px'>{item.name}</Typography>
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer',borderBottom: "3px solid grey", pb: '2px' }} onClick={() => handleChange(index, item)}>
                        <Typography fontStyle='italic' fontSize='15px'>{item.name}</Typography>
                    </Box>
                )
            ))}
        </Box>
    )
}

export default TabProduct;
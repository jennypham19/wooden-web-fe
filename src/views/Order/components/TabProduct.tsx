import { COLORS } from '@/constants/colors';
import { CategoryType } from '@/types/tab';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { ProductViewModeProps } from '..';


interface Props {
    viewMode: CategoryType;
    onChange: (mode: CategoryType) => void;
    DataViewMode: ProductViewModeProps[]
}

const TabProduct: React.FC<Props> = ({ viewMode, onChange, DataViewMode }) => {
    const handleChange = (index: number) => {
        onChange(index as CategoryType);
    }
    return (
        <Box
            display='flex'
            flexDirection={"row"}
            alignItems='center'
            gap={5}
            borderBottom='1px solid #e9e4e4'
        >
            {DataViewMode.map((item, index) => (
                viewMode === index ? (
                    <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer',borderBottom: `1px solid ${COLORS.BUTTON}`, pb: '2px' }} onClick={() => handleChange(index)}>
                        {item.icon}
                        <Typography sx={{ color: COLORS.BUTTON }} fontWeight={500} fontSize='14px'>{item.label}</Typography>
                    </Box>
                ) : (
                    <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer', pb: '2px' }} onClick={() => handleChange(index)}>
                        {item.icon}
                        <Typography fontSize='14px'>{item.label}</Typography>
                    </Box>
                )
            ))}
        </Box>
    );
};

export default TabProduct;
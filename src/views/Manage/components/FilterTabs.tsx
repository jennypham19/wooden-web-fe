import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface FilterTabsProps {
    viewMode: any;
    onChange: (mode: any) => void;
    data: any[]
}

const FilterTabs: React.FC<FilterTabsProps> = ({ viewMode, onChange, data }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const handleChange = (newValue: string) => {
        onChange(newValue as any);
    }
    return (
        <Box
            display='flex'
            flexDirection={isSmall ? "column" : "row"}
            alignItems='center'
            gap={2}
        >
            {data.map((item) => (
                viewMode === item.value ? (
                    <Box display="flex" alignItems="center" gap={1} sx={{ cursor: 'pointer',borderBottom: "3px solid black", pb: '2px' }} onClick={() => handleChange(item.value)}>
                        <Typography variant="body1" fontWeight={700}>{item.label}</Typography>
                    </Box>
                ) : (
                    <Button
                        fullWidth={isSmall}
                        variant="outlined"
                        onClick={() => handleChange(item.value)}
                        sx={{
                            borderColor: 'black',
                            color: 'black',
                            fontSize: '14px',
                            bgcolor: '#fff'
                        }}
                    >
                        {item.label}
                    </Button>
                )
            ))}
        </Box>
    )
}

export default FilterTabs;
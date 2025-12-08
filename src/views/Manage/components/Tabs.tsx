import { COLORS } from "@/constants/colors";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface TabsProps {
    viewMode: any;
    onChange: (mode: any) => void;
    data: any[],
}

const Tabs: React.FC<TabsProps> = ({ viewMode, onChange, data }) => {
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
                    <Button
                        fullWidth={isSmall}
                        variant="contained"
                        onClick={() => handleChange(item.value)}
                        sx={{
                            color: '#fff',
                            fontSize: '14px',
                            bgcolor: COLORS.BUTTON,
                            px: 2,
                            borderRadius: 5,
                            pt: 1
                        }}
                        startIcon={item.icon}
                    >
                        {item.label}
                    </Button>
                ) : (
                    <Button
                        fullWidth={isSmall}
                        variant="outlined"
                        onClick={() => handleChange(item.value)}
                        sx={{
                            borderColor: 'black',
                            color: 'black',
                            fontSize: '14px',
                            bgcolor: '#fff',
                            px: 2,
                            borderRadius: 5,
                            pt: 1
                        }}
                        startIcon={item.icon}
                    >
                        {item.label}
                    </Button>
                )
            ))}
        </Box>
    )
}

export default Tabs;
import IconButton from "@/components/IconButton/IconButton";
import { NavigateNext } from "@mui/icons-material";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface OverviewDataProps {
    title: string;
    children: React.ReactNode;
    onShowAll: () => void;
}

const OverviewData: React.FC<OverviewDataProps> = ({
    title, children, onShowAll
}) => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'));
    return(
        <>
            {lgUp ? (
                <Box
                    pt={1.5}
                    px={2}
                    onClick={onShowAll}
                    sx={{ cursor: 'pointer'}}
                    display='flex'
                    justifyContent='space-between'
                >
                    <Typography variant="h6" fontWeight={600}>{title}</Typography>
                    <Stack>
                        <Typography pt={1} fontWeight={600} variant="subtitle2">Xem thêm</Typography>
                        <IconButton
                            handleFunt={onShowAll}
                            icon={<NavigateNext sx={{ width: '28px', height: '28px'}}/>}
                        />
                    </Stack>
                </Box>
            ) : (
                <Box
                    pt={1.5}
                    px={1}
                    onClick={onShowAll}
                    sx={{ cursor: 'pointer'}}
                    display='flex'
                    justifyContent='space-between'
                >
                    <Typography variant="h6" fontWeight={600}>{title}</Typography>
                    <IconButton
                        handleFunt={onShowAll}
                        icon={<NavigateNext sx={{ width: '28px', height: '28px'}}/>}
                        tooltip="Xem thêm"
                    />
                </Box>
            )}
            {children}
        </>
    )
}

export default OverviewData;
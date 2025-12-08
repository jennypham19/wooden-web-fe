import { Box, Stack, StackProps, SxProps, Theme, Typography } from "@mui/material";

interface LabeledStackProps{
    label: string;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
    stackProps?: StackProps
}

const LabeledStack = (props: LabeledStackProps) => {
    const { label, children, sx, stackProps } = props;
    return(
        <Box sx={{ position: 'relative', mt: 3, ...sx}}>
            {/* Label đặt trên border */}
            <Typography
                component='div'
                sx={{
                    position: 'absolute',
                    top: -10,
                    left: 16,
                    bgcolor: 'background.paper',
                    px: 0.8,
                    fontSize: 14,
                    color: 'text.secondary',
                    fontWeight: 500
                }}
            >
                {label}
            </Typography>
            {/* Border + nội dung */}
            <Box
                sx={{
                    border: '1px solid #000',
                    // border: '1px solid rgba(0,0,0,0.23)',
                    borderRadius: 2,
                    
                }}
            >
                <Stack spacing={2} {...stackProps}>
                    {children}
                </Stack>
            </Box>
        </Box>
    )
}

export default LabeledStack;
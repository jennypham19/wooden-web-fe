import { COLORS } from "@/constants/colors";
import { Box, IconButton, Paper, Typography } from "@mui/material";

const Milestones = () => {
    return(
        <Paper sx={{ mx: { xs: 3, md: 0 }, p: 2 }}>
            <Box display='flex' flexDirection='row' gap={1}>
                <IconButton sx={{ borderRadius: '50%', bgcolor: COLORS.BUTTON, color: '#FFF', width: 20, height: 20 }}>
                    <Typography variant="caption" fontWeight={600}>4</Typography>
                </IconButton>
                <Typography variant="subtitle2" fontWeight={600}>Các mốc sản xuất</Typography>
            </Box>
        </Paper>
    )
}

export default Milestones;
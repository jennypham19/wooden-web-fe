import { COLORS } from "@/constants/colors";
import { Box, IconButton, Paper, Typography } from "@mui/material";

const ListOfBoms = () => {
    return(
        <Paper sx={{ mx: { xs: 3, md: 0 }, p: 2, mb: 2.5 }}>
            <Box display='flex' flexDirection='row' gap={1}>
                <IconButton sx={{ borderRadius: '50%', bgcolor: COLORS.BUTTON, color: '#FFF', width: 20, height: 20 }}>
                    <Typography variant="caption" fontWeight={600}>3</Typography>
                </IconButton>
                <Typography variant="subtitle2" fontWeight={600}>Danh sách BOMs</Typography>
            </Box>
        </Paper>
    )
}

export default ListOfBoms;
import Page from "@/components/Page";
import App from "./components/IssueManagement";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import useAuth from "@/hooks/useAuth";
import avatar1 from '@/assets/images/users/avatar-1.png';
import { getRoleLabel } from "@/utils/labelEntoVni";
import { AccountCircle, FormatListBulleted, Security } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { COLORS } from "@/constants/colors";
import { ROLE } from "@/constants/roles";
import Profile from "./components/Profile";
import PrivateAndSecure from "./components/PrivateAndSecure";
import ListProfileEmployee from "./components/ListProfileEmployee";


const Information = () => {
    const { profile } = useAuth();
    const location = window.location.pathname;
    const [openShowItem, setOpenShowItem] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });
    
    useEffect(() => {
        if(location.includes('information')) {
            setOpenShowItem({ open: true, type: 'profile'})
        }
    }, [location, setOpenShowItem])

    return(
        <Page title="Thông tin cá nhân">
            <Grid sx={{ m: 2 }} container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Paper elevation={2} sx={{ bgcolor: '#FFFAE4', p: 2, borderRadius: 2}}>
                        <Box sx={{ p: 2, textAlign: 'center'}}>
                            <Avatar
                                alt={profile?.fullName}
                                src={profile?.avatarUrl || avatar1}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    mx: 'auto',
                                    mb: 1,
                                    border: '2px solid',
                                    borderColor: 'divider',
                                    borderRadius: '50%'
                                }}
                            />
                            <Typography fontWeight={600} variant="h6" component='div'>
                                {profile?.fullName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize'}}>
                                {getRoleLabel(profile?.role)}
                            </Typography>
                            
                        </Box>
                        <Box sx={{ mt: 2, textAlign: 'center', gap: 1 }} whiteSpace="nowrap" display="flex" flexDirection="column">
                            <Button
                                fullWidth
                                onClick={() => setOpenShowItem({ open: true, type: 'profile'})} 
                                sx={{ 
                                    bgcolor: openShowItem.open && openShowItem.type === 'profile' ? `${COLORS.BUTTON}` : 'transparent',
                                    py: 1, px: 1.5, cursor: 'pointer', borderRadius: 6,
                                    color: openShowItem.open && openShowItem.type === 'profile' ? '#fff' : 'inherit',
                                    '&:hover': { 
                                        bgcolor: openShowItem.open && openShowItem.type === 'profile' ? `${COLORS.BUTTON}` : 'rgba(0,0,0,0.1)'
                                    },
                                }}
                                startIcon={<AccountCircle/>}
                            >
                                Thông tin cá nhân
                            </Button>
                            <Button
                                fullWidth
                                onClick={() => setOpenShowItem({ open: true, type: 'private'})} 
                                sx={{ 
                                    bgcolor: openShowItem.open && openShowItem.type === 'private' ? `${COLORS.BUTTON}` : 'transparent',
                                    color: openShowItem.open && openShowItem.type === 'private' ? '#fff' : 'inherit',
                                    '&:hover': { 
                                        bgcolor: openShowItem.open && openShowItem.type === 'private' ? `${COLORS.BUTTON}` : 'rgba(0,0,0,0.1)'
                                    },
                                    py: 1, px: 1.5, cursor: 'pointer', borderRadius: 6,

                                }}
                                startIcon={<Security/>}
                            >
                                Riêng tư & bảo mật
                            </Button>
                            {profile?.role === ROLE.ADMIN && (
                                <Button
                                    fullWidth
                                    onClick={() => setOpenShowItem({ open: true, type: 'list-user'})} 
                                    sx={{ 
                                        bgcolor: openShowItem.open && openShowItem.type === 'list-user' ? `${COLORS.BUTTON}` : 'transparent',
                                        color: openShowItem.open && openShowItem.type === 'list-user' ? '#fff' : 'inherit',
                                        '&:hover': { 
                                            bgcolor: openShowItem.open && openShowItem.type === 'list-user' ? `${COLORS.BUTTON}` : 'rgba(0,0,0,0.1)'
                                        },
                                        py: 1, px: 1.5, cursor: 'pointer', borderRadius: 6,

                                    }}
                                    startIcon={<FormatListBulleted/>}
                                >
                                    Danh sách thông tin
                                </Button> 
                            )} 
                        </Box>                           
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                    {openShowItem.open && openShowItem.type === 'profile' && profile && (
                        <Profile user={profile}/>
                    )}
                    {openShowItem.open && openShowItem.type === 'private' && (
                        <PrivateAndSecure/>
                    )}
                    {openShowItem.open && openShowItem.type === 'list-user' && (
                        <ListProfileEmployee/>
                    )}
                </Grid>
            </Grid>
        </Page>
    )
}

export default Information;
import { useAppSelector } from "@/store";
import { Avatar, Box, Skeleton, Typography } from "@mui/material";
import avatar1 from '@/assets/images/users/avatar-1.png';
import { getPathImage } from "@/utils/url";
import { getRoleLabel } from "@/utils/labelEntoVni";

const ProfileSection = () => {
    const { profile, isInitialized } = useAppSelector((state) => state.auth);

    if(!isInitialized || !profile) {
        return (
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1}}>
                <Skeleton variant="circular" width={80} height={80}/>
                <Skeleton variant="text" sx={{ fontSize: '1rem'}} width='80%'/>
            </Box>
        )
    } 

    return (
        <Box sx={{ p: 2, textAlign: 'center', mt: 5}}>
            <Avatar
                alt={profile.fullName}
                src={profile.avatarUrl || avatar1}
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
            <Typography variant="h6" component='div'>
                {profile.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize'}}>
                {getRoleLabel(profile.role)}
            </Typography>
        </Box>
    )
}

export default ProfileSection;
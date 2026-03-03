import { IUser } from "@/types/user";
import { Divider, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"

interface ProfileProps {
    user: IUser
}
const Profile = ({ user }: ProfileProps) => {
    
    return(
        <Paper elevation={2} sx={{ bgcolor: '#fff', py: 2, px: 4, borderRadius: 2}}>
            <Typography variant="h6" fontWeight={600}>Thông tin cá nhân</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1}}>
                Quản lý thông tin cá nhân của bạn, bao gồm tên, email, số điện thoại và các thông tin khác và cập nhật chi tiết về tài khoản của bạn.
            </Typography>
            <Divider sx={{ mt: 3 }}/>
            <Grid container spacing={2} sx={{ mt: 1}}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2">HỌ</Typography>
                    <Typography variant="body2" color="text.secondary">{user.fullName.split(' ').slice(0, -2).join(' ')}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" fontWeight={500}>TÊN</Typography>
                    <Typography variant="body2" color="text.secondary">{user.fullName.split(' ').slice(1).join(' ')}</Typography>
                </Grid>
            </Grid>
            <Divider sx={{ mt: 2 }}/>
        </Paper>  
    )
}

export default Profile; 
import { IUser } from "@/types/user";
import DateTime from "@/utils/DateTime";
import { getRoleLabel } from "@/utils/labelEntoVni";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/default-avatar.jpg";

interface CardAccountDataProps{
    account: IUser;
    onDetail?: (account: IUser) => void;
}

const CardAccountData = (props: CardAccountDataProps) => {
    const { account, onDetail } = props;
    return(
        <Card onClick={() => account && onDetail && onDetail(account)} sx={{ p: 2, borderRadius: 3, boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.2)", cursor: 'pointer'}}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Box sx={{ margin: 'auto 0'}}>
                        <Avatar
                            src={account.avatarUrl !== null ? account.avatarUrl : avatar}
                            sx={{ width: 80, height: 80, borderRadius: '50%' }}
                        />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Box display='flex' flexDirection='column'>
                        <Stack mb={1} display='flex' justifyContent='space-between'>
                            <Typography fontWeight={600}>{account.fullName}</Typography>
                        </Stack>
                        <Stack mb={1} display='flex' justifyContent='space-between'>
                            <Typography fontSize='15px'>{DateTime.FormatDate(account.dob)}</Typography>
                            <Typography fontSize='15px'>{account.code}</Typography>
                        </Stack>
                        <Typography fontSize='15px' mb={1}>{account.email}</Typography>
                        <Stack mb={1} display='flex' justifyContent='space-between'>
                            <Typography fontSize='15px'>{`Phòng: ${account.department}`}</Typography>
                            <Typography fontSize='15px'>{getRoleLabel(account.role)}</Typography>
                        </Stack>
                    </Box>
                </Grid>
            </Grid>
        </Card> 
    )
}

export default CardAccountData;
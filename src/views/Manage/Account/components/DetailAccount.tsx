import DialogComponent from "@/components/DialogComponent";
import { IUser } from "@/types/user";
import DateTime from "@/utils/DateTime";
import { getRenderLabel, getRoleLabel } from "@/utils/labelEntoVni";
import { Avatar, Box, Card, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/default-avatar.jpg";

interface DetailAccountProps{
    account: IUser;
    works: string[];
    open: boolean;
    onClose: () => void;
}

const DetailAccount = (props: DetailAccountProps) => {
    const { account, works, open, onClose } = props;
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveFooter={false}
            dialogTitle="Chi tiết tài khoản"
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Box display='flex' justifyContent='space-between'>
                        <Avatar
                            src={account.avatarUrl !== null ? account.avatarUrl : avatar}
                            sx={{ width: 80, height: 80, borderRadius: '50%' }}
                        />
                        <Box sx={{ height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Chip sx={{ margin: 'auto 0'}} color="success" label={getRoleLabel(account.role)}></Chip>
                        </Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box display='flex' flexDirection='column'>
                        <Typography mb={1} fontWeight={600}>{account.fullName}</Typography>
                        <Stack mb={1} display='flex' justifyContent='space-between'>
                            <Typography fontSize='15px'>{DateTime.FormatDate(account.dob)}</Typography>
                            <Typography fontSize='15px'>{getRenderLabel(account.gender)}</Typography>
                        </Stack>
                        <Stack mb={1} display='flex' justifyContent='space-between'>
                            <Typography fontSize='15px'>{account.code}</Typography>
                            <Typography fontSize='15px'>{account.phone}</Typography>
                        </Stack>
                        <Stack mb={1} display='flex' justifyContent='space-between'>
                            <Typography fontSize='15px'>{account.email}</Typography>
                            {account.address && <Typography fontSize='15px'>{account.address}</Typography>}
                        </Stack>
                        <Stack mb={1} display='flex' justifyContent='space-between'>
                            <Typography fontSize='15px'>{`Phòng: ${account.department}`}</Typography>
                            <Typography fontSize='15px'>{getRoleLabel(account.role)}</Typography>
                        </Stack>
                        {works.map((work, index) => (
                            <Stack>
                                {works.length - 1 > index  && (<Typography>●</Typography>)}
                                <Typography key={index} fontSize='15px'>{`${work}${works.length - 1 > index ? '.' : ''}`}</Typography>
                            </Stack>
                        ))}
                    </Box>
                </Grid>
            </Grid>   
        </DialogComponent>
    )
}

export default DetailAccount;
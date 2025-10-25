import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import OverviewData from "../../components/OverviewData";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/default-avatar.jpg";
import DateTime from "@/utils/DateTime";
import { getRoleLabel } from "@/utils/labelEntoVni";
import { useState } from "react";
import AllManagedAccount from "../../Account/components/AllManagedAccount";
import { useDataList } from "@/hooks/useDataList";
import { IUser } from "@/types/user";
import { getAccounts } from "@/services/user-service";
import AllDecentralizedAccount from "../../Account/components/AllDecentralizedAccount";

const DecentralizationAccountManagedByAdmin = () => {
    const {
        listData,
        loading,
        error,
        page,
        rowsPerPage,
        fetchData
    } = useDataList<IUser>((params) => getAccounts(params), 6, 'all');

    const [showAccount, setShowAccount] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    })
    const [showAll, setShowAll] = useState(false);
    const handleOpenManagedAccount = () => {
        setShowAccount({ type: 'managed_account', open: true });
        setShowAll(true)
    }

    const handleCloseManagedAccount = () => {
        setShowAccount({ type: 'managed_account', open: false });
        setShowAll(false)
    }

    const handleOpenDecentralizedAccount = () => {
        setShowAccount({ type: 'decentralized_account', open: true });
        setShowAll(true)
    }

    const handleCloseDecentralizedAccount = () => {
        setShowAccount({ type: 'decentralized_account', open: false });
        setShowAll(false)
    }

    return(
        <Box>
            {!showAll && (
                <>
                    <OverviewData
                        title="Quản lý tài khoản"
                        onShowAll={handleOpenManagedAccount}
                    >
                        <Box px={2}>
                            <Grid container spacing={2}>
                                {listData.map((data, index) => {
                                    return(
                                        <Grid key={index} size={{ xs: 12, md: 4}}>
                                            <Card sx={{ p: 2, borderRadius: 3, boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.2)"}}>
                                                <Grid container spacing={2}>
                                                    <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                        <Box sx={{ margin: 'auto 0'}}>
                                                            <Avatar
                                                                src={data.avatarUrl !== null ? data.avatarUrl : avatar}
                                                                sx={{ width: 80, height: 80, borderRadius: '50%' }}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, md: 9 }}>
                                                        <Box display='flex' flexDirection='column'>
                                                            <Stack mb={1} display='flex' justifyContent='space-between'>
                                                                <Typography fontWeight={600}>{data.fullName}</Typography>
                                                            </Stack>
                                                            <Stack mb={1} display='flex' justifyContent='space-between'>
                                                                <Typography fontSize='15px'>{DateTime.FormatDate(data.dob)}</Typography>
                                                                <Typography fontSize='15px'>{data.code}</Typography>
                                                            </Stack>
                                                            <Typography fontSize='15px' mb={1}>{data.email}</Typography>
                                                            <Stack mb={1} display='flex' justifyContent='space-between'>
                                                                <Typography fontSize='15px'>{`Phòng: ${data.department}`}</Typography>
                                                                <Typography fontSize='15px'>{getRoleLabel(data.role)}</Typography>
                                                            </Stack>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </OverviewData>
                    <OverviewData
                        title="Phân quyền tài khoản"
                        onShowAll={handleOpenDecentralizedAccount}
                    >
                        <Box px={2}>
                            <Grid container spacing={2}>
                                {listData.map((data, index) => {
                                    return(
                                        <Grid key={index} size={{ xs: 12, md: 4}}>
                                            <Card sx={{ p: 2, borderRadius: 3, boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.2)"}}>
                                                <Grid container spacing={2}>
                                                    <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                        <Box sx={{ margin: 'auto 0'}}>
                                                            <Avatar
                                                                src={data.avatarUrl !== null ? data.avatarUrl : avatar}
                                                                sx={{ width: 80, height: 80, borderRadius: '50%' }}
                                                            />
                                                        </Box>
                                                    </Grid>
                                                    <Grid size={{ xs: 12, md: 9 }}>
                                                        <Box display='flex' flexDirection='column'>
                                                            <Stack mb={1} display='flex' justifyContent='space-between'>
                                                                <Typography fontWeight={600}>{data.fullName}</Typography>
                                                            </Stack>
                                                            <Stack mb={1} display='flex' justifyContent='space-between'>
                                                                <Typography fontSize='15px'>{DateTime.FormatDate(data.dob)}</Typography>
                                                                <Typography fontSize='15px'>{data.code}</Typography>
                                                            </Stack>
                                                            <Typography fontSize='15px' mb={1}>{data.email}</Typography>
                                                            <Stack mb={1} display='flex' justifyContent='space-between'>
                                                                <Typography fontSize='15px'>{`Phòng: ${data.department}`}</Typography>
                                                                <Typography fontSize='15px'>{getRoleLabel(data.role)}</Typography>
                                                            </Stack>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </OverviewData>
                </>
            )}
            {showAccount.type === 'managed_account' && showAccount.open && showAll && (
                <AllManagedAccount
                    onClose={handleCloseManagedAccount}
                />
            )}
            {showAccount.type === 'decentralized_account' && showAccount.open && showAll && (
                <AllDecentralizedAccount
                    onClose={handleCloseDecentralizedAccount}
                />
            )}
        </Box>
    )
}

export default DecentralizationAccountManagedByAdmin;
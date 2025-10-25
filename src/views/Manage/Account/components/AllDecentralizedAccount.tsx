import React, { useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import SearchBox from "../../components/SearchBox";
import { Alert, Box, Button, Typography } from "@mui/material";
import { People } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import FilterTabs from "../../components/FilterTabs";
import { useDataList } from "@/hooks/useDataList";
import { IUser } from "@/types/user";
import { getDecentralizedAccounts } from "@/services/user-service";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CustomPagination from "@/components/Pagination/CustomPagination";
import CardAccountData from "./CardAccountData";
import DetailDecentralizedAccount from "./DetailDecentralizedAccount";


interface AllDecentralizedAccountProps {
    onClose: () => void;
}

const DataStatus: {id: number, value: boolean, label: string}[] = [
  {
    id: 1,
    value: true,
    label: 'Tài khoản gán quyền',
  },
  {
    id: 2,
    value: false,
    label: 'Tài khoản chưa gán quyền',
  }
];

const AllDecentralizedAccount: React.FC<AllDecentralizedAccountProps> = (props) => {
    const { onClose } = props;
    const [openAccount, setOpenAccount] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    })
    const [openDetailAccount, setOpenDetailAccount] = useState(false);
    const [account, setAccount] = useState<IUser | null>(null);
    const [viewMode, setViewMode] = useState<true | false>(true);
    const {
        listData,
        searchTerm,
        loading,
        error,
        handlePageChange,
        handleSearch,
        total,
        page,
        rowsPerPage,
        fetchData
    } = useDataList<IUser>((params) => getDecentralizedAccounts(params), 8, 'all', viewMode);


    const handleOpenAddAccount = () => {
        setOpenAccount({ type: 'add', open: true });
    }
    const handleCloseAddAccount = () => {
        setOpenAccount({ type: 'add', open: false})
        fetchData(page, rowsPerPage, 'all', viewMode)
    }

    const handleOpenDetailAccount = (account: IUser) => {
        console.log("account: ", account);
        setOpenAccount({ type: 'view', open: true });
        setAccount(account)
    }

    const handleCloseDetailAccount = () => {
        setOpenAccount({ type: 'view', open: false})
        setAccount(null);
        fetchData(page, rowsPerPage, 'all', viewMode)
    }

    return(
        <Box>
            {!openAccount.open && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên,..."
                    >
                        <Button
                            variant="outlined"
                            startIcon={<People/>}
                            sx={{
                                border: `1px solid ${COLORS.BUTTON}`,
                                color: COLORS.BUTTON
                            }}
                            onClick={handleOpenAddAccount}
                        >
                            Phân quyền nhóm
                        </Button>
                    </SearchBox>
                    <NavigateBack
                        title="Quản lý tài khoản"
                        onBack={onClose}
                    />
                    <Box m={2}>
                        <FilterTabs data={DataStatus} viewMode={viewMode} onChange={setViewMode}/>
                    </Box>
                    {loading && <Backdrop open={loading}/>}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid px={1.5} container spacing={2}>
                                {listData.length === 0 ? (
                                    <Typography fontWeight={600}>Không tồn tại bản ghi nào.</Typography>
                                ) : (
                                    listData.map((account, index) => {
                                        return(
                                            <Grid key={index} size={{ xs: 12, md: 4}}>
                                                <CardAccountData
                                                    account={account}
                                                    onDetail={handleOpenDetailAccount}
                                                />
                                            </Grid>
                                        )
                                    })
                                )}
                            </Grid>
                            <Box display='flex' justifyContent='center'>
                                <CustomPagination
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={handlePageChange}
                                    count={total}
                                />
                            </Box>
                        </>
                    )}
                </>
            )}
            {openAccount.open && openAccount.type === 'view' && account && (
                <DetailDecentralizedAccount
                    open={openAccount.open}
                    onClose={handleCloseDetailAccount}
                    id={account.id}
                    works={account.work.split('.')}
                    isPermission={account.isPermission}
                />
            )}
        </Box>
    )
}

export default AllDecentralizedAccount;
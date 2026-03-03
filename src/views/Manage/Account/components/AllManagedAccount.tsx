import React, { useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import SearchBox from "../../components/SearchBox";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Add, Delete, Edit, RestartAlt, ToggleOff, ToggleOn } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import CreateAccount from "./CreateAccount";
import FilterTabs from "../../components/FilterTabs";
import { useDataList } from "@/hooks/useDataList";
import { IUser } from "@/types/user";
import { deleteAccount, disableAccount, enableAccount, getAccounts, resetPassword } from "@/services/user-service";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CustomPagination from "@/components/Pagination/CustomPagination";
import CardAccountData from "./CardAccountData";
import DetailAccount from "./DetailAccount";
import useNotification from "@/hooks/useNotification";
import DialogConfirm from "../../components/DialogConfirm";
import DialogConfirmPassword from "./DialogConfirmPassword";


interface AllManagedAccountProps {
    onClose: () => void;
}

const DataStatus: {id: number, value: string, label: string}[] = [
  {
    id: 1,
    value: 'all',
    label: 'Tất cả',
  },
  {
    id: 2,
    value: 'employee',
    label: 'Nhân viên kinh doanh',
  },
  {
    id: 3,
    value: 'factory_manager',
    label: 'Quản lý xưởng',
  },
  {
    id: 4,
    value: 'production_planner',
    label: 'Nhân viên kế hoạch sản xuất',
  },
  {
    id: 5,
    value: 'production_supervisor',
    label: 'Tổ trưởng sản xuất',
  },
  {
    id: 6,
    value: 'carpenter',
    label: 'Thợ mộc'
  },
  {
    id: 7,
    value: 'qc',
    label: 'Kiểm tra chất lượng'
  },
  {
    id: 8,
    value: 'inventory_manager',
    label: 'Quản lý kho'
  },
  {
    id: 9,
    value: 'technical_design',
    label: 'Kỹ thuật thiết kế'
  },
  {
    id: 10,
    value: 'accounting',
    label: 'Kế toán'
  }
];

const AllManagedAccount: React.FC<AllManagedAccountProps> = (props) => {
    const { onClose } = props;
    const notify = useNotification();
    const [openAccount, setOpenAccount] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    })
    const [openAccountType, setOpenAccountType] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    })
    const [openNewPasswordAccount, setOpenNewPasswordAccount] = useState(false);
    const [openDetailAccount, setOpenDetailAccount] = useState(false);
    const [newPasswordAccount, setNewPasswordAccount] = useState<IUser | null>(null);
    const [account, setAccount] = useState<IUser | null>(null);
    const [viewMode, setViewMode] = useState<'all' | 'employee' | 'factory_manager' | 'production_planner' | 'production_supervisor' | 'carpenter' | 'qc' | 'inventory_manager' | 'technical_design' | 'accounting'>('all');
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
    } = useDataList<IUser>((params) => getAccounts(params), 8, viewMode);
    
    // Tạo tài khoản
    const handleOpenAddAccount = () => {
        setOpenAccount({ type: 'add', open: true });
    }
    const handleCloseAddAccount = () => {
        setOpenAccount({ type: 'add', open: false})
        fetchData(page, rowsPerPage, viewMode)
    }

    // Chi tiết tài khoản
    const handleOpenDetailAccount = (account: IUser) => {
        setOpenDetailAccount(true)
        setAccount(account)
    }

    const handleCloseDetailAccount = () => {
        setOpenDetailAccount(false)
        setAccount(null)
    }

    // Reset mật khẩu, Kich hoạt, vô hiệu hóa, Xóa tài khoản
    const handleOpenResetPassword = (account: IUser) => {
        setAccount(account)
        setOpenAccountType({ type: 'reset_password', open: true })
    }

    const handleOpenUnactiveAccount = (account: IUser) => {
        setAccount(account)
        setOpenAccountType({ type: 'unactive', open: true })
    }

    const handleOpenActiveAccount = (account: IUser) => {
        setAccount(account)
        setOpenAccountType({ type: 'active', open: true })
    }

    const handleOpenDeletedAccount = (account: IUser) => {
        setAccount(account)
        setOpenAccountType({ type: 'delete', open: true })
    }

    const handleCloseResetPassword = () => {
        setAccount(null)
        setOpenAccountType({ type: 'reset_password', open: false })
    }

    const handleCloseUnactiveAccount = () => {
        setAccount(null)
        setOpenAccountType({ type: 'unactive', open: false })
    }

    const handleCloseActiveAccount = () => {
        setAccount(null)
        setOpenAccountType({ type: 'active', open: false })
    }

    const handleCloseDeletedAccount = () => {
        setAccount(null)
        setOpenAccountType({ type: 'delete', open: false })
    }

    const handleAgree = async() => {
        try {
            let res: any;
            switch (openAccountType.type) {
                case 'reset_password':
                    res = account && await resetPassword(account.id);
                    const newPassword = res.data.newPassword as any as IUser;
                    setNewPasswordAccount(newPassword);
                    handleCloseResetPassword()
                    setOpenNewPasswordAccount(true)
                    break;
                case 'active':
                    res = account && await enableAccount(account.id);
                    handleCloseActiveAccount()
                    break;
                case 'unactive':
                    res = account && await disableAccount(account.id);
                    handleCloseUnactiveAccount()
                    break;
                case 'delete':
                    res = account && await deleteAccount(account.id);
                    handleCloseDeletedAccount()
                    break;
            }
            notify({
                message: res.message,
                severity: 'success'
            })
            fetchData(page, rowsPerPage, viewMode);      
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
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
                            startIcon={<Add/>}
                            sx={{
                                border: `1px solid ${COLORS.BUTTON}`,
                                color: COLORS.BUTTON
                            }}
                            onClick={handleOpenAddAccount}
                        >
                            Tạo tài khoản
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
                                                >
                                                    {account.isActive ? (
                                                        <>
                                                            <Button
                                                                fullWidth
                                                                sx={{ bgcolor: COLORS.BUTTON }}
                                                                startIcon={<RestartAlt/>} 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    account && handleOpenResetPassword(account)
                                                                }}
                                                            >
                                                                Reset
                                                            </Button>
                                                            <Button
                                                                fullWidth
                                                                sx={{ bgcolor: account.isActive ? COLORS.DEACTIVED : COLORS.ACTIVED }}
                                                                startIcon={account.isActive ? <ToggleOff/> : <ToggleOn/>}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    account && handleOpenUnactiveAccount(account)
                                                                }}
                                                            >
                                                                {account.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
                                                            </Button>
                                                            <Button
                                                                fullWidth
                                                                sx={{ bgcolor: COLORS.BUTTON }}
                                                                startIcon={<Delete/>}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    account && handleOpenDeletedAccount(account)
                                                                }}
                                                            >
                                                                Xóa
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button
                                                            fullWidth
                                                            sx={{ bgcolor: account.isActive ? COLORS.DEACTIVED : COLORS.ACTIVED }}
                                                            startIcon={account.isActive ? <ToggleOff/> : <ToggleOn/>}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                account && handleOpenActiveAccount(account)
                                                            }}
                                                        >
                                                            {account.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
                                                        </Button>
                                                    )}
                                                </CardAccountData>
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
            {openAccount.open && openAccount.type === 'add' && (
                <CreateAccount
                    onClose={handleCloseAddAccount}
                />
            )}
            {openDetailAccount && account && (
                <DetailAccount
                    open={openDetailAccount}
                    onClose={handleCloseDetailAccount}
                    account={account}
                    works={account.work.split('.')}
                />
            )}
            {openAccountType.open && openAccountType.type === 'delete' && account && (
                <DialogConfirm
                    open={openAccountType.open}
                    onClose={handleCloseDeletedAccount}
                    onAgree={handleAgree}
                    title={`Bạn có chắc chắn muốn xóa tài khoản ${account.fullName} không?`}
                />
            )}
            {openAccountType.open && openAccountType.type === 'active' && account && (
                <DialogConfirm
                    open={openAccountType.open}
                    onClose={handleCloseActiveAccount}
                    onAgree={handleAgree}
                    title={`Bạn có chắc chắn muốn kích hoạt tài khoản ${account.fullName} không?`}
                />
            )}
            {openAccountType.open && openAccountType.type === 'unactive' && account && (
                <DialogConfirm
                    open={openAccountType.open}
                    onClose={handleCloseUnactiveAccount}
                    onAgree={handleAgree}
                    title={`Bạn có chắc chắn muốn vô hiệu hóa tài khoản ${account.fullName} không?`}
                />
            )}
            {openAccountType.open && openAccountType.type === 'reset_password' && account && (
                <DialogConfirm
                    open={openAccountType.open}
                    onClose={handleCloseResetPassword}
                    onAgree={handleAgree}
                    title={`Bạn có chắc chắn muốn đặt lại mật khẩu tài khoản ${account.fullName} không?`}
                />
            )}
            {openNewPasswordAccount && newPasswordAccount && (
                <DialogConfirmPassword
                    open={openNewPasswordAccount} 
                    handleClose={() => { setOpenNewPasswordAccount(false)}}
                    user={newPasswordAccount}
                />
            )}
        </Box>
    )
}

export default AllManagedAccount;
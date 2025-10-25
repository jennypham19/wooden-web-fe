import Page from "@/components/Page";
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import SearchBox from "../components/SearchBox";
import { useCallback, useEffect, useMemo, useState } from "react";
import { COLORS } from "@/constants/colors";
import { Add, Visibility } from "@mui/icons-material";
import { ICustomer } from "@/types/customer";
import DialogAddCustomer, { FormDataCustomer } from "./components/DialogAddCustomer";
import useNotification from "@/hooks/useNotification";
import { createCustomer, getCustomers, updateCustomer } from "@/services/customer-service";
import { debounce } from "lodash";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/default-avatar.jpg";
import IconButton from "@/components/IconButton/IconButton";
import DialogEditCustomer from "./components/DialogEditCustomer";

const Customer = () => {
    const notify = useNotification();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [total, setTotal] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [openCustomer, setOpenCustomer] = useState<{open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [customer, setCustomer] = useState<ICustomer | null>(null);
    const [customers, setCustomers] = useState<ICustomer[]>([]);

    const fetchListCustomers = useCallback(async(page: number, limit: number, searchTerm?: string) => {
        setLoading(true);
        try {
            const res = await getCustomers({ page: page, limit: limit, searchTerm: searchTerm});
            const data = res.data?.data as any as ICustomer[];
            setCustomers(data);
            res.data?.total && setTotal(res.data.total)
        } catch (error: any) {
            setError(error.message)
            setCustomers([]);
            setTotal(0);
        }finally {
            setLoading(false)
        }
    }, []);

    const debounceGet = useMemo(
        () => debounce((page: number, limit: number, searchTerm?: string) => {
            fetchListCustomers(page, limit, searchTerm)
        }, 500),
        [fetchListCustomers]
    )

    useEffect(() => {
        debounceGet.cancel();
        fetchListCustomers(page, rowsPerPage);
        if(searchTerm) debounceGet(page, rowsPerPage, searchTerm);
        return () => debounceGet.cancel();
    }, [page, rowsPerPage, searchTerm])

    const handleSearch = (data: string) => {
        setSearchTerm(data.trim());
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

    // Thêm tài khoản
    const handleOpenAddCustomer = () => {
        setOpenCustomer({ open: true, type: 'add' });
    }

    const handleCloseAddCustomer = () => {
        setOpenCustomer({ open: false, type: 'add' })
    }

    // Chỉnh sửa tài khoản
    const handleOpenEditCustomer = (customer: ICustomer) => {
        setOpenCustomer({ open: true, type: 'edit' });
        setCustomer(customer)
    }

    const handleCloseEditCustomer = () => {
        setOpenCustomer({ open: false, type: 'edit' });
        setCustomer(null)
    }

    const handleSave = async(data: FormDataCustomer) => {
        const payload = { ...data }
        try {
            const res = await createCustomer(payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            handleCloseAddCustomer();
            fetchListCustomers(page, rowsPerPage)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const handleEditSave = async(id: string, data: FormDataCustomer) => {
        const payload = { ...data };
        try {
            const res = await updateCustomer(id, payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            handleCloseEditCustomer();
            fetchListCustomers(page, rowsPerPage)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }
    
    return (
        <Page title="Quản lý khách hàng">
            <SearchBox
                initialValue={searchTerm}
                onSearch={handleSearch}
                placeholder="Tìm kiếm theo tên, số điện thoại, địa chỉ..."
            >
                <Button
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                    startIcon={<Add/>}
                    onClick={handleOpenAddCustomer}
                >
                    Thêm tài khoản
                </Button>
            </SearchBox>
            {loading && <Backdrop open={loading}/>}
            {error && !loading && (
                <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
            )}
            {!loading && !error && (
                <>
                    <Grid px={1} container spacing={2}>
                        {customers.length === 0 ? (
                            <Typography fontWeight={600}>Không tồn tại bản ghi nào</Typography>
                        ) : (
                            customers?.map((customer, index) => {
                                return(
                                    <Grid key={index} size={{ xs: 12, md: 3 }}>
                                        <Card sx={{ m: 2, boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.2)", borderRadius: 4 }}>
                                            <CardContent>
                                                <Box display='flex' justifyContent='space-between'>
                                                    <Avatar
                                                        src={avatar}
                                                        sx={{ width: 80, height: 80, borderRadius: '50%' }}
                                                    />
                                                    <Box sx={{ height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                        <Typography fontWeight={600}>{customer.name}</Typography>
                                                    </Box>
                                                </Box>
                                                <Box display='flex' flexDirection='column'>
                                                    <Typography fontSize='15px' my={1}><b>Số điện thoại: </b>{customer.phone}</Typography>
                                                    <Typography fontSize='15px' mb={1}><b>Địa chỉ: </b>{customer.address}</Typography>
                                                    <Stack mb={1} display='flex' justifyContent='space-between'>
                                                        <Typography fontSize='15px'><b>Số lượng đơn hàng: </b>{customer.amountOfOrders}</Typography>
                                                        {customer.amountOfOrders !== 0 && (
                                                            <IconButton
                                                                handleFunt={() => {}}
                                                                icon={<Visibility/>}
                                                            />
                                                        )}
                                                    </Stack>
                                                </Box>
                                                <Box display='flex' justifyContent='space-between'>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, mr: 2 }}
                                                        fullWidth
                                                        onClick={() => customer && handleOpenEditCustomer(customer)}
                                                    >
                                                        Chỉnh sửa
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                                                        fullWidth
                                                    >
                                                        Xóa
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })
                        )}
                    </Grid>
                </>
            )}
            {openCustomer.type === 'add' && (
                <DialogAddCustomer
                    open={openCustomer.open}
                    onClose={handleCloseAddCustomer}
                    onSave={handleSave}
                />
            )}
            {openCustomer.type === 'edit' && customer && (
                <DialogEditCustomer
                    open={openCustomer.open}
                    onClose={handleCloseEditCustomer}
                    onSave={handleEditSave}
                    customer={customer}
                />
            )}
        </Page>
    )
}

export default Customer;
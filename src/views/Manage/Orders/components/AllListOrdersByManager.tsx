import { useFetchData } from "@/hooks/useFetchData";
import { deletedOrder, getOrdersByIdManager } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, AllInbox, Autorenew, CheckCircle,  Schedule } from "@mui/icons-material";
import NavigateBack from "../../components/NavigateBack";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import DialogAddOrder from "./DialogAddOrder";
import DetailOrder from "./DetailOrder";
import useAuth from "@/hooks/useAuth";
import CardDataOrder from "./CardDataOrder";
import { ROLE } from "@/constants/roles";
import CustomPagination from "@/components/Pagination/CustomPagination";
import JobInOrder from "./JobInOrder";
import Tabs from "../../components/Tabs";
import CheckedOrder from "./CheckedOrder";
import { ProccessOrder } from "@/constants/status";
import ViewProductsInOrder from "./ViewProductsInOrder";
import DialogListImageProduct from "./DialogListImageProduct";
import AddOrder from "./AddOrder";
import AddProduct from "./AddProduct";
import DialogConfirm from "../../components/DialogConfirm";
import useNotification from "@/hooks/useNotification";
import EditOrder from "./EditOrder";


interface AllListOrdersByManagerProps{
    onBack?: () => void;
}

const DataStatus: {id: number, value: string, label: string, icon: React.ReactNode}[] = [
    {
        id: 1,
        value: 'all',
        label: 'Tất cả',
        icon: <AllInbox/>
    },
    {
        id: 2,
        value: 'pending',
        label: 'Đơn hàng chưa làm',
        icon: <Schedule/>

    },
    {
        id: 3,
        value: 'in_progress',
        label: 'Đơn hàng đang làm',
        icon: <Autorenew/>
    },
    {
        id: 4,
        value: 'completed',
        label: 'Đơn hàng hoàn thành',
        icon: <CheckCircle/>

    }
]


const AllListOrdersByManager: React.FC<AllListOrdersByManagerProps> = (props) => {
    const { onBack } = props;
    const notify = useNotification();
    const { profile } = useAuth();
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all')
    const [openOrder, setOpenOrder] = useState<{ open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [viewOrder, setViewOrder] = useState(false);
    const [viewImageProducts, setViewImageProducts] = useState(false);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [openDialogDeleteOrder, setOpenDialogDeleteOrder] = useState(false);
    
    const { error, fetchData, handlePageChange, handleSearch, listData, loading, page, rowsPerPage, searchTerm, total, setLoading } = useFetchData<IOrder>(getOrdersByIdManager, 8, viewMode, profile?.id);

    // Thêm đơn hàng
    const handleOpenAddOrder = () => {
        setOpenOrder({ open: true, type: 'add' })
    }

    const handleCloseAddOrder = () => {
        setOpenOrder({ open: false, type: 'add' });
        fetchData(page, rowsPerPage, '', viewMode, profile?.id)
    }

    // Xem chi tiết đơn hàng
    const handleOpenViewOrder = (order: IOrder) => {
        setOrder(order);
        setViewOrder(true)
    }

    const handleCloseViewOrder = () => {
        setOrder(null);
        setViewOrder(false)
    }

    // Chỉnh sửa đơn hàng
    const handleOpenEditOrder = (order: IOrder) => {
        setOrder(order);
        setOpenOrder({ open: true, type: 'edit' })
    }

    const handleCloseEditOrder = () => {
        setOrder(null);
        setOpenOrder({ open: false, type: 'edit' })
    }

    // Add product
    const handleOpenAddProduct = (order: IOrder) => {
        setOrder(order);
        setOpenOrder({ open: true, type: 'add-product'})
    }

    const handleCloseAddProduct = () => {
        setOrder(null);
        setOpenOrder({ open: false, type: 'add-product' })
        fetchData(page, rowsPerPage, '', viewMode, profile?.id)
    }

    // Job order
    const handleOpenJobOrder = (order: IOrder) => {
        setOrder(order);
        setOpenOrder({ open: true, type: 'job-order' });
    }

    const handleCloseJobOrder = () => {
        setOrder(null);
        setOpenOrder({ open: false, type: 'job-order' });
        fetchData(page, rowsPerPage, '', viewMode, profile?.id)
    }

    {/* Checked order */}
    const handleOpenCheckedOrder = (order: IOrder) => {
        setOrder(order);
        setOpenOrder({ open: true, type: 'checked-order'})
    }

    const handleCloseCheckedOrder = () => {
        setOrder(null);
        setOpenOrder({ open: false, type: 'checked-order' });
        fetchData(page, rowsPerPage, '', viewMode, profile?.id)
    };

    {/* View order */}
    const handleOpenViewProduct = (order: IOrder) => {
        setOrder(order);
        setOpenOrder({ open: true, type: 'view-product' })
    }

    const handleCloseViewProduct = () => {
        setOrder(null);
        setOpenOrder({ open: false, type: 'view-product' })
    }

    // view image products
    const handleOpenViewImageProducts = (order: IOrder) => {
      setOrder(order);
      setViewImageProducts(true)
    }

    const handleCloseViewImageProducts = () => {
      setOrder(null);
      setViewImageProducts(false)
    }

    const renderActionButton = (order: IOrder) => {
        if(profile && profile.role !== ROLE.FACTORY_MANAGER) return null;
        
        switch (order.proccess) {
            case ProccessOrder.NOT_START_0:
                return (
                    <Box display='flex' justifyContent='space-between' gap={1}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            onClick={(e) => {
                                e.stopPropagation()
                                order && handleOpenJobOrder(order)
                            }}
                        >
                            Thêm công việc
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            onClick={(e) => {
                                e.stopPropagation()
                                order && handleOpenEditOrder(order)
                            }}
                        >
                            Chỉnh sửa
                        </Button>
                    </Box>
                )
            case ProccessOrder.IN_PROGRESS_25:
                return (
                    <Box display='flex' justifyContent='space-between' gap={1}>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            onClick={(e) => {
                                e.stopPropagation()
                                order && handleOpenCheckedOrder(order)
                            }}
                        >
                            Kiểm soát đơn hàng
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            onClick={(e) => {
                                e.stopPropagation()
                                order && handleOpenEditOrder(order)
                            }}
                        >
                            Chỉnh sửa
                        </Button> 

                    </Box>
                )
            case ProccessOrder.IN_PROGRESS_50:
                return (
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                        onClick={(e) => {
                            e.stopPropagation()
                            order && handleOpenCheckedOrder(order)
                        }}
                    >
                        Kiểm soát đơn hàng
                    </Button>
                )
            case ProccessOrder.IN_PROGRESS_75:
                return (
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                        onClick={(e) => {
                            e.stopPropagation();
                            order && handleOpenCheckedOrder(order)
                        }}
                    >
                        Kiểm soát đơn hàng
                    </Button>
                )
            case ProccessOrder.COMPLETED_100:
                return (
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                        onClick={(e) => {
                            e.stopPropagation();
                            order && handleOpenViewProduct(order)
                        }}
                    >
                        Xem chi tiết
                    </Button>
                )
            default:
                return null;
        }
    }

    const handleFetchData = () => {
        fetchData(page, rowsPerPage, '', '', profile?.id)
    }

    // Xóa đơn hàng
    const handleOpenDialogDeleteOrder = (order: IOrder) => {
        setOrder(order)
        setOpenDialogDeleteOrder(true)
    }

    const handleCloseDialogDeleteOrder = () => {
        setOpenDialogDeleteOrder(false);
        setOrder(null);
    }

    const handleAgree = async() => {
        setLoading(true)
        try {
            const res = order &&  await deletedOrder(order.id);
            notify({
                message: res.message,
                severity: 'success'
            });
            handleCloseDialogDeleteOrder();
            handleFetchData()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: "error"
            })
        } finally {
            setLoading(false)
        }
    }

    return(
        <Box>
            {!openOrder.open && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, mã đơn hàng..."
                    >
                        {/* {profile?.role === ROLE.EMPLOYEE && profile.role === ROLE.FACTORY_MANAGER && ( */}
                            <Button
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                                startIcon={<Add/>}
                                onClick={handleOpenAddOrder}
                            >
                                Tạo đơn hàng
                            </Button>
                        {/* )} */}
                    </SearchBox>
                    {(profile?.role === ROLE.EMPLOYEE || profile?.role === ROLE.FACTORY_MANAGER) && onBack && (
                        <NavigateBack
                            title="Danh sách đơn hàng"
                            onBack={onBack}
                        />
                    )}
                    <Box m={2}>
                        <Tabs data={DataStatus} viewMode={viewMode} onChange={setViewMode} />
                    </Box>
                        {loading && <Backdrop open={loading}/>}
                        {error && !loading && (
                            <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                        )}
                        {!loading && !error && (
                            <>
                                    <Grid container>
                                        {listData.length === 0 ? (
                                            <Typography p={2} fontWeight={700}>Không tồn tại bản ghi nào</Typography>
                                        ) : (
                                            listData.map((order, index) => (
                                                <Grid key={index} size={{ xs: 12, md: 6, lg: 4 }}>
                                                    <CardDataOrder
                                                        order={order}
                                                        onViewOrder={handleOpenViewOrder}
                                                        onViewImageProducts={handleOpenViewImageProducts}
                                                        onDeleteOrder={handleOpenDialogDeleteOrder}
                                                    >
                                                        {renderActionButton(order)}
                                                    </CardDataOrder>
                                                </Grid>                                    
                                            ))

                                        )}
                                    </Grid>
                                    <Box mt={1.5} display='flex' justifyContent='center'>
                                        <CustomPagination
                                            page={page}
                                            rowsPerPage={rowsPerPage}
                                            count={total}
                                            onPageChange={handlePageChange}
                                        />
                                    </Box>
                            </>
                        )}                   
                </>
            )}
            {openOrder.open && openOrder.type === 'add' && (
                // <DialogAddOrder
                //     open={openOrder.open}
                //     onClose={handleCloseAddOrder}
                // />
                <AddOrder
                    open={openOrder.open}
                    onClose={handleCloseAddOrder}
                />
            )}
            {openOrder.open && openOrder.type === 'edit' && order && (
                <EditOrder
                    order={order}
                    onClose={handleCloseEditOrder}
                />
            )}
            {openOrder.open && openOrder.type === 'add-product' && order && (
                <AddProduct
                    data={order}
                    onClose={handleCloseAddProduct}
                />
            )}
            {viewOrder && order && (
                <DetailOrder
                    open={viewOrder}
                    data={order}
                    onClose={handleCloseViewOrder}
                />
            )}
            {openOrder.open && openOrder.type === 'job-order' && order && (
                <JobInOrder
                    data={order}
                    onClose={handleCloseJobOrder}
                />
            )}
            {openOrder.open && openOrder.type === 'checked-order' && order && (
                <CheckedOrder
                    data={order}
                    onClose={handleCloseCheckedOrder}
                    onFetchData={handleFetchData}
                />
            )}
            {openOrder.open && openOrder.type === 'view-product' && order && (
                <ViewProductsInOrder
                    data={order}
                    onBack={handleCloseViewProduct}
                />
            )}
            {viewImageProducts && order && (
                <DialogListImageProduct
                    order={order}
                    onClose={handleCloseViewImageProducts}
                    open={viewImageProducts}
                />
            )}
            {openDialogDeleteOrder && (
                <DialogConfirm
                    open={openDialogDeleteOrder}
                    onAgree={handleAgree}
                    onClose={handleCloseDialogDeleteOrder}
                    title="Bạn thực sự muốn xóa đơn hàng? Sau khi xóa thì đơn hàng sẽ không tồn tại trên hệ thống."
                />
            )}
        </Box>
    )
}

export default AllListOrdersByManager;
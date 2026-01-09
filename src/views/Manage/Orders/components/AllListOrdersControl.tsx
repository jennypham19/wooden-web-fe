import useAuth from "@/hooks/useAuth";
import { useFetchData } from "@/hooks/useFetchData";
import { getOrders } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { AllInbox, Autorenew, CheckCircle, Schedule } from "@mui/icons-material";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import NavigateBack from "../../components/NavigateBack";
import Tabs from "../../components/Tabs";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2"
import CardDataOrderControl from "./CardDataOrderControl";
import CustomPagination from "@/components/Pagination/CustomPagination";
import DetailOrder from "./DetailOrder";
import { COLORS } from "@/constants/colors";
import ViewProductsInOrder from "./ViewProductsInOrder";
import UpdatePaymentDate from "./UpdatePaymentDate";
import { StatusOrder } from "@/constants/status";
import DialogListImageProduct from "./DialogListImageProduct";

interface AllListOrdersControlProps{
    onBack: () => void;
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

const AllListOrdersControl = (props: AllListOrdersControlProps) => {
    const { onBack } = props;
    const { profile } = useAuth();
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all')
    const [openOrder, setOpenOrder] = useState<{ open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [viewOrder, setViewOrder] = useState(false);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [viewImageProducts, setViewImageProducts] = useState(false);
    const { error, fetchData, handlePageChange, handleSearch, listData, loading, page, rowsPerPage, searchTerm, total } = useFetchData<IOrder>(getOrders, 8, viewMode);

    const handleOpenViewOrder = (order: IOrder) => {
        setOrder(order);
        setViewOrder(true)
    }

    const handleCloseViewOrder = () => {
        setOrder(null);
        setViewOrder(false)
    }

    // Xem chi tiết
    const handleOpenViewProductsInOrder = (order: IOrder) => {
        setOrder(order)
        setOpenOrder({ open: true, type: 'view-products' })
    }

    const handleCloseViewProductsInOrder = () => {
        setOrder(null)
        setOpenOrder({ open: false, type: 'view-products' })
    }

    // Chỉnh sửa
    const handleOpenUpdateOrder= (order: IOrder) => {
        setOrder(order)
        setOpenOrder({ open: true, type: 'update' })
    }

    const handleCloseUpdateOrder = () => {
        setOrder(null)
        setOpenOrder({ open: false, type: 'update' })
        fetchData(page, rowsPerPage)
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

    return(
        <Box>
            {!openOrder.open && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, mã đơn hàng..."
                    />
                    <NavigateBack
                        title="Kiểm soát đơn hàng"
                        onBack={onBack}
                    />
                    <Box m={2}>
                        <Tabs data={DataStatus} viewMode={viewMode} onChange={setViewMode}/>
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
                                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                                            <CardDataOrderControl
                                                order={order}
                                                onViewOrder={handleOpenViewOrder}
                                                onViewImageProducts={handleOpenViewImageProducts}
                                            >
                                                {order.status === StatusOrder.COMPLETED ? (
                                                    <Button
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 3 }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            order && handleOpenViewProductsInOrder(order)
                                                        }}
                                                    >
                                                        Xem chi tiết
                                                    </Button>
                                                ) : (
                                                    <Box display='flex' justifyContent='center'>
                                                        <Button
                                                            fullWidth
                                                            variant="outlined"
                                                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, mr: 2, borderRadius: 3 }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                order && handleOpenViewProductsInOrder(order)
                                                            }}
                                                        >
                                                            Xem chi tiết
                                                        </Button>
                                                        <Button
                                                            fullWidth
                                                            variant="outlined"
                                                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 3 }}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                order && handleOpenUpdateOrder(order)
                                                            }}
                                                        >
                                                            Chỉnh sửa
                                                        </Button>
                                                    </Box>
                                                )}
                                            </CardDataOrderControl>
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
            {openOrder.open && openOrder.type === 'view-products' && order && (
                <ViewProductsInOrder
                    data={order}
                    onBack={handleCloseViewProductsInOrder}
                />
            )}
            {openOrder.open && openOrder.type === 'update' && order && (
                <UpdatePaymentDate
                    data={order}
                    onClose={handleCloseUpdateOrder}
                />
            )}
            {viewOrder && order && (
                <DetailOrder
                    open={viewOrder}
                    data={order}
                    onClose={handleCloseViewOrder}
                />
            )}
            {viewImageProducts && order && (
                <DialogListImageProduct
                    order={order}
                    onClose={handleCloseViewImageProducts}
                    open={viewImageProducts}
                />
            )}
        </Box>
    )
}

export default AllListOrdersControl
import { useFetchData } from "@/hooks/useFetchData";
import { getOrdersByCarpenter } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { Alert, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { AllInbox, Autorenew, CheckCircle } from "@mui/icons-material";
import NavigateBack from "../../components/NavigateBack";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import useAuth from "@/hooks/useAuth";
import CardDataOrder from "./CardDataOrder";
import { ROLE } from "@/constants/roles";
import CustomPagination from "@/components/Pagination/CustomPagination";
import Tabs from "../../components/Tabs";
import ViewOrderByCarpenter from "./ViewOrderByCapenter";
import DialogListImageProduct from "./DialogListImageProduct";


interface AllListOrdersByCarpenterProps{
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
        value: 'in_progress',
        label: 'Đơn hàng đang làm',
        icon: <Autorenew/>
    },
    {
        id: 3,
        value: 'completed',
        label: 'Đơn hàng hoàn thành',
        icon: <CheckCircle/>

    }
]

const AllListOrdersByCarpenter: React.FC<AllListOrdersByCarpenterProps> = (props) => {
    const { onBack } = props;
    const { profile } = useAuth();
    const [viewMode, setViewMode] = useState<'all' | 'in_progress' | 'completed'>('all')
    const [openOrder, setOpenOrder] = useState<{ open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [order, setOrder] = useState<IOrder | null>(null);
    const [viewImageProducts, setViewImageProducts] = useState(false);
    
    const { error, fetchData, handlePageChange, handleSearch, listData, loading, page, rowsPerPage, searchTerm, total } = useFetchData<IOrder>(getOrdersByCarpenter, 8, viewMode, profile?.id);

    const handleOpenViewOrder = (order: IOrder) => {
        setOrder(order);
        setOpenOrder({ open: true, type: 'view'})
    }

    const handleCloseViewOrder = () => {
        setOrder(null);
        setOpenOrder({ open: false, type: 'view'})
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
                                                <Grid key={index} size={{ xs: 12, md: 4 }}>
                                                    <CardDataOrder
                                                        order={order}
                                                        onViewOrder={handleOpenViewOrder}
                                                        onViewImageProducts={handleOpenViewImageProducts}
                                                    />
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
            {openOrder.open && openOrder.type === 'view' && order && (
                <ViewOrderByCarpenter
                    data={order}
                    onBack={handleCloseViewOrder}
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

export default AllListOrdersByCarpenter;
import Backdrop from "@/components/Backdrop";
import Page from "@/components/Page";
import useAuth from "@/hooks/useAuth";
import { useFetchData } from "@/hooks/useFetchData";
import { getOrders } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { Alert, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import OverviewData from "../../components/OverviewData";
import Grid from "@mui/material/Grid2";
import CardDataOrder from "../../Orders/components/CardDataOrder";
import AllListOrders from "../../Orders/components/AllListOrders";
import DetailOrder from "../../Orders/components/DetailOrder";
import CardDataOrderControl from "../../Orders/components/CardDataOrderControl";
import AllListOrdersControl from "../../Orders/components/AllListOrdersControl";

const ManagementOrderEmployee = () => {
    const { profile } = useAuth();
    const [showAll, setShowAll] = useState(false);
    const [showOrders, setShowOrders] = useState<{ open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [viewOrder, setViewOrder] = useState(false);
    const [order, setOrder] = useState<IOrder | null>(null);

    const { error, fetchData, listData, loading, page, rowsPerPage} = useFetchData<IOrder>(getOrders);

    const handleOpenShowAllListOrders = () => {
        setShowAll(true);
        setShowOrders({ open: true, type: 'list-orders'})
    }

    const handleCloseShowAllListOrders = () => {
        setShowAll(false);
        setShowOrders({ open: false, type: 'list-orders'})
        fetchData(page, rowsPerPage)
    }

    const handleOpenShowAllCheckedOrders = () => {
        setShowAll(true);
        setShowOrders({ open: true, type: 'checked-orders'})
    }

    const handleCloseShowAllCheckedOrders = () => {
        setShowAll(false);
        setShowOrders({ open: false, type: 'checked-orders'})
        fetchData(page, rowsPerPage)
    }

    // View order
    const handleOpenViewOrder = (order: IOrder) => {
        setOrder(order);
        setViewOrder(true)
    }

    const handleCloseViewOrder = () => {
        setOrder(null);
        setViewOrder(false)
    }
    return(
        <Box>
            {!showAll && (
                <>
                    {loading && <Backdrop open={loading}/>}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <OverviewData
                                title="Danh sách đơn hàng"
                                onShowAll={handleOpenShowAllListOrders}
                            >
                                <Grid container spacing={2}>
                                    {listData.length === 0 ? (
                                        <Typography p={2} fontWeight={700}>Không tồn tại bản ghi nào</Typography>
                                    ) : (
                                        listData.slice(0,3).map((order, index) => (
                                            <Grid key={index} size={{ xs: 12, md: 4 }}>
                                                <CardDataOrder
                                                    order={order}
                                                    onViewOrder={handleOpenViewOrder}
                                                />
                                            </Grid>                                    
                                        ))

                                    )}
                                </Grid>
                            </OverviewData>
                            <OverviewData
                                title="Kiểm soát đơn hàng"
                                onShowAll={handleOpenShowAllCheckedOrders}
                            >
                                <Grid container spacing={2}>
                                    {listData.length === 0 ? (
                                        <Typography p={2} fontWeight={700}>Không tồn tại bản ghi nào</Typography>
                                    ) : (
                                        listData.slice(0,3).map((order, index) => (
                                            <Grid key={index} size={{ xs: 12, md: 4 }}>
                                                <CardDataOrderControl
                                                    order={order}
                                                    onViewOrder={handleOpenViewOrder}
                                                />
                                            </Grid>
                                        ))
                                    )}
                                </Grid>
                            </OverviewData>
                        </>
                    )}   
                </>
            )}
            {showAll && showOrders.open && showOrders.type === 'list-orders' && (
                <AllListOrders
                    onBack={handleCloseShowAllListOrders}
                />
            )}
            {showAll && showOrders.open && showOrders.type === 'checked-orders' && (
                <AllListOrdersControl
                    onBack={handleCloseShowAllCheckedOrders}
                />
            )}
            {viewOrder && order && (
                <DetailOrder
                    open={viewOrder}
                    data={order}
                    onClose={handleCloseViewOrder}
                />
            )}
        </Box>
    )
}

export default ManagementOrderEmployee;
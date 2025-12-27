import { useState } from "react";



import { Alert, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import OverviewData from "../../components/OverviewData";
import AllListOrders from "../../Orders/components/AllListOrders";
import CardDataOrder from "../../Orders/components/CardDataOrder";
import DetailOrder from "../../Orders/components/DetailOrder";
import Backdrop from "@/components/Backdrop";



import useAuth from "@/hooks/useAuth";
import { useFetchData } from "@/hooks/useFetchData";
import { getOrders, getOrdersByIdManager, getOrdersWithProccess } from "@/services/order-service";
import { IOrder } from "@/types/order";
import AllListEvaluatedOrders from "../../Orders/components/AllListEvaluatedOrders";
import { useFetchOrdersWithProccess } from "@/hooks/useFetchOrdersWithProccess";
import AllListOrdersByManager from "../../Orders/components/AllListOrdersByManager";


const ManagementOrderFactoryManager = () => {
    const { profile } = useAuth();
    const [showAll, setShowAll] = useState(false);
    const [showOrders, setShowOrders] = useState<{ open: boolean, type: string}>({
        open: false,
        type: ''
    });
    const [viewOrder, setViewOrder] = useState(false);
    const [order, setOrder] = useState<IOrder | null>(null);

    const { error: errorOrders, fetchData: fetchOrders, listData: orders, loading: loadingOrder, page: pageOrders, rowsPerPage: rowsPerPageOrders } = useFetchData<IOrder>(getOrdersByIdManager, 10, '', profile?.id);
    const { error: errorOrderWithProccess, fetchData: fetchOrdersWithProccess, listData: ordersWithProccess, loading: loadingOrdersWithProccess, page: pageOrdersWithProccess, rowsPerPage: rowsPerPageOrdersWithProccess} = useFetchOrdersWithProccess<IOrder>(getOrdersWithProccess);

    {/* Danh sách đơn hàng */}
    const handleOpenShowAllListOrders = () => {
        setShowAll(true);
        setShowOrders({ open: true, type: 'list-orders'})
    }

    const handleCloseShowAllListOrders = () => {
        setShowAll(false);
        setShowOrders({ open: false, type: 'list-orders'})
        fetchOrders(pageOrders, rowsPerPageOrders, '', '', profile?.id)
    }

    {/* Đánh giá đơn hàng */}
    const handleOpenShowAllEvaluatedOrders = () => {
      setShowAll(true);
      setShowOrders({ open: true, type: 'evaluated-orders' });
    };

    const handleCloseShowAllEvalutedOrders = () => {
      setShowAll(false);
      setShowOrders({ open: false, type: 'evaluated-orders' });
      fetchOrdersWithProccess(pageOrdersWithProccess, rowsPerPageOrdersWithProccess)
    };

    // View order
    const handleOpenViewOrder = (order: IOrder) => {
        setOrder(order);
        setViewOrder(true)
    }

    const handleCloseViewOrder = () => {
        setOrder(null);
        setViewOrder(false)
    }
    return (
      <Box>
        {!showAll && (
          <>
            {loadingOrder && <Backdrop open={loadingOrder} />}
            {loadingOrdersWithProccess && <Backdrop open={loadingOrdersWithProccess} />}
            {errorOrders && !loadingOrder && (
              <Alert severity='error' sx={{ my: 2 }}>
                {errorOrders}
              </Alert>
            )}
            {errorOrderWithProccess && !loadingOrdersWithProccess && (
              <Alert severity='error' sx={{ my: 2 }}>
                {errorOrderWithProccess}
              </Alert>
            )}
            {!loadingOrder && !errorOrders && !loadingOrdersWithProccess && !errorOrderWithProccess && (
              <>
                <OverviewData title='Danh sách đơn hàng' onShowAll={handleOpenShowAllListOrders}>
                  <Grid container spacing={2}>
                    {orders.length === 0 ? (
                      <Typography p={2} fontWeight={700}>
                        Không tồn tại bản ghi nào
                      </Typography>
                    ) : (
                      orders.slice(0, 3).map((order, index) => (
                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                          <CardDataOrder order={order} onViewOrder={handleOpenViewOrder} />
                        </Grid>
                      ))
                    )}
                  </Grid>
                </OverviewData>
                <OverviewData
                  title='Đánh giá đơn hàng'
                  onShowAll={handleOpenShowAllEvaluatedOrders}
                >
                  <Grid container spacing={2}>
                    {ordersWithProccess.length === 0 ? (
                      <Typography p={2} fontWeight={700}>Không tồn tại bản ghi nào</Typography>
                    ) : (
                      ordersWithProccess.slice(0, 3).map((orderWithProccess, idx) => (
                        <Grid key={idx} size={{ xs: 12, md: 4 }}>
                          <CardDataOrder order={orderWithProccess} onViewOrder={handleOpenViewOrder}/>
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
          <AllListOrdersByManager onBack={handleCloseShowAllListOrders} />
        )}
        {showAll && showOrders.open && showOrders.type === 'evaluated-orders' && (
          <AllListEvaluatedOrders onBack={handleCloseShowAllEvalutedOrders}/>
        )}
        {viewOrder && order && (
          <DetailOrder open={viewOrder} data={order} onClose={handleCloseViewOrder} />
        )}
      </Box>
    );
}

export default ManagementOrderFactoryManager;
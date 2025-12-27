import { useFetchOrdersWithProccess } from "@/hooks/useFetchOrdersWithProccess";
import { getOrdersWithProccess } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { AllInbox, Inventory } from "@mui/icons-material";
import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../../components/SearchBox";
import NavigateBack from "../../components/NavigateBack";
import Tabs from "../../components/Tabs";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CardDataOrder from "./CardDataOrder";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { COLORS } from "@/constants/colors";
import DetailOrder from "./DetailOrder";
import EvaluatedProductsInOrder from "./EvaluatedProductsInOrder";

interface AllListEvaluatedOrdersProps{
    onBack: () => void;
}

const DataEvaluated: {id: number, value: any, label: string, icon: React.ReactNode}[] = [
    {
        id: 1,
        value: 'all',
        label: 'Tất cả',
        icon: <AllInbox/>
    },
    {
        id: 2,
        value: true,
        label: 'Đơn hàng đã đánh giá',
        icon: <Inventory/>

    },
    {
        id: 3,
        value: false,
        label: 'Đơn hàng chưa đánh giá',
        icon: <Inventory/>
    },
]

const AllListEvaluatedOrders: React.FC<AllListEvaluatedOrdersProps> = (props) => {
    const { onBack } = props;
    const [viewMode, setViewMode] = useState<'all' | true | false>('all');
    const [viewOrder, setViewOrder] = useState(false);
    const [viewProductsInOrder, setViewProductsInOrder] = useState(false);
    const [order, setOrder] = useState<IOrder | null>(null);
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
    } = useFetchOrdersWithProccess<IOrder>((params) => getOrdersWithProccess(params), 8, viewMode);
    
    const handleOpenViewOrder = (order: IOrder) => {
        setOrder(order);
        setViewOrder(true)
    }

    const handleCloseViewOrder = () => {
        setOrder(null);
        setViewOrder(false)
    }

    /* view products in order */
    const handleOpenViewProductsInOrder = (order: IOrder) => {
        setOrder(order);
        setViewProductsInOrder(true)
    }

    const handleCloseViewProductsInOrder = () => {
        setOrder(null);
        setViewProductsInOrder(false);
        fetchData(page, rowsPerPage)
    }
    
    return(
        <Box>
            {!viewProductsInOrder && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, mã đơn hàng"
                    />
                    <NavigateBack
                        title="Đánh giá đơn hàng"
                        onBack={onBack}
                    />
                    <Box m={2}>
                        <Tabs data={DataEvaluated} viewMode={viewMode} onChange={setViewMode}/>
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
                                    listData.map((orderWithProccess, index) => (
                                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                                            <CardDataOrder
                                                order={orderWithProccess}
                                                onViewOrder={handleOpenViewOrder}
                                            >
                                                <Button
                                                    fullWidth
                                                    sx={{ bgcolor: COLORS.BUTTON, borderRadius: 3 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        orderWithProccess && handleOpenViewProductsInOrder(orderWithProccess)
                                                    }}
                                                >
                                                    Xem chi tiết
                                                </Button>
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


            {viewOrder && order && (
                <DetailOrder
                    open={viewOrder}
                    data={order}
                    onClose={handleCloseViewOrder}
                />
            )}
            {viewProductsInOrder && order && (
                <EvaluatedProductsInOrder
                    data={order}
                    onBack={handleCloseViewProductsInOrder}
                    from='order'
                />
            )}
        </Box>
    )
}

export default AllListEvaluatedOrders;
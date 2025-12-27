import { AllInbox, Inventory } from "@mui/icons-material";
import { Alert, Box, Button, Typography } from "@mui/material"
import { useState } from "react";
import Tabs from "../../components/Tabs";
import { useFetchData } from "@/hooks/useFetchData";
import { IOrder } from "@/types/order";
import { getOrdersWithWorkByIdManager } from "@/services/order-service";
import useAuth from "@/hooks/useAuth";
import SearchBox from "../../components/SearchBox";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CardDataOrder from "../../Orders/components/CardDataOrder";
import { COLORS } from "@/constants/colors";
import CustomPagination from "@/components/Pagination/CustomPagination";
import DetailOrder from "../../Orders/components/DetailOrder";
import EvaluatedProductsInOrder from "../../Orders/components/EvaluatedProductsInOrder";

const DataEvaluated: {id: number, value: string, label: string, icon: React.ReactNode}[] = [
    {
        id: 1,
        value: 'all',
        label: 'Tất cả',
        icon: <AllInbox/>
    },
    {
        id: 2,
        value: 'approved',
        label: 'Công việc đã đánh giá',
        icon: <Inventory/>

    },
    {
        id: 3,
        value: 'pending',
        label: 'Công việc chưa đánh giá',
        icon: <Inventory/>
    },
    {
        id: 4,
        value: 'rework',
        label: 'Công việc cần làm lại',
        icon: <Inventory/>
    },
]

const ManagementJobManager = () => {
    const { profile } = useAuth()
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'rework' | 'approved'>('all');
    const [viewOrder, setViewOrder] = useState(false);
    const [viewProductsInOrder, setViewProductsInOrder] = useState(false);
    const [order, setOrder] = useState<IOrder | null>(null);
    
    const { rowsPerPage, page, total, listData, loading, error, searchTerm, handlePageChange, handleSearch, fetchData } = useFetchData<IOrder>(getOrdersWithWorkByIdManager, 8, viewMode, profile?.id)

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
        fetchData(page, rowsPerPage, '', viewMode, profile?.id)
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
                                    listData.map((order, index) => (
                                        <Grid key={index} size={{ xs: 12, md: 4 }}>
                                            <CardDataOrder
                                                order={order}
                                                onViewOrder={handleOpenViewOrder}
                                            >
                                                <Button
                                                    fullWidth
                                                    sx={{ bgcolor: COLORS.BUTTON, borderRadius: 3 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        order && handleOpenViewProductsInOrder(order)
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
                    from='job'
                />
            )}
        </Box>
    )
}

export default ManagementJobManager;
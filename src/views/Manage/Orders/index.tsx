import Page from "@/components/Page";
import SearchBox from "../components/SearchBox";
import { useState } from "react";
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { Add, Visibility } from "@mui/icons-material";
import DialogAddOrder from "./components/DialogAddOrder";
import { useFetchData } from "@/hooks/useFetchData";
import { IOrder } from "@/types/order";
import { getOrders } from "@/services/order-service";
import Backdrop from "@/components/Backdrop";
import OverviewData from "../components/OverviewData";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/default-avatar.jpg"
import { getProccessOrderLabel, getStatusOrderColor, getStatusOrderLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import IconButton from "@/components/IconButton/IconButton";
import AllListOrders from "./components/AllListOrders";


const Orders = () => {
    const [showAll, setShowAll] = useState(false);
    const [showOrders, setShowOrders] = useState<{ open: boolean, type: string}>({
        open: false,
        type: ''
    })

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
    return (
        <Page title="Quản lý đơn hàng">
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
                                                <Card
                                                    sx={{ m: 2, boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.2)", borderRadius: 4 }}
                                                >
                                                    <CardContent>
                                                        <Box display='flex' justifyContent='space-between'>
                                                            <Box display='flex' flexDirection='row'>
                                                                <Avatar 
                                                                    src={avatar} 
                                                                    sx={{ width: 80, height: 80, borderRadius: '50%', mr: 1 }}
                                                                />
                                                                <Stack margin='auto 0' direction='column'>
                                                                    <Typography variant="caption">Khách hàng</Typography>
                                                                    <Typography fontSize='15px' fontWeight={600}>{order.nameCustomer}</Typography>
                                                                </Stack>
                                                            </Box>
                                                            <Box margin='auto 0'>
                                                                <Chip label={getStatusOrderLabel(order.status)} color={getStatusOrderColor(order.status).color}/>
                                                            </Box>
                                                        </Box>
                                                        <Stack mt={1} display='flex' justifyContent='space-between'>
                                                            <Typography fontSize='15px'><b>Đơn hàng:</b> {order.name}</Typography>
                                                            <Typography fontSize='15px'><b>ID đơn:</b> {order.codeOrder}</Typography>
                                                        </Stack>
                                                        <Stack mt={1} display='flex' justifyContent='space-between'>
                                                            <Typography fontSize='15px'><b>Ngày nhận:</b> {DateTime.FormatDate(order.dateOfReceipt)}</Typography>
                                                            <Typography fontSize='15px'><b>Hạn trả:</b> {DateTime.FormatDate(order.dateOfPayment)}</Typography>
                                                        </Stack>
                                                        <Stack mt={1} display='flex' justifyContent='space-between'>
                                                            <Typography fontSize='15px'><b>Tiến độ:</b> {getProccessOrderLabel(order.proccess)}</Typography>
                                                            <Typography fontSize='15px'><b>Trạng thái:</b> {getStatusOrderLabel(order.status)}</Typography>
                                                        </Stack>
                                                        <Stack mt={1} display='flex' justifyContent='space-between'>
                                                            <Typography fontSize='15px'><b>Số lượng sản phẩm:</b> {order.amount} sản phẩm/ đơn hàng</Typography>
                                                            <IconButton
                                                                handleFunt={() => {}}
                                                                icon={<Visibility/>}
                                                                height={0}
                                                            />
                                                        </Stack>
                                                        <Typography mt={1} fontSize='15px'><b>Yêu cầu:</b> {order.requiredNote}</Typography>
                                                    </CardContent>
                                                </Card>
                                            </Grid>                                    
                                        ))

                                    )}
                                </Grid>
                            </OverviewData>
                            <OverviewData
                                title="Kiểm soát đơn hàng"
                                onShowAll={handleOpenShowAllCheckedOrders}
                            >
                                <Grid container spacing={2}></Grid>
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
        </Page>
    )
}
export default Orders;
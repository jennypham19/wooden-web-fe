import { useFetchData } from "@/hooks/useFetchData";
import { getOrders } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, Visibility } from "@mui/icons-material";
import NavigateBack from "../../components/NavigateBack";
import FilterTabs from "../../components/FilterTabs";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/default-avatar.jpg"
import { getProccessOrderLabel, getStatusOrderColor, getStatusOrderLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import IconButton from "@/components/IconButton/IconButton";
import DialogAddOrder from "./DialogAddOrder";


interface AllListOrdersProps{
    onBack: () => void;
}

const DataStatus: {id: number, value: string, label: string}[] = [
    {
        id: 1,
        value: 'all',
        label: 'Tất cả'
    },
    {
        id: 2,
        value: 'pending',
        label: 'Đơn hàng chưa làm'
    },
    {
        id: 3,
        value: 'in_progress',
        label: 'Đơn hàng đang làm'
    },
    {
        id: 4,
        value: 'completed',
        label: 'Đơn hàng hoàn thành'
    }
]

const AllListOrders: React.FC<AllListOrdersProps> = (props) => {
    const { onBack } = props;
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all')
    const [openOrder, setOpenOrder] = useState<{ open: boolean, type: string}>({
        open: false,
        type: ''
    });

    const { error, fetchData, handlePageChange, handleSearch, listData, loading, page, rowsPerPage, searchTerm, total } = useFetchData<IOrder>(getOrders, 10, viewMode);

    const handleOpenAddOrder = () => {
        setOpenOrder({ open: true, type: 'add' })
    }

    const handleCloseAddOrder = () => {
        setOpenOrder({ open: false, type: 'add' });
        fetchData(page, rowsPerPage, '', viewMode)
    }

    return(
        <Box>
            {!openOrder.open && (
                <>
                    <SearchBox
                        initialValue=""
                        onSearch={() => {}}
                        placeholder="Tìm kiếm theo tên, mã đơn hàng..."
                    >
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            startIcon={<Add/>}
                            onClick={handleOpenAddOrder}
                        >
                            Tạo đơn hàng
                        </Button>
                    </SearchBox>
                    <NavigateBack
                        title="Danh sách đơn hàng"
                        onBack={onBack}
                    />
                    <Box m={2}>
                        <FilterTabs data={DataStatus} viewMode={viewMode} onChange={setViewMode} />
                    </Box>
                        {loading && <Backdrop open={loading}/>}
                        {error && !loading && (
                            <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                        )}
                        {!loading && !error && (
                            <>
                                    <Grid container spacing={2}>
                                        {listData.length === 0 ? (
                                            <Typography p={2} fontWeight={700}>Không tồn tại bản ghi nào</Typography>
                                        ) : (
                                            listData.map((order, index) => (
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
                                                                        <Typography fontSize='15px' fontWeight={600}>{order.customer.name}</Typography>
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
                            </>
                        )}                   
                </>
            )}
            {openOrder.open && openOrder.type === 'add' && (
                <DialogAddOrder
                    open={openOrder.open}
                    onClose={handleCloseAddOrder}
                />
            )}
        </Box>
    )
}

export default AllListOrders;
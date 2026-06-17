import { IOrder } from "@/types/order";
import { Avatar, Box, Card, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import avatar from "@/assets/images/users/default-avatar.jpg";
import { getProccessOrderLabel, getStatusOrderColor, getStatusOrderLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import { ProccessOrder, StatusOrder, StatusProduct } from "@/constants/status";
import { Delete, Storage, Visibility } from "@mui/icons-material";
import { IProduct } from "@/types/product";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants/roles";


interface CardDataOrderProps{
    order: IOrder
    onViewOrder: (data: IOrder) => void;
    children?: React.ReactNode;
    onViewImageProducts: (data: IOrder) => void;
    onDeleteOrder?: (data: IOrder) => void;
    onStorageOrder?: (data: IOrder) => void;
}

const CardDataOrder = (props: CardDataOrderProps) => {
    const { order, onViewOrder, children, onViewImageProducts, onDeleteOrder, onStorageOrder } = props;
    const { profile } = useAuth();
    return(
        <Card
            sx={{ m: 1, boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.2)", borderRadius: 4 }}
            onClick={() => order && onViewOrder(order)}
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
                    {(order.status === StatusOrder.PENDING ||order.proccess === ProccessOrder.IN_PROGRESS_25) && profile?.role === ROLE.ADMIN && (
                        <Box>
                            <Tooltip title="Xóa">
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        order && onDeleteOrder && onDeleteOrder(order)
                                    }}
                                >
                                    <Delete/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    {order.status === StatusOrder.COMPLETED && profile?.role === ROLE.ADMIN && (
                        <Box>
                            <Tooltip title="Lưu trữ">
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        order && onStorageOrder && onStorageOrder(order)
                                    }}
                                >
                                    <Storage/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
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
                        {order.products.every(el => el.status === StatusProduct.COMPLETED) && (
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    order && onViewImageProducts(order)
                                }}
                            >
                                <Visibility/>
                            </IconButton>
                        )}
                </Stack>
                <Typography my={1} fontSize='15px'><b>Yêu cầu:</b> {order.requiredNote}</Typography> 
                {children}
            </CardContent>
        </Card>
    )
}

export default CardDataOrder;
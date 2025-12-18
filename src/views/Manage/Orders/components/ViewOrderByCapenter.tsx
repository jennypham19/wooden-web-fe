import { IOrder, IWorkOrder } from "@/types/order";
import { Avatar, Box, Button, Chip, Paper, Stack, Tooltip, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { getDetailOrder } from "@/services/order-service";
import avatar from "@/assets/images/users/default-avatar.jpg";
import DateTime from "@/utils/DateTime";
import { getNumber, getProccessProductLabel, getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel, getStatusOrderLabel, getStatusProductColor, getStatusProductLabel } from "@/utils/labelEntoVni";
import TabProduct from "./TabProduct";
import { IProduct } from "@/types/product";
import { getDetailWorkOrderByProduct } from "@/services/product-service";
import { COLORS } from "@/constants/colors";

interface ViewOrderByCarpenterProps{
    onBack: () => void;
    data: IOrder
}

const ViewOrderByCarpenter = (props: ViewOrderByCarpenterProps) => {
    const { onBack, data } = props;
    const [order, setOrder] = useState<IOrder | null>(null);
    const [currentTab, setCurrentTab] = useState(0);
    const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
    const [workOrderError, setWorkOrderError] = useState<string>('');

    useEffect(() => {
        if(data){
            const getOrder = async() => {
                const res = await getDetailOrder(data.id);
                const newOrder = res.data as any as IOrder;
                setOrder(newOrder)
            };

            getOrder();
            handleChangeId(data.products[0].id)
            setCurrentTab(0)
        }
    }, [data])

    const handleChangeId = async(id: string) => {
        try {
            const res = await getDetailWorkOrderByProduct(id);
            const data = res.data as any as IWorkOrder;
            setWorkOrder(data);
            setWorkOrderError('');            
        } catch (error: any) {
            setWorkOrderError(error.message)
        }
    }

    return(
        <Box>
            <NavigateBack
                title="Xem chi tiết"
                onBack={onBack}
            />
            <Paper elevation={2} sx={{ p: 2, m: 2, borderRadius: 2, boxShadow: '0 0 2px 2px rgba(0,0,0,0.1)' }}>
                <Grid container spacing={2}>
                    <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size={{ xs: 12 }}>
                        <Avatar
                            src={avatar}
                            sx={{ width: 100, height: 100, borderRadius: '50%', mr: 1 }}
                        />
                    </Grid>

                    {/* -------------------- Thông tin đơn hàng --------------------- */}
                    <Grid size={{ xs: 12 }}>
                        <Typography mb={1.5} fontWeight={600}>Thông tin đơn hàng</Typography>
                        <Grid container spacing={1}>
                            <Grid size={{ xs: 12 }}>
                                <Stack direction='row'>
                                    <Typography fontSize='15px'>Tên khách hàng: </Typography>
                                    <Typography fontWeight={600} fontSize='15px'>{order?.customer.name}</Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Stack direction='row'>
                                    <Typography fontSize='15px'>Mã đơn hàng: </Typography>
                                    <Typography fontSize='15px'>{order?.codeOrder}</Typography>
                                </Stack>
                            </Grid>
                            <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: { xs: 'flex-start', md: 'center' } }} size={{ xs: 12, md: 4 }}>
                                <Stack direction='row'>
                                    <Typography fontSize='15px'>Tên đơn hàng: </Typography>
                                    <Typography fontSize='15px'>{order?.name}</Typography>
                                </Stack>
                            </Grid>
                            <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: { xs: 'flex-start', md: 'flex-end' } }} size={{ xs: 12, md: 4 }}>
                                <Stack direction='row'>
                                    <Typography fontSize='15px'>Số lượng sản phẩm: </Typography>
                                    <Typography fontSize='15px'>{order?.amount}</Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Stack direction='row'>
                                    <Typography fontSize='15px'>Ngày nhận: </Typography>
                                    <Typography fontSize='15px'>{DateTime.FormatDate(order?.dateOfReceipt)}</Typography>
                                </Stack>
                            </Grid>
                            <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, alignItems: { xs: 'flex-start', md: 'center' } }} size={{ xs: 12, md: 4 }}>
                                <Stack direction='row'>
                                    <Typography fontSize='15px'>Ngày trả: </Typography>
                                    <Typography fontSize='15px'>{DateTime.FormatDate(order?.dateOfPayment)}</Typography>
                                </Stack>
                            </Grid>
                            <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: { xs: 'flex-start', md: 'flex-end' } }} size={{ xs: 12, md: 4 }}>
                                <Stack direction='row'>
                                    <Typography fontSize='15px'>Trạng thái: </Typography>
                                    <Typography fontSize='15px'>{getStatusOrderLabel(order?.status)}</Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Stack direction='row'>
                                    <Typography fontSize='15px'>Yêu cầu: </Typography>
                                    <Typography fontSize='15px'>{order?.requiredNote}</Typography>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography mb={1} fontSize='15px'>Files tài liệu: </Typography>
                                <Stack direction='column'>
                                    {order?.inputFiles.map((inputFile, index) => (
                                        <Stack key={index}>
                                            <Typography fontSize='15px'>
                                                {index + 1}.
                                            </Typography>
                                            <Typography fontStyle='italic' component='a' href={inputFile.url} target="_blank" download fontSize='15px'>
                                                {inputFile.name}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Typography mb={1} fontSize='15px'>Link tham khảo: </Typography>
                                <Stack direction='column'>
                                    {order?.referenceLinks.map((referenceLink, index) => (
                                        <Stack key={index}>
                                            <Typography fontSize='15px'>{index + 1}.</Typography>
                                            <Typography fontStyle='italic' component='a' href={referenceLink.url} target="_blank" fontSize='15px'>
                                                {referenceLink.url}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* -------------------- Thông tin sản phẩm --------------------- */}
                    <Grid size={{ xs: 12 }}>
                        <Typography mb={1.5} fontWeight={600}>Thông tin sản phẩm</Typography>
                        {order && (
                            <TabProduct
                                viewMode={currentTab}
                                onChange={setCurrentTab}
                                data={order?.products}
                                onId={handleChangeId}
                            />
                        )}
                        {order?.products.map((product, index) => (
                            currentTab === index && (
                                <Paper sx={{ mt: 2, border: '1px solid #636161ff', p: 2, borderRadius: 3 }} >
                                    <Typography mt={1} fontSize='14px'><b>Mô tả/ Yêu cầu:</b> {product.description}.</Typography>
                                    <Typography mt={1} fontSize='14px'><b>Mục tiêu:</b> {product.target}.</Typography>

                                    {/* ------------------ Thông tin công việc ------------------ */}
                                    <Typography my={1.5} fontWeight={600}>Thông tin công việc</Typography>
                                    {workOrderError && (
                                        <Typography fontSize='14px' fontStyle='italic'>{workOrderError}.</Typography>
                                    )}
                                    {!workOrderError && workOrder !== null && (
                                        <>
                                            <Grid container spacing={1}>
                                                {/* Hàng 1 */}
                                                <Grid size={{ xs: 12 }}>
                                                    <Stack direction='row'>
                                                        <Typography fontSize='14px'>Tên công việc: </Typography>
                                                        <Typography fontSize='14px' fontWeight={600}>{product.name}</Typography>
                                                    </Stack>
                                                </Grid>

                                                {/* Hàng 2 */}
                                                <Grid size={{ xs: 12, md: 6 }}>
                                                    <Box display='flex' flexDirection='row'>
                                                        <Typography mr={1.5} display='flex' justifyContent='center' alignItems="center" fontSize='14px'>Nhân viên: </Typography>
                                                        {workOrder.workers.map((worker, idx) => (
                                                            <Tooltip key={idx} title={worker.fullName}>
                                                                <Avatar
                                                                    src={worker.avatarUrl}
                                                                    sx={{ borderRadius: '50%'}}
                                                                />
                                                            </Tooltip>
                                                        ))}
                                                    </Box>
                                                </Grid>
                                                <Grid sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end'} }} size={{ xs: 12, md: 6 }}>
                                                    <Box display='flex' flexDirection='row'>
                                                        <Typography mr={1.5} display='flex' justifyContent='center' alignItems="center" fontSize='14px'>Quản lý: </Typography>   
                                                        {workOrder.manager && (
                                                            <Tooltip title={workOrder.manager.fullName}>
                                                                <Avatar
                                                                    src={workOrder.manager.avatarUrl}
                                                                    sx={{ borderRadius: '50%'}}
                                                                />
                                                            </Tooltip> 
                                                        )}  
                                                    </Box>                                              
                                                </Grid>

                                                {/* Hàng 3 */}
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Stack direction='row'>
                                                        <Typography fontSize='14px'>Tiến độ: </Typography>
                                                        <Typography fontSize='14px'>{getProccessProductLabel(product.proccess)}</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid sx={{ display: 'flex', justifyContent:{ xs: 'flex-start', md: 'center'}, alignItems: { xs: 'flex-start', md: 'center'} }} size={{ xs: 12, md: 4 }}>
                                                    <Stack direction='row'>
                                                        <Typography fontSize='14px'>Người quản lý: </Typography>
                                                        <Typography fontSize='14px'>{Array.isArray(workOrder.manager) ? workOrder.manager : 1} người</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid sx={{ display: 'flex', justifyContent:{ xs: 'flex-start', md: 'flex-end'}, alignItems: { xs: 'flex-start', md: 'flex-end'} }} size={{ xs: 12, md: 4 }}>
                                                    <Chip
                                                        label={getStatusProductLabel(product.status)}
                                                        color={getStatusProductColor(product.status).color}
                                                    />
                                                </Grid>

                                                {/* Hàng 4 */}
                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Stack direction='row'>
                                                        <Typography fontSize='14px'>Mốc công việc: </Typography>
                                                        <Typography fontSize='14px'>0{getNumber(workOrder.workMilestone.split("_")[0])}</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid sx={{ display: 'flex', justifyContent:{ xs: 'flex-start', md: 'center'}, alignItems: { xs: 'flex-start', md: 'center'} }} size={{ xs: 12, md: 4 }}>
                                                    <Stack direction='row'>
                                                        <Typography fontSize='14px'>Nhân viên: </Typography>
                                                        <Typography fontSize='14px'>{workOrder.workers.length} người</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid size={{ xs: 12, md: 4 }}></Grid>

                                                {/* Hàng 5 */}
                                                <Grid size={{ xs: 12 }}>
                                                    <Stack direction='row'>
                                                        <Typography fontSize='14px'>Yêu cầu: </Typography>
                                                        <Typography fontSize='14px'>{product.description}</Typography>
                                                    </Stack>
                                                </Grid>

                                                {/* Hàng 6 */}
                                                <Grid size={{ xs: 12 }}>
                                                    <Stack direction='row'>
                                                        <Typography fontSize='14px'>Mục tiêu: </Typography>
                                                        <Typography fontSize='14px'>{product.target}</Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>

                                            {/* ---------------------------- Thông tin mốc công việc --------------------------- */}
                                            <Grid sx={{ mt: 2 }} container spacing={1}>
                                                {/*  Các mốc công việc*/}
                                                {workOrder.workMilestones.map((workMilestone, index) => {
                                                    return(
                                                        <Grid key={index} size={{ xs: 12 }}>
                                                            <Stack direction='row'>
                                                                <Typography fontWeight={600} fontSize='15px'>Mốc {index + 1 }: </Typography>
                                                                <Typography fontWeight={600} fontSize='15px'>{workMilestone.name}</Typography>
                                                            </Stack>
                                                            <Stack my={1.5} direction='row'>
                                                                <Typography fontSize='14px'>Tên mốc {index + 1 }: </Typography>
                                                                <Typography fontWeight={600} fontSize='14px'>{workMilestone.name}</Typography>
                                                            </Stack>
                                                            <Grid container spacing={2}>
                                                                {workMilestone.steps.map((step, idx) => {
                                                                    return(
                                                                        <>
                                                                            <Grid size={{ xs: 12, md: 10 }}>
                                                                                <Stack direction='row'>
                                                                                    <Typography sx={{ whiteSpace: 'nowrap' }} fontSize='14px'>Bước {idx + 1}: </Typography>
                                                                                    <Typography sx={{ whiteSpace: { xs: 'none', md: 'nowrap'} }} fontSize='14px'>{step.name} </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid size={{ xs: 12, md: 2 }}>
                                                                                <Box flexDirection='row' display='flex' justifyContent='space-between'>
                                                                                    <Stack direction='row'>
                                                                                        <Typography fontSize='14px'>Tiến độ: </Typography>
                                                                                        <Typography fontSize='14px'>{getProgressWorkOrderLabel(step.progress)}</Typography>
                                                                                    </Stack>
                                                                                    <Chip
                                                                                        label={getProccessWorkOrderLabel(step.proccess)}
                                                                                        color={getProccessWorkOrderColor(step.proccess).color}
                                                                                    />
                                                                                </Box>
                                                                            </Grid>                                                                            
                                                                        </>
                                                                    )
                                                                })}

                                                            </Grid>
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        </>
                                    )}
                                </Paper>
                            )
                        ))}
                    </Grid>

                    <Grid sx={{ display: 'flex', justifyContent: 'center' }} size={{ xs: 12 }}>
                        <Button
                            variant="outlined"
                            sx={{ width: 120, border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            onClick={onBack}
                        >
                            Đóng
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default ViewOrderByCarpenter;
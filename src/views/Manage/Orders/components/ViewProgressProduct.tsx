import { IProduct } from "@/types/product";
import { Avatar, Box, Chip, Paper, Stack, Tooltip, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { useEffect, useState } from "react";
import { IOrder, IWorkOrder } from "@/types/order";
import { getDetailWorkOrderByProduct } from "@/services/product-service";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/avatar-1.png";
import DateTime from "@/utils/DateTime";
import { getNumber, getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel, getStatusOrderLabel, getStatusProductLabel } from "@/utils/labelEntoVni";
import CommonImage from "@/components/Image/index";

interface ViewProgressProductProps{
    order: IOrder;
    product: IProduct;
    onBack: () => void;
}

const ViewProgressProduct = (props: ViewProgressProductProps) => {
    const { product, onBack, order } = props;
    const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
    const [workOrderError, setWorkOrderError] = useState<string>('');
    

    const getWorkOrderByIdProduct = async(id: string) => {
        try {
            const res = await getDetailWorkOrderByProduct(id);
            const data = res.data as any as IWorkOrder;
            setWorkOrder(data);
            setWorkOrderError('');            
        } catch (error: any) {
            setWorkOrderError(error.message)
        }
    }

    useEffect(() => {
        getWorkOrderByIdProduct(product.id)
    }, [product]);

    return(
        <Box>
            <NavigateBack
                title="Tiến độ sản phẩm"
                onBack={onBack}
            />
            <Paper elevation={2} sx={{ borderRadius: 3, p: 2, mx: 1.5, mb: 1.5 }}>
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

                    {/* -------------------- Thông tin công việc --------------------- */}
                    <Grid size={{ xs: 12 }}>
                        <Typography mb={1.5} fontWeight={600}>Thông tin công việc</Typography>
                        {workOrderError && workOrder === null && (
                            <Typography fontStyle='italic' fontWeight={600}>{workOrderError}</Typography>
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
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Stack direction='row'>
                                            <Typography fontSize='14px'>Quá trình: </Typography>
                                            <Typography fontSize='14px'>{getStatusProductLabel(product.status)}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid sx={{ display: 'flex', justifyContent:{ xs: 'flex-start', md: 'flex-end'}, alignItems: { xs: 'flex-start', md: 'flex-end'} }} size={{ xs: 12, md: 6 }}>
                                        <Stack direction='row'>
                                            <Typography fontSize='14px'>Người quản lý: </Typography>
                                            <Typography fontSize='14px'>{Array.isArray(workOrder.manager) ? workOrder.manager : 1} người</Typography>
                                        </Stack>
                                    </Grid>

                                    {/* Hàng 4 */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Stack direction='row'>
                                            <Typography fontSize='14px'>Mốc công việc: </Typography>
                                            <Typography fontSize='14px'>0{getNumber(workOrder.workMilestone.split("_")[0])}</Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid sx={{ display: 'flex', justifyContent:{ xs: 'flex-start', md: 'flex-end'}, alignItems: { xs: 'flex-start', md: 'flex-end'} }} size={{ xs: 12, md: 6 }}>
                                        <Stack direction='row'>
                                            <Typography fontSize='14px'>Nhân viên: </Typography>
                                            <Typography fontSize='14px'>{workOrder.workers.length} người</Typography>
                                        </Stack>
                                    </Grid>

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
                            </>
                        )}
                    </Grid>

                    {/* ---------------------------- Thông tin mốc công việc --------------------------- */}
                    <Grid size={{ xs: 12 }}>
                        <Grid container spacing={1}>
                            {/*  Các mốc công việc*/}
                            {workOrder?.workMilestones.map((workMilestone, index) => {
                                return(
                                    <Grid key={index} size={{ xs: 12 }}>
                                        <Stack direction='row'>
                                            <Typography fontWeight={600} fontSize='16px'>Mốc {index + 1 }: </Typography>
                                            <Typography fontWeight={600} fontSize='16px'>{workMilestone.name}</Typography>
                                        </Stack>
                                        <Stack my={1.5} direction='row'>
                                            <Typography fontSize='14px'>Tên mốc {index + 1 }: </Typography>
                                            <Typography fontWeight={600} fontSize='14px'>{workMilestone.name}</Typography>
                                        </Stack>
                                        <Grid container spacing={2}>
                                            {/* Các bước trong mốc */}
                                            {workMilestone.steps.map((step, idx) => {
                                                return(
                                                    <>
                                                        <Grid key={idx} size={{ xs: 12, md: 9 }}>
                                                            <Box flexDirection='row' display='flex' justifyContent='space-between'>
                                                                <Stack direction='row'>
                                                                    <Typography
                                                                        sx={{ 
                                                                            whiteSpace: 'nowrap',
                                                                            color: '#000' 
                                                                        }} fontSize='14px'   
                                                                    >
                                                                        Bước {idx + 1}:
                                                                    </Typography>
                                                                    <Typography 
                                                                        sx={{ 
                                                                            whiteSpace: { xs: 'none', md: 'nowrap'},
                                                                            color: '#000'
                                                                        }} 
                                                                        fontSize='14px' 
                                                                    >
                                                                        {step.name} 
                                                                    </Typography>
                                                                </Stack>                                                                
                                                            </Box>

                                                        </Grid>
                                                        <Grid size={{ xs: 12, md: 3 }}>
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
                                                        {/* Hình ảnh của bước trong mốc */}
                                                        {step.images.length > 0 && (
                                                            <Grid size={{ xs: 12}}>
                                                                <Grid container spacing={1}>
                                                                    {step.images.map((img, imgIndex) => (
                                                                        <Grid key={imgIndex} size={{ xs: 12, md: 3}}>
                                                                            <CommonImage
                                                                                src={img.url}
                                                                                alt={img.name}
                                                                                sx={{ height: 180, width: '100%' }}
                                                                            />
                                                                        </Grid>
                                                                    ))}                                                                
                                                                </Grid>
                                                            </Grid>
                                                        )}
                                                    </>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default ViewProgressProduct;
import { Box, Button, Card, CardContent, Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import { IOrder, IWorkMilestone } from "@/types/order";
import { getProductsByOrderId } from "@/services/product-service";
import { IProduct } from "@/types/product";
import Grid from "@mui/material/Grid2";
import CommonImage from "@/components/Image/index";
import { getStatusProductColor, getStatusProductLabel } from "@/utils/labelEntoVni";
import { COLORS } from "@/constants/colors";
import ProgressProduct from "./ProgressProduct";
import useNotification from "@/hooks/useNotification";
import { updateProccessOder } from "@/services/order-service";
import { ProccessOrder, StatusOrder } from "@/constants/status";
import { Close, Visibility } from "@mui/icons-material";
import useBreakpoints from "@/hooks/useBreakpoints";
import WorkMilestones from "../../components/WorkMilestones";
import DialogStepsAndStepImages from "../../components/DialogStepsAndStepImages";
import proccess from "@/assets/images/users/proccess.jfif"

interface UpdateOrderProps{
    onBack: () => void;
    data: IOrder
}

const UpdateOrder: React.FC<UpdateOrderProps> = ({ onBack, data }) => {
    const notify = useNotification();
    const bp = useBreakpoints();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [openProgress, setOpenProgress] = useState(false);
    const [openViewImage, setOpenViewImage] = useState(false);
    const [openViewImageProductId, setOpenViewImageProductId] = useState<string | null>(null);
    const [workMilestones, setWorkMilestones] = useState<IWorkMilestone[]>([]);
    const [openStepsAndImageSteps, setOpenStepsAndImageSteps] = useState(false);
    const [idWorkMilestone, setIdWorkMilestone] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null)

    const getProducts = async(id: string) => {
        const res = await getProductsByOrderId(id);
        const newProducts = res.data as any as IProduct[];
        setProducts(newProducts)
    };    

    useEffect(() => {
        if(data){
            getProducts(data.id);
        }
    }, [data])

    const handleOpenProgress = (data: IProduct) => {
        setProduct(data);
        setOpenProgress(true)
    }

    const handleCloseProgress = () => {
        setProduct(null);
        setOpenProgress(false)
        getProducts(data.id);
    }

    const showButtonFinishedOrder = () => {
        if(data === null) return;
        const newData = data && data.products.every(s => s.status === 'completed');
        if(!newData) {
            return false
        }
        return true && data.proccess === ProccessOrder.IN_PROGRESS_75;
        
    }

    const handleFinished = async(id: string) => {
        try {
            const payload: { proccess: string } = {
                proccess: 'completed_100%'
            }
            const res = await updateProccessOder(id, payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            onBack()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const handleViewAllImageMilestone = (productId: string, workMilestones: IWorkMilestone[]) => {
        setOpenViewImageProductId(productId);
        setWorkMilestones(workMilestones)
    }

    return(
        <Box>
            {!openProgress && (
                <>
                    <NavigateBack
                        title="Xem chi tiết"
                        onBack={onBack}
                    />
                    <Grid sx={{ mx: 2 }} container spacing={2}>
                        {products.map((product, index) => {
                            return(
                                <Grid key={index} size={{ xs: 12 }}>
                                    <Card sx={{ borderRadius: 2 }}>
                                        <CommonImage
                                            sx={{ px: 2, pt: 2, objectFit: 'cover', height: 250, width: '100%' }}
                                            src={product.urlImage}
                                            alt={product.name}
                                        />
                                        <CardContent>
                                            <Box flexDirection='row' display='flex' justifyContent='space-between'>
                                                <Stack direction='row'>
                                                    <Typography fontSize='14px' fontWeight={500}>SP {index + 1}: </Typography>
                                                    <Typography fontSize='14px' fontWeight={500}>{product.name}</Typography>
                                                    <Typography fontSize='14px' fontWeight={500}>({product.dimension.length} x {product.dimension.width} x {product.dimension.height} cm)</Typography>
                                                </Stack>
                                                <Chip
                                                    label={getStatusProductLabel(product.status)}
                                                    color={getStatusProductColor(product.status).color}
                                                />
                                            </Box>
                                            <Box flexDirection='row' display='flex' justifyContent='space-between'>
                                                <Stack mt={1} direction='row'>
                                                    <Typography fontSize='14px'>Mục tiêu: </Typography>
                                                    <Typography fontSize='14px'>{product.description}</Typography>
                                                </Stack>
                                                {openViewImageProductId !== product.id && (
                                                    <Tooltip title="Xem tất cả các hình ảnh của các mốc">
                                                        <IconButton
                                                            onClick={() => {
                                                                product.workOrder.workMilestones && handleViewAllImageMilestone(product.id,product.workOrder.workMilestones)
                                                            }}
                                                            sx={{
                                                                '&:hover': {
                                                                    bgcolor: 'transparent'
                                                                }
                                                            }}
                                                        >
                                                            <Visibility/>
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                                {openViewImageProductId === product.id && (
                                                    <Tooltip title="Đóng tất cả các hình ảnh của các mốc">
                                                        <IconButton
                                                            onClick={() => {
                                                                setOpenViewImageProductId(null)
                                                                setWorkMilestones([])
                                                            }}
                                                            sx={{
                                                                '&:hover': {
                                                                    bgcolor: 'transparent'
                                                                }
                                                            }}
                                                        >
                                                            <Close/>
                                                        </IconButton>
                                                    </Tooltip> 
                                                )}                                               
                                            </Box>

                                            {(product.isCreated && product.status !== 'completed') &&  (
                                                <Button
                                                    variant="outlined"
                                                    fullWidth
                                                    sx={{ mt: 2, border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 3 }}
                                                    onClick={() => product && handleOpenProgress(product)}
                                                >
                                                    Cập nhật tiến độ
                                                </Button>
                                            )}
                                            {!product.isCreated && (
                                                <Typography mt={2} fontSize='14px' fontStyle='italic'>Sản phẩm chưa được tạo công việc. Vui lòng liên hệ quản lý.</Typography>
                                            )}
                                            {/* {product.status === 'completed' && ( */}
                                                <Box mt={2}>
                                                    {openViewImageProductId !== product.id && (
                                                        <Grid container spacing={2}>
                                                            {product.workOrder.workMilestones.map((wordMilestone, idx) => {
                                                                const bgcolor = wordMilestone.steps.every((el) => el.proccess === StatusOrder.PENDING) ? COLORS.STATUS.PENDING :
                                                                    wordMilestone.steps.every((el) => el.proccess === StatusOrder.COMPLETED) ? COLORS.STATUS.COMPLETED : COLORS.STATUS.IN_PROGRESS  
                                                                return(
                                                                    <>
                                                                        {bp ? (
                                                                            <Grid size={6} key={idx}>
                                                                                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                                                                                    <Button
                                                                                        sx={{ bgcolor: bgcolor, borderRadius: 2, mb: 1 }}
                                                                                    >
                                                                                        Mốc {idx + 1}: {wordMilestone.name}
                                                                                    </Button>
                                                                                    <CommonImage
                                                                                        src={wordMilestone.steps[0].images[0] ? wordMilestone.steps[0].images[0].url : proccess}
                                                                                        sx={{ width: 200, height: '100%', borderRadius: 2 }}
                                                                                        handleFunt={() => {
                                                                                            setOpenStepsAndImageSteps(true)
                                                                                            setIdWorkMilestone(wordMilestone.id)
                                                                                            setTitle(`Mốc ${index + 1}${wordMilestone.name}`)
                                                                                        }}
                                                                                    />                                                                                
                                                                                </Box>

                                                                            </Grid>
                                                                        ) : (
                                                                            <Grid sx={{ flex: 1, textAlign: 'center' }} key={idx}>
                                                                                <Button
                                                                                    sx={{ bgcolor: bgcolor, borderRadius: 2, mb: 1 }}
                                                                                >
                                                                                    Mốc {idx + 1}: {wordMilestone.name}
                                                                                </Button>
                                                                                <CommonImage
                                                                                    src={wordMilestone.steps[0].images[0] ? wordMilestone.steps[0].images[0].url : proccess}
                                                                                    sx={{ width: 200, height: 150, borderRadius: 2 }}
                                                                                    handleFunt={() => {
                                                                                        setOpenStepsAndImageSteps(true)
                                                                                        setIdWorkMilestone(wordMilestone.id)
                                                                                        setTitle(`Mốc ${index + 1}${wordMilestone.name}`)
                                                                                    }}
                                                                                />
                                                                            </Grid>
                                                                        )}
                                                                    </>
                                                                )
                                                            })}
                                                        </Grid>
                                                    )}
                                                    {openViewImageProductId === product.id && (
                                                        <Box>
                                                            <WorkMilestones workMilestones={workMilestones}/>
                                                            <Box mt={1} display='flex' justifyContent='center'>
                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON  }}
                                                                    onClick={() => {
                                                                        setOpenViewImageProductId(null)
                                                                        setWorkMilestones([])
                                                                    }}
                                                                >
                                                                    Quay lại
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                    {openStepsAndImageSteps && idWorkMilestone && title && (
                                                        <DialogStepsAndStepImages
                                                            open={openStepsAndImageSteps}
                                                            id={idWorkMilestone}
                                                            onClose={() => {
                                                                setIdWorkMilestone(null);
                                                                setOpenStepsAndImageSteps(false)
                                                                setTitle(null)
                                                            }}
                                                            title={title}
                                                        />
                                                    )}
                                                </Box>
                                            {/* )} */}
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                    {showButtonFinishedOrder() &&  (
                        <Box display='flex' justifyContent='center'>
                            <Button
                                sx={{ bgcolor: COLORS.BUTTON, mt: 2, borderRadius: 3, width: 200 }}
                                onClick={() => data && handleFinished(data.id)}
                            >
                                Hoàn thành đơn hàng
                            </Button>
                        </Box>
                    )}
                </>
            )}
            {openProgress && product && (
                <ProgressProduct
                    data={product}
                    onBack={handleCloseProgress}
                />
            )}
        </Box>
    )
}

export default UpdateOrder;
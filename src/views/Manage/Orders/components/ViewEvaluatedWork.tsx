import { IProduct } from "@/types/product";
import { Avatar, Box, Chip, IconButton, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { useEffect, useState } from "react";
import { IWorkOrder } from "@/types/order";
import { getDetailWorkOrderByProduct } from "@/services/product-service";
import Grid from "@mui/material/Grid2"
import { getEvaluatedStatusWorkMilestoneColor, getEvaluatedStatusWorkMilestoneLabel, getEvaluatedStatusWorkOrderColor, getEvaluatedStatusWorkOrderLabel, getNumber, getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel, getStatusProductLabel } from "@/utils/labelEntoVni";
import { ArrowDropDown, ArrowDropUp, Visibility } from "@mui/icons-material";
import CommonImage from "@/components/Image/index";
import DialogImageProduct from "./DialogImageProduct";

interface InputTextProps{
    index: number,
    onInputChange: (index: number, name: string, value: any) => void;
    name: string,
    value: string | null;
    error?: boolean,
    helperText?: string | null;
    label: string;
    disabled?: boolean;
    placeholder?: string
}

const InputTextStep = (props: InputTextProps) => {
    const { onInputChange, index, name, value, error, helperText, label, disabled, placeholder = 'Nhập thông tin' } = props;
    return (
        <TextField
            placeholder={placeholder}
            label={label}
            name={name}
            type="text"
            value={value}
            error={error}
            helperText={helperText}
            disabled={disabled}
            onChange={(e) => onInputChange(index - 1, name, e.target.value)}
            InputProps={{
                sx:{
                    "& .MuiOutlinedInput-notchedOutline":{
                        border: "1px solid rgb(53, 50, 50)",
                        borderRadius:"8px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgb(53, 50, 50)",
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: "1px solid rgb(53, 50, 50)",
                    },
                    color: 'black'
                },
            }}
            InputLabelProps={{
                sx: {
                    fontSize: "14px",
                    color: '#aaa'
                }
            }} 
        />
    )
}

interface ViewEvaluatedWorkProps{
    data: IProduct,
    onBack: () => void;
}


const ViewEvaluatedWork = (props: ViewEvaluatedWorkProps) => {
    const { data, onBack } = props;
    const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
    const [workOrderError, setWorkOrderError] = useState<string>('');
    const [openWorkOrder, setOpenWorkOrder] = useState(false);
    const [workMilestoneSelected, setWorkMilestoneSelected] = useState<number | null>(null);
    const [openDialogImageProduct, setOpenDialogImageProduct] = useState(false);

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
        getWorkOrderByIdProduct(data.id)
    }, [data]);

    const reset = () => {
        setWorkMilestoneSelected(null);
    }

    const handleBack = () => {
        onBack();
        reset();
    }


    /* ----------------- Gửi đánh giá mốc công việc -------------------- */
    const handleChangeInputEvaluationDescription = (index: number, name: string, value: any) => {

    }
    
    /* ----------------- Gửi đánh giá mốc công việc -------------------- */

    return(
        <Box>
            <NavigateBack
                title="Xem chi tiết đánh giá công việc"
                onBack={handleBack}
            />
            <Paper elevation={2} sx={{ borderRadius: 3, p: 2, mx: 1.5, mb: 1.5 }}>
                <Grid container spacing={2}>
                    {/* -------------------- Thông tin công việc --------------------- */}
                    <Grid size={{ xs: 12 }}>
                        <Stack direction='row' display='flex' justifyContent='space-between'>
                            <Typography mb={1.5} fontWeight={600}>Thông tin công việc</Typography>
                            <Stack direction='row'>
                                {workOrder && (
                                    <Chip
                                        label={getEvaluatedStatusWorkOrderLabel(workOrder?.evaluatedStatus)}
                                        color={getEvaluatedStatusWorkOrderColor(workOrder?.evaluatedStatus).color}
                                    />
                                )}
                                <IconButton
                                    onClick={() => {
                                        setOpenWorkOrder((prev) => !prev)
                                    }}
                                >
                                    {openWorkOrder ? <ArrowDropUp sx={{ width: 25, height: 25 }}/> : <ArrowDropDown sx={{ width: 25, height: 25 }}/>}
                                </IconButton>
                            </Stack>
                        </Stack>
                        {workOrderError && workOrder === null && (
                            <Typography fontStyle='italic' fontWeight={600}>{workOrderError}</Typography>
                        )}
                        {!workOrderError && workOrder !== null && openWorkOrder && (
                            <Grid sx={{ mb: 2 }} container spacing={1}>
                                    {/* Hàng 1 */}
                                    <Grid size={{ xs: 12 }}>
                                        <Stack direction='row'>
                                            <Typography fontSize='14px'>Tên công việc: </Typography>
                                            <Typography fontSize='14px' fontWeight={600}>{data.name}</Typography>
                                            {data.urlImage && (
                                                <IconButton sx={{ height: 0, pt: 1.3}} onClick={() => setOpenDialogImageProduct(true)}>
                                                    <Visibility/>
                                                </IconButton>
                                            )}
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
                                            <Typography fontSize='14px'>{getStatusProductLabel(data.status)}</Typography>
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
                                            <Typography fontSize='14px'>{data.description}</Typography>
                                        </Stack>
                                    </Grid>

                                    {/* Hàng 6 */}
                                    <Grid size={{ xs: 12 }}>
                                        <Stack direction='row'>
                                            <Typography fontSize='14px'>Mục tiêu: </Typography>
                                            <Typography fontSize='14px'>{data.target}</Typography>
                                        </Stack>
                                    </Grid>
                            </Grid>
                        )}
                        <TextField
                            label="Đánh giá công việc"
                            name="evaluationDescriptionWorkOrder"
                            value={workOrder?.evaluationDescriptionWorkOrder}
                            type="text"
                            disabled
                        />
                    </Grid>

                    {/* ---------------------------- Thông tin mốc công việc --------------------------- */}
                    <Grid size={{ xs: 12 }}>
                        <Grid container spacing={1}>
                            {/*  Các mốc công việc*/}
                            {workOrder?.workMilestones.map((workMilestone, index) => {
                                const isOpen = workMilestoneSelected === index;
                                const description = workMilestone.evaluationDescription
                                return(
                                    <Grid key={index} size={{ xs: 12 }}>
                                        <Stack mt={1} direction='row' display='flex' justifyContent='space-between'>
                                            <Typography fontWeight={600} fontSize='15px'>
                                                Mốc {index + 1}: {workMilestone.name}
                                            </Typography>
                                            <Stack direction='row'>
                                                <Chip
                                                        label={getEvaluatedStatusWorkMilestoneLabel(workMilestone?.evaluatedStatus)}
                                                        color={getEvaluatedStatusWorkMilestoneColor(workMilestone?.evaluatedStatus).color}
                                                />
                                                <IconButton
                                                    onClick={() => {
                                                        setWorkMilestoneSelected(isOpen ? null : index)
                                                    }}
                                                >
                                                    {isOpen ? <ArrowDropUp sx={{ width: 25, height: 25 }}/> : <ArrowDropDown sx={{ width: 25, height: 25 }}/> }    
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                        {isOpen && (
                                            <>
                                                <Stack mb={1.5} direction='row'>
                                                    <Typography fontSize='14px'>Tên mốc {index + 1 }: </Typography>
                                                    <Typography fontWeight={600} fontSize='14px'>{workMilestone.name}</Typography>
                                                </Stack>
                                                <Grid sx={{ mb: 1 }} container spacing={3}>
                                                    {/* Các bước trong mốc */}
                                                    {workMilestone.steps.map((step, idx) => {
                                                        return(
                                                            <>
                                                                <Grid size={{ xs: 12, md: 6 }}>
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
                                                                        <Stack direction='row'>
                                                                            <Typography fontSize='14px'>Tiến độ: </Typography>
                                                                            <Typography fontSize='14px'>{getProgressWorkOrderLabel(step.progress)}</Typography>
                                                                        </Stack>
                                                                        <Chip
                                                                            label={getProccessWorkOrderLabel(step.proccess)}
                                                                            color={getProccessWorkOrderColor(step.proccess).color}
                                                                        />
                                                                    </Box>
                                                                    {/* Hình ảnh của bước trong mốc */}
                                                                    {step.images.length > 0 && (
                                                                        <Grid sx={{ mt: 1 }} size={{ xs: 12}}>
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
                                                                </Grid>

                                                            </>
                                                        )
                                                    })}
                                                </Grid>
                                            </>
                                        )}
                                        <InputTextStep
                                            label={`Đánh giá mốc ${index + 1}`}
                                            index={index + 1}
                                            name="evaluationDescription"
                                            onInputChange={handleChangeInputEvaluationDescription}
                                            value={description}
                                            disabled
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
                {/* <ProductReview/> */}
                {openDialogImageProduct && (
                    <DialogImageProduct
                        open={openDialogImageProduct}
                        onClose={() => { setOpenDialogImageProduct(false) }}
                        imageUrl={data.urlImage}
                    />
                )}
            </Paper>
        </Box>
    )
}

export default ViewEvaluatedWork;
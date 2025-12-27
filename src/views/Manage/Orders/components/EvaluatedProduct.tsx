import { getDetailWorkOrderByProduct, sendRequestMilestone } from "@/services/product-service";
import { IWorkMilestone, IWorkOrder } from "@/types/order";
import { FormDataRequestMilestone, IProduct, PayloadRequestMilestone } from "@/types/product";
import { Avatar, Box, Button, Checkbox, Chip, IconButton, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import Grid from "@mui/material/Grid2";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import InputText from "@/components/InputText";
import { getEvaluatedStatusWorkMilestoneColor, getEvaluatedStatusWorkMilestoneLabel, getEvaluatedStatusWorkOrderColor, getEvaluatedStatusWorkOrderLabel, getNumber, getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel, getStatusProductLabel } from "@/utils/labelEntoVni";
import CommonImage from "@/components/Image/index";
import { COLORS } from "@/constants/colors";
import ProductReview from "../demos/ProductReview";
import dayjs from "dayjs";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";

interface InputTextProps{
    index: number,
    onInputChange: (index: number, name: string, value: any) => void;
    name: string,
    value: string;
    error?: boolean,
    helperText?: string;
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

interface EvaluatedProductProps{
    data: IProduct,
    onBack: () => void;
}


type ErrorsRequestMilestone = {
    [K in keyof FormDataRequestMilestone]?: string
}

const EvaluatedProduct = (props: EvaluatedProductProps) => {
    const { data, onBack } = props;
    const { profile } = useAuth();
    const notify = useNotification();
    const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
    const [workOrderError, setWorkOrderError] = useState<string>('');
    const [openWorkOrder, setOpenWorkOrder] = useState(false);
    const [workMilestoneSelected, setWorkMilestoneSelected] = useState<number | null>(null);
    const [openCheckboxRequestRework, setOpenCheckboxRequestRework] = useState(false);
    const [checked, setChecked] = useState<number | null>(null);
    const [workMilestone, setWorkMilestone] = useState<{ index: number | null, workMilestone: IWorkMilestone | null }>({
        index: null,
        workMilestone: null
    });
    const [formDataRequestMilestone, setFormDataRequestMilestone] = useState<FormDataRequestMilestone>({
        reworkReason: null,
        reworkDeadline: null,
        reworkStartedAt: null
    })
    const [errorsRequestMilestone, setErrorsRequestMilestone] = useState<ErrorsRequestMilestone>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setChecked(null);
        setWorkMilestoneSelected(null);
        setErrorsRequestMilestone({});
        setFormDataRequestMilestone({ reworkReason: null, reworkDeadline: null, reworkStartedAt: null })
    }

    const handleBack = () => {
        onBack();
        reset();
    }

    

    const isMilestoneEvaluated = (milestoneIndex: number) => {
        if(!workOrder) return false;

        // 1. Kiểm tra các mốc trước đã đạt hoặc cần làm lại chưa
        for(let i = 0; i < milestoneIndex; i++){
            const milestone = workOrder.workMilestones[i];
            const evaluatedStatus = milestone.evaluatedStatus === 'approved';
            if(!evaluatedStatus) return false;
        }

        // 2. Kiểm tra các bước trước trong cùng mốc
        const currentMilestone = workOrder.workMilestones[milestoneIndex];

        // 3. Step hiện tại chưa hoàn thành
        return currentMilestone.evaluatedStatus === 'pending';
    }
    
    const isEvaluatedLocked = (milestoneIndex: number) => {
        if(!workOrder) return false;

        // Nếu step đã hoàn thành -> không khóa
        if(workOrder.evaluatedStatus === 'approved'){
            return false
        }

        // Không được cập nhật thì là bị khóa
        return !isMilestoneEvaluated(milestoneIndex)
    }

    const handleOpenCheckboxRequestRework = () => {
        setOpenCheckboxRequestRework(true)
    }

    const handleCheck = (index: number, value: IWorkMilestone) => {
        setWorkMilestone({ index, workMilestone: value })
        const isChecked = checked === index ? null : index ;
        setChecked(isChecked)
    }

    const handleChangeInputRequestMilestone = (name: string, value: any) => {
        setFormDataRequestMilestone((prev) => ({ ...prev, [name]: value }));
        if(errorsRequestMilestone[name as keyof typeof errorsRequestMilestone]){
            setErrorsRequestMilestone((prev) => ({ ...prev, [name]: undefined }))
        }
    }

    const validateSubmit = (): boolean => {
        const newErrors: ErrorsRequestMilestone = {};
        if(!formDataRequestMilestone.reworkReason) newErrors.reworkReason = 'Lý do được không được để trống';
        if(!formDataRequestMilestone.reworkDeadline) newErrors.reworkDeadline = 'Ngày hoàn thành deadline không được để trống';
        if(!formDataRequestMilestone.reworkStartedAt) newErrors.reworkStartedAt = 'Ngày bắt đầu làm không được để trống';

        setErrorsRequestMilestone(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSendRequestMilestone = async() => {
        if(!validateSubmit()) {
            return;
        }
        setIsSubmitting(true)
        try {
            const payload: PayloadRequestMilestone = {
                evaluatedStatus: 'rework',
                reworkReason: formDataRequestMilestone.reworkReason ? formDataRequestMilestone.reworkReason : null,
                reworkStartedAt: formDataRequestMilestone.reworkStartedAt ? formDataRequestMilestone.reworkStartedAt.toISOString() : null,
                reworkDeadline: formDataRequestMilestone.reworkDeadline ? formDataRequestMilestone.reworkDeadline.toISOString() :  null,
                changedBy: profile ? profile.id : null,
                changedRole: profile ? profile.role : null,
                carpenters: workOrder !== null ? workOrder.workers.map((el) => ({ id: el.id })) : []
            }

            const res = workMilestone.workMilestone && await sendRequestMilestone(workMilestone.workMilestone.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return(
        <Box>
            <NavigateBack
                title="Đánh giá sản phẩm"
                onBack={handleBack}
            />
            <Paper elevation={2} sx={{ borderRadius: 3, p: 2, mx: 1.5, mb: 1.5 }}>
                {openCheckboxRequestRework && (
                    <Typography align="center" fontWeight={600}>Vui lòng chọn mốc mà bạn muốn thợ làm lại</Typography>
                )}
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
                            <Grid sx={{ mb: 1 }} container spacing={1}>
                                    {/* Hàng 1 */}
                                    <Grid size={{ xs: 12 }}>
                                        <Stack direction='row'>
                                            <Typography fontSize='14px'>Tên công việc: </Typography>
                                            <Typography fontSize='14px' fontWeight={600}>{data.name}</Typography>
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
                        <InputText
                            label="Đánh giá công việc"
                            name=""
                            value={''}
                            type="text"
                            onChange={() => {}}
                            disabled={(!workOrder?.workMilestones.every(el => el.evaluatedStatus === 'approved')) || (!workOrder?.workMilestones.every(el => el.evaluatedStatus === 'rework'))}
                        />
                    </Grid>

                    {/* ---------------------------- Thông tin mốc công việc --------------------------- */}
                    <Grid size={{ xs: 12 }}>
                        <Grid container spacing={1}>
                            {/*  Các mốc công việc*/}
                            {workOrder?.workMilestones.map((workMilestone, index) => {
                                const isOpen = workMilestoneSelected === index;
                                return(
                                    <Grid key={index} size={{ xs: 12 }}>
                                        <Stack mt={1} direction='row' display='flex' justifyContent='space-between'>
                                            <Typography fontWeight={600} fontSize='15px'>
                                                Mốc {index + 1}: {workMilestone.name}
                                            </Typography>
                                            <Stack direction='row'>
                                                {workMilestone && (
                                                    <Chip
                                                        label={getEvaluatedStatusWorkMilestoneLabel(workMilestone?.evaluatedStatus)}
                                                        color={getEvaluatedStatusWorkMilestoneColor(workMilestone?.evaluatedStatus).color}
                                                    />
                                                )}
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
                                                <Grid sx={{ mb: 1 }} container spacing={2}>
                                                    {/* Các bước trong mốc */}
                                                    {workMilestone.steps.map((step, idx) => {
                                                        return(
                                                            <>
                                                                <Grid size={{ xs: 12, md: 9 }}>
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
                                            </>
                                        )}
                                        <InputTextStep
                                            label={`Đánh giá mốc ${index + 1}`}
                                            index={index + 1}
                                            name=""
                                            onInputChange={() => {}}
                                            value=""
                                            disabled={isEvaluatedLocked(index)}
                                        />
                                        {isMilestoneEvaluated(index) && (
                                            <Button>
                                                Gửi
                                            </Button>
                                        )}
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>

                    {/* ------------------ Button -------------------- */}
                    {((!workOrder?.workMilestones.every(el => el.evaluatedStatus === 'approved')) || (!workOrder?.workMilestones.every(el => el.evaluatedStatus === 'rework')) && (
                        <Grid sx={{ display: 'flex', justifyContent: 'center' }} size={{ xs: 12 }}>
                            <Button
                                sx={{ bgcolor: COLORS.BUTTON, width: 150, mr: 2 }}
                            >
                                Gửi đánh giá
                            </Button>
                            <Button
                                sx={{ bgcolor: COLORS.BUTTON, width: 150 }}
                                onClick={() => {}}
                            >
                                Yêu cầu làm lại
                            </Button>
                        </Grid>                        
                    ))}

                </Grid>
                {/* <ProductReview/> */}
            </Paper>
            
            {/*-------------------- Lấy thông tin đã được checked ------------------- */}
            {checked !== null && workMilestone.index !== null && workMilestone.workMilestone !== null && (
                <Paper elevation={2} sx={{ borderRadius: 3, p: 2, mx: 1.5, mb: 1.5 }}>
                    <Typography mb={1.5} fontWeight={600}>Thông tin của Mốc {workMilestone.index + 1}: {workMilestone.workMilestone.name}</Typography>
                    <Stack mb={1.5} direction='row'>
                        <Typography fontSize='14px'>Tên mốc {workMilestone.index + 1 }: </Typography>
                        <Typography fontWeight={600} fontSize='14px'>{workMilestone.workMilestone.name}</Typography>
                    </Stack>
                    <Grid sx={{ mb: 1 }} container spacing={2}>
                        {/* Các bước trong mốc */}
                        {workMilestone.workMilestone.steps.map((step, idx) => {
                            return(
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Box display='flex' flexDirection='row' justifyContent='space-between'>
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
                                        <Box flexDirection='row' display='flex' gap={5}>
                                            <Stack direction='row'>
                                                <Typography fontSize='14px'>Tiến độ: </Typography>
                                                <Typography fontSize='14px'>{getProgressWorkOrderLabel(step.progress)}</Typography>
                                            </Stack>
                                            <Chip
                                                label={getProccessWorkOrderLabel(step.proccess)}
                                                color={getProccessWorkOrderColor(step.proccess).color}
                                            />
                                        </Box>
                                    </Box>
                                    {/* Hình ảnh của bước trong mốc */}
                                    {step.images.length > 0 && (
                                        <Grid size={{ xs: 12}}>
                                            <Grid container spacing={1}>
                                                {step.images.map((img, imgIndex) => (
                                                    <Grid key={imgIndex} size={{ xs: 12, md: 3}}>
                                                        <CommonImage
                                                            src={img.url}
                                                            alt={img.name}
                                                            sx={{ height: 150, width: '100%' }}
                                                        />
                                                    </Grid>
                                                ))}                                                                
                                            </Grid>
                                        </Grid>
                                    )}                                        
                                </Grid>
                            )
                        })}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontSize='15px' fontWeight={600}>Lý do yêu cầu làm lại</Typography>
                            <InputText
                                label=""
                                value={formDataRequestMilestone.reworkReason}
                                name="reworkReason"
                                type="text"
                                onChange={handleChangeInputRequestMilestone}
                                multiline
                                rows={errorsRequestMilestone.reworkReason ? 6 : 5}
                                margin="dense"
                                error={!!errorsRequestMilestone.reworkReason}
                                helperText={errorsRequestMilestone.reworkReason}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <Typography fontSize='15px' fontWeight={600}>Ngày bắt đầu làm</Typography>
                                    <InputText
                                        label=""
                                        name="reworkStartedAt"
                                        value={formDataRequestMilestone.reworkStartedAt}
                                        type="date"
                                        onChange={handleChangeInputRequestMilestone}
                                        error={!!errorsRequestMilestone.reworkStartedAt}
                                        helperText={errorsRequestMilestone.reworkStartedAt}
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Typography fontSize='15px' fontWeight={600}>Ngày hoàn thành deadline</Typography>
                                    <InputText
                                        label=""
                                        name="reworkDeadline"
                                        value={formDataRequestMilestone.reworkDeadline}
                                        type="date"
                                        onChange={handleChangeInputRequestMilestone}
                                        error={!!errorsRequestMilestone.reworkDeadline}
                                        helperText={errorsRequestMilestone.reworkDeadline}
                                        margin="dense"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid sx={{ display: 'flex', justifyContent: 'center' }} size={{ xs: 12 }}>
                            <Button
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 120, mr: 2 }}
                                onClick={handleSendRequestMilestone}
                            >
                                Gửi yêu cầu
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 120 }}
                                onClick={() => {
                                    setOpenCheckboxRequestRework(false)
                                    reset()
                                }}
                            >
                                Đóng
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Box>
    )
}

export default EvaluatedProduct;
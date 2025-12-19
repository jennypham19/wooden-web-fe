import { Avatar, Box, Button, Chip, Paper, Stack, Tooltip, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { IProduct } from "@/types/product";
import { useEffect, useRef, useState } from "react";
import { IWorkOrder } from "@/types/order";
import { getDetailWorkOrderByProduct } from "@/services/product-service";
import Grid from "@mui/material/Grid2"
import { getNumber, getProccessProductLabel, getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel, getStatusProductColor, getStatusProductLabel } from "@/utils/labelEntoVni";
import { COLORS } from "@/constants/colors";
import { Camera, CloudUpload, Lock } from "@mui/icons-material";
import InputSelect from "@/components/InputSelect";
import { DATA_PROCCESS, DATA_PROGRESS } from "../../Orders/components/Step";

interface ProgressProductProps{
    onBack: () => void;
    data: IProduct
}

const ProgressProduct = (props: ProgressProductProps) => {
    const { onBack, data } = props;
    const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
    const [workOrderError, setWorkOrderError] = useState<string>('');
    const [openUpdateStep, setOpenUpdateStep] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
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

        getWorkOrderByIdProduct(data.id)
    }, [data]);

    const isStepCanUpdate = (milestoneIndex: number, stepIndex: number) => {
        if(!workOrder) return false;

        // 1. Kiểm tra các mốc trước đã hoàn thành chưa
        for(let i = 0; i < milestoneIndex; i++){
            const milestone = workOrder.workMilestones[i];
            const allStepsDone = milestone.steps.every(s => s.proccess === 'completed');
            if(!allStepsDone) return false;
        }

        // 2. Kiểm tra các bước trước trong cùng mốc
        const currentMilestone = workOrder.workMilestones[milestoneIndex];
        for(let j = 0; j < stepIndex; j++) {
            if(currentMilestone.steps[j].proccess !== 'completed'){
                return false
            }
        }

        // 3. Step hiện tại chưa hoàn thành
        return currentMilestone.steps[stepIndex].proccess !== 'completed';
    } 

    const isStepLocked = (milestoneIndex: number, stepIndex: number) => {
        if(!workOrder) return false;

        // Nếu step đã hoàn thành -> không khóa
        if(workOrder.workMilestones[milestoneIndex].steps[stepIndex].proccess === 'completed'){
            return false
        }

        // Không được cập nhật thì là bị khóa
        return !isStepCanUpdate(milestoneIndex, stepIndex)
    }

    const canAddStep = (milestoneIndex: number) => {
        if(!workOrder) return false;

        // 1. Kiểm tra các mốc đã hoàn thành chưa để hiện thị thêm b
        const milestone = workOrder.workMilestones[milestoneIndex];

        // Tất cả step đã hoàn thành
        return milestone.steps.every(step => step.proccess === 'completed')
    }

    const handleOpenUpdateStep = () => {
        setOpenUpdateStep(true);
    }

    const handleCloseUpdateStep = () => {
        setOpenUpdateStep(true);
    }

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };
    
    return(
        <Box>
            <NavigateBack
                title="Tiến độ sản phẩm"
                onBack={onBack}
            />
            <Paper elevation={2} sx={{ borderRadius: 3, p: 2, mx: 1.5, mb: 1.5 }}>
                <Typography mb={1} fontSize='16px' fontWeight={600}>Thông tin công việc</Typography>
                {!workOrderError && workOrder !== null && (
                    <>
                        <Grid container spacing={1}>
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
                                                        <Grid size={{ xs: 12, md: 9 }}>
                                                            <Stack direction='row'>
                                                                <Typography 
                                                                    sx={{ 
                                                                        whiteSpace: 'nowrap',
                                                                        color: isStepLocked(index, idx) ? '#979595ff' : '#000' 
                                                                    }} fontSize='14px'
                                                                >
                                                                    Bước {idx + 1}: 
                                                                </Typography>
                                                                <Typography 
                                                                    sx={{ 
                                                                        whiteSpace: { xs: 'none', md: 'nowrap'},
                                                                        color: isStepLocked(index, idx) ? '#979595ff' : '#000'
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
                                                                <Box flexDirection='row' display='flex' alignItems='center' gap={1}>
                                                                    {/* Hiển thị nút cập nhật */}
                                                                    {isStepCanUpdate(index, idx) && (
                                                                        <Button
                                                                            sx={{ bgcolor: COLORS.BUTTON }}
                                                                            onClick={handleOpenUpdateStep}
                                                                        >
                                                                            Cập nhật
                                                                        </Button>
                                                                    )}
                                                                    {/* Hiển thị icon khóa */}
                                                                    {isStepLocked(index, idx) && (
                                                                        <Tooltip title="Cần hoàn thành các bước trước">
                                                                            <Lock sx={{ color: 'gray'}}/>
                                                                        </Tooltip>
                                                                    )}
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                        
                                                        {openUpdateStep && isStepCanUpdate(index, idx) && (
                                                            <Grid size={{ xs: 12 }}>
                                                                <Paper elevation={2} sx={{ borderRadius: 2, border: '1px solid #bebabaff', p: 1.5 }}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid size={{ xs: 12, md: 6}}>
                                                                            <Typography mb={1} fontSize='14px' fontWeight={500}>Tiến độ</Typography>
                                                                            <InputSelect
                                                                                label=""
                                                                                value={''}
                                                                                options={DATA_PROGRESS}
                                                                                name=""
                                                                                onChange={() => {}}
                                                                                placeholder="Chọn tiến độ"
                                                                                sx={{ mb: 1}}
                                                                                
                                                                            />
                                                                            <Typography mb={1} fontSize='14px' fontWeight={500}>Trạng thái</Typography>
                                                                            <InputSelect
                                                                                label=""
                                                                                value={''}
                                                                                options={DATA_PROCCESS}
                                                                                name=""
                                                                                onChange={() => {}}
                                                                                placeholder="Chọn trạng thái"
                                                                                />
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, md: 6}}>
                                                                            <Box>
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/"
                                                                                    capture="environment"
                                                                                    hidden
                                                                                    ref={fileInputRef}
                                                                                    onChange={() => {}}
                                                                                />
                                                                                <Box
                                                                                    onClick={handleBoxClick}
                                                                                    sx={{
                                                                                        border: '2px dashed #ccc',
                                                                                        borderRadius: 2,
                                                                                        p: 3,
                                                                                        textAlign: 'center',
                                                                                        cursor: 'pointer',
                                                                                        '&:hover': { borderColor: 'primary.main' },
                                                                                        height: '100%',
                                                                                        display: 'flex',
                                                                                        justifyContent: 'center',
                                                                                        alignItems: 'center'
                                                                                    }}
                                                                                >
                                                                                    <Box sx={{ margin: 'auto 0'}}>
                                                                                        <Camera sx={{ fontSize: 48, color: 'text.secondary' }} />
                                                                                        <Typography fontSize='14px'>Tải lên hình ảnh trực tiếp.</Typography>
                                                                                        <Typography fontSize='14px'>Chụp ảnh từ camera của bạn.</Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Box mt={2} display='flex' justifyContent='center'>
                                                                        <Button
                                                                            sx={{ bgcolor: COLORS.BUTTON, width: 150 }}
                                                                        >
                                                                            Lưu
                                                                        </Button>
                                                                    </Box>
                                                                </Paper>
                                                            </Grid>
                                                        )} 
                                                        {canAddStep(index) && (
                                                            <Box mt={1.5} display='flex' justifyContent='flex-end'>
                                                                <Button
                                                                    variant="outlined"
                                                                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                                                                >
                                                                    Thêm bước
                                                                </Button>
                                                            </Box>
                                                        )}                                                                           
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
                <Button
                    fullWidth
                    sx={{ bgcolor: COLORS.BUTTON, mt: 2, borderRadius: 3 }}
                >
                    Hoàn thành đơn hàng
                </Button>
            </Paper>
        </Box>
    )
}

export default ProgressProduct
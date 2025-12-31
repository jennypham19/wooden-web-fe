import { ChangeEvent, useEffect, useRef, useState } from "react";



import { CameraAlt, Delete, Edit, Lock } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, IconButton, Paper, Stack, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavigateBack from "../../components/NavigateBack";
import { DATA_PROCCESS, DATA_PROGRESS } from "../../Orders/components/Step";
import Backdrop from "@/components/Backdrop";
import CommonImage from "@/components/Image/index";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";



import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { createStep, deletedStepAdded, updateStep } from "@/services/order-service";
import { getDetailWorkOrderByProduct, updateImageAndStatusProduct } from "@/services/product-service";
import { uploadImage, uploadImages } from "@/services/upload-service";
import { IWorkMilestone, IWorkOrder, StepPayload, StepsPayload } from "@/types/order";
import { FormUpdateProduct, IProduct } from "@/types/product";
import { resizeImage } from "@/utils/common";
import { getEvaluatedStatusWorkMilestoneColor, getEvaluatedStatusWorkMilestoneLabel, getNumber, getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel, getStatusProductLabel } from "@/utils/labelEntoVni";
import { EvaluatedStatusWorkMilestone } from "@/constants/status";


interface ProgressProductProps{
    onBack: () => void;
    data: IProduct
}

interface FormDataProgress{
    proccess: string,
    progress: string
}

type ProgressErrors = {
    [K in keyof FormDataProgress]?: string
} 

const ProgressProduct = (props: ProgressProductProps) => {
    const { onBack, data } = props;
    const theme = useTheme();
    const notify = useNotification();
    const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
    const [workOrderError, setWorkOrderError] = useState<string>('');

    const [errorProductImageFile, setProductErrorImageFile] = useState('');
    const fileProductImageRef = useRef<HTMLInputElement | null>(null);
    const [imageProductFile, setImageProductFile] = useState<File | null>(null);
    const [imageProductUrl, setImageProductUrl] = useState<string>('');

    const [errorImageFiles, setErrorImageFiles] = useState('');
    const fileInputImageRef = useRef<HTMLInputElement | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagesUrl, setImagesUrl] = useState<string[]>([]);

    const [formDataProgress, setFormDataProgress] = useState<FormDataProgress>({
        proccess: '',
        progress: ''
    })
    const [progressErrors, setProgressErrors] = useState<ProgressErrors>({});
    const [milestoneIndex, setMilestoneIndex] = useState<number | null>(null);
    const [nameStep, setNameStep] = useState('');
    const [nameStepError, setNameStepError] = useState('');
    
    const [openUpdateStep, setOpenUpdateStep] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openAddStep, setOpenAddStep] = useState(false);

    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    
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
        setWorkOrderError('');
        setImageFiles([]);
        setFormDataProgress({ proccess: '', progress: '' });
        setProgressErrors({});
        setErrorImageFiles('');
        setMilestoneIndex(null);
        setNameStep('');
        setNameStepError('');
        setImagesUrl([]);
        setImageProductFile(null);
        setImageProductUrl('');
        setProductErrorImageFile('')
    }

    const isStepCanUpdate = (milestoneIndex: number, stepIndex: number) => {
        if(!workOrder) return false;

        // 1. Kiểm tra các mốc trước đã hoàn thành và được đánh giá là đạt chưa
        for(let i = 0; i < milestoneIndex; i++){
            const milestone = workOrder.workMilestones[i];
            const allStepsDone = milestone.steps.every(s => s.proccess === 'completed') && milestone.evaluatedStatus === 'approved';
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

    const canAddStep = (milestoneIndex: number, stepIndex: number) => { 
        if(!workOrder) return false;

        // 1. Kiểm tra các mốc đã hoàn thành chưa để hiện thị thêm b
        const milestone = workOrder.workMilestones[milestoneIndex];

        // Tất cả step đã hoàn thành
        if(milestone.steps.length - 1 === stepIndex){
            return milestone.steps.every(step => step.proccess === 'completed')
        }
    }

    const deleteStepAdded = (milestoneIndex: number, stepIndex: number) => {
        if(!workOrder) return false;
        const milestone = workOrder.workMilestones[milestoneIndex];
        if(milestone.steps.length - 1 === stepIndex){
            return milestone.steps.some(step => step.proccess === 'completed') && milestone.evaluatedStatus === 'not_reviewed'
        }
    }

    const showButtonFinishedProduct = () => {
        if(workOrder === null) return;
        const data: IWorkMilestone[] = workOrder && workOrder.workMilestones;
        for(let i = 0; i < data.length; i ++){
            const milestone = data[i];
            const allStepsDone = milestone.steps.every(s => s.proccess === 'completed');
            if(!allStepsDone) return false;
        }

        return true;
        
    }

    const handleOpenUpdateStep = () => {
        setOpenUpdateStep(true);
    }

    {/* upload ảnh tiến độ */}
    const handleBoxClick = () => {
        fileInputImageRef.current?.click();
    };
    
    const handleChangeImages = async(event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(!files) return;
        const resized = await Promise.all(
            Array.from(files).map(async(file) => {
                return resizeImage(file, 800)
            })
        )

        const resizedFiles = resized.map((r) => new File([r.blob], r.name!, { type: "image/*" })) 
        setImageFiles(prev => [...prev, ...resizedFiles]);
        const urls = resized.map((file) => file.previewUrl);
        setImagesUrl((prev) => [...prev, ...urls]);
        setErrorImageFiles('')
        // reset input để có thể chọn lại cùng 1 file
        event.target.value = "";
    }

    const handleRemove = (index: number) => {
        setImagesUrl((prev) => prev.filter((_, i) => i !== index));
        setImageFiles((prev) => prev.filter((_, i) => i !== index));
    }

    {/* upload ảnh sản phẩm */}
    const handleBoxClickProduct = () => {
        fileInputImageRef.current?.click();
    };
    
    const handleChangeProductImage = async(event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) return;
        const { blob, previewUrl } = await resizeImage(file, 800);
        const newFile = new File([blob], file.name, { type: "image/jpeg" });
        setImageProductFile(newFile);
        setImageProductUrl(previewUrl)
        setProductErrorImageFile('')
        // reset input để có thể chọn lại cùng 1 file
        event.target.value = "";
    }

    const handleRemoveProduct = () => {
        setImageProductFile(null);
        setImageProductUrl('');
        if(fileProductImageRef.current){
            fileProductImageRef.current.value = "";
        }
    }

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataProgress;
        if(validName === 'progress'){
            if(value === '20%' || value === '40%' || value === '60%' || value === '80%'){
                setFormDataProgress((prev) => ({ ...prev, 'proccess': 'in_progress', 'progress': value}))
                setProgressErrors(prev => ({ ...prev, 'proccess': '' }))
            }else{
                setFormDataProgress((prev) => ({ ...prev, 'proccess': 'completed', 'progress': value }))
                setProgressErrors(prev => ({ ...prev, 'proccess': '' }))
            }
        }

        if(validName === 'proccess') {
            if(value === 'completed'){
                setFormDataProgress((prev) => ({ ...prev, 'progress': '100%', 'proccess': value }))
            }else{
                setFormDataProgress((prev) => ({ ...prev, 'progress': '', 'proccess': value }))
            }
        }

        setFormDataProgress((prev) => ({ ...prev, [name]: value }));

        if(progressErrors[name as keyof typeof progressErrors]) {
            setProgressErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: ProgressErrors = {};
        if(!formDataProgress.proccess) newErrors.proccess = "Vui lòng chọn trạng thái";
        if(!formDataProgress.progress) newErrors.progress = "Vui lòng chọn tiến độ";
        if(imageFiles.length === 0){
            setErrorImageFiles('Vui lòng chọn ảnh')
        }
        setProgressErrors(newErrors);
        return Object.keys(newErrors).length === 0 && imageFiles.length > 0;
    }

    const handleSave = async(id: string, workMilestoneId: string) => {
        if(!validateForm()) {
            return;
        }
        setIsSubmitting(true);
        try {
            let uploadResponses: any;
            uploadResponses = await uploadImages(imageFiles!, 'order/product/work-order/milestones/steps');
            if(!uploadResponses.success || !uploadResponses.data.files){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh'); 
            }
            const payloadImages = uploadResponses.data.files.map((img: any) => ({
                name: img.originalname,
                url: img.url
            }))
            const payload: StepsPayload = {
                ...formDataProgress,
                workMilestoneId: workMilestoneId,
                images: payloadImages
            }
            const res = await updateStep(id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            getWorkOrderByIdProduct(data.id);
            setOpenUpdateStep(false);
            reset()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    

    const handleSaveStep = async(id: string) => {
        if(nameStep === ''){
            setNameStepError('Vui lòng nhập tên bước')
            return
        }

        try {
            const payload: StepPayload = {
                workMilestoneId: id,
                name: nameStep,
                proccess: 'pending',
                progress: '0%'
            }
            const res = await createStep(payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            getWorkOrderByIdProduct(data.id);
            setOpenAddStep(false);
            reset()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }

    }
    
    const handleFinish = async() => {
        if(imageProductFile === null) {
            setProductErrorImageFile('Vui lòng chọn ảnh')
            return;
        }
        setIsSubmitting(true);
        try {
            let uploadResponse: any;
            uploadResponse = await uploadImage(imageProductFile!, 'order/products');
            if(!uploadResponse.success || !uploadResponse.data.file){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh'); 
            }

            const payload: FormUpdateProduct = {
                status: 'completed',
                nameImage: uploadResponse.data.file.originalname,
                urlImage: uploadResponse.data.file.imageUrl
            }
            const res = await updateImageAndStatusProduct(data.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            reset(),
            onBack()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteStepAdded = async(stepId: string) => {
        try {
            const res = await deletedStepAdded(stepId);
            notify({
                message: res.message,
                severity: 'success'
            });
            getWorkOrderByIdProduct(data.id);
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }
    return(
        <Box>
            <NavigateBack
                title="Tiến độ sản phẩm"
                onBack={() => {
                    reset(),
                    onBack()
                }}
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
                                            {workMilestone.evaluatedStatus === EvaluatedStatusWorkMilestone.REWORK && workMilestone.reworkReason !== null && (
                                                <Typography fontSize='15px'>{`( Lý do phải làm lại: ${workMilestone.reworkReason})`}</Typography>
                                            )}
                                            <Chip
                                                label={getEvaluatedStatusWorkMilestoneLabel(workMilestone.evaluatedStatus)}
                                                color={getEvaluatedStatusWorkMilestoneColor(workMilestone.evaluatedStatus).color}
                                            />
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
                                                                <Box flexDirection='row' display='flex' alignItems='center' gap={2}>
                                                                    {/* Hiển thị nút cập nhật */}
                                                                    {isStepCanUpdate(index, idx) && (
                                                                        <Tooltip
                                                                            title='Cập nhật'
                                                                            onClick={handleOpenUpdateStep}
                                                                        >
                                                                            <Edit sx={{ color: COLORS.BUTTON }}/>
                                                                        </Tooltip>
                                                                    )}
                                                                    {/* Xóa bước vừa thêm */}
                                                                    {deleteStepAdded(index, idx) && (
                                                                        <Tooltip
                                                                            title='Xóa'
                                                                            onClick={() => {
                                                                                if(workMilestone.steps.length - 1 === idx){
                                                                                    handleDeleteStepAdded(step.id)
                                                                                }
                                                                            }}
                                                                        >
                                                                            <Delete color="error"/>
                                                                        </Tooltip>
                                                                    )}
                                                                    {/* Hiển thị icon khóa */}
                                                                    {isStepLocked(index, idx) && (
                                                                        <Tooltip title="Cần hoàn thành các bước trước và chờ đánh giá">
                                                                            <Lock sx={{ color: 'gray'}}/>
                                                                        </Tooltip>
                                                                    )}
                                                                </Box>
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

                                                        {/* Hiển thị ảnh khi cập nhật */}
                                                        {isStepCanUpdate(index, idx) && (
                                                            <Grid size={{ xs: 12}}>
                                                                <Grid container spacing={1}>
                                                                    {imagesUrl.map((img, imgIndex) => (
                                                                        <Box
                                                                            sx={{
                                                                                position: "relative",
                                                                                overflow: "hidden"
                                                                            }}
                                                                        >  
                                                                            <img
                                                                                src={img}
                                                                                alt={`upload-${imgIndex}`}
                                                                                style={{ width: "100%", height: 200, objectFit: "fill" }}
                                                                            />
                                                                            <IconButton
                                                                                onClick={() => handleRemove(imgIndex)}
                                                                                sx={{
                                                                                    position: 'absolute',
                                                                                    top: 4,
                                                                                    right: 4,
                                                                                    bgcolor: 'rgba(0,0,0,0.5)',
                                                                                    color: 'white',
                                                                                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                                                                                }}
                                                                                size="small"
                                                                            >
                                                                                <Delete fontSize="small"/>
                                                                            </IconButton>
                                                                        </Box>
                                                                    ))}                                                                
                                                                </Grid>
                                                            </Grid>
                                                        )}
                                                        {/* Cập nhập tiến độ */}
                                                        {openUpdateStep && isStepCanUpdate(index, idx) && (
                                                            <Grid size={{ xs: 12 }}>
                                                                <Paper elevation={2} sx={{ borderRadius: 2, border: '1px solid #bebabaff', p: 1.5 }}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid size={{ xs: 12, md: 6}}>
                                                                            <Typography mb={1} fontSize='14px' fontWeight={500}>Tiến độ</Typography>
                                                                            <InputSelect
                                                                                label=""
                                                                                value={formDataProgress.progress}
                                                                                options={DATA_PROGRESS.slice(1,6)}
                                                                                name="progress"
                                                                                onChange={handleInputChange}
                                                                                placeholder="Chọn tiến độ"
                                                                                sx={{ mb: 1}}
                                                                                error={!!progressErrors.progress}
                                                                                helperText={progressErrors.progress}
                                                                                
                                                                            />
                                                                            <Typography mb={1} fontSize='14px' fontWeight={500}>Trạng thái</Typography>
                                                                            <InputSelect
                                                                                label=""
                                                                                value={formDataProgress.proccess}
                                                                                options={DATA_PROCCESS.slice(1,3)}
                                                                                name="proccess"
                                                                                onChange={handleInputChange}
                                                                                placeholder="Chọn trạng thái"
                                                                                error={!!progressErrors.proccess}
                                                                                helperText={progressErrors.proccess}
                                                                            />
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, md: 6}}>
                                                                            <Box>
                                                                                <input
                                                                                    type="file"
                                                                                    accept="image/*"
                                                                                    capture="environment"
                                                                                    hidden
                                                                                    ref={fileInputImageRef}
                                                                                    onChange={handleChangeImages}
                                                                                    multiple
                                                                                />
                                                                                <Box
                                                                                    onClick={handleBoxClick}
                                                                                    sx={{
                                                                                        border: errorImageFiles ? '2px dashed red' : '2px dashed #ccc',
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
                                                                                        <CameraAlt sx={{ fontSize: 48, color: 'text.secondary' }} />
                                                                                        <Typography fontSize='14px'>{isSmall ? 'Tải lên hình ảnh trực tiếp.' : 'Tải lên dữ liệu files ảnh trong thư viện.'}</Typography>
                                                                                        <Typography fontSize='14px'>{isSmall ? 'Chụp ảnh từ camera của bạn.' : 'JPG, JPEG, PNG, MOV,...'}</Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Box>
                                                                            {errorImageFiles && (
                                                                                <Typography align="center" fontSize='14px' mt={1} color="error">{errorImageFiles}</Typography>
                                                                            )}
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Box mt={2} display='flex' justifyContent='center'>
                                                                        <Button
                                                                            sx={{ bgcolor: COLORS.BUTTON, width: 150 }}
                                                                            onClick={() => step && handleSave(step.id, workMilestone.id)}
                                                                        >
                                                                            Lưu
                                                                        </Button>
                                                                    </Box>
                                                                </Paper>
                                                            </Grid>
                                                        )} 

                                                        {/* Thêm bước nếu cần */}
                                                        {canAddStep(index, idx) && (
                                                            <Grid size={{ xs: 12 }}>
                                                                <Box mt={1.5} display='flex' justifyContent='flex-end'>
                                                                    <Button
                                                                        variant="outlined"
                                                                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                                                                        onClick={() => {
                                                                            setOpenAddStep(true)
                                                                            setMilestoneIndex(index)
                                                                        }}
                                                                    >
                                                                        Thêm bước ở mốc {index + 1}
                                                                    </Button>
                                                                </Box>
                                                            </Grid>
                                                        )} 

                                                        {/* Thêm bước */}
                                                        <Grid size={{ xs: 12 }}>
                                                            {openAddStep && canAddStep(index, idx) && (milestoneIndex === index) && (
                                                                <Paper elevation={2} sx={{ borderRadius: 2, border: '1px solid #bebabaff', p: 1.5 }}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid size={{ xs: 12, md: 4 }}>
                                                                            <Typography fontSize='14px' fontWeight={600}>Tên</Typography>
                                                                            <InputText
                                                                                label=""
                                                                                name="name"
                                                                                type="text"
                                                                                value={nameStep}
                                                                                onChange={(name: string, value: any) => {
                                                                                    setNameStep(value);
                                                                                    setNameStepError('')
                                                                                }}
                                                                                error={!!nameStepError}
                                                                                helperText={nameStepError}
                                                                            />
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, md: 4 }}>
                                                                            <Typography fontSize='14px' fontWeight={600}>Tiến độ</Typography>
                                                                            <InputSelect
                                                                                label=""
                                                                                value={'0%'}
                                                                                options={DATA_PROGRESS}
                                                                                name="progress"
                                                                                onChange={() => {}}
                                                                                placeholder="Chọn tiến độ"
                                                                                sx={{ mb: 1}}
                                                                                disabled
                                                                            />
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12, md: 4 }}>
                                                                            <Typography fontSize='14px' fontWeight={600}>Trạng thái</Typography>
                                                                            <InputSelect
                                                                                label=""
                                                                                value={'pending'}
                                                                                options={DATA_PROCCESS}
                                                                                name="proccess"
                                                                                onChange={() => {}}
                                                                                placeholder="Chọn trạng thái"
                                                                                sx={{ mb: 1}}
                                                                                disabled
                                                                            />
                                                                        </Grid>
                                                                        <Grid sx={{ display: 'flex', justifyContent: 'center' }} size={{ xs: 12 }}>
                                                                            <Button
                                                                                sx={{ bgcolor: COLORS.BUTTON, width: 150, mr: 2 }}
                                                                                onClick={() => workMilestone && handleSaveStep(workMilestone.id)}
                                                                            >
                                                                                Lưu
                                                                            </Button>
                                                                            <Button
                                                                                variant="outlined"
                                                                                sx={{ color: COLORS.BUTTON, width: 150, border: `1px solid ${COLORS.BUTTON}` }}
                                                                                onClick={() => {
                                                                                    setOpenAddStep(false);
                                                                                    setNameStepError('')
                                                                                    setNameStep('')
                                                                                }}
                                                                            >
                                                                                Đóng
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Paper>
                                                            )}                                                             
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
                {showButtonFinishedProduct() && (
                    <>
                        <Typography fontSize='15px'>Hình ảnh sản phẩm</Typography>
                        {imageProductUrl ? (
                            <Box
                                sx={{
                                    position: "relative",
                                    overflow: "hidden"
                                }}
                            >  
                                <img
                                    src={imageProductUrl}
                                    alt={`upload-product`}
                                    style={{ width: "100%", height: 200, objectFit: "fill" }}
                                />
                                <IconButton
                                    onClick={handleRemoveProduct}
                                    sx={{
                                        position: 'absolute',
                                        top: 4,
                                        right: 4,
                                        bgcolor: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                                    }}
                                    size="small"
                                >
                                    <Delete fontSize="small"/>
                                </IconButton>
                            </Box>                            
                        ) : (
                            <Box>
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    hidden
                                    ref={fileInputImageRef}
                                    onChange={handleChangeProductImage}
                                />
                                <Box
                                    onClick={handleBoxClickProduct}
                                    sx={{
                                        border: errorProductImageFile ? '2px dashed red' : '2px dashed #ccc',
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
                                        <CameraAlt sx={{ fontSize: 48, color: 'text.secondary' }} />
                                        <Typography fontSize='14px'>{isSmall ? 'Tải lên hình ảnh trực tiếp.' : 'Tải lên dữ liệu files ảnh trong thư viện.'}</Typography>
                                        <Typography fontSize='14px'>{isSmall ? 'Chụp ảnh từ camera của bạn.' : 'JPG, JPEG, PNG, MOV,...'}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                        {errorProductImageFile && (
                            <Typography align="center" fontSize='14px' mt={1} color="error">{errorProductImageFile}</Typography>
                        )}
                        <Button
                            fullWidth
                            sx={{ bgcolor: COLORS.BUTTON, mt: 2, borderRadius: 3 }}
                            onClick={handleFinish}
                        >
                            Hoàn thành đơn hàng
                        </Button>  
                    </>                  
                )}

            </Paper>
            {isSubmitting && (
                <Backdrop open={isSubmitting}/>
            )}
        </Box>
    )
}

export default ProgressProduct
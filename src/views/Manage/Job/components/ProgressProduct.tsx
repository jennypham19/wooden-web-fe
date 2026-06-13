import { ChangeEvent, useEffect, useRef, useState } from "react";



import { AddPhotoAlternate, CameraAlt, Delete, Edit, Lock } from "@mui/icons-material";
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
import { createStep, deletedStepAdded, updateImagesStepAgain, updateStep } from "@/services/order-service";
import { deleteImageStep, getDetailWorkOrderByProduct, updateImageAndStatusProduct } from "@/services/product-service";
import { uploadImage, uploadImages } from "@/services/upload-service";
import { ImagesStepAgainPayload, IWorkMilestone, IWorkOrder, StepPayload, StepsPayload } from "@/types/order";
import { FormDataDimesionProduct, FormUpdateProduct, IProduct } from "@/types/product";
import { resizeImage } from "@/utils/common";
import { getEvaluatedStatusWorkMilestoneColor, getEvaluatedStatusWorkMilestoneLabel, getNumber, getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel, getStatusProductLabel } from "@/utils/labelEntoVni";
import { EvaluatedStatusWorkMilestone } from "@/constants/status";
import { renderTextWithAsterisk } from "../../components/common";
import { FormDataDimesionProductErrors } from "@/types/error";
import DialogConfirm from "../../components/DialogConfirm";
import ImagesStepUpload from "./ImagesStepUpload";


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

    // Hình ảnh upload lúc đầu
    const [errorImageFiles, setErrorImageFiles] = useState('');
    const fileInputImageRef = useRef<HTMLInputElement | null>(null);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagesUrl, setImagesUrl] = useState<string[]>([]);

    // Hình ảnh upload lại
    const [errorImageFilesAgain, setErrorImageFilesAgain] = useState('');
    const fileInputImageAgainRef = useRef<HTMLInputElement | null>(null);
    const [imageFilesAgain, setImageFilesAgain] = useState<File[]>([]);
    const [imagesAgainUrl, setImagesAgainUrl] = useState<string[]>([]);

    // Tiến độ các mốc
    const [formDataProgress, setFormDataProgress] = useState<FormDataProgress>({
        proccess: '',
        progress: ''
    })
    const [progressErrors, setProgressErrors] = useState<ProgressErrors>({});

    // Kích thước sản phẩm
    const [formDataDimensionProduct, setFormDataDimensionProduct] = useState<FormDataDimesionProduct>({
        length: null,
        width: null,
        height: null
    })
    const [dimensionProductErrors, setDimensionProductErrors] = useState<FormDataDimesionProductErrors>({})

    const [milestoneIndex, setMilestoneIndex] = useState<number | null>(null);
    const [nameStep, setNameStep] = useState('');
    const [nameStepError, setNameStepError] = useState('');
    const [imageId, setImageId] = useState<string | null>(null);
    
    const [openUpdateStep, setOpenUpdateStep] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openAddStep, setOpenAddStep] = useState(false);
    const [openDeleteImage, setOpenDeleteImage] = useState(false);
    const [uploadImageStepAgain, setUploadImageStepAgain] = useState(false);
    const [stepId, setStepId] = useState<string | null>(null)

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
        setProductErrorImageFile('');
        setImageId(null);
        setImageFilesAgain([]);
        setErrorImageFilesAgain('');
        setImagesAgainUrl([])
    }

    // Mở dialog xóa ảnh
    const handleOpenDeleteImage = (id: string) => {
        setOpenDeleteImage(true)
        setImageId(id)
    }

    const handleCloseDeleteImage = () => {
        setOpenDeleteImage(false);
        setImageId(null);
    }

    const handleAgreeDeleteImage = async() => {
        setIsSubmitting(true)
        try {
            const res = imageId && await deleteImageStep(imageId);
            notify({
                message: res.message,
                severity: 'success'
            })
            handleCloseDeleteImage();
            getWorkOrderByIdProduct(data.id);
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // upload ảnh thay thế ảnh bị sai trong mốc
    const handleOpenUploadImageStepAgain = (id: string) => {
        setUploadImageStepAgain(true);
        setStepId(id)
    }

    const handleCloseUploadImageStepAgain = () => {
        setUploadImageStepAgain(false);
        setStepId(null);
        setImageFilesAgain([]);
        setImagesAgainUrl([])
    }

    const handleBoxClickAgain = () => {
        fileInputImageAgainRef.current?.click();
    };
    
    const handleChangeImagesAgain = async(event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(!files) return;
        const resized = await Promise.all(
            Array.from(files).map(async(file) => {
                return resizeImage(file, 800)
            })
        )

        const resizedFiles = resized.map((r) => new File([r.blob], r.name!, { type: "image/*" })) 
        setImageFilesAgain(prev => [...prev, ...resizedFiles]);
        const urls = resized.map((file) => file.previewUrl);
        setImagesAgainUrl((prev) => [...prev, ...urls]);
        setErrorImageFilesAgain('')
        // reset input để có thể chọn lại cùng 1 file
        event.target.value = "";
    }

    const handleRemoveAgain = (index: number) => {
        setImagesAgainUrl((prev) => prev.filter((_, i) => i !== index));
        setImageFilesAgain((prev) => prev.filter((_, i) => i !== index));
    }

    const handleSaveImageStepAgain = async() => {
        if(imageFilesAgain.length === 0){
            setErrorImageFilesAgain('Vui lòng chọn ảnh');
            return
        }
        setIsSubmitting(true);
        try {
            let uploadResponses: any;
            uploadResponses = await uploadImages(imageFilesAgain!, 'order/product/work-order/milestones/steps');
            if(!uploadResponses.success || !uploadResponses.data.files){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh'); 
            }
            const payloadImages = uploadResponses.data.files.map((img: any) => ({
                name: img.originalname,
                url: img.url
            })) 
            const payload: ImagesStepAgainPayload = {
                images: payloadImages,
            }  
            const res = stepId && await updateImagesStepAgain(stepId, payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            handleCloseUploadImageStepAgain();
            getWorkOrderByIdProduct(data.id);
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    // Hiển thị nút cập nhật hình ảnh và tiến độ các bước
    const isStepCanUpdate = (milestoneIndex: number, stepIndex: number) => {
        if(!workOrder) return false;

        // 1. Kiểm tra các mốc trước đã hoàn thành và được đánh giá là đạt chưa
        // for(let i = 0; i < milestoneIndex; i++){
        //     const milestone = workOrder.workMilestones[i];
        //     const allStepsDone = milestone.steps.every(s => s.proccess === 'completed') && milestone.evaluatedStatus === 'approved';
        //     if(!allStepsDone) return false;
        // }

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

    // Hiện thị nút cập nhật lại ảnh do ảnh đã cập nhật bị sai
    const isImageStepAgain = (milestoneIndex: number, stepIndex: number) => {
        if(!workOrder) return false;
        
        // 1. Kiểm tra các mốc
        for(let i = 0; i < milestoneIndex; i++){
            const milestone = workOrder.workMilestones[i];
            const allStepsDone = milestone.steps.every(s => s.proccess === 'completed');
            if(!allStepsDone) return false;
        }

        // 2. Kiểm tra các bước trước trong cùng mốc
        const currentMilestone = workOrder.workMilestones[milestoneIndex];
        console.log("currentMilestone: ", currentMilestone);
        
        for(let j = 0; j < stepIndex; j++) {
            if(currentMilestone.steps[j].proccess === 'pending'){
                return false
            }
        }

        // 3. Lấy step đã hoàn thành để hiện thị nút
        return currentMilestone.steps[stepIndex].proccess === 'completed'
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

        // 1. Kiểm tra các mốc đã hoàn thành chưa để hiện thị thêm button
        const milestone = workOrder.workMilestones[milestoneIndex];

        // Tất cả step đã hoàn thành
        // if(milestone.steps.length - 1 === stepIndex){
        //     return milestone.steps.every(step => step.proccess === 'completed') && milestone.evaluatedStatus !== 'approved'
        // }
        if(milestone.steps.length - 1 === stepIndex){
            return milestone.steps.every(step => step.proccess === 'completed')
        }
    }

    const deleteStepAdded = (milestoneIndex: number, stepIndex: number) => {
        if(!workOrder) return false;
        // 1. Kiểm tra các mốc
        for(let i = 0; i < milestoneIndex; i++){
            const milestone = workOrder.workMilestones[i];
            const allStepsDone = milestone.steps.every(s => s.proccess === 'completed');
            if(!allStepsDone) return false;
        }

        const milestone = workOrder.workMilestones[milestoneIndex];
        // if(milestone.steps.length - 1 === stepIndex){
        //     return milestone.steps.some(step => step.proccess === 'completed') && milestone.evaluatedStatus === 'not_reviewed'
        // }
        if(milestone.steps.length - 1 === stepIndex){
            return milestone.steps.every(step => step.proccess === 'completed')
        }
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

    // Kích thước sản phẩm
    const handleInputChangeDimensionProduct = (name: string, value: any) => {
        setFormDataDimensionProduct((prev) => ({ ...prev, [name]: value}));
        if(dimensionProductErrors[name as keyof typeof dimensionProductErrors]) {
            setDimensionProductErrors(prev => ({ ...prev, [name]: undefined}))
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

    // Validate kích thước sản phẩm
    const validateFormDimensionProduct = (): boolean => {
        const newErrors: FormDataDimesionProductErrors = {};
        if(!formDataDimensionProduct.length) newErrors.length = "Vui lòng nhập chiều dài";
        if(!formDataDimensionProduct.width) newErrors.width = "Vui lòng nhập chiều rộng";
        if(!formDataDimensionProduct.height) newErrors.height = "Vui lòng nhập chiều cao";
        if(imageProductFile === null) {
            setProductErrorImageFile('Vui lòng chọn ảnh')
        }
        setDimensionProductErrors(newErrors);
        return Object.keys(newErrors).length === 0 && imageProductFile !== null
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
    
    // Hoàn thành sản phẩm
    const handleFinish = async() => {
        if(!validateFormDimensionProduct()) {
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
                urlImage: uploadResponse.data.file.imageUrl,
                length: formDataDimensionProduct.length,
                width: formDataDimensionProduct.width,
                height: formDataDimensionProduct.height
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
    console.log("data: ", workOrder?.workMilestones.map(el => el.steps.every(step => step.proccess === 'completed')));
    
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
                                            {/* <Chip
                                                label={getEvaluatedStatusWorkMilestoneLabel(workMilestone.evaluatedStatus)}
                                                color={getEvaluatedStatusWorkMilestoneColor(workMilestone.evaluatedStatus).color}
                                            /> */}
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
                                                                    {/* Hiển thị nút cập nhật lại hình ảnh do hình ảnh cũ bị lỗi */}
                                                                    {isImageStepAgain(index, idx) && (
                                                                        <Tooltip
                                                                            title= "Cập nhật lại hình ảnh"
                                                                        >
                                                                            <IconButton onClick={() => step && handleOpenUploadImageStepAgain(step.id)}>
                                                                                <AddPhotoAlternate sx={{ color: COLORS.BUTTON }}/>
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    )}
                                                                    {/* Hiển thị nút cập nhật */}
                                                                    {isStepCanUpdate(index, idx) && (
                                                                        <Tooltip
                                                                            title='Cập nhật'
                                                                        >
                                                                            <IconButton
                                                                                onClick={handleOpenUpdateStep}
                                                                            >
                                                                                <Edit sx={{ color: COLORS.BUTTON }}/>
                                                                            </IconButton>
                                                                        
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
                                                                    {/* {isStepLocked(index, idx) && (
                                                                        <Tooltip title="Cần hoàn thành các bước trước và chờ đánh giá">
                                                                            <Lock sx={{ color: 'gray'}}/>
                                                                        </Tooltip>
                                                                    )} */}
                                                                </Box>
                                                            </Box>
                                                        </Grid>

                                                        {/* Hình ảnh của bước trong mốc */}
                                                        {step.images.length > 0 && (
                                                            <Grid size={{ xs: 12}}>
                                                                <Grid container spacing={1}>
                                                                    {step.images.map((img, imgIndex) => (
                                                                        <Grid key={imgIndex} size={{ xs: 12, md: 3}}>
                                                                            <Box
                                                                                sx={{ position: "relative", overflow: "hidden" }}
                                                                            >
                                                                                <CommonImage
                                                                                    src={img.url}
                                                                                    alt={img.name}
                                                                                    sx={{ height: 180, width: '100%' }}
                                                                                />
                                                                                <IconButton
                                                                                    onClick={() => img && handleOpenDeleteImage(img.id)}
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

                                                        {/* Hiển thị ảnh khi đc cập nhật lại */}
                                                        {uploadImageStepAgain && stepId === step.id && (
                                                            <Grid size={{ xs: 12}}>
                                                                <Grid container spacing={1}>
                                                                    {imagesAgainUrl.map((img, imgAgainIndex) => (
                                                                        <Box
                                                                            sx={{
                                                                                position: "relative",
                                                                                overflow: "hidden"
                                                                            }}
                                                                        >  
                                                                            <img
                                                                                src={img}
                                                                                alt={`upload-${imgAgainIndex}`}
                                                                                style={{ width: "100%", height: 200, objectFit: "fill" }}
                                                                            />
                                                                            <IconButton
                                                                                onClick={() => handleRemoveAgain(imgAgainIndex)}
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
                                                        {/* Hình ảnh được up lại để thay thế ảnh cũ */}
                                                        {uploadImageStepAgain && stepId === step.id && (
                                                            <Grid size={{ xs: 12 }}>
                                                                <Paper elevation={1}>
                                                                    <Grid container spacing={2}>
                                                                        <Grid size={{ xs: 12 }}>
                                                                            <ImagesStepUpload
                                                                                fileInputImageRef={fileInputImageAgainRef}
                                                                                onChangeImages={handleChangeImagesAgain}
                                                                                onBoxClick={handleBoxClickAgain}
                                                                                errorImageFiles={errorImageFilesAgain}
                                                                                isSmall={isSmall}
                                                                            />
                                                                        </Grid>
                                                                        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                                                                            <Button
                                                                                sx={{ bgcolor: COLORS.BUTTON, width: { md: 150 } }}
                                                                                onClick={handleSaveImageStepAgain}
                                                                            >
                                                                                Lưu
                                                                            </Button>
                                                                            <Button
                                                                                variant="outlined"
                                                                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: { md: 150} }}
                                                                                onClick={handleCloseUploadImageStepAgain}
                                                                            >
                                                                                Hủy
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Paper>
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
                                                                            <ImagesStepUpload
                                                                                fileInputImageRef={fileInputImageRef}
                                                                                onChangeImages={handleChangeImages}
                                                                                onBoxClick={handleBoxClick}
                                                                                errorImageFiles={errorImageFiles}
                                                                                isSmall={isSmall}
                                                                            />
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
                {!workOrder?.workMilestones.map(el => el.steps.every(step => step.proccess === 'completed')) && (
                    <>
                        <Typography fontSize='15px' fontWeight={600}>Hình ảnh sản phẩm</Typography>
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
                                        <Typography fontSize='14px'>{isSmall ? 'Chụp ảnh từ camera của bạn.' : 'Tải lên dữ liệu files ảnh trong thư viện.'}</Typography>
                                        <Typography fontSize='14px'>'JPG, JPEG, PNG, MOV,...'</Typography>
                                    </Box>
                                </Box>
                             </Box>
                        )}
                        {errorProductImageFile && (
                            <Typography my={1} align="center" fontSize='14px' color="error">{errorProductImageFile}</Typography>
                        )} 
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid size={{ xs: 4 }}>
                                {renderTextWithAsterisk('Chiều dài')}
                                <InputText
                                    type="text"
                                    label=""
                                    name="length"
                                    value={formDataDimensionProduct.length}
                                    onChange={handleInputChangeDimensionProduct}
                                    error={!!dimensionProductErrors.length}
                                    helperText={dimensionProductErrors.length}
                                    inputLabel='cm'
                                    placeholder="Số"
                                />
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                {renderTextWithAsterisk('Chiều rộng')}
                                <InputText
                                    type="text"
                                    label=""
                                    name="width"
                                    value={formDataDimensionProduct.width}
                                    onChange={handleInputChangeDimensionProduct}
                                    error={!!dimensionProductErrors.width}
                                    helperText={dimensionProductErrors.width}
                                    inputLabel='cm'
                                    placeholder="Số"
                                />
                            </Grid>
                            <Grid size={{ xs: 4 }}>
                                {renderTextWithAsterisk('Chiều cao')}
                                <InputText
                                    type="text"
                                    label=""
                                    name="height"
                                    value={formDataDimensionProduct.height}
                                    onChange={handleInputChangeDimensionProduct}
                                    error={!!dimensionProductErrors.height}
                                    helperText={dimensionProductErrors.height}
                                    inputLabel='cm'
                                    placeholder="Số"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            sx={{ bgcolor: COLORS.BUTTON, mt: 2, borderRadius: 3 }}
                            onClick={handleFinish}
                        >
                            Hoàn thành sản phẩm
                        </Button>  
                    </>                  
                )}

            </Paper>
            {isSubmitting && (
                <Backdrop open={isSubmitting}/>
            )}
            {openDeleteImage && (
                <DialogConfirm
                    open={openDeleteImage}
                    onClose={handleCloseDeleteImage}
                    onAgree={handleAgreeDeleteImage}
                    title="Bạn thực sự muốn xóa ảnh này chứ?"
                />
            )}
        </Box>
    )
}

export default ProgressProduct
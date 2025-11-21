import NavigateBack from "@/views/Manage/components/NavigateBack";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import React, { useEffect, useRef, useState } from "react";
import { getOrders } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { IProduct } from "@/types/product";
import InputSelect from "@/components/InputSelect";
import InputMaskTextField from "@/components/InputMaskTextField";
import { getProductsByOrderId } from "@/services/product-service";
import { DesignRequestPayload, FormDataDesignRequets, FormDataInputFiles, FormDataReferenceLinks, FormDataTechnicalSpecification } from "@/types/design-request";
import { Add, DeleteOutline, RemoveCircleOutline, UploadFile } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import { resizeImage, resizeImages } from "@/utils/common";
import IconButton from "@/components/IconButton/IconButton";
import TechnicalSpecification from "./TechnicalSpecification";
import useNotification from "@/hooks/useNotification";
import { uploadFiles } from "@/services/upload-service";
import FileViewer from "./FileViewer";
import Backdrop from "@/components/Backdrop";
import { createDesignRequest } from "@/services/design-request-service";
import useAuth from "@/hooks/useAuth";

interface CreateDesignRequestProps{
    onBack: () => void;
    open: boolean
}

const STATUS_REQ: { id: number, value: string, label: string }[] = [
    {
        id: 1,
        value: 'pending',
        label: 'Đang thiết kế'
    },
    {
        id: 2,
        value: 'done',
        label: 'Hoàn thành'
    }
]

const PRIORITY_REQ: { id: number, value: string, label: string }[] = [
    {
        id: 1,
        value: 'low',
        label: 'Thấp'
    },
    {
        id: 2,
        value: 'medium',
        label: 'Trung bình'
    },
    {
        id: 3,
        value: 'high',
        label: 'Cao'
    },
    {
        id: 4,
        value: 'urgent',
        label: 'Khẩn'
    }
]

type FormErrors = {
    [K in keyof FormDataDesignRequets]?: string
}

export type FormErrorsTechnicalSpecification = {
    [K in keyof FormDataTechnicalSpecification]?: string
}

interface FileWithPreview {
  file: File;
  previewUrl: string;
  type: "image" | "video" | "pdf" | "word" | "other";
}

const CreateDesignRequest = (props: CreateDesignRequestProps) => {
    const { onBack, open } = props;
    const notify = useNotification();
    const { profile } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [customer, setCustomer] = useState<{ id: string, name: string}>({
        id: '',
        name: ''
    });
    const [formData, setFormData] = useState<FormDataDesignRequets>({
        title: '', orderId: '', productId: '', priority: '', status: 'pending', dueDate: null, description: '', specialRequirement: ''
    });
    const [formDataTechnicalSpecification, setFormDataTechnicalSpecification] = useState<FormDataTechnicalSpecification>({
        length: null, width: null, height: null, weight: null, material: '', color: '', note: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [errorsTechnicalSpecification, setErrorsTechnicalSpecification] = useState<FormErrorsTechnicalSpecification>({});
    const [codeReq, setCodeReq] = useState('');
    const [errorCodeReq, setErrorCodeReq] = useState<string | null>(null);
    const [amountFiles, setAmountFiles] = useState<File[]>([]);
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [referenceLinkSlots, setReferenceLinkSlots] = useState<(string | null)[]>([]);
    const [openDialogFile, setOpenDialogFile] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if(open){
            const queryOrders = async() => {
                const res = await getOrders({ page: 1, limit: 100 });
                const data = res.data?.data as any as IOrder[];
                setOrders(data)
            };
            queryOrders();
            setReferenceLinkSlots([null])
        }
    },[open])

    const handleBack = () => {
        onBack();
        setErrorCodeReq(null);
        setErrors({})
        setFormData({
            title: '', orderId: '', productId: '', priority: '', status: 'pending', dueDate: null, description: '', specialRequirement: ''
        });
        setCodeReq('');
        setCustomer({ id: '', name: ''});
        setReferenceLinkSlots([]);
        setFormDataTechnicalSpecification({
            length: null, width: null, height: null, weight: null, material: '', color: '', note: ''
        })
    }
    
    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const handleInputChangeTechnicalSpecification = (name: string, value: any) => {
        setFormDataTechnicalSpecification(prev => ({ ...prev, [name]: value }));
        if(errorsTechnicalSpecification[name as keyof typeof errorsTechnicalSpecification]){
            setErrorsTechnicalSpecification(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const handleChangeSelect = async(name: string, value: any) => {
        const res = await getProductsByOrderId(value);
        const data = res.data as any as IProduct[];
        setProducts(data)
        const newValue = orders.find(el => el.id === value);
        if(newValue?.customer){
            setCustomer({
                id: newValue?.customer.id,
                name: newValue?.customer.name
            })            
        }
        setFormData(prev => ({ ...prev, orderId: value }))
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, orderId: undefined}))
        }
    }

    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const arrFiles = files && Array.from(files);
        
        if(arrFiles){
            setAmountFiles((prev) => ([...prev, ...arrFiles]));
            const processedFiles: FileWithPreview[] = [];
            for(const file of arrFiles){
                let resizedFile = file;
                
                // 1️⃣ Nén ảnh
                if (file.type.startsWith("image/")) {
                    resizedFile = await resizeImages(file); // 200–500KB
                }

                // // 2️⃣ Nén PDF
                // if (file.type === "application/pdf") {
                //     resizedFile = await compressPDF(file); // giảm 40–70%
                // }

                // // 3️⃣ Nén Word
                // if (file.type.includes("word") || file.name.endsWith(".docx")) {
                //     resizedFile = await compressDocx(file); // giảm ~30–60%
                // }

                let previewUrl = URL.createObjectURL(resizedFile);
    
                let type: FileWithPreview["type"] = "other";
                if (file.type.startsWith("image/")) type = "image";
                if (file.type.startsWith("video/")) type = "video";
                if (file.type === "application/pdf") type = "pdf";
                if (file.type.includes("word") || resizedFile.name.endsWith(".docx")) type = "word";
                
                processedFiles.push({ file: resizedFile, previewUrl, type });
            }

            setFiles((prev) => ([...prev, ...processedFiles]));
        }
        // reset input value
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setAmountFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddReferenceLinkSlot = () => {
        setReferenceLinkSlots(prev => [...prev, null]);
    }

    const handleRemoveReferenceLinkSlot = (indexToRemove: number) => {
        setReferenceLinkSlots(prev => prev.filter((_, index) => index !== indexToRemove))
    }

    const handleReferenceLinkSlotChange = (index: number, newValue: string) => {
        setReferenceLinkSlots(prev => {
            const newSlots = [...prev];
            newSlots[index] = newValue;
            return newSlots;
        })
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if(codeReq === '') setErrorCodeReq('Mã yêu cầu không được để trống');
        if(!formData.title) newErrors.title = 'Tiêu đề không được để trống';
        if(!formData.orderId) newErrors.orderId = 'Đơn hàng không được để trống';
        if(!formData.productId) newErrors.productId = 'Sản phẩm không được để trống';
        if(!formData.priority) newErrors.priority = 'Độ ưu tiên không được để trống';
        if(!formData.dueDate) newErrors.dueDate = 'Deadline hoàn thành không được để trống';
        if(!formData.description) newErrors.description = 'Mô tả không được để trống';

        const newErrorsTechnicalSpecification: FormErrorsTechnicalSpecification = {};
        if(!formDataTechnicalSpecification.length) newErrorsTechnicalSpecification.length = 'Độ dài không được để trống';
        if(!formDataTechnicalSpecification.width) newErrorsTechnicalSpecification.width = 'Độ rộng không được để trống';
        if(!formDataTechnicalSpecification.height) newErrorsTechnicalSpecification.height = 'Chiều cao không được để trống';
        if(!formDataTechnicalSpecification.weight) newErrorsTechnicalSpecification.weight = 'Cân nặng không được để trống';
        if(!formDataTechnicalSpecification.material) newErrorsTechnicalSpecification.material = 'Chất liệu không được để trống';
        if(!formDataTechnicalSpecification.color) newErrorsTechnicalSpecification.color = 'Màu sắc không được để trống';

        setErrors(newErrors);
        setErrorsTechnicalSpecification(newErrorsTechnicalSpecification);
        return Object.keys(newErrors).length === 0 && !!codeReq && Object.keys(newErrorsTechnicalSpecification).length === 0;
    }

    const handleSubmit = async() => {
        if(!validateForm()){
            return;
        }
        setIsSubmitting(true)
        try {
            const payloadReferenceLink: FormDataReferenceLinks[] = referenceLinkSlots.map((slot) => ({
                url: slot
            }));

            const uploadFilesResponses = files && await uploadFiles(files.map(el => el.file), 'design-requets');
            if(!uploadFilesResponses.success || !uploadFilesResponses.data?.files){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }
            
            const payloadInputFiles: FormDataInputFiles[] = uploadFilesResponses.data.files.map((file) => ({
                name: file.name,
                url: file.url
            }))
            const payload: DesignRequestPayload = {
                ...formData,
                customerId: customer.id,
                curatorId: profile && profile?.id,
                requestCode: codeReq,
                inputFiles: files.length > 0 ? payloadInputFiles : [],
                referenceLinks: referenceLinkSlots[0] === null ? [] : payloadReferenceLink,
                technicalSpecification: formDataTechnicalSpecification
            }
            const res = await createDesignRequest(payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            handleBack();
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }finally {
            setIsSubmitting(false)
        }
    }

    return(
        <Box>
            <NavigateBack
                title="Thêm mới yêu cầu thiết kế"
                onBack={handleBack}
            />
            <Paper elevation={2} sx={{ p: 3, margin: '0 auto', m: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Mã yêu cầu</Typography>
                        <InputMaskTextField
                            mask="REQ999"
                            value={codeReq}
                            onChange={(value) => {
                                setCodeReq(value)
                                setErrorCodeReq('')
                            }}
                            placeholder="REQ___"
                            error={!!errorCodeReq}
                            helperText={errorCodeReq}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography fontWeight={600} fontSize='15px'>Tiêu đề</Typography>
                        <InputText
                            label=""
                            value={formData.title}
                            name="title"
                            type="text"
                            onChange={handleInputChange}
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Đơn hàng</Typography>
                        <InputSelect
                            label=""
                            name="orderId"
                            value={formData.orderId}
                            options={orders}
                            transformOptions={(data) =>
                                data.map((item) => ({
                                    value: item.id,
                                    label: item.name
                                }))
                            }
                            onChange={handleChangeSelect}
                            placeholder="Chọn đơn hàng"
                            error={!!errors.orderId}
                            helperText={errors.orderId}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Sản phẩm</Typography>
                        <InputSelect
                            label=""
                            name="productId"
                            value={formData.productId}
                            options={products}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    value: item.id,
                                    label: item.name
                                }))
                            }
                            onChange={handleInputChange}
                            placeholder="Chọn sản phẩm"
                            error={!!errors.productId}
                            helperText={errors.productId}
                            disabled={!formData.orderId}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Khách hàng</Typography>
                        <InputText
                            label=""
                            name="customerId"
                            value={customer.name}
                            type="text"
                            onChange={handleInputChange}
                            disabled
                        />
                        
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Độ ưu tiên</Typography>
                        <InputSelect
                            label=""
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                            options={PRIORITY_REQ}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    value: item.value,
                                    label: item.label
                                }))
                            }
                            placeholder="Chọn độ ưu tiên"
                            error={!!errors.priority}
                            helperText={errors.priority}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Trạng thái</Typography>
                        <InputSelect
                            label=""
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            options={STATUS_REQ}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    value: item.value,
                                    label: item.label
                                }))
                            }
                            placeholder="Trạng thái"
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Deadline hoàn thành</Typography>
                        <InputText
                            label=""
                            name="dueDate"
                            value={formData.dueDate}
                            type="date"
                            onChange={handleInputChange}
                            error={!!errors.dueDate}
                            helperText={errors.dueDate}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} fontSize='15px'>Mô tả</Typography>
                        <InputText
                            label=""
                            name="description"
                            multiline
                            rows={5}
                            type="text"
                            onChange={handleInputChange}
                            error={!!errors.description}
                            helperText={errors.description}
                            value={formData.description}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} fontSize='15px'>Yêu cầu đặc biệt từ khách</Typography>
                        <InputText
                            label=""
                            name="specialRequirement"
                            multiline
                            rows={5}
                            type="text"
                            onChange={handleInputChange}
                            value={formData.specialRequirement}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<UploadFile/>}
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                            >
                                Tải file đầu vào (DPF, Word, ảnh, video)
                                <input ref={inputRef} hidden multiple type="file" onChange={handleFileChange}/>
                            </Button>
                            <Typography variant="body2">
                                {amountFiles.length} file được chon
                            </Typography>                            
                        </Stack>
                        {files.length > 0 && (
                            <Stack spacing={2} mt={2}>
                                {files.map((f, idx) => (
                                    
                                    <Box
                                        key={idx}
                                        border='1px solid #ccc'
                                        p={1.5}
                                        borderRadius={1.5}
                                        sx={{ borderColor: "#ccc", cursor: "pointer" }}
                                        onClick={() => {
                                            setFile(f.file);
                                            setOpenDialogFile(true)
                                        }}
                                        display='flex'
                                        justifyContent='space-between'
                                    >
                                        <Box>
                                            <Typography fontWeight={500}>{f.file.name}</Typography>
                                            <Typography fontSize={12}>{f.type.toUpperCase()}</Typography>
                                        </Box>                                        
                                        {/* Nút xoá */}
                                        <IconButton
                                            handleFunt={() => handleRemoveFile(idx)}
                                            sx={{
                                                minWidth: 36,
                                                padding: "2px 6px",
                                                fontSize: "12px",
                                            }}
                                            icon={<DeleteOutline color="error"/>}
                                        />

                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} fontSize='15px'>Link tài liệu bên ngoài</Typography>
                        <Stack borderRadius={2} border='1px solid #bebbbbff' direction="column" spacing={2} sx={{ my: 2, p: 2 }}>
                            {referenceLinkSlots.map((slot, index) => (
                                <React.Fragment key={index}>
                                    <Typography fontWeight={600} fontSize='15px'>{`Link tài liệu thứ ${index + 1}`}</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <TextField
                                            label=''
                                            name="url"
                                            type="text"
                                            value={slot}
                                            onChange={(newValue: any) => handleReferenceLinkSlotChange(index, newValue.target.value)}
                                            placeholder="Nhập thông tin"
                                            InputProps={{
                                                sx: {
                                                    "& .MuiOutlinedInput-notchedOutline": {
                                                        border: '1px solid rgb(53, 50, 50)',
                                                        borderRadius: '8px'
                                                    },
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                        border: '1px solid rgb(53, 50, 50)'
                                                    },
                                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                                        border: '1px solid rgb(53, 50, 50)'
                                                    },
                                                    color: '#000'
                                                }
                                            }}
                                        /> 
                                        <IconButton
                                            aria-label={`Remove slot ${index + 1}`}
                                            handleFunt={() => handleRemoveReferenceLinkSlot(index)}
                                            size="small"
                                            color="error"
                                            disabled={referenceLinkSlots.length === 1}
                                            icon={<RemoveCircleOutline sx={{ color: COLORS.BUTTON }}/>}
                                        />   
                                    </Stack>
                                </React.Fragment>
                            ))}
                            {referenceLinkSlots.length && (
                                <Button
                                    variant="outlined"
                                    startIcon={<Add sx={{ color: COLORS.BUTTON }}/>}
                                    onClick={handleAddReferenceLinkSlot}
                                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                                >
                                    Thêm link tài liệu
                                </Button>
                            )}
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TechnicalSpecification
                            formData={formDataTechnicalSpecification}
                            onInputChange={handleInputChangeTechnicalSpecification}
                            errorsTechnicalSpecification={errorsTechnicalSpecification}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 100, mr: 2 }}
                            onClick={handleSubmit}
                        >
                            Lưu
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 100 }}
                            onClick={handleBack}
                        >
                            Hủy
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <FileViewer
                file={file}
                open={openDialogFile}
                onClose={() => {
                    setOpenDialogFile(false)
                }}
            />
            {isSubmitting && (<Backdrop open={isSubmitting}/>)}
        </Box>
    )
}

export default CreateDesignRequest;
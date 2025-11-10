import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import { DataMachinesRequest, FormDataMachines } from "@/types/machine";
import useNotification from "@/hooks/useNotification";
import { ChangeEvent, useRef, useState } from "react";
import { COLORS } from "@/constants/colors";
import InputSelect from "@/components/InputSelect";
import { STATUS_MACHINE_DATA } from "@/constants/data";
import { resizeImage } from "@/utils/common";
import CommonImage from "@/components/Image/index";
import ImageUpload from "../../components/ImageUpload";

interface CreateMachineProps{
    onBack: () => void;
}

export type FormErrors = {
    [K in keyof FormDataMachines]?: string
}

const CreateMachine = ( props: CreateMachineProps ) => {
    const { onBack } = props;
    const notify = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [formData, setFormData] = useState<FormDataMachines>({
        name: '', code: '', specification: '', brand: '', weight: '', dimensions: '', power: '', maintenancePercentage: '', status: 'operating', maintenanceDate: null, completionDate: null, purchaseDate: null, warrantyExpirationDate: null, description: '', reason: '', startAgainDate: null
    })
    const [errors, setErrors] = useState<FormErrors>({});
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [errorImage, setErrorImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBack = () => {
        onBack();
        setFormData({ name: '', code: '', specification: '', brand: '', weight: '', dimensions: '', power: '', maintenancePercentage: '', status: 'operating', maintenanceDate: null, completionDate: null, purchaseDate: null, warrantyExpirationDate: null, description: '', reason: '', startAgainDate: null })
        setErrors({})
    }

    const handleFileSelect = (file: File | null) => {
        setImageFile(file)
    }

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataMachines;
        if(validName === 'purchaseDate'){
            const newWarrantyDate = value.add(1, "year");
            setFormData(prev => ({ ...prev, warrantyExpirationDate: newWarrantyDate }));
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên máy';
        if(!formData.code) newErrors.code = 'Vui lòng nhập mã máy';
        if(!formData.specification) newErrors.specification = 'Vui lòng nhập thông số';
        if(!formData.brand) newErrors.brand = 'Vui lòng nhập thương hiệu';
        if(!formData.weight) newErrors.weight = 'Vui lòng nhập trọng lượng';
        if(!formData.dimensions) newErrors.dimensions = 'Vui lòng nhập kích thước';
        if(!formData.power) newErrors.power = 'Vui lòng nhập công suất';
        if(!formData.purchaseDate) newErrors.purchaseDate = 'Vui lòng chọn ngày mua';
        if(!formData.description) newErrors.description = 'Vui lòng nhập mô tả';
        if(!imageFile){
            setErrorImage('Vui lòng tải lên hình ảnh');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !!imageFile;
    }

    const handleSubmit = async() => {
        if(!validateForm()){
            return;
        }
        setIsSubmitting(true);
        try {
            let uploadResponse:  any;
            uploadResponse = await uploadResponse(imageFile!, 'machines');
            if(!uploadResponse.success || !uploadResponse.data.file){
               throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh'); 
            }
            const payload: DataMachinesRequest = {
                name: formData.name,
                code: formData.code,
                specification: formData.specification,
                brand: formData.brand,
                weight: formData.weight,
                dimensions: formData.dimensions,
                power: formData.power,
                status: formData.status,
                purchaseDate: formData.purchaseDate
                    ? formData.purchaseDate.toDate().toISOString()
                    : null,
                warrantyExpirationDate: formData.warrantyExpirationDate
                    ? formData.warrantyExpirationDate.toDate().toISOString()
                    : null,
                description: formData.description,
                imageUrl: uploadResponse.data.file.imageUrl,
                nameUrl: uploadResponse.data.file.fileName
            }

            console.log("payload: ", payload);  
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }finally {
            setIsSubmitting(false)
        }
        
    }

    return (
        <Box>
            <NavigateBack
                title="Tạo thông tin máy móc"
                onBack={handleBack}
            />
            <Box
                sx={{
                    m: 2, boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.2)", borderRadius: 4, p: 2
                }}
            >
                <Typography fontWeight={600}>Thông tin máy móc</Typography>
                <Divider sx={{ border: '0.5px solid #dfddddff'}}/>
                <Grid sx={{ mt: 1}} container spacing={2}>
                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}>
                        <ImageUpload
                            onFileSelect={handleFileSelect}
                        />
                        {errorImage && <Typography mt={1.5} color="error">{errorImage}</Typography>}
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} fontSize='15px'>Tên máy</Typography>
                        <InputText
                            label=""
                            value={formData.name}
                            type="text"
                            name='name'
                            onChange={handleInputChange}
                            margin="dense"
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Mã máy</Typography>
                        <InputText
                            label=""
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            margin="dense"
                            error={!!errors.code}
                            helperText={errors.code}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Thông số</Typography>
                        <InputText
                            label=""
                            type="text"
                            name="specification"
                            value={formData.specification}
                            onChange={handleInputChange}
                            margin="dense"
                            error={!!errors.specification}
                            helperText={errors.specification}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Thương hiệu</Typography>
                        <InputText
                            label=""
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            margin="dense"
                            error={!!errors.brand}
                            helperText={errors.brand}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Trọng lượng</Typography>
                        <InputText
                            label=""
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleInputChange}
                            margin="dense"
                            error={!!errors.weight}
                            helperText={errors.weight}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Kích thước</Typography>
                        <InputText
                            label=""
                            type="text"
                            name="dimensions"
                            value={formData.dimensions}
                            onChange={handleInputChange}
                            margin="dense"
                            error={!!errors.dimensions}
                            helperText={errors.dimensions}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Công suất</Typography>
                        <InputText
                            label=""
                            type="text"
                            name="power"
                            value={formData.power}
                            onChange={handleInputChange}
                            margin="dense"
                            error={!!errors.power}
                            helperText={errors.power}
                        />
                    </Grid>
                </Grid>
                <Typography mt={1} fontWeight={600}>Tình trạng máy móc</Typography>
                <Divider sx={{ border: '0.5px solid #dfddddff'}}/>
                <Grid sx={{ mt: 1 }} container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Tình trạng</Typography>
                        <InputSelect
                            label=""
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            options={STATUS_MACHINE_DATA}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    label: item.label,
                                    value: item.value
                                }))
                            }
                            margin='dense'
                            placeholder="Chọn thông tin"
                            error={!!errors.status}
                            helperText={errors.status}
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Ngày mua</Typography>
                        <InputText
                            label=""
                            name="purchaseDate"
                            type="date"
                            value={formData.purchaseDate}
                            onChange={handleInputChange}
                            mt={0.9}
                            error={!!errors.purchaseDate}
                            helperText={errors.purchaseDate}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Ngày hết hạn bảo hành</Typography>
                        <InputText
                            label=""
                            name="warrantyExpirationDate"
                            type="date"
                            value={formData.warrantyExpirationDate}
                            onChange={handleInputChange}
                            mt={0.9}
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} fontSize='15px'>Mô tả</Typography>
                        <InputText
                            multiline
                            label=""
                            name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleInputChange}
                            margin="dense"
                            rows={6}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </Grid>
                </Grid>
                <Box mt={1.5} display='flex' justifyContent='flex-end'>
                    <Button
                        variant="outlined"
                        sx={{
                            border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON,
                            width: 100, mr: 2
                        }}
                        onClick={handleSubmit}
                    >
                        Lưu
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON,
                            width: 100
                        }}
                        onClick={handleBack}
                    >
                        Quay lại
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default CreateMachine;
import { Box, Button, Divider, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";
import { useEffect, useState } from "react";
import { IOrder } from "@/types/order";
import { getOrders } from "@/services/order-service";
import InputSelect from "@/components/InputSelect";
import { BomPayloadRequest, FormDataBoms } from "@/types/bom";
import { getProductsByOrderId } from "@/services/product-service";
import { IProduct } from "@/types/product";
import { Add } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import ImageUpload from "../../components/ImageUpload";
import { FormDataMaterials, MaterialsPayloadRequest } from "@/types/material";
import MaterialBom from "./MaterialBom";
import { uploadImages } from "@/services/upload-service";
import useNotification from "@/hooks/useNotification";
import { createBom } from "@/services/bom-service";
import useAuth from "@/hooks/useAuth";
import InputMaskTextField from "@/components/InputMaskTextField";
import Backdrop from "@/components/Backdrop";

interface CreateBomProps {
    onBack: () => void;
    open: boolean
}

type FormErrors = {
    [K in keyof FormDataBoms]?: string
}

export type FormMaterialErrors = {
    [K in keyof FormDataMaterials]?: string
}

const CreateBom = (props: CreateBomProps) => {
    const { onBack, open } = props;
    const { profile } = useAuth();
    const notify = useNotification();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [ formData, setFormData ] = useState<FormDataBoms>({
        orderId: '', productId: '', name: '', amount: null, materials: []
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [errorImages, setErrorImages] = useState<(string | null)[]>([]);

    const [amountMaterial, setAmountMaterial] = useState<number | null>(null);
    const [materials, setMaterials] = useState<number[]>([]);
    const [formDataMaterials, setFormDataMaterials] = useState<FormDataMaterials[]>([]);
    const [materialErrors, setMaterialErrors] = useState<FormMaterialErrors[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [codeBom, setCodeBom] = useState('');
    const [codeMaterial, setCodeMaterial] = useState<string[]>([]);
    const [errorCodeBom, setErrorCodeBom] = useState<string | null>(null);
    const [errorCodeMaterial, setErrorCodeMaterial] = useState<(string | null)[]>([]);
    
    
    const handleBack = () => {
        onBack();
        setFormData({ orderId: '', productId: '', name: '', amount: null, materials: [] });
        setErrors({});
        setFormDataMaterials([]);
        setCodeBom('');
        setCodeMaterial([]);
        setErrorCodeBom(null);
        setErrorCodeMaterial([]);
        setErrorImages([])
    }

    useEffect(() => {
        if(open) {
            const queryOrders = async() => {
                const res = await getOrders({ page: 1, limit: 100 });
                const data = res.data?.data as any as IOrder[];
                setOrders(data)
            }
            queryOrders()
        }
    }, [open])

    const handleFileSelect = (file: File | null, index: number) => {
        if(file)
        setImageFiles(prev => {
            const updated = [...prev];
            updated[index] = file;
            return updated;
        });
        // Xóa lỗi tại ô đang nhập
        setErrorImages((prev) => {
            const updated = [...prev];
            updated[index] = null;
            return updated;
        })
    }

    const handleChangeCodeMaterial = (code: string, index: number) => {
        setCodeMaterial(prev => {
            const updated = [...prev];
            updated[index] = code;
            return updated;
        });
        // Xóa lỗi tại ô đang nhập
        setErrorCodeMaterial((prev) => {
            const updated = [...prev];
            updated[index] = null;
            return updated;
        })
    }

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataBoms;
        if(validName === 'amount') {
            const valueNum = Number(value);
            if(!isNaN(valueNum) && valueNum > 0) {
                setAmountMaterial(valueNum);
                setMaterials(Array.from({ length: valueNum }, (_, i) => i + 1 ));
                setFormDataMaterials(
                    Array.from({ length: valueNum }, () => ({
                        code: '', name: '', unit: '', amount: null, note: ''
                    }))
                )
            }else{
                setAmountMaterial(null);
                setMaterials([]);
            }
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }
    const handleChangeSelect = async(name: string, value: any) => {
        const res = await getProductsByOrderId(value);
        const data = res.data as any as IProduct[];
        setProducts(data);
        setFormData(prev => ({ ...prev, orderId: value }));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, orderId: undefined}))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if(!formData.orderId) newErrors.orderId = 'Vui lòng chọn đơn hàng';
        if(!formData.productId) newErrors.productId = 'Vui lòng chọn sản phẩm';
        if(!formData.amount) newErrors.amount = 'Vui lòng nhập số lượng';
        if(codeBom === ''){
            setErrorCodeBom('Vui lòng nhập mã BOM')
        }

        const newMaterialErrors: FormMaterialErrors[] = [];
        const newCodeMaterialErrors: string[] = [];
        const newImageMaterialErrors: string[] = [];

        formDataMaterials.forEach((material, idx) => {
            const mError: FormMaterialErrors = {};
            let codeMError: string = '';
            let imgMError: string = '';

            if(!material.name) mError.name = `Vật tư ${idx + 1}: Vui lòng nhập tên vật tư`;
            if(!material.unit) mError.unit = `Vật tư ${idx + 1}: Vui lòng nhập đơn vị`;
            if(!material.amount) mError.amount = `Vật tư ${idx + 1}: Vui lòng nhập định lượng`;
            if(!codeMaterial[idx]) codeMError = `Vật tư ${idx + 1}: Vui lòng nhập mã vật tư`;
            if(!imageFiles[idx]) imgMError = `Vật tư ${idx + 1}: Vui lòng tải lên hình ảnh vật tư`
            newMaterialErrors.push(mError);
            newCodeMaterialErrors.push(codeMError);
            newImageMaterialErrors.push(imgMError);
        });

        const hasMaterialError = newMaterialErrors.some((e) => Object.keys(e).length > 0);
        const hasCodeMaterialError = newCodeMaterialErrors.some((e) => e !== '');
        const hasImageMaterialError = newImageMaterialErrors.some((e) => e !== '');


        setErrors(newErrors);
        setMaterialErrors(newMaterialErrors);
        setErrorCodeMaterial(newCodeMaterialErrors);
        setErrorImages(newImageMaterialErrors);

        return Object.keys(newErrors).length === 0 && !hasMaterialError && !!codeBom && !hasCodeMaterialError && !hasImageMaterialError;
    }

    const handleInputChangeMaterial = (index: number, name: string, value: any) => {
        setFormDataMaterials((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            return updated;
        })

        // Xóa lỗi tại ô đang nhập
        setMaterialErrors((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: undefined };
            return updated;
        })
    }
 
    const handleSubmit = async () => {
        if(!validateForm()){
            return;
        }
        setIsSubmitting(true)
        try {
            // nhiều ảnh
            const uploadImgsResponses = imageFiles &&  await uploadImages(imageFiles, 'bom/materials');
            if(!uploadImgsResponses.success || !uploadImgsResponses.data?.files){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }
            const payloadMaterial: MaterialsPayloadRequest[] = formDataMaterials.map((material, index) => ({
                ...material,
                code: codeMaterial[index],
                imageUrl: uploadImgsResponses.data?.files[index].url || '',
                nameUrl: uploadImgsResponses.data?.files[index].name || '',
            }))
            const payload: BomPayloadRequest = {
                code: codeBom,
                orderId: formData.orderId,
                productId: formData.productId,
                amount: formData.amount ? formData.amount : null,
                userId: profile?.id,
                materials: payloadMaterial
            }
            const res = await createBom(payload);
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
        } finally {
            setIsSubmitting(false)
        }
    }
    return(
        <Box>
            <NavigateBack
                title="Thêm mới BOM"
                onBack={handleBack}
            />
            <Box
                sx={{
                    m: 2, boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.2)", borderRadius: 4, p: 2, bgcolor: '#fff'
                }}
            >
                <Typography fontWeight={600} fontStyle='italic'>Thông tin BOM</Typography>
                <Divider sx={{ border: '0.5px solid #dfddddff'}}/>
                <Grid sx={{ mt: 1 }} container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Mã BOM</Typography>
                        <InputMaskTextField
                            mask="BOM999"
                            value={codeBom}
                            onChange={(value) => {
                                setCodeBom(value)
                                setErrorCodeBom('')
                            }}
                            placeholder="BOM___"
                            error={!!errorCodeBom}
                            helperText={errorCodeBom}
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
                            disabled={!formData.orderId}
                            error={!!errors.productId}
                            helperText={errors.productId}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Số lượng vật tư</Typography>
                        <InputText
                            label=""
                            name="amount"
                            value={formData.amount}
                            type="text"
                            onChange={handleInputChange}
                            onlyPositiveNumber
                            error={!!errors.amount}
                            helperText={errors.amount}
                        />
                    </Grid>
                </Grid>
                {amountMaterial !== null && materials.length > 0 && (
                    <Box mt={2}>
                        <Typography fontWeight={600} fontStyle='italic'>Thông tin vật tư</Typography>
                        <Divider sx={{ border: '0.5px solid #dfddddff'}}/>
                        {formDataMaterials.map((material, index) => (
                            <MaterialBom
                                codeMaterial={codeMaterial[index]}
                                onInputChange={handleInputChangeMaterial}
                                errors={materialErrors[index] || {}}
                                formData={material}
                                key={index} 
                                index={index + 1}
                                errorImage={errorImages[index]}
                                onFileSelect={handleFileSelect}
                                onChangeCodeMaterial={handleChangeCodeMaterial}
                                errorCodeMaterial={errorCodeMaterial[index]}
                            />
                        ))}
                    </Box>
                )}
                <Box mt={2} display='flex' justifyContent='flex-end'>
                    <Button
                        variant="outlined"
                        sx={{ width: 100, border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, mr: 2 }}
                        onClick={handleSubmit}
                    >
                        Lưu
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ width: 100, border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON}}
                        onClick={handleBack}
                    >
                        Hủy
                    </Button>
                </Box>
            </Box>
            {isSubmitting && <Backdrop open={isSubmitting}/>}
        </Box>
    )
}

export default CreateBom;
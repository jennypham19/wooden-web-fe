import DialogComponent from "@/components/DialogComponent";
import { FormDataOrders } from "@/types/order";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2"
import dayjs from "dayjs";
import { Box, Button, Input, Typography } from "@mui/material";
import { ICustomer } from "@/types/customer";
import { getCustomers } from "@/services/customer-service";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { getProccessOrderLabel, getStatusOrderLabel } from "@/utils/labelEntoVni";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import InputMaskTextField from "@/components/InputMaskTextField";
import { createOrder, OrderPayloadRequest } from "@/services/order-service";
import NavigateBack from "../../components/NavigateBack";
import ProductOrder from "./ProductOrder";
import { getAccounts } from "@/services/user-service";
import { IUser } from "@/types/user";
import { FormDataProducts } from "@/types/product";

interface DialogAddOrderProps{
    open: boolean,
    onClose: () => void
}

type FormErrors = {
    [K in keyof FormDataOrders]?: string
}

export type FormProductErrors = {
    [K in keyof FormDataProducts]?: string
}

const DialogAddOrder: React.FC<DialogAddOrderProps> = (props) => {
    const { open, onClose } = props;
    const notify = useNotification();
    const [ formData, setFormData ] = useState<FormDataOrders>({
        customerId: '', name: '', dateOfReceipt: dayjs(), dateOfPayment: null, proccess: 'not_started_0%', status: 'pending', amount: null, requiredNote: '', products: []
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [code, setCode] = useState('');
    const [errorCode, setErrorCode] = useState<string | null>(null);
    const [amountProduct, setAmountProduct] = useState<number | null>(null);
    const [products, setProducts] = useState<number[]>([]);
    const [formDataProduct, setFormDataProduct] = useState<FormDataProducts[]>([])

    const [productErrors, setProductErrors] = useState<FormProductErrors[]>([])

    useEffect(() => {
        if(open){
            const fetchCustomers = async() => {
                const res = await getCustomers({ page: 1, limit: 99 });
                const data = res.data?.data as any as ICustomer[];
                setCustomers(data)
            }
            const fetchManagers = async() => {
                const res = await getAccounts({ page: 1, limit: 99, role: 'production_supervisor'});
                const data = res.data?.data as any as IUser[];
                setUsers(data)
            }
            fetchCustomers();
            fetchManagers();
        }
    },[open])

    const handleClose = () => {
        onClose();
        setFormData({ customerId: '', name: '', dateOfReceipt: dayjs(), dateOfPayment: null, proccess: 'not_started_0%', status: 'pending', amount: null, requiredNote: '', products: [] });
        setErrors({});
        setErrorCode(null)
        setCode('')
    }

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataOrders;
        if(validName === 'amount'){
            const valueNum = Number(value);
            if(!isNaN(valueNum) && valueNum > 0){
                setAmountProduct(valueNum)
                setProducts(Array.from({ length: valueNum }, (_, i) => i + 1 ))
                setFormDataProduct(
                    Array.from({ length: valueNum }, () => ({
                        name: "",
                        description: "",
                        target: "",
                        proccess: "not_started_0%",
                        status: "pending",
                        managerId: "",
                    }))
                );
            }else{
                setAmountProduct(null);
                setProducts([])
            }
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const handleInputChangeProduct = (index: number, name: string, value: any) => {
        setFormDataProduct((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            return updated;
        })
        // Xóa lỗi tại ô đang nhập
        setProductErrors((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: undefined };
            return updated;
        });
    }

    // console.log("formDataProduct: ", formDataProduct);
    
    
    const validateForm = (): boolean => {
        const newErros: FormErrors = {};
        if(!formData.customerId) newErros.customerId = 'Vui lòng chọn khách hàng';
        if(!formData.name) newErros.name = 'Vui lòng nhập tên đơn hàng';
        if(!formData.dateOfReceipt) newErros.dateOfReceipt = 'Vui lòng chọn ngày nhận đơn';
        if(!formData.dateOfPayment) newErros.dateOfPayment = 'Vui lòng chọn ngày trả đơn';
        if(!formData.amount) newErros.amount = 'Vui lòng nhập số lượng';
        if(!formData.requiredNote) newErros.requiredNote = 'Vui lòng nhập yêu cầu';
        if(code === ''){
            setErrorCode('Vui lòng nhập mã đơn hàng')
        }

        const newProductErrors: FormProductErrors[] = [];
        formDataProduct.forEach((product, idx) => {
            const pError: FormProductErrors = {};
            if (!product.name) pError.name = `Sản phẩm ${idx + 1}: Vui lòng nhập tên sản phẩm`;
            if (!product.description) pError.description = `Sản phẩm ${idx + 1}: Vui lòng nhập mô tả`;
            if (!product.target) pError.target = `Sản phẩm ${idx + 1}: Vui lòng nhập mục tiêu sản xuất`;
            if (!product.managerId) pError.managerId = `Sản phẩm ${idx + 1}: Vui lòng chọn người phụ trách`;
            newProductErrors.push(pError);
        });

        const hasProductError = newProductErrors.some((e) => Object.keys(e).length > 0);
        setErrors(newErros);
        setProductErrors(newProductErrors)
        return Object.keys(newErros).length === 0 && !!code && !hasProductError;
    }

    const handleSave = async() => {
        if(!validateForm()){
            return;
        }
        try {
            const payload: OrderPayloadRequest = {
                customerId: formData.customerId,
                codeOrder: code,
                name: formData.name,
                dateOfReceipt: formData.dateOfReceipt ? formData.dateOfReceipt?.toISOString() : '',
                dateOfPayment: formData.dateOfPayment ? formData.dateOfPayment.toISOString() : '',
                proccess: formData.proccess,
                status: formData.status,
                amount: Number(formData.amount),
                requiredNote: formData.requiredNote,
                products: formDataProduct.map((p) => ({
                    name: p.name,
                    description: p.description,
                    target: p.target,
                    proccess: p.proccess,
                    status: p.status,
                    managerId: p.managerId
                }))
            };
            const res = await createOrder(payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            handleClose()
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
                title="Tạo đơn hàng"
                onBack={handleClose}
            />
            <Box borderRadius={2} m={2} p={1.5} bgcolor='#fff'>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Tên khách hàng</Typography>
                        <InputSelect
                            label=""
                            value={formData.customerId}
                            name="customerId"
                            onChange={handleInputChange}
                            options={customers}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    value: item.id,
                                    label: item.name
                                }))
                            }
                            error={!!errors.customerId}
                            helperText={errors.customerId}
                            placeholder="Chọn khách hàng"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Mã đơn hàng</Typography>
                        <InputMaskTextField
                            mask={`ĐH999999`}
                            value={code}
                            onChange={(value) => {
                                setCode(value)
                                setErrorCode('')
                            }}
                            placeholder="ĐH______"
                            error={!!errorCode}
                            helperText={errorCode}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Tên đơn hàng</Typography>
                        <InputText
                            label=""
                            name="name"
                            value={formData.name}
                            type="text"
                            onChange={handleInputChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Ngày nhận đơn</Typography>
                        <InputText
                            label=""
                            name="dateOfReceipt"
                            value={formData.dateOfReceipt}
                            type="date"
                            onChange={handleInputChange}
                            error={!!errors.dateOfReceipt}
                            helperText={errors.dateOfReceipt}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Ngày trả hàng</Typography>
                        <InputText
                            label=""
                            name="dateOfPayment"
                            value={formData.dateOfPayment}
                            type="date"
                            onChange={handleInputChange}
                            error={!!errors.dateOfPayment}
                            helperText={errors.dateOfPayment}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Tiến độ</Typography>
                        <InputText
                            label=""
                            disabled
                            name="proccess"
                            type="text"
                            onChange={handleInputChange}
                            value={getProccessOrderLabel(formData.proccess)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Trạng thái</Typography>
                        <InputText
                            label=""
                            disabled
                            name="status"
                            type="text"
                            onChange={handleInputChange}
                            value={getStatusOrderLabel(formData.status)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Số lượng sản phẩm</Typography>
                        <InputText
                            label=""
                            name="amount"
                            type="text"
                            value={formData.amount}
                            onChange={handleInputChange}
                            onlyPositiveNumber={true}
                            error={!!errors.amount}
                            helperText={errors.amount}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={700} fontSize='15px'>Yêu cầu</Typography>
                        <InputText
                            label=""
                            name="requiredNote"
                            type="text"
                            value={formData.requiredNote}
                            onChange={handleInputChange}
                            error={!!errors.requiredNote}
                            helperText={errors.requiredNote}
                        />
                    </Grid>
                </Grid>
                    {amountProduct !== null && products.length > 0 && (
                        <Box mt={3}>
                            <Typography fontWeight={600} mb={1} fontSize='15px'> Danh sách sản phẩm kèm theo</Typography>
                            {formDataProduct.map((num, idx) => (
                                <ProductOrder onInputChange={handleInputChangeProduct} errors={productErrors[idx] || {}} formData={num} key={idx} index={idx + 1} users={users}/>
                            ))}
                        </Box>
                    )}
                    <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            sx={{ bgcolor: COLORS.BUTTON, width: 100, mr: 2 }}
                            onClick={handleSave}
                        >
                            Lưu
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 100 }}
                            onClick={handleClose}
                        >
                            Hủy
                        </Button>
                    </Box>
            </Box>
        </Box>
    )
}

export default DialogAddOrder;
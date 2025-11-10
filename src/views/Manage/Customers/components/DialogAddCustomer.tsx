import React, { useState } from "react";



import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";



import { COLORS } from "@/constants/colors";


interface DialogAddCustomerProps{
    open: boolean;
    onSave: (data: FormDataCustomer) => void;
    onClose: () => void;
}

export interface FormDataCustomer{
    name: string,
    phone: string,
    address: string
}

type FormErrors = {
    [K in keyof FormDataCustomer]?: string
}

const DialogAddCustomer: React.FC<DialogAddCustomerProps> = ( props ) => {
    const { open, onSave, onClose } = props;
    const [formData, setFormData] = useState<FormDataCustomer>({
        name: '', phone: '', address: ''
    })
    const [errors, setErrors] = useState<FormErrors>({});

    const handleClose = () => {
        onClose();
        setErrors({});
        setFormData({ name: '', phone: '', address: '' })
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên';
        if(!formData.phone) newErrors.phone = 'Vui lòng nhập số điện thoại';
        if(!formData.address) newErrors.address = 'Vui lòng nhập địa chỉ';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    } 

    const handleSave = () => {
        if(!validateForm()){
            return;
        }
        onSave(formData);
        handleClose()
    }

    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataCustomer;
        setFormData(prev => ({ ...prev, [name]: value}));
        
        if(validName === 'phone' && typeof value === 'string'){
            const phone = value.replace(/\s|-/g, '');
            if(!/^\d+$/.test(phone)){
                setErrors(prev => ({...prev, phone: 'Số điện thoại chỉ chứa số'}));
                return
            }

            if(phone.startsWith('0') && phone.length !== 10){
                setErrors(prev => ({...prev, phone: 'Số điện thoại phải có 10 chữ số (nếu bắt đầu bằng 0)'}));
                return
            }

            if(phone.startsWith('+84') && (phone.length < 11 || phone.length > 12)){
                setErrors(prev => ({...prev, phone: 'Số điện thoại phải có 11-12 chữ số (nếu bắt đầu bằng +84)'}));
                return
            }

            if(!phoneRegex.test(phone)){
                setErrors(prev => ({...prev, phone: 'Số điện thoại không đúng định dạng (bắt đầu từ +84|03|05|07|08|09)'}))
            }
        }

        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    return (
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            dialogTitle="Thêm mới tài khoản"
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography fontSize='15px' fontWeight={700}>Tên</Typography>
                    <InputText
                        label=""
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography fontSize='15px' fontWeight={700}>Số điện thoại</Typography>
                    <InputText
                        label=""
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography fontSize='15px' fontWeight={700}>Địa chỉ</Typography>
                    <InputText
                        label=""
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="outlined"
                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 100, mr: 2 }}
                        onClick={handleSave}
                    >
                        Lưu
                    </Button>
                    <Button
                        sx={{ bgcolor: COLORS.BUTTON, width: 100}}
                        onClick={handleClose}
                    >
                        Hủy
                    </Button>
                </Grid>
            </Grid>
        </DialogComponent>
    )
}

export default DialogAddCustomer;
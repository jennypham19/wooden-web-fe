import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import AddOrderMobile from "@/layouts/Breakpoint/Mobile/AddOrderMobile";
import AddOrderDesktop from "@/layouts/Breakpoint/Desktop/AddOrderDesktop";
import useAuth from "@/hooks/useAuth";
import { FormDataOrders } from "@/types/order";
import { FormDataProducts } from "@/types/product";
import dayjs from "dayjs";
import { ICustomer } from "@/types/customer";

interface AddOrderProps{
    open: boolean,
    onClose: () => void
}

type FormErrors = {
    [K in keyof FormDataOrders]?: string
}

export type FormProductErrors = {
    [K in keyof FormDataProducts]?: string
}

const AddOrder: React.FC<AddOrderProps> = (props) => {
    const { open, onClose } = props;
    const { profile } = useAuth();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [ formData, setFormData ] = useState<FormDataOrders>({
        customerId: '', name: '', dateOfReceipt: dayjs(), dateOfPayment: null, proccess: 'not_started_0%', status: 'pending', amount: null, requiredNote: '', products: []})
    const [errors, setErrors] = useState<FormErrors>({});
    const [customers, setCustomers] = useState<ICustomer[]>([]);

    const handleClose = () => {
        onClose()
    }
    return(
        <Box>
            <NavigateBack
                title="Tạo đơn hàng"
                onBack={handleClose}
            />
            <Typography mx={2} variant="subtitle2">Vui lòng điền đầy đủ các thông tin cần thiết để khởi tạo quy trình giao hàng</Typography>
            <Box m={2}>
                {md ? (
                    <AddOrderMobile profile={profile}/>
                ) : (
                    <AddOrderDesktop profile={profile} formData={formData} onChangeInput={() => {}}/>
                )}
            </Box>
        </Box> 
    )
}

export default AddOrder
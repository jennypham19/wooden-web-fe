import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import AddOrderMobile from "@/layouts/Breakpoint/Mobile/AddOrderMobile";
import AddOrderDesktop from "@/layouts/Breakpoint/Desktop/AddOrderDesktop";
import useAuth from "@/hooks/useAuth";
import { FormDataInputOrders } from "@/types/order";
import { FormDataProducts } from "@/types/product";
import dayjs from "dayjs";
import { ICustomer } from "@/types/customer";
import { IUser } from "@/types/user";
import { getAccounts } from "@/services/user-service";

interface AddOrderProps{
    open: boolean,
    onClose: () => void
}

export type FormErrors = {
    [K in keyof FormDataInputOrders]?: string
}

export type FormProductErrors = {
    [K in keyof FormDataProducts]?: string
}

const AddOrder: React.FC<AddOrderProps> = (props) => {
    const { open, onClose } = props;
    const { profile } = useAuth();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [users, setUsers] = useState<IUser[]>([]);

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        if(open){
            const fetchManagers = async() => {
                const res = await getAccounts({ page: 1, limit: 99, role: 'factory_manager'});
                const data = res.data?.data as any as IUser[];
                setUsers(data)
            }
            fetchManagers();
        }
    },[open])


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
                    <AddOrderDesktop profile={profile} onClose={handleClose} users={users}/>
                )}
            </Box>
        </Box> 
    )
}

export default AddOrder
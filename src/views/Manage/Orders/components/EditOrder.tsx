import { Box, Stack, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { IOrder } from "@/types/order";
import { ArrowForwardIos } from "@mui/icons-material";
import useBreakpoints from "@/hooks/useBreakpoints";
import EditOrderMobile from "@/layouts/Breakpoint/Mobile/EditOrderMobile";
import EditOrderDesktop from "@/layouts/Breakpoint/Desktop/EditOrderDesktop";

interface EditOrderProps{
    order: IOrder
    onClose: () => void;
}

const EditOrder = (props: EditOrderProps) => {
    const { order, onClose } = props;
    const bp = useBreakpoints();
    const handleClose = () => {
        onClose()
    }
    return(
        <Box>
            <Stack p={2} direction='row'>
                <Typography color="text.secondary" variant="h6" onClick={handleClose} sx={{ cursor: 'pointer' }}>Đơn hàng</Typography>
                <Box>
                    <ArrowForwardIos sx={{ fontSize: 15,  mt: 1 }}/>      
                </Box> 
                <Typography variant="h6">Chỉnh sửa đơn hàng</Typography>
            </Stack>
            <Box m={2}>
                {bp ? (
                    <EditOrderMobile order={order}/>
                ) : (
                    <EditOrderDesktop/>
                )}
            </Box>
        </Box>
    )
}

export default EditOrder;
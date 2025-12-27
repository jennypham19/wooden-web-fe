import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import { updateDateAndReasonOrder } from "@/services/order-service";
import { IOrder } from "@/types/order";
import { IUser } from "@/types/user";
import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { Dayjs } from "dayjs";
import { useState } from "react";

interface UpdateOrderProps{
    onClose: () => void;
    data: IOrder
}

type ErrorsUpdate = {
    [K in keyof {dateOfPayment: Dayjs | null, reason: string}]?: string
}
const UpdateOrder = (props: UpdateOrderProps) => {
    const { onClose, data } = props;
    const notify = useNotification();
    const { profile } = useAuth();
    const [formData, setFormData] = useState<{dateOfPayment: Dayjs | null, reason: string}>({
        dateOfPayment: null,
        reason: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false);

    const reset = () => {
        setFormData({ dateOfPayment: null, reason: '' });;
        setErrors({})
    }
    const handleClose = () => {
        onClose();
        reset()
    }

    const [errors, setErrors] = useState<ErrorsUpdate>({});
    const handleInputChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }
    
    const isValidate = (): boolean => {
        const newErrors: ErrorsUpdate = {};
        if(!formData.dateOfPayment) newErrors.dateOfPayment = 'Ngày trả không được để trống';
        if(!formData.reason) newErrors.reason = 'Lý do không được để trống';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async() => {
        if(!isValidate()){
            return
        }
        setIsSubmitting(true)
        try {
            const payload: { dateOfPayment: string | null, reason: string, manager: IUser | null } = {
                dateOfPayment: formData.dateOfPayment ? formData.dateOfPayment.toISOString() : null,
                reason: formData.reason,
                manager: profile ? profile : null
            }
            const res = await updateDateAndReasonOrder(data.id, payload);
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
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <Paper sx={{ borderRadius: 2, m: 1.5, p: 2 }}>
            <Typography mb={1} fontWeight={600}>Chỉnh sửa thông tin</Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    <Typography fontWeight={500} fontSize='15px'>Ngày trả</Typography>
                    <InputText
                        label=""
                        name="dateOfPayment"
                        value={formData.dateOfPayment}
                        type="date"
                        onChange={handleInputChange}
                        error={!!errors.dateOfPayment}
                        helperText={errors.dateOfPayment}
                        margin="dense"
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography fontWeight={500} fontSize='15px'>Lý do</Typography>
                    <InputText
                        label=""
                        name="reason"
                        value={formData.reason}
                        type="text"
                        onChange={handleInputChange}
                        error={!!errors.reason}
                        helperText={errors.reason}
                        margin="dense"
                        multiline
                        rows={6}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box display='flex' justifyContent='center'>
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
                            onClick={handleClose}
                        >
                            Hủy
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default UpdateOrder;
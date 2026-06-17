import DialogComponent from "@/components/DialogComponent";
import useNotification from "@/hooks/useNotification";
import { FormDataStorageOrderErrors } from "@/types/error";
import { FormDataStorageOrder, IOrder, StorageOrderPayload } from "@/types/order";
import dayjs from "dayjs";
import { useState } from "react";
import Grid from '@mui/material/Grid2';
import { renderTextWithAsterisk } from "../../components/common";
import InputText from "@/components/InputText";
import { Button, Typography } from "@mui/material";
import { COLORS } from "@/constants/colors";
import { updateStorageOrder } from "@/services/order-service";

interface DialogStorageOrderProps{
    open: boolean,
    order: IOrder,
    onClose: () => void;
    onLoadData: () => void;
}

const DialogStorageOrder = (props: DialogStorageOrderProps) => {
    const { open, order, onClose, onLoadData } = props;
    const notify = useNotification();
    const [formData, setFormData] = useState<FormDataStorageOrder>({ reasonStorage: null, dateStorage: dayjs() });
    const [errors, setErrors] = useState<FormDataStorageOrderErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const isValidateForm = (): boolean => {
        const newErrors: FormDataStorageOrderErrors = {};
        if(!formData.reasonStorage) newErrors.reasonStorage = 'Vui lòng nhập lý do lưu trữ';
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!isValidateForm()){
            return;
        }
        setIsSubmitting(true)
        try {
            const payload: StorageOrderPayload = {
                ...formData
            };
            const res = await updateStorageOrder(order.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            onLoadData();
            handleClose()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }  finally {
            setIsSubmitting(false)
        }
    }
    
    const handleClose = () => {
        onClose();
        setFormData({ reasonStorage: null, dateStorage: dayjs() });
        setErrors({})
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            dialogTitle={`Lý do lưu trữ đơn hàng ${order.name}`}
            isActiveFooter={false}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    {renderTextWithAsterisk('Lý do')}
                    <InputText
                        label=""
                        name="reasonStorage"
                        type="text"
                        onChange={handleInputChange}
                        value={formData.reasonStorage}
                        error={!!errors.reasonStorage}
                        helperText={errors.reasonStorage}
                        margin="dense"
                        multiline
                        rows={5}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography fontWeight={700} fontSize={{ xs: 14, md: 15 }}>Ngày lưu trữ</Typography>
                    <InputText
                        label=""
                        name="dateStorage"
                        value={formData.dateStorage}
                        onChange={() => {}}
                        type="date"
                        margin="dense"
                        disabled
                    />
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        sx={{ bgcolor: COLORS.BUTTON, width: 120 }}
                        onClick={handleSave}
                    >
                        Lưu
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 120 }}
                        onClick={handleClose}
                    >
                        Hủy
                    </Button>
                </Grid>
            </Grid>
        </DialogComponent>
    )
}

export default DialogStorageOrder;
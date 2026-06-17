import DialogComponent from "@/components/DialogComponent";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useAuth from "@/hooks/useAuth";
import useNotification from "@/hooks/useNotification";
import { deletedImagesStepWithReasonByManager, deletedImageStepWithReasonByManager } from "@/services/order-service";
import { FormDataDeletedImageStepErrors } from "@/types/error";
import { FormDataDeletedImageStep, IStep, ManagerDeletedAllImagesStepPayload, ManagerDeletedImageStepPayload } from "@/types/order";
import { renderTextWithAsterisk } from "@/views/Manage/components/common";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { useState } from "react";

interface DialogDeleteImageStepProps{
    type: string,
    open: boolean,
    onClose: () => void;
    step: IStep;
    imgId?: string;
    onLoadData: () => void;
}

const DialogDeleteImageStep = (props: DialogDeleteImageStepProps) => {
    const { type, open, onClose, step, imgId, onLoadData } = props;
    const notify = useNotification();
    const { profile } = useAuth();
    const [formData, setFormData] = useState<FormDataDeletedImageStep>({ reasonDeletedImageStep: null, dateDeletedImageStep: dayjs() });
    const [errors, setErrors] = useState<FormDataDeletedImageStepErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleClose = () => {
        onClose();
        setFormData({ reasonDeletedImageStep: null, dateDeletedImageStep: dayjs() })
    }
    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }
    const isValidate = () : boolean => {
        const newErrors: FormDataDeletedImageStepErrors = {};
        if(!formData.reasonDeletedImageStep) newErrors.reasonDeletedImageStep = "Vui lòng nhập lý do xóa";
        return Object.keys(newErrors).length === 0
    }

    const handleSave = async () => {
        if(!isValidate()) {
            return;
        }
        setIsSubmitting(true)
        try {
            let res: any = {};
            if(type === 'all'){
                const payload: ManagerDeletedAllImagesStepPayload = {
                    ...formData,
                    managerDeletedId: profile?.id ?? undefined
                }
                res = await deletedImagesStepWithReasonByManager(step.id, payload);
            }else {
                const payload: ManagerDeletedImageStepPayload = {
                    ...formData,
                    managerDeletedId: profile?.id ?? undefined,
                    stepId: step.id
                }
                res = imgId && await deletedImageStepWithReasonByManager(imgId, payload)
            }
            notify({
                message: res.message,
                severity: 'success'
            });
            handleClose();
            onLoadData()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: "error"
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return(
        <DialogComponent
            handleClose={handleClose}
            dialogKey={open}
            dialogTitle={`Xóa ${type === 'all' ? "tất cả" : ""} hình ảnh của bước ${step.name}`}
            isActiveFooter={false}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                    {renderTextWithAsterisk("Lý do xóa")}
                    <InputText
                        label=""
                        name="reasonDeletedImageStep"
                        value={formData.reasonDeletedImageStep}
                        onChange={handleInputChange}
                        type="text"
                        margin="dense"
                        multiline
                        rows={5}
                        error={!!errors.reasonDeletedImageStep}
                        helperText={errors.reasonDeletedImageStep}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Typography fontWeight={700} fontSize={{ xs: 14, md: 15 }}>Ngày xóa</Typography>
                    <InputText
                        label=""
                        name="dateDeletedImageStep"
                        value={formData.dateDeletedImageStep}
                        onChange={handleInputChange}
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

export default DialogDeleteImageStep;
import DialogComponent from "@/components/DialogComponent";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { FormDataUpdateDesignRequest } from "@/types/design-request";
import { Box, Button, Stack, Typography } from "@mui/material";

interface DialogUpdateStatusDateProps{
    open: boolean,
    onClose: () => void;
    formData: FormDataUpdateDesignRequest,
    error: string | null;
    onInputChange: (name: string, value: any) => void;
    onSubmit: () => void;
}

const STATUS_REQ: { id: number, value: string, label: string }[] = [
    {
        id: 1,
        value: 'pending',
        label: 'Đang thiết kế'
    },
    {
        id: 2,
        value: 'done',
        label: 'Hoàn thành'
    }
]

const DialogUpdateStatusDate = (props: DialogUpdateStatusDateProps) => {
    const { open, onClose, formData, error, onInputChange, onSubmit } = props;
    return(
        <DialogComponent
            isActiveFooter={false}
            dialogKey={open}
            handleClose={onClose}
            maxWidth='sm'
            dialogTitle="Cập nhật trạng thái và ngày hoàn thành"
        >
            <Box>
                <Stack direction='column'>
                    <Typography fontWeight={600} fontSize='15px'>Trạng thái</Typography>
                    <InputSelect
                        label=""
                        name="status"
                        value={formData.status}
                        options={STATUS_REQ}
                        transformOptions={(data) => 
                            data.map((item) => ({
                                label: item.label,
                                value: item.value
                            }))
                        }
                        onChange={onInputChange}
                        disabled
                    />
                </Stack>
                <Stack mt={2} direction='column'>
                    <Typography fontWeight={600} fontSize='15px'>Ngày hoàn thành</Typography>
                    <InputText
                        label=""
                        name="completedDate"
                        value={formData.completedDate}
                        type="date"
                        onChange={onInputChange}
                        error={!!error}
                        helperText={error}
                    />
                </Stack>
                <Stack mt={2} direction='row' justifyContent='center'>
                    <Button onClick={onSubmit} sx={{ bgcolor: COLORS.BUTTON, width: 100 }}>
                        Lưu
                    </Button>
                    <Button variant="outlined" onClick={onClose} sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 100 }}>
                        Hủy
                    </Button>
                </Stack>                
            </Box>
        </DialogComponent>
    )
}
export default DialogUpdateStatusDate;
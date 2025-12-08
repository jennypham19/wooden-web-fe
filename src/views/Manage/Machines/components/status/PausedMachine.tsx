import { FormDataStatusMachine } from "@/types/machine";
import { FormErrorsMaintenance } from "../UpdateMachine";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";

interface PausedMachineProps{
    formData: FormDataStatusMachine,
    errors: FormErrorsMaintenance,
    onInputChange: (name: string, value: any) => void
}

const PausedMachine: React.FC<PausedMachineProps> = (props) => {
    const { formData, errors, onInputChange } = props;
    return(
        <>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label="Ngày hoạt động lại"
                    name="startAgainDate"
                    value={formData.startAgainDate}
                    type="date"
                    placeholder="Ngày bật lại máy"
                    onChange={onInputChange}
                    error={!!errors.startAgainDate}
                    helperText={errors.startAgainDate}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    name="reason"
                    type="text"
                    value={formData.reason}
                    placeholder="Lý do bị dừng hoạt động"
                    onChange={onInputChange}
                    error={!!errors.reason}
                    helperText={errors.reason}
                    multiline
                    rows={5}
                />
            </Grid>
        </>
    )
}

export default PausedMachine;
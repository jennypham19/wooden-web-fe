import { FormDataStatusMachine } from "@/types/machine";
import { FormErrorsMaintenance } from "../UpdateMachine";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";

interface StoppedMachineProps{
    formData: FormDataStatusMachine,
    errors: FormErrorsMaintenance,
    onInputChange: (name: string, value: any) => void
}

const StoppedMachine: React.FC<StoppedMachineProps> = (props) => {
    const { formData, errors, onInputChange } = props;
    return(
        <>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    name="reason"
                    type="text"
                    value={formData.reason}
                    placeholder="Lý do không hoạt động"
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

export default StoppedMachine;
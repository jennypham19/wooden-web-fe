import { FormDataStatusMachine } from "@/types/machine";
import { FormErrorsMaintenance } from "../UpdateMachine";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";

interface RepairMachineProps{
    formData: FormDataStatusMachine,
    errors: FormErrorsMaintenance,
    onInputChange: (name: string, value: any) => void
}

const RepairMachine: React.FC<RepairMachineProps> = (props) => {
    const { formData, errors, onInputChange } = props;
    return(
        <>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label="Ngày sửa chữa"
                    name="repairedDate"
                    value={formData.repairedDate}
                    type="date"
                    placeholder="Ngày sửa chữa"
                    onChange={onInputChange}
                    error={!!errors.repairedDate}
                    helperText={errors.repairedDate}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    name="reason"
                    type="text"
                    value={formData.reason}
                    placeholder="Mô tả tình trạng"
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

export default RepairMachine;
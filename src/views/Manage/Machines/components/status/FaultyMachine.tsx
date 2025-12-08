import React from "react";
import Grid from "@mui/material/Grid2";
import { FormDataStatusMachine } from "@/types/machine";
import { FormErrorsMaintenance } from "../UpdateMachine";
import InputText from "@/components/InputText";

interface FaultyMachineProps{
    formData: FormDataStatusMachine;
    errors: FormErrorsMaintenance;
    onInputChange: (name: string, value: any) => void;
}

const FaultyMachine: React.FC<FaultyMachineProps> = (props) => {
    const { formData, errors, onInputChange } = props;
    return(
        <>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    placeholder="Lý do gặp sự cố"
                    name="reason"
                    value={formData.reason}
                    type="text"
                    onChange={onInputChange}
                    multiline
                    rows={6}
                    error={!!errors.reason}
                    helperText={errors.reason}
                />
            </Grid>
        </>
    )
}

export default FaultyMachine;
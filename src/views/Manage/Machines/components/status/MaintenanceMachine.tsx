import InputText from "@/components/InputText";
import { FormDataStatusMachine } from "@/types/machine";
import Grid from "@mui/material/Grid2";
import { FormErrorsMaintenance } from "../UpdateMachine";
import { v4 as uuidv4 } from "uuid";
import { Box, Checkbox, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface MaintenanceMachineProps{
    formData: FormDataStatusMachine;
    errors: FormErrorsMaintenance;
    onInputChange: (name: string, value: any) => void;
    onSelected: (value: any) => void;
    onErrors: () => void;
}

const DATA_MAINTENANCE: { id: string, value: string, label: string }[] = [
    {
        id: uuidv4(),
        value: '0%',
        label: 'Mức độ bảo dưỡng 0%'
    },
    {
        id: uuidv4(),
        value: '25%',
        label: 'Mức độ bảo dưỡng 25%'
    },
    {
        id: uuidv4(),
        value: '50%',
        label: 'Mức độ bảo dưỡng 50%'
    },
    {
        id: uuidv4(),
        value: '100%',
        label: 'Mức độ bảo dưỡng 100%'
    }
]

const MaintenanceMachine = (props: MaintenanceMachineProps) => {
    const { formData, errors, onInputChange, onSelected, onErrors } = props;
    const [checked, setChecked] = useState<string | null>(null);

    const handleCheck = (value: string) => {
        const newValue = checked === value ? null : value;
        onSelected(newValue)
        setChecked(newValue)
        onErrors()
    }
    return(
        <>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    label="Ngày bảo dưỡng"
                    type="date"
                    name="maintenanceDate"
                    value={formData.maintenanceDate}
                    onChange={onInputChange}
                    error={!!errors.maintenanceDate}
                    helperText={errors.maintenanceDate}
                    placeholder="Ngày bảo dưỡng"
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <InputText
                    label=""
                    type="text"
                    multiline
                    rows={5}
                    name="reason"
                    value={formData.reason}
                    onChange={onInputChange}
                    error={!!errors.reason}
                    helperText={errors.reason}
                    placeholder="Mô tả tình trạng"
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Box display='flex' flexDirection='column'>
                    {DATA_MAINTENANCE.map((data, index) => {
                        return(
                            <Stack py={1.5} key={index}>
                                <Checkbox
                                    checked={checked === data.value}
                                    onChange={() => handleCheck(data.value)}
                                    sx={{
                                        color: "#000",
                                        "&.Mui-checked": {
                                            color: "#000"
                                        }
                                    }}
                                />
                                <Typography>{data.label}</Typography>
                            </Stack>
                        )
                    })}
                    {errors.maintenancePercentage && (
                        <Typography mt={1} fontWeight={600} variant="subtitle2" color="error">{errors.maintenancePercentage}</Typography>
                    )}                    
                </Box>
            </Grid>
        </>
    )
}

export default MaintenanceMachine;
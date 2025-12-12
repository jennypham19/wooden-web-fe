import { FormDataStep, FormStepErrors } from "@/types/order";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2"
import InputSelect from "./InputSelect";
import { v4 as uuidv4} from "uuid"

const DATA_PROCCESS: { id: string, label: string, value: string}[] = [
    {
        id: uuidv4(),
        label: 'Chưa hoạt động',
        value: 'pending'
    },
    {
        id: uuidv4(),
        label: 'Đang hoạt động',
        value: 'in_progress'
    },
    {
        id: uuidv4(),
        label: 'Hoàn thành',
        value: 'completed'
    }
]

interface InputTextProps{
    index: number,
    onInputChange: (index: number, name: string, value: any) => void;
    name: string,
    value: string;
    error?: boolean,
    helperText?: string;
    label: string;
    disabled?: boolean
}

const InputText = (props: InputTextProps) => {
    const { onInputChange, index, name, value, error, helperText, label, disabled } = props;
    return (
        <TextField
            placeholder="Nhập thông tin"
            label={label}
            name={name}
            type="text"
            value={value}
            error={error}
            helperText={helperText}
            disabled={disabled}
            onChange={(e) => onInputChange(index, name, e.target.value)}
            InputProps={{
                sx:{
                    "& .MuiOutlinedInput-notchedOutline":{
                        border: "1px solid rgb(53, 50, 50)",
                        borderRadius:"8px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "1px solid rgb(53, 50, 50)",
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        border: "1px solid rgb(53, 50, 50)",
                    },
                    color: 'black'
                },
            }}
            sx={{
                "& .MuiInputLabel-root": {
                    fontSize: "14px",
                    color: '#aaa'
                },
                "& .MuiInputLabel-root.Mui-focused": {
                    fontSize: "14px",
                    color: '#aaa'
                },
            }} 
        />
    )
}

interface StepProps{
    index: number,
    formData: FormDataStep,
    errors: FormStepErrors,
    onInputChange: (index: number, name: string, value: any) => void;  
}

const Step = (props: StepProps) => {
    const { index, formData, errors, onInputChange } = props;

    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputText
                    index={index} // Giữ nguyên index
                    label={`Bước ${index + 1}`}
                    name="name"
                    value={formData.name}
                    onInputChange={onInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <InputSelect
                    index={index} // Giữ nguyên index, không cần -1
                    name="proccess"
                    value={formData.proccess}
                    label=""
                    options={DATA_PROCCESS}
                    onChange={onInputChange}
                    placeholder="Chọn tiến độ"
                    disabled
                />
            </Grid>
        </Grid>
    )
}

export default Step;
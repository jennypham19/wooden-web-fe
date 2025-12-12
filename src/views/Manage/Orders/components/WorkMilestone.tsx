import { Box, Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import Grid from "@mui/material/Grid2";
import LabeledStack from "@/components/LabeledStack";
import { FormDataStep, FormDataWorkMilestone, FormStepErrors, FormWorkMilestoneErrors } from "@/types/order";
import { COLORS } from "@/constants/colors";
import Step from "./Step";

interface InputTextProps{
    index: number,
    onInputChange: (index: number, name: string, value: any) => void;
    name: string,
    value: any;
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

interface WorkMilestoneProps{
    formDataWorkMilestone: FormDataWorkMilestone[],
    onBack: () => void,
    onInputChange: (index: number, name: string, value: any) => void
}

const WorkMilestone: FC<WorkMilestoneProps> = ({ formDataWorkMilestone, onBack, onInputChange }) => {
    const [stepErrors, setStepErrors] = useState<FormStepErrors[]>([])
    const [numStep, setNumStep] = useState<number[]>([]);
    const [workMilestoneErrors, setWorkMilestoneErrors] = useState<FormWorkMilestoneErrors[]>([])

    // --------------- Cập nhật mốc công việc + khởi tạo steps --------
    const handleInputChangeWorkMilestone = (index: number, name: string, value: any) => {
        const validName = name as keyof FormDataWorkMilestone;
        
        if(validName === 'step'){
            const valueNum = Number(value);
            if(!isNaN(valueNum) && valueNum > 0){
                setNumStep(Array.from({ length: valueNum }, (_, i) => i + 1 ))
                const newSteps = Array.from({ length: valueNum }, () => ({
                    name: "",
                    proccess: "pending"
                }));
                onInputChange(index, "steps", newSteps);
            }else{
                setNumStep([]);
                onInputChange(index, "steps", []);
            }
        }
        
        onInputChange(index, name, value)
        // Xóa lỗi tại ô đang nhập
        setWorkMilestoneErrors((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: undefined };
            return updated;
        });
    }


    const handleInputStepChange = (milestoneIndex: number, stepIndex: number, name: string, value: any) => {
        const milestone = formDataWorkMilestone[milestoneIndex];
        const steps = [ ...(milestone.steps ?? [])];

        steps[stepIndex] = {
            ...steps[stepIndex],
            [name]: value
        }     
        onInputChange(milestoneIndex, "steps", steps);

        setStepErrors((prev) => {
            const updated = [...prev];
            updated[stepIndex] = { ...updated[stepIndex], [name]: undefined };
            return updated;
        });
    }

    const validateSubmit = (): boolean => {
        // Bắt lỗi mốc công việc
        const newWorkMilestoneErrors: FormWorkMilestoneErrors[] = [];
        formDataWorkMilestone.forEach((mile, idx) => {
            const mError: FormWorkMilestoneErrors = {};
            if (!mile.name) mError.name = `Mốc công việc ${idx + 1}: Vui lòng nhập tên mốc công việc`;
            if (!mile.step) mError.step = `Mốc công việc ${idx + 1}: Vui lòng nhập mốc công việc`;
            if (!mile.target) mError.target = `Mốc công việc ${idx + 1}: Vui lòng nhập mục tiêu/ yêu cầu`;
            newWorkMilestoneErrors.push(mError);
        });

        const hasWorkMilestoneError = newWorkMilestoneErrors.some((e) => Object.keys(e).length > 0);
        setWorkMilestoneErrors(newWorkMilestoneErrors)

        // Bắt lỗi của Bước
        const newStepErrors: FormStepErrors[] = [];
        formDataWorkMilestone.forEach((mile) => {
            (mile.steps ?? []).forEach((step, idx) => {
                const pError: FormStepErrors = {};
                if (!step.name) pError.name = `Bước ${idx + 1}: Vui lòng nhập tên bước`;
                if (!step.proccess) pError.proccess = `Bước ${idx + 1}: Vui lòng chọn tiến độ`;
                newStepErrors.push(pError);
            })
        });

        const hasStepError = newStepErrors.some((e) => Object.keys(e).length > 0);
        setStepErrors(newStepErrors)

        return !hasStepError && !hasWorkMilestoneError;
    }

    const handleSave = () => {
        if(!validateSubmit()){
            return
        }

        console.log("formDataWorkMilestone", formDataWorkMilestone);
        
    }

    return(
        <Box mx={2} py={1}>
            {formDataWorkMilestone.map((mile, index) => {
                const errors = workMilestoneErrors[index] || {};
                return (
                    <LabeledStack
                        sx={{ borderRadius: 3 }}
                        label={`Công việc mốc ${index + 1}`}
                        stackProps={{ direction: "column", my: 2, p: 2 }}   
                    >
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputText
                                    label='Tên mốc'
                                    name="name"
                                    value={mile.name}
                                    index={index}
                                    onInputChange={handleInputChangeWorkMilestone}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputText
                                    label='Mốc công việc'
                                    name="step"
                                    value={mile.step}
                                    index={index}
                                    onInputChange={handleInputChangeWorkMilestone}
                                    error={!!errors.step}
                                    helperText={errors.step}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <InputText
                                    label='Mục tiêu/ yêu cầu'
                                    name="target"
                                    value={mile.target}
                                    index={index}
                                    onInputChange={handleInputChangeWorkMilestone}
                                    error={!!errors.target}
                                    helperText={errors.target}
                                />
                            </Grid>
                        </Grid>
                        {mile.step !== null && numStep.length > 0 && (
                            (mile.steps ?? []).map((step, idx) => (
                                <Step
                                    index={idx}
                                    key={idx}
                                    onInputChange={(i, name, value) => handleInputStepChange(index, i, name, value)}
                                    formData={step}
                                    errors={stepErrors[idx] || {}}
                                />
                            ))
                        )}
                    </LabeledStack>                
                )
            })}
            <Box my={2} display='flex' justifyContent='center'>
                <Button
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, mr: 2, width: 120 }}
                    onClick={handleSave}
                >
                    Lưu
                </Button>
                <Button
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 120 }}
                    onClick={onBack}
                >
                    Quay lại
                </Button>
            </Box>
        </Box>
    )
}

export default WorkMilestone;
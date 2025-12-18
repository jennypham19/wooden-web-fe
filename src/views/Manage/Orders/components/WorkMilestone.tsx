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
    disabled?: boolean;
    onlyPositiveNumber?: boolean;
    placeholder?: string
}

const InputText = (props: InputTextProps) => {
    const { onInputChange, index, name, value, error, helperText, label, disabled, onlyPositiveNumber = false, placeholder = 'Nhập thông tin' } = props;
    return (
        <TextField
            placeholder={placeholder}
            label={label}
            name={name}
            type="text"
            value={value}
            error={error}
            helperText={helperText}
            disabled={disabled}
            onChange={(e) => {
                const val = e.target.value;
                if(onlyPositiveNumber){
                    // Cho phép xóa trắng
                    if(val.trim() === ''){
                        onInputChange(index, name, val);
                        return;
                    }

                    // Kiểm tra số dương hợp lệ (số thực hoặc số nguyên dương)
                    const numVal = Number(val);

                    if(!isNaN(numVal) && /^\d*\.?\d*$/.test(val)){
                        onInputChange(index, name, val);
                    }

                    // Nếu không hợp lệ thì bỏ qua, không gọi onChange => không update value
                }else{
                    onInputChange(index, name, e.target.value)
                }
            }}
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
    onInputChange: (index: number, name: string, value: any) => void;
    onBack: () => void,
    onSave: (data: FormDataWorkMilestone[]) => void;
    onStepErrors: (stepIndex: number, name: string) => void;
    onWorkMilestoneErrors: (stepIndex: number, name: string) => void;
    stepErrors: FormStepErrors[];
    workMilestoneErrors: FormWorkMilestoneErrors[];
}

const WorkMilestone: FC<WorkMilestoneProps> = ({ formDataWorkMilestone, onInputChange, stepErrors, workMilestoneErrors, onStepErrors, onWorkMilestoneErrors }) => {
    const [numStep, setNumStep] = useState<number[]>([]);

    // ------------------------ Cập nhật mốc công việc + khởi tạo steps ------------------//
    const handleInputChangeWorkMilestone = (index: number, name: string, value: any) => {
        const validName = name as keyof FormDataWorkMilestone;
        if(validName === 'step'){
            const valueNum = Number(value);
            if(!isNaN(valueNum) && valueNum > 0){
                setNumStep(Array.from({ length: valueNum }, (_, i) => i + 1))
                const newSteps = Array.from({ length: valueNum }, () => ({
                    name: '',
                    progress: '0%',
                    proccess: 'pending'
                }));
                onInputChange(index, "steps", newSteps)
            }else{
                setNumStep([]);
                onInputChange(index, "steps", [])
            }
        }

        onInputChange(index, name, value)
        // Xóa lỗi tại ô đang nhập

        onWorkMilestoneErrors(index, name);
    }

    const handleInputStepChange = (milestoneIndex: number, stepIndex: number, name: string, value: any) => {
        const milestone = formDataWorkMilestone[milestoneIndex];
        const steps = [ ...(milestone.steps ?? [])];

        steps[stepIndex] = {
            ...steps[stepIndex],
            [name]: value
        }     
        onInputChange(milestoneIndex, "steps", steps);

        onStepErrors(stepIndex, name)
    }

    return(
        <Box>
            {formDataWorkMilestone.map((mile, index) => {
                const errors = workMilestoneErrors[index] || {};
                return(
                    <LabeledStack
                        sx={{ borderRadius: 3 }}
                        label={`Công việc mốc ${index + 1}`}
                        stackProps={{ direction: 'column', my: 2, p: 2 }}
                    >
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputText
                                    label="Tên mốc"
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
                                    label="Mốc công việc"
                                    name="step"
                                    value={mile.step}
                                    index={index}
                                    onInputChange={handleInputChangeWorkMilestone}
                                    onlyPositiveNumber={true}
                                    placeholder="Chỉ nhập số"
                                    error={!!errors.step}
                                    helperText={errors.step}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <InputText
                                    label="Mục tiêu/ yêu cầu"
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
        </Box>
    )
}

export default WorkMilestone;
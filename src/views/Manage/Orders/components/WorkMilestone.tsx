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

}

const WorkMilestone: FC<WorkMilestoneProps> = ({  }) => {

    return(
        <Box mx={2} py={1}>
          
        </Box>
    )
}

export default WorkMilestone;
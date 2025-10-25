import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import InputMask from "react-input-mask";

export interface InputMaskTextFieldProps extends Omit<TextFieldProps, "onChange"> {
    mask: string;
    value: string;
    onChange: (value: string) => void;
    error?: boolean;
    helperText?: string | null;
}

const InputMaskTextField: React.FC<InputMaskTextFieldProps> = ({ mask, value, onChange, error, helperText, ...props}) => {
    return (
        <InputMask
            mask={mask}
            value={value}
            onChange={(e: any) => onChange(e.target.value)}
        >
            {(inputProps: any) => 
            <TextField 
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
                error={error}
                helperText={helperText}
                {...inputProps} 
                {...props}
            />
            }
        </InputMask>
    )
};

export default InputMaskTextField;
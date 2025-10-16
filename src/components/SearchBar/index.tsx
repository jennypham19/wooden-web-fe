import { Search } from "@mui/icons-material";
import { Box, Divider, InputAdornment, SxProps, TextField, Theme } from "@mui/material";
import React, { useState } from "react";

interface InputSearchProps{
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
    initialValue?: string;
    style?:SxProps<Theme>;
    borderColor?: string;
    color?: string;
    colorIcon?: string;
    borderRadius?: string;
    boxShadow?: string
}

const InputSearch: React.FC<InputSearchProps> = (props) => {
    const { onSearch, placeholder, initialValue = " ", style, borderColor='#1C1A1B', color='white', colorIcon='white', borderRadius='20px', boxShadow} = props;
    const [searchTerm, setSearchTerm] = useState<string>(initialValue);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    // const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (event.key === "Enter") {
    //     onSearch(searchTerm);
    //     }
    // };
    return (
        <Box
            sx={style}
        >
            <TextField
                fullWidth
                variant="outlined"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleChange}
                // onKeyPress={handleKeyPress}
                InputProps={{
                    startAdornment:(
                        <InputAdornment
                            position="start"
                            sx={{
                                height:"100%", // Đảm bảo InputAdornment chiếm toàn bộ chiều cao của input
                                maxHeight:"none", // Override default maxHeight
                                marginRight:0, // Remove default margin-right
                                display: "flex",
                                alignItems: "center", // Căn giữa icon và divider theo chiều dọc
                                justifyContent: 'center', // Căn giữa nội dung trong adornment
                                paddingLeft: "12px", // Padding cho icon bên trái
                                paddingRight: "12px" // Padding cho divider bên phải
                            }}
                        >
                            <Search sx={{ color: colorIcon, fontSize: '25px'}}/>
                        </InputAdornment>
                    ),
                    sx:{
                        "& .MuiOutlinedInput-notchedOutline":{
                            borderColor:borderColor
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: borderColor,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            // borderColor: "rgba(0, 0, 0, 0.2)",
                            border:`1px solid ${borderColor}`
                        },
                        ".MuiInputBase-input":{
                            // padding: "12px 14px", // Điều chỉnh padding cho text input, bỏ padding trái vì adornment đã lo
                            paddingLeft:0 // Bỏ padding mặc định bên trái vì đã có adornment,
                        },
                        // Áp dụng border radius cho chính input field
                        borderRadius: borderRadius,
                        color: color
                    },
                }}
                sx={{
                    // Đảm bảo TextField root không có padding và áp dụng border radius
                    "& .MuiInputBase-root":{
                        padding:0, // Loại bỏ padding mặc định của root input base
                        borderRadius: borderRadius, // Áp dụng border radius cho toàn bộ TextField
                        color: color,
                        boxShadow: boxShadow
                    },
                    "& .MuiInputBase-input::placeholder": {
                        color: color
                    }
                }}
            />
        </Box>
    )
}

export default InputSearch
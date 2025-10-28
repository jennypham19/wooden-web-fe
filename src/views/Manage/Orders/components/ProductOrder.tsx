import InputSelect from "@/components/InputSelect";
import { FormDataProducts } from "@/types/product";
import { IUser } from "@/types/user";
import { getProccessOrderLabel, getStatusOrderLabel } from "@/utils/labelEntoVni";
import { Box, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormProductErrors } from "./DialogAddOrder";

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
            onChange={(e) => onInputChange(index - 1, name, e.target.value)}
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
        />
    )
}

interface ProductOrderProps{
    users: IUser[],
    index: number,
    formData: FormDataProducts,
    errors: FormProductErrors,
    onInputChange: (index: number, name: string, value: any) => void;
}

const ProductOrder = (props: ProductOrderProps) => {
    const { users, index, formData, onInputChange, errors } = props;
    
    return(
        <Box borderRadius={2} p={1.5} mt={2} border='1px solid #b3acacff' display='flex' flexDirection='column'>
                <Typography fontWeight={700} fontSize="15px" mb={1}>
                    Sản phẩm thứ {index}
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Tên sản phẩm</Typography>
                        <InputText
                            index={index}
                            label=""
                            name="name"
                            value={formData.name}
                            onInputChange={onInputChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Mô tả/ Yêu cầu</Typography>
                        <InputText
                            label=""
                            name="description"
                            index={index}
                            value={formData.description}
                            onInputChange={onInputChange}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={700} fontSize='15px'>Mục tiêu</Typography>
                        <InputText
                            label=""
                            name="target"
                            index={index}
                            value={formData.target}
                            onInputChange={onInputChange}
                            error={!!errors.target}
                            helperText={errors.target}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Tiến độ</Typography>
                        <InputText
                            label=""
                            name="proccess"
                            index={index}
                            value={getProccessOrderLabel(formData.proccess)}
                            onInputChange={onInputChange}
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Trạng thái</Typography>
                        <InputText
                            label=""
                            name="status"
                            index={index}
                            value={getStatusOrderLabel(formData.status)}
                            onInputChange={onInputChange}
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={700} fontSize='15px'>Người quản lý</Typography>
                        {/* <InputSelect
                            label=""
                            name="managerId"
                            value={formData.managerId}
                            onChange={onInputChange}
                            options={users}
                            transformOptions={data =>
                                data.map((item) => ({
                                    value: item.id,
                                    label: item.fullName
                                }))
                            }
                            placeholder="Chọn người quản lý"
                            error={!!errors.managerId}
                            helperText={errors.managerId}
                        /> */}
                    </Grid>
                </Grid>
        </Box>
    )
}

export default ProductOrder;
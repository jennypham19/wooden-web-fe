import { FormDataMaterials } from "@/types/material";
import { FormMaterialErrors } from "./CreateBom";
import Grid from "@mui/material/Grid2";
import { Box, TextField, Typography } from "@mui/material";
import ImageUpload from "../../components/ImageUpload";
import InputMaskTextField from "@/components/InputMaskTextField";

type CustomInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'date'
  | 'datetime';

interface InputTextProps{
    index: number,
    onInputChange: (index: number, name: string, value: any) => void;
    name: string,
    value: any;
    error?: boolean,
    helperText?: string;
    label: string;
    disabled?: boolean,
    multiline?: boolean;
    rows?: number;
    onlyPositiveNumber?: boolean;
    type: CustomInputType;
}

const InputText = (props: InputTextProps) => {
    const { type, multiline = false, rows, onlyPositiveNumber = false, onInputChange, index, name, value, error, helperText, label, disabled } = props;
    return (
        <TextField
            placeholder="Nhập thông tin"
            label={label}
            name={name}
            type={(type === 'text' && multiline) ? undefined : type}
            margin="dense"
            value={value}
            error={error}
            helperText={helperText}
            disabled={disabled}
            rows={multiline ? rows : undefined}
            multiline={multiline}
            onChange={(e) =>{
                const val = e.target.value;
                if(onlyPositiveNumber){
                    //Cho phép xóa trắng
                    if(val.trim() === ''){
                        onInputChange(index - 1, name, val);
                        return;
                    }
                    // Kiểm tra số dương hợp lệ (số thực hoặc số nguyên dương)
                    const numVal = Number(val);
                    if(!isNaN(numVal) && /^\d*\.?\d*$/.test(val)){
                        onInputChange(index - 1, name,val);
                    }
                    // Nếu không hợp lệ thì bỏ qua, không gọi onChange => không update value
                }else{
                    onInputChange(index - 1, name, e.target.value)
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
        />
    )
}

interface MaterialBomProps{
    index: number;
    formData: FormDataMaterials,
    errors: FormMaterialErrors,
    onInputChange: (index: number, name: string, value: any) => void;
    errorImage: string | null;
    onFileSelect: (file: File | null, index: number) => void;
    codeMaterial: string,
    onChangeCodeMaterial: (code: string, index: number) => void;
    errorCodeMaterial: string | null
}

const MaterialBom = (props: MaterialBomProps) => {
    const { index, formData, errors, onInputChange, errorImage, onFileSelect, codeMaterial, onChangeCodeMaterial, errorCodeMaterial } = props;
    return(
        <Box borderRadius={2} p={1.5} mt={2} border='1px solid #b3acacff' display='flex' flexDirection='column'>
            <Typography fontWeight={700} fontSize="15px" mb={1}>
                    Vật tư thứ {index}
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}>
                    <ImageUpload
                        index={index - 1}
                        onFileSelect={(file) => onFileSelect(file, index - 1)}
                        height={340}
                        errorImage={errorImage}
                    />
                    {errorImage && <Typography mt={1.5} color="error">{errorImage}</Typography>}
                </Grid>
                <Grid sx={{ py: 1.5 }} size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight={600} fontSize='15px'>Mã vật tư</Typography>
                            <InputMaskTextField
                                mask="VT999"
                                value={codeMaterial}
                                onChange={(value) => {
                                    onChangeCodeMaterial(value, index - 1)
                                }}
                                placeholder="VT___"
                                error={!!errorCodeMaterial}
                                helperText={errorCodeMaterial}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight={600} fontSize='15px'>Tên vật tư</Typography>
                            <InputText
                                type="text"
                                index={index}
                                label=""
                                name="name"
                                value={formData.name}
                                onInputChange={onInputChange}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight={600} fontSize='15px'>Đơn vị</Typography>
                            <InputText
                                type="text"
                                index={index}
                                label=""
                                name="unit"
                                value={formData.unit}
                                onInputChange={onInputChange}
                                error={!!errors.unit}
                                helperText={errors.unit}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography fontWeight={600} fontSize='15px'>Định lượng</Typography>
                            <InputText
                                type="text"
                                index={index}
                                label=""
                                name="amount"
                                value={formData.amount}
                                onInputChange={onInputChange}
                                onlyPositiveNumber 
                                error={!!errors.amount} 
                                helperText={errors.amount}                                      
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography fontWeight={600} fontSize='15px'>Ghi chú</Typography>
                            <InputText
                                type="text"
                                index={index}
                                label=""
                                name="note"
                                value={formData.note}
                                onInputChange={onInputChange}
                                multiline
                                rows={5}
                                error={!!errors.note}
                                helperText={errors.note}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MaterialBom;
import InputText from "@/components/InputText";
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"

const DATA_ADDRESS: {id: string, label: string, value: string}[] = [
    {
        id: uuidv4(),
        label: 'Cơ quan',
        value: 'office'
    },    
    {
        id: uuidv4(),
        label: 'Nhà riêng',
        value: 'home'
    }
]

const NewCustomer = () => {
    const [checked, setChecked] = useState<string | null>(null);

    const handleCheck = (value: string) => () => {
        setChecked(value);
    };
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontSize='15px' fontWeight={500}>Tên khách hàng</Typography>
                <InputText
                    label=""
                    name=""
                    value={''}
                    type="text"
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontSize='15px' fontWeight={500}>Số điện thoại</Typography>
                <InputText
                    label=""
                    name=""
                    value={''}
                    type="text"
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
                <Stack mb={2} gap={2} direction='row'>
                    <Typography fontSize='15px' fontWeight={500}>Địa chỉ chi tiết</Typography>
                    <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        {DATA_ADDRESS.map((data, index) => (
                            <FormControlLabel
                                key={index}
                                label={data.label}
                                sx={{
                                    '.MuiFormControlLabel-label': { fontSize: '15px', ml: 1 }
                                }}
                                control={
                                    <Checkbox
                                        checked={checked === data.value}
                                        onChange={handleCheck(data.value)}
                                        sx={{
                                            color: "#000",
                                            "&.Mui-checked": {
                                                color: "#000",
                                            },
                                        }}
                                    />
                                }
                            />                                
                        ))}
                    </FormGroup>
                </Stack>
                <InputText
                    label=""
                    name=""
                    value={''}
                    type="text"
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                />
            </Grid>
        </Grid>
    )
}

export default NewCustomer;
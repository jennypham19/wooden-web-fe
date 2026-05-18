import InputText from "@/components/InputText";
import { ICustomerInput } from "@/types/customer";
import { FormInfoNewCustomerErrors } from "@/types/error";
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { error } from "console";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"

export const DATA_ADDRESS: {id: string, label: string, value: string}[] = [
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

interface NewCustomerProps{
    inforNewCustomer: ICustomerInput,
    onCheck: (value: string) => void;
    onHandleChangeInfoNewCus: (name: string, value: any) => void;
    infoNewCusErrors: FormInfoNewCustomerErrors
}

const NewCustomer = (props: NewCustomerProps) => {
    const { inforNewCustomer, onCheck, onHandleChangeInfoNewCus, infoNewCusErrors } = props;

    const handleCheck = (value: string) => () => {
        onCheck(value);
    };
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontSize='15px' fontWeight={500}>Tên khách hàng</Typography>
                <InputText
                    label=""
                    name="name"
                    value={inforNewCustomer.name}
                    type="text"
                    onChange={onHandleChangeInfoNewCus}
                    sx={{ mt: 0.5 }}
                    error={!!infoNewCusErrors.name}
                    helperText={infoNewCusErrors.name}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontSize='15px' fontWeight={500}>Số điện thoại</Typography>
                <InputText
                    label=""
                    name="phone"
                    value={inforNewCustomer.phone}
                    type="text"
                    onChange={onHandleChangeInfoNewCus}
                    sx={{ mt: 0.5 }}
                    error={!!infoNewCusErrors.phone}
                    helperText={infoNewCusErrors.phone}
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
                                        checked={inforNewCustomer.type === data.value}
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
                {infoNewCusErrors.type && (
                    <Typography color="error" fontSize="13px" mb={1}>{infoNewCusErrors.type}</Typography>
                )}
                {inforNewCustomer.type && (
                    <InputText
                        label=""
                        name="address"
                        value={inforNewCustomer.address}
                        type="text"
                        onChange={onHandleChangeInfoNewCus}
                        sx={{ mt: 0.5 }}
                        multiline
                        rows={5}
                        error={!!infoNewCusErrors.address}
                        helperText={infoNewCusErrors.address}
                    />                    
                )}

            </Grid>
        </Grid>
    )
}

export default NewCustomer;
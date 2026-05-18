import AutocompleteComponent from "@/components/Autocomplete";
import InputText from "@/components/InputText";
import { getCustomers } from "@/services/customer-service";
import { ICustomer } from "@/types/customer";
import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DATA_ADDRESS } from "./NewCustomer";

interface OldCustomerProps{
    inforOldCustomer: ICustomer | null;
    onHandleChangeInfoOldCus: (value: ICustomer | null) => void;
}
const OldCustomer = ({ inforOldCustomer, onHandleChangeInfoOldCus }: OldCustomerProps) => {
    
    return(
        <Grid container spacing={2}>
            <Grid size={{ md: 8 }}>
                <Typography fontSize='15px' fontWeight={500}>Tên khách hàng</Typography>
                <AutocompleteComponent<ICustomer>
                    label=""
                    placeholder="Nhập tên khách hàng..."
                    fetchOptions={getCustomers}
                    getOptionLabel={(option) => option.name}
                    onChange={(value) => {
                        console.log("selected", value);
                        onHandleChangeInfoOldCus(value)
                    }}
                    getOptionKey={(option) => option.id}
                    getRenderOption={(option) => (
                        <Typography variant="subtitle2">{option.name + " - " + option.phone}</Typography>
                    )}
                />
            </Grid>
            <Grid size={{ md: 4 }}>
                <Typography fontSize='15px' fontWeight={500}>Số điện thoại</Typography>
                <InputText
                    label=""
                    name="phone"
                    value={inforOldCustomer?.phone || ''}
                    type="text"
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                    disabled
                />
            </Grid>
            <Grid size={{ md: 12 }}>
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
                                        checked={inforOldCustomer?.type === data.value}
                                        disabled
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
                    name="address"
                    value={inforOldCustomer?.address || ''}
                    type="text"
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                    disabled
                    multiline
                    rows={5}
                />
            </Grid>
        </Grid>
    )
}

export default OldCustomer;
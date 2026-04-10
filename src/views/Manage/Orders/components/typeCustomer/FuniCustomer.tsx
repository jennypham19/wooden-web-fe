import AutocompleteComponent from "@/components/Autocomplete";
import InputText from "@/components/InputText";
import { getCustomerInFuni } from "@/services/customer-service";
import { ICustomerInFuni } from "@/types/customer";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface FuniCustomerProps{
    onChange: (value: ICustomerInFuni | null) => void;
    infoCustomer: ICustomerInFuni | null
}

const FuniCustomer = ({ onChange, infoCustomer } : FuniCustomerProps) => {
    
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography fontSize='15px' fontWeight={500}>Tên khách hàng</Typography>
                <AutocompleteComponent<ICustomerInFuni>
                    label=""
                    placeholder="Nhập tên khách hàng..."
                    fetchOptions={getCustomerInFuni}
                    getOptionLabel={(option) => option.name}
                    getOptionKey={(option) => option.id}
                    onChange={(value) => {
                        onChange(value)
                    }}
                    page={0}
                    getRenderOption={(option) => (
                        <Typography variant="subtitle2">{option.name + " - " + option.phone}</Typography>
                    )}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontSize='15px' fontWeight={500}>Số điện thoại</Typography>
                <InputText
                    label=""
                    name="phone"
                    value={infoCustomer? infoCustomer.phone : ''}
                    type="text"
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                    disabled
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontSize='15px' fontWeight={500}>Địa chỉ</Typography>
                <InputText
                    label=""
                    name="address"
                    value={''}
                    type="text"
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                    disabled={infoCustomer === null}
                />
            </Grid>
        </Grid>
    )
}

export default FuniCustomer;
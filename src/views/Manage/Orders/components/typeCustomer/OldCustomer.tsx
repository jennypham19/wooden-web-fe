import AutocompleteComponent from "@/components/Autocomplete";
import InputText from "@/components/InputText";
import { getCustomers } from "@/services/customer-service";
import { ICustomer } from "@/types/customer";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const OldCustomer = () => {
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography fontSize='15px' fontWeight={500}>Tên khách hàng</Typography>
                <AutocompleteComponent<ICustomer>
                    label=""
                    placeholder="Nhập tên sản phẩm..."
                    fetchOptions={getCustomers}
                    getOptionLabel={(option) => option.name}
                    onChange={(value) => {
                        console.log("selected", value);
                    }}
                    getOptionKey={(option) => option.id}
                    getRenderOption={(option) => (
                        <Typography variant="subtitle2">{option.name + " - " + option.phone}</Typography>
                    )}
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
                    disabled
                />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Typography fontSize='15px' fontWeight={500}>Địa chỉ</Typography>
                <InputText
                    label=""
                    name=""
                    value={''}
                    type="text"
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                    disabled
                />
            </Grid>
        </Grid>
    )
}

export default OldCustomer;
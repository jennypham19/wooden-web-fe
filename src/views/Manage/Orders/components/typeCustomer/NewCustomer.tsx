import InputText from "@/components/InputText";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const NewCustomer = () => {
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
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
            <Grid size={{ xs: 12, md: 4 }}>
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
            <Grid size={{ xs: 12, md: 4 }}>
                <Typography fontSize='15px' fontWeight={500}>Địa chỉ</Typography>
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
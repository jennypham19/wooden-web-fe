import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const OldCustomer = () => {
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Typography fontSize='15px' fontWeight={500}>Tên khách hàng</Typography>
                <InputSelect
                    label=""
                    name=""
                    value={''}
                    onChange={() => {}}
                    sx={{ mt: 0.5 }}
                    options={[]}
                    placeholder="Tìm theo tên hoặc số điện thoại..."
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
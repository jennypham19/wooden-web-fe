import { StatusMachine } from "@/constants/status";
import { FormDataMachines } from "@/types/machine";
import Grid from "@mui/material/Grid2";
import { FormErrors } from "./CreateMachine";
import { Typography } from "@mui/material";
import InputText from "@/components/InputText";

interface FieldByStatusProps{
    status: string,
    formData: FormDataMachines,
    onInputChange: (name: string, value: any) => void;
    errors: FormErrors
}

const FieldByStatus = (props: FieldByStatusProps) => {
    const { status, formData, onInputChange, errors } = props;
    return(
        <>
            {status === StatusMachine.OPERATING && (
                <>
                <Grid size={{ xs: 12, md: 4}}>
                    <Typography fontWeight={600} fontSize='15px'>Ngày mua</Typography>
                    <InputText
                        label=""
                        name="purchaseDate"
                        type="date"
                        value={formData.purchaseDate}
                        onChange={onInputChange}
                        mt={0.9}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4}}>
                    <Typography fontWeight={600} fontSize='15px'>Ngày hết hạn bảo hành</Typography>
                    <InputText
                        label=""
                        name="warrantyExpirationDate"
                        type="date"
                        value={formData.warrantyExpirationDate}
                        onChange={onInputChange}
                        mt={0.9}
                    />
                </Grid>
                <Grid size={{ xs: 12}}>
                    <Typography fontWeight={600} fontSize='15px'>Mô tả</Typography>
                    <InputText
                        multiline
                        label=""
                        name="description"
                        type="text"
                        value={formData.description}
                        onChange={onInputChange}
                        margin="dense"
                        rows={6}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Grid>
                </>
            )}
        </>
    )
}

export default FieldByStatus;
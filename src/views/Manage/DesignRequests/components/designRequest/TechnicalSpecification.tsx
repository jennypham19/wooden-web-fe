import { FormDataTechnicalSpecification } from "@/types/design-request";
import { FormErrorsTechnicalSpecification } from "./CreateDesignRequest";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Grid from "@mui/material/Grid2"
import InputText from "@/components/InputText";

interface TechnicalSpecificationProps{
    formData: FormDataTechnicalSpecification;
    onInputChange: (name: string, value: any) => void;
    errorsTechnicalSpecification: FormErrorsTechnicalSpecification
}

const TechnicalSpecification = (props: TechnicalSpecificationProps) => {
    const { formData, onInputChange, errorsTechnicalSpecification } = props;
    return(
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMore/>}>
                <Typography fontWeight={600} fontSize='16px'>Thông số kỹ thuật</Typography>
            </AccordionSummary>
            <Divider sx={{ mx: 2}}/>
            <AccordionDetails>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Dài (m)</Typography>
                        <InputText
                            label=""
                            value={formData.length}
                            type="text"
                            name="length"
                            onChange={onInputChange}
                            onlyPositiveNumber
                            error={!!errorsTechnicalSpecification.length}
                            helperText={errorsTechnicalSpecification.length}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Rộng (m)</Typography>
                        <InputText
                            label=""
                            value={formData.width}
                            type="text"
                            name="width"
                            onChange={onInputChange}
                            onlyPositiveNumber
                            error={!!errorsTechnicalSpecification.width}
                            helperText={errorsTechnicalSpecification.width}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Cao (m)</Typography>
                        <InputText
                            label=""
                            value={formData.height}
                            type="text"
                            name="height"
                            onChange={onInputChange}
                            onlyPositiveNumber
                            error={!!errorsTechnicalSpecification.height}
                            helperText={errorsTechnicalSpecification.height}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Nặng (kg)</Typography>
                        <InputText
                            label=""
                            value={formData.weight}
                            type="text"
                            name="weight"
                            onChange={onInputChange}
                            onlyPositiveNumber
                            error={!!errorsTechnicalSpecification.weight}
                            helperText={errorsTechnicalSpecification.weight}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Chất liệu</Typography>
                        <InputText
                            label=""
                            value={formData.material}
                            type="text"
                            name="material"
                            onChange={onInputChange}
                            error={!!errorsTechnicalSpecification.material}
                            helperText={errorsTechnicalSpecification.material}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography fontWeight={600} fontSize='15px'>Màu sắc</Typography>
                        <InputText
                            label=""
                            value={formData.color}
                            type="text"
                            name="color"
                            onChange={onInputChange}
                            error={!!errorsTechnicalSpecification.color}
                            helperText={errorsTechnicalSpecification.color}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Typography fontWeight={600} fontSize='15px'>Ghi chú</Typography>
                        <InputText
                            multiline
                            rows={5}
                            label=""
                            value={formData.note}
                            type="text"
                            name="note"
                            onChange={onInputChange}
                            error={!!errorsTechnicalSpecification.note}
                            helperText={errorsTechnicalSpecification.note}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion> 
    )
}

export default TechnicalSpecification;
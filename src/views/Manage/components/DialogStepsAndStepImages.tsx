import { getListStepsByIdWorkMilestone } from "@/services/product-service";
import { IStep } from "@/types/order";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2"
import DialogComponent from "@/components/DialogComponent";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel } from "@/utils/labelEntoVni";
import CommonImage from "@/components/Image/index";
import useBreakpoints from "@/hooks/useBreakpoints";

interface DialogStepsAndStepImagesProps{
    open: boolean,
    onClose: () => void;
    id: string,
    title: string
}

const DialogStepsAndStepImages = (props: DialogStepsAndStepImagesProps) => {
    const { open, onClose, id, title } = props;
    const bp = useBreakpoints();
    const [steps, setSteps] = useState<IStep[]>([]);

    useEffect(() => {
        if(open && id){
            const getListStep = async(id: string) => {
                const res = await getListStepsByIdWorkMilestone(id);
                const data = res.data as any as IStep[];
                setSteps(data)
            }
            getListStep(id)
        }
    }, [open, id])
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            dialogTitle={`Các bước trong ${title}`}
            isActiveFooter={false}
        >
            <Grid container spacing={2}>
                {steps.map((step, idx) => {
                    return(
                        <Grid key={idx} size={{ xs: 12 }}>
                            {bp ? (
                                <Box>
                                    <Stack direction='row'>
                                        <Typography sx={{ whiteSpace: 'nowrap' }} fontSize='14px'>Bước {idx + 1}: </Typography>
                                        <Typography sx={{ whiteSpace: { xs: 'none', md: 'nowrap'} }} fontSize='14px'>{step.name} </Typography>
                                    </Stack> 
                                    <Box my={1} display='flex' flexDirection='row' justifyContent='space-between'>
                                        <Stack direction='row'>
                                            <Typography fontSize='14px'>Tiến độ: </Typography>
                                            <Typography fontSize='14px'>{getProgressWorkOrderLabel(step.progress)}</Typography>
                                        </Stack>
                                        <Chip
                                            label={getProccessWorkOrderLabel(step.proccess)}
                                            color={getProccessWorkOrderColor(step.proccess).color}
                                        />                                        
                                    </Box>
                                </Box>
                            ) : (
                                <Box mb={1} display='flex' flexDirection='row' justifyContent='space-between'>
                                    <Stack direction='row'>
                                        <Typography sx={{ whiteSpace: 'nowrap' }} fontSize='14px'>Bước {idx + 1}: </Typography>
                                        <Typography sx={{ whiteSpace: { xs: 'none', md: 'nowrap'} }} fontSize='14px'>{step.name} </Typography>
                                    </Stack>                                                                                    
                                    <Stack direction='row'>
                                        <Typography fontSize='14px'>Tiến độ: </Typography>
                                        <Typography fontSize='14px'>{getProgressWorkOrderLabel(step.progress)}</Typography>
                                    </Stack>
                                    <Chip
                                        label={getProccessWorkOrderLabel(step.proccess)}
                                        color={getProccessWorkOrderColor(step.proccess).color}
                                    />
                                </Box>                                
                            )}

                            {/* Hình ảnh của bước trong mốc */}
                            {step.images.length > 0 && (
                                <Grid size={{ xs: 12}}>
                                    <Grid container spacing={1}>
                                        {step.images.map((img, imgIndex) => (
                                            <Grid key={imgIndex} size={{ xs: 12, md: 6}}>
                                                <CommonImage
                                                    src={img.url}
                                                    alt={img.name}
                                                    sx={{ height: 180, width: '100%' }}
                                                />
                                            </Grid>
                                        ))}                                                                
                                    </Grid>
                                </Grid>
                            )} 
                        </Grid> 
                    )
                })}
            </Grid>    
        </DialogComponent>
    )
}

export default DialogStepsAndStepImages;
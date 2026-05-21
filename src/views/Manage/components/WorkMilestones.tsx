import CommonImage from "@/components/Image/index";
import useBreakpoints from "@/hooks/useBreakpoints";
import { IWorkMilestone } from "@/types/order";
import { getProccessWorkOrderColor, getProccessWorkOrderLabel, getProgressWorkOrderLabel } from "@/utils/labelEntoVni";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface WorkMilestonesProps{
    workMilestones: IWorkMilestone[]
}

const WorkMilestones = (props: WorkMilestonesProps) => {
    const { workMilestones } = props;
    const bp = useBreakpoints();
    return(
        <>
            {workMilestones.map((workMilestone, index) => {
                return(
                    <Accordion defaultExpanded={index + 1 === 1}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls={`${index + 1}-panel${index + 1}-content`}
                            id={`${index + 1}-panel${index + 1}-header`}
                        >
                            <Box display='flex' flexDirection='column'>
                                <Stack direction='row'>
                                    <Typography fontWeight={600} fontSize='15px'>Mốc {index + 1 }: </Typography>
                                    <Typography fontWeight={600} fontSize='15px'>{workMilestone.name}</Typography>
                                </Stack>
                                <Stack my={1.5} direction='row'>
                                    <Typography fontSize='14px'>Tên mốc {index + 1 }: </Typography>
                                    <Typography fontWeight={600} fontSize='14px'>{workMilestone.name}</Typography>
                                </Stack>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>
                                {workMilestone.steps.map((step, idx) => {
                                    return(
                                        <Grid key={idx} size={{ xs: 12, md: 6 }}>
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
                        </AccordionDetails>
                    </Accordion>
                )  
            })}
        </>
    )
}

export default WorkMilestones;
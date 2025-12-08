import { getMachineById } from "@/services/machine-service";
import { IMachine } from "@/types/machine";
import { Box, Button, Card, Checkbox, Drawer, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import DetailMachineBase from "./DetailMachineBase";
import ProgressStepper from "./ProgressStepper";
import { v4 as uuidv4 } from "uuid";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import DateTime from "@/utils/DateTime";

interface UpdateProcessProps{
    open: boolean,
    onClose: () => void;
    id: string
}

const DATA_MAINTENANCE: { id: string, value: string, label: string }[] = [
    {
        id: uuidv4(),
        value: '0%',
        label: 'Mức độ bảo dưỡng 0%'
    },
    {
        id: uuidv4(),
        value: '25%',
        label: 'Mức độ bảo dưỡng 25%'
    },
    {
        id: uuidv4(),
        value: '50%',
        label: 'Mức độ bảo dưỡng 50%'
    },
    {
        id: uuidv4(),
        value: '100%',
        label: 'Mức độ bảo dưỡng 100%'
    }
]

const UpdateProccess: React.FC<UpdateProcessProps> = (props) => {
    const notify = useNotification();
    const { open, onClose, id } = props;
    const [machine, setMachine] = useState<IMachine | null>(null);
    const [checked, setChecked] = useState<string | null>(null);
    const [maintenancePercentage, setMaintenancePercentage] = useState<string | null>(null);
    const [maintenancePercentageError, setMaintenancePercentageError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isHiddenMaintenancePercentageDetail, setIsHiddenMaintenancePercentageDetail] = useState(false)
    
    useEffect(() => {
        if(open && id){
            const getDetail = async() => {
                const res = await getMachineById(id);
                const data = res.data as any as IMachine;
                setMachine(data)
            };
            getDetail();
        }
    }, [open, id]);

    const handleClose = () => {
        onClose();
        setMaintenancePercentage(null);
        setChecked(null);
        setMaintenancePercentageError(null);
    }

    const handleCheck = (value: string) => {
        const newValue = checked === value ? null : value;
        setChecked(newValue);
        setMaintenancePercentage(newValue);
        setIsHiddenMaintenancePercentageDetail(true)
    }

    console.log("maintenancePercentage: ", maintenancePercentage);
    console.log("isHiddenMaintenancePercentageDetail: ", isHiddenMaintenancePercentageDetail);

    const validate = (): boolean => {
        if(!maintenancePercentage){
            setMaintenancePercentageError("Vui lòng chọn phần trăm bảo dưỡng")
        }
        return !!maintenancePercentage
    }
    
    const handleSave = async() => {
        if(!validate()){
            return;
        }

        setIsSubmitting(true);

        try {
            handleClose();
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return(
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    width: { xs: '100%', md: 600 },
                    p: 3
                }
            }}
        >
            <Stack spacing={2}>
                {machine && (
                    <Card
                        sx={{ p: 1, borderRadius: 2 }}
                    >
                        <Grid container>
                            <DetailMachineBase machine={machine}/>
                            <Grid size={{ xs: 12 }}>
                                <Stack mx={2} my={1} direction='row'>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Ngày bảo dưỡng :</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}}>{DateTime.FormatDate(machine.maintenanceDate)}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600} mx={2}>Phần trăm bảo dưỡng: </Typography>
                        {(isHiddenMaintenancePercentageDetail || (maintenancePercentage === null && machine.maintenancePercentage)) && (
                            <ProgressStepper maintenancePercentage={machine.maintenancePercentage}/>
                        )}
                        {maintenancePercentage !== null && (
                            <ProgressStepper maintenancePercentage={maintenancePercentage}/>
                        )}
                        <Grid container spacing={2} sx={{ m: 2 }}>
                            <Grid size={{ xs: 12 }}>
                                {machine.maintenancePercentage === '0%' && (
                                    <Box display='flex' flexDirection='column'>
                                        {DATA_MAINTENANCE.slice(1).map((data, index) => {
                                            return(
                                                <Stack py={1.5} key={index}>
                                                    <Checkbox
                                                        checked={checked === data.value}
                                                        onChange={() => handleCheck(data.value)}
                                                        sx={{
                                                            color: "#000",
                                                            "&.Mui-checked": {
                                                                color: "#000"
                                                            }
                                                        }}
                                                    />
                                                    <Typography>{data.label}</Typography>
                                                </Stack>
                                            )                                            
                                        })}
                                    </Box>
                                )}
                                {machine.maintenancePercentage === '25%' && (
                                    <Box display='flex' flexDirection='column'>
                                        {DATA_MAINTENANCE.slice(2).map((data, index) => {
                                            return(
                                                <Stack py={1.5} key={index}>
                                                    <Checkbox
                                                        checked={checked === data.value}
                                                        onChange={() => handleCheck(data.value)}
                                                        sx={{
                                                            color: "#000",
                                                            "&.Mui-checked": {
                                                                color: "#000"
                                                            }
                                                        }}
                                                    />
                                                    <Typography>{data.label}</Typography>
                                                </Stack>
                                            )                                            
                                        })}
                                    </Box>
                                )}
                                {machine.maintenancePercentage === '50%' && (
                                    <Box display='flex' flexDirection='column'>
                                        {DATA_MAINTENANCE.slice(2).map((data, index) => {
                                            return(
                                                <Stack py={1.5} key={index}>
                                                    <Checkbox
                                                        checked={checked === data.value}
                                                        onChange={() => handleCheck(data.value)}
                                                        sx={{
                                                            color: "#000",
                                                            "&.Mui-checked": {
                                                                color: "#000"
                                                            }
                                                        }}
                                                    />
                                                    <Typography>{data.label}</Typography>
                                                </Stack>
                                            )                                            
                                        })}
                                    </Box>
                                )}
                                {maintenancePercentageError && (
                                    <Typography mt={1} fontWeight={600} variant="subtitle2" color="error">{maintenancePercentageError}</Typography>
                                )}                              
                            </Grid>
                        </Grid>
                        <Box my={2} display='flex' justifyContent='space-between'>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5, mr: 2 }}
                                onClick={handleSave}
                            >
                                Lưu
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5 }}
                                onClick={handleClose}
                            >
                                Quay lại
                            </Button>  
                        </Box>
                    </Card>
                )}
            </Stack>
        </Drawer>
    )
}

export default UpdateProccess;
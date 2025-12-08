import { getMachineById, updateMachineByStatus } from "@/services/machine-service";
import { DataStatusMachinePayload, FormDataStatusMachine, IMachine } from "@/types/machine";
import { Box, Button, Card, Drawer, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import DetailMachineBase from "./DetailMachineBase";
import { v4 as uuidv4 } from "uuid";
import InputSelect from "@/components/InputSelect";
import { COLORS } from "@/constants/colors";
import { StatusMachine } from "@/constants/status";
import StoppedMachine from "./status/StoppedMachine";
import MaintenanceMachine from "./status/MaintenanceMachine";
import ProgressStepper from "./ProgressStepper";
import RepairMachine from "./status/RepairMachine";
import PausedMachine from "./status/PausedMachine";
import { useValidateMachine } from "./errors";
import useNotification from "@/hooks/useNotification";
import Backdrop from "@/components/Backdrop";

interface HandleFaultyProps{
    open: boolean,
    onClose: () => void;
    id: string
}

const DATA_STATUS: { id: string, value: string, label: string }[] = [
    {
        id: uuidv4(),
        value: 'paused',
        label: 'Dừng hoạt động'
    },
    {
        id: uuidv4(),
        value: 'under_maintenance',
        label: 'Bảo dưỡng'
    },
    {
        id: uuidv4(),
        value: 'under_repair',
        label: 'Sửa chữa'
    },
    {
        id: uuidv4(),
        value: 'stopped',
        label: 'Ngừng hoạt động'
    }
]

export type FormErrorsMaintenance = {
    [K in keyof FormDataStatusMachine]?: string
}

const HandleFaulty = (props: HandleFaultyProps) => {
    const notify = useNotification();
    const { open, onClose, id } = props;
    const [machine, setMachine] = useState<IMachine | null>(null);
    const [status, setStatus] = useState<string>('');
    const [errorsStatus, setErrorsStatus] = useState<string | null>(null);
    const [formDataStatusMachine, setFormDataStatusMachine] = useState<FormDataStatusMachine>({
        status: '',
        maintenanceDate: null,
        reason: '',
        completionDate: null,
        repairedDate: null,
        startAgainDate: null,
        maintenancePercentage: null
    });
    const [errors, setErrors] = useState<FormErrorsMaintenance>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { validate } = useValidateMachine(formDataStatusMachine, status)
    
    useEffect(() => {
        if(open && id){
            const getDetail = async() => {
                const res = await getMachineById(id);
                const data = res.data as any as IMachine;
                setMachine(data)
            };

            getDetail()
        }
    }, [open, id]);

    const handleClose = () => {
        onClose();
        setStatus('');
        setErrorsStatus(null);
    }

    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataStatusMachine;
        setFormDataStatusMachine(prev => ({ ...prev, [name]: value}));

        if(validName === 'status' && typeof value === 'string'){
            setStatus(value);
            setFormDataStatusMachine(prev => ({ ...prev, reason: ''}));
            setFormDataStatusMachine(prev => ({ ...prev, maintenancePercentage: ''}));
            setErrors(prev => ({ ...prev, [name]: undefined}));
            setErrorsStatus(null)
        }

        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const validateStatus = () : boolean => {
        if (!formDataStatusMachine.status) {
            setErrorsStatus("Vui lòng chọn trạng thái")
        }

        return !!formDataStatusMachine.status;
    };

    const handleSave = async() => {
        if(!validateStatus()) {
            return
        };

        const errors = validate();
        if(Object.keys(errors).length > 0){
            setErrors(errors);
            return;
        }
        setIsSubmitting(true);
        const payload: DataStatusMachinePayload = {
            status: formDataStatusMachine.status,
            startAgainDate: formDataStatusMachine.startAgainDate ? formDataStatusMachine.startAgainDate?.toISOString() : null,
            repairedDate: formDataStatusMachine.repairedDate ? formDataStatusMachine.repairedDate?.toISOString() : null,
            maintenanceDate: formDataStatusMachine.maintenanceDate ? formDataStatusMachine.maintenanceDate?.toISOString() : null,
            reason: formDataStatusMachine.reason ? formDataStatusMachine.reason : null,
            maintenancePercentage: formDataStatusMachine.maintenancePercentage ? formDataStatusMachine.maintenancePercentage : null
        }

        try {
            const res = machine && await updateMachineByStatus(machine.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
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
                        </Grid>
                        {status === StatusMachine.UNDER_MAINTENANCE && (
                            <ProgressStepper maintenancePercentage={formDataStatusMachine.maintenancePercentage} />
                        )}
                        <Grid container spacing={2} sx={{ my: 2 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <InputSelect
                                    label=""
                                    value={formDataStatusMachine.status}
                                    name="status"
                                    options={DATA_STATUS}
                                    transformOptions={(data) =>
                                        data.map((item) => ({
                                            label: item.label,
                                            value: item.value
                                        }))
                                    }
                                    placeholder="Chọn trạng thái"
                                    onChange={handleInputChange}
                                    error={!!errorsStatus}
                                    helperText={errorsStatus}
                                />
                            </Grid>
                            {status === StatusMachine.PAUSED && (
                                <PausedMachine
                                    formData={formDataStatusMachine}
                                    errors={errors}
                                    onInputChange={handleInputChange}
                                />
                            )}
                            {status === StatusMachine.UNDER_MAINTENANCE && (
                                <MaintenanceMachine
                                    formData={formDataStatusMachine}
                                    errors={errors}
                                    onInputChange={handleInputChange}
                                    onSelected={(value: any) => {
                                        setFormDataStatusMachine(prev => ({ ...prev, maintenancePercentage: value }))
                                    }}
                                    onErrors={() => {
                                        setErrors(prev => ({ ...prev, maintenancePercentage: undefined }))
                                    }}
                                />
                            )}
                            {status === StatusMachine.UNDER_REPAIR && (
                                <RepairMachine
                                    formData={formDataStatusMachine}
                                    errors={errors}
                                    onInputChange={handleInputChange}
                                />
                            )}
                            {status === StatusMachine.STOPPED && (
                                <StoppedMachine
                                    formData={formDataStatusMachine}
                                    errors={errors}
                                    onInputChange={handleInputChange}
                                />
                            )}
                        </Grid>
                        <Box m={1.5} display='flex' justifyContent='space-between'>
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
            {isSubmitting && (
                <Backdrop open={isSubmitting}/>
            )}
        </Drawer>
    )
}

export default HandleFaulty;
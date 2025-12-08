import { getMachineById, updateMachineByStatus } from "@/services/machine-service";
import { DataStatusMachinePayload, FormDataStatusMachine, IMachine } from "@/types/machine";
import { Box, Button, Card, Drawer, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { COLORS } from "@/constants/colors";
import ProgressStepper from "./ProgressStepper";
import { v4 as uuidv4 } from "uuid";
import InputSelect from "@/components/InputSelect";
import { StatusMachine } from "@/constants/status";
import MaintenanceMachine from "./status/MaintenanceMachine";
import FaultyMachine from "./status/FaultyMachine";
import RepairMachine from "./status/RepairMachine";
import StoppedMachine from "./status/StoppedMachine";
import PausedMachine from "./status/PausedMachine";
import useNotification from "@/hooks/useNotification";
import Backdrop from "@/components/Backdrop";
import { useValidateMachine } from "./errors";
import DetailMachineBase from "./DetailMachineBase";


interface UpdateMachineProps{
    open: boolean,
    onClose: () => void;
    id: string
}

const DATA_STATUS: { id: string, value: string, label: string }[] = [
    {
        id: uuidv4(),
        value: 'faulty',
        label: 'Máy gặp sự cố'
    },
    {
        id: uuidv4(),
        value: 'paused',
        label: 'Máy đang dừng hoạt động'
    },
    {
        id: uuidv4(),
        value: 'under_maintenance',
        label: 'Máy bảo dưỡng'
    },
    {
        id: uuidv4(),
        value: 'under_repair',
        label: 'Máy sửa chữa'
    },
    {
        id: uuidv4(),
        value: 'stopped',
        label: 'Máy không vận hành'
    }
]

export type FormErrorsMaintenance = {
    [K in keyof FormDataStatusMachine]?: string
}

const UpdateMachine = (props: UpdateMachineProps) => {
    const notify = useNotification();
    const { open, onClose, id } = props;
    const [machine, setMachine] = useState<IMachine | null>(null);
    const [status, setStatus] = useState<string>('');
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
    const [errorsStatus, setErrorsStatus] = useState<string | null>(null);


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
        setErrors({});
        setFormDataStatusMachine({ status: '', maintenanceDate: null, reason: '', completionDate: null, repairedDate: null, startAgainDate: null, maintenancePercentage: null })
        setErrorsStatus(null)
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

    const handleSubmit = async () => {
        if(!validateStatus()){
            return
        };

        const errors = validate();
        if(Object.keys(errors).length > 0) {
            setErrors(errors);
            return
        }

        setIsSubmitting(true)
        const payload: DataStatusMachinePayload = {
            status: formDataStatusMachine.status,
            startAgainDate: formDataStatusMachine.startAgainDate ? formDataStatusMachine.startAgainDate?.toISOString() : null,
            repairedDate: formDataStatusMachine.repairedDate ? formDataStatusMachine.repairedDate?.toISOString() : null,
            maintenanceDate: formDataStatusMachine.maintenanceDate ? formDataStatusMachine.maintenanceDate?.toISOString() : null,
            reason: formDataStatusMachine.reason ? formDataStatusMachine.reason : null,
            maintenancePercentage: formDataStatusMachine.maintenancePercentage ? formDataStatusMachine.maintenancePercentage : null
        }
        
        try {
            const res = machine && await updateMachineByStatus(machine?.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            handleClose()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }finally{
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
                            <ProgressStepper maintenancePercentage={formDataStatusMachine.maintenancePercentage}/>    
                        )}
                        <Box m={1}>
                            <Typography variant="subtitle1">Tình trạng máy hiện tại</Typography>
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
                                {status === StatusMachine.UNDER_MAINTENANCE && (
                                    <MaintenanceMachine
                                        formData={formDataStatusMachine}
                                        errors={errors}
                                        onInputChange={handleInputChange}
                                        onSelected={(value: any) => {
                                            setFormDataStatusMachine(prev => ({ ...prev, maintenancePercentage: value }))
                                        }}
                                        onErrors={() => {
                                            setErrors(prev => ({ ...prev, maintenancePercentage: undefined}))
                                        }}
                                    />
                                )}
                                {status === StatusMachine.FAULTY && (
                                    <FaultyMachine
                                        formData={formDataStatusMachine}
                                        errors={errors}
                                        onInputChange={handleInputChange}
                                    />
                                )}
                                {status === StatusMachine.UNDER_REPAIR && (
                                    <RepairMachine
                                        formData={formDataStatusMachine}
                                        errors={errors}
                                        onInputChange={handleInputChange}
                                    />
                                )}
                                {status === StatusMachine.PAUSED && (
                                    <PausedMachine
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
                        </Box>
                        <Box m={1} display='flex' justifyContent='space-between'>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5, mr: 2 }}
                                onClick={handleSubmit}
                            >
                                Lưu cập nhật
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

export default UpdateMachine;
import { getMachineById, updateMachineCompletionDate } from "@/services/machine-service";
import { IMachine } from "@/types/machine";
import { Box, Button, Card, Drawer, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import DetailMachineBase from "./DetailMachineBase";
import InputText from "@/components/InputText";
import DateTime from "@/utils/DateTime";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { Dayjs } from "dayjs";

interface UpdateRepairDateProps{
    open: boolean,
    onClose: () => void;
    id: string
}

const UpdateRepairDate = (props: UpdateRepairDateProps) => {
    const notify = useNotification();
    const { open, onClose, id } = props;
    const [machine, setMachine] = useState<IMachine | null>(null);
    const [completionDate, setCompletionDate] = useState<Dayjs | null>(null);
    const [completionDateError, setCompletionDateError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


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
        setCompletionDateError(null);
        setCompletionDate(null);
    }

    const handleInputChange = (name: string, value: any) => {
        setCompletionDate(value)
    }

    const validate = (): boolean => {
        if(!completionDate){
            setCompletionDateError("Vui lòng chọn ngày sửa xong");
        }
        return !!completionDate;
    }

    const handleSave = async() => {
        if(!validate()){
            return;
        }
        setIsSubmitting(true);
        try {
            const payload: { status: string, completionDate: string | null } = {
                status: 'operating',
                completionDate: completionDate ? completionDate?.toISOString() : null
            }
            const res = await updateMachineCompletionDate(id, payload);

            notify({
                message: res.message,
                severity: 'success'
            });
            handleClose();
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false);
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
                                <Stack my={1} direction='row'>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Ngày sửa chữa :</Typography>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}}>{DateTime.FormatDate(machine.repairedDate)}</Typography>
                                </Stack>
                                <InputText
                                    label="Ngày sửa xong"
                                    type="date"
                                    name="completionDate"
                                    value={completionDate}
                                    onChange={handleInputChange}
                                    error={!!completionDateError}
                                    helperText={completionDateError}
                                />
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

export default UpdateRepairDate;
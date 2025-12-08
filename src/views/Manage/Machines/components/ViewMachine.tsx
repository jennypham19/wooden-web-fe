import { getMachineById } from "@/services/machine-service";
import { IMachine } from "@/types/machine";
import { Box, Button, Card, Drawer, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { COLORS } from "@/constants/colors";
import DateTime from "@/utils/DateTime";
import ProgressStepper from "./ProgressStepper";
import { StatusMachine } from "@/constants/status";
import DetailMachineBase from "./DetailMachineBase";

interface ViewMachineProps{
    open: boolean,
    onClose: () => void;
    id: string
}

const ViewMachine = (props: ViewMachineProps) => {
    const { open, onClose, id } = props;
    const [machine, setMachine] = useState<IMachine | null>(null);
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

    return(
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
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
                            {machine.status === StatusMachine.FAULTY && (
                                <Grid sx={{ px: 2 }} size={{ xs: 12 }}>
                                    <Stack direction='row'>
                                        <Typography minWidth="50px" fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Lý do:</Typography>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}}>{machine.reason}</Typography>
                                    </Stack>
                                    <Typography my={1} fontSize='13px' color="error">Hiện tại máy này đang được ngừng sử dụng và đội kỹ thuật đang kiểm tra</Typography>
                                </Grid>
                            )}
                            {machine.status === StatusMachine.PAUSED && (
                                <Grid sx={{ px: 2 }} size={{ xs: 12 }}>
                                    <Stack direction='row'>
                                        <Typography minWidth="50px" fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Lý do:</Typography>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}}>{machine.reason}</Typography>
                                    </Stack>
                                    <Stack my={1} direction='row'>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Ngày hoạt động lại :</Typography>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}}>{DateTime.FormatDate(machine.startAgainDate)}</Typography>
                                    </Stack>
                                </Grid>
                            )}
                            {machine.status === StatusMachine.UNDER_MAINTENANCE && (
                                <Grid sx={{ px: 2 }} size={{ xs: 12 }}>
                                    <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Tình trạng bảo dưỡng:</Typography>
                                    <ProgressStepper maintenancePercentage={machine.maintenancePercentage} />
                                    <Stack my={1} direction='row'>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Ngày bảo dưỡng :</Typography>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}}>{DateTime.FormatDate(machine.maintenanceDate)}</Typography>
                                    </Stack>
                                    <Stack direction='row' my={1}>
                                        <Typography minWidth="50px" fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Mô tả:</Typography>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}}>{machine.reason}</Typography>
                                    </Stack>
                                    <Typography my={1} fontSize='13px' color="error">Hiện tại máy này đang trong tình trạng bảo dưỡng không thể sử dụng.</Typography>
                                    {machine.completionDate !== null && (
                                        <Stack my={1} direction='row'>
                                            <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Ngày hoàn thành bảo dưỡng :</Typography>
                                            <Typography fontSize={{ xs: '14px', md: '16px'}}>{DateTime.FormatDate(machine.completionDate)}</Typography>
                                        </Stack>
                                    )}
                                </Grid>
                            )}
                            {machine.status === StatusMachine.UNDER_REPAIR && (
                                <Grid sx={{ px: 2 }} size={{ xs: 12 }}>
                                    <Stack my={1} direction='row'>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Ngày sửa chữa :</Typography>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}}>{DateTime.FormatDate(machine.repairedDate)}</Typography>
                                    </Stack>
                                    <Stack direction='row' my={1}>
                                        <Typography minWidth="50px" fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Mô tả:</Typography>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}}>{machine.reason}</Typography>
                                    </Stack>
                                    {machine.completionDate !== null && (
                                        <Stack my={1} direction='row'>
                                            <Typography fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Ngày hoàn thành sửa chữa :</Typography>
                                            <Typography fontSize={{ xs: '14px', md: '16px'}}>{DateTime.FormatDate(machine.completionDate)}</Typography>
                                        </Stack>
                                    )}
                                </Grid>
                            )}
                            {machine.status === StatusMachine.STOPPED && (
                                <Grid sx={{ px: 2 }} size={{ xs: 12 }}>
                                    <Stack direction='row'>
                                        <Typography minWidth="50px" fontSize={{ xs: '14px', md: '16px'}} fontWeight={600}>Lý do:</Typography>
                                        <Typography fontSize={{ xs: '14px', md: '16px'}}>{machine.reason}</Typography>
                                    </Stack>
                                </Grid>
                            )}
                        </Grid>
                        <Box mt={1}>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5 }}
                                onClick={onClose}
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

export default ViewMachine;
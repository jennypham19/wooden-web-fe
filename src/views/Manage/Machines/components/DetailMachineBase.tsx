import { IMachine } from "@/types/machine";
import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { getStatusMachineColor, getStatusMachineLabel } from "@/utils/labelEntoVni";
import CommonImage from "@/components/Image/index";
import DateTime from "@/utils/DateTime";

interface DetailMachineBaseProps{
    machine: IMachine;
}

const DetailMachineBase: React.FC<DetailMachineBaseProps> = ({ machine }) => {
    return(
        <>
            <Grid sx={{ display: 'flex', justifyContent: 'center'}} size={{ xs: 12, md: 4 }}>
                <Box display='flex' flexDirection='column' p={2}>
                    <Chip
                        label={getStatusMachineLabel(machine.status)}
                        color={getStatusMachineColor(machine.status).color}
                        sx={{ mb: 2 }}
                    />
                    <CommonImage
                        src={machine.imageUrl}
                        alt={machine.nameUrl}
                        sx={{ height: 200 }}
                    />
                </Box>
            </Grid>
            <Grid sx={{ display: 'flex', alignItems: 'center'}} size={{ xs: 12, md: 8 }}>
                <Box margin='auto 0' mx={1}>
                    <Typography fontWeight={500}>{machine.name.toLocaleUpperCase()}</Typography>
                    <Box my={2} display='flex' justifyContent='space-between'>
                        <Stack direction='column' pr={2.5} sx={{ borderRight: '1px solid #979595ff'}}>
                            <Typography fontSize={{ xs: '14px', md: '16px'}}>Mã máy: {machine.code}</Typography>
                            <Typography fontSize={{ xs: '14px', md: '16px'}}>Trọng lượng: {machine.weight}</Typography>
                            <Typography fontSize={{ xs: '14px', md: '16px'}}>Kích thước: {machine.dimensions}</Typography>
                            <Typography fontSize={{ xs: '14px', md: '16px'}}>Công suất: {machine.power}</Typography>
                        </Stack>
                        <Stack direction='column' pl={2}>
                            <Typography fontSize={{ xs: '14px', md: '16px'}}>Thương hiệu: {machine.brand}</Typography>
                            <Typography fontSize={{ xs: '14px', md: '16px'}}>Ngày hết hạn bảo hành: {DateTime.FormatDate(machine.warrantyExpirationDate)}</Typography>
                        </Stack>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default DetailMachineBase;
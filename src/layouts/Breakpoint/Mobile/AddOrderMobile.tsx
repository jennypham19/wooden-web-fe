import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { IUser } from "@/types/user";
import { CloudUpload, EditNote, Info, Inventory, Person, SpeakerNotes } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs from "dayjs";

interface AddOrderMobileProps{
    profile: IUser | null
}

const AddOrderMobile = (props: AddOrderMobileProps) => {
    const { profile } = props;

    const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {

    }
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <Person sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>1. Thông tin khách hàng</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <Info sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>2. Thông tin chung</Typography>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Mã đơn hàng</Typography>
                            <InputText
                                label=""
                                name=""
                                value={''}
                                onChange={() => {}}
                                type="text"
                                sx={{ mt: 0.5 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Tên đơn hàng</Typography>
                            <InputText
                                label=""
                                name=""
                                value={''}
                                onChange={() => {}}
                                type="text"
                                sx={{ mt: 0.5 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Nhân viên tạo</Typography>
                            <InputText
                                label=""
                                name=""
                                value={''}
                                onChange={() => {}}
                                type="text"
                                sx={{ mt: 0.5 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Ngày tạo đơn</Typography>
                            <InputText
                                label=""
                                name=""
                                value={dayjs()}
                                onChange={() => {}}
                                type="date"
                                sx={{ mt: 0.5 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Ngày giao dự kiến</Typography>
                            <InputText
                                label=""
                                name=""
                                value={''}
                                onChange={() => {}}
                                type="text"
                                sx={{ mt: 0.5 }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <Inventory sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>3. Danh sách sản phẩm kèm theo</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <SpeakerNotes sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>4. Yêu cầu của khách</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <CloudUpload sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>5. Tài liệu đính kèm</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <EditNote sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>6. Ghi chú nội bộ</Typography>
                    </Box>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}></Grid>
        </Grid>
    )
}

export default AddOrderMobile;
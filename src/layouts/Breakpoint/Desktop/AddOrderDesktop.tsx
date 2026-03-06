import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { FormDataOrders } from "@/types/order";
import { IUser } from "@/types/user";
import FilesUpload from "@/views/Manage/components/FilesUpload";
import NewCustomer from "@/views/Manage/Orders/components/typeCustomer/NewCustomer";
import OldCustomer from "@/views/Manage/Orders/components/typeCustomer/OldCustomer";
import { AttachFile, CloudUpload, EditNote, Info, Inventory, Person, SpeakerNotes } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, FormGroup, Paper, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs from "dayjs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"

interface AddOrderDesktopProps{
    profile: IUser | null,
    formData: FormDataOrders,
    onChangeInput: (name: string, value: any) =>  void;
}

const DATA_CUSTOMER: {id: string, label: string, value: string}[] = [
    {
        id: uuidv4(),
        label: 'Khách cũ',
        value: 'old'
    },
    {
        id: uuidv4(),
        label: 'Khách mới',
        value: 'new'
    },
]

const AddOrderDesktop = (props: AddOrderDesktopProps) => {
    const { profile, formData, onChangeInput } = props;
    const [checked, setChecked] = useState<string | null>(null);
    
    const handleCheck = (value: string) => () => {
        setChecked(value)
    }

    const handleChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        //Cho phép xóa trắng
        if(val.trim() === ''){
          onChangeInput('amount', val);
          return;
        }

        // Chỉ cho phép nhập số
        // const regex = /^\d+$/;

        // Chỉ cho phép nhập số nguyên dương
        const regex = /^[1-9]\d*$/;
        console.log("regex.test(val): ", regex.test(val));
        
        if(regex.test(val)){
            onChangeInput('amount',val);
        }
    }
    return(
        <Grid container spacing={2}>
            {/* Thông tin khách hàng, Danh sách sản phẩm, Yêu cầu khách, Ghi chú nội bộ */}
            <Grid size={{ md: 8 }}>
                {/* ----------- Thông tin khách hàng -------------- */}
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <Person sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>1. Thông tin khách hàng</Typography>
                    </Box>
                    <Stack mb={2} gap={2} direction='row'>
                        <Typography variant="subtitle2">Chọn khách hàng</Typography>
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            {DATA_CUSTOMER.map((data, index) => (
                                <FormControlLabel
                                    key={index}
                                    label={data.label}
                                    sx={{
                                        '.MuiFormControlLabel-label': { fontSize: '15px', ml: 1 }
                                    }}
                                    control={
                                        <Checkbox
                                            checked={checked === data.value}
                                            onChange={handleCheck(data.value)}
                                            sx={{
                                                color: "#000",
                                                "&.Mui-checked": {
                                                    color: "#000",
                                                },
                                            }}
                                        />
                                    }
                                />                                
                            ))}
                        </FormGroup>
                    </Stack>
                    {checked === 'old' && (<OldCustomer/>)}
                    {checked === 'new' && (<NewCustomer/>)}
                </Paper>

                {/* ----------- Danh sách sản phẩm kèm theo -------------- */}
                <Paper sx={{ p: 2, my: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box display='flex' flexDirection='row' gap={1.5}>
                            <Inventory sx={{ color: COLORS.BUTTON }}/>
                            <Typography fontWeight={500}>3. Danh sách sản phẩm kèm theo</Typography>
                        </Box>
                        <Box display='flex' flexDirection='row' gap={1.5} alignItems="baseline">
                            <Typography variant="subtitle2">Số lượng: </Typography>
                            <TextField
                                name="amount"
                                value={formData.amount}
                                onChange={handleChangeNumber}
                                sx={{
                                    width: 40
                                }}
                                type="text"
                                variant="standard"
                                InputProps={{ 
                                    disableUnderline: false,
                                    inputMode: 'numeric',
                                     
                                }}
                            />
                            <Typography variant="subtitle2">sản phẩm </Typography>
                        </Box>
                    </Box>
                </Paper>

                {/* ----------- Yêu cầu của khách, ghi chú nội bộ -------------- */}
                <Grid container spacing={1}>
                    <Grid size={{ md: 6 }}>
                        <Paper sx={{ p: 2 }}>
                            <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                                <SpeakerNotes sx={{ color: COLORS.BUTTON }}/>
                                <Typography fontWeight={500}>4. Yêu cầu của khách</Typography>
                            </Box>
                            <InputText
                                label=""
                                name=""
                                value={''}
                                type="text"
                                multiline
                                rows={6}
                                onChange={() => {}}
                                placeholder="Nhập các yêu cầu cụ thể từ khách hàng..."
                            />
                        </Paper>
                    </Grid>
                    <Grid size={{ md: 6 }}>
                        <Paper sx={{ p: 2 }}>
                            <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                                <EditNote sx={{ color: COLORS.BUTTON }}/>
                                <Typography fontWeight={500}>7. Ghi chú nội bộ</Typography>
                            </Box>
                            <InputText
                                label=""
                                name=""
                                value={''}
                                type="text"
                                multiline
                                rows={6}
                                onChange={() => {}}
                                placeholder="Thông tin chỉ dành cho nội bộ xem..."
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            {/* Thông tin chung, Tài liệu đính kèm, Tài liệu tham khảo */}
            <Grid size={{ md: 4 }}>
                {/* ----------- Thông tin chung -------------- */}
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <Info sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>2. Thông tin chung</Typography>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid size={{ md: 12 }}>
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
                        <Grid size={{ md: 12 }}>
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
                        <Grid size={{ md: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Nhân viên tạo</Typography>
                            <InputText
                                label=""
                                name=""
                                value={profile?.fullName}
                                onChange={() => {}}
                                type="text"
                                sx={{ mt: 0.5 }}
                                disabled
                            />
                        </Grid>
                        <Grid size={{ md: 12 }}>
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
                        <Grid size={{ md: 12 }}>
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

                {/* ----------- Tài liệu đính kèm -------------- */}
                <Paper sx={{ p: 2, my: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <CloudUpload sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>5. Tài liệu đính kèm</Typography>
                    </Box>
                    <FilesUpload
                        onFilesSelect={() => {}}
                        height={200}
                    />
                </Paper>

                {/* ----------- Tài liệu tham khảo -------------- */}
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <AttachFile sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>6. Tài liệu tham khảo</Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AddOrderDesktop;
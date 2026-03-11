import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { ICustomer, ICustomerInFuni } from "@/types/customer";
import { FormDataInputOrders } from "@/types/order";
import { FormDataProducts } from "@/types/product";
import { IUser } from "@/types/user";
import { FormErrors, FormProductErrors } from "@/views/Manage/Orders/components/AddOrder";
import ProductOrder from "@/views/Manage/Orders/components/ProductOrder";
import FuniCustomer from "@/views/Manage/Orders/components/typeCustomer/FuniCustomer";
import NewCustomer from "@/views/Manage/Orders/components/typeCustomer/NewCustomer";
import OldCustomer from "@/views/Manage/Orders/components/typeCustomer/OldCustomer";
import UploadFiles from "@/views/Manage/Orders/components/UploadFiles";
import { Add, AttachFile, Close, CloudUpload, EditNote, Info, Inventory, Link, Person, SpeakerNotes } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs from "dayjs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"

interface AddOrderDesktopProps{
    profile: IUser | null,
    onClose: () => void;
    users: IUser[]
}

const DATA_CUSTOMER: {id: string, label: string, value: string}[] = [
    {
        id: uuidv4(),
        label: 'Khách mới',
        value: 'new'
    },    
    {
        id: uuidv4(),
        label: 'Khách cũ',
        value: 'old'
    },
    {
        id: uuidv4(),
        label: 'Khách (Funi)',
        value: 'cus-funi'
    }
]

const AddOrderDesktop = (props: AddOrderDesktopProps) => {
    const { profile, onClose, users } = props;
    const [checked, setChecked] = useState<string | null>(null);
    const [infoCustomer, setInfoCustomer] = useState<ICustomerInFuni | null>(null)
    const [ formData, setFormData ] = useState<FormDataInputOrders>({
        name: '', dateOfReceipt: dayjs(), dateOfPayment: null, proccess: 'not_started_0%', status: 'pending', amount: null, requiredNote: '', products: [], internalNote: ''})
    const [errors, setErrors] = useState<FormErrors>({});
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [amountProduct, setAmountProduct] = useState<number | null>(null);
    const [products, setProducts] = useState<number[]>([]);
    const [formDataProduct, setFormDataProduct] = useState<FormDataProducts[]>([])
    const [productErrors, setProductErrors] = useState<FormProductErrors[]>([])
    const [referenceLinkSlots, setReferenceLinkSlots] = useState<(string)[]>([]);
    const [link, setLink] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleClose = () => {
        onClose();
        setErrors({});
        setReferenceLinkSlots([]);
        setFormData({ name: '', dateOfReceipt: dayjs(), dateOfPayment: null, proccess: 'not_started_0%', status: 'pending', amount: null, requiredNote: '', products: [], internalNote: '' })
        setLink('')
    }
    const handleCheck = (value: string) => () => {
        setChecked(value)
    }

    const handleChangeInput = (name: string, value: any) => {
        const validName = name as keyof FormDataInputOrders;
        if(validName === 'amount') {
            const valueNum = Number(value);
            if(!isNaN(valueNum) && valueNum > 0){
                setAmountProduct(valueNum);
                setProducts(Array.from({ length: valueNum }, (_, i) => i + 1))
                setFormDataProduct(
                    Array.from({ length: valueNum }, () => ({
                        name: "",
                        description: "",
                        target: "",
                        proccess: "not_started_0%",
                        status: "pending",
                        managerId: "",
                        lenghtProduct: null,
                        widthProduct: null,
                        heightProduct: null
                    }))
                )
            }else{
                setAmountProduct(null);
                setProducts([])
            }
        }
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }

    }

    const handleInputChangeProduct = (index: number, name: string, value: any) => {
        setFormDataProduct((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            return updated;
        })
        // Xóa lỗi tại ô đang nhập
        setProductErrors((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: undefined };
            return updated;
        });
    }

    const handleFilesSelect = (files: File[]) => {
        setFiles(files)
    }

    const handleChangeInfoFuniCus = (value: ICustomerInFuni | null) => {
        setInfoCustomer(value)
    }

    // Link tài liệu tham khảo
    const handleAddReferenceLinkSlot = () => {
        if(!link.trim()) return;
        setReferenceLinkSlots(prev => [...prev, link]);
        setLink("")
    }

    const handleRemoveReferenceLinkSlot = (indexToRemove: number) => {
        setReferenceLinkSlots(prev => prev.filter((_, index) => index !== indexToRemove))
    }

    const handleReferenceLinkSlotChange = (newValue: string) => {
        setLink(newValue)
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
                    {checked === 'cus-funi' && (<FuniCustomer onChange={handleChangeInfoFuniCus} infoCustomer={infoCustomer}/>)}
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
                            <InputText
                                label=""
                                name="amount"
                                value={formData.amount}
                                sx={{ width: 40 }}
                                type="text"
                                onlyPositiveNumber={true}
                                onChange={handleChangeInput}
                                placeholder="" 
                                from="order-desktop" 
                                variant="standard"                          />
                            <Typography variant="subtitle2">sản phẩm </Typography>
                        </Box>
                    </Box>
                    {amountProduct !== null && products.length > 0 && (
                        <Box mt={3}>
                            <Typography fontWeight={600} mb={1} fontSize='15px'> Danh sách sản phẩm kèm theo</Typography>
                            {formDataProduct.map((num, idx) => (
                                <ProductOrder onInputChange={handleInputChangeProduct} errors={productErrors[idx] || {}} formData={num} key={idx} index={idx + 1} users={users}/>
                            ))}
                        </Box>
                    )}
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
                                name="requiredNote"
                                value={checked === 'cus-funi' ? infoCustomer?.requiredNote : formData.requiredNote}
                                type="text"
                                multiline
                                rows={6}
                                onChange={handleChangeInput}
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
                                name="internalNote"
                                value={formData.internalNote}
                                type="text"
                                multiline
                                rows={6}
                                onChange={handleChangeInput}
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
                            <Typography fontSize='15px' fontWeight={500}>Tên đơn hàng</Typography>
                            <InputText
                                label=""
                                name="name"
                                value={formData.name}
                                onChange={handleChangeInput}
                                type="text"
                                sx={{ mt: 0.5 }}
                            />
                        </Grid>
                        <Grid size={{ md: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Nhân viên tạo</Typography>
                            <InputText
                                label=""
                                name="fullName"
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
                                name="dateOfReceipt"
                                value={dayjs()}
                                onChange={handleChangeInput}
                                type="date"
                                mt={0.5}
                                required
                            />
                        </Grid>
                        <Grid size={{ md: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Ngày giao dự kiến</Typography>
                            <InputText
                                label=""
                                name="dateOfPayment"
                                value={formData.dateOfPayment}
                                onChange={handleChangeInput}
                                type="date"
                                mt={0.5}
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
                    <UploadFiles
                        onFilesSelect={handleFilesSelect}
                        height={200}
                    />
                </Paper>

                {/* ----------- Tài liệu tham khảo -------------- */}
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <AttachFile sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>6. Tài liệu tham khảo</Typography>
                    </Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <TextField
                            label=''
                            name="url"
                            type="text"
                            value={link}
                            onChange={(newValue: any) => handleReferenceLinkSlotChange(newValue.target.value)}
                            placeholder="Nhập link tài liệu tham khảo..."
                            InputProps={{
                                sx: {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: '1px solid rgb(53, 50, 50)',
                                        borderRadius: '8px'
                                    },
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        border: '1px solid rgb(53, 50, 50)'
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        border: '1px solid rgb(53, 50, 50)'
                                    },
                                    color: '#000'
                                }
                            }}
                        />
                        <IconButton
                            onClick={handleAddReferenceLinkSlot}
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                        >
                            <Add sx={{ color: COLORS.BUTTON }}/>
                        </IconButton>  
                    </Stack>
                    <Box mt={2}>
                        {referenceLinkSlots.map((link, index) => (
                            <Box key={index} display='flex' justifyContent='space-between'>
                                <Stack py={0.5} direction='row'>
                                    <Link/>
                                    <Typography
                                        sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all'}} 
                                        fontStyle='italic' 
                                        variant="subtitle2"
                                    >
                                        {link}
                                    </Typography>
                                </Stack>
                                <IconButton
                                    onClick={() => handleRemoveReferenceLinkSlot(index)}
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.7)',
                                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
                                    }}
                                >
                                    <Close/>
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Grid>
            <Grid size={{ md: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    onClick={() => {}}
                    sx={{ bgcolor: COLORS.BUTTON, width: 120 }}
                >
                    Lưu
                </Button>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 120 }}
                >
                    Hủy
                </Button>
            </Grid>
        </Grid>
    )
}

export default AddOrderDesktop;
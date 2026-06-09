import Backdrop from "@/components/Backdrop";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { createOrder } from "@/services/order-service";
import { uploadFiles } from "@/services/upload-service";
import { ICustomer, ICustomerInFuni, ICustomerInput } from "@/types/customer";
import { FormInfoNewCustomerErrors } from "@/types/error";
import { FormDataInputFiles, FormDataInputOrders, FormDataReferenceLinks, OrderPayload } from "@/types/order";
import { FormDataProducts } from "@/types/product";
import { IUser } from "@/types/user";
import { FormErrors, FormProductErrors } from "@/views/Manage/Orders/components/AddOrder";
import ProductOrder from "@/views/Manage/Orders/components/ProductOrder";
import NewCustomer from "@/views/Manage/Orders/components/typeCustomer/NewCustomer";
import OldCustomer from "@/views/Manage/Orders/components/typeCustomer/OldCustomer";
import UploadFiles from "@/views/Manage/Orders/components/UploadFiles";
import { Add, AttachFile, Close, CloudUpload, EditNote, Info, Inventory, Link, Person, SpeakerNotes } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import dayjs from "dayjs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"

interface AddOrderMobileProps{
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
    // {
    //     id: uuidv4(),
    //     label: 'Khách (Funi)',
    //     value: 'cus-funi'
    // }
]

const AddOrderMobile = (props: AddOrderMobileProps) => {
    const { profile, onClose, users } = props;
    const notify = useNotification();
    const [checked, setChecked] = useState<string | null>(null);
    const [infoCustomer, setInfoCustomer] = useState<ICustomerInFuni | null>(null)
    const [ formData, setFormData ] = useState<FormDataInputOrders>({
        name: '', dateOfReceipt: dayjs(), dateOfPayment: null, proccess: 'not_started_0%', status: 'pending', amount: null, requiredNote: '', internalNote: '', managerId: null})
    const [errors, setErrors] = useState<FormErrors>({});
    const [amountProduct, setAmountProduct] = useState<number | null>(null);
    const [products, setProducts] = useState<number[]>([]);
    const [formDataProduct, setFormDataProduct] = useState<FormDataProducts[]>([])
    const [productErrors, setProductErrors] = useState<FormProductErrors[]>([])
    const [infoNewCusErrors, setInfoNewCusErrors] = useState<FormInfoNewCustomerErrors>({});
    const [referenceLinkSlots, setReferenceLinkSlots] = useState<(string)[]>([]);
    const [link, setLink] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<{checked: string, files: string}>({checked: '' , files: ''})
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Khách mới
    const [inforNewCustomer, setInforNewCustomer] = useState<ICustomerInput>({ name: '', phone: '', type: '', address: '' });

    // Khách cũ
    const [inforOldCustomer, setInforOldCustomer] = useState<ICustomer | null>(null);

    const handleClose = () => {
        onClose();
        setErrors({});
        setReferenceLinkSlots([]);
        setFormData({ name: '', dateOfReceipt: dayjs(), dateOfPayment: null, proccess: 'not_started_0%', status: 'pending', amount: null, requiredNote: null, internalNote: '', managerId: null })
        setLink('')
    }

    const handleCheck = (value: string) => () => {
        setChecked(value);
        setErrors({})
        setProductErrors([])
        setAmountProduct(null)
        setFormData({ name: '', dateOfReceipt: dayjs(), dateOfPayment: null, proccess: 'not_started_0%', status: 'pending', amount: null, requiredNote: null, internalNote: '', managerId: null })
        setInfoCustomer(null)
        setError({ checked: '', files: '' })
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
                        description: null,
                        target: null,
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

    // Khách hàng mới
    const handleCheckInfoNewCus = (value: string) => {
        setInforNewCustomer(prev => ({ ...prev, type: value }));
    }

    const handleChangeInfoNewCus = (name: string, value: any) => {
        setInforNewCustomer(prev => ({ ...prev, [name]: value }))
        // Xóa lỗi khi người dùng bắt đầu nhập
        if(infoNewCusErrors[name as keyof typeof infoNewCusErrors]){
            setInfoNewCusErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    // Khách hàng cũ
    const handleChangeInfoOldCus = (value: ICustomer | null) => {
        setInforOldCustomer(value)
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

    const validateInfoNewCustomer = (): boolean => {
        // bắt lỗi form thông tin khách hàng
        const newErrorsInfoNewCustomer: FormInfoNewCustomerErrors = {};
        if(!inforNewCustomer.name) newErrorsInfoNewCustomer.name = "Vui lòng nhập tên khách hàng";
        if(!inforNewCustomer.phone) newErrorsInfoNewCustomer.phone = "Vui lòng nhập số điện thoại";
        if(!inforNewCustomer.type) newErrorsInfoNewCustomer.type = "Vui lòng chọn loại địa chỉ";
        if(!inforNewCustomer.address) newErrorsInfoNewCustomer.address = "Vui lòng nhập địa chỉ";
        setInfoNewCusErrors(newErrorsInfoNewCustomer); 
        return Object.keys(newErrorsInfoNewCustomer).length === 0;
    }

    const validateForm = (): boolean => {
        // bắt lỗi form chung của đơn hàng
        const newErrors: FormErrors = {};
        if(!formData.name) newErrors.name = "Vui lòng nhập tên đơn hàng";
        if(!formData.dateOfPayment) newErrors.dateOfPayment = "Vui lòng chọn ngày giao dự kiến";
        if(!formData.amount) newErrors.amount = "Vui lòng nhập số lượng";
        if(!formData.managerId) newErrors.managerId = "Vui lòng chọn người quản lý";

        const newProductErrors: FormProductErrors[] = [];
        formDataProduct.forEach((product, idx) => {
            const pError: FormProductErrors = {};
            if (!product.name) pError.name = `Sản phẩm ${idx + 1}: Vui lòng nhập tên sản phẩm`;
            // if (!product.description) pError.description = `Sản phẩm ${idx + 1}: Vui lòng nhập mô tả`;
            // if (!product.lenghtProduct) pError.lenghtProduct = `Sản phẩm ${idx + 1}: Vui lòng nhập chiều dài`;
            // if (!product.widthProduct) pError.widthProduct = `Sản phẩm ${idx + 1}: Vui lòng nhập chiều rộng`;
            // if (!product.heightProduct) pError.heightProduct = `Sản phẩm ${idx + 1}: Vui lòng nhập chiều cao`;
            // if (!product.target) pError.target = `Sản phẩm ${idx + 1}: Vui lòng nhập mục tiêu sản xuất`;
            newProductErrors.push(pError); 
        })

        const newError: { checked: string, files: string } = { checked: '', files: ''}
        if(checked === null){
            newError.checked = "Vui lòng chọn khách hàng"
        }

        if(files.length === 0){
            newError.files = "Vui lòng tải tài liệu đính kèm"
        }

        setError(newError)

        const hasProductError = newProductErrors.some((e) => Object.keys(e).length > 0);
        setErrors(newErrors);
        setProductErrors(newProductErrors)
        return Object.keys(newErrors).length === 0 && !hasProductError && checked !== null && files.length > 0;    
    }

    const handleSave = async() => {
        if(checked === 'new' && !validateInfoNewCustomer()){
            return;
        }
        if(!validateForm()){
            return;
        }

        setIsSubmitting(true);
        const payloadReferenceLink: FormDataReferenceLinks[] = referenceLinkSlots.map((slot) => ({
            url: slot
        }));

        let uploadFilesResponses: any;
        try {
            uploadFilesResponses = files && await uploadFiles(files, 'order');
            if(!uploadFilesResponses.success || !uploadFilesResponses.data?.files){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }            
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
            setIsSubmitting(false)
        }

        const payloadInputFiles: FormDataInputFiles[] =  uploadFilesResponses.data.files.map((file: any) => ({
            name: file.originalname,
            url: file.url
        }))

        try {
            const payload: OrderPayload = {
                typeCustomer: checked,
                customer: checked === 'new' ? inforNewCustomer : inforOldCustomer,
                name: formData.name,
                dateOfReceipt: formData.dateOfReceipt ? formData.dateOfReceipt?.toISOString() : '',
                dateOfPayment: formData.dateOfPayment ? formData.dateOfPayment.toISOString() : '',
                managerId: formData.managerId,
                proccess: formData.proccess,
                status: formData.status,
                amount: Number(formData.amount),
                requiredNote: formData.requiredNote ? formData.requiredNote : null,
                products: formDataProduct.map((product) => ({
                    name: product.name,
                    description: product.description ? product.description : null,
                    target: product.target ? product.target : null,
                    proccess: product.proccess,
                    status: product.status,
                    lenghtProduct: Number(product.lenghtProduct) ?? null,
                    widthProduct: Number(product.widthProduct) ?? null,
                    heightProduct: Number(product.heightProduct) ?? null
                })), 
                inputFiles: files.length > 0 ? payloadInputFiles : [],
                referenceLinks: referenceLinkSlots[0] === null ? [] : payloadReferenceLink,
                createdBy: profile ? profile.id : null,
                internalNote: formData.internalNote ? formData.internalNote : null
            }
            const res = await createOrder(payload);
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
            setIsSubmitting(false);
        }
    }
    return(
        <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <Person sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>1. Thông tin khách hàng</Typography>
                    </Box>
                    <Stack mb={2} direction='column'>
                        <Stack>
                            <Typography variant="subtitle2">Chọn khách hàng</Typography>
                            <Typography variant="subtitle2" color="error">(*)</Typography>
                        </Stack>
                        <FormGroup sx={{ pl: 1, display: 'flex', flexDirection: 'row', gap: 5 }}>
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
                    {error.checked && (
                        <Typography variant="caption" color="error">{error.checked}</Typography>
                    )}
                    {checked === 'old' && (<OldCustomer inforOldCustomer={inforOldCustomer} onHandleChangeInfoOldCus={handleChangeInfoOldCus}/>)}
                    {/* {checked === 'cus-funi' && (<FuniCustomer onChange={handleChangeInfoFuniCus} infoCustomer={infoCustomer}/>)} */}
                    {checked === 'new' && (<NewCustomer infoNewCusErrors={infoNewCusErrors} onHandleChangeInfoNewCus={handleChangeInfoNewCus} onCheck={handleCheckInfoNewCus} inforNewCustomer={inforNewCustomer}/>)}
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
                            <Stack>
                                <Typography fontSize='15px' fontWeight={500}>Tên đơn hàng</Typography>
                                <Typography fontSize='15px' fontWeight={500} color="error">(*)</Typography>
                            </Stack>
                            <InputText
                                label=""
                                name="name"
                                value={formData.name}
                                onChange={handleChangeInput}
                                type="text"
                                sx={{ mt: 0.5 }}
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
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
                        <Grid size={{ xs: 12 }}>
                            <Stack>
                            <Typography fontWeight={700} fontSize='15px'>Người quản lý</Typography>
                            <Typography fontWeight={700} fontSize='15px' color="error">(*)</Typography>
                            </Stack>
                            <InputSelect
                                label=""
                                name="managerId"
                                value={formData.managerId}
                                onChange={handleChangeInput}
                                options={users}
                                transformOptions={data =>
                                    data.map((item) => ({
                                        value: item.id,
                                        label: item.fullName
                                    }))
                                }
                                placeholder="Chọn người quản lý"
                                error={!!errors.managerId}
                                helperText={errors.managerId}
                                margin='dense'
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Typography fontSize='15px' fontWeight={500}>Ngày tạo đơn</Typography>
                            <InputText
                                label=""
                                name="dateOfReceipt"
                                value={dayjs()}
                                onChange={handleChangeInput}
                                type="date"
                                mt={0.5}
                                disabled
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Stack>
                            <Typography fontSize='15px' fontWeight={500}>Ngày giao dự kiến</Typography>
                            <Typography fontSize='15px' fontWeight={500} color="error">(*)</Typography>
                            </Stack>
                            <InputText
                                label=""
                                name="dateOfPayment"
                                value={formData.dateOfPayment}
                                onChange={handleChangeInput}
                                type="date"
                                mt={0.5}
                                error={!!errors.dateOfPayment}
                                helperText={errors.dateOfPayment}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='column'>
                        <Box mb={1} display='flex' flexDirection='row' gap={1.5}>
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
                                variant="standard"
                                error={!!errors.amount}
                                helperText={errors.amount}
                            />
                            <Typography variant="subtitle2">sản phẩm </Typography>
                            <Typography variant="subtitle2" color="error">(*)</Typography>
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
            </Grid>

            {/* ----------- Tài liệu đính kèm -------------- */}
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <CloudUpload sx={{ color: COLORS.BUTTON }}/>
                        <Stack>
                            <Typography fontWeight={500}>4. Tài liệu đính kèm</Typography>
                            <Typography fontWeight={500} color="error">(*)</Typography>
                        </Stack>
                    </Box>
                    <UploadFiles
                        onFilesSelect={handleFilesSelect}
                        height={200}
                        error={error.files}
                    />
                </Paper>
            </Grid>

            {/* ----------- Tài liệu tham khảo -------------- */}
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <AttachFile sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>5. Tài liệu tham khảo</Typography>
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

            {/* ----------- Yêu cầu của khách -------------- */}
            <Grid size={{ xs: 12 }}>
                <Paper sx={{ p: 2 }}>
                    <Box mb={2} display='flex' flexDirection='row' gap={1.5}>
                        <SpeakerNotes sx={{ color: COLORS.BUTTON }}/>
                        <Typography fontWeight={500}>6. Yêu cầu của khách</Typography>
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
                        error={checked === 'cus-funi' ? false : !!errors.requiredNote}
                        helperText={checked === 'cus-funi' ? '' : errors.requiredNote}
                    />
                </Paper>
            </Grid>

            {/* ----------- Ghi chú nội bộ -------------- */}
            <Grid size={{ xs: 12 }}>
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

            {/* ----------- Hàm lưu và đóng -------------- */}
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                    onClick={handleSave}
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

            {isSubmitting && (
                <Backdrop open={isSubmitting} />
            )}
        </Grid>
    )
}

export default AddOrderMobile;
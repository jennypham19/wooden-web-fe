import { Avatar, Box, Button, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import Grid from "@mui/material/Grid2";
import { ChangeEvent, useRef, useState } from "react";
import { resizeImage } from "@/utils/common";
import { PhotoCamera } from "@mui/icons-material";
import { getRoleCode, getRoleDepartment } from "@/utils/labelEntoVni";
import InputText from "@/components/InputText";
import dayjs, { Dayjs } from "dayjs";
import InputSelect from "@/components/InputSelect";
import { GENDER, ROLE_DATA, WORK_DATA } from "@/constants/data";
import useNotification from "@/hooks/useNotification";
import InputMaskTextField from "@/components/InputMaskTextField";
import { COLORS } from "@/constants/colors";
import { uploadImage } from "@/services/upload-service";
import Backdrop from "@/components/Backdrop";
import { createAccount } from "@/services/user-service";

interface CreateAccountProps {
    onClose: () => void;
}

export interface FormDataUser{
    fullName: string,
    dob: Dayjs | null,
    role: string,
    email: string,
    password: string,
    gender: string,
    phone: string,
    work: string[],
    address: string,
    department: string,
}

type FormErrors = {
    [K in keyof FormDataUser]?: string
}

const CreateAccount = ( props: CreateAccountProps ) => {
    const { onClose } = props;
    const notify = useNotification();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [errorImage, setErrorImage] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormDataUser>({
        fullName: '', dob: null, role: '', email: '', password: '', gender: '', phone: '', work: [], address: '', department: ''
    })
    const [first, setFirst] = useState('');
    const [code, setCode] = useState('');

    const reset = () => {
        setImageFile(null);
        setAvatarPreview(null);
        setErrorImage(null);
        setErrorCode(null);
        setErrors({});
        setFormData({ fullName: '', dob: null, role: '', email: '', password: '', gender: '', phone: '', work: [], address: '', department: '' });
        setCode('');
        setFirst('')
    }

    const handleClose = () => {
        onClose();
        reset()
    }

    const handleChangeAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(file && file.type.startsWith('image/')) {
            const { blob, previewUrl } = await resizeImage(file, 800);
            const newFile = new File([blob], file.name, { type: "image/jpeg" });
            setImageFile(newFile);
            setAvatarPreview(previewUrl);
            setErrorImage(null)
        }else{
            setAvatarPreview(null);
            event.target.value = "";
        }
        //Reset lại input để onChange được gọi nếu chọn lại cùng 1 ảnh
        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

    let finalDisplayAvatarSrc: string | undefined = undefined;
    if(avatarPreview) finalDisplayAvatarSrc = avatarPreview; 

    const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
    const handleInputChange = (name: string, value: any) => {
        const validName = name as keyof FormDataUser;
        setFormData(prev => ({ ...prev, [name]: value}));

        if(validName === 'email' && typeof value === 'string'){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // chuẩn email đơn giản
            if(!emailRegex.test(value)){
                setErrors(prev => ({...prev, email: 'Email không hợp lệ'}));
                return
            }
        }
        if(validName === 'role' && typeof value === 'string'){
            const department = getRoleDepartment(value);
            setFormData(prev => ({ ...prev, department: department}));
            const first = getRoleCode(value);
            setFirst(first);
            setCode('');
            setErrors(prev => ({ ...prev, department: undefined, work: undefined }))
        }
        if(validName === 'phone' && typeof value === 'string'){
            const phone = value.replace(/\s|-/g, '');
            if(!/^\d+$/.test(phone)){
                setErrors(prev => ({...prev, phone: 'Số điện thoại chỉ chứa số'}));
                return
            }

            if(phone.startsWith('0') && phone.length !== 10){
                setErrors(prev => ({...prev, phone: 'Số điện thoại phải có 10 chữ số (nếu bắt đầu bằng 0)'}));
                return
            }

            if(phone.startsWith('+84') && (phone.length < 11 || phone.length > 12)){
                setErrors(prev => ({...prev, phone: 'Số điện thoại phải có 11-12 chữ số (nếu bắt đầu bằng +84)'}));
                return
            }

            if(!phoneRegex.test(phone)){
                setErrors(prev => ({...prev, phone: 'Số điện thoại không đúng định dạng (bắt đầu từ +84|03|05|07|08|09)'}))
            }
        }

        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }


    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.fullName) newErrors.fullName = 'Vui lòng nhập họ tên';
        if(!formData.dob) newErrors.dob = 'Vui lòng nhập ngày sinh';
        if(!formData.role) newErrors.role = 'Vui lòng nhập chức vụ';
        if(!formData.email) newErrors.email = 'Vui lòng nhập email';
        if(!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu';
        if(!formData.gender) newErrors.gender = 'Vui lòng chọn giới tính';
        if(!formData.phone) newErrors.phone = 'Vui lòng nhập số điện thoại';
        if(formData.work.length === 0) newErrors.work = 'Vui lòng chọn công việc';
        if(!formData.department) newErrors.department = 'Vui lòng chọn chức vụ để ra phòng ban';
        if(!imageFile){
            setErrorImage("Vui lòng tải lên hình ảnh")
        };
        if(first === '' && code === ''){
            setErrorCode('Vui lòng nhập mã nhân viên')
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0 && !!imageFile && !!first && !!code
    }

    const handleSubmit = async() => {
        if(!validateForm()){
            return;
        }

        setIsSubmitting(true)
        try {
            let uploadResponse:  any;
            uploadResponse = await uploadImage(imageFile!, 'users');
            if(!uploadResponse.success || !uploadResponse.data?.file){
                throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
            }

            const payload = {
                fullName: formData.fullName,
                dob: formData.dob,
                role: formData.role,
                code: code,
                email: formData.email,
                password: formData.password,
                gender: formData.gender,
                phone: formData.phone,
                work: formData.work.join(" "),
                department: formData.department,
                address: formData.address ? formData.address : null,
                avatarUrl: uploadResponse.data.file.imageUrl,
                nameImage: uploadResponse.data.file.fileName
            }
            const res = await createAccount(payload);
            notify({
                message: res.message,
                severity: 'success'
            });
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

    return (
        <>
            <NavigateBack
                title="Tạo tài khoản mới"
                onBack={handleClose}
            />
            <Box borderRadius={2} m={2} p={1.5} bgcolor='#fff' boxShadow="0px 2px 1px 1px rgba(0, 0, 0, 0.2)">
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12}} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2.5 }}>
                        <Box sx={{ position: 'relative', width: 120, height: 120}}>
                            <Avatar
                                src={finalDisplayAvatarSrc}
                                sx={{ width: '100%', height: '100%', mb: 2, bgcolor: 'grey.600', borderRadius: '50%' }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: 'grey.300',
                                    borderRadius: '50%',
                                    minWidth: '30px',
                                    width: '30px',
                                    height: '30px',
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 5
                                }}
                                component='label'
                                startIcon={<PhotoCamera sx={{ width: '25px', height: '25px', ml: 1.2, color: '#1C1A1B'}}/>}
                            >
                                <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleChangeAvatar}/>
                            </Button>
                        </Box> 
                        {errorImage && (
                            <Typography mt={1} fontSize='13px' color="error">{errorImage}</Typography>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Họ tên</Typography>
                        <InputText
                            name="fullName"
                            value={formData.fullName}
                            label=""
                            type="text"
                            onChange={handleInputChange}
                            margin="none"
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Ngày sinh</Typography>
                        <InputText
                            name="dob"
                            value={formData.dob}
                            label=""
                            type="date"
                            onChange={handleInputChange}
                            margin="none"
                            error={!!errors.dob}
                            helperText={errors.dob}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={700} fontSize='15px'>Chức vụ</Typography>
                        <InputSelect
                            label=""
                            value={formData.role}
                            name="role"
                            options={ROLE_DATA}
                            transformOptions={(data) =>
                                data.map((item) => ({
                                    value: item.value,
                                    label: item.label
                                }))
                            }
                            placeholder="Nhập thông tin"
                            onChange={handleInputChange}
                            error={!!errors.role}
                            helperText={errors.role}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={700} fontSize='15px'>Mã nhân viên</Typography>
                        <InputMaskTextField
                            mask={first.length === 1 ? '* - 999999' : '** - 999999'}
                            value={`${first} - ${code}`}
                            onChange={(value) => {
                                setCode(value)
                                setErrorCode('')
                            }}
                            placeholder={`${first} - ______`}
                            error={!!errorCode}
                            helperText={errorCode}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Email</Typography>
                        <InputText
                            label=""
                            type="text"
                            value={formData.email}
                            onChange={handleInputChange}
                            name="email"
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Mật khẩu</Typography>
                        <InputText
                            label=""
                            name='password'
                            value={formData.password}
                            type="text"
                            onChange={handleInputChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Giới tính</Typography>
                        <InputSelect
                            label=""
                            value={formData.gender}
                            onChange={handleInputChange}
                            name="gender"
                            options={GENDER}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    label: item.label,
                                    value: item.value
                                }))
                            }
                            placeholder="Chọn giới tính"
                            error={!!errors.gender}
                            helperText={errors.gender}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Số điện thoại</Typography>
                        <InputText
                            label=""
                            name='phone'
                            value={formData.phone}
                            type="text"
                            onChange={handleInputChange}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Công việc</Typography>
                        <InputSelect
                            multiple
                            renderChips
                            title="Chưa có dữ liệu. Hãy chọn chức vụ"
                            label=""
                            value={formData.work}
                            onChange={handleInputChange}
                            name="work"
                            error={!!errors.work}
                            helperText={errors.work}
                            placeholder="Chọn công việc"
                            options={WORK_DATA.filter((works) => works.role === formData.role)}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    value: item.value,
                                    label: item.label
                                }))
                            }
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6}}>
                        <Typography fontWeight={700} fontSize='15px'>Phòng ban</Typography>
                        <InputText
                            label=""
                            name='deparment'
                            value={formData.department}
                            type="text"
                            onChange={handleInputChange}
                            error={!!errors.department}
                            helperText={errors.department}
                            disabled
                        />
                    </Grid>
                    <Grid size={{ xs: 12}}>
                        <Typography fontWeight={700} fontSize='15px'>Địa chỉ</Typography>
                        <InputText
                            label=""
                            name='address'
                            value={formData.address}
                            type="text"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, borderRadius: 8, color: COLORS.BUTTON, mr: 2 }}
                            onClick={handleSubmit}
                        >
                            Tạo tài khoản
                        </Button>
                        <Button
                            onClick={handleClose}
                            sx={{
                                bgcolor: COLORS.BUTTON,
                                borderRadius: 8,
                                width: 100
                            }}
                        >
                            Quay lại
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Backdrop open={isSubmitting}/>
        </>
    )
}

export default CreateAccount;
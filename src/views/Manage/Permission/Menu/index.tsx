import Page from "@/components/Page";
import useNotification from "@/hooks/useNotification";
import { IAction, IMenu } from "@/types/permission";
import { Alert, Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, Delete, Edit } from "@mui/icons-material";
import IconButton from "@/components/IconButton/IconButton";
import CustomPagination from "@/components/Pagination/CustomPagination";
import Grid from "@mui/material/Grid2"
import InputText from "@/components/InputText";
import DialogAction from "./components/DialogAction";
import { createMenu, getMenu, getObjectPermisstion, updateMenu } from "@/services/permission-service";
import TableData from "../../components/TableData";
import { useDataList } from "@/hooks/useDataList";

export interface FormDataActionMenu {
    code: string;
    name: string;
}

export interface FormDataMenus{
    code: string;
    name: string;
    parentCode?: string;
    path?: string;
    icon?: string | null;
    actions: FormDataActionMenu[];
}

type FormErrors = {
    [K in keyof FormDataMenus]?: string
}

const Menus = () => {
    const notify = useNotification();
    const [openMenu, setOpenMenu] = useState<{type: string, open: boolean}>({
        type: '',
        open: false
    });
    const [openDialogAction, setOpenDialogAction] = useState(false);
    const [data, setData] = useState<IMenu | null>(null);
    const [formData, setFormData] = useState<FormDataMenus>({
        code: '' , name: '', parentCode: '', path: '', icon: '', actions: []
    })
    const [errors, setErrors] = useState<FormErrors>({});
    const [menu, setMenu] = useState<IMenu | null>(null);

    const { listData, loading, error, handleSearch, searchTerm, handlePageChange, page, rowsPerPage, total, fetchData } = useDataList<IMenu>((params) => getObjectPermisstion(params, "menus"))

    const handleOpenAddMenu = () => {
        setOpenMenu({
            type: 'add',
            open: true
        });
        setData(null)
        setFormData({
            code: '', name: '', parentCode: '', path: '', icon: '', actions: []
        })
    }

    const handleOpenAddMenuChildren = (menu: IMenu) => {
        setOpenMenu({
            type: 'add-child',
            open: true
        });
        setData(menu)
        setFormData({
            code: menu ? menu.code : '', name: '', parentCode: '', path: '', icon: '', actions: []
        })
    }

    const handleOpenEditMenu = async(menu: IMenu) => {
        const res = await getMenu(menu.id);
        const data = res.data as any as IMenu;
        setMenu(data)
        setFormData({
            code: data.code,
            name: data. name,
            path: data.path,
            icon: data.icon,
            actions: data.actions as any as IAction[]
        })
        setOpenMenu({
            type: 'edit',
            open: true
        })
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value}))
        if(errors[name as keyof typeof errors]){
            setErrors(prev => ({ ...prev, [name]: undefined}))
        }
    }

    const handleCancel = () => {
        openMenu.type === 'edit' ? 
            setOpenMenu({
                type: 'edit',
                open: false
            }) :
            setOpenMenu({
                type: 'add',
                open: false
            })
        setFormData({
           code: '', name: '', parentCode: '', path: '', icon: '', actions: [] 
        })
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.code) newErrors.code = 'Vui lòng nhập mã';
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên';
        if(!formData.path) newErrors.path = 'Vui lòng nhập đường dẫn';
        if(!formData.icon) newErrors.icon = 'Vui lòng nhập biểu tượng';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validateForm()) {
            return
        }

        try {
            let res: any;
            let payload: any;
            switch (openMenu.type) {
                case 'add':
                    payload = { ...formData};
                    res = await createMenu(payload);
                    break;
                case 'add-child':
                    payload = { 
                        ...formData,
                        parentCode: data && data.code
                    };
                    res = await createMenu(payload);
                    break;
                case 'edit':
                    payload = { ...formData};
                    res = menu && await updateMenu(menu?.id, payload)
                    break;
                default:
                    break;
            }

            notify({
                message: res.message,
                severity: 'success'
            })
            setFormData({ code: data ? data?.code : '', name: '', path: '', icon: '', parentCode: '', actions: []
            });
            fetchData(page, rowsPerPage);
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const handleOpenDialogAction = () => {
        setOpenDialogAction(true)
    }

    const handleSaveAction = (data: {code: string, name: string}) => {
        setFormData(prev => ({
            ...prev,
            actions: [...prev.actions, data]
        }));
    }

    return (
        <Page title="Quản lý quyền - Chức năng">
            <Box>
                <SearchBox
                    initialValue={searchTerm}
                    onSearch={handleSearch}
                    placeholder="Tìm kiếm theo mã, tên"
                >
                    <Button
                        sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                        endIcon={<Add/>}
                        onClick={handleOpenAddMenu}
                    >
                        Thêm chức năng
                    </Button>
                </SearchBox>
                {!openMenu.open && (
                    <>
                        {loading && (
                            <Box display='flex' justifyContent='center' my={3}>
                                <CircularProgress/>
                            </Box>
                        )}
                        {error && !loading && (
                            <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
                        )}
                        {!loading && !error && (
                            <Box my={2}>
                                <TableData
                                    label="menu"
                                    array={['STT', 'Mã', 'Tên chức năng', 'Chức năng cha', 'Thao tác']}
                                    colSpan={5}
                                    data={listData}
                                    renderRow={(menu, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{menu.code}</TableCell>
                                            <TableCell align="center">{menu.name}</TableCell>
                                            <TableCell align="center">{menu.parentName || ''}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    handleFunt={() => menu && handleOpenAddMenuChildren(menu)}
                                                    icon={<Add color="primary"/>}
                                                    tooltip="Thêm chức năng con"
                                                />
                                                <IconButton
                                                    handleFunt={() => menu && handleOpenEditMenu(menu)}
                                                    icon={<Edit color="info"/>}
                                                    tooltip="Chỉnh sửa"
                                                />
                                                <IconButton
                                                    handleFunt={() => {}}
                                                    icon={<Delete color="error"/>}
                                                    tooltip="Xóa"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                />
                                <Box display='flex' justifyContent='center' mt={2}>
                                    <CustomPagination
                                        count={total}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </Box>
                            </Box>
                        )}
                    </>
                )}
                {openMenu.open && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 5}}>
                            <Box m={3} bgcolor='#fff' p={2}>
                                <Typography mb={1} textAlign='center' fontWeight={700} variant="h5">
                                    {openMenu.type === 'edit' ? 'Chỉnh sửa chức năng' : openMenu.type === 'add-child' ? 'Thêm mới chức năng con' : 'Thêm mới chức năng'}
                                </Typography>
                                <Grid container spacing={3}>
                                    {openMenu.type === 'add-child' && data && (
                                        <Grid size={{ xs: 12}}>
                                            <Typography fontWeight={700} fontSize='15px'>Chức năng cha</Typography>
                                            <InputText
                                                name="name"
                                                onChange={() => {}}
                                                value={`${data.code} - ${data.name}`}
                                                type="text"
                                                label=""
                                                disabled
                                            />
                                        </Grid>
                                    )}
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Mã</Typography>
                                        <InputText
                                            name="code"
                                            onChange={handleInputChange}
                                            value={formData.code}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            error={!!errors.code}
                                            helperText={errors.code}
                                            disabled={openMenu.type === 'edit'}
                                            onlyPositiveNumber={true}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Tên chức năng</Typography>
                                        <InputText
                                            name="name"
                                            onChange={handleInputChange}
                                            value={formData.name}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            error={!!errors.name}
                                            helperText={errors.name}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Đường dẫn</Typography>
                                        <InputText
                                            name="path"
                                            onChange={handleInputChange}
                                            value={formData.path}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            error={!!errors.path}
                                            helperText={errors.path}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Typography fontWeight={700} fontSize='15px'>Biểu tượng</Typography>
                                        <InputText
                                            name="icon"
                                            onChange={handleInputChange}
                                            value={formData.icon}
                                            type="text"
                                            label=""
                                            placeholder="Nhập thông tin"
                                            margin="none"
                                            error={!!errors.icon}
                                            helperText={errors.icon}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12}}>
                                        <Box mb={1} display='flex' justifyContent='space-between' flexDirection='row'>
                                            <Typography fontWeight={600} fontSize='16px'>Thao tác</Typography>
                                            <Button
                                                sx={{ border: COLORS.BUTTON, bgcolor: COLORS.BUTTON}}
                                                onClick={handleOpenDialogAction}
                                                disabled={!formData.code}
                                            >
                                                Thêm
                                            </Button>
                                        </Box>
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        {['STT', 'Mã', 'Tên', 'Thao tác'].map((header, index) => (
                                                            <TableCell align="center" key={index}>{header}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {formData.actions.length === 0 ? (
                                                        <TableRow>
                                                            <TableCell colSpan={4} align="center">
                                                                Không có thao tác
                                                            </TableCell>
                                                        </TableRow>
                                                    ) : (
                                                        formData.actions.map((action, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell align="center">{index + 1}</TableCell>
                                                                <TableCell align="center">{action.code}</TableCell>
                                                                <TableCell align="center">{action.name}</TableCell>
                                                                <TableCell align="center">
                                                                    <IconButton
                                                                        handleFunt={() => {
                                                                            setFormData(prev => ({
                                                                                ...prev,
                                                                                actions: prev.actions.filter((_, i) => i !== index)
                                                                            }))
                                                                        }}
                                                                        icon={<Delete color="error"/>}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid size={{ xs: 12}} sx={{ display: 'flex', justifyContent: 'center'}}>
                                        <Button
                                            onClick={handleSave}
                                            sx={{
                                                mr: 1.5,
                                                border: COLORS.BUTTON,
                                                bgcolor: COLORS.BUTTON
                                            }}
                                        >
                                            Lưu
                                        </Button>
                                        <Button
                                            onClick={handleCancel}
                                            variant="outlined"
                                            sx={{
                                                border: '1px solid #000',
                                                color: '#000'
                                            }}
                                        >
                                            Hủy
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7}}>
                            <>
                                {loading && (
                                    <Box display='flex' justifyContent='center' my={3}>
                                        <CircularProgress/>
                                    </Box>
                                )}
                                {error && !loading && (
                                    <Alert severity="error" sx={{ my: 2}}>{error}</Alert>
                                )}
                                {!loading && !error && (
                                    <Box my={3} mr={3}>
                                        <TableData
                                            label="menu"
                                            array={['STT', 'Mã', 'Tên chức năng', 'Chức năng cha', 'Thao tác']}
                                            colSpan={5}
                                            data={listData}
                                            renderRow={(menu, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="center">{index + 1}</TableCell>
                                                    <TableCell align="center">{menu.code}</TableCell>
                                                    <TableCell align="center">{menu.name}</TableCell>
                                                    <TableCell align="center">{menu.parentName || ''}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton
                                                            handleFunt={() => menu && handleOpenAddMenuChildren(menu)}
                                                            icon={<Add color="primary"/>}
                                                            tooltip="Thêm chức năng con"
                                                        />
                                                        <IconButton
                                                            handleFunt={() => menu && handleOpenEditMenu(menu)}
                                                            icon={<Edit color="info"/>}
                                                            tooltip="Chỉnh sửa"
                                                        />
                                                        <IconButton
                                                            handleFunt={() => {}}
                                                            icon={<Delete color="error"/>}
                                                            tooltip="Xóa"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        />
                                        <Box display='flex' justifyContent='center' mt={2}>
                                            <CustomPagination
                                                count={total}
                                                page={page}
                                                rowsPerPage={rowsPerPage}
                                                onPageChange={handlePageChange}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </>
                        </Grid>
                    </Grid>
                )}
            </Box>
            {openDialogAction && (
                <DialogAction
                    open={openDialogAction}
                    onClose={() => {
                        setOpenDialogAction(false)
                    }}
                    menuCode={formData.code}
                    onSave={handleSaveAction}
                    formData={formData}
                />
            )}
        </Page>
    )
}

export default Menus;
import Page from "@/components/Page";
import useNotification from "@/hooks/useNotification";
import { IAction } from "@/types/permission";
import { Alert, Box, Button, CircularProgress, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, Delete, Edit, Gif } from "@mui/icons-material";
import { useDataList } from "@/hooks/useDataList";
import { createAction, getObjectPermisstion, updateAction } from "@/services/permission-service";
import TableData from "../../components/TableData";
import IconButton from "@/components/IconButton/IconButton";
import CustomPagination from "@/components/Pagination/CustomPagination";
import Grid from "@mui/material/Grid2";
import InputText from "@/components/InputText";

export interface FormDataActions {
    code: string;
    name: string;
}

type FormErrors  = {
    [K in keyof FormDataActions]?: string;
}

const Action = () => {
    const notify = useNotification();
    const [openAction, setOpenAction] = useState<{type: string, open: boolean}>({
        open: false,
        type: ''
    });
    const [formData, setFormData] = useState<FormDataActions>({
        code: '',
        name: ''
    })
    const [errors, setErrors] = useState<FormErrors>({});
    const [action, setAction] = useState<IAction | null>(null);

    const { listData, loading, error, handleSearch, searchTerm, handlePageChange, page, rowsPerPage, total, fetchData } = useDataList<IAction>((params) => getObjectPermisstion(params, "actions")) // ✅ factory trả về đúng hàm);

    const handleOpenAddActions = () => {
        setOpenAction({
            type: 'add',
            open: true
        });
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if(errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }))
        }
    }

    const validateForm = () : boolean => {
        const newErrors: FormErrors = {};
        if(!formData.code) newErrors.code = 'Vui lòng nhập mã';
        if(!formData.name) newErrors.name = 'Vui lòng nhập tên';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSave = async() => {
        if(!validateForm()){
            return;
        }
        try {
            let res: any;
            if(openAction.type === 'add') {
                const payload = { ...formData };
                res = await createAction(payload);
            }else{
                const { code, ... payload } = formData;
                res = action && await updateAction(action.id, payload);
            }

            notify({
                message: res.message,
                severity: 'success'
            });
            setFormData({ code: '', name: '' });
            fetchData(page, rowsPerPage)
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const handleCloseAddAction = () => {
        setOpenAction({ type: 'add', open: false });
        setFormData({ code: '', name: '' })
    }

    const handleOpenEditAction = (action: IAction) => {
        setAction(action);
        setOpenAction({ type: 'edit', open: true });
        setFormData({ code: action.code, name: action.name})
    }

    const handleCloseEditAction = () => {
        setOpenAction({ type: 'edit', open: false });
        setFormData({ code: '', name: '' })
        setAction(null)
    }
    return(
        <Page title="Quản lý quyền - Thao tác">
            <Box>
                <SearchBox
                    initialValue={searchTerm}
                    onSearch={handleSearch}
                    placeholder="Tìm kiếm theo mã, tên"
                >
                    <Button
                        variant="outlined"
                        sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON}}
                        startIcon={<Add/>}
                        onClick={handleOpenAddActions}
                    >
                        Thêm thao tác
                    </Button>
                </SearchBox>
                {!openAction.open && (
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
                            <Box>
                                <TableData
                                    label="action"
                                    array={['STT', 'Mã', 'Tên', 'Thao tác']}
                                    data={listData}
                                    colSpan={4}
                                    renderRow={(action, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{action.code}</TableCell>
                                            <TableCell align="center">{action.name}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    handleFunt={() => action && handleOpenEditAction(action)}
                                                    icon={<Edit color="info"/>}
                                                />
                                                <IconButton
                                                    handleFunt={() => {}}
                                                    icon={<Delete color="error"/>}
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
                {openAction.open && (
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box m={3} bgcolor='#fff' p={4}>
                                <Typography mb={1} textAlign='center' fontWeight={700} variant="h5">
                                    {openAction.type === 'edit' ? 'Chỉnh sửa thao tác' : 'Thêm mới thao tác'}
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12 }}>
                                        <Typography fontWeight={700} fontSize='15px'>Mã</Typography>
                                        <InputText
                                            name="code"
                                            type="text"
                                            value={formData.code}
                                            label=""
                                            placeholder="Nhập thông tin"
                                            error={!!errors.code}
                                            helperText={errors.code}
                                            disabled={openAction.type === 'edit'}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Typography fontWeight={700} fontSize='15px'>Tên</Typography>
                                        <InputText
                                            name="name"
                                            type="text"
                                            label=""
                                            value={formData.name}
                                            placeholder="Nhập thông tin"
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center'}}>
                                        <Button
                                            variant="outlined"
                                            onClick={handleSave}
                                            sx={{ 
                                                mr: 1.5,
                                                border: `1px solid ${COLORS.BUTTON}`,
                                                color: COLORS.BUTTON
                                            }}
                                        >
                                            Lưu
                                        </Button>
                                        <Button
                                            onClick={openAction.type === 'edit' ? handleCloseEditAction : handleCloseAddAction}
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
                        <Grid size={{ xs: 12, md: 8}}>
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
                                                label="action"
                                                array={['STT', 'Mã', 'Tên', 'Thao tác']}
                                                data={listData}
                                                colSpan={4}
                                                renderRow={(action, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="center">{index + 1}</TableCell>
                                                        <TableCell align="center">{action.code}</TableCell>
                                                        <TableCell align="center">{action.name}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                handleFunt={() => action && handleOpenEditAction(action)}
                                                                icon={<Edit color="info"/>}
                                                            />
                                                            <IconButton
                                                                handleFunt={() => {}}
                                                                icon={<Delete color="error"/>}
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
        </Page>
    )
}

export default Action;
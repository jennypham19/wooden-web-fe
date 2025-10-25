import { IUser } from "@/types/user";
import DateTime from "@/utils/DateTime";
import { getRenderLabel, getRoleLabel } from "@/utils/labelEntoVni";
import { Avatar, Box, Button, Card, CardContent, Checkbox, Chip, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import avatar from "@/assets/images/users/default-avatar.jpg";
import { createUserRole, getAllModules, updateUserRole } from "@/services/permission-service";
import { IMenu } from "@/types/permission";
import React, { useEffect, useState } from "react";
import NavigateBack from "../../components/NavigateBack";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";
import { getDetailUserWithPermission } from "@/services/user-service";

interface DetailDecentralizedAccountProps{
    id: string;
    works: string[];
    open: boolean;
    onClose: () => void;
    isPermission: boolean
}

const DetailDecentralizedAccount = (props: DetailDecentralizedAccountProps) => {
    const { id, works, open, onClose, isPermission } = props;
    const notify = useNotification();
    const [modules, setModules] = useState<IMenu[]>([]);
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [errorCheckedAction, setErrorCheckedAction] = useState<string>('');
    const [account, setAccount] = useState<IUser | null>(null);

    const extractChecked = (permissions: IMenu[]) => {
        const checkedMap: Record<string, boolean> = {};
        const dfs = (menu: IMenu) => {
            if(menu.actions) {
                menu.actions.forEach((act) => {
                    checkedMap[`${menu.code}_${act.name}`] = true;
                });
            }
            if(menu.children) {
                menu.children.forEach(dfs);
            }
        };
        permissions.forEach(dfs);
        return checkedMap;
    }

    const getModules = async() => {
        const res = await getAllModules();
        const data = res.data as any as IMenu[];
        setModules(data);
    };

    const getDetailUser = async() => {
        const res = await getDetailUserWithPermission(id);
        const data = res.data as any as IUser;
        setAccount(data);
        if(data.permissions) {
            const checkedMap = extractChecked(data.permissions);
            setChecked(checkedMap)
        }
    }
    
    useEffect(() => {
        if(open){
            getModules();
            getDetailUser()
        }
    },[open]);

    // tìm tất cả action unique
    const allActions = Array.from(
        new Set(modules.flatMap((m) => m.actions && m.actions.map((a) => a.name)))
    );

    const handleCheck = (moduleCode: string, actionName: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => { 
        const key = `${moduleCode}_${actionName}`;
        setChecked({
            ...checked,
            [key]: event.target.checked
        });
        setErrorCheckedAction('')
    };

    // Kiểm tra có ít nhất 1 true trong checked
    const hasAnyChecked = Object.values(checked).some((val) => val === true);

    // Hàm đệ quy để lấy menu + actions đã được check
    const buildPermission = (menu: IMenu, checked: Record<string, boolean>) => {
        // Lấy action được check
        const actions = menu.actions && menu.actions
            .filter((a) => checked[`${menu.code}_${a.name}`])
            .map((a) => ({
                id: a.id,
                code: a.code,
                name: a.name
            }))

        // Duyệt children đệ quy
        const children: any = (menu.children ?? [])
            .map((child) => buildPermission(child, checked))
            .filter((c) => c !== null); // bỏ các node không có action và không có children hợp lệ
        
        // Nếu node hiện tại không có action và children => bỏ qua (return null)
        if(actions && actions.length === 0 && children.length === 0) {
            return null;
        }
        return {
            ...menu,
            actions,
            children
        }
    }

    const handleSave = async() => {
        if(!hasAnyChecked) {
            setErrorCheckedAction('Bạn phải chọn ít nhất 1 quyền/ hành động.')
        }

        // prepare payload
        const permissions = modules.map((m) => buildPermission(m, checked)).filter((p) => p !== null);
        const data = {
            "userId": id,
            permissions
        }
        try {
            let res: any;
            switch (isPermission) {
                case false:
                    res = await createUserRole(data);
                    setChecked({});
                    notify({
                        message: res.message,
                        severity: 'success'
                    });
                    break;
                case true:
                    res = await updateUserRole(data);
                    setChecked({});
                    notify({
                        message: res.message,
                        severity: 'success'
                    });
                    break;
                default:
                    break;
            }
            onClose()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    // Render đệ quy menu + children
    const renderModuleRow = (mod: IMenu, level = 0) => {
        return(
             <Box key={mod.id}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        py: 1,
                    }}
                >
                    {/* Tên module */}
                    <Typography
                        fontSize="15px"
                        sx={{ width: "15%", pl: level * 3}}
                    >
                        {mod.name}
                    </Typography>

                    {/* Các checkbox hành động */}
                    <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="flex-start"
                        sx={{ width: "85%" }}
                    >
                        {allActions.map((action) => {
                            const hasAction =
                                mod.actions?.some((a) => a.name === action);
                                const key = `${mod.code}_${action}`;
                            return (
                                <Box
                                    key={action}
                                    sx={{
                                        width: 100,
                                        textAlign: "center",
                                    }}
                                >
                                    {hasAction ? (
                                        <Checkbox
                                            checked={checked[key] || false}
                                            onChange={handleCheck(mod.code, action)}
                                            sx={{
                                                color: "#000",
                                                "&.Mui-checked": {
                                                    color: "#000",
                                                },
                                            }}
                                        />
                                    ) : (
                                        <Box sx={{ height: 40 }} />
                                    )}
                                </Box>
                            );
                        })}
                    </Stack>
                </Stack>

                {/* Render children (nếu có) */}
                {mod.children &&
                    mod.children.length > 0 &&
                    mod.children.map((child) => renderModuleRow(child, level + 1))}
            </Box>
        )
    }

    return(
        <Box>
            <NavigateBack onBack={onClose} title="Phân quyền tài khoản"/>
            <Card sx={{ m: 2, boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.2)", borderRadius: 4, }}>
                <CardContent sx={{ p: 2 }}>
                    {account !== null && (
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <Box display='flex' justifyContent='space-between'>
                                    <Avatar
                                        src={account.avatarUrl !== null ? account.avatarUrl : avatar}
                                        sx={{ width: 80, height: 80, borderRadius: '50%' }}
                                    />
                                    <Box sx={{ height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <Chip sx={{ margin: 'auto 0'}} color="success" label={getRoleLabel(account.role)}></Chip>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <Box display='flex' flexDirection='column'>
                                    <Typography mb={1} fontWeight={600}>{account.fullName}</Typography>
                                    <Stack mb={1} display='flex' justifyContent='space-between'>
                                        <Typography fontSize='15px'>{DateTime.FormatDate(account.dob)}</Typography>
                                        <Typography fontSize='15px'>{getRenderLabel(account.gender)}</Typography>
                                    </Stack>
                                    <Stack mb={1} display='flex' justifyContent='space-between'>
                                        <Typography fontSize='15px'>{account.code}</Typography>
                                        <Typography fontSize='15px'>{account.phone}</Typography>
                                    </Stack>
                                    <Stack mb={1} display='flex' justifyContent='space-between'>
                                        <Typography fontSize='15px'>{account.email}</Typography>
                                        {account.address && <Typography fontSize='15px'>{account.address}</Typography>}
                                    </Stack>
                                    <Stack mb={1} display='flex' justifyContent='space-between'>
                                        <Typography fontSize='15px'>{`Phòng: ${account.department}`}</Typography>
                                        <Typography fontSize='15px'>{getRoleLabel(account.role)}</Typography>
                                    </Stack>
                                    {works.map((work, index) => (
                                        <Stack>
                                            {works.length - 1 > index  && (<Typography>●</Typography>)}
                                            <Typography key={index} fontSize='15px'>{`${work}${works.length - 1 > index ? '.' : ''}`}</Typography>
                                        </Stack>
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                    <Paper sx={{ bgcolor: '#FFFAE4', mt: 2, p: 2, boxShadow: "0px 2px 1px 1px rgba(0, 0, 0, 0.2)", borderRadius: 3}}>
                        {/* Header hàng tiêu đề */}
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography fontWeight={700} fontSize='16px' sx={{ width: "15%"}}>Quyền / hành động</Typography>
                            <Stack
                                direction="row"
                                spacing={4}
                                justifyContent="flex-start"
                                sx={{ width: "85%" }}
                            >
                                {allActions.map((action) => (
                                    <Typography fontWeight={700} fontSize='16px' key={action} sx={{ width: 100, textAlign: "center" }}>
                                        {action}
                                    </Typography>
                                ))}
                            </Stack>
                        </Stack>
                        {modules.length === 0 ? (
                            <Typography fontWeight={600} align="center">Không tồn tại bản ghi nào</Typography>
                        ) : (
                            modules.map((mod) => renderModuleRow(mod))
                        )}
                    </Paper>
                    {errorCheckedAction && (
                        <Typography mt={2} fontWeight={700} variant="subtitle2" color="error">{errorCheckedAction}</Typography>
                    )}
                    <Box mt={2} display='flex' justifyContent='flex-end'>
                        <Button
                            sx={{ 
                                bgcolor: COLORS.BUTTON,
                                width: 100,
                                borderRadius: 3,
                                mr: 1.5
                            }}
                            onClick={handleSave}
                        >
                            Gán quyền
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 100, borderRadius: 3 }}
                            onClick={onClose}
                        >
                            Quay lại
                        </Button>
                    </Box>
                </CardContent>
            </Card>  
        </Box>
    )
}

export default DetailDecentralizedAccount;
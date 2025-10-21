import DialogComponent from "@/components/DialogComponent";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2"
import { Button, Typography } from "@mui/material";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import { COLORS } from "@/constants/colors";
import { getActions } from "@/services/permission-service";
import { IAction } from "@/types/permission";
import { FormDataMenus } from "..";

interface DialogActionProps{
    open: boolean,
    onClose: () => void;
    menuCode: string,
    onSave: (data: { code: string, name: string}) => void;
    formData: FormDataMenus
}

const DialogAction: React.FC<DialogActionProps> = ({ open, onClose, menuCode, onSave, formData }) => {
    const [actions, setActions] = useState<IAction[]>([]);
    const [data, setData] = useState<{code: string, name: string}>({
        code: '',
        name: ''
    });
    const [error, setError] = useState('')

    const [code, setCode] = useState<string>("");
    useEffect(() => {
        if(open){
            const getAction = async() => {
                const res = await getActions({page: 1, limit: 99});
                const data = res.data?.data as any as IAction[];
                setActions(data)
            }
            getAction();
        }
    }, [open])

    const handleClose = () => {
        onClose()
    }

    const handleInputChange = (name: string, value: any) => {
        setCode(value);
    }

    useEffect(() => {
        if(code){
            const selectedAction = actions.find(a => a.code === code);
            setData({
                code: `${menuCode}${code}`,
                name: selectedAction ? selectedAction.name : ''
            })
        }
    },[code]);

    const handleSave = (data: { code: string, name: string}) => {
        const existAction = formData.actions.find((act) => act.code === data.code);
        if(existAction){
            setError(`Đã tồn tại thao tác ${existAction.code} - ${existAction.name}`);
            return
        }
        onSave(data)
        handleClose()
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            isActiveFooter={false}
            dialogTitle="Thêm mới thao tác"
            isCenter={true}
            maxWidth='xs'
        >
            <Grid container spacing={3}>
                <Grid size={{ xs: 12}}>
                    <Typography fontWeight={600} fontSize='14px'>Tên thao tác</Typography>
                    <InputSelect
                        name="parentCode"
                        label=""
                        value={code}
                        onChange={handleInputChange}
                        options={actions}
                        placeholder="Chọn thông tin"
                        transformOptions={(data) => 
                            data.map((item) => ({
                                value: item.code,
                                label: item.name
                            }))
                        }
                    />
                </Grid>
                <Grid size={{ xs: 12}}>
                    <Typography fontWeight={600} fontSize='14px'>Mã</Typography>
                    <InputText
                        name="code"
                        label=""
                        onChange={() => {}}
                        type="text"
                        placeholder="Nhập thông tin"
                        value={`${menuCode}${code}`}
                        disabled
                    />
                </Grid>
                {error &&
                    <Grid size={{ xs: 12}}>
                        <Typography variant="subtitle2" color="error" fontWeight={700}>{error}</Typography>
                    </Grid>
                }
                <Grid size={{ xs: 12}} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Button
                        sx={{
                            mr: 1.5,
                            border: COLORS.BUTTON,
                            bgcolor: COLORS.BUTTON
                        }}
                        onClick={() => data && handleSave (data)}
                    >
                        Lưu
                    </Button>
                    <Button
                        onClick={handleClose}
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
        </DialogComponent>
    )
}

export default DialogAction;
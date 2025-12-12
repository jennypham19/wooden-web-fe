import { getDetailOrder } from "@/services/order-service";
import { FormDataWorkMilestone, FormWorkMilestoneErrors, IOrder } from "@/types/order";
import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CardDetailDataOrder from "./CardDetailDataOrder";
import NavigateBack from "../../components/NavigateBack";
import LabeledStack from "@/components/LabeledStack";
import Grid from "@mui/material/Grid2";
import { getNumber, getProccessProductLabel, getStatusProductLabel } from "@/utils/labelEntoVni";
import useAuth from "@/hooks/useAuth";
import IconButton from "@/components/IconButton/IconButton";
import { Add } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "@/types/user";
import InputSelect from "@/components/InputSelect";
import useNotification from "@/hooks/useNotification";
import { COLORS } from "@/constants/colors";
import WorkMilestone from "./WorkMilestone";

interface JobInOrderProps{
    data: IOrder,
    onClose: () => void;
}

const DATA_WORK_MILESTONE: { id: string, label: string, value: string}[] = [
    {
        id: uuidv4(),
        label: '1 mốc công việc',
        value: 'one_milestone'
    },
    {
        id: uuidv4(),
        label: '2 mốc công việc',
        value: 'two_milestone'
    },
    {
        id: uuidv4(),
        label: '3 mốc công việc',
        value: 'three_milestone'
    },
    {
        id: uuidv4(),
        label: '4 mốc công việc',
        value: 'four_milestone'
    },
    {
        id: uuidv4(),
        label: '5 mốc công việc',
        value: 'five_milestone'
    }
]

const JobInOrder = (props: JobInOrderProps) => {
    const { data, onClose } = props;
    const { profile } = useAuth();
    const notify = useNotification();
    const [order, setOrder] = useState<IOrder | null>(null);
    const [workMileStone, setWorkMilestone] = useState<string>('');
    const [errorWorkMileStone, setErrorWorkMilestone] = useState<string>('');
    const [carpenters, setCarpenters] = useState<IUser[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [numberWorkMilestone, setNumberWorkMilestone] = useState<number[]>([]);
    const [openWorkMilestone, setOpenWorkMilestone] = useState(false);
    const [formDataWorkMilestone, setFormDataWorkMilestone] = useState<FormDataWorkMilestone[]>([])
    const [workMilestoneErrors, setWorkMilestoneErrors] = useState<FormWorkMilestoneErrors[]>([])
    
    useEffect(() => {
        if(data){
            const getOrder = async() => {
                const res = await getDetailOrder(data.id);
                const newOrder = res.data as any as IOrder;
                setOrder(newOrder)
            };

            getOrder()
        }
    }, [data])

    const handleClose = () => {
        onClose();
        setWorkMilestone('');
        setCarpenters([]);
        setErrorWorkMilestone('')
    }

    const handleSelectInput = (name: string, value: any) => {
        const number = value.split('_')[0];
        const newNumber = getNumber(number);
        if(newNumber > 0){
            setWorkMilestone(value)
            const num = Array.from({ length: newNumber }, (_, i) => i + 1);
            setNumberWorkMilestone(num);
            setFormDataWorkMilestone(
                Array.from({ length: newNumber }, () => ({
                    name: '',
                    step: null,
                    target: '',
                    steps: []
                }))
            )
            setOpenWorkMilestone(true)
        }else{
            setWorkMilestone('')
            setNumberWorkMilestone([])
        }
        setErrorWorkMilestone('')
    }

    const handleInputChangeWorkMilestone = (index: number, name: string, value: any) => {
        setFormDataWorkMilestone((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: value };
            return updated;
        })
    }

    const validateSubmit = (): boolean => {
        if(!workMileStone){
            setErrorWorkMilestone('Mốc công việc không được để trống.')
        }
        return !!workMileStone;
    }

    const handleSave = async() => {
        if(!validateSubmit()){
            return;
        }
        setIsSubmitting(true)
        try {
            
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }
    return(
        <Box>
            {!openWorkMilestone && (
                <>
                    <NavigateBack
                        title="Tạo công việc"
                        onBack={handleClose}
                    />
                    <Paper sx={{ borderRadius: 2, m:1.5, p: 2 }}>
                        <CardDetailDataOrder
                            order={order}
                        />
                        <Grid container spacing={2}>
                            {order && order.products.map((product, index) => {
                                return(
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <LabeledStack 
                                            sx={{ borderRadius: 3 }}
                                            label={`Công việc ${index + 1}`}
                                            stackProps={{ direction: "column", my: 2, p: 2 }}
                                        >
                                            <Stack direction='row'>
                                                <Typography fontSize='15px' fontWeight={600}>Tên công việc:</Typography>
                                                <Typography fontSize='15px'>{product.name}</Typography>
                                            </Stack>
                                            <Stack direction='row'>
                                                <Typography sx={{ whiteSpace: 'nowrap' }} fontSize='15px' fontWeight={600}>Mô tả/ Yêu cầu:</Typography>
                                                <Typography sx={{ whiteSpace: { xs: 'none', md: 'nowrap'} }} fontSize='15px'>{product.description}</Typography>
                                            </Stack>
                                            <Stack direction='row'>
                                                <Typography sx={{ whiteSpace: 'nowrap' }} fontSize='15px' fontWeight={600}>Mục tiêu:</Typography>
                                                <Typography sx={{ whiteSpace: { xs: 'none', md: 'nowrap'} }} fontSize='15px'>{product.target}</Typography>
                                            </Stack>
                                            <Stack direction='row'>
                                                <Typography fontSize='15px' fontWeight={600}>Tiến độ:</Typography>
                                                <Typography fontSize='15px'>{getProccessProductLabel(product.proccess)}</Typography>
                                            </Stack>
                                            <Stack direction='row'>
                                                <Typography fontSize='15px' fontWeight={600}>Trạng thái:</Typography>
                                                <Typography fontSize='15px'>{getStatusProductLabel(product.status)}</Typography>
                                            </Stack>
                                            <Stack direction='row'>
                                                <Typography fontSize='15px' fontWeight={600}>Người quản lý:</Typography>
                                                <Typography fontSize='15px'>{profile?.fullName}</Typography>
                                            </Stack>
                                            <Stack direction='row' display='flex' justifyContent='space-between'>
                                                <Typography fontSize='15px' fontWeight={600}>Phân công nhân lực:</Typography>
                                                <IconButton
                                                    tooltip="Mở dialog chọn nhân lực"
                                                    handleFunt={() => {}}
                                                    icon={<Add/>}
                                                    height={0}
                                                    width={0}
                                                />
                                            </Stack>
                                            <Stack direction='row' display='flex' justifyContent='center' alignItems='center'>
                                                <Typography sx={{ whiteSpace: "nowrap" }} fontSize='15px' fontWeight={600}>Mốc công việc:</Typography>
                                                <InputSelect
                                                    name="workMilestone"
                                                    label=""
                                                    value={workMileStone}
                                                    options={DATA_WORK_MILESTONE}
                                                    onChange={handleSelectInput}
                                                    placeholder="Chọn mốc công việc"
                                                    error={!!errorWorkMileStone}
                                                    helperText={errorWorkMileStone}
                                                />
                                            </Stack>
                                        </LabeledStack>                               
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Box mt={2} display='flex' justifyContent='center'>
                            <Button
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 150, mr: 2 }}
                                onClick={handleSave}
                            >
                                Lưu
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 150 }}
                                onClick={handleClose}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </Paper>                
                </>
            )}
            {openWorkMilestone && workMileStone !== '' && numberWorkMilestone.length > 0 && (
                <Box>
                    <NavigateBack
                        title="Tạo mốc công việc"
                        onBack={() => { setOpenWorkMilestone(false), setWorkMilestone('') }} 
                    />
                    <Box bgcolor='#fff' pb={1}>
                        <WorkMilestone 
                            formDataWorkMilestone={formDataWorkMilestone}
                            onBack={() => { setOpenWorkMilestone(false), setWorkMilestone('') }}
                            onInputChange={handleInputChangeWorkMilestone}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default JobInOrder;
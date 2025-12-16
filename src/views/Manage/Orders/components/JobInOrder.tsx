import { getDetailOrder, saveOrderWork } from "@/services/order-service";
import { FormDataWorkMilestone, FormStepErrors, FormWorkMilestoneErrors, IOrder, WorkOderPayload } from "@/types/order";
import { Avatar, Box, Button, Divider, Paper, Stack, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import CardDetailDataOrder from "./CardDetailDataOrder";
import NavigateBack from "../../components/NavigateBack";
import LabeledStack from "@/components/LabeledStack";
import Grid from "@mui/material/Grid2";
import { getNumber, getProccessProductLabel, getStatusProductLabel } from "@/utils/labelEntoVni";
import useAuth from "@/hooks/useAuth";
import IconButton from "@/components/IconButton/IconButton";
import { Add, Inventory } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "@/types/user";
import InputSelect from "@/components/InputSelect";
import useNotification from "@/hooks/useNotification";
import { COLORS } from "@/constants/colors";
import WorkMilestone from "./WorkMilestone";
import DialogChooseWorkers from "./DialogChooseWorkers";
import { getProductsByOrderId } from "@/services/product-service";
import { IProduct } from "@/types/product";
import { useFetchData } from "@/hooks/useFetchData";
import { getListCapenter } from "@/services/user-service";
import Backdrop from "@/components/Backdrop";

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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openDialogChooseWorkers, setOpenDialogChooseWorkers] = useState(false);

    const [order, setOrder] = useState<IOrder | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [workMileStone, setWorkMilestone] = useState<string>('');
    const [errorWorkMileStone, setErrorWorkMilestone] = useState<string>('');
    const [numberWorkMilestone, setNumberWorkMilestone] = useState<number[]>([]);
    const [formDataWorkMilestone, setFormDataWorkMilestone] = useState<FormDataWorkMilestone[]>([]);
    const [product, setProduct] = useState<IProduct | null>(null);
    const [productSelected, setProductSelected] = useState<any>(null);
    const [errorProductSelected, setErrorProductSelected] = useState<string>('');
    const [workMilestoneErrors, setWorkMilestoneErrors] = useState<FormWorkMilestoneErrors[]>([])
    const [stepErrors, setStepErrors] = useState<FormStepErrors[]>([])
    const [carpentersId, setCarpentersId] = useState<{ carpenterId: string }[]>([]);
    const [assignedWorkerIds, setAssignedWorkerIds] = useState<string[]>([]);
    const [carpenterIdsError, setCarpenterIdsError] = useState<string>('')

    const { listData } = useFetchData<IUser>(getListCapenter, 99)
    
    useEffect(() => {
        if(data){
            const getOrder = async() => {
                const res = await getDetailOrder(data.id);
                const newOrder = res.data as any as IOrder;
                setOrder(newOrder)
            };

            const getProductByOrder = async() => {
                const res = await getProductsByOrderId(data.id);
                const newProducts = res.data as any as IProduct[];
                setProducts(newProducts)
            }

            getOrder();
            getProductByOrder()
        }
    }, [data])

    const reset = () => {
        setWorkMilestone('');
        setErrorWorkMilestone('');
        setProducts([]);
        setNumberWorkMilestone([]) ;
        setFormDataWorkMilestone([]);
        setProduct(null); 
        setProductSelected(null);
        setErrorProductSelected('');
        setWorkMilestoneErrors([]);
        setStepErrors([]);
        setCarpentersId([]);
        setAssignedWorkerIds([]);
        setCarpenterIdsError('')
    }

    const handleClose = () => {
        onClose();
        reset();
    }

    const handleOpenDialogChooseWorkers = () => {
        setOpenDialogChooseWorkers(true)
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

    const handleStepErrors = (stepIndex: number, name: string) => {
        setStepErrors((prev) => {
            const updated = [...prev];
            updated[stepIndex] = { ...updated[stepIndex], [name]: undefined };
            return updated;
        });
    }
    const handleWorkMilestoneErrors = (index: number, name: string) => {
        setWorkMilestoneErrors((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [name]: undefined };
            return updated;
        });   
    }

    const validateSubmit = (): boolean => {
        if(!workMileStone){
            setErrorWorkMilestone('Mốc công việc không được để trống.')
        }
        if(!productSelected){
            setErrorProductSelected('Sản phẩm để tạo công việc không được để trống. ')
        }
        if(carpentersId.length === 0){
            setCarpenterIdsError("Phân công nhân lực không được để trống .")
        }

        // Bắt lỗi mốc công việc
        const newWorkMilestoneErrors: FormWorkMilestoneErrors[] = [];
        formDataWorkMilestone.forEach((mile, idx) => {
            const mError: FormWorkMilestoneErrors = {};
            if (!mile.name) mError.name = `Mốc công việc ${idx + 1}: Vui lòng nhập tên mốc công việc`;
            if (!mile.step) mError.step = `Mốc công việc ${idx + 1}: Vui lòng nhập mốc công việc`;
            if (!mile.target) mError.target = `Mốc công việc ${idx + 1}: Vui lòng nhập mục tiêu/ yêu cầu`;
            newWorkMilestoneErrors.push(mError);
        });

        const hasWorkMilestoneError = newWorkMilestoneErrors.some((e) => Object.keys(e).length > 0);
        setWorkMilestoneErrors(newWorkMilestoneErrors)

        // Bắt lỗi của Bước
        const newStepErrors: FormStepErrors[] = [];
        formDataWorkMilestone.forEach((mile) => {
            (mile.steps ?? []).forEach((step, idx) => {
                const pError: FormStepErrors = {};
                if (!step.name) pError.name = `Bước ${idx + 1}: Vui lòng nhập tên bước`;
                if (!step.proccess) pError.proccess = `Bước ${idx + 1}: Vui lòng chọn tiến độ`;
                newStepErrors.push(pError);
            })
        });

        const hasStepError = newStepErrors.some((e) => Object.keys(e).length > 0);
        setStepErrors(newStepErrors)

        return !!workMileStone && !!productSelected && !hasStepError && !hasWorkMilestoneError && carpentersId.length > 0;
    }

    const handleSaveWorkers = (ids: string[]) => {
        setAssignedWorkerIds((prev) => {
            const merged = [...prev, ...ids];
            return Array.from(new Set(merged));
        })
        const payloadIds: { carpenterId: string }[] = ids.map((id) => ({
            carpenterId: id
        }));
        setCarpentersId((prev) => [...prev, ...payloadIds])
        setCarpenterIdsError('');
        setOpenDialogChooseWorkers(false)
    }
 
    const handleSave = async() => {
        if(!validateSubmit()){
            return;
        }
        const payload: WorkOderPayload = {
            managerId: profile ? profile.id : null,
            productId: product ? product.id : null,
            workMilestone: workMileStone,
            workers: carpentersId.length > 0 ? carpentersId : [],
            workMilestones: formDataWorkMilestone.length > 0 ? formDataWorkMilestone : []

        }
        console.log("payload: ", payload);

        setIsSubmitting(true)
        try {
            const res = await saveOrderWork(payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            reset()            
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChangeSelect = (name: string, value: any) => {
        setProductSelected(value);
        const newProduct = order?.products.find(el => el.id === value);
        newProduct && setProduct(newProduct)
        setErrorProductSelected('')
    }
    
    return(
        <Box>
            <NavigateBack
                title="Tạo công việc"
                onBack={handleClose}
            />
            <Paper sx={{ borderRadius: 2, m:1.5, p: 2 }}>
                <CardDetailDataOrder
                    order={order}
                />
                <Divider sx={{ mt: 3 }}/>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack pb={1.5} direction='row' mt={2}>
                            <Inventory/>
                            <Typography fontWeight={600} fontSize='16px'>Chọn sản phẩm để tạo công việc</Typography>
                        </Stack>
                        <InputSelect
                            label=""
                            placeholder="Chọn sản phẩm"
                            value={productSelected}
                            onChange={handleChangeSelect}
                            name="product"
                            options={products}
                            transformOptions={(data) => 
                                data.map((item) => ({
                                    value: item.id,
                                    label: item.name
                                }))
                            }
                            error={!!errorProductSelected}
                            helperText={errorProductSelected}
                        />                                
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}></Grid>
                    {productSelected !== null && product && (
                        <Grid size={{ xs: 12 }}>
                            <LabeledStack 
                                sx={{ borderRadius: 3 }}
                                label={`Công việc`}
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
                                    <Stack direction='row'>
                                        <Typography fontSize='15px' fontWeight={600}>Phân công nhân lực:</Typography>
                                        {carpenterIdsError && (<Typography fontSize='15px' fontWeight={600} color="error">{carpenterIdsError}</Typography>)}
                                        {carpentersId.length > 0 && (
                                            carpentersId.map((id, idx) => {
                                                const selectedWorker = listData.find(el => el.id === id.carpenterId);
                                                if (!selectedWorker) return null;
                                                return(
                                                    <Tooltip key={idx} title={selectedWorker?.fullName}>
                                                        <Avatar
                                                            src={selectedWorker?.avatarUrl || ''}
                                                            sx={{ borderRadius: '50%'}}
                                                        />
                                                    </Tooltip>
                                                )
                                            })
                                        )}
                                    </Stack>
                                    <IconButton
                                        tooltip="Mở dialog chọn nhân lực"
                                        handleFunt={handleOpenDialogChooseWorkers}
                                        icon={<Add/>}
                                        height={0}
                                        width={0}
                                        sx={{ pr: 1}}
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
                    )}
                </Grid>
                {workMileStone !== null && numberWorkMilestone.length > 0 && (
                    <WorkMilestone
                        formDataWorkMilestone={formDataWorkMilestone}
                        onInputChange={handleInputChangeWorkMilestone}
                        onBack={handleClose}
                        onSave={handleSave}
                        onStepErrors={handleStepErrors}
                        onWorkMilestoneErrors={handleWorkMilestoneErrors}
                        stepErrors={stepErrors}
                        workMilestoneErrors={workMilestoneErrors}
                    />
                )}
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
            {openDialogChooseWorkers && (
                <DialogChooseWorkers
                    open={openDialogChooseWorkers}
                    onClose={() => {
                        setOpenDialogChooseWorkers(false)
                    }}
                    onSave={handleSaveWorkers}
                    excludedIds={assignedWorkerIds}
                />
            )}
            {isSubmitting && (<Backdrop open={isSubmitting}/>)}
        </Box>
    )
}

export default JobInOrder;
import { AllInbox, Close, Inventory, Visibility } from "@mui/icons-material";
import { Alert, Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import React, { useState } from "react";
import Tabs from "../../components/Tabs";
import { useFetchData } from "@/hooks/useFetchData";
import { IOrder, IWorkMilestone } from "@/types/order";
import { getOrdersWithWorkByIdManager } from "@/services/order-service";
import useAuth from "@/hooks/useAuth";
import SearchBox from "../../components/SearchBox";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CardDataOrder from "../../Orders/components/CardDataOrder";
import { COLORS } from "@/constants/colors";
import CustomPagination from "@/components/Pagination/CustomPagination";
import DetailOrder from "../../Orders/components/DetailOrder";
import EvaluatedProductsInOrder from "../../Orders/components/EvaluatedProductsInOrder";
import DialogListImageProduct from "../../Orders/components/DialogListImageProduct";
import useBreakpoints from "@/hooks/useBreakpoints";
import CommonImage from "@/components/Image/index";
import proccess from "@/assets/images/users/proccess.jfif"
import { StatusOrder } from "@/constants/status";
import DialogStepsAndStepImages from "../../components/DialogStepsAndStepImages";
import WorkMilestones from "../../components/WorkMilestones";

const DataEvaluated: {id: number, value: string, label: string, icon: React.ReactNode}[] = [
    {
        id: 1,
        value: 'all',
        label: 'Tất cả',
        icon: <AllInbox/>
    },
    {
        id: 2,
        value: 'approved',
        label: 'Công việc đã đánh giá',
        icon: <Inventory/>

    },
    {
        id: 3,
        value: 'pending',
        label: 'Công việc chưa đánh giá',
        icon: <Inventory/>
    },
    {
        id: 4,
        value: 'rework',
        label: 'Công việc cần làm lại',
        icon: <Inventory/>
    },
]

const ManagementJobManager = () => {
    const { profile } = useAuth();
    const bp = useBreakpoints();
    const [viewMode, setViewMode] = useState<'all' | 'pending' | 'rework' | 'approved'>('all');
    const [viewOrder, setViewOrder] = useState(false);
    const [viewImageProducts, setViewImageProducts] = useState(false);
    const [viewProductsInOrder, setViewProductsInOrder] = useState(false);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [openViewImage, setOpenViewImage] = useState(false);
    const [openViewImageProductId, setOpenViewImageProductId] = useState<string | null>(null);
    const [workMilestones, setWorkMilestones] = useState<IWorkMilestone[]>([]);
    const [openStepsAndImageSteps, setOpenStepsAndImageSteps] = useState(false);
    const [idWorkMilestone, setIdWorkMilestone] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null)
    
    const { rowsPerPage, page, total, listData, loading, error, searchTerm, handlePageChange, handleSearch, fetchData } = useFetchData<IOrder>(getOrdersWithWorkByIdManager, 8, viewMode, profile?.id)

    const handleOpenViewOrder = (order: IOrder) => {
        setOrder(order);
        setViewOrder(true)
    }

    const handleCloseViewOrder = () => {
        setOrder(null);
        setViewOrder(false)
    }

    /* view products in order */
    const handleOpenViewProductsInOrder = (order: IOrder) => {
        setOrder(order);
        setViewProductsInOrder(true)
    }

    const handleCloseViewProductsInOrder = () => {
        setOrder(null);
        setViewProductsInOrder(false);
        fetchData(page, rowsPerPage, '', viewMode, profile?.id)
    }

    // view image products
    const handleOpenViewImageProducts = (order: IOrder) => {
      setOrder(order);
      setViewImageProducts(true)
    }

    const handleCloseViewImageProducts = () => {
      setOrder(null);
      setViewImageProducts(false)
    }

    const handleLoadData = () => {
        fetchData(page, rowsPerPage, '', viewMode, profile?.id)
    }

    const handleViewAllImageMilestone = (productId: string, workMilestones: IWorkMilestone[]) => {
        setOpenViewImageProductId(productId);
        setWorkMilestones(workMilestones)
    }

    return(
        <Box>
            {!viewProductsInOrder && (
                <>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên, mã đơn hàng"
                    />
                    <Box m={2}>
                        <Tabs data={DataEvaluated} viewMode={viewMode} onChange={setViewMode}/>
                    </Box>
                    {loading && <Backdrop open={loading}/>}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <>
                            <Grid container>
                                {listData.length === 0 ? (
                                    <Typography p={2} fontWeight={700}>Không tồn tại bản ghi nào</Typography>
                                ) : (
                                    listData.map((order, index) => (
                                        <Grid key={index} size={{ xs: 12 }}>
                                            <CardDataOrder
                                                order={order}
                                                onViewOrder={() => {}}
                                                onViewImageProducts={handleOpenViewImageProducts}
                                            >
                                                <Grid container spacing={1}>
                                                    {order.products.length > 0 && order.products.map((product, index) => {
                                                        return(
                                                            <Grid size={12} key='index'>
                                                                <Box flexDirection='row' display='flex' justifyContent='space-between'>
                                                                    <Stack direction='row'>
                                                                        <Typography fontSize='15px' fontWeight={500}>Sản phẩm {index + 1}:</Typography>
                                                                        <Typography fontSize='15px'>{product.name}</Typography>
                                                                    </Stack>
                                                                    {openViewImageProductId !== product.id && (
                                                                        <Tooltip title="Xem tất cả các hình ảnh của các mốc">
                                                                            <IconButton
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    product.workOrder.workMilestones && handleViewAllImageMilestone(product.id,product.workOrder.workMilestones)
                                                                                }}
                                                                                sx={{
                                                                                    '&:hover': {
                                                                                        bgcolor: 'transparent'
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Visibility/>
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    )}
                                                                    {openViewImageProductId === product.id && (
                                                                        <Tooltip title="Đóng tất cả các hình ảnh của các mốc">
                                                                            <IconButton
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation()
                                                                                    setOpenViewImageProductId(null)
                                                                                    setWorkMilestones([])
                                                                                }}
                                                                                sx={{
                                                                                    '&:hover': {
                                                                                        bgcolor: 'transparent'
                                                                                    }
                                                                                }}
                                                                            >
                                                                                <Close/>
                                                                            </IconButton>
                                                                        </Tooltip> 
                                                                    )}
                                                                </Box>
                                                                {openViewImageProductId !== product.id && (
                                                                <Grid container spacing={1}>
                                                                    {product?.workOrder?.workMilestones?.map((workMilestone, idx) => {
                                                                        const bgcolor = workMilestone.steps.every((el) => el.proccess === StatusOrder.PENDING) ? COLORS.STATUS.PENDING :
                                                                            workMilestone.steps.every((el) => el.proccess === StatusOrder.COMPLETED) ? COLORS.STATUS.COMPLETED : COLORS.STATUS.IN_PROGRESS                                                                        
                                                                        return(
                                                                        <>
                                                                            {bp ? (
                                                                                <Grid size={6} key={idx}>
                                                                                    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mb={2}>
                                                                                        <Button
                                                                                            sx={{ bgcolor: bgcolor, borderRadius: 2, mb: 1 }}
                                                                                        >
                                                                                            Mốc {idx + 1}: {workMilestone.name}
                                                                                        </Button>
                                                                                        <CommonImage
                                                                                            src={workMilestone.steps[0].images[0] ? workMilestone.steps[0].images[0].url : proccess}
                                                                                            sx={{ width: 200, height: '100%', borderRadius: 2 }}
                                                                                            handleFunt={(e) => {
                                                                                                e.stopPropagation()
                                                                                                setOpenStepsAndImageSteps(true)
                                                                                                setIdWorkMilestone(workMilestone.id)
                                                                                                setTitle(`Mốc ${index + 1}${workMilestone.name}`)
                                                                                            }}
                                                                                        />                                                                                
                                                                                    </Box>

                                                                                </Grid>
                                                                            ) : (
                                                                                <Grid sx={{ flex: 1, textAlign: 'center' }} key={idx}>
                                                                                    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' mb={2}>
                                                                                        <Button
                                                                                            sx={{ bgcolor: bgcolor, borderRadius: 2, mb: 1 }}
                                                                                        >
                                                                                            Mốc {idx + 1}: {workMilestone.name}
                                                                                        </Button>
                                                                                        <CommonImage
                                                                                            src={workMilestone.steps[0].images[0] ? workMilestone.steps[0].images[0].url : proccess}
                                                                                            sx={{ width: 200, height: 150, borderRadius: 2 }}
                                                                                            handleFunt={(e) => {
                                                                                                e.stopPropagation();
                                                                                                setOpenStepsAndImageSteps(true)
                                                                                                setIdWorkMilestone(workMilestone.id)
                                                                                                setTitle(`Mốc ${index + 1}${workMilestone.name}`)
                                                                                            }}
                                                                                        />
                                                                                    </Box>
                                                                                </Grid>
                                                                            )}
                                                                        </>                                                                        
                                                                        )
                                                                    })}
                                                                </Grid>
                                                                )}
                                                                {openViewImageProductId === product.id && (
                                                                    <Box>
                                                                        <WorkMilestones workMilestones={workMilestones}/>
                                                                        <Box mt={1} display='flex' justifyContent='center'>
                                                                            <Button
                                                                                variant="outlined"
                                                                                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON  }}
                                                                                onClick={() => {
                                                                                    setOpenViewImageProductId(null)
                                                                                    setWorkMilestones([])
                                                                                }}
                                                                            >
                                                                                Quay lại
                                                                            </Button>
                                                                        </Box>
                                                                    </Box>
                                                                )}
                                                            
                                                                {openStepsAndImageSteps && idWorkMilestone && title && (
                                                                    <DialogStepsAndStepImages
                                                                        open={openStepsAndImageSteps}
                                                                        id={idWorkMilestone}
                                                                        onClose={() => {
                                                                            setIdWorkMilestone(null);
                                                                            setOpenStepsAndImageSteps(false)
                                                                            setTitle(null)
                                                                        }}
                                                                        title={title}
                                                                    />
                                                                )}
                                                            </Grid>
                                                        )
                                                    })}
                                                </Grid>
                                                <Button
                                                    fullWidth
                                                    sx={{ bgcolor: COLORS.BUTTON, borderRadius: 3 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        order && handleOpenViewProductsInOrder(order)
                                                    }}
                                                >
                                                    Xem chi tiết
                                                </Button>
                                            </CardDataOrder>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                            <Box mt={1.5} display='flex' justifyContent='center'>
                                <CustomPagination
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    count={total}
                                    onPageChange={handlePageChange}
                                />
                            </Box>
                        </>
                    )}
                </>
            )}
            {viewOrder && order && (
                <DetailOrder
                    open={viewOrder}
                    data={order}
                    onClose={handleCloseViewOrder}
                />
            )}
            {viewProductsInOrder && order && (
                <EvaluatedProductsInOrder
                    data={order}
                    onBack={handleCloseViewProductsInOrder}
                    from='job'
                    onLoadData={handleLoadData}
                />
            )}
            {viewImageProducts && order && (
                <DialogListImageProduct
                    order={order}
                    onClose={handleCloseViewImageProducts}
                    open={viewImageProducts}
                />
            )}
        </Box>
    )
}

export default ManagementJobManager;
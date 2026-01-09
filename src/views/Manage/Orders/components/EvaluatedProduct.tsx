import { IProduct, IProductReview, PayloadEvaluationProduct } from "@/types/product";
import { Avatar, Box, Button, Chip, Divider, Paper, Rating, Stack, Tooltip, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { IOrder, IWorkOrder } from "@/types/order";
import { getEvaluatedProductLabelAndColor, getStatusOrderLabel } from "@/utils/labelEntoVni";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useMemo, useState } from "react";
import { evaluationProduct, getDataProductReviewByIdProduct, getDetailWorkOrderByProduct } from "@/services/product-service";
import CommonImage from "@/components/Image/index";
import DateTime from "@/utils/DateTime";
import { Brush, Rule, SentimentSatisfiedAlt, Star } from "@mui/icons-material";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import useNotification from "@/hooks/useNotification";

interface EvaluatedProductProps{
    data: IProduct,
    onBack: () => void;
    order: IOrder
}

type ReviewKey = 'overallQuality' | 'aesthetics' | 'customerRequirement' | 'satisfaction';

interface ReviewItem {
    key: ReviewKey;
    label: string;
    icon: React.ReactNode
}

const REVIEW_ITEMS: ReviewItem[] = [
    {
        key: 'overallQuality',
        label: 'Chất lượng tổng thể',
        icon: <Star color='warning'/>
    },
    {
        key: 'aesthetics',
        label: 'Tính thẩm mỹ',
        icon: <Brush color='primary'/>
    },
    {
        key: 'customerRequirement',
        label: 'Đúng yêu cầu khách hàng',
        icon: <Rule color='success'/>
    },
    {
        key: 'satisfaction',
        label: 'Mức độ hài lòng',
        icon: <SentimentSatisfiedAlt color='secondary'/>
    }
]


const EvaluatedProduct = (props: EvaluatedProductProps) => {
    const { data, onBack, order } = props;
    const notify = useNotification();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [workOrder, setWorkOrder] = useState<IWorkOrder | null>(null);
    const [reviews, setReviews] = useState<Record<ReviewKey, number | null>>({
        overallQuality: null,
        aesthetics: null,
        customerRequirement: null,
        satisfaction: null
    });

    const [reviewsErrors, setReviewsErrors] = useState<Record<ReviewKey, string | null>>({
        overallQuality: null,
        aesthetics: null,
        customerRequirement: null,
        satisfaction: null
    });
    const [comment, setComment] = useState<string | null>(null);

    const handleBack = () => {
        onBack();
        setComment(null)
        setReviewsErrors({
            overallQuality: null,
            aesthetics: null,
            customerRequirement: null,
            satisfaction: null
        })
    }

    const getProductReviewByIdProduct = async(id: string) => {
        try {
            const res = await getDataProductReviewByIdProduct(id);
            const data = res.data as any as IProductReview;
            setReviews({
                overallQuality: data.overallQuality,
                aesthetics: data.overallQuality,
                customerRequirement: data.overallQuality,
                satisfaction: data.overallQuality
            })
            setComment(data.comment)
        } catch (error: any) {
            
        }
    }

    const getWorkOrderByIdProduct = async(id: string) => {
        try {
            const res = await getDetailWorkOrderByProduct(id);
            const data = res.data as any as IWorkOrder;
            setWorkOrder(data);          
        } catch (error: any) {
        }
    }

    useEffect(() => {
        getWorkOrderByIdProduct(data.id);
        getProductReviewByIdProduct(data.id)
    }, [data]);

    const isReadonly = false; // 🔒 set true khi đã duyệt
    
    const averageScore = useMemo(() => {
        const values = Object.values(reviews).filter(
            (item): item is number => item !== null
        );
        if(!values.length) return 0;
        return (
            values.reduce((total, item) => total + item, 0) / values.length
        ).toFixed(1);
    }, [reviews])

    const normalizeDate = (date: string) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const getSLA = (completedDate: string | null, dateOfPayment: string): string => {
        if(!completedDate) return '';
        const completed = normalizeDate(completedDate);
        const payment = normalizeDate(dateOfPayment);
        return payment.getTime() >= completed.getTime()
            ? 'Đúng hạn'
            : 'Trễ hạn';
    }

    const validateSubmit = (): boolean => {
        const newErrors: Record<ReviewKey, string | null> = { overallQuality: null,aesthetics: null,customerRequirement: null, satisfaction: null }
        if(!reviews.overallQuality) newErrors.overallQuality = 'Vui lòng chọn chất lượng tổng thể';
        if(!reviews.aesthetics) newErrors.aesthetics = 'Vui lòng chọn tính thẩm mỹ';
        if(!reviews.customerRequirement) newErrors.customerRequirement = 'Vui lòng chọn đúng yêu cầu khách hàng';
        if(!reviews.satisfaction) newErrors.satisfaction = 'Vui lòng chọn mức độ hài lòng';

        setReviewsErrors(newErrors);
        const errors = Object.values(newErrors).filter(
            (item): item is string => item !== null
        );

        return errors.length === 0
    }

    const handleApprove = async () => {
        if(!validateSubmit()){
            return;
        }
        setIsSubmitting(true);
        const payload: PayloadEvaluationProduct = {
            reviews: reviews,
            comment: comment !== null ? comment : null,
            averageScore: averageScore,
            orderId: order.id
        }
        try {
            const res = await evaluationProduct(data.id, payload);
            notify({
                message: res.message,
                severity: 'success'
            })
            handleBack()
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
            <NavigateBack
                title="Đánh giá sản phẩm"
                onBack={handleBack}
            />
            <Paper elevation={2} sx={{ borderRadius: 3, p: 2, mx: 1.5, mb: 1.5 }}>
                {/* Header */}
                <Stack spacing={2} mb={3} >
                    <Typography fontSize='16px'>
                        Mã ĐH: <b>{order.codeOrder}</b>
                    </Typography>
                    <Typography fontSize='16px'>
                        Khách hàng: <b>{order.customer.name}</b>
                    </Typography>
                    <Chip label={getStatusOrderLabel(order.status)} color="warning" size="small" />
                </Stack>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }} sx={{ borderBottom: { xs: '1px solid #000', md: 'none'}}}>
                        <Stack spacing={2} direction='column'>
                            <Typography variant="h6" fontWeight={600}>
                                Thông tin sản phẩm
                            </Typography>
                            <Stack direction='row'>
                                <Typography fontSize='16px'>Tên sản phẩm:</Typography>
                                <Typography fontSize='16px' fontWeight={600}>{data.name}</Typography>
                                <Chip
                                    label={getEvaluatedProductLabelAndColor(data.isEvaluated).label}
                                    color={getEvaluatedProductLabelAndColor(data.isEvaluated).color}
                                />
                            </Stack>
                            <CommonImage
                                sx={{ objectFit: 'cover', height: 300, width: '100%' }}
                                src={data.urlImage}
                                alt={data.name}
                            />
                            <Box display='flex' flexDirection='row'>
                                <Typography mr={1.5} display='flex' justifyContent='center' alignItems="center" fontSize='16px'>Người làm: </Typography>
                                {workOrder && workOrder.workers.map((worker, idx) => (
                                    <Tooltip key={idx} title={worker.fullName}>
                                        <Avatar
                                            src={worker.avatarUrl}
                                            sx={{ borderRadius: '50%'}}
                                        />
                                    </Tooltip>
                                ))}
                            </Box>
                            <Stack direction='row'>
                                <Typography fontSize='16px'>Ngày bàn giao cho khách:</Typography>
                                <Typography fontSize='16px' fontWeight={600}>{DateTime.FormatDate(order.dateOfPayment)}</Typography>
                            </Stack>
                            <Stack direction='row'>
                                <Typography fontSize='16px'>Ngày hoàn thành sản phẩm:</Typography>
                                <Typography fontSize='16px' fontWeight={600}>{DateTime.FormatDate(data.completedDate)}</Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Stack spacing={2} direction='column'>
                            <Typography variant="h6" fontWeight={600}>
                                Đánh giá chi tiết (rating + nhận xét)
                            </Typography>
                            {REVIEW_ITEMS.map((item, idx) => {
                                return (
                                    <Stack
                                        key={idx}
                                        direction='column'
                                        pl={2}
                                    >
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {item.icon}
                                            <Typography fontSize='18px' fontWeight={500}>
                                                {item.label}
                                            </Typography>
                                        </Stack>
                                        <Rating
                                            name={item.key}
                                            readOnly={isReadonly}
                                            precision={1}
                                            value={reviews[item.key]}
                                            onChange={(_, newValue) => {
                                                setReviews(prev => ({
                                                    ...prev,
                                                    [item.key]: newValue
                                                }));
                                                if(reviewsErrors){
                                                    setReviewsErrors(prev => ({
                                                        ...prev,
                                                        [item.key]: null
                                                    }))
                                                }
                                            }}
                                        />
                                        {reviewsErrors && (
                                            <Typography fontSize='15px' color="error">{reviewsErrors[item.key]}</Typography>
                                        )}
                                    </Stack>
                                )
                            })}
                            <Divider />
                            <InputText
                                label="Nhận xét của quản lý"
                                type="text"
                                value={comment}
                                name="comment"
                                onChange={(name: string, value: any) => { setComment(value) }}
                                multiline
                                rows={5}
                                placeholder="Nhập nhận xét, yêu cầu chỉnh sửa nếu có..."
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
            <Paper elevation={2} sx={{ borderRadius: 3, p: 2, mx: 1.5, mb: 1.5 }}>
                <Stack spacing={2} direction='column'>
                    <Typography variant="h6" fontWeight={600}>
                        Tổng kết đánh giá
                    </Typography>
                    <Stack direction='row'>
                        <Typography fontSize='16px'>Điểm TB:</Typography>
                        <Typography fontSize='16px' fontWeight={600}>{averageScore}/5</Typography>
                    </Stack>
                    <Stack direction='row'>
                        <Typography fontSize='16px'>SLA:</Typography>
                        <Typography fontSize='16px' fontWeight={600}>{getSLA(data.completedDate, order.dateOfPayment)}</Typography>
                    </Stack>
                </Stack>
            </Paper>
            {!data.isEvaluated && (
                <Box mb={2} display='flex' justifyContent='center'>
                    <Button
                        sx={{ bgcolor: COLORS.BUTTON, width: 150 }}
                        onClick={handleApprove}
                    >
                        Duyệt bàn giao
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default EvaluatedProduct;
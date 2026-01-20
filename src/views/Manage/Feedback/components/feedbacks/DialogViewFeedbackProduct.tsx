import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";
import CommonVideo from "@/components/Video";
import useAuth from "@/hooks/useAuth";
import { IProduct } from "@/types/product";
import DateTime from "@/utils/DateTime";
import { formatDuration } from "@/utils/file";
import { getFeedbackStatusInProductLabelAndColor } from "@/utils/labelEntoVni";
import { VideoCameraBack } from "@mui/icons-material";
import { Box, Chip, Divider, Rating, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface DialogViewFeedbackProductProps{
    open: boolean,
    onClose: () => void;
    product: IProduct
}

const DialogViewFeedbackProduct = (props: DialogViewFeedbackProductProps) => {
    const { open, onClose, product } = props;
    const { profile } = useAuth();
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            isActiveFooter={false}
            dialogTitle="Chi tiết phản hồi"
            maxWidth={'md'}
        >
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <CommonImage
                        src={product.urlImage}
                        alt={product.nameImage}
                        sx={{ height: 350 }}
                    />
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'center' }} size={{ xs: 12, md: 7 }}>
                    <Box gap={1} display='flex' flexDirection='column'> 
                        <Typography variant="h5" fontWeight={600}>{product.name}</Typography>
                        <Stack direction='row'>
                            <Typography fontSize='15px' fontWeight={600}>Đơn hàng: </Typography>
                            <Typography fontSize='15px'>{product.order.name}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize='15px' fontWeight={600}>Khách hàng: </Typography>
                            <Typography fontSize='15px'>{product.order.customer.name} - {product.order.customer.phone}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize='15px' fontWeight={600}>Đánh giá: </Typography>
                            <Rating value={product.feedback.rating}/>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize='15px' fontWeight={600}>Ý kiến khách hàng: </Typography>
                            <Typography fontSize='15px'>{product.feedback.customerFeedbackText}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize='15px' fontWeight={600}>Ghi chú nội bộ: </Typography>
                            <Typography fontSize='15px'>{product.feedback.staffNote}</Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Typography fontSize='15px' fontWeight={600}>Trạng thái: </Typography>
                            <Chip
                                label={getFeedbackStatusInProductLabelAndColor(product.feedback.status).label}
                                color={getFeedbackStatusInProductLabelAndColor(product.feedback.status).color}
                            />
                        </Stack>
                        <Typography variant="caption" color="text.secondary">Nhân viên nhập: {profile?.fullName} - {DateTime.FormatDate(product.feedback.feedbackDate)}</Typography>
                        <Divider sx={{ my: 2 }} />
                        {product.feedback.images.length > 0 && product.feedback.video !== null && (
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                        <CommonVideo
                                            src={product.feedback.video.url}
                                            sx={{ height: 150, width: '100%' }}
                                            borderRadius={0}
                                        />
                                        <Box sx={{ position: 'absolute', bgcolor: 'rgba(0,0,0,0.5)', bottom: 7, width: '100%' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 0.5, mt: 0.5 }}>
                                                <VideoCameraBack sx={{ color: '#fff' }}/>
                                                <Typography variant="subtitle2" sx={{ color: '#fff' }}>{formatDuration(product.feedback.video.duration)}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                {product.feedback.images.map((image, index) => (
                                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                                        <CommonImage
                                            src={image.url}
                                            sx={{ height: 150, width: '100%' }}
                                            borderRadius={0}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </DialogComponent>
    )
}

export default DialogViewFeedbackProduct;
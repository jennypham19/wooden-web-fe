import { useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Rating,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import { IProduct } from "@/types/product";
import NavigateBack from "../../components/NavigateBack";
import CommonImage from "@/components/Image/index";
import useAuth from "@/hooks/useAuth";
import DateTime from "@/utils/DateTime";
import dayjs from "dayjs";
import InputText from "@/components/InputText";
import { CameraAlt, VideoCameraBack } from "@mui/icons-material";
import { COLORS } from "@/constants/colors";
import { resizeImage } from "@/utils/common";
import ImagesAndVideo from "./images/ImagesAndVideo";
import Grid from "@mui/material/Grid2"
import { formatDuration, getVideoDuration } from "@/utils/file";
import ViewFeedbackUnderRatingFiveStar from "./feedbacks/ViewFeedbackUnderRatingFiveStar";
import useNotification from "@/hooks/useNotification";
import { PayloadFeedbackConfirmed, PayloadFeedbackDraft, PayloadImagesFile, PayloadVideoFile, StaffFeedbackItem } from "@/types/feedback";
import { saveFeedbackConfirmed, saveFeedbackDraft } from "@/services/feedback-service";
import Backdrop from "@/components/Backdrop";
import { uploadImages, uploadVideo } from "@/services/upload-service";

interface StaffOrderFeedbackProps{
  onBack: () => void;
  product: IProduct
}

type ErrorsStaffFeedbackItem = {
  [K in keyof StaffFeedbackItem]?: string
}

const StaffOrderFeedback = (props: StaffOrderFeedbackProps) => {
  const { onBack, product } = props;
  const { profile } = useAuth();
  const notify = useNotification();

  // state boolean
  const [isSubmitting, setIsSubmitting] = useState(false);

  // state data
  const fileImagesInputRef = useRef<HTMLInputElement>(null);
  const fileVideoInputRef = useRef<HTMLInputElement>(null);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [fileVideo, setFileVideo] = useState<File | null>(null);
  const [urlImages, setUrlImages] = useState<string[]>([]);
  const [urlVideo, setUrlVideo] = useState<string | null>(null);
  const [errorVideo, setErrorVideo] = useState<string | null>(null);
  const [errorImage, setErrorImage] = useState<string | null>(null);

  const [duration, setDuration] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [errors, setErrors] = useState<ErrorsStaffFeedbackItem>({})

  const [item, setItem] = useState<StaffFeedbackItem>({
    rating: null,
    customerFeedbackText: '',
    staffNote: null
  });

  const reset = () => {
    setItem({ rating: null, customerFeedbackText: '', staffNote: null });
    setFileImages([]);
    setFileVideo(null);
    setUrlImages([]);
    setUrlVideo(null);
    setRating(null);
    setErrorImage(null);
    setErrorVideo(null);
  }

  const handleClose = () => {
    onBack()
    reset()
  }

  /* Xử lý ảnh và video */
  const handleBoxClickImage = () => {
    fileImagesInputRef.current?.click();
  };

  const handleBoxClickVideo = () => {
    fileVideoInputRef.current?.click();
  };

  const handleFileImagesChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if(files){
      const resized = await Promise.all(
        Array.from(files).map(async (file) => {
          return resizeImage(file, 800)
        })
      );
      const resizedFiles = resized.map((r) => new File([r.blob], r.name!, { type: "image/jpeg" }))
      setFileImages(prev => {
        const newFileImages = [...(prev || []), ...resizedFiles];
        return newFileImages;
      })
      const urls = resized.map((file) => file.previewUrl);
      setUrlImages((prev) => [...prev, ...urls]);
    }
    event.target.value = "";
  }

  const handleFileVideoChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        // update file
        setFileVideo(file);
        const url = URL.createObjectURL(file);
        setUrlVideo(url);
        const duration = await getVideoDuration(file);
        setDuration(formatDuration(duration));
    }
    event.target.value = "";
  }

  const handleRemoveImage = (index: number) => {
    setUrlImages((prev) => prev.filter((_, i) => i !== index))
    const newFiles = (fileImages || []).filter((_, i) => i !== index);
    setFileImages(newFiles);

    if (fileImagesInputRef.current) {
        fileImagesInputRef.current.value = "";
    }
  };

  const handleRemoveVideo = () => {
    setUrlVideo(null)
    setFileVideo(null);

    if (fileVideoInputRef.current) {
        fileVideoInputRef.current.value = "";
    }
  };
  /* Xử lý ảnh và video */

  const handleInputChange = (name: string,value: any) => {
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  /* Xác nhận phản hồi */
  const validateSubmitConfirmed = (): boolean => {
    const newErrors: ErrorsStaffFeedbackItem = {};
    if(!item.rating) newErrors.rating = 'Vui lòng chọn mức độ hài lòng';
    if(!item.customerFeedbackText) newErrors.customerFeedbackText = 'Vui lòng nhập ý kiến khách hàng';
    if(fileImages.length === 0){
      setErrorImage('Vui lòng upload ảnh')
    }
    if(!fileVideo){
      setErrorVideo('Vui lòng upload video')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 && fileImages.length > 0 && fileVideo !== null;
  }

  const handleSave = async() => {
    if(!validateSubmitConfirmed()){
      return;
    }
    setIsSubmitting(true);
    try {
      let uploadResponse: any;
      let uploadResponses: any;
      /* upload video */
      uploadResponse = await uploadVideo(fileVideo!, 'feedback/videos');
      if(!uploadResponse.success || !uploadResponse.data.file){
        throw new Error('Upload video thất bại hoặc không nhận được URL video'); 
      }
      /* upload images */
      uploadResponses = await uploadImages(fileImages, 'feedback/images');
      if(!uploadResponses.success || uploadResponses.data.files.length === 0){
        throw new Error('Upload ảnh thất bại hoặc không nhận được URL ảnh');
      }
      const payloadVideoFile: PayloadVideoFile = {
        name: uploadResponse.data.file.originalname,
        url: uploadResponse.data.file.videoUrl,
        duration: uploadResponse.data.file.duration
      }

      const payloadImagesFile: PayloadImagesFile[] = uploadResponses.data.files.map((file: any) => ({
        name: file.originalname,
        url: file.url
      }))

      const payload: PayloadFeedbackConfirmed = {
        rating: item.rating ? item.rating : null,
        customerFeedbackText: item.customerFeedbackText ? item.customerFeedbackText : '',
        orderId: product.order.id,
        productId: product.id,
        customerId: product.order.customer.id,
        staffId: profile ? profile.id : null,
        feedbackDate: dayjs().toISOString(),
        images: payloadImagesFile,
        video: payloadVideoFile
      }
      const res = await saveFeedbackConfirmed(payload);
      notify({
        message: res.message,
        severity: 'success'
      })
      handleClose()
    } catch (error: any) {
      notify({
        message: error.message,
        severity: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  };

  /* Lưu nháp */
  const validateSubmitDraft = (): boolean => {
    const newErrors: ErrorsStaffFeedbackItem = {};
    if(!item.rating) newErrors.rating = 'Vui lòng chọn mức độ hài lòng';
    if(!item.customerFeedbackText) newErrors.customerFeedbackText = 'Vui lòng nhập ý kiến khách hàng';
    if(!item.staffNote) newErrors.staffNote = 'Vui lòng nhập ghi chú nội bộ';
    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0;
  }
  const handleSaveDraft = async() => {
    if(!validateSubmitDraft()){
      return;
    }
    setIsSubmitting(true);
    try {
      const payload: PayloadFeedbackDraft = {
        rating: item.rating ? item.rating : null,
        customerFeedbackText: item.customerFeedbackText ? item.customerFeedbackText : '',
        staffNote: item.staffNote ? item.staffNote : null,
        orderId: product.order.id,
        productId: product.id,
        customerId: product.order.customer.id,
        staffId: profile ? profile.id : null,
        feedbackDate: dayjs().toISOString()
      }
      const res = await saveFeedbackDraft(payload);
      notify({
        message: res.message,
        severity: 'success'
      })
      handleClose()
    } catch (error: any) {
      notify({
        message: error.message,
        severity: 'error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box>
      <NavigateBack
        title="Ghi nhận phản hồi khách hàng"
        onBack={handleClose}
      />
      <Box display='flex' justifyContent='center'>
        <Box>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Ghi nhận phản hồi khách hàng {product.order.customer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Đơn hàng: <b>{product.order.codeOrder}</b>
              </Typography>
            </Box>

            <Chip label="Nhân viên nhập" color="info" />
          </Stack>

          <Stack spacing={2}>
              <Card variant="outlined" sx={{ width: { xs: '100%', md: 650 } }}>
                <CardContent>
                  {/* Product */}
                  <Stack direction="row" spacing={2}>
                    <CommonImage
                      src={product.urlImage}
                      sx={{ width: 120, height: 120 }}
                    />
                    <Box flex={1}>
                      <Typography fontWeight={500}>
                        {product.name}
                      </Typography>

                      {/* Rating */}
                      <Box gap={0.5} mt={1} display='flex' flexDirection='column'>
                        <Typography variant="caption" color="text.secondary">
                          Mức độ hài lòng theo phản hồi khách
                        </Typography>
                        <Rating
                          value={item.rating}
                          onChange={(_, value) => {
                            handleInputChange("rating", value)
                            setRating(value)
                          }}
                          size="large"
                        />
                        {errors.rating && (
                          <Typography variant="caption" color="error">{errors.rating}</Typography>
                        )}
                      </Box>
                    </Box>
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Grid container>
                    <Grid size={{ xs: 12 }}>
                      {/* Customer feedback */}
                      <InputText
                        label="Ý kiến khách hàng"
                        multiline
                        rows={3}
                        type="text"
                        value={item.customerFeedbackText}
                        name="customerFeedbackText"
                        onChange={handleInputChange}
                        placeholder="Ghi lại nguyên văn phản hồi của khách..."
                        error={!!errors.customerFeedbackText}
                        helperText={errors.customerFeedbackText}
                      />
                    </Grid>
                    {rating !== null && rating < 4 && (
                      <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
                        <ViewFeedbackUnderRatingFiveStar
                          item={item.staffNote ?? null}
                          onInputChange={handleInputChange}
                          error={errors.staffNote ?? undefined}
                        />
                      </Grid>
                    )}
                    {(rating === null || rating > 3) && (
                      <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
                        {/* Upload */}
                        {/* Khi upload ảnh hoặc video hoặc cả hai */}
                        {(urlImages.length > 0 || urlVideo !== null || (urlImages.length > 0 && urlVideo !== null)) ? (
                          <ImagesAndVideo
                            imagesUrl={urlImages}
                            videoUrl={urlVideo}
                            onBoxClickVideo={handleBoxClickVideo}
                            onBoxClickImage={handleBoxClickImage}
                            onFileVideoChange={handleFileVideoChange}
                            onFileImagesChange={handleFileImagesChange}
                            imagesRef={fileImagesInputRef}
                            videoRef={fileVideoInputRef}
                            onRemoveVideo={handleRemoveVideo}
                            onRemoveImages={handleRemoveImage}
                            duration={duration}
                          />
                        ) : (
                          <Box gap={2} width='100%' display='flex' justifyContent='space-between' pt={1} mt={2} my={1}>
                            <Box width='50%'>
                              <input ref={fileImagesInputRef} hidden type="file" capture="environment" multiple accept="image/*" onChange={handleFileImagesChange}/>
                              <Box
                                onClick={handleBoxClickImage}
                                sx={{
                                  border: errorImage !== null ? '1px solid #e41717' : `1px solid ${COLORS.BUTTON}`,
                                  p: 3,
                                  cursor: 'pointer',
                                  '&:hover': { borderColor: 'primary.main' },
                                  height: 100,
                                  display: 'flex',
                                  justifyContent: 'center'
                                }}
                              >
                                <Stack direction='column' alignItems='center'>
                                  <CameraAlt sx={{ fontSize: 30, color: 'text.secondary' }} />
                                  <Typography variant="caption">Thêm Hình ảnh</Typography>
                                </Stack>
                              </Box>
                              {errorImage && (
                                <Typography variant="caption" color='error'>{errorImage}</Typography>
                              )}
                            </Box>
                            <Box width='50%'>
                              <input ref={fileVideoInputRef} hidden type="file" multiple capture="environment" accept="video/*" onChange={handleFileVideoChange}/>
                              <Box
                                onClick={handleBoxClickVideo}
                                sx={{
                                  border: errorVideo !== null ? '1px solid #e41717' : `1px solid ${COLORS.BUTTON}`,
                                  p: 3,
                                  cursor: 'pointer',
                                  '&:hover': { borderColor: 'primary.main' },
                                  height: 100,
                                  display: 'flex',
                                  justifyContent: 'center'
                                }}
                              >
                                <Stack direction='column' alignItems='center'>
                                  <VideoCameraBack sx={{ fontSize: 30, color: 'text.secondary' }} />
                                  <Typography variant="caption">Thêm Video</Typography>
                                </Stack>
                              </Box>
                              {errorVideo && (
                                <Typography variant="caption" color='error'>{errorVideo}</Typography>
                              )}
                            </Box>
                          </Box>                    
                        )}
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Ảnh, video do nhân viên chụp / khách cung cấp
                        </Typography>                      
                      </Grid>
                    )}
                  </Grid>
              </CardContent>
            </Card>
          </Stack>

          {/* Footer */}
          <Stack
            direction="column"
            mt={2}
          >
            <Typography variant="caption" color="text.secondary">
              Người nhập: {profile?.fullName} · {DateTime.Format(dayjs())}
            </Typography>

            <Stack direction="row" justifyContent='center' spacing={1}>
              <Button disabled={rating !== null && rating > 3 } variant="outlined" sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 150 }} onClick={handleSaveDraft}>Lưu nháp</Button>
              <Button disabled={rating !== null && rating < 4} variant="contained" sx={{ bgcolor: COLORS.BUTTON, width: 150 }} onClick={handleSave}>
                Xác nhận phản hồi
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
      {isSubmitting && (
        <Backdrop open={isSubmitting} />
      )}
    </Box>
  );
}

export default StaffOrderFeedback;

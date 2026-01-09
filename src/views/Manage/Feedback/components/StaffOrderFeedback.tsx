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

interface StaffOrderFeedbackProps{
  onBack: () => void;
  product: IProduct
}

interface StaffFeedbackItem {
  rating: number | null;
  customerFeedbackText: string;
  staffNote: string | null
}


const StaffOrderFeedback = (props: StaffOrderFeedbackProps) => {
  const { onBack, product } = props;
  const { profile } = useAuth();

  const fileImagesInputRef = useRef<HTMLInputElement>(null);
  const fileVideoInputRef = useRef<HTMLInputElement>(null);
  const [fileImages, setFileImages] = useState<File[]>([]);
  const [fileVideo, setFileVideo] = useState<File | null>(null);
  const [urlImages, setUrlImages] = useState<string[]>([]);
  const [urlVideo, setUrlVideo] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null)

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
    setUrlVideo(null)
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

  const handleSave = () => {
    console.log("STAFF_FEEDBACK_SUBMIT:", item);
  };

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
                      <Box mt={1} display='flex' flexDirection='column'>
                        <Typography variant="caption" color="text.secondary">
                          Mức độ hài lòng theo phản hồi khách
                        </Typography>
                        <Rating
                          value={item.rating}
                          onChange={(_, value) =>
                            handleInputChange("rating", value)
                          }
                          size="large"
                        />
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
                      />
                    </Grid>
                    <Grid sx={{ mt: 2 }} size={{ xs: 12 }}>
                      {/* Ghi chú nội bộ */}
                      <InputText
                        label="Ghi chú nội bộ"
                        multiline
                        rows={3}
                        type="text"
                        value={item.staffNote}
                        name="staffNote"
                        onChange={handleInputChange}
                        placeholder="Ghi lại những mục cần chú ý (nếu có)..."
                      />
                    </Grid>
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
                                border: `1px solid ${COLORS.BUTTON}`,
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
                          </Box>
                          <Box width='50%'>
                            <input ref={fileVideoInputRef} hidden type="file" multiple capture="environment" accept="video/*" onChange={handleFileVideoChange}/>
                            <Box
                              onClick={handleBoxClickVideo}
                              sx={{
                                border: `1px solid ${COLORS.BUTTON}`,
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
              <Button variant="outlined" sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, width: 150 }}>Lưu nháp</Button>
              <Button variant="contained" sx={{ bgcolor: COLORS.BUTTON, width: 150 }} onClick={handleSave}>
                Xác nhận phản hồi
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default StaffOrderFeedback;

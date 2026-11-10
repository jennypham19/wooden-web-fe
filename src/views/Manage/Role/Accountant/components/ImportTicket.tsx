import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import DateTime from "@/utils/DateTime";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import { ArrowBack, CheckCircle, Close, CloudUploadOutlined, InsertLink, Search } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";

const GREEN = COLORS.BUTTON;
const BLUE = "#2F6FE7";

interface ImportTicketProps {
    onBack: () => void;
}

const inputSx = { "& .MuiOutlinedInput-root": { borderRadius: 2.5, bgcolor: "#fff" } };

/* ------------------------- helpers ------------------------- */
const Field = ({
    label,
    placeholder = "Typing...",
    select,
    options,
    endText,
}: {
    label: string;
    placeholder?: string;
    select?: boolean;
    options?: string[];
    endText?: string;
}) => (
    <Box>
        <Typography variant="body2" fontWeight={500} mb={0.5}>{label}</Typography>
        <TextField
            fullWidth
            size="small"
            select={select}
            defaultValue={select ? "" : ""}
            placeholder={placeholder}
            sx={inputSx}
            SelectProps={{ displayEmpty: true }}
            InputProps={endText ? { endAdornment: <InputAdornment position="end">{endText}</InputAdornment> } : undefined}
        >
            {select && <MenuItem value="" disabled>{placeholder}</MenuItem>}
            {options?.map((o) => (
                <MenuItem key={o} value={o}>{o}</MenuItem>
            ))}
        </TextField>
    </Box>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card sx={{ borderRadius: 4, boxShadow: 2 }}>
        <CardContent sx={{ p: 3 }}>
            <Grid container spacing={2} mb={2}>
                <Grid size={{ xs: 12, lg: 7 }}>
                    <Typography variant="h6" fontWeight={700}>{title}</Typography>
                </Grid>
                <Grid size={{ xs: 12, lg: 5 }}>
                    <InputText
                        label="Thời gian"
                        name=""
                        value={DateTime.Format(dayjs())}
                        onChange={() => {}}
                        type="text"
                        disabled
                    />
                </Grid>
            </Grid>
            {children}
        </CardContent>
    </Card>
);

const UploadedFile = () => (
    <Box display="flex" alignItems="center" gap={1.5} p={1.5} border="1px solid #eee" borderRadius={3}>
        <Box width={40} height={40} borderRadius={2} bgcolor={`${BLUE}1A`} color={BLUE} display="flex" alignItems="center" justifyContent="center" flexShrink={0}>
            <InsertLink />
        </Box>
        <Box flexGrow={1}>
            <Typography variant="body2" fontWeight={600}>Hình ảnh nhận hàng 1.jpg</Typography>
            <Stack direction="row" gap={0.5} alignItems="center">
                <CheckCircle sx={{ fontSize: 14, color: GREEN }} />
                <Typography variant="caption" color="text.secondary">tải lên thành công</Typography>
            </Stack>
        </Box>
        <IconButton size="small"><Close fontSize="small" /></IconButton>
    </Box>
);

const ImportTicket = ({ onBack }: ImportTicketProps) => {
    return (
        <Box px={{ xs: 2, md: 3 }} py={{ xs: 2, md: 2 }} bgcolor="#F7F8F4">
            {/* ----------------- header ----------------- */}
            <NavigateBack
                onBack={onBack}
                title="Tạo phiếu nhập kho"
            />
            <Grid container spacing={3} mt={2}>
                {/* ===== left column ===== */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Stack gap={3} direction='column'>
                        {/* thông tin chứng từ */}
                        <SectionCard title="Thông tin chứng từ giao nhận">
                            <Typography variant="subtitle1" fontWeight={700} mb={1.5}>Nhà cung cấp/ đối tác</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Field label="Tên công ty" />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Mã số thuế" /></Grid>
                                <Grid size={{ xs: 12 }}><Field label="Địa chỉ" /></Grid>
                            </Grid>

                            <Typography variant="subtitle1" fontWeight={700} mt={3} mb={1.5}>Giao hàng</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Tên tài xế" /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Biển số (nếu cần)" /></Grid>
                                <Grid size={{ xs: 12 }}><Field label="Số lượng tài xế kê khai" /></Grid>
                            </Grid>

                            <Typography variant="subtitle1" fontWeight={700} mt={3} mb={1.5}>Nhân sự phụ trách</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Tên người kiểm kê" select options={["Nhân viên 01", "Nhân viên 02"]} /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Tên kế toán" select options={["Trang Nguyễn", "Kế toán 02"]} /></Grid>
                                <Grid size={{ xs: 12 }}><Field label="Tình trạng kiểm tra" select options={["Đã kiểm tra", "Chưa kiểm tra"]} /></Grid>
                            </Grid>
                        </SectionCard>

                        {/* bảng đối chiếu */}
                        <SectionCard title="Bảng đối chiếu vật tư">
                            <Typography variant="subtitle1" fontWeight={700} mb={1.5}>Bảng đối chiếu</Typography>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Ngày nhập" placeholder="Thời gian" select options={["Hôm nay", "Hôm qua"]} /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Số lượng nhập" /></Grid>
                                <Grid size={{ xs: 12 }}><Field label="Tên vật tư" /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Số lượng kiểm hàng" /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Tình trạng đơn hàng" select options={["Trùng khớp", "Chênh lệch"]} /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Đơn giá" placeholder="" endText="VNĐ" /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><Field label="Thành tiền" placeholder="" endText="VNĐ" /></Grid>
                            </Grid>
                        </SectionCard>
                    </Stack>
                </Grid>

                {/* ===== right column: hình ảnh ===== */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <SectionCard title="Hình ảnh">
                        <Stack gap={2} direction='column'>
                            <Field label="Người nhận hàng" />
                            <Field label="Ghi chú" />

                            {/* dropzone */}
                            <Box
                                p={3}
                                textAlign="center"
                                borderRadius={3}
                                sx={{ border: "2px dashed #cfd8c6", cursor: "pointer" }}
                            >
                                <CloudUploadOutlined sx={{ fontSize: 44, color: "#9bb58a" }} />
                                <Typography variant="subtitle1" fontWeight={700} mt={1}>Tải lên hình ảnh</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Tải lên hoặc chụp trực tiếp hình ảnh. Định dạng hình ảnh: JPG, PNG, JPEG, MP4, MOV, AVIS,... &lt;50MB
                                </Typography>
                            </Box>

                            <UploadedFile />
                            <UploadedFile />
                            <UploadedFile />
                        </Stack>
                    </SectionCard>
                </Grid>
            </Grid>

            {/* ----------------- actions ----------------- */}
            <Box mt={3} display="flex" flexWrap="wrap" justifyContent={{ xs: "stretch", sm: "flex-end" }} gap={2}>
                <Button variant="contained" sx={{ bgcolor: GREEN, borderRadius: 2.5, px: 5, py: 1.2, flexGrow: { xs: 1, sm: 0 } }}>
                    Tạo phiếu
                </Button>
                <Button onClick={onBack} variant="outlined" sx={{ border: `1.5px solid ${GREEN}`, color: GREEN, borderRadius: 2.5, px: 5, py: 1.2, flexGrow: { xs: 1, sm: 0 } }}>
                    Quay lại
                </Button>
            </Box>
        </Box>
    );
};

export default ImportTicket;

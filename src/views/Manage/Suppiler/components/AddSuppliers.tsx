import AutocompleteComponent from "@/components/Autocomplete";
import InputSelect from "@/components/InputSelect";
import InputText from "@/components/InputText";
import { COLORS } from "@/constants/colors";
import { getListCompanies } from "@/services/supplier-service";
import { IListCompany } from "@/types/supplier";
import { CloudUploadOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const GREEN = COLORS.BUTTON;
const RED = "#C0392B";

interface AddSuppliersProps {
    onBack: () => void;
}

const inputSx = { "& .MuiOutlinedInput-root": { borderRadius: 1.5, bgcolor: "#fff" } };

/* ------------------------- helpers ------------------------- */
const Field = ({
    label,
    name,
    value,
    onInputChange,
    required,
    errors,
    disabled,
    helperText,
    helper,
    placeholder
}: {
    label: string;
    name: string;
    value: any;
    onInputChange: (name: string, value: any) => void;
    required?: boolean
    errors?: boolean;
    disabled?: boolean;
    helperText?: string;
    helper?: string;
    placeholder?: string;
}) => (
    <Box>
        <Typography variant="body2" fontWeight={500} mb={0.5}>
            {label} {required && <Box component="span" color={RED}>*</Box>}
        </Typography> 
        <InputText
            label=""
            name={name}
            value={value}
            onChange={onInputChange}
            type="text"
            error={errors}
            helperText={helperText}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
        />
        {/* <TextField
            fullWidth
            size="small"
            select={select}
            defaultValue={value ?? ""}
            disabled={disabled}
            sx={{ ...inputSx, "& .Mui-disabled": { bgcolor: "#f3f4f1" } }}
        >
            {options?.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
        </TextField> */}
        {helper && <Typography variant="caption" color="text.secondary" mt={0.5} display="block">{helper}</Typography>}
    </Box>
);

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
        <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>{title}</Typography>
            {children}
        </CardContent>
    </Card>
);

const goodsTags = ["Gỗ tự nhiên", "Gỗ công nghiệp", "Phụ kiện", "Hóa chất"];

const AddSuppliers = ({ onBack }: AddSuppliersProps) => {
    
    const handleChangeInfoListCompanies = (value: IListCompany | null) => {
        console.log("value: ", value);
        
    }
    return (
        <Box p={{ xs: 2, md: 3 }} bgcolor="#F7F8F4" minHeight="100%">
            {/* ----------------- header ----------------- */}
            <Box mb={3}>
                <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: "1.6rem", md: "2rem" } }}>Thêm nhà cung cấp</Typography>
                <Typography variant="body2" color="text.secondary">MST kiểm tra trùng trước khi lưu</Typography>
            </Box>

            <Grid container spacing={3}>
                {/* ===== left column ===== */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <Stack gap={3} direction='column'>
                        {/* thông tin pháp lý */}
                        <SectionCard title="Thông tin pháp lý">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography variant="body2" fontWeight={500} mb={0.5}>
                                        Mã số thuế {<Box component="span" color={RED}>*</Box>}
                                    </Typography>
                                    <Box display='flex' flexDirection='row' gap={1}>
                                        <AutocompleteComponent<IListCompany>
                                            label=""
                                            placeholder="10 số hoặc 10-3"
                                            fetchOptions={getListCompanies}
                                            getOptionLabel={(option) => option.mst}
                                            getOptionKey={(option) => option.id}
                                            onChange={(value) => { handleChangeInfoListCompanies(value)}}
                                            page={0}
                                            getRenderOption={(option) => (
                                                <Typography variant="subtitle2">
                                                    {option.name + " - " + option.phone}
                                                </Typography>
                                            )}
                                            
                                        />
                                        <Button variant="outlined" sx={{ width: 80, border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}>
                                            Tra cứu
                                        </Button>
                                    </Box> 
                                    <Typography variant="caption" color="text.secondary" mt={0.5} display="block">Duy nhất, Tra cứu → tự điền tên và địa chỉ theo MST</Typography>

                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Field 
                                        label="Mã NCC" 
                                        value=""
                                        name=""
                                        onInputChange={() => {}}
                                        disabled 
                                        helper="Tự sinh" 
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Field label="Tên nhà cung cấp" name="" onInputChange={() => {}} required value="CTY TNHH Gỗ Tân Phú" /></Grid>
                                <Grid size={{ xs: 12 }}><Field label="Địa chỉ" name="" onInputChange={() => {}} required value="Lô 12, KCN Phú Nghĩa, Chương Mỹ, Hà Nội" /></Grid>
                            </Grid>
                        </SectionCard>

                        {/* liên hệ */}
                        <SectionCard title="Liên hệ">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 4 }}><Field name="" onInputChange={() => {}} label="Người liên hệ" required value="Hoàng Minh Tuấn" /></Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}><Field name="" onInputChange={() => {}} label="Điện thoại" required value="0936 222 444" /></Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}><Field name="" onInputChange={() => {}} label="Email" value="tuan@gotanphu.vn" /></Grid>
                            </Grid>
                        </SectionCard>

                        {/* thanh toán */}
                        <SectionCard title="Thanh toán">
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 4 }}><Field name="" onInputChange={() => {}} label="Số ngày nợ mặc định" required value="30" /></Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                    {/* <Field label="Ngân hàng" select value="Vietcombank – CN Hà Tây" options={["Vietcombank – CN Hà Tây", "BIDV – CN Hà Nội", "ACB – CN Hà Đông"]} /> */}
                                    <Typography variant="body2" fontWeight={500} mb={0.5}>
                                        Ngân hàng
                                    </Typography>
                                    <InputSelect
                                        label=""
                                        name=""
                                        value={''}
                                        options={[
                                            { value: 'vietcombank-ha-tay', label: "Vietcombank – CN Hà Tây"},
                                            { value: 'bidv-ha-noi', label: "BIDV – CN Hà Nội"},
                                            { value: 'acb-ha-dong', label: "ACB – CN Hà Đông"},
                                        ]}
                                        transformOptions={data =>
                                            data.map((item) => ({
                                                value: item.value,
                                                label: item.label
                                            }))
                                        }
                                        isBorder={false}
                                        onChange={() => {}}
                                        placeholder="Vietcombank – CN Hà Tây"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6, md: 4 }}><Field name="" onInputChange={() => {}} label="Số tài khoản" value="0451 0002 7788" /></Grid>
                            </Grid>
                            <Typography variant="caption" color="text.secondary" mt={1} display="block">Hạn thanh toán = ngày HĐ + số ngày</Typography>
                        </SectionCard>
                    </Stack>
                </Grid>

                {/* ===== right column ===== */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <Stack gap={3} direction='column'>
                        {/* mặt hàng */}
                        <SectionCard title="Mặt hàng cung cấp">
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {goodsTags.map((g, i) => (
                                    <Chip
                                        key={g}
                                        label={g}
                                        onClick={() => {}}
                                        variant={i === 0 ? "filled" : "outlined"}
                                        sx={{
                                            bgcolor: i === 0 ? GREEN : "#fff",
                                            color: i === 0 ? "#fff" : "#333",
                                            borderColor: "#ddd",
                                            fontWeight: 600,
                                            borderRadius: 5,
                                            px: 1,
                                        }}
                                    />
                                ))}
                            </Stack>
                            <Typography variant="caption" color="text.secondary" mt={1.5} display="block">Dùng để gợi ý NCC khi lập phiếu nhập.</Typography>
                        </SectionCard>

                        {/* hồ sơ đính kèm */}
                        <SectionCard title="Hồ sơ đính kèm">
                            <Box p={3} textAlign="center" borderRadius={2} sx={{ border: "2px dashed #cfd8c6", cursor: "pointer" }}>
                                <CloudUploadOutlined sx={{ fontSize: 32, color: "#9bb58a" }} />
                                <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                                    Giấy phép kinh doanh, hợp đồng khung · PDF ≤ 20MB
                                </Typography>
                            </Box>
                        </SectionCard>

                        {/* trạng thái */}
                        <SectionCard title="Trạng thái">
                            <Typography variant="body2" fontWeight={500} mb={0.5}>
                                Trạng thái
                            </Typography>
                            <InputSelect
                                label=""
                                name=""
                                value={''}
                                options={[
                                    { value: 'active', label: "Đang giao dịch"},
                                    { value: 'inactive', label: "Ngừng giao dịch"}
                                ]}
                                transformOptions={data =>
                                    data.map((item) => ({
                                        value: item.value,
                                        label: item.label
                                     }))
                                }
                                onChange={() => {}}
                                isBorder={false}
                                placeholder="Đang giao dịch"
                            />
                            {/* <Field label="Trạng thái" select value="Đang giao dịch" options={["Đang giao dịch", "Ngừng giao dịch"]} /> */}
                        </SectionCard>
                    </Stack>
                </Grid>
            </Grid>

            {/* ----------------- actions ----------------- */}
            <Box mt={3} display="flex" flexWrap="wrap" justifyContent={{ xs: "stretch", sm: "flex-end" }} gap={2}>
                <Button onClick={onBack} variant="outlined" sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, px: 4, py: 1, flexGrow: { xs: 1, sm: 0 } }}>Hủy</Button>
                <Button variant="contained" sx={{ bgcolor: COLORS.BUTTON, px: 4, py: 1, flexGrow: { xs: 1, sm: 0 } }}>Lưu nhà cung cấp</Button>
            </Box>
        </Box>
    );
};

export default AddSuppliers;

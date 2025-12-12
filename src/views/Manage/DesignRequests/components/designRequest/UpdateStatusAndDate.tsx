import { getDetailDesignRequest, updateStatusAndDate } from "@/services/design-request-service";
import { FormDataUpdateDesignRequest, IDesignRequest, IInputFile } from "@/types/design-request";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import { Avatar, Box, Button, Card, CardMedia, Chip, Divider, IconButton, Link, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { COLORS } from "@/constants/colors";
import { getPriorityDesignRequestLabel, getStatusDesignRequestColor, getStatusDesignRequestLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import { Description, Download, Image, InsertDriveFile, Link as LinkIcon, PlayCircle } from "@mui/icons-material";
import DialogUpdateStatusDate from "./DialogUpdateStatusDate";
import useNotification from "@/hooks/useNotification";
import { getMimeTypeFromName } from "@/utils/file";

interface UpdateStatusAndDateProps{
    onBack: () => void;
    open: boolean,
    id: string
}

const UpdateStatusAndDate = (props: UpdateStatusAndDateProps) => {
    const { onBack, open, id } = props;
    const notify = useNotification();
    const [designRequest, setDesignRequest] = useState<IDesignRequest | null>(null);
    const [openUpdateStatusDate, setOpenUpdateStatusDate] = useState(false);
    const [formData, setFormData] = useState<FormDataUpdateDesignRequest>({
        status: 'done', completedDate: null
    });
    const [errorDate, setErrorDate] = useState<string | null>(null)

    const getDetail = async() => {
        const res = await getDetailDesignRequest(id);
        const data = res.data as any as IDesignRequest;
        setDesignRequest(data);
    };

    useEffect(() => {
        if(open && id) {
            getDetail()
        }
    },[open, id]);

    const handleOpenUpdateStatusDate = () => {
        setOpenUpdateStatusDate(true)
    }

    const handleCloseUpdateStatusDate = () => {
        setOpenUpdateStatusDate(false);
        setErrorDate(null);
        setFormData({ status: 'done', completedDate: null });
        getDetail();
    }

    const handleInputChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrorDate(null)
    }

    const handleSubmit = async() => {
        if(!formData.completedDate){
            setErrorDate("Ngày hoàn thành không được để trống");
            return;
        }
        try {
            const payload: FormDataUpdateDesignRequest = {...formData}
            const res = await updateStatusAndDate(id, payload);
            notify({
                message: res.message,
                severity: 'success'
            });
            handleCloseUpdateStatusDate()
        } catch (error: any) {
            notify({
                message: error.message,
                severity: 'error'
            })
        }
    }

    const downloadFile = (file: IInputFile) => {
        try {
            // Tạo thẻ <a> tạm để tải
            const link = document.createElement("a");
            link.href = file.url;
            link.download = file.name.split("/").pop() || file.name; // chỉ lấy tên file cuối cùng
            console.log("link.download: ", link.download);
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error: any) {
            notify({
                message: ` Lỗi khi tải file: ${error.message}`,
                severity: 'error'
            })
        }
    }
    return(
        <Box>
            <NavigateBack
                title="Cập nhật trạng thái và ngày hoàn thành yêu cầu thiết kế"
                onBack={onBack}
            />
            <Paper elevation={2} sx={{ p: 3, margin: '0 auto', m: 2, border: '1px solid #e7e5e5ff' }}>
                <Grid container spacing={2}>
                    {/* Header */}
                    <Grid size={{ xs: 12 }}>
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Avatar sx={{ bgcolor: COLORS.BUTTON }}>
                                {designRequest?.productName?.[0] ?? "D"}
                            </Avatar>
                            <Box>
                                <Typography variant="h6" fontWeight={600}>
                                    {designRequest?.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {designRequest?.productName} — {designRequest?.orderName}
                                </Typography>
                                <Stack direction='row' spacing={1} sx={{ mt: 1 }}>
                                    {designRequest?.status && <Chip label={getStatusDesignRequestLabel(designRequest?.status)} color={getStatusDesignRequestColor(designRequest?.status).color}/>}
                                    <Chip label={`Độ ưu tiên: ${getPriorityDesignRequestLabel(designRequest?.priority)}`}/>
                                    <Chip label={`Deadline hoàn thành: ${DateTime.FormatDate(designRequest?.dueDate)}`}/>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Divider sx={{ my: 1 }}/>
                    </Grid>
                    
                    {/* Left column: Description + Files */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                            <Description sx={{ mr: 1 }}/> Mô tả
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                        <Typography variant="body1">{designRequest?.description}</Typography>
                        {designRequest?.specialRequirement && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            <strong>Yêu cầu đặc biệt:</strong> {designRequest?.specialRequirement}
                            </Typography>
                        )}
                        </Paper>

                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            <InsertDriveFile sx={{ mr: 1 }}/> Danh sách tệp đính kèm
                        </Typography>
                        <Grid container spacing={2}>
                            {designRequest?.inputFiles?.map((input) => {
                                const kind = getMimeTypeFromName(input.name || input.url);
                                return (
                                    <Grid size={{ xs: 12, md: 6 }} key={input.id}>
                                        <Card variant="outlined" sx={{ p: 1 }}>
                                            <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="subtitle2">{input.name}</Typography>
                                                </Box>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <IconButton component="a" href={input.url} target="_blank">
                                                        {kind === "image" ? <Image/> : kind === "video" ? <PlayCircle/> : <InsertDriveFile/>}
                                                    </IconButton>
                                                    {/* <IconButton onClick={() => downloadFile(input)}>
                                                        <Download/>
                                                    </IconButton> */}
                                                    <IconButton component="a" href={input.url} target="_blank" download>
                                                        <Download/>
                                                    </IconButton>
                                                </Stack>
                                            </Box>

                                            {/* Preview area */}
                                            {kind === "image" && (
                                                // <CardMedia component="img" image={input.url} alt={input.name ?? "image"} sx={{ mt: 1, maxHeight: 220 }} />
                                                <img src={input.url} style={{ width: "100%", maxHeight: 320 }}/>
                                            )}
                                            {kind === "video" && (
                                                <Box sx={{ mt: 1 }}>
                                                    <video controls style={{ width: "100%", maxHeight: 320 }} src={input.url} />
                                                </Box>
                                            )}
                                            {kind === "pdf" && (
                                                <Box mt={1}>
                                                    <iframe
                                                        src={input.url}
                                                        style={{ width: "100%", height: 250, border: "none" }}
                                                    />
                                                </Box>
                                            )}
                                            {kind === "office" && (
                                                <Box mt={1}>
                                                    <iframe
                                                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(input.url)}`}
                                                        style={{ width: "100%", height: 300, border: "none" }}
                                                    />
                                                </Box>
                                            )}
                                        </Card>
                                    </Grid>
                            )
                            })}
                        </Grid>
                    </Grid>

                    {/* Right column: Metadata, Links, Tech Spec */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                Thông tin
                            </Typography>

                            <Table size="small">
                                <TableBody>
                                <TableRow>
                                    <TableCell variant="head">Mã yêu cầu</TableCell>
                                    <TableCell>{designRequest?.requestCode}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Khách hàng</TableCell>
                                    <TableCell>{designRequest?.customerName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Người phụ trách</TableCell>
                                    <TableCell>{designRequest?.curatorName}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Ngày tạo</TableCell>
                                    <TableCell>{DateTime.FormatDate(designRequest?.createdAt)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Cập nhật</TableCell>
                                    <TableCell>{DateTime.FormatDate(designRequest?.updatedAt)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell variant="head">Hoàn thành</TableCell>
                                    <TableCell>{DateTime.FormatDate(designRequest?.completedDate)}</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>

                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                <Button disabled={!!designRequest?.completedDate} fullWidth variant="contained" sx={{ bgcolor: COLORS.BUTTON }} onClick={handleOpenUpdateStatusDate}>
                                    Xác nhận hoàn thành
                                </Button>
                            </Stack>
                        </Paper>

                        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                                <LinkIcon sx={{ mr: 1 }}/> Reference Links
                            </Typography>
                            <Stack spacing={1} direction='column'>
                                {designRequest?.referenceLinks?.map((link) => (
                                    <Link key={link.id} href={link.url} target="_blank" underline="hover">
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <LinkIcon/>
                                            <Typography noWrap variant="body2">
                                                {link.url}
                                            </Typography>
                                        </Stack>
                                    </Link>
                                ))}
                            </Stack>
                        </Paper>

                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                                <Description sx={{ mr: 1 }}/> Thông số kỹ thuật
                            </Typography>
                            <Table size="small">
                            <TableBody>
                                <TableRow>
                                <TableCell variant="head">Kích thước (L×W×H)</TableCell>
                                <TableCell>
                                    {designRequest?.technicalSpecification.length ?? "-"} × {designRequest?.technicalSpecification.width ?? "-"} × {designRequest?.technicalSpecification.height ?? "-"}
                                </TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell variant="head">Trọng lượng</TableCell>
                                <TableCell>{designRequest?.technicalSpecification.weight ?? "-"} kg</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell variant="head">Chất liệu</TableCell>
                                <TableCell>{designRequest?.technicalSpecification.material ?? "-"}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell variant="head">Màu</TableCell>
                                <TableCell>{designRequest?.technicalSpecification.color ?? "-"}</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell variant="head">Ghi chú</TableCell>
                                <TableCell>{designRequest?.technicalSpecification.note ?? "-"}</TableCell>
                                </TableRow>
                            </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
            {openUpdateStatusDate && (
                <DialogUpdateStatusDate
                    open={openUpdateStatusDate}
                    onClose={handleCloseUpdateStatusDate}
                    formData={formData}
                    error={errorDate}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                />
            )}
        </Box>
    )
};

export default UpdateStatusAndDate;
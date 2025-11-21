import { getDetailDesignRequest } from "@/services/design-request-service";
import { IDesignRequest } from "@/types/design-request";
import NavigateBack from "@/views/Manage/components/NavigateBack";
import { Avatar, Box, Button, Card, CardMedia, Chip, Divider, IconButton, Link, Paper, Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import { COLORS } from "@/constants/colors";
import { getPriorityDesignRequestLabel, getStatusDesignRequestLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import { Description, Download, Image, InsertDriveFile, Link as LinkIcon, PlayCircle } from "@mui/icons-material";

interface UpdateStatusAndDateProps{
    onBack: () => void;
    open: boolean,
    id: string
}

const getMimeTypeFromName = (name = "") => {
  const lower = name.toLowerCase();
  if (lower.match(/\.(jpg|jpeg|png|gif|webp|bmp)(\.|$)/)) return "image";
  if (lower.match(/\.(mp4|webm|ogg|mov)(\.|$)/)) return "video";
  if (lower.match(/\.(pdf)(\.|$)/)) return "pdf";
  if (lower.match(/\.(doc|docx|ppt|pptx|xls|xlsx)(\.|$)/)) return "office";
  return "other";
};

const UpdateStatusAndDate = (props: UpdateStatusAndDateProps) => {
    const { onBack, open, id } = props;
    const [designRequest, setDesignRequest] = useState<IDesignRequest | null>(null)

    useEffect(() => {
        if(open && id) {
            const getDetail = async() => {
                const res = await getDetailDesignRequest(id);
                const data = res.data as any as IDesignRequest;
                setDesignRequest(data);
            };
            getDetail()
        }
    },[open, id]);


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
                                    <Chip label={getStatusDesignRequestLabel(designRequest?.status)}/>
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
                                                    <IconButton component="a" href={input.url} target="_blank" download>
                                                        <Download/>
                                                    </IconButton>
                                                </Stack>
                                            </Box>

                                            {/* Preview area */}
                                            {kind === "image" && (
                                                <CardMedia component="img" image={input.url} alt={input.name ?? "image"} sx={{ mt: 1, maxHeight: 220 }} />
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
                                <Button fullWidth variant="contained" size="small">
                                    Mark as Done
                                </Button>
                                <Button fullWidth variant="outlined" size="small">
                                    Assign
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
        </Box>
    )
};

export default UpdateStatusAndDate;
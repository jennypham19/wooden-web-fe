import {
  Box,
  Chip,
  IconButton,
  MenuItem,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { FeedbackObject, getFeedbacks } from "@/services/feedback-service";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import { getFeedbackStatusInProductLabelAndColor, getStatusFeedback } from "@/utils/labelEntoVni";
import { COLORS } from "@/constants/colors";
import Grid from "@mui/material/Grid2";
import { useGetData } from "@/hooks/useGetData";
import { IFeedback } from "@/types/feedback";
import DateTime from "@/utils/DateTime";
import { Close, Edit } from "@mui/icons-material";
import Backdrop from "@/components/Backdrop";
import CustomPagination from "@/components/Pagination/CustomPagination";
import DialogViewFeedback from "./feedbacks/DialogViewFeedback";

interface FeedbackManagementProps{
  onOpenEditFeedback: (feedback: IFeedback) => void;
}

const FeedbackManagement = (props: FeedbackManagementProps) => {
  const { onOpenEditFeedback} = props
  const { page, rowsPerPage, total, error, loading, filters, setFilters, handlePageChange, handleSearch, fetchData, listData } = useGetData<IFeedback, FeedbackObject>(getFeedbacks, 10)

  const [feedback, setFeedback] = useState<IFeedback | null>(null)

  const [openViewFeedback, setOpenViewFeedback] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));

  }

  /* View feedback */
  const handleOpenViewFeedback = (feedback: IFeedback) => {
    setFeedback(feedback);
    setOpenViewFeedback(true)
  }

  const handleCloseViewFeedback = () => {
    setOpenViewFeedback(false)
  }

  return (
    <Box>
      <Typography variant="h6" fontWeight={600} m={2}>
        Quản lý phản hồi khách hàng
      </Typography>
      {loading && (
        <Backdrop open={loading} />
      )}
      {error && !loading && (
        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
      )}
      {/* FILTER */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <InputText
              label="Mã đơn hàng"
              value={filters ? filters.orderCode : null}
              name="orderCode"
              type="text"
              onChange={handleInputChange}
              endAdornment={
                filters.orderCode && 
                <Close 
                  fontSize="small"
                  sx={{ cursor: 'pointer', mr: 1 }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleInputChange('orderCode', ""),
                    handleSearch({ ...filters, orderCode: "" });
                  }}
                />
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <InputSelect
              label="Số sao"
              name="rating"
              value={filters ? filters.rating : null}
              onChange={handleInputChange}
              placeholder="Số sao"
              options={['all', 1, 2, 3, 4, 5]}
              transformOptions={(data) =>
                data.map((item, index) => ({
                  value: index + 1,
                  label: item === 'all' ? 'Tất cả' : `${item} sao`
                }))
              }
              onLoadData={() => { handleSearch({ ...filters, rating: null }) }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <InputSelect
              label="Trạng thái"
              name="status"
              value={filters ? filters.status : null}
              onChange={handleInputChange}
              placeholder="Trạng thái"
              options={['all', 'draft', 'confirmed']}
              transformOptions={(data) =>
                data.map((item, index) => ({
                  value: index + 1,
                  label: item === 'all' ? 'Tất cả' : getStatusFeedback(item).label
                }))
              }
              onLoadData={() => { handleSearch({ ...filters, status: "" }) }}
            />
          </Grid>
          <Grid sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} size={{ xs: 12, md: 1.5 }}>
            <Button onClick={() => filters && handleSearch(filters)} fullWidth variant="contained" sx={{ bgcolor: COLORS.BUTTON }}>Tìm kiếm</Button>
          </Grid>
        </Grid>
      </Paper>
      {!loading && !error && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Mã đơn</TableCell>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell>Đánh giá</TableCell>
                  <TableCell>Nhân viên nhập</TableCell>
                  <TableCell>Ngày nhập</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {listData.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={8}>Không tồn tại bản ghi nào</TableCell>
                  </TableRow>
                )}
                {listData.map((feedback, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{feedback.order}</TableCell>
                    <TableCell>{feedback.product}</TableCell>
                    <TableCell>
                      <Rating value={feedback.rating} readOnly size="small" />
                    </TableCell>
                    <TableCell>{feedback.staff}</TableCell>
                    <TableCell>{DateTime.Format(feedback.createdAt)}</TableCell>
                    <TableCell>
                      <Chip
                        label={getFeedbackStatusInProductLabelAndColor(feedback.status).label}
                        color={getFeedbackStatusInProductLabelAndColor(feedback.status).color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => feedback && handleOpenViewFeedback(feedback)}>
                        <VisibilityIcon />
                      </IconButton>
                      {feedback.status === 'draft' && (
                        <IconButton onClick={() => feedback && onOpenEditFeedback(feedback)}>
                          <Edit />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>  
          <Box display='flex' justifyContent='center'>
                <CustomPagination
                  page={page}
                  rowsPerPage={rowsPerPage}
                  count={total}
                  onPageChange={handlePageChange}
                />
          </Box>        
        </>
      )}
      {/* TABLE */}
      {openViewFeedback && feedback && (
        <DialogViewFeedback
          open={openViewFeedback}
          onClose={handleCloseViewFeedback}
          feedback={feedback}
        />
      )}
    </Box>
  );
}

export default FeedbackManagement;

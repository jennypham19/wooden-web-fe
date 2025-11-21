import { useFetchData } from "@/hooks/useFetchData";
import { getListDesignRequests } from "@/services/design-request-service";
import { IDesignRequest } from "@/types/design-request";
import { Alert, Box, Button, Chip, Drawer, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";
import { Add, Edit, Visibility } from "@mui/icons-material";
import Backdrop from "@/components/Backdrop";
import { getStatusDesignRequestColor, getStatusDesignRequestLabel } from "@/utils/labelEntoVni";
import DateTime from "@/utils/DateTime";
import CustomPagination from "@/components/Pagination/CustomPagination";
import IconButton from "@/components/IconButton/IconButton";
import UpdateStatusAndDate from "./designRequest/UpdateStatusAndDate";

interface ListDesignRequestsProps {
  onAddDesignRequest: () => void;
}

const ListDesignRequests = (props: ListDesignRequestsProps) => {
  const { onAddDesignRequest } = props;

  const { error, listData, loading, page, rowsPerPage, handlePageChange, total, handleSearch, searchTerm, fetchData } = useFetchData<IDesignRequest>(getListDesignRequests);

  const [openDesignRequest, setOpenDesignRequest] = useState<{ open: boolean, type: string }>({
    open: false,
    type: ''
  });

  const [id, setId] = useState<string | null>(null);

  const handleOpenUpdateStatusAndDate = (id: string) => {
    setOpenDesignRequest({ open: true, type: 'update-status-and-date' });
    setId(id)
  }

  const handleCloseUpdateStatusAndDate = () => {
    setOpenDesignRequest({ open: false, type: 'update-status-and-date' });
    setId(null);
    fetchData(page, rowsPerPage)
  }

    return(
        <Box>
          {!openDesignRequest.open && (
            <>
              <SearchBox
                  isBorder
                  initialValue={searchTerm}
                  onSearch={handleSearch}
                  placeholder="Tìm kiếm theo mã, tên sản phẩm, khách hàng"
              >
                  <Button
                      variant="outlined"
                      sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
                      startIcon={<Add/>}
                      onClick={onAddDesignRequest}
                  >
                      Thêm mới yêu cầu thiết kế
                  </Button>
              </SearchBox>
              {loading && <Backdrop open={loading}/>}
              {error && !loading && (
                  <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
              )}
              {!loading && !error && (
                  <Box mx={2}>
                      <TableContainer component={Paper}>
                          <Table stickyHeader aria-label="design-requests">
                              <TableHead>
                                  <TableRow sx={{ height: '50px' }}>
                                      {[ 'STT', 'Mã yêu cầu', 'Tên sản phẩm', 'Tên đơn hàng', 'Khách hàng', 'Người phụ trách', 'Trạng thái', 'Hạn hoàn thành', 'Ngày hoàn thành', 'Thao tác'].map((header) => (
                                          <TableCell key={header} align="center" sx={{ fontWeight: 700, bgcolor: '#b8b5b5ff' }}>{header}</TableCell>
                                      ))}
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {listData?.length === 0 ? (
                                      <TableRow>
                                          <TableCell colSpan={9} align="center">Không tồn tại bản ghi nào cả</TableCell>
                                      </TableRow>
                                  ): (
                                      listData?.map((designRequest, index) => {
                                          return(
                                              <React.Fragment key={index}>
                                                  <TableRow>
                                                    <TableCell align="center">{index + 1}</TableCell>
                                                    <TableCell align="center">{designRequest.requestCode}</TableCell>
                                                    <TableCell align="center">{designRequest.productName}</TableCell>
                                                    <TableCell align="center">{designRequest.orderName}</TableCell>
                                                    <TableCell align="center">{designRequest.customerName}</TableCell>
                                                    <TableCell align="center">{designRequest.curatorName}</TableCell>
                                                    <TableCell align="center">
                                                      <Chip
                                                        label={getStatusDesignRequestLabel(designRequest.status)}
                                                        color={getStatusDesignRequestColor(designRequest.status).color}
                                                      />
                                                    </TableCell>
                                                    <TableCell align="center">{DateTime.FormatDate(designRequest.dueDate)}</TableCell>
                                                    <TableCell align="center">{designRequest.completedDate !== null ? "" : DateTime.FormatDate(designRequest.completedDate)}</TableCell>
                                                    <TableCell align="center">
                                                      <IconButton
                                                        tooltip="Xem chi tiết"
                                                        handleFunt={() => {}}
                                                        icon={<Visibility color="info"/>}
                                                      />
                                                      <IconButton
                                                        tooltip="Cập nhật trạng thái và ngày hoàn thành"
                                                        handleFunt={() => designRequest && handleOpenUpdateStatusAndDate(designRequest.id)}
                                                        icon={<Edit color="success"/>}
                                                      />
                                                    </TableCell>
                                                  </TableRow>
                                              </React.Fragment>
                                          )
                                      })
                                  )}
                              </TableBody>
                          </Table>
                      </TableContainer>
                      <Box display='flex' justifyContent='center'>
                        <CustomPagination
                          count={total}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          onPageChange={handlePageChange}
                        />
                      </Box>
                  </Box>
              )}
            </>
          )}
          {openDesignRequest.open && openDesignRequest.type === 'update-status-and-date' && id && (
            <UpdateStatusAndDate
              onBack={handleCloseUpdateStatusAndDate}
              id={id}
              open={openDesignRequest.open}
            />
          )}
        </Box>
    )
}

export default ListDesignRequests;
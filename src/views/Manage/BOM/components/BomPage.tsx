import { Add, Delete, Edit, ExpandLess, ExpandMore, Visibility } from "@mui/icons-material";
import { Alert, Box, Button, Card, CardMedia, Collapse, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { IBOM } from "@/types/bom";
import Backdrop from "@/components/Backdrop";
import DateTime from "@/utils/DateTime";
import IconButton from "@/components/IconButton/IconButton";
import CustomPagination from "@/components/Pagination/CustomPagination";
import useAuth from "@/hooks/useAuth";
import Grid from "@mui/material/Grid2"
import CommonImage from "@/components/Image/index";
import { useFetchData } from "@/hooks/useFetchData";
import { getBoms } from "@/services/bom-service";
import SearchBox from "../../components/SearchBox";
import { COLORS } from "@/constants/colors";

interface BomPageProps{
  onOpenAddBom: () => void;
}
const BomPage = (props: BomPageProps) => {
  const [openRow, setOpenRow] = useState<string | null>(null);
  const { profile } = useAuth();

  const { onOpenAddBom } = props;

  const { error, listData, loading, page, rowsPerPage, handlePageChange, total, handleSearch, searchTerm } = useFetchData<IBOM>(getBoms);


  const handleToggle = (id: string) => {
    setOpenRow((prev) => (prev === id ? null : id));
  }
  
    return(
        <Box>
          <SearchBox
            isBorder
            initialValue={searchTerm}
            onSearch={handleSearch}
            placeholder="Tìm kiếm theo mã hoặc tên sản phẩm"
          >
            <Button
              variant="outlined"
              sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON }}
              startIcon={<Add/>}
              onClick={onOpenAddBom}
            >
              Thêm mới BOM
            </Button>           
          </SearchBox>
          {loading && <Backdrop open={loading}/>}
          {error && !loading && (
            <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
          )}
          {!loading && !error && (
            <Box mx={2}>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="boms">
                  <TableHead>
                    <TableRow sx={{ height: "50px"}}>
                      {[ 'STT', 'Mã BOM', 'Tên sản phẩm', 'Tên đơn hàng', 'Số lượng vật tư', 'Ngày cập nhật', 'Người tạo', 'Hành động'].map((header) => (
                        <TableCell key={header} align="center" sx={{ fontWeight: 700, bgcolor: '#b8b5b5ff' }}>{header}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listData?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">Không tồn tại bản ghi nào</TableCell>
                      </TableRow>
                    ) : (
                      listData?.map((bom, index) => {
                        return(
                          <React.Fragment key={bom.id}>
                            {/* Hàng chính */}
                            <TableRow 
                              onClick={() => bom && handleToggle(bom.id)} 
                              sx={{ 
                                cursor: 'pointer',
                                "& > *": { borderBottom: openRow === bom.id ? "none" : undefined },
                              }}
                            >
                              <TableCell align="center">{index + 1}</TableCell>
                              <TableCell align="center">{bom.code}</TableCell>
                              <TableCell align="center">{bom.nameProduct}</TableCell>
                              <TableCell align="center">{bom.nameOrder}</TableCell>
                              <TableCell align="center">{bom.amount}</TableCell>
                              <TableCell align="center">{DateTime.FormatDate(bom.updatedAt)}</TableCell>
                              <TableCell align="center">{bom.user.fullName}</TableCell>
                              <TableCell align="center">
                                {profile?.id === bom.user.id && (
                                  <IconButton
                                    tooltip="Chỉnh sửa"
                                    handleFunt={() => {}}
                                    icon={<Edit color="success"/>}
                                  />
                                )}
                                {profile?.id === bom.user.id && (
                                  <IconButton
                                    tooltip="Xóa"
                                    handleFunt={() => {}}
                                    icon={<Delete color="error"/>}
                                  />
                                )}
                                <IconButton
                                  handleFunt={() => bom && handleToggle(bom.id)}
                                  icon={openRow === bom.id ? <ExpandLess color="info"/> :<ExpandMore color="info"/>}
                                />
                              </TableCell>
                            </TableRow>
                            {/* Hàng chi tiết vật tư */}
                            <TableRow>
                              <TableCell colSpan={8} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                <Collapse in={openRow === bom.id} timeout="auto" unmountOnExit>
                                  <Box px={1.5} pb={1.5}>
                                    <Typography mb={1} fontSize='15px'>{`Danh sách chi tiết vật tư của sản phẩm `}<b>{listData.find(el => el.id === openRow)?.nameProduct}</b></Typography>
                                    <Grid container spacing={2}>
                                      {bom.materials.map((material, idx) => (
                                        <Grid key={idx} size={{ xs: 12, md: 3 }}>
                                          <Card sx={{ px: 1, pt: 1, boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.2)' }}>
                                            <Grid container spacing={2}>
                                              <Grid size={{ xs: 5 }}>
                                                <CommonImage
                                                  src={material.imageUrl}
                                                  sx={{ height: 150 }}
                                                />
                                              </Grid>
                                              <Grid size={{ xs: 7 }}>
                                                <Typography fontSize='14px'><b>Mã vật tư:</b> {material.code}</Typography>
                                                <Typography fontSize='14px'><b>Tên vật tư:</b> {material.name}</Typography>
                                                <Typography fontSize='14px'><b>Đơn vị:</b> {material.unit}</Typography>
                                                <Typography fontSize='14px'><b>Định lượng:</b> {material.amount}</Typography>
                                                {material.note !== '' && (<Typography fontSize='14px'><b>Ghi chú:</b> {material.note}</Typography>)}
                                              </Grid>
                                            </Grid>
                                          </Card>
                                        </Grid>
                                      ))}
                                    </Grid>
                                  </Box>
                                </Collapse>
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
                  page={page}
                  rowsPerPage={rowsPerPage}
                  count={total}
                  onPageChange={handlePageChange}
                />
              </Box>
            </Box>
          )}

        </Box>    
    )
}

export default BomPage;
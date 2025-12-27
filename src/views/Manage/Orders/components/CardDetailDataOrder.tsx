import { Download, Image, InsertDriveFile, Link as LinkIcon, PlayCircle, Visibility } from "@mui/icons-material";
import { Avatar, Box, Card, Chip, Drawer, IconButton, Link, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";



import avatar from "@/assets/images/users/default-avatar.jpg";
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import { IOrder } from "@/types/order";
import DateTime from "@/utils/DateTime";
import { getMimeTypeFromName } from "@/utils/file";
import { getProccessOrderLabel, getStatusOrderColor, getStatusOrderLabel } from "@/utils/labelEntoVni";


interface CardDetailDataOrderProps{
    order: IOrder | null,
    children?: React.ReactNode
}

const CardDetailDataOrder = (props: CardDetailDataOrderProps) => {
    const { order, children } = props;
    const { profile } = useAuth();
 
    return (
      <>
        {order && (
          <>
            <Box display='flex' justifyContent='space-between'>
              <Box display='flex' flexDirection='row'>
                <Avatar src={avatar} sx={{ width: 80, height: 80, borderRadius: '50%', mr: 1 }} />
                <Stack margin='auto 0' direction='column'>
                  <Typography variant='caption'>Khách hàng</Typography>
                  <Typography fontSize='15px' fontWeight={600}>
                    {order.customer.name}
                  </Typography>
                </Stack>
              </Box>
              <Box margin='auto 0'>
                <Chip
                  label={getStatusOrderLabel(order.status)}
                  color={getStatusOrderColor(order.status).color}
                />
              </Box>
            </Box>
            {profile?.role === ROLE.FACTORY_MANAGER && <Box>{children}</Box>}
            <Stack mt={1} display='flex' justifyContent='space-between'>
              <Typography fontSize='15px'>
                <b>Đơn hàng:</b> {order.name}
              </Typography>
              <Typography fontSize='15px'>
                <b>ID đơn:</b> {order.codeOrder}
              </Typography>
            </Stack>
            <Stack mt={1} display='flex' justifyContent='space-between'>
              <Typography fontSize='15px'>
                <b>Ngày nhận:</b> {DateTime.FormatDate(order.dateOfReceipt)}
              </Typography>
              <Typography fontSize='15px'>
                <b>Hạn trả:</b> {DateTime.FormatDate(order.dateOfPayment)}
              </Typography>
            </Stack>
            <Stack mt={1} display='flex' justifyContent='space-between'>
              <Typography fontSize='15px'>
                <b>Tiến độ:</b> {getProccessOrderLabel(order.proccess)}
              </Typography>
              <Typography fontSize='15px'>
                <b>Trạng thái:</b> {getStatusOrderLabel(order.status)}
              </Typography>
            </Stack>
            <Stack mt={1} direction='row'>
              <Typography fontSize='15px'>
                <b>Số lượng sản phẩm:</b> {order.amount} sản phẩm/ đơn hàng
              </Typography>
              {order.products.every((s) => s.status === 'completed') && (
                <Tooltip title="Xem hình ảnh sản phẩm">
                    <IconButton onClick={() => {}}>
                        <Visibility/>
                    </IconButton>
                </Tooltip>
              )}
            </Stack>
            <Typography mt={1} fontSize='15px'>
              <b>Yêu cầu:</b> {order.requiredNote}
            </Typography>
            {/* {profile?.role !== ROLE.FACTORY_MANAGER && ( */}
              <>
                <Typography mt={1} fontSize='15px' fontWeight={700}>
                  Danh sách sản phẩm kèm theo:
                </Typography>
                <Grid container spacing={2}>
                  {order.products.map((product, index) => (
                    <Grid size={{ xs: 12, md: 6 }} key={index}>
                      <Paper sx={{ border: '1px solid #000', p: 1 }}>
                        <Typography fontSize='14px'>
                          <b>Tên sản phẩm:</b> <i>{product.name.toUpperCase()}</i>
                        </Typography>
                        <Typography mt={1} fontSize='14px'>
                          <b>Mô tả/ Yêu cầu:</b> {product.description}
                        </Typography>
                        <Typography mt={1} fontSize='14px'>
                          <b>Mục tiêu:</b> {product.target}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                {order?.inputFiles?.length > 0 && (
                  <>
                    <Stack mt={2} direction='row'>
                      <InsertDriveFile />
                      <Typography fontSize='15px' fontWeight={600} gutterBottom>
                        Danh sách files dữ liệu
                      </Typography>
                    </Stack>
                    <Grid sx={{ mt: 1 }} container spacing={2}>
                      {order?.inputFiles?.map((input, index) => {
                        const kind = getMimeTypeFromName(input.name || input.url);
                        return (
                          <Grid size={{ xs: 12 }} key={index}>
                            <Card variant='outlined' sx={{ p: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant='subtitle2'>{input.name}</Typography>
                                </Box>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                  <IconButton component='a' href={input.url} target='_blank'>
                                    {kind === 'image' ? (
                                      <Image />
                                    ) : kind === 'video' ? (
                                      <PlayCircle />
                                    ) : (
                                      <InsertDriveFile />
                                    )}
                                  </IconButton>
                                  <IconButton
                                    component='a'
                                    href={input.url}
                                    target='_blank'
                                    download
                                  >
                                    <Download />
                                  </IconButton>
                                </Stack>
                              </Box>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </>
                )}
                {order?.referenceLinks?.length > 0 && (
                  <>
                    <Stack mt={2} direction='row'>
                      <LinkIcon />
                      <Typography fontSize='15px' fontWeight={600} gutterBottom>
                        Links tài liệu
                      </Typography>
                    </Stack>
                    <Paper variant='outlined' sx={{ p: 2, mt: 1 }}>
                      <Stack spacing={1} direction='column'>
                        {order?.referenceLinks?.map((link) => (
                          <Link key={link.id} href={link.url} target='_blank' underline='hover'>
                            <Stack direction='row' spacing={1} alignItems='center'>
                              <LinkIcon />
                              <Typography noWrap variant='body2'>
                                {link.url}
                              </Typography>
                            </Stack>
                          </Link>
                        ))}
                      </Stack>
                    </Paper>
                  </>
                )}
              </>
            {/* )} */}
          </>
        )}
      </>
    );
}

export default CardDetailDataOrder;
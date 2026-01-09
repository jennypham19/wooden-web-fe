import { Alert, Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import SearchBox from "../../components/SearchBox";
import { useFetchData } from "@/hooks/useFetchData";
import { IProduct } from "@/types/product";
import { getListCompletedProducts } from "@/services/product-service";
import Backdrop from "@/components/Backdrop";
import Grid from "@mui/material/Grid2";
import CommonImage from "@/components/Image/index";
import CustomPagination from "@/components/Pagination/CustomPagination";
import { COLORS } from "@/constants/colors";

interface ListCompletedProductsProps{
    onOpenFeedback: (product: IProduct) => void
}
const ListCompletedProducts = (props: ListCompletedProductsProps) => {
    const { onOpenFeedback } = props;

    const { page, rowsPerPage, total, listData, loading, error, handlePageChange, handleSearch, searchTerm } = useFetchData<IProduct>(getListCompletedProducts, 4);

    return(
        <Box mb={5}>

                    <Typography variant="h6" fontWeight={600} m={1}>Danh sách sản phẩm đã làm xong</Typography>
                    <SearchBox
                        initialValue={searchTerm}
                        onSearch={handleSearch}
                        placeholder="Tìm kiếm theo tên sản phẩm"
                        isBorder={true}
                    >

                    </SearchBox>
                    {loading && <Backdrop open={loading}/>}
                    {error && !loading && (
                        <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>
                    )}
                    {!loading && !error && (
                        <Box my={2}>
                            <Grid container spacing={2}>
                                {listData.length === 0 ? (
                                    <Typography p={2} fontWeight={700}>Không tồn tại bản ghi nào</Typography>
                                ) : (
                                    listData.map((product, index) => (
                                        <Grid key={index} size={{ xs: 12, md: 3 }}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Stack mb={1.5} direction="row" spacing={2}>
                                                        <CommonImage
                                                            src={product.urlImage}
                                                            sx={{ width: 120, height: 120 }}
                                                        />
                                                        <Box flex={1}>
                                                            <Typography fontWeight={500}>
                                                                {product.name}
                                                            </Typography>
                                                            <Typography mt={1} variant="body2" color="text.secondary">
                                                                Đơn hàng: <b>{product.order.codeOrder}</b>
                                                            </Typography>
                                                            <Typography mt={1} variant="body2" color="text.secondary">
                                                                Khách hàng: <b>{product.order.customer.name}</b>
                                                            </Typography>
                                                            <Typography mt={1} variant="body2" color="text.secondary">
                                                                Số điện thoại: <b>{product.order.customer.phone}</b>
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                    <Button
                                                        fullWidth
                                                        sx={{ bgcolor: COLORS.BUTTON, borderRadius: 1 }}
                                                        onClick={() => product && onOpenFeedback(product)}
                                                    >
                                                        Ghi nhận phản hồi
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
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

export default ListCompletedProducts;
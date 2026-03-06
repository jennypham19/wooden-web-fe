import Page from "@/components/Page"
import { COLORS } from "@/constants/colors"
import { Box, Button, IconButton, Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import InformationOfCustomerAndProduct from "./components/InformationOfCustomerAndProduct"
import DesignRequest from "./components/DesignRequest"
import ListOfBoms from "./components/ListOfBoms"
import Milestones from "./components/Milestones"
import { Inventory2, Save, ViewList } from "@mui/icons-material"
import Grid from "@mui/material/Grid2";
import { CategoryType, ViewModeProps } from "@/types/tab"
import { useState } from "react"
import TabProduct from "./components/TabProduct"
import Product from "./Product/Product"
import ListProduct from "./Product/ListProduct"

export interface ProductViewModeProps extends ViewModeProps{
    icon: React.ReactNode
}
const DataProductViewMode: ProductViewModeProps[] = [
    {
        id: 1,
        label: 'Nhập một sản phẩm',
        value: 0,
        icon: <Inventory2/>
    },
    {
        id: 2,
        label: 'Nhập nhiều sản phẩm',
        value: 1,
        icon: <ViewList/>
    }
]

const OrderLink = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryType>(0);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.down('md'));
    const handleActiveCategory = (category: CategoryType) => {
        setActiveCategory(category);
    }
    return (
        <Page title="Đặt hàng">
            <Grid container spacing={2} mt={2}>
                <Grid size={{ xs: 12, md: 3 }}></Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ mx: { xs: 3, md: 0 }, my: 3, pl: 2, borderLeft: `4px solid ${COLORS.BUTTON}` }}>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>Tạo Đơn Hàng Mới</Typography>
                        <Typography variant="subtitle2" color="text.secondary">Khởi tạo quy trình sản xuất và thiết kế chuyên nghiệp</Typography>
                    </Box>

                    {/* Form thông tin khách hàng & đơn hàng */}
                    <InformationOfCustomerAndProduct/>  

                    {/* Form nhập sản phẩm */}
                    <Paper sx={{ mx: { xs: 3, md: 0 }, p: 2, mb: 2.5 }}>
                        {mdUp ? (
                        <Stack
                            direction='column'
                            spacing={1}
                            sx={{
                            mb: 2,
                            width: '100%'
                            }}
                        >
                            {DataProductViewMode.map((category, idx) => (
                            <Box
                                key={idx}
                                onClick={() => category.value && handleActiveCategory(category.value)}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    bgcolor: activeCategory === category.value ? `${COLORS.BUTTON}` : 'transparent',
                                    color: activeCategory === category.value ? '#fff' : '#000',
                                    fontWeight: activeCategory === category.value ? 700 : 400,
                                    border: '1px solid #000',
                                    transition: '0.3s',
                                    "&:hover": {
                                        bgcolor: activeCategory === category.value ? "#fff" : 'rgba(255,255,255,0.1)'
                                    },
                                    fontSize: '14px',
                                     
                                }}
                            >
                                {category.label}
                            </Box>
                            ))}
                        </Stack>
                        ) : (
                            <TabProduct DataViewMode={DataProductViewMode} viewMode={activeCategory} onChange={handleActiveCategory}/>
                        )}

                        {activeCategory === 0 && (
                            <Product/>
                        )}

                        {activeCategory === 1 && (
                            <ListProduct/>
                        )}
                    </Paper>
                    {/* Yêu cầu thiết kế */}
                    {/* <DesignRequest/> */}

                    {/* Danh sách BOM */}
                    {/* <ListOfBoms/> */}

                    {/* Các mốc sản xuất */}
                    {/* <Milestones/> */}

                    <Box sx={{ mx: { xs: 3, md: 0 } }} display='flex' justifyContent={{ xs: 'center', md: 'flex-end' }} mt={3} gap={2}>
                        <Button
                            variant="contained"
                            sx={{ bgcolor: COLORS.BUTTON, px: 2 }}
                            startIcon={<Save/>}
                        >
                            Lưu & Khởi tạo đơn hàng
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ color: '#000', borderColor: COLORS.BUTTON, px: 2 }}
                        >
                            Hủy bỏ
                        </Button>
                    </Box>                    
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}></Grid>

            </Grid>
        </Page>
    )
}

export default OrderLink
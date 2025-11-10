import Page from "@/components/Page"
import { useState } from "react";
import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import TabsViewSwitcher from "./components/TabsViewSwitcher";
import BomPage from "./components/BomPage";
import TechDocsPage from "./components/TechDocsPage";
import CreateBom from "./components/CreateBom";
import { useFetchData } from "@/hooks/useFetchData";
import { IBOM } from "@/types/bom";
import { getBoms } from "@/services/bom-service";

export type CategoryType = 0 | 1;
export interface ViewModeProps{
    id: string | number,
    label: string,
    value: CategoryType,
}
const DataViewMode: ViewModeProps[] = [
    {
        id: 1,
        label: 'BẢNG ĐỊNH MỨC VẬT TƯ (BOM)',
        value: 0,

    },
    {
        id: 2,
        label: 'HỒ SƠ KỸ THUẬT',
        value: 1,
    },
]

const BOM = () => {
    const [activeCategory, setActiveCategory] = useState<CategoryType>(0);
    const theme = useTheme();
    const mdUp = useMediaQuery(theme.breakpoints.down('md'));
    const [openBomAndTechDoc, setOpenBomAndTechDoc] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    });

    const { page, rowsPerPage, fetchData } = useFetchData<IBOM>(getBoms);

    const handleOpenAddBom = () => {
        setOpenBomAndTechDoc({ open: true, type: 'BOM' });
    }

    const handleCloseAddBom = () => {
        setOpenBomAndTechDoc({ open: false, type: 'BOM' });
        fetchData(page, rowsPerPage)
    }

    const handleOpenAddTechDoc = () => {
        setOpenBomAndTechDoc({ open: true, type: 'tech_doc' });
    }

    const handleCloseAddTechDoc = () => {
        setOpenBomAndTechDoc({ open: false, type: 'tech_doc' });
    }

    const handleActiveCategory = (category: CategoryType) => {
        setActiveCategory(category);
        switch (category) {
            case 0:
                fetchData(page, rowsPerPage)
                break;
            case 1:
                break;
        } 
       
    }

    return(
        <Page title="BOM & Hồ sơ kỹ thuật">
            {!openBomAndTechDoc.open && (
                <Box bgcolor='#fff' height='100%'>
                    <Box>
                        {mdUp ? (
                            <Stack
                                direction='column'
                                spacing={1}
                                sx={{
                                    mb: 2,
                                    width: '100%'
                                }}
                            >
                            {DataViewMode.map((category, index) => (
                                <Box
                                    key={index}
                                    onClick={() => category.value && handleActiveCategory(category.value)}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        bgcolor: activeCategory === category.value ? 'white' : 'transparent',
                                        color: activeCategory === category.value ? 'black' : '#000',
                                        fontWeight: activeCategory === category.value ? 700 : 400,
                                        border: '1px solid #000',
                                        transition: '0.3s',
                                        "&:hover": {
                                            bgcolor: activeCategory === category.value ? "white" : 'rgba(255,255,255,0.1)'
                                        }
                                    }}
                                >
                                    {category.label}
                                </Box>
                                ))}
                            </Stack>
                        ) : (
                        <TabsViewSwitcher DataViewMode={DataViewMode} viewMode={activeCategory} onChange={handleActiveCategory}/>
                        )}
                    </Box>
                    {activeCategory === 0 && (
                        <BomPage
                            onOpenAddBom={handleOpenAddBom}
                        />
                    )}
                    {activeCategory === 1 && (
                        <TechDocsPage/>
                    )}                                
                </Box>
            )}
            {openBomAndTechDoc.open && openBomAndTechDoc.type === 'BOM' && (
                <CreateBom
                    onBack={handleCloseAddBom}
                    open={openBomAndTechDoc.open}
                />
            )}

        </Page>
    )
}
export default BOM;
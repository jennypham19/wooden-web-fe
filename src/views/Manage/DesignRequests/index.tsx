import Page from "@/components/Page";
import { CategoryType, ViewModeProps } from "@/types/tab";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import TabsViewSwitcher from "../BOM/components/TabsViewSwitcher";
import ListDesignRequests from "./components/ListDesignRequests";
import DesignTechnicalDrawing from "./components/DesignTechnicalDrawing";
import CreateDesignRequest from "./components/designRequest/CreateDesignRequest";
import { useFetchData } from "@/hooks/useFetchData";
import { IDesignRequest } from "@/types/design-request";
import { getListDesignRequests } from "@/services/design-request-service";

const DataViewMode: ViewModeProps[] = [
  {
    id: 1,
    label: 'Danh sách yêu cầu thiết kế',
    value: 0
  },
  {
    id: 2,
    label: 'Thiết kế bản vẽ kỹ thuật',
    value: 1
  }
]

const DesignRequests = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>(0);
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.down('md'));
  const [openRequestAndDrawing, setOpenRequestAndDrawing] = useState<{ open: boolean, type: string }>({
    open: false,
    type: ''
  });

  const handleOpenAddDesignRequests = () => {
    setOpenRequestAndDrawing({ open: true, type: 'design_request'})
  }

  const handleCloseAddDesignRequests = async() => {
    setOpenRequestAndDrawing({ open: false, type: 'design_request'})
    await getListDesignRequests({ page: 1, limit: 10 })
  }

  const handleActiveCategory = (category: CategoryType) => {
    setActiveCategory(category);
    switch (category) {
      case 0:
        
        break;
      case 1:
        break;
    }
  }

  return (
    <Page title="Yêu cầu thiết kế">
      {!openRequestAndDrawing.open && (
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
                {DataViewMode.map((category, idx) => (
                  <Box
                    key={idx}
                    onClick={() => category.value && handleActiveCategory(category.value)}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      cursor: 'pointer',
                      textAlign: 'left',
                      bgcolor: activeCategory === category.value ? '#fff' : 'transparent',
                      color: '#000',
                      fontWeight: activeCategory === category.value ? 700 : 400,
                      border: '1px solid #000',
                      transition: '0.3s',
                      "&:hover": {
                        bgcolor: activeCategory === category.value ? "#fff" : 'rgba(255,255,255,0.1)'
                      } 
                    }}
                  >
                    {category.value}
                  </Box>
                ))}
              </Stack>
            ) : (
              <TabsViewSwitcher DataViewMode={DataViewMode} viewMode={activeCategory} onChange={handleActiveCategory}/>
            )}
          </Box>
          {activeCategory === 0 && (
            <ListDesignRequests
              onAddDesignRequest={handleOpenAddDesignRequests}
            />
          )}
          {activeCategory === 1 && (
            <DesignTechnicalDrawing/>
          )}
        </Box>
      )}

      {openRequestAndDrawing.open && openRequestAndDrawing.type === 'design_request' && (
        <CreateDesignRequest
          onBack={handleCloseAddDesignRequests}
          open={openRequestAndDrawing.open}
        />
      )}
    </Page>
  )
}

export default DesignRequests;
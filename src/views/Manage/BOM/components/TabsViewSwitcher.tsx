import { CategoryType, ViewModeProps } from '@/types/tab';
import { Box, Tabs, Tab } from '@mui/material';
import React from 'react';


interface Props {
  viewMode: CategoryType;
  onChange: (mode: CategoryType) => void;
  DataViewMode: ViewModeProps[]
}

const TabsViewSwitcher: React.FC<Props> = ({ viewMode, onChange, DataViewMode }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue as CategoryType);
  };

  return (
    <Box mb={1} sx={{flexGrow: 1, display: 'flex' , borderTop: '1px solid #d3d3d3ff', borderBottom: '1px solid #d3d3d3ff' }}>
      <Tabs 
        value={viewMode} 
        onChange={handleChange} 
        variant="standard"
        textColor='inherit'
        indicatorColor="secondary"
        sx={{
          '& .MuiTab-root': { color: '#000', fontWeight: 500 },
          '& .MuiTabs-indicator': { backgroundColor: '#000' },
        }}
    >
        {DataViewMode.map((data, index) => {
            return (
                <Tab 
                    key={index}
                    label={data.label} value={data.value} 
                    sx={{
                        color: '#000',
                        px: 4
                    }}
                />
            )
        })}
      </Tabs>
    </Box>
  );
};

export default TabsViewSwitcher;
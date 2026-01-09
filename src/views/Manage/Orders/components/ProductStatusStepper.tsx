import React from 'react';



import CheckIcon from '@mui/icons-material/Check';
import { Box, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, styled, Typography } from '@mui/material';



import { IProduct } from '@/types/product';


// Các mốc trạng thái
const status = ['pending', 'in_progress', 'completed'];

// Custom connector để đổi màu theo trạng thái
const ColorConnector = styled(StepConnector)<{ activeStatus: number }>(({ activeStatus }) => ({
  [`& .${stepConnectorClasses.alternativeLabel}`]: {
    top: 12,
  },

  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 8,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },

  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        activeStatus > 0
          ? `linear-gradient( 95deg, #4caf50 ${activeStatus * 33}%, #4caf50 ${activeStatus * 33}%, #4caf50 ${activeStatus * 33}%)`
          : '#eaeaf0',
    },
  },

  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        activeStatus > 0
          ? `linear-gradient( 95deg, #4caf50 ${activeStatus * 33}%, #4caf50 ${activeStatus * 33}%, #4caf50 ${activeStatus * 33}%)`
          : '#eaeaf0',
    },
  },
}));

interface ProductStatusStepperProps {
  products: IProduct[];
}

const ProductStatusStepper: React.FC<ProductStatusStepperProps> = ({ products }) => {
  // số sản phẩm đã hoàn thành
  const completedCount = products.filter(p => p.status === 'completed').length;
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 1,
      }}
    >
      <Stepper
        alternativeLabel
        activeStep={completedCount}
        connector={<ColorConnector activeStatus={completedCount} />}
        sx={{
          width: '100%',
          mx: 'auto',
          '& .MuiStep-root': {
            p: 0,
          },
          '& .MuiStepLabel-label': {
            mt: '6px',
            color: '#000',
            fontSize: '0.875rem',
          },
        }}
      >
        {products.map((product, index) => {
          const completed = product.status === 'completed';
          return (
            <Step key={index}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      backgroundColor: completed ? '#bef3c2ff' : 'rgba(0,0,0,0.1)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CheckIcon
                      sx={{
                        width: 20,
                        height: 20,
                        fontSize: 14,
                        color: completed ? '#ffffff' : '#9e9e9e',
                        border: `2px solid ${completed ? '#6d9b71ff' : '#bdbdbd'}`,
                        borderRadius: '50%',
                        bgcolor: completed ? '#6d9b71ff' : 'rgba(0,0,0,0.1)',
                      }}
                    />
                  </Box>
                )}
              >
                <Typography variant='body2' sx={{ color: '#000' }}>
                  SP{index + 1} ({product.name})
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default ProductStatusStepper;
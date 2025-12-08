import React from "react";
import { Box, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, styled, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

// Các mốc tiến độ
const steps = ["0%", "25%", "50%", "100%"];

// Custom connector để đổi màu theo tiến độ
const ColorConnector = styled(StepConnector)<{ activeStep: number }>(
    ({ activeStep }) => ({
        [`& .${stepConnectorClasses.alternativeLabel}`]: {
            top: 12,
        },
        
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 8,
            backgroundColor: '#eaeaf0',
            borderRadius: 1
        },

        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage: activeStep > 0 ? 
                    `linear-gradient( 95deg, #4caf50 ${activeStep * 33}%, #4caf50 ${activeStep * 33}%, #4caf50 ${activeStep * 33}%)` : '#eaeaf0',
            },
        },
        
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage: activeStep > 0 ?
                    `linear-gradient( 95deg, #4caf50 ${activeStep * 33}%, #4caf50 ${activeStep * 33}%, #4caf50 ${activeStep * 33}%)` : '#eaeaf0',
            },
        },

    })
)

interface ProgressStepperProps{
    maintenancePercentage: string | null
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ maintenancePercentage }) => {

    const activeStep = steps.findIndex((steps) => steps === maintenancePercentage);
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 3,
            }}
        >
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorConnector activeStep={activeStep}/>}
                sx={{
                    width: "100%",
                    mx: "auto",
                    "& .MuiStep-root": {
                        p: 0,
                    },
                    "& .MuiStepLabel-label": {
                        mt: "6px",
                        color: "#000",
                        fontSize: "0.875rem",
                    },
                }}
            >
                {steps.map((label, index) => {
                    const isActive = index <= activeStep;
                    return (
                        <Step key={label}>
                            <StepLabel
                                StepIconComponent={() => (
                                    <Box
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: "50%",
                                            backgroundColor: isActive ? "#bef3c2ff" : "rgba(0,0,0,0.1)",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <CheckIcon 
                                            sx={{ 
                                                width: 20, height: 20, 
                                                fontSize: 14, 
                                                color: isActive ? "#ffffff" : "#9e9e9e", 
                                                border: `2px solid ${isActive ? '#6d9b71ff' : '#bdbdbd'}`, 
                                                borderRadius: "50%", 
                                                bgcolor: isActive ? '#6d9b71ff' : 'rgba(0,0,0,0.1)'
                                            }} 
                                        />
                                    </Box>
                                )}
                            >
                            <Typography variant="body2" sx={{ color: "#000" }}>
                                {label}
                            </Typography>
                            </StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
        </Box>
    );
};

export default ProgressStepper;

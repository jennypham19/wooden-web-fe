import IconButton from "@/components/IconButton/IconButton";
import { NavigateBefore } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

interface NavigateBackProps{
    title: string | ReactNode;
    onBack: () => void;
}

const NavigateBack = (props: NavigateBackProps) => {
    const { title, onBack } = props;
    return(
        <Stack mt={1}>
            <IconButton
                handleFunt={onBack}
                icon={<NavigateBefore sx={{ width: '28px', height: '28px'}}/>}
            />
            <Typography pt={0.2} fontWeight={600} variant="h6">{title}</Typography>
        </Stack>
    )
}

export default NavigateBack;
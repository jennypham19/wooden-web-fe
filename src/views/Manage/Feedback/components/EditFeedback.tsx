import { Box, Stack, Typography } from "@mui/material";
import NavigateBack from "../../components/NavigateBack";
import { IFeedback } from "@/types/feedback";

interface EditFeedbackProps{
    onBack: () => void;
    feedback: IFeedback
}

const EditFeedback = (props: EditFeedbackProps) => {
    const { onBack, feedback } = props;

    const reset = () => {

    }

    const handleClose = () => {
        reset();
        onBack()
    }
    return(
        <Box>
            <NavigateBack
                title="Chỉnh sửa phản hồi khách hàng"
                onBack={handleClose}
            />
            <Box display='flex' justifyContent='center'>
                <Box>
                    {/* Header */}
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        mb={2}
                    >
                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                Chỉnh sửa phản hồi khách hàng {feedback.product}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Đơn hàng: <b>{feedback.order}</b>
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default EditFeedback;
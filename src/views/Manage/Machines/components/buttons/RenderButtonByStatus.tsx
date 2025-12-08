import { COLORS } from "@/constants/colors";
import { StatusMachine } from "@/constants/status";
import { IMachine } from "@/types/machine";
import { Box, Button } from "@mui/material";

interface RenderButtonByStatusProps{
    machine: IMachine,
    status: string | null,
    onViewMachine: (id: string) => void;
    onUpdateMachine: (id: string, type: string) => void;
}

const RenderButtonByStatus = (props: RenderButtonByStatusProps) => {
    const { status, machine, onViewMachine, onUpdateMachine } = props;
    return (
        <Box display='flex' justifyContent='space-between'>
            <Button
                fullWidth
                variant="outlined"
                sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5, mr: (status === StatusMachine.PAUSED || status === StatusMachine.STOPPED) ? 0 : 2 }}
                onClick={() => machine && onViewMachine(machine.id)}
            >
                Xem chi tiết
            </Button>
            {status === StatusMachine.FAULTY && (
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5 }}
                    onClick={() => machine && onUpdateMachine(machine.id, 'faulty')}
                >
                    Xử lý sự cố
                </Button>
            )}
            {status === StatusMachine.UNDER_MAINTENANCE && (
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5 }}
                    onClick={() => machine && onUpdateMachine(machine.id, 'under_maintenance')}
                >
                    Cập nhật tiến độ
                </Button>
            )}
            {status === StatusMachine.UNDER_REPAIR && (
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5 }}
                    onClick={() => machine && onUpdateMachine(machine.id, 'under_repair')}
                >
                    Cập nhật ngày sửa xong
                </Button>
            )}
            {status === StatusMachine.OPERATING && (
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ border: `1px solid ${COLORS.BUTTON}`, color: COLORS.BUTTON, borderRadius: 5 }}
                    onClick={() => machine && onUpdateMachine(machine.id, 'operating')}
                >
                    Cập nhật
                </Button>
            )}
        </Box>
    )
}

export default RenderButtonByStatus;
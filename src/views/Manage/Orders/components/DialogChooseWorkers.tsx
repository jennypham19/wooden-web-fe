import DialogComponent from "@/components/DialogComponent";
import { Card } from "@mui/material";

interface DialogChooseWorkersProps{
    open: boolean,
    onClose: () => void;
}

const DialogChooseWorkers = (props: DialogChooseWorkersProps) => {
    const { open, onClose } = props;

    const handleClose = () => {
        onClose()
    }
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={handleClose}
            dialogTitle="Phân công nhân lực"
            isActiveFooter={false}
        >
            <Card></Card>
        </DialogComponent>
    )
}

export default DialogChooseWorkers;
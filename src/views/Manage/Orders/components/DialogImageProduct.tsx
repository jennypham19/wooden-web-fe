import DialogComponent from "@/components/DialogComponent";
import CommonImage from "@/components/Image/index";

interface DialogImageProductProps{
    open: boolean;
    onClose: () => void;
    imageUrl: string
}

const DialogImageProduct: React.FC<DialogImageProductProps> = ({ open, onClose, imageUrl }) => {
    return(
        <DialogComponent
            dialogKey={open}
            handleClose={onClose}
            dialogTitle="Hình ảnh sản phẩm"
            isActiveFooter={false}
            isCenter={false}
        >
            <CommonImage
                src={imageUrl}
            />
        </DialogComponent>
    )
}

export default DialogImageProduct;
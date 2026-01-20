import Page from "@/components/Page";
import FeedbackManagement from "./components/FeedbackManagement";
import ListCompletedProducts from "./components/ListCompletedProducts";
import { Divider } from "@mui/material";
import { useState } from "react";
import { IProduct } from "@/types/product";
import StaffOrderFeedback from "./components/StaffOrderFeedback";
import DialogViewFeedbackProduct from "./components/feedbacks/DialogViewFeedbackProduct";
import { IFeedback } from "@/types/feedback";
import EditFeedback from "./components/EditFeedback";

const ManagementFeedbackCustomer = () => {
    const [openCompletedProducts, setOpenCompletedProducts] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    })
    const [openView, setOpenView] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    })
    const [product, setProduct] = useState<IProduct | null>(null);
    const [feedback, setFeedback] = useState<IFeedback | null>(null)

    /* Ghi nhận phản hồi */
    const handleOpenFeedback = (product: IProduct) => {
        setOpenCompletedProducts({ open: true, type: 'feedback' });
        setProduct(product)
    }

    const handleCloseFeedback = () => {
        setOpenCompletedProducts({ open: false, type: 'feedback' });
        setProduct(null);
        
    }

    /* Chỉnh sửa phản hồi */
    const handleOpenEditFeedback = (feedback: IFeedback) => {
        setOpenCompletedProducts({ open: true, type: 'edit-feedback'});
        setFeedback(feedback)
    }

    const handleCloseEditFeedback = () => {
        setOpenCompletedProducts({ open: false, type: 'edit-feedback'});
        setFeedback(null)
    }

    /* Xem chi tiết phản hồi */
    const handleOpenViewFeedbackProduct = (product: IProduct) => {
        setOpenView({ open: true, type: 'view-feedback-product' });
        setProduct(product)
    }

    const handleCloseViewFeedbackProduct = () => {
        setOpenView({ open: false, type: 'view-feedback-product' });
        setProduct(null);
        
    }

    return(
        <Page title="Quản lý phản hồi của khách hàng">
            {!openCompletedProducts.open && (
                <>
                    <ListCompletedProducts onOpenFeedback={handleOpenFeedback} onOpenViewFeedback={handleOpenViewFeedbackProduct}/>
                    <Divider sx={{ border: '1px solid #e6e3e3ff'}}/>
                    <FeedbackManagement onOpenEditFeedback={handleOpenEditFeedback}/>                
                </>
            )}

            {openCompletedProducts.open && openCompletedProducts.type === 'feedback' && product && (
                <StaffOrderFeedback
                    onBack={handleCloseFeedback}
                    product={product}
                />
            )}
            {openCompletedProducts.open && openCompletedProducts.type === 'edit-feedback' && feedback && (
                <EditFeedback
                    onBack={handleCloseEditFeedback}
                    feedback={feedback}
                />
            )}
            {openView.open && product && (
                <DialogViewFeedbackProduct
                    open={openView.open}
                    onClose={handleCloseViewFeedbackProduct}
                    product={product}
                />
            )}
        </Page>
    )
}

export default ManagementFeedbackCustomer;
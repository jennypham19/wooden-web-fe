import Page from "@/components/Page";
import FeedbackManagement from "./components/FeedbackManagement";
import ListCompletedProducts from "./components/ListCompletedProducts";
import { Divider } from "@mui/material";
import { useState } from "react";
import { IProduct } from "@/types/product";
import StaffOrderFeedback from "./components/StaffOrderFeedback";

const ManagementFeedbackCustomer = () => {
    const [openCompletedProducts, setOpenCompletedProducts] = useState<{ open: boolean, type: string }>({
        open: false,
        type: ''
    })
    const [product, setProduct] = useState<IProduct | null>(null);

    const handleOpenFeedback = (product: IProduct) => {
        setOpenCompletedProducts({ open: true, type: 'feedback' });
        setProduct(product)
    }

    const handleCloseFeedback = () => {
        setOpenCompletedProducts({ open: false, type: 'feedback' });
        setProduct(null)
    }

    return(
        <Page title="Quản lý phản hồi của khách hàng">
            {!openCompletedProducts.open && (
                <>
                    <ListCompletedProducts onOpenFeedback={handleOpenFeedback}/>
                    <Divider sx={{ border: '1px solid #e6e3e3ff'}}/>
                    <FeedbackManagement/>                
                </>
            )}

            {openCompletedProducts.open && openCompletedProducts.type === 'feedback' && product && (
                <StaffOrderFeedback
                    onBack={handleCloseFeedback}
                    product={product}
                />
            )}
        </Page>
    )
}

export default ManagementFeedbackCustomer;
import Page from "@/components/Page";
import { CreateOrderPage, CustomerPage, OrderListPage, SalesReportPage } from "./components/SalesSidebar";

const Orders = () => {
    return (
        <Page title="Quản lý đơn hàng">
            Quản lý đơn hàng
            <CreateOrderPage/>
            <OrderListPage/>
            <CustomerPage/>
            <SalesReportPage/>
        </Page>
    )
}
export default Orders;
import Page from "@/components/Page";
import useAuth from "@/hooks/useAuth";
import { ROLE } from "@/constants/roles";
import ManagementOrderEmployee from "../Role/Employee/ManagementOrder";
import ManagementOrderFactoryManager from "../Role/FactoryManager/ManagementOrder";
import ManagementOrderCarpenter from "../Role/Carpenter/ManagementOrder";


const Orders = () => {
    const { profile } = useAuth();

    return (
        <Page title="Quản lý đơn hàng">
            {profile?.role === ROLE.EMPLOYEE && (
                <ManagementOrderEmployee/>
            )}
            {profile?.role === ROLE.FACTORY_MANAGER && (
                <ManagementOrderFactoryManager/>
            )}
            {profile?.role === ROLE.CARPENTER && (
                <ManagementOrderCarpenter/>
            )}
        </Page>
    )
}
export default Orders;
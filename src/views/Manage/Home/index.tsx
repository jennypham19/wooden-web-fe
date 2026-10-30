import Page from "@/components/Page";
import { ROLE } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";
import Dashboard from "../Role/Employee/Dashboard";
import DashboardAccountant from "../Role/Accountant/Dashboard";

const Home = () => {
    const { profile } = useAuth();
    return(
        <Page title="Trang chủ">
            {profile?.role === ROLE.EMPLOYEE && (
                <Dashboard/>
            )}
            {profile?.role === ROLE.ACCOUNTING && (
                <DashboardAccountant/>
            )}
            
        </Page>
    )
}

export default Home;
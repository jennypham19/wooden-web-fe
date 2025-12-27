import useAuth from "@/hooks/useAuth";
import Page from "@/components/Page";
import { ROLE } from "@/constants/roles";
import ManagementJobManager from "../Role/FactoryManager/ManagementJob";
import ManagementJobCarpenter from "../Role/Carpenter/ManagementJob";

const Job = () => {
    const { profile } = useAuth();
   
    return(
        <Page title="Quản lý công việc">
            {profile?.role === ROLE.FACTORY_MANAGER && (
                <ManagementJobManager/>
            )}
            {profile?.role === ROLE.CARPENTER && (
                <ManagementJobCarpenter/>
            )}
        </Page>
    )
}

export default Job;
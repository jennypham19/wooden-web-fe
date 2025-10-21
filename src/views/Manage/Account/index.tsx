import Page from "@/components/Page";
import DecentralizationAccountManagedByAdmin from "../Role/Admin/DecentralizationAccountManagedByAdmin";

const Account = () => {
    return(
        <Page title="Phân quyền quản lý">
            <DecentralizationAccountManagedByAdmin/>
        </Page>
    )
}

export default Account;
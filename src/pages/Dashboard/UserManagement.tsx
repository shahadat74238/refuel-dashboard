import UserManagementTable from "../../Components/ui/tables/UserManagementTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function UserManagement() {
  return (
    <PageLayout title="User management">
      <PageContent>
        <UserManagementTable />
      </PageContent>
    </PageLayout>
  );
}

export default UserManagement;

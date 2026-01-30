import AdminManagementTable from "../../Components/ui/tables/AdminManagementTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function AdminManagement() {
  return (
    <PageLayout title="Admin management">
      <PageContent>
        <AdminManagementTable />
      </PageContent>
    </PageLayout>
  );
}

export default AdminManagement;

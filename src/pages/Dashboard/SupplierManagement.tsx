import SupplierManagementTable from "../../Components/ui/tables/SupplierManagementTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function SupplierManagement() {
  return (
    <PageLayout title="Supplier management">
      <PageContent>
        <SupplierManagementTable />
      </PageContent>
    </PageLayout>
  );
}

export default SupplierManagement;

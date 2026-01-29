import DriverManagementTable from "../../Components/ui/tables/DriverManagementTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function DriverManagement() {
  return (
    <PageLayout title="Commuter/Driver management">
      <PageContent>
        <DriverManagementTable />
      </PageContent>
    </PageLayout>
  );
}

export default DriverManagement;

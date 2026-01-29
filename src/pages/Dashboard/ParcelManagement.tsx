import ParcelTable from "../../Components/ui/tables/ParcelTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function ParcelManagement() {
  return (
    <PageLayout title="Parcel management">
      <PageContent>
        <ParcelTable />
      </PageContent>
    </PageLayout>
  );
}

export default ParcelManagement;

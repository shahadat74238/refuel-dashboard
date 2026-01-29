import RefundTable from "../../Components/ui/tables/RefundTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function RefundManagement() {
  return (
    <PageLayout title="Refund management">
      <PageContent>
        <RefundTable />
      </PageContent>
    </PageLayout>
  );
}

export default RefundManagement;

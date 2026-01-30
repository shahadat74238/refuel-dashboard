import CompletedOrderTable from "../../Components/ui/tables/CompletedOrderTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function CompletedOrder() {
  return (
    <PageLayout title="Complect Order">
      <PageContent>
        <CompletedOrderTable />
      </PageContent>
    </PageLayout>
  );
}

export default CompletedOrder;

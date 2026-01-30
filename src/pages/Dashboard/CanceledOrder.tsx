import CompletedOrderTable from "../../Components/ui/tables/CompletedOrderTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function CanceledOrder() {
  return (
    <PageLayout title="Canceled Order">
      <PageContent>
        <CompletedOrderTable />
      </PageContent>
    </PageLayout>
  );
}

export default CanceledOrder;

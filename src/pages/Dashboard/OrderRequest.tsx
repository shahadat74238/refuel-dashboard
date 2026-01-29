import OrderRequestTable from "../../Components/ui/tables/OrderRequestTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function OrderRequest() {
  return (
    <PageLayout title="Order Request">
      <PageContent>
        <OrderRequestTable />
      </PageContent>
    </PageLayout>
  );
}

export default OrderRequest;

import NewSupplierRequestTable from "../../Components/ui/tables/NewSupplierRequestTable";
import { PageContent, PageLayout } from "../../Layout/PageLayOut";

function NewSupplierRequest() {
  return (
    <PageLayout title="New supplier request">
      <PageContent>
        <NewSupplierRequestTable />
      </PageContent>
    </PageLayout>
  );
}

export default NewSupplierRequest;

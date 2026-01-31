import { Table, Input } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import UserDetailsModal from "../../Dialog/UserDetailsModal";
import ApproveRejectModal from "../../Dialog/ApproveRejectModal";
import {
  newSupplierManagementColumns,
  type ISupplierManagement,
} from "../columns/NewSupplierColumns";
import ViewDocModal from "../../Dialog/ViewDocModal";

const dummySuppliers: ISupplierManagement[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    _id: i.toString(),
    supplier_name: "Elect Energy Nigeria Limited",
    supplier_image: "https://randomuser.me/api/portraits/women/7.jpg",
    address: "Lagos Island, Lagos",
    contact_number: "+234 54564 5565",
    email_address: "tiagofelipe@email.com",
    request_date: "2 Nov 2025",
    document_url: "https://randomuser.me/api/portraits/women/7.jpg",
  }));

function NewSupplierRequestTable() {
  const [searchTerm, setSearchTerm] = useState("");
 
  const [page, setPage] = useState(1); // Added state
  const [limit, setLimit] = useState(10); // Added state
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"APPROVE" | "REJECT">("APPROVE");
  const [selectedSupplier, setSelectedSupplier] =
    useState<ISupplierManagement | null>(null);

  console.log(searchTerm);

  const handleAction = (
    supplier: ISupplierManagement,
    type: "APPROVE" | "REJECT",
  ) => {
    setSelectedSupplier(supplier);
    setModalType(type);
    setIsActionModalOpen(true);
  };

  const onConfirmAction = async () => {
    toast.success(`Supplier ${modalType.toLowerCase()}ed successfully`);
    setIsActionModalOpen(false);
  };

  const handleViewDoc = (supplier: ISupplierManagement) => {
    setSelectedSupplier(supplier);
    setIsDocModalOpen(true);
  };

  const handleOpenDocFromDetails = () => {
    setIsDocModalOpen(true);
  };

  return (
    <div className="space-y-4 p-6">
      <Input
        placeholder="Search..."
        prefix={<FiSearch className="text-gray-400 mr-2" />}
        className="max-w-xs h-12 !rounded-lg border-none shadow-sm"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="custom-user-table">
        <Table
          columns={newSupplierManagementColumns(
            (rec) => handleAction(rec, "APPROVE"),
            (rec) => handleAction(rec, "REJECT"),
            (rec) => handleViewDoc(rec), // Handle view doc
          )}
          dataSource={dummySuppliers}
          rowKey="_id"
          rowClassName="!mt-5"
          onRow={(record) => ({
            onClick: () => {
              setSelectedSupplier(record);
              setIsDetailsOpen(true);
            },
          })}
           pagination={{
            position: ["bottomRight"],
            current: page,
            pageSize: limit,
            total: 50,
            showSizeChanger: true,
            onChange: (p, s) => {
              setPage(p);
              setLimit(s);
            },
          }}
        />
      </div>

      <ApproveRejectModal
        isModalOpen={isActionModalOpen}
        setIsModalOpen={setIsActionModalOpen}
        onConfirm={onConfirmAction}
        type={modalType}
        name={selectedSupplier?.supplier_name || ""}
      />

      <UserDetailsModal
        isModalOpen={isDetailsOpen}
        setIsModalOpen={setIsDetailsOpen}
        title="Supplier Details"
        is_supplier={true}
        onViewDocument={handleOpenDocFromDetails}
      />
      <ViewDocModal
        isModalOpen={isDocModalOpen}
        setIsModalOpen={setIsDocModalOpen}
        docUrl={selectedSupplier?.document_url || ""}
      />
    </div>
  );
}

export default NewSupplierRequestTable;

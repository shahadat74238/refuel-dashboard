import { Table, Input } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import UserDetailsModal from "../../Dialog/UserDetailsModal";
import BlockModal from "../../Dialog/BlockModal"; // Import your BlockModal
import {
  SupplierManagementColumns,
  type ISupplierManagement,
} from "../columns/SupplierManagementColumns";
import ViewDocModal from "../../Dialog/ViewDocModal";

const dummySuppliers: ISupplierManagement[] = [
  {
    _id: "1",
    supplier_name: "Elect Energy Nigeria Limited",
    supplier_image: "https://randomuser.me/api/portraits/men/1.jpg",
    address: "Lagos Island, Lagos",
    contact_number: "+234 54564 5565",
    email_address: "tiagofelipe@email.com",
    added_date: "2 Nov 2025",
    is_blocked: false,
    document_url: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    _id: "2",
    supplier_name: "Elect Energy Nigeria Limited",
    supplier_image: "https://randomuser.me/api/portraits/men/2.jpg",
    address: "Lagos Island, Lagos",
    contact_number: "+234 54564 5565",
    email_address: "tiagofelipe@email.com",
    added_date: "2 Nov 2025",
    is_blocked: true, // One blocked row as per image
    document_url: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  // Add 5 more similar rows to match the image
  ...Array(5)
    .fill(null)
    .map((_, i) => ({
      _id: (i + 3).toString(),
      supplier_name: "Elect Energy Nigeria Limited",
      supplier_image: `https://randomuser.me/api/portraits/men/${i + 3}.jpg`,
      address: "Lagos Island, Lagos",
      contact_number: "+234 54564 5565",
      email_address: "tiagofelipe@email.com",
      added_date: "2 Nov 2025",
      is_blocked: false,
      document_url: "https://randomuser.me/api/portraits/men/1.jpg",
    })),
];

function SupplierManagementTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1); // Added state
  const [limit, setLimit] = useState(10); // Added state
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] =
    useState<ISupplierManagement | null>(null);

  console.log(searchTerm);

  const handleBlockClick = (supplier: ISupplierManagement) => {
    setSelectedSupplier(supplier);
    setIsBlockModalOpen(true);
  };

  const handleConfirmBlockAction = async () => {
    const action = selectedSupplier?.is_blocked ? "unblocked" : "blocked";
    toast.success(`Supplier ${action} successfully`);
    setIsBlockModalOpen(false);
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
          columns={SupplierManagementColumns(handleBlockClick)}
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

      <BlockModal
        isModalOpen={isBlockModalOpen}
        setIsModalOpen={setIsBlockModalOpen}
        onConfirm={handleConfirmBlockAction}
        userStatus={selectedSupplier?.is_blocked ? "BLOCKED" : "ACTIVE"}
      />

      <UserDetailsModal
        isModalOpen={isDetailsOpen}
        setIsModalOpen={setIsDetailsOpen}
        title="Supplier Details"
        is_supplier={true}
        onViewDocument={() => {
          setIsDetailsOpen(false);
          setIsDocModalOpen(true);
        }}
      />

      <ViewDocModal
        isModalOpen={isDocModalOpen}
        setIsModalOpen={setIsDocModalOpen}
        docUrl={selectedSupplier?.document_url || ""}
      />
    </div>
  );
}

export default SupplierManagementTable;

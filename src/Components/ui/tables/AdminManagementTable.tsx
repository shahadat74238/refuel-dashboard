import { Table, Input } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import RemoveAdminModal from "../../Dialog/RemoveAdminModal";
import { AdminManagementColumns, type IAdminManagement } from "../columns/AdminManagementColumns";

const dummyAdmins: IAdminManagement[] = Array(5).fill(null).map((_, i) => ({
  _id: i.toString(),
  name: "Faris Shafi",
  email: "rayyan6352@email.com",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
  phone: "203310 23102010",
  address: "Lagos",
  author: "@Faris Shafi",
  added_date: "7 September 2025",
}));

function AdminManagementTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdminManagement | null>(null);
  console.log(searchTerm)

  const handleRemoveClick = (admin: IAdminManagement) => {
    setSelectedAdmin(admin);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    toast.success(`${selectedAdmin?.name} removed successfully`);
    setIsRemoveModalOpen(false);
    setSelectedAdmin(null);
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
          columns={AdminManagementColumns(handleRemoveClick)}
          dataSource={dummyAdmins}
          rowKey="_id"
          rowClassName="bg-white hover:shadow-md transition-shadow cursor-default shadow-sm"
          pagination={{
            position: ["bottomRight"],
            pageSize: 10,
          }}
        />
      </div>

      <RemoveAdminModal
        isModalOpen={isRemoveModalOpen}
        setIsModalOpen={setIsRemoveModalOpen}
        onConfirm={handleConfirmRemove}
        adminName={selectedAdmin?.name || ""}
      />

      
    </div>
  );
}

export default AdminManagementTable;
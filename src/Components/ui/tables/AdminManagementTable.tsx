/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Input, Button } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegSquarePlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import RemoveAdminModal from "../../Dialog/RemoveAdminModal";
import {
  AdminManagementColumns,
  type IAdminManagement,
} from "../columns/AdminManagementColumns";
import { primaryBtn } from "../../../constant/btnStyle";
import AddNewAdminModal from "../../Dialog/AddNewAdminModal";
import AdminSuccessModal from "../../Dialog/AdminSuccessModal";

const dummyAdmins: IAdminManagement[] = Array(5)
  .fill(null)
  .map((_, i) => ({
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<IAdminManagement | null>(
    null,
  );
  console.log(searchTerm);

  const handleRemoveClick = (admin: IAdminManagement) => {
    setSelectedAdmin(admin);
    setIsRemoveModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    toast.success(`${selectedAdmin?.name} removed successfully`);
    setIsRemoveModalOpen(false);
    setSelectedAdmin(null);
  };

   const handleConfirmAdd = (values: any) => {
    console.log("New Admin Data:", values);
    setIsAddModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search..."
          prefix={<FiSearch className="text-gray-400 mr-2" />}
          className="max-w-xs h-12 !rounded-lg border-none shadow-sm"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
        size="small"
        style={primaryBtn}
        onClick={() => setIsAddModalOpen(true)}
        className="max-w-36 !text-sm !h-10 !bg-white"
        >
        <FaRegSquarePlus className="text-core-primary" size={20} />
          Add Admin</Button>
      </div>

      <div className="custom-user-table">
        <Table
          columns={AdminManagementColumns(handleRemoveClick)}
          dataSource={dummyAdmins}
          rowKey="_id"
          rowClassName="!mt-5"
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

      <AddNewAdminModal
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        onConfirm={handleConfirmAdd}
      />
      <AdminSuccessModal 
    isModalOpen={isSuccessModalOpen} 
    setIsModalOpen={setIsSuccessModalOpen} 
/>
    </div>
  );
}

export default AdminManagementTable;

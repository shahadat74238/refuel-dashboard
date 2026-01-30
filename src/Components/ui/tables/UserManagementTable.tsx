import { Table, Input } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  getUserManagementColumns,
  type IUserManagement,
} from "../columns/UserManagementColumns";
import toast from "react-hot-toast";
import BlockModal from "../../Dialog/BlockModal";
import UserDetailsModal from "../../Dialog/UserDetailsModal";

const dummyUsers: IUserManagement[] = [
  {
    _id: "1",
    customer_name: "Tiago Felipe",
    customer_image: "https://randomuser.me/api/portraits/men/1.jpg",
    address: "Lagos Island, Lagos",
    contact_number: "+234 54564 5565",
    email_address: "tiagofelipe@email.com",
    added_date: "2 Nov 2025",
    is_blocked: false,
  },
  {
    _id: "2",
    customer_name: "Chinedu Okafor",
    customer_image: "https://randomuser.me/api/portraits/men/2.jpg",
    address: "Ikeja, Lagos",
    contact_number: "+234 80321 4456",
    email_address: "chinedu.okafor@email.com",
    added_date: "5 Nov 2025",
    is_blocked: true,
  },
  {
    _id: "3",
    customer_name: "Adebayo Oguleye",
    customer_image: "https://randomuser.me/api/portraits/men/3.jpg",
    address: "Lekki Phase 1, Lagos",
    contact_number: "+234 70555 9901",
    email_address: "adebayo88@email.com",
    added_date: "8 Nov 2025",
    is_blocked: false,
  },
  {
    _id: "4",
    customer_name: "Fatima Yusuf",
    customer_image: "https://randomuser.me/api/portraits/women/4.jpg",
    address: "Victoria Island, Lagos",
    contact_number: "+234 90222 1133",
    email_address: "fatima.y@email.com",
    added_date: "10 Nov 2025",
    is_blocked: false,
  },
  {
    _id: "5",
    customer_name: "Blessing Okon",
    customer_image: "https://randomuser.me/api/portraits/women/5.jpg",
    address: "Surulere, Lagos",
    contact_number: "+234 81444 7788",
    email_address: "blessing.okon@email.com",
    added_date: "12 Nov 2025",
    is_blocked: true,
  },
  {
    _id: "6",
    customer_name: "Samuel Abraham",
    customer_image: "https://randomuser.me/api/portraits/men/6.jpg",
    address: "Ajah, Lagos",
    contact_number: "+234 70333 4455",
    email_address: "sam.abraham@email.com",
    added_date: "14 Nov 2025",
    is_blocked: false,
  },
  {
    _id: "7",
    customer_name: "Grace Emmanuel",
    customer_image: "https://randomuser.me/api/portraits/women/7.jpg",
    address: "Yaba, Lagos",
    contact_number: "+234 90111 2233",
    email_address: "grace.emma@email.com",
    added_date: "15 Nov 2025",
    is_blocked: false,
  },
  {
    _id: "8",
    customer_name: "Olawale Johnson",
    customer_image: "https://randomuser.me/api/portraits/men/8.jpg",
    address: "Gbagada, Lagos",
    contact_number: "+234 80222 8899",
    email_address: "wale.johnson@email.com",
    added_date: "18 Nov 2025",
    is_blocked: true,
  },
];

function UserManagementTable() {
  const [page, setPage] = useState(1); // Added state
  const [limit, setLimit] = useState(10); // Added state
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserManagement | null>(
    null,
  );
  const [viewingUser, setViewingUser] = useState<IUserManagement | null>(null);
  console.log(viewingUser);

  console.log(searchTerm);

  const handleOpenBlockModal = (user: IUserManagement) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleOpenDetails = (user: IUserManagement) => {
    setViewingUser(user);
    setIsDetailsOpen(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedUser) return;

    // Simulate API call
    const action = selectedUser.is_blocked ? "unblocked" : "blocked";
    toast.success(`User ${action} successfully`);

    setIsModalOpen(false);
    setSelectedUser(null);
    // In real app: refetch() or update local state
  };

  return (
    <div className="space-y-4 p-6 ">
      <Input
        placeholder="Search..."
        prefix={<FiSearch className="text-gray-400 mr-2" />}
        className="max-w-xs h-12 !rounded-lg border-none shadow-sm"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="custom-user-table">
        <Table
          columns={getUserManagementColumns(handleOpenBlockModal)}
          dataSource={dummyUsers}
          rowKey="_id"
          rowClassName={() =>
            "bg-white hover:shadow-md transition-shadow cursor-pointer"
          }
          onRow={(record) => ({
            onClick: () => handleOpenDetails(record),
          })}
          pagination={{
            position: ["bottomRight"],
            current: page,
            pageSize: limit,
            total: dummyUsers.length,
            showSizeChanger: true,
            onChange: (p, s) => {
              setPage(p);
              setLimit(s);
            },
          }}
        />
      </div>

      <BlockModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onConfirm={handleConfirmAction}
        userStatus={selectedUser?.is_blocked ? "BLOCKED" : "ACTIVE"}
      />

      <UserDetailsModal
        isModalOpen={isDetailsOpen}
        setIsModalOpen={setIsDetailsOpen}
        title="User Details"
      />
    </div>
  );
}
export default UserManagementTable;

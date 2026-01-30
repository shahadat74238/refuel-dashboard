import type { ColumnsType } from "antd/es/table";
import { RiUserForbidLine } from "react-icons/ri";

export interface IUserManagement {
  _id: string;
  customer_name: string;
  customer_image: string;
  address: string;
  contact_number: string;
  email_address: string;
  added_date: string;
  is_blocked: boolean; // Added this field
}

export const getUserManagementColumns = (
  onBlockClick: (record: IUserManagement) => void
): ColumnsType<IUserManagement> => [
  {
    title: "Customer",
    dataIndex: "customer_name",
    key: "customer",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img src={record.customer_image} className="w-12 h-12 rounded-full object-cover" alt="" />
        <span className="text-gray-800 font-bold text-base">{record.customer_name}</span>
      </div>
    ),
  },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Contact Number", dataIndex: "contact_number", key: "contact_number" },
  { title: "Email Address", dataIndex: "email_address", key: "email_address" },
  { title: "Added Date", dataIndex: "added_date", key: "added_date" },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents row navigation
            onBlockClick(record);
          }}
          className={`${
            record.is_blocked ? "text-danger hover:bg-danger/10" : "text-core-primary hover:bg-core-primary/10"
          } p-2 rounded-full transition-colors cursor-pointer`}
        >
          <RiUserForbidLine size={20} />
        </button>
      </div>
    ),
  },
];
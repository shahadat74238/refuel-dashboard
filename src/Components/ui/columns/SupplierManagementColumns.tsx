import type { ColumnsType } from "antd/es/table";
import { LuUser } from "react-icons/lu"; // A clean person icon
import { RiUserForbidLine } from "react-icons/ri"; // Person icon with block sign

export interface ISupplierManagement {
  _id: string;
  supplier_name: string;
  supplier_image: string;
  address: string;
  contact_number: string;
  email_address: string;
  added_date: string; // Changed from request_date
  is_blocked: boolean; // Added for status logic
  document_url: string; 
}

export const SupplierManagementColumns = (
  onBlockClick: (record: ISupplierManagement) => void
): ColumnsType<ISupplierManagement> => [
  {
    title: "Supplier",
    dataIndex: "supplier_name",
    key: "supplier",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img src={record.supplier_image} className="w-12 h-12 rounded-full object-cover" alt="" />
        <span className="text-gray-800 font-bold text-base">{record.supplier_name}</span>
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
            e.stopPropagation(); // Prevents opening the UserDetailsModal
            onBlockClick(record);
          }}
          className="p-2 rounded-full transition-colors cursor-pointer"
        >
          {record.is_blocked ? (
            <RiUserForbidLine className="text-red-500" size={24} />
          ) : (
            <LuUser className="text-green-500" size={24} />
          )}
        </button>
      </div>
    ),
  },
];
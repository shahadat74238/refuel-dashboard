import type { ColumnsType } from "antd/es/table";
import {
  HiOutlineDocumentText,
  HiOutlineCheck,
  HiOutlineX,
} from "react-icons/hi";

export interface ISupplierManagement {
  _id: string;
  supplier_name: string;
  supplier_image: string;
  address: string;
  contact_number: string;
  email_address: string;
  request_date: string;
  document_url: string;
}

export const newSupplierManagementColumns = (
  onApprove: (record: ISupplierManagement) => void,
  onReject: (record: ISupplierManagement) => void,
  onViewDoc: (record: ISupplierManagement) => void, // Added this
): ColumnsType<ISupplierManagement> => [
  {
    title: "Supplier",
    dataIndex: "supplier_name",
    key: "supplier",
    render: (_, record) => (
      <div className="flex items-center gap-3 ">
        <img
          src={record.supplier_image}
          alt={record.supplier_name}
          className="w-12 h-12 rounded-full object-cover border border-gray-100"
        />
        <div className="flex flex-col">
          <span className="text-foreground font-medium text-base leading-tight">
            {record.supplier_name}
          </span>
          <span className="text-muted text-sm">example@gmail.com</span>
        </div>
      </div>
    ),
  },
  { title: "Address", dataIndex: "address", key: "address" },
  {
    title: "Contact Number",
    dataIndex: "contact_number",
    key: "contact_number",
  },
  { title: "Email Address", dataIndex: "email_address", key: "email_address" },
  { title: "Request Date", dataIndex: "request_date", key: "request_date" },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <div className="flex justify-center items-center gap-6">
        {/* DOCUMENT ICON BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDoc(record);
          }}
          className="text-green-600 hover:scale-110 transition-transform cursor-pointer"
        >
          <HiOutlineDocumentText size={28} />
        </button>

        {/* APPROVE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onApprove(record);
          }}
          className="text-green-500 hover:scale-110 transition-transform cursor-pointer"
        >
          <HiOutlineCheck size={28} />
        </button>

        {/* REJECT BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReject(record);
          }}
          className="text-red-500 hover:scale-110 transition-transform cursor-pointer"
        >
          <HiOutlineX size={28} />
        </button>
      </div>
    ),
  },
];

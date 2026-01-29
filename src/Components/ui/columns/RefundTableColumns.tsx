/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye } from "lucide-react";

const refundTableColumns = (onAction: (record: any) => void) => [
  {
    title: "SL no.",
    dataIndex: "slNo",
    key: "slNo",
    render: (text: string) => <span className="text-gray-600">#{text}</span>,
  },
  {
    title: "User’s Name",
    key: "userName",
    render: (record: any) => (
      <div className="flex items-center gap-3">
        <img
          src={record.avatar}
          alt={record.name}
          className="w-10 h-10 rounded-lg object-cover border border-gray-100"
        />
        <span className="font-medium text-gray-700">{record.name}</span>
      </div>
    ),
  },
  {
    title: "Contact Number",
    dataIndex: "contact",
    key: "contact",
    render: (text: string) => <span className="text-gray-600">{text}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text: string) => <span className="text-gray-600">{text}</span>,
  },
  {
    title: "Action",
    dataIndex: "status",
    key: "action",
    render: (status: string) => (
      <button className="bg-[#E59148] text-white px-4 py-1.5 rounded-lg text-xs font-medium min-w-[90px] cursor-default">
        {status}
      </button>
    ),
  },
  {
    title: "View Details",
    key: "viewDetails",
    align: 'center' as const,
    render: (record: any) => (
      <button
        onClick={() => onAction(record)}
        className="bg-[#2B658A] p-2 rounded-lg text-white hover:bg-[#1e4a66] transition-colors cursor-pointer"
      >
        <Eye size={18} />
      </button>
    ),
  },
];

export default refundTableColumns;
import type { ColumnsType } from "antd/es/table";
import { HiOutlineTrash } from "react-icons/hi";

export interface IReportManagement {
  _id: string;
  name: string;
  email: string;
  report: string;
  date: string;
}

export const helpSupportColumns = (
  onDeleteClick: (record: IReportManagement) => void
): ColumnsType<IReportManagement> => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span className="text-gray-900 font-bold">{text}</span>,
  },
  { title: "Email", dataIndex: "email", key: "email" },
  { 
    title: "Report", 
    dataIndex: "report", 
    key: "report",
    width: '40%',
    render: (text) => <span className="text-gray-500 text-sm">{text}</span>
  },
  { title: "Date", dataIndex: "date", key: "date" },
  {
    title: "",
    key: "action",
    align: 'center',
    render: (_, record) => (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick(record);
        }}
        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
      >
        <HiOutlineTrash size={24} />
      </button>
    ),
  },
];
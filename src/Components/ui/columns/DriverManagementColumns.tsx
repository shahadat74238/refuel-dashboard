import type { ColumnsType } from "antd/es/table";
import { FiEye } from "react-icons/fi";
import { MdBlock } from "react-icons/md";

export interface IDriver {
  _id: string;
  full_name: string;
  email: string;
  profile_picture?: string;
  phone_number?: string;
  status: string;
  role: string;
  // Add other fields as needed
}

export const DriverManagementColumns = (
  onBlock: (record: IDriver) => void,
  onView: (id: string) => void,
  currentPage: number,
  pageSize: number,
): ColumnsType<IDriver> => [
  {
    title: "SL no.",
    key: "slNo",
    render: (_, __, index) => (
      <span className="text-gray-600 font-medium">
        #{(currentPage - 1) * pageSize + (index + 1)}
      </span>
    ),
  },
  {
    title: "User's Name",
    dataIndex: "full_name",
    key: "full_name",
    render: (text, record) => (
      <div className="flex items-center gap-3">
        <img
          src={
            record.profile_picture ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
          }
          alt={text}
          className="w-10 h-10 rounded-lg object-cover border border-gray-100"
        />
        <span className="text-gray-700 font-medium">{text}</span>
      </div>
    ),
  },
  {
    title: "Contact Number",
    dataIndex: "phone_number",
    key: "phone_number",
    render: (text) => <span className="text-gray-600">{text || "N/A"}</span>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (text) => <span className="text-gray-600">{text}</span>,
  },
  {
    title: "Action",
    key: "action",
    align: "right",
    render: (_, record) => (
      <div className="flex items-center justify-end gap-2">
        {/* View Button */}
        <button
          onClick={() => onView(record._id)}
          className="p-2.5 rounded-md bg-[#255779] text-white hover:bg-[#1a3e57] transition-colors cursor-pointer"
        >
          <FiEye size={20} />
        </button>

        {/* Block Button */}
        <button
          onClick={() => onBlock(record)}
          className={`p-2.5 rounded-md transition-colors cursor-pointer ${
            record.status === "BLOCKED"
              ? "bg-gray-600 text-white"
              : "bg-[#D90429] text-white hover:bg-red-700"
          }`}
        >
          <MdBlock size={20} />
        </button>
      </div>
    ),
  },
];

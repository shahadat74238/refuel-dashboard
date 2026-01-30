import type { ColumnsType } from "antd/es/table";
import { Button } from "antd";

export interface IAdminManagement {
  _id: string;
  name: string;
  email: string;
  image: string;
  phone: string;
  address: string;
  author: string;
  added_date: string;
}

export const AdminManagementColumns = (
  onRemove: (record: IAdminManagement) => void
): ColumnsType<IAdminManagement> => [
  {
    title: "Admin",
    dataIndex: "name",
    key: "admin",
    render: (_, record) => (
      <div className="flex items-center gap-3">
        <img src={record.image} className="w-12 h-12 rounded-full object-cover" alt="" />
        <div className="flex flex-col">
          <span className="text-gray-800 font-bold text-base leading-tight">{record.name}</span>
          <span className="text-gray-500 text-sm">{record.email}</span>
        </div>
      </div>
    ),
  },
  { title: "Phone Number", dataIndex: "phone", key: "phone" },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Author", dataIndex: "author", key: "author" },
  { title: "Added", dataIndex: "added_date", key: "added" },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <div className="flex justify-end">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(record);
          }}
          className="!bg-[#EDEDED] !border-none !text-black !font-bold !h-10 !px-8 !rounded-xl hover:!bg-gray-200"
        >
          Remove
        </Button>
      </div>
    ),
  },
];
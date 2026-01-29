import { Eye } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const statusColorMap: Record<string, string> = {
  WAITING: "text-[#FF9800]",
  PENDING: "text-blue-500",
  ONGOING: "text-cyan-500",
  COMPLETED: "text-green-500",
  REJECTED: "text-red-500",
};

const parcelTableColumns = (onAction: (record: any) => void) => [
  {
    title: "ID",
    dataIndex: "parcel_id", // Matches API
    key: "parcel_id",
  },
  {
    title: "Customer",
    dataIndex: "user_id",
    key: "customer",
    render: (user: any) => (
      <div className="flex items-center gap-2">
        <img
          src={user?.profile_picture}
          alt="parcel"
          className="w-8 h-8 rounded"
        />
        <span>{user?.full_name}</span>
      </div>
    ),
  },
  {
    title: "Parcel Type",
    dataIndex: "parcel_name", // Matches API
    key: "parcel_name",
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: "Parcel Image",
    key: "parcel_image", // Remove dataIndex to get the full record as first arg
    render: (record: any) => (
      <div className="flex items-center gap-2">
        <img
          src={record.parcel_images?.[0] || "fallback_url_here"}
          alt="parcel"
          className="w-8 h-8 rounded object-cover border"
        />
      </div>
    ),
  },
  {
    title: "Delivery Time",
    key: "deliveryTime",
    render: (_: any, record: any) => (
      <span>{`${record.date} ${record.time}`}</span>
    ),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    render: (priority: string) => <span>{priority}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      // Fallback to gray if status is not in the map
      const colorClass = statusColorMap[status] || "text-gray-500";
      return (
        <span className={`font-medium uppercase text-sm ${colorClass}`}>
          {status}
        </span>
      );
    },
  },
  {
    title: "Action",
    key: "action",
     align: 'center' as const,
    render: (_: any, record: any) => (
      <button
        onClick={() => onAction(record)}
        className="bg-[#2B658A] p-2 rounded-lg text-white hover:bg-[#1e4a66] transition-colors cursor-pointer"
      >
        <Eye size={18} />
      </button>
    ),
  },
];

export default parcelTableColumns;

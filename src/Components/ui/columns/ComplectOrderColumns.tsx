import type { ColumnsType } from "antd/es/table";

export interface IComplectOrder {
  _id: string;
  customer_name: string;
  customer_email: string;
  customer_image: string;
  delivery_address: string;
  item_quantity: string;
  rate: string;
  cost: string;
  status: string;
  date: string;
}

export const CompletedOrderColumns: ColumnsType<IComplectOrder> = [
  {
    title: "Customer",
    dataIndex: "customer_name",
    key: "customer",
    render: (_, record) => (
      <div className="flex items-center gap-3 ">
        <img
          src={record.customer_image}
          alt={record.customer_name}
          className="w-12 h-12 rounded-full object-cover border border-gray-100"
        />
        <div className="flex flex-col">
          <span className="text-foreground font-medium text-base leading-tight">
            {record.customer_name}
          </span>
          <span className="text-muted text-sm">{record.customer_email}</span>
        </div>
      </div>
    ),
  },
  {
    title: "Delivery Address",
    dataIndex: "delivery_address",
    key: "delivery_address",
    render: (text) => <span className="text-muted font-medium">{text}</span>,
  },
  {
    title: "Item/Quantity",
    dataIndex: "item_quantity",
    key: "item_quantity",
    render: (text) => <span className="text-muted font-medium">{text}</span>,
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    render: (text) => <span className="text-muted font-medium">{text}</span>,
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    render: (text) => <span className="text-muted font-medium">{text}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <span className="text-muted font-medium">{text}</span>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (text) => <span className="text-muted font-medium">{text}</span>,
  },
];

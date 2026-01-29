/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Input } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  OrderRequestColumns,
  type IOrderRequest,
} from "../columns/OrderReguestColumns";

// DUMMY DATA
const dummyOrders: IOrderRequest[] = [
  {
    _id: "1",
    customer_name: "Tiago Felipe",
    customer_email: "tiagofelipe@email.com",
    customer_image: "https://randomuser.me/api/portraits/men/1.jpg",
    delivery_address: "Lagos Island, Lagos",
    item_quantity: "10 Litter Fuel",
    rate: "1,499.30",
    cost: "14,990.30",
    status: "Order Request",
    date: "8 Nov 2025",
  },
  {
    _id: "2",
    customer_name: "Chinedu Okafor",
    customer_email: "tiagofelipe@email.com",
    customer_image: "https://randomuser.me/api/portraits/men/2.jpg",
    delivery_address: "Lagos Island, Lagos",
    item_quantity: "10 Litter Fuel",
    rate: "1,499.30",
    cost: "14,990.30",
    status: "Order Request",
    date: "8 Nov 2025",
  },
  {
    _id: "3",
    customer_name: "Adebayo Oguleye",
    customer_email: "tiagofelipe@email.com",
    customer_image: "https://randomuser.me/api/portraits/men/3.jpg",
    delivery_address: "Lagos Island, Lagos",
    item_quantity: "10 Litter Fuel",
    rate: "1,499.30",
    cost: "14,990.30",
    status: "Order Request",
    date: "8 Nov 2025",
  },
];

function OrderRequestTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex justify-start">
        <Input
          placeholder="Search by name or email..."
          prefix={<FiSearch className="text-gray-400 mr-2" />}
          className="max-w-xs h-10 rounded-lg border-none shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
      </div>

      {/* Table Section */}
      <div className="order-request-table">
        <Table
          columns={OrderRequestColumns}
          dataSource={dummyOrders}
          rowKey="_id"
          rowClassName={"!mt-5"}
          pagination={{
            position: ["bottomRight"],
            current: page,
            pageSize: limit,
            total: dummyOrders.length,
            showSizeChanger: true,
            onChange: (p, s) => {
              setPage(p);
              setLimit(s);
            },
          }}
        />
      </div>
    </div>
  );
}

export default OrderRequestTable;

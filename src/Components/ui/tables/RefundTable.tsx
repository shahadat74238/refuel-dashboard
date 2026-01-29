/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Input } from "antd";
import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import refundTableColumns from "../columns/RefundTableColumns";

// Dummy Data matching your image
const dummyData = [
  {
    _id: "1",
    slNo: "1233",
    name: "Kathryn Murp",
    contact: "(201) 555-0124",
    email: "bockely@att.com",
    avatar: "https://i.pravatar.cc/150?u=1",
    status: "Pending",
  },
  {
    _id: "2",
    slNo: "1234",
    name: "Devon Lane",
    contact: "(219) 555-0114",
    email: "csilvers@rizon.com",
    avatar: "https://i.pravatar.cc/150?u=2",
    status: "Pending",
  },
  {
    _id: "3",
    slNo: "1235",
    name: "Foysal Rahman",
    contact: "(316) 555-0116",
    email: "qamaho@mail.com",
    avatar: "https://i.pravatar.cc/150?u=3",
    status: "Accepted",
  },
  {
    _id: "4",
    slNo: "1236",
    name: "Hari Danang",
    contact: "(907) 555-0101",
    email: "xterris@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=4",
    status: "Rejected",
  },
  {
    _id: "5",
    slNo: "1237",
    name: "Floyd Miles",
    contact: "(505) 555-0125",
    email: "miles@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=5",
    status: "Pending",
  },
  {
    _id: "6",
    slNo: "1238",
    name: "Eleanor Pena",
    contact: "(704) 555-0127",
    email: "pena@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=6",
    status: "Pending",
  },
  {
    _id: "7",
    slNo: "1239",
    name: "Devon Lane",
    contact: "(219) 555-0114",
    email: "devon@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=7",
    status: "Accepted",
  },
  {
    _id: "8",
    slNo: "1240",
    name: "Hari Danang",
    contact: "(270) 555-0117",
    email: "danang@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=8",
    status: "Pending",
  },
];

function RefundTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Pending");

  const handleAction = (record: any) => {
    console.log("Viewing details for:", record.name);
  };

  // 🔥 Functional Search and Filter Logic
  const filteredData = useMemo(() => {
    return dummyData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.slNo.includes(searchTerm);

      const matchesStatus = item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  return (
    <div className="min-h-screen space-y-6">
      {/* 1. Status Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["Pending", "Accepted", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-8 py-2.5 rounded-md font-bold text-white transition-all cursor-pointer shadow-sm ${
              selectedStatus === status
                ? status === "Pending"
                  ? "bg-[#E59148]"
                  : status === "Accepted"
                    ? "bg-[#1B5E20]"
                    : "bg-[#D32F2F]"
                : "opacity-80 hover:opacity-100 " +
                  (status === "Pending"
                    ? "bg-[#E59148]"
                    : status === "Accepted"
                      ? "bg-[#1B5E20]"
                      : "bg-[#D32F2F]")
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* 2. Search Field Area */}
      <div className="flex justify-start mb-6">
        <Input
          placeholder="Search by SL no, name or email..."
          prefix={<FiSearch className="text-gray-400 mr-2" size={20} />}
          className="max-w-xs h-11 rounded-lg border-gray-300 shadow-sm focus:!border-[#255779] hover:!border-[#255779]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
      </div>

      {/* 3. Table Container */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Table
          columns={refundTableColumns(handleAction)}
          dataSource={filteredData}
          rowKey="_id"
          pagination={{
            pageSize: 6,
            position: ["bottomRight"],
          }}
          className="custom-dummy-table"
        />
      </div>
    </div>
  );
}

export default RefundTable;

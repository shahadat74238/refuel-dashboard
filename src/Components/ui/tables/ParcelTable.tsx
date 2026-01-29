/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Input, Dropdown, Button, Space, type MenuProps } from "antd";
import { useState, useEffect } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi"; // Using FiChevronDown for the arrow
import parcelTableColumns from "../columns/ParcelTableColumns";
import { useGetAllParcelQuery } from "../../../redux/services/parcelApis";
import ViewParcelDetailsModal from "../../Dialog/ViewParcelDetailsModal";

export const PARCEL_STATUS = {
  INITIAL: "INITIAL",
  WAITING: "WAITING",
  PENDING: "PENDING",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  REJECTED: "REJECTED",
} as const;

function ParcelTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllParcelQuery({
    search: debouncedSearch,
    page: page,
    limit: limit,
    status: selectedStatus,
  });

  const tableData = response?.data?.data || [];
  const meta = response?.data?.meta;

  const statusFilters = [
    { label: "All", value: undefined },
    { label: "Initial", value: PARCEL_STATUS.INITIAL },
    { label: "Waiting", value: PARCEL_STATUS.WAITING },
    { label: "Pending", value: PARCEL_STATUS.PENDING },
    { label: "Ongoing", value: PARCEL_STATUS.ONGOING },
    { label: "Completed", value: PARCEL_STATUS.COMPLETED },
    { label: "Rejected", value: PARCEL_STATUS.REJECTED },
  ];

  // Logic to handle menu click
  const handleStatusChange: MenuProps["onClick"] = ({ key }) => {
    // If key is "undefined" (All Status), set to undefined, otherwise use the key
    const value = key === "undefined" ? undefined : key;
    setSelectedStatus(value);
    setPage(1);
  };

  // Prepare items for Ant Dropdown
  const menuItems: MenuProps["items"] = statusFilters.map((filter) => ({
    key: String(filter.value),
    label: filter.label,
  }));

  // Find the label of the currently selected status
  const currentStatusLabel =
    statusFilters.find((f) => f.value === selectedStatus)?.label ||
    "All Status";

  const handleAction = (record: any) => {
    setSelectedParcelId(record._id);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Field */}
        <div className="flex justify-start">
          <Input
            placeholder="Search by parcel ID or name..."
            prefix={<FiSearch className="text-gray-400 mr-2" />}
            className="w-full md:w-80 h-11 rounded-lg border-gray-300 shadow-sm focus:!border-[#255779] hover:!border-[#255779]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>
        <div className="flex gap-2 items-center">
          <p>Short by: </p>
          {/* Status Dropdown */}
          <Dropdown
            menu={{ items: menuItems, onClick: handleStatusChange }}
            trigger={["click"]}
          >
            <Button className="!h-11 px-6 !rounded-sm border-gray-300 hover:!border-[#255779] hover:!text-[#255779] flex items-center justify-between min-w-[160px]">
              <Space>
                <span className="text-[#255779] font-bold">
                  {currentStatusLabel}
                </span>
              </Space>
              <FiChevronDown className="ml-2 text-gray-400" />
            </Button>
          </Dropdown>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Table
          loading={isLoading || isFetching}
          columns={parcelTableColumns(handleAction)}
          dataSource={tableData}
          rowKey="_id"
          pagination={{
            position: ["bottomRight"],
            current: page,
            pageSize: limit,
            total: meta?.total || 0,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "50"],
            onChange: (p, s) => {
              setPage(p);
              setLimit(s);
            },
          }}
          className="custom-user-table"
        />
      </div>

      <ViewParcelDetailsModal
        id={selectedParcelId || ""}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      <style>{`
        .custom-user-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #255779 !important;
          font-weight: 700 !important;
          border: none !important;
          font-size: 16px;
        }
        /* Custom styling for the active dropdown item if needed */
        .ant-dropdown-menu-item-selected {
          background-color: #f0f7ff !important;
          color: #255779 !important;
        }
      `}</style>
    </div>
  );
}

export default ParcelTable;

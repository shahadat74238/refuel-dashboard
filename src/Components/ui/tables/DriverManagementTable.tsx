/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Input } from "antd";
import { useState, useEffect } from "react"; // 1. Import useEffect
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import BlockModal from "../../Dialog/BlockModal";
import { useChangeCustomerStatusMutation } from "../../../redux/services/commonApis";
import {
  DriverManagementColumns,
  type IDriver,
} from "../columns/DriverManagementColumns";
import { useGetAllDriverQuery } from "../../../redux/services/driverApis";
import { useNavigate } from "react-router-dom";

export const USER_STATUS = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  REJECTED: "REJECTED",
  DELETED: "DELETED",
} as const;

function DriverManagementTable() {
  const navigate = useNavigate();

  // 2. Separate state for immediate input and debounced value
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
    undefined,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IDriver | null>(null);

  // 3. Debounce Logic: Update debouncedSearch 500ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset to page 1 when search value changes
    }, 500);

    return () => clearTimeout(handler); // Cleanup timer if user types again
  }, [searchTerm]);

  // 4. Use debouncedSearch in the API call
  const {
    data: response,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllDriverQuery({
    search: debouncedSearch, // Changed from searchTerm to debouncedSearch
    page: page,
    limit: limit,
    status: selectedStatus,
  });

  const [changeStatus, { isLoading: isUpdating }] =
    useChangeCustomerStatusMutation();

  const userData = response?.data || [];
  const meta = response?.meta;

  const statusFilters = [
    { label: "All", value: undefined },
    { label: "Pending", value: USER_STATUS.PENDING },
    { label: "Approved", value: USER_STATUS.ACTIVE },
    { label: "Rejected", value: USER_STATUS.REJECTED },
    { label: "Blocked", value: USER_STATUS.BLOCKED },
  ];

  const handleActionClick = (record: IDriver) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  const handleView = (id: string) => {
    navigate(`/commuter-driver/${id}`);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedUser) return;
    const newStatus =
      selectedUser.status === USER_STATUS.BLOCKED
        ? USER_STATUS.ACTIVE
        : USER_STATUS.BLOCKED;

    try {
      const res = await changeStatus({
        id: selectedUser._id,
        status: newStatus,
      }).unwrap();
      if (res.success) {
        toast.success(res.message || `User is now ${newStatus}`);
        setIsModalOpen(false);
        setSelectedUser(null);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {statusFilters.map((filter) => (
          <button
            key={filter.label}
            onClick={() => {
              setSelectedStatus(filter.value);
              setPage(1);
            }}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer border ${
              selectedStatus === filter.value
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex justify-start">
        <Input
          placeholder="Search by name or email..."
          prefix={<FiSearch className="text-gray-400 mr-2" />}
          className="max-w-xs h-11 rounded-lg border-gray-300 shadow-sm focus:!border-primary hover:!border-primary"
          value={searchTerm} // Controlled input
          onChange={(e) => setSearchTerm(e.target.value)} // Update UI immediately
          allowClear
        />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Table
          columns={DriverManagementColumns(
            handleActionClick,
            handleView,
            page,
            limit,
          )}
          dataSource={userData}
          loading={isLoading || isFetching}
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

      <BlockModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userStatus={selectedUser?.status || ""}
        onConfirm={handleConfirmStatusChange}
        isLoading={isUpdating}
      />
    </div>
  );
}

export default DriverManagementTable;

import { Table, Input } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import DeleteReportModal from "../../Dialog/DeleteReportModal";
import {
  helpSupportColumns,
  type IReportManagement,
} from "../columns/HelpSupportColumns";

const dummyReports: IReportManagement[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    _id: i.toString(),
    name: "Tiago Felipe",
    email: "tiagofelipe@mail.com",
    report:
      "lorem ipsum is simply dummy text of the printing and typesetting industry.",
    date: "21 Nov 2025",
  }));

function HelpSupportTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] =
    useState<IReportManagement | null>(null);

  console.log(searchTerm, selectedReport);

  const handleDeleteClick = (report: IReportManagement) => {
    setSelectedReport(report);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    toast.success(`Report deleted successfully`);
    setIsDeleteModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        prefix={<FiSearch className="text-gray-400 mr-2" />}
        className="max-w-xs h-12 !rounded-lg border-none shadow-sm"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="custom-user-table">
        <Table
          columns={helpSupportColumns(handleDeleteClick)}
          dataSource={dummyReports}
          rowKey="_id"
          pagination={{
            position: ["bottomRight"],
            pageSize: 10,
            showSizeChanger: false,
          }}
        />
      </div>

      <DeleteReportModal
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default HelpSupportTable;

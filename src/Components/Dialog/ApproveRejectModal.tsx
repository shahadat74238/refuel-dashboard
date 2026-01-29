import { Modal } from "antd";
import { MdCheckCircle, MdCancel } from "react-icons/md";

interface IApproveRejectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onConfirm: () => void;
  type: "APPROVE" | "REJECT";
  isLoading?: boolean;
}

const ApproveRejectModal = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  type,
  isLoading,
}: IApproveRejectModalProps) => {
  const isApprove = type === "APPROVE";

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={400}
      closable={false}
      maskClosable={false}
      className="action-confirm-modal"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon Container - Blue for Approve, Red for Reject */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
            isApprove ? "bg-blue-50" : "bg-red-50"
          }`}
        >
          {isApprove ? (
            <MdCheckCircle className="text-[#255779]" size={40} />
          ) : (
            <MdCancel className="text-[#D90429]" size={40} />
          )}
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-bold text-[#255779] mb-2">
          {isApprove ? "Approve Driver" : "Reject Driver"}
        </h2>
        <p className="text-gray-500 text-base mb-8 px-4">
          {isApprove
            ? "Are you sure you want to approve this driver? They will gain access to the platform."
            : "Are you sure you want to reject this driver? They will not be able to join as a driver."}
        </p>

        {/* Action Buttons */}
        <div className="flex w-full gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            disabled={isLoading}
            className="flex-1 py-3 px-4 border border-[#255779] text-[#255779] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer duration-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 py-3 px-4 text-white rounded-lg font-semibold transition-colors cursor-pointer duration-300 disabled:opacity-50 ${
              isApprove
                ? "bg-[#255779] hover:bg-[#1a3e57]"
                : "bg-[#D90429] hover:bg-red-700"
            }`}
          >
            {isLoading ? "Updating..." : isApprove ? "Approve" : "Reject"}
          </button>
        </div>
      </div>

      <style>{`
        .action-confirm-modal .ant-modal-content {
          border-radius: 16px !important;
          padding: 24px !important;
        }
      `}</style>
    </Modal>
  );
};

export default ApproveRejectModal;
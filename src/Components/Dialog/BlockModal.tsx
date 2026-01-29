import { Modal } from "antd";
import { MdBlock } from "react-icons/md";

interface IBlockModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onConfirm: () => void;
  userStatus: string; 
  isLoading?: boolean;
}

const BlockModal = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  userStatus,
  isLoading
}: IBlockModalProps) => {
  const isBlocked = userStatus === "BLOCKED";

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={400}
      closable={false}
      maskClosable={false}
      className="block-modal"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon Container - Blue for Unblocking, Red for Blocking */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isBlocked ? 'bg-blue-50' : 'bg-red-50'}`}>
          <MdBlock className={isBlocked ? "text-[#255779]" : "text-[#D90429]"} size={40} />
        </div>

        {/* Conditional Title & Description */}
        <h2 className="text-2xl font-bold text-[#255779] mb-2">
          {isBlocked ? "Unblock User" : "Block User"}
        </h2>
        <p className="text-gray-500 text-base mb-8">
          Are you sure you want to {isBlocked ? "unblock" : "block"} this user?
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
              isBlocked ? "bg-[#255779] hover:bg-[#1a3e57]" : "bg-[#D90429] hover:bg-red-700"
            }`}
          >
            {isLoading ? "Processing..." : isBlocked ? "Unblock" : "Block"}
          </button>
        </div>
      </div>

      <style>{`
        .block-modal .ant-modal-content {
          border-radius: 16px !important;
          padding: 24px !important;
        }
      `}</style>
    </Modal>
  );
};

export default BlockModal;
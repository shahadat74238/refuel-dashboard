import React from "react";
import { Button, Modal } from "antd";
import { PiSealWarningFill } from "react-icons/pi";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

interface IApproveRejectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onConfirm: () => void;
  type: "APPROVE" | "REJECT";
  name: string;
  isLoading?: boolean;
}

const ApproveRejectModal = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  type,
  name,
  isLoading,
}: IApproveRejectModalProps) => {
  const isApprove = type === "APPROVE";

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={450}
      closable={false}
    >
      <div className="flex flex-col items-center text-center py-6">
        {/* Jagged Badge Icon */}
        <div className="relative mb-6">
          <PiSealWarningFill 
            className={isApprove ? "text-green-500" : "text-red-200"} 
            size={100} 
          />
          <span className={`absolute inset-0 flex items-center justify-center text-3xl font-bold ${isApprove ? 'text-white' : 'text-red-500'}`}>
            !
          </span>
        </div>

        <h2 className="text-xl font-bold text-black mb-2">Are You Sure</h2>
        <p className="text-gray-600 font-medium mb-10">
          Do You Want To <span className={isApprove ? "text-core-primary" : "text-danger"}>
            {isApprove ? "Approve" : "Reject"}
          </span> {name}
        </p>

        <div className="flex w-full gap-4 px-4">
          <Button
            onClick={() => setIsModalOpen(false)}
            style={secondaryBtn}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            style={primaryBtn}
            className={`flex-1  ${
              isApprove ? "bg-primary hover:!bg-core-primary/70" : "bg-light-red hover:!bg-danger/70"
            }`}
          >
            {isLoading ? "..." : isApprove ? "Approve" : "Reject"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveRejectModal;
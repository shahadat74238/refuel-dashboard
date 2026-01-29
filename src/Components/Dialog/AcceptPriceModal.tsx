/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button } from "antd";
import { FiCheckCircle } from "react-icons/fi";
import { useAcceptPriceMutation } from "../../redux/services/parcelApis";
import toast from "react-hot-toast";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

interface IProps {
  requestId: string; // The ID of the price request being accepted
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const AcceptPriceModal = ({
  requestId,
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: IProps) => {
  const [acceptPrice, { isLoading }] = useAcceptPriceMutation();

  const handleAccept = async () => {
    try {
      const res = await acceptPrice({ id: requestId }).unwrap();

      if (res.success) {
        toast.success("Price accepted successfully!");
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to accept price");
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={400}
      closable={false}
      className="confirm-modal"
    >
      <div className="flex flex-col items-center text-center py-4">
        {/* Icon */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <FiCheckCircle className="text-green-500 text-5xl" />
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Accept Price?</h2>
        <p className="text-gray-500 px-4 mb-8">
          Are you sure you want to accept this price offer? This action will
          finalize the delivery cost and cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full px-2">
          <Button
            danger
            size="large"
            style={secondaryBtn}
            className="flex-1 !text-red-500"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            style={primaryBtn}
            className="flex-1"
            onClick={handleAccept}
            loading={isLoading}
          >
            Accept
          </Button>
        </div>
      </div>

      <style>{`
        .confirm-modal .ant-modal-content {
          border-radius: 28px !important;
          padding: 30px !important;
        }
      `}</style>
    </Modal>
  );
};

export default AcceptPriceModal;

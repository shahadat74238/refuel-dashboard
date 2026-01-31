import { Button, Modal } from "antd";
import { HiCheckBadge } from "react-icons/hi2";
import { primaryBtn } from "../../constant/btnStyle";

interface ISuccessModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  content?: string;
}

const SuccessModal = ({
  isModalOpen,
  setIsModalOpen,
  content,
}: ISuccessModalProps) => {
  const continueBtnStyle = {
    ...primaryBtn,
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={400}
      closable={false}
    >
      <div className="flex flex-col items-center text-center py-6 px-4">
        {/* Success Icon */}
        <div className="mb-6">
          <HiCheckBadge className="text-[#A8E6A2]" size={100} />
        </div>

        {/* Success Message */}
        <h2 className="text-lg font-bold text-black leading-tight mb-10">
          {content ? content : <span>New Admin Added Successfully</span>}
        </h2>

        {/* Continue Button */}
        <Button
          onClick={() => setIsModalOpen(false)}
          style={continueBtnStyle}
          className="w-full hover:opacity-90 transition-opacity"
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;

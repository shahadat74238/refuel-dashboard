import { Button, Modal } from "antd";
import { HiCheckBadge } from "react-icons/hi2";
import { primaryBtn } from "../../constant/btnStyle";

interface IAdminSuccessModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const AdminSuccessModal = ({
  isModalOpen,
  setIsModalOpen,
}: IAdminSuccessModalProps) => {
  
  const continueBtnStyle = {
    ...primaryBtn,
    backgroundColor: "#A8E6A2", // Light green from image
    borderColor: "#A8E6A2",
    color: "#000",
    fontWeight: "bold",
    height: "50px",
    borderRadius: "12px",
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
          New Admin Added <br /> Successfully
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

export default AdminSuccessModal;
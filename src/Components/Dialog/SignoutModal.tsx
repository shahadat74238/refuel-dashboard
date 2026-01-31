import { Button, Modal } from "antd";
import { HiOutlineLogout } from "react-icons/hi";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

interface ILogoutModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onLogout: () => void;
}

const SignoutModal = ({
  isModalOpen,
  setIsModalOpen,
  onLogout,
}: ILogoutModalProps) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={400}
      closable={false}
      maskClosable={false}
      className="logout-modal"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon Container */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <HiOutlineLogout className="text-[#D90429]" size={40} />
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-bold text-foreground mb-2">Sign Out</h2>
        <p className="text-muted font-medium text-base mb-8">
          Are you sure you want to Sign out?
        </p>

        {/* Action Buttons */}
        <div className="flex w-full gap-4">
          <Button
            onClick={() => setIsModalOpen(false)}
            style={secondaryBtn}
            className="flex-1 "
          >
            Cancel
          </Button>
          <Button onClick={onLogout} style={primaryBtn} className="flex-1 ">
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignoutModal;

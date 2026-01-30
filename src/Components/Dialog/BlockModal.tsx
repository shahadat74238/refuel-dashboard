import { Button, Modal } from "antd";
import { MdBlock } from "react-icons/md";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

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
  isLoading,
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
      className="block-modal"
    >
      <div className="flex flex-col items-center text-center">
        {/* ICON: Green for Unblock, Red for Block */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isBlocked ? "bg-core-primary/10" : "bg-danger/10"}`}
        >
          <MdBlock
            className={isBlocked ? "text-core-primary" : "text-danger"}
            size={40}
          />
        </div>

        <h2
          className={`text-2xl font-bold mb-2 ${isBlocked ? "text-core-primary" : "text-danger"}`}
        >
          {isBlocked ? "Unblock User" : "Block User"}
        </h2>
        <p className="text-muted text-base mb-8">
          Are you sure you want to {isBlocked ? "unblock" : "block"} this user?
        </p>

        <div className="flex w-full gap-4">
          <Button
            onClick={() => setIsModalOpen(false)}
            style={secondaryBtn}
            className="flex-1 "
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            style={primaryBtn}
            className={`flex-1  ${
              isBlocked
                ? "bg-primary hover:bg-core-primary/70"
                : "!bg-light-red hover:!bg-danger/70"
            }`}
          >
            {isLoading ? "Wait..." : isBlocked ? "Unblock" : "Block"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default BlockModal;

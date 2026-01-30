import { Modal, Button } from "antd";
import { PiSealWarningFill } from "react-icons/pi";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

interface IRemoveAdminModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onConfirm: () => void;
  adminName: string;
  isLoading?: boolean;
}

const RemoveAdminModal = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  adminName,
  isLoading,
}: IRemoveAdminModalProps) => {
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
        <div className="relative mb-6">
          <PiSealWarningFill className="text-red-200" size={100} />
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-red-500">
            !
          </span>
        </div>

        <h2 className="text-xl font-bold text-black mb-2">Are You Sure</h2>
        <p className="text-gray-600 font-medium mb-10 px-4">
          Do You Want To <span className="text-red-500">Remove</span> {adminName} from the admin list?
        </p>

        <div className="flex w-full gap-4 px-4">
          <Button onClick={() => setIsModalOpen(false)} style={secondaryBtn} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            loading={isLoading}
            style={primaryBtn}
            className="flex-1 !bg-red-300 !text-black hover:!bg-red-400 border-none"
          >
            Remove
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveAdminModal;
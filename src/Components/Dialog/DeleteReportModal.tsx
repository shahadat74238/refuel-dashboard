import { Button, Modal } from "antd";
import { PiSealWarning } from "react-icons/pi";
import { secondaryBtn } from "../../constant/btnStyle";

interface IDeleteReportModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteReportModal = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
}: IDeleteReportModalProps) => {
  
  const deleteBtnStyle = {
    backgroundColor: "#EFA3A3", // Soft red from image
    borderColor: "#EFA3A3",
    color: "#000",
    fontWeight: "bold",
    height: "54px",
    borderRadius: "12px",
    fontSize: "16px",
  };

  const cancelBtnStyle = {
    ...secondaryBtn,
    backgroundColor: "#EEEEEE", // Light grey from image
    borderColor: "#EEEEEE",
    height: "54px",
    fontWeight: "bold",
    borderRadius: "12px",
    fontSize: "16px",
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={420}
      closable={false}
    >
      <div className="flex flex-col items-center text-center py-6 px-2">
        {/* Warning Icon with wavy badge effect */}
        <div className="mb-6">
          <PiSealWarning className="text-[#EFA3A3]" size={100} />
        </div>

        {/* Text content */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-black mb-1">Are You Sure</h2>
          <p className="text-lg font-bold text-black">
            Do You Want To <span className="text-red-600">Delete</span> This Report
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full gap-5">
          <Button
            onClick={() => setIsModalOpen(false)}
            style={cancelBtnStyle}
            className="flex-1 border-none shadow-none"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            style={deleteBtnStyle}
            className="flex-1 border-none shadow-none hover:opacity-90"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteReportModal;
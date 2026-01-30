import { Button, Modal } from "antd";
import { FiDownload } from "react-icons/fi";
import { secondaryBtn } from "../../constant/btnStyle";

interface IViewDocModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  docUrl: string;
 
  
}

const ViewDocModal = ({
  isModalOpen,
  setIsModalOpen,
  docUrl,
}: IViewDocModalProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = docUrl;
    link.download = "supplier-document.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={600}
      title={<span className="text-xl font-bold">Supplier Document</span>}
    >
      <div className="space-y-6 pt-4">
        {/* Document Display */}
        <div className="w-full h-[400px] bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
          <img
            src={docUrl}
            alt="document"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex justify-end">
        <Button
          onClick={handleDownload}
          style={secondaryBtn}
          className="max-w-40"
        >
          <FiDownload size={22} />
          Download
        </Button>

        </div>

      </div>
    </Modal>
  );
};

export default ViewDocModal;

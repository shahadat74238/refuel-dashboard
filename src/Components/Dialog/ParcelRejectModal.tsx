/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Input, Button } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRejectParcelMutation } from "../../redux/services/parcelApis";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

const { TextArea } = Input;

interface IProps {
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess: () => void; // To close the parent details modal
}

const PriceRejectModal = ({
  id,
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: IProps) => {
  const [reason, setReason] = useState("");
  const [rejectParcel, { isLoading }] = useRejectParcelMutation();

  const handleReject = async () => {
    if (!reason.trim()) {
      return toast.error("Please provide a reason for rejection");
    }

    try {
      const res = await rejectParcel({ id, rejection_reason: reason }).unwrap();
      if (res.success) {
        toast.success("Parcel rejected successfully");
        setReason("");
        setIsModalOpen(false);
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reject parcel");
    }
  };

  return (
    <Modal
      title={
        <span className="text-xl font-bold text-primary">Reject Parcel</span>
      }
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={450}
      destroyOnClose
    >
      <div className="space-y-4 py-2">
        <div className="space-y-2">
          <label className="font-semibold text-primary">Rejection Reason</label>
          <TextArea
            rows={4}
            placeholder="Type your reason here..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="rounded-xl border-gray-300 focus:border-primary"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            style={primaryBtn}
            size="large"
            className="flex-1 bg-primary text-white "
            onClick={handleReject}
            loading={isLoading}
          >
            Submit
          </Button>
          <Button
            danger
            size="large"
            style={secondaryBtn}
            className="flex-1 !text-red-500"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PriceRejectModal;

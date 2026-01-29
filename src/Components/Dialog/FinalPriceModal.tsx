/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, InputNumber, Input, Button } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMakeFinalOfferMutation } from "../../redux/services/parcelApis";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

const { TextArea } = Input;

interface IProps {
  requestId: string; // The specific ID for the URL
  parcelId: string; // The parcel ID for the body
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const FinalPriceModal = ({
  requestId,
  parcelId,
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: IProps) => {
  const [price, setPrice] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [makeFinalOffer, { isLoading }] = useMakeFinalOfferMutation();

  const handleFinalOffer = async () => {
    if (!price || price <= 0) return toast.error("Please enter a valid price");
    if (!message.trim()) return toast.error("Please enter a final message");

    try {
      const res = await makeFinalOffer({
        id: requestId,
        parcel_id: parcelId,
        message: message,
        final_price: price,
      }).unwrap();

      if (res.success) {
        toast.success("Final offer sent successfully");
        setPrice(null);
        setMessage("");
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send final offer");
    }
  };

  return (
    <Modal
      title={
        <span className="text-xl font-bold text-primary">Send Final Offer</span>
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
          <label className="font-semibold text-primary block">
            Final Price ($)
          </label>
          <InputNumber
            className="!w-full h-12 rounded-xl text-lg custom-price-input"
            placeholder="e.g. 52.21"
            min={0}
            controls={false}
            value={price}
            stringMode={false}
            onChange={(val) => setPrice(val)}
          />
        </div>

        <div className="space-y-2">
          <label className="font-semibold text-primary block">Message</label>
          <TextArea
            rows={4}
            placeholder="Explain why this is the final price..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="rounded-xl"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
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
            className="flex-1 bg-primary text-white"
            onClick={handleFinalOffer}
            loading={isLoading}
          >
            Send Offer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FinalPriceModal;

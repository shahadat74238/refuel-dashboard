/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, InputNumber, Button } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProposePriceMutation } from "../../redux/services/parcelApis";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

interface IProps {
  parcelId: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const SetParcelPriceModal = ({
  parcelId,
  isModalOpen,
  setIsModalOpen,
  onSuccess,
}: IProps) => {
  const [price, setPrice] = useState<number | null>(null);
  const [proposePrice, { isLoading }] = useProposePriceMutation();

  const handlePropose = async () => {
    if (price === null || price <= 0) {
      return toast.error("Please enter a valid price");
    }

    try {
      const res = await proposePrice({
        parcel_id: parcelId,
        proposed_price: price,
      }).unwrap();

      if (res.success) {
        toast.success("Price proposed successfully");
        setPrice(null);
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to propose price");
    }
  };

  return (
    <Modal
      title={
        <span className="text-xl font-bold text-primary">Set Parcel Price</span>
      }
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={400}
      destroyOnClose
    >
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="font-semibold text-primary block">
            Proposed Price ($)
          </label>

          <InputNumber
            className="w-full h-12 rounded-xl text-lg custom-price-input"
            placeholder="e.g. 52.21"
            min={0}
            controls={false}
            value={price}
            stringMode={false}
            onChange={(val) => setPrice(val)}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            style={secondaryBtn}
            className="flex-1 h-12 rounded-xl border border-red-500 text-red-500 font-semibold cursor-pointer transition-all hover:bg-red-50"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            style={primaryBtn}
            className="flex-1 bg-primary text-white h-12 rounded-xl"
            onClick={handlePropose}
            loading={isLoading}
          >
            Propose
          </Button>
        </div>
      </div>

      <style>{`
        /* Ensures the InputNumber internal structure is full width */
        .custom-price-input {
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
        }
        .custom-price-input .ant-input-number-input-wrap {
          width: 100%;
        }
        .custom-price-input input {
          height: 48px !important;
        }
      `}</style>
    </Modal>
  );
};

export default SetParcelPriceModal;

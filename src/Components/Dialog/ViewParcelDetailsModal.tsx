/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Spin, Image, Button, Tag } from "antd";
import { FiClock, FiPhone } from "react-icons/fi";
import { useGetSingleParcelQuery } from "../../redux/services/parcelApis";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";
import { useState } from "react";
import PriceRejectModal from "./ParcelRejectModal";
import SetParcelPriceModal from "./SetParcelPriceModal";
import FinalPriceModal from "./FinalPriceModal";
import AcceptPriceModal from "./AcceptPriceModal";

interface IProps {
  id: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const ViewParcelDetailsModal = ({
  id,
  isModalOpen,
  setIsModalOpen,
}: IProps) => {
  const [isSetPriceOpen, setIsSetPriceOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isSetFinalPrice, setIsFinalPriceOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);

  const { data: response, isLoading } = useGetSingleParcelQuery(id, {
    skip: !id,
  });

  const parcel = response?.data;

  const pendingCounterOfferId = parcel?.price_requests?.find(
    (req: any) => req.price_type === "COUNTERED" && req.status === "PENDING",
  )?._id;

  // Helper to format labels
  const getRequestLabel = (type: string, by: string) => {
    if (type === "FINAL_OFFER") return "Final Offer";
    if (type === "COUNTERED") return "Customer Propose Price";
    return by === "ADMIN" ? "Initial Proposal" : "Counter Offer";
  };

  const handleSuccess = () => {
    setIsRejectOpen(false);
    setIsSetPriceOpen(false);
    setIsFinalPriceOpen(false);

    setTimeout(() => {
      setIsModalOpen(false);
    }, 100);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={500}
      className="parcel-details-modal"
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold text-black mb-4">Parcel Details</h2>

          {/* User Profile Image */}
          <div className="w-28 h-28 rounded-full border-2 border-primary p-1 mb-6">
            <img
              src={
                parcel?.user_id?.profile_picture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
              }
              alt="Owner"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="w-full space-y-6 px-4 text-sm">
            {/* Owner Information */}
            <section>
              <h3 className="text-black font-bold text-lg mb-3">
                Owner Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="text-primary font-bold">Name:</span>{" "}
                  <span className="text-gray-600">
                    {parcel?.user_id?.full_name}
                  </span>
                </p>
                <p className="flex items-center gap-1">
                  <span className="text-primary font-bold">Phone:</span>
                  <span className="text-gray-600">
                    {parcel?.receiver_phone}
                  </span>
                  <FiPhone className="text-gray-500 ml-1" />
                </p>
                <p>
                  <span className="text-primary font-bold">Email:</span>{" "}
                  <span className="text-gray-600">
                    {parcel?.user_id?.email}
                  </span>
                </p>
                <p>
                  <span className="text-primary font-bold">Address:</span>{" "}
                  <span className="text-gray-600">
                    {parcel?.sender_remarks?.address || "N/A"}
                  </span>
                </p>
              </div>
            </section>

            {/* Parcel Information */}
            <section>
              <h3 className="text-black font-bold text-lg mb-3">
                Parcel Information
              </h3>
              <div className="space-y-2">
                <p>
                  <span className="text-primary font-bold">Parcel ID:</span>{" "}
                  <span className="text-gray-600">{parcel?.parcel_name}</span>
                </p>
                <p>
                  <span className="text-primary font-bold">Parcel ID:</span>{" "}
                  <span className="text-gray-600">{parcel?.parcel_id}</span>
                </p>

                {parcel?.final_price && (
                  <p>
                    <span className="text-primary font-bold">Price:</span>{" "}
                    <span className="text-gray-600">
                      {parcel?.final_price} $
                    </span>
                  </p>
                )}

                <p>
                  <span className="text-primary font-bold">Priority:</span>{" "}
                  <span className="text-gray-600">{parcel?.priority}</span>
                </p>
                <p>
                  <span className="text-primary font-bold">Weight & Size:</span>{" "}
                  <span className="text-gray-600">
                    {parcel?.weight} kg, {parcel?.size} Box
                  </span>
                </p>
                <p>
                  <span className="text-primary font-bold">Destination:</span>{" "}
                  <span className="text-gray-600">
                    {parcel?.handover_location?.address}
                  </span>
                </p>
                <p>
                  <span className="text-primary font-bold">
                    Requested Date:
                  </span>{" "}
                  <span className="text-gray-600">
                    {parcel?.date}, {parcel?.time}
                  </span>
                </p>
              </div>
            </section>

            {/* Parcel Images */}
            <section>
              <h3 className="text-black font-bold text-lg mb-3">
                Parcel Images
              </h3>
              <div className="flex gap-3">
                <Image.PreviewGroup>
                  {parcel?.parcel_images?.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="w-20 h-20 rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt="Parcel"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Image.PreviewGroup>
              </div>
            </section>

            {parcel?.price_requests?.length > 0 && (
              <section className="mb-6">
                <h3 className="text-black font-bold text-lg mb-4 flex items-center gap-2">
                  <FiClock className="text-primary" /> Price Negotiation
                </h3>
                <div className="space-y-4 relative ">
                  {parcel.price_requests.map((req: any) => (
                    <div key={req._id} className="relative pl-10">
                      {/* Timeline Dot */}
                      <div
                        className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 ${req.proposed_by === "ADMIN" ? "bg-primary" : "bg-orange-400"}`}
                      >
                        <span className="text-[10px] text-white font-bold">
                          {req.proposed_by[0]}
                        </span>
                      </div>

                      <div
                        className={`p-3 rounded-2xl border ${req.status === "PENDING" ? "border-primary bg-blue-50/30" : "border-gray-200 bg-white"}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-gray-800">
                            {getRequestLabel(req.price_type, req.proposed_by)}
                          </span>
                          <span className="text-primary font-bold text-base">
                            ${req.proposed_price}
                          </span>
                        </div>

                        {req.message && (
                          <p className="text-gray-600 text-sm  mb-2">
                            {req.message}
                          </p>
                        )}

                        {req.rejection_reason &&
                          req.price_type !== "COUNTERED" && (
                            <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-100">
                              <p className="text-sm text-red-500">
                                {req.rejection_reason}
                              </p>
                            </div>
                          )}

                        <div className="flex justify-end items-center mt-2">
                          <Tag
                            color={
                              req.status === "PENDING"
                                ? "processing"
                                : req.status === "REJECTED"
                                  ? "error"
                                  : "success"
                            }
                          >
                            {req.status}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {parcel?.rejection_reason && (
              <section>
                <h3 className="text-black font-bold text-lg mb-1">
                  Rejected Reason
                </h3>
                <div>
                  <p className="text-red-500">{parcel?.rejection_reason}</p>
                </div>
              </section>
            )}
          </div>

          {/* Action Buttons */}
          {parcel?.status === "WAITING" &&
            parcel?.price_status === "COUNTERED" && (
              <div className="flex gap-4 w-full mt-10 mb-4 px-4">
                <Button
                  style={primaryBtn}
                  size="large"
                  className="flex-1 bg-primary text-white "
                  onClick={() => setIsAcceptOpen(true)}
                >
                  Accept Price
                </Button>
                <Button
                  danger
                  size="large"
                  style={secondaryBtn}
                  className="flex-1 !text-red-500"
                  onClick={() => setIsFinalPriceOpen(true)}
                >
                  Reject Price
                </Button>
              </div>
            )}

          {parcel?.status === "WAITING" &&
            parcel?.price_status === "NOT_SET" && (
              <div className="flex gap-4 w-full mt-10 mb-4 px-4">
                <Button
                  style={primaryBtn}
                  size="large"
                  className="flex-1 bg-primary text-white "
                  onClick={() => setIsSetPriceOpen(true)}
                >
                  Add Deliver Price
                </Button>
                <Button
                  danger
                  size="large"
                  style={secondaryBtn}
                  className="flex-1 !text-red-500"
                  onClick={() => setIsRejectOpen(true)}
                >
                  Reject Parcel
                </Button>
              </div>
            )}
        </div>
      )}

      <AcceptPriceModal
        requestId={pendingCounterOfferId}
        isModalOpen={isAcceptOpen}
        setIsModalOpen={setIsAcceptOpen}
        onSuccess={handleSuccess}
      />

      {/* New Final Offer Modal */}
      <FinalPriceModal
        requestId={pendingCounterOfferId}
        parcelId={id}
        isModalOpen={isSetFinalPrice}
        setIsModalOpen={setIsFinalPriceOpen}
        onSuccess={handleSuccess}
      />

      <SetParcelPriceModal
        parcelId={id}
        isModalOpen={isSetPriceOpen}
        setIsModalOpen={setIsSetPriceOpen}
        onSuccess={handleSuccess}
      />

      <PriceRejectModal
        id={id}
        isModalOpen={isRejectOpen}
        setIsModalOpen={setIsRejectOpen}
        onSuccess={handleSuccess}
      />

      <style>{`
        .parcel-details-modal .ant-modal-content {
          border-radius: 24px !important;
          padding: 30px 20px !important;
        }
        .parcel-details-modal .ant-modal-close {
          top: 20px;
          right: 20px;
        }
      `}</style>
    </Modal>
  );
};

export default ViewParcelDetailsModal;

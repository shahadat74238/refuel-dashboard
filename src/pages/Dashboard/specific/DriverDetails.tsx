/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageContent, PageLayout } from "../../../Layout/PageLayOut";
import { IoStar } from "react-icons/io5";
import { Image, Tag, Button, Space, Spin } from "antd"; // Image is already imported
import toast from "react-hot-toast";

// Redux Hooks
import { useGetSingleDriverQuery } from "../../../redux/services/driverApis";
import { useChangeCustomerStatusMutation } from "../../../redux/services/commonApis";
import ApproveRejectModal from "../../../Components/Dialog/ApproveRejectModal";
import { primaryBtn, secondaryBtn } from "../../../constant/btnStyle";

const DriverDetails = () => {
  const { id } = useParams();
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetSingleDriverQuery(id as string);
  const [changeStatus, { isLoading: isUpdating }] =
    useChangeCustomerStatusMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"APPROVE" | "REJECT">("APPROVE");

  const driver = response?.data;

  const openModal = (type: "APPROVE" | "REJECT") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleConfirmAction = async () => {
    const targetStatus = modalType === "APPROVE" ? "ACTIVE" : "REJECTED";
    try {
      const res = await changeStatus({
        id: id as string,
        status: targetStatus,
      }).unwrap();
      if (res.success) {
        toast.success(`Driver ${targetStatus.toLowerCase()} successfully`);
        setIsModalOpen(false);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <PageLayout title="Commuter/Driver profile">
        <PageContent>
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        </PageContent>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Commuter/Driver profile">
      <PageContent>
        <div className="flex flex-col min-h-[75vh]">
          <Image.PreviewGroup>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 p-4 flex-grow">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
                    {/* Replaced standard img with Antd Image for zoom support */}
                    <Image
                      src={
                        driver?.profile_picture ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
                      }
                      alt="profile"
                      width="100%"
                      height="100%"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700">
                      {driver?.full_name}
                    </h2>
                    <p className="text-gray-500">{driver?.email}</p>
                    <Tag
                      color={
                        driver?.status === "ACTIVE"
                          ? "success"
                          : driver?.status === "BLOCKED"
                            ? "error"
                            : "warning"
                      }
                      className="!mt-1 px-6 py-1.5 text-sm font-bold rounded-full uppercase m-0 border-none shadow-sm"
                    >
                      {driver?.status === "ACTIVE"
                        ? "APPROVED"
                        : driver?.status}
                    </Tag>
                  </div>
                </div>

                <DetailField label="Personal Name" value={driver?.full_name} />
                <DetailField label="Email" value={driver?.email} />
                <DetailField
                  label="Contact"
                  value={driver?.phone_number || "N/A"}
                />

                <div className="flex items-center gap-2 text-gray-700 font-medium py-2">
                  <IoStar className="text-yellow-400" size={20} />
                  <span>Rating: 4.9/5 (250+ Reviews)</span>
                </div>

                {/* DOCUMENT IMAGES */}
                <div className="space-y-6 pt-2">
                  <div className="flex items-center gap-6">
                    <ImageBlock
                      label="Number Plate Image"
                      src={driver?.vehicle?.number_plate_image}
                    />
                    <ImageBlock
                      label="Licence"
                      src={driver?.driver_info?.license_image}
                    />
                  </div>

                  {/* VEHICLE IMAGES */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-primary block uppercase tracking-wider">
                      Vehicle Images
                    </label>
                    <div className="flex items-center flex-wrap gap-4">
                      {driver?.vehicle?.vehicle_images?.length > 0 ? (
                        driver.vehicle.vehicle_images.map(
                          (img: string, index: number) => (
                            <div
                              key={index}
                              className="h-28 w-28 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                            >
                              <Image
                                src={img}
                                fallback="https://via.placeholder.com/150?text=No+Vehicle"
                                width="100%"
                                height="100%"
                                style={{ objectFit: "cover" }}
                                className="w-full h-full "
                              />
                            </div>
                          ),
                        )
                      ) : (
                        <p className="text-gray-400 italic text-sm">
                          No vehicle images uploaded
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <DetailField
                  label="Driver Licence Number"
                  value={driver?.driver_info?.driver_license_number}
                />
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <DetailField
                    label="From"
                    value={driver?.driver_info?.from?.address}
                  />
                  <DetailField
                    label="To"
                    value={driver?.driver_info?.to?.address}
                  />
                </div>
                <DetailField
                  label="Stops Along The Way"
                  value={driver?.driver_info?.stops
                    ?.map((s: any) => s.address)
                    .join(", ")}
                />
                <DetailField
                  label="Car Number"
                  value={driver?.vehicle?.vehicle_number}
                />
                <DetailField
                  label="Schedule & Availability"
                  value={driver?.driver_info?.daily_commute_time}
                />

                <div className="grid grid-cols-2 gap-4">
                  <DetailField
                    label="Daily Commute Time"
                    value={driver?.driver_info?.pickup_time || "08:30 AM"}
                  />
                  <DetailField
                    label="Available For Delivery"
                    value={driver?.driver_info?.available_for_delivery}
                  />
                </div>

                <DetailField
                  label="Max Parcel Weight"
                  value={driver?.driver_info?.max_parcel_weight}
                />
                <DetailField
                  label="Parcel Size"
                  value={
                    driver?.vehicle?.vehicle_type || "Medium (Up To 60 Cm)"
                  }
                />

                <DetailField
                  label="Preferred Pick-Up Points"
                  value="Metro Stations / Bus Stops"
                />
                <DetailField label="Notes" value="N/A" />
                {/* ACTION FOOTER */}
                <div className="col-span-full flex justify-end p-6 border-t border-gray-100 items-center mt-4">
                  {driver?.status === "PENDING" && (
                    <Space size="middle">
                      <Button
                        size="large"
                        style={secondaryBtn}
                        onClick={() => openModal("REJECT" as any)}
                      >
                        Reject
                      </Button>
                      <Button
                        type="primary"
                        size="large"
                        style={primaryBtn}
                        onClick={() => openModal("APPROVE")}
                      >
                        Approve
                      </Button>
                    </Space>
                  )}
                </div>
              </div>
            </div>
          </Image.PreviewGroup>
        </div>
      </PageContent>

      <ApproveRejectModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        type={modalType}
        onConfirm={handleConfirmAction}
        isLoading={isUpdating}
      />
    </PageLayout>
  );
};

/* --- SHARED UI COMPONENTS --- */

const DetailField = ({ label, value }: { label: string; value?: string }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-semibold text-primary">{label}</label>
    <div className="w-full p-3 bg-[#F9FAFB] border border-gray-200 rounded-xl text-gray-600 font-medium">
      {value || "N/A"}
    </div>
  </div>
);

const ImageBlock = ({ label, src }: { label: string; src?: string }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold text-primary block h-8 leading-tight uppercase tracking-wide">
      {label}
    </label>
    <div className="w-28 h-28 bg-gray-50   rounded-md overflow-hidden flex items-center justify-center border-gray-200 ">
      <Image
        src={src}
        fallback="https://via.placeholder.com/150?text=No+Image"
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
        className="w-28 h-28  cursor-zoom-in"
      />
    </div>
  </div>
);

export default DriverDetails;

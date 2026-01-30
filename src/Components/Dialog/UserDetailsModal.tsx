import React from "react";
import { Modal, Image, Button } from "antd";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

interface IUserDetailsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  title: string;
  is_supplier?: boolean;
   onViewDocument?: () => void;
}

const UserDetailsModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  is_supplier = false,
  onViewDocument
}: IUserDetailsModalProps) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={700}
      closable={false}
      className="user-details-modal"
    >
      <div className="p-4">
        {/* Modal Title */}
        <h2 className="text-xl font-bold text-center text-foreground mb-6">
          {title}
        </h2>

        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-gray-100 shadow-sm">
          <Image
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="profile"
            width="100%"
            height="100%"
            preview={false}
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-8 items-start ">
          {/* LEFT COLUMN: Profile Info */}

          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Tiago Felipe
            </h3>

            <div className="space-y-1 ">
              <div className="flex gap-4">
                <span className="font-bold text-foreground whitespace-nowrap">
                  Email
                </span>
                <span className="text-muted font-medium">
                  {" "}
                  tiagofelipe@email.com
                </span>
              </div>
              <div className="flex gap-4">
                <span className="font-bold text-foreground whitespace-nowrap">
                  Phone Number
                </span>
                <span className="text-muted font-medium">+234 54564 5565</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Bank Information */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Bank Information
            </h3>

            <div className="space-y-1 ">
              <div className="grid grid-cols-[130px_1fr] gap-2">
                <span className="font-bold text-foreground">Bank Name</span>
                <span className="text-text-muted font-medium">
                  First Bank Of Nigeria
                </span>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-2">
                <span className="font-bold text-foreground">Account Name</span>
                <span className="text-text-muted font-medium">
                  Tiago Felipe
                </span>
              </div>

              <div className="grid grid-cols-[130px_1fr] gap-2">
                <span className="font-bold text-foreground">
                  Account Number
                </span>
                <span className="text-text-muted font-medium">
                  234 54564 5565
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CLOSE BUTTON */}
        <div className="flex justify-end gap-4 mt-16">
          {is_supplier && (
            <Button
              onClick={onViewDocument}
              style={primaryBtn}
              className="flex-1"
            >
              Document
            </Button>
          )}
          <Button
            onClick={() => setIsModalOpen(false)}
            style={secondaryBtn}
            className="max-w-48"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;

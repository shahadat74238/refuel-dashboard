/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Form, Input } from "antd";
import { primaryBtn, secondaryBtn } from "../../constant/btnStyle";

interface IAddNewAdminModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onConfirm: (values: any) => void;
}

const AddNewAdminModal = ({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
}: IAddNewAdminModalProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onConfirm(values);
    form.resetFields();
    setIsModalOpen(false);
  };

  // Matching the green style from your image
  const confirmBtnStyle = {
    ...primaryBtn,
    backgroundColor: "#A8E6A2", // Light green color from image
    borderColor: "#A8E6A2",
    color: "#000",
    fontWeight: "bold",
    height: "50px",
  };

  const cancelBtnStyle = {
    ...secondaryBtn,
    height: "50px",
    fontWeight: "bold",
  };

  

  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      centered
      width={450}
      closable={false} // Match image style (no 'x' button)
    >
      <div className="px-2 py-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-8 text-foreground">
          Add New Admin
        </h2>

        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          className="space-y-4"
        >
          {/* Full Name */}
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Full Name" className={'auth-input'} />
          </Form.Item>

          {/* Email Address */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Required" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="Email Address" className={'auth-input'} />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input.Password placeholder="Password" className={'auth-input'} />
          </Form.Item>

          {/* Action Buttons */}
          <div className="flex w-full gap-4 pt-4">
            <Button
              onClick={() => setIsModalOpen(false)}
              style={cancelBtnStyle}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={confirmBtnStyle}
              className="flex-1"
            >
              Confirm
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddNewAdminModal;
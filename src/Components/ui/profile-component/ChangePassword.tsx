/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { primaryBtn } from "../../../constant/btnStyle";
import { useState } from "react";
import SuccessModal from "../../Dialog/SuccessModal";
import { useChangePasswordMutation } from "../../../redux/services/authApis";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onFinish = async (values: any) => {
    try {
      const res = await changePassword(values).unwrap();

      if (res?.success || res) {
        form.resetFields();
        setShowModal(true);
      }
    } catch (error: any) {
      console.error("Failed to change password:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to change Password.",
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl">
      <p className="text-foreground text-2xl font-medium text-center mb-6">
        Change Password
      </p>
      <Form
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Old password is required",
            },
          ]}
        >
          <Input.Password
            placeholder="Old Password"
            size="large"
            className="auth-input"
            disabled={isLoading}
          />
        </Form.Item>

        {/* Field name: newPassword */}
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
              message: "New password is required",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
          ]}
        >
          <Input.Password
            placeholder="New Password"
            size="large"
            className="auth-input"
            disabled={isLoading}
          />
        </Form.Item>

        {/* Field name: confirmPassword */}
        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Confirm Password is required",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!"),
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            size="large"
            className="auth-input"
            disabled={isLoading}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={primaryBtn}
          loading={isLoading} // 4. Added loading state
          className="w-full"
        >
          Update password
        </Button>
      </Form>

      <SuccessModal
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
        content="Password changed successfully."
      />
    </div>
  );
};

export default ChangePassword;

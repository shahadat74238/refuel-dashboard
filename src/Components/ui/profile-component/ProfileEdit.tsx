/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { primaryBtn } from "../../../constant/btnStyle";
import SuccessModal from "../../Dialog/SuccessModal";
import { useUpdateProfileMutation } from "../../../redux/services/profileApis";

const ProfileEdit = ({ image, data }: { image: File | null; data: any }) => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Sync API data with Form fields
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.name,
        email: data?.email,
        phone: data?.phone || "",
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();

      // Matches the keys in your screenshot
      formData.append("name", values.name);
      formData.append("phone", values.phone);

      if (image) {
        formData.append("admin-image", image); // Key from your Postman screenshot
      }

      const res = await updateProfile(formData).unwrap();

      if (res?.success) {
        setShowModal(true);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <p className="text-foreground text-2xl font-medium text-center mb-6">
        Edit Your Profile
      </p>
      <Form
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Full Name" className="auth-input" />
        </Form.Item>

        <Form.Item name="email">
          <Input disabled placeholder="Email" className="auth-input" />
        </Form.Item>

        <Form.Item name="phone">
          <Input placeholder="Phone Number" className="auth-input" />
        </Form.Item>

        <Button
          htmlType="submit"
          style={primaryBtn}
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </Form>

      <SuccessModal
        isModalOpen={showModal}
        setIsModalOpen={setShowModal}
        content="Profile updated successfully."
      />
    </div>
  );
};

export default ProfileEdit;

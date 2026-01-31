/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { primaryBtn } from "../../../constant/btnStyle";
import SuccessModal from "../../Dialog/SuccessModal";

const ProfileEdit = ({ image, data }: { image: File | null; data: any }) => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        full_name: data?.full_name,
        email: data?.email,
        contact_no: data?.phone_number || data?.contact_no || "",
        address: data?.address || "",
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    try {
      // 1. Initialize FormData
      const formData = new FormData();

      // 2. Append the image if it exists
      // Note: the key 'profile_image' must match what your backend Multer is looking for
      if (image) {
        formData.append("profile_image", image);
      }

      /**
       * 3. Append text fields.
       * We wrap them in a loop or append individually.
       * Note: 'phone_number' is used to match your backend schema.
       */
      const updateData = {
        full_name: values.full_name,
        address: values.address,
        phone_number: values.contact_no,
      };

      console.log(updateData, "Profile data");
      setShowModal(true);
      // toast.success("Profile updated successfully.");
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to update profile.",
      );
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl">
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
          name="full_name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="User Name" className="auth-input" />
        </Form.Item>

        <Form.Item name="email">
          <Input
            disabled
            type="email"
            placeholder="Email"
            className="auth-input"
          />
        </Form.Item>

        <Form.Item name="contact_no">
          <Input
            type="text"
            placeholder="+99007007007"
            className="auth-input"
          />
        </Form.Item>

        <Form.Item name="address">
          <Input
            type="text"
            placeholder="Enter your address"
            className="auth-input"
          />
        </Form.Item>

        <Button htmlType="submit" style={primaryBtn}>
          Save Change
        </Button>
      </Form>

      <SuccessModal 
      isModalOpen={showModal}
      setIsModalOpen={setShowModal}
      content="Profile updated successfully."/>
    </div>
  );
};

export default ProfileEdit;

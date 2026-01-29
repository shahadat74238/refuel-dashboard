/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useUpdateProfileMutation } from "../../../redux/services/profileApis";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ProfileEdit = ({
  image,
  data,
  setImage,
}: {
  image: File | null;
  data: any;
  setImage: (image: File | null) => void;
}) => {
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

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

      // Append data to formData
      // Option A: Append as individual fields (Best for Multer req.body)
      Object.entries(updateData).forEach(([key, value]) => {
        if (value) formData.append(key, value as string);
      });

      // 4. Send FormData to the mutation
      const res = await updateProfile(formData).unwrap();
      
      if (res?.success) {
        toast.success("Profile updated successfully.");
        setImage(null); // Clear image state after success
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Failed to update profile.",
      );
    }
  };

  return (
    <div>
      <p className="text-black text-2xl font-medium text-center mb-6">
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
          label={<span className="text-black font-medium">User Name</span>}
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input
            placeholder="User Name"
            className="p-2 w-full h-11 !rounded-lg border-gray-300"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-black font-medium">Email</span>}
        >
          <Input
            disabled
            type="email"
            placeholder="Email"
            className="cursor-not-allowed p-2 w-full h-11 !rounded-lg bg-gray-50 border-gray-300"
          />
        </Form.Item>

        <Form.Item
          name="contact_no"
          label={<span className="text-black font-medium">Contact no</span>}
        >
          <Input
            type="text"
            placeholder="+99007007007"
            className="p-2 w-full h-11 !rounded-lg border-gray-300"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label={<span className="text-black font-medium">Address</span>}
        >
          <Input
            type="text"
            placeholder="Enter your address"
            className="p-2 w-full h-11 !rounded-lg border-gray-300"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
          style={{
            backgroundColor: "#3A7292",
            color: "#fff",
            height: 45,
            border: "none"
          }}
          className="w-full !rounded-lg mt-4 font-semibold text-base hover:opacity-90"
        >
          Save Change
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useChangePasswordMutation } from "../../../redux/services/authApis";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [setNewPassword, { isLoading: isNewPassChange }] =
    useChangePasswordMutation();

  const onFinish = async (values: any) => {
    // Map internal form names to the specific snake_case keys required by the API
    const ChangePasswordDatas = {
      old_password: values.oldPassword,
      new_password: values.newPassword,
    };

    try {
      const res = await setNewPassword(ChangePasswordDatas).unwrap();

      // Handle success based on API response structure
      if (res?.success) {
        toast.success("Password Changed successfully.");
        form.resetFields(); // Optional: reset form after success
      } else {
        throw new Error(res?.message || "Failed to change Password.");
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
              message: "old password is required",
            },
          ]}
        >
          <Input.Password
            placeholder="Old Password"
            size="large"
            className="auth-input"
          />
        </Form.Item>

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
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["newPassword"]} // Tells Ant Design to re-validate when newPassword changes
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
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          disabled={isNewPassChange}
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
            height: 40,
          }}
          loading={isNewPassChange}
          className=" w-full"
        >
          Update password
        </Button>
      </Form>
    </div>
  );
};

export default ChangePassword;

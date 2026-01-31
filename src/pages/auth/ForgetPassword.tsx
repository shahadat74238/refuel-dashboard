/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button, Form, Input, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IMAGE } from "../../assets/index.image";
import { primaryBtn } from "../../constant/btnStyle";
import { useForgotPasswordMutation } from "../../redux/services/authApis";

const { Title } = Typography;

const ForgetPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ email: "" });
  }, [form]);

  const onFinish = async ({ email }: { email: string }) => {
    try {
      const res = await forgotPassword({ email }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Verification code sent successfully.");

        navigate(`/otp?email=${email}`);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to send verification code.",
      );
    }
  };

  return (
    <div className="global-padding w-full h-dvh flex max-w-7xl mx-auto items-center justify-center bg-background">
      <Card className="w-full max-w-[450px] !shadow-main md:!px-10 md:!rounded-[20px] !border-none">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-full flex items-center justify-center mb-4">
            <img src={IMAGE.brandLogo} alt="Brand Icon" className="h-20" />
          </div>
          <Title level={3} className="!font-bold !m-0 text-center">
            Forget Password
          </Title>
         
        </div>

        <Form
          form={form}
          name="forgot-password"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
        >
          {/* Email Input */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              size="large"
              placeholder="Email Address"
              className="auth-input"
              disabled={isLoading} // Disable input while sending
            />
          </Form.Item>

          {/* Action Button */}
          <Form.Item className="mt-8">
            <Button
              size="large"
              htmlType="submit"
              block
              loading={isLoading} // Show spinner while API is working
              style={primaryBtn}
              className="hover:!bg-core-primary/60 transition-all"
            >
              Get OTP
            </Button>
          </Form.Item>

          {/* Back to Login Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-core-primary font-bold hover:underline"
            >
              Back to Login
            </button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetPassword;

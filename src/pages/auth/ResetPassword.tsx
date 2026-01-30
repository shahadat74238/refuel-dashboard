/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { primaryBtn } from "../../constant/btnStyle";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { IMAGE } from "../../assets/index.image";

const { Title } = Typography;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Custom style class for the inputs to match the image exactly
  const inputStyle =
    "![height:56px] !bg-[#F9F9F9] !border-none !rounded-[10px] !text-center !font-bold placeholder:!text-foreground placeholder:!font-bold";

  const handleSubmit = async (values: any) => {
    // Basic validation
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Success Mock Logic
    toast.success("Password reset successfully.");

    // Clean up resetToken and navigate to login
    Cookies.remove("resetToken");
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  };

  return (
    <div className="global-padding w-full h-dvh flex max-w-7xl mx-auto items-center justify-center bg-background">
      <Card className="w-full max-w-[450px] !shadow-main md:!px-10 md:!rounded-[20px] !border-none">
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center mb-4">
            <img src={IMAGE.brandLogo} alt="Brand Icon" className="h-20" />
          </div>
          <Title level={3} className="!font-bold !m-0">
            Reset Password
          </Title>
        </div>

        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {/* New Password Input */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="New Password"
              className={inputStyle}
            />
          </Form.Item>

          {/* Confirm Password Input */}
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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
              size="large"
              placeholder="Confirm Password"
              className={inputStyle}
            />
          </Form.Item>

          <div className="mt-8">
            <Button
              size="large"
              htmlType="submit"
              style={primaryBtn}
              block
              className="hover:!bg-core-primary/70 duration-300 transition-colors"
            >
              Continue
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;

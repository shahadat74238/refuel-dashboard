/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Card, Typography, Checkbox } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IMAGE } from "../../assets/index.image";
import Cookies from "js-cookie";
import { primaryBtn } from "../../constant/btnStyle";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values, "Form value");
    try {
      toast.success("Login Successfully");
      Cookies.set("accessToken", "verySecretToken");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to login.");
    }
  };

  return (
    <div className="global-padding w-full h-dvh flex max-w-7xl mx-auto items-center justify-center bg-background">
      <Card className="w-full max-w-[450px] !shadow-main  md:!px-10 md:!rounded-[20px] !border-none">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="w-full flex items-center justify-center mb-4">
            <img src={IMAGE.brandLogo} alt="Brand Icon" className="h-20" />
          </div>
          <Title level={3} className="!font-bold !m-0">
            Admin Login
          </Title>
        </div>

        <Form
          form={form}
          name="login"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          initialValues={{ remember: false }}
        >
          {/* Email Input */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              size="large"
              placeholder="Email Address"
              className={"aut-input"}
            />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              className={"aut-input w-80"}
            />
          </Form.Item>

          {/* Remember & Forgot Password Row */}
          <div className="flex justify-between items-center mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="!font-bold">Remember</Checkbox>
            </Form.Item>
            <Link
              to="/forgot-password"
              className="!text-foreground !font-bold hover:underline"
            >
              Forget Password?
            </Link>
          </div>

          {/* Login Button */}
          <Form.Item>
            <Button
              size="large"
              htmlType="submit"
              block
              style={primaryBtn}
              className="hover:!bg-core-primary/60"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;

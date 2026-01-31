/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Form, Input, Typography, ConfigProvider } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { primaryBtn } from "../../constant/btnStyle";
import toast from "react-hot-toast";
import { IMAGE } from "../../assets/index.image";
import Cookies from "js-cookie"; // 1. Import Cookies
import {
  useResendResetCodeMutation,
  useVerifyResetOtpMutation,
} from "../../redux/services/authApis";

const { Title } = Typography;

const OneTimePassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyResetOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendResetCodeMutation();

  const handleSubmit = async (values: any) => {
    if (!email) {
      toast.error("Email not found. Please start the process again.");
      return;
    }

    try {
      const res = await verifyOtp({
        email,
        verifyCode: values.otp,
      }).unwrap();

      if (res?.success) {
        // 2. Extract and set the accessToken in cookies
        const token = res?.data?.accessToken;
        if (token) {
          Cookies.set("accessToken", token, { expires: 1 }); // expires in 1 day or as per your requirement
        }

        toast.success(res?.message || "OTP Verified Successfully");
        navigate(`/reset-password?email=${email}`);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Verification failed.",
      );
    }
  };

  const handleResendResetCode = async () => {
    if (!email) return;

    try {
      const res = await resendOtp({ email }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Verification code resent successfully.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to resend code.");
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBgContainer: "#F9F9F9",
            activeBorderColor: "transparent",
            hoverBorderColor: "transparent",
            borderRadiusLG: 10,
          },
        },
      }}
    >
      <div className="global-padding w-full h-dvh flex max-w-7xl mx-auto items-center justify-center bg-background">
        <Card className="w-full max-w-[500px] !shadow-main md:!px-10 md:!rounded-[20px] !border-none">
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="w-full flex items-center justify-center mb-6">
              <img src={IMAGE.brandLogo} alt="Brand Icon" className="h-20" />
            </div>
            <Title level={2} className="!font-bold !m-0">
              Verify Email
            </Title>
            <p className="text-muted mt-2 text-center">
              Please enter the 6-digit code sent to <br />
              <span className="font-semibold text-foreground">{email}</span>
            </p>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>
            <div className="flex items-center justify-center mb-10">
              <Form.Item
                name="otp"
                rules={[{ required: true, message: "Please enter the OTP" }]}
                className="!m-0"
              >
                <Input.OTP
                  length={6}
                  variant="filled"
                  size="large"
                  disabled={isVerifying}
                  className="[&_input]:!bg-[#F9F9F9] [&_input]:!border-none [&_input]:!h-[64px] [&_input]:!w-[60px] [&_input]:!text-xl [&_input]:!font-bold"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                size="large"
                htmlType="submit"
                style={primaryBtn}
                block
                loading={isVerifying}
                className="hover:!bg-core-primary/60"
              >
                Verify Code
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center text-sm mt-6 text-muted">
            Didn't receive a code?{" "}
            <button
              type="button"
              disabled={isResending || isVerifying}
              className={`font-medium text-core-primary hover:underline cursor-pointer ${
                isResending ? "opacity-50" : ""
              }`}
              onClick={handleResendResetCode}
            >
              {isResending ? "Sending..." : "Resend code"}
            </button>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default OneTimePassword;
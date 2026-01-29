/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApis from "../baseApis";

const authApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: any) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: build.mutation({
      query: (data: any) => ({
        url: "/api/v1/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: build.mutation({
      query: (data: any) => ({
        url: "/api/v1/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    resendResetCode: build.mutation({
      query: (data: any) => ({
        url: "/api/v1/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyResetOtp: build.mutation({
      query: (data: any) => ({
        url: "/api/v1/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: (data: any) => ({
        url: "/api/v1/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResendResetCodeMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
} = authApis;

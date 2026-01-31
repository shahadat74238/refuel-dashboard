/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApis from "../baseApis";

const authApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: any) => ({
        url: "/dashboard/login-admin",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: build.mutation({
      query: (data: any) => ({
        url: "/dashboard/change-admin-password",
        method: "PATCH",
        body: data,
      }),
    }),
    forgotPassword: build.mutation({
      query: (data: any) => ({
        url: "/dashboard/admin-send-verify-code",
        method: "POST",
        body: data,
      }),
    }),
    resendResetCode: build.mutation({
      query: (data: any) => ({
        url: "/dashboard/admin-send-verify-code",
        method: "POST",
        body: data,
      }),
    }),
    verifyResetOtp: build.mutation({
      query: (data: any) => ({
        url: "/dashboard/admin-verify-code",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: build.mutation({
      query: (data: any) => ({
        url: "/dashboard/admin-reset-password",
        method: "PATCH",
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

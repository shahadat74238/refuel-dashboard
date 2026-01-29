import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
const baseApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("accessToken");
      const resetToken = Cookies.get("resetToken");

      const token = accessToken || resetToken;

      if (token) {
        // Adding "Bearer " is the standard way to provide a JWT
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "termsAndConditions",
    "privacyPolicy",
    "faq",
    "post",
    "profile",
    "subscription",
    "user",
    "common",
    "parcel-owner",
    "driver",
    "parcel",
    "chat", 
    "message", 
    "dashboard"
  ],
  endpoints: () => ({}),
});

export default baseApis;

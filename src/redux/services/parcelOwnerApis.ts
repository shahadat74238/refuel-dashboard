import baseApis from "../baseApis";

const userApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getAllParcelOwner: build.query({
      query: (params) => ({
        url: "/api/v1/customer/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["parcel-owner"],
    }),
  }),
});

export const { useGetAllParcelOwnerQuery} = userApis;

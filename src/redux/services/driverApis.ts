import baseApis from "../baseApis";

const driverApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getAllDriver: build.query({
      query: (params) => ({
        url: "/api/v1/driver/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["driver"],
    }),
    // Query to get a single driver by ID
    getSingleDriver: build.query({
      query: (id: string) => ({
        url: `/api/v1/driver/get/${id}`,
        method: "GET",
      }),
      providesTags: ["driver"],
    }),
  }),
});

export const { useGetAllDriverQuery, useGetSingleDriverQuery } = driverApis;

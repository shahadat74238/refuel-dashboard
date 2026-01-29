import baseApis from "../baseApis";

const dashboardApi = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getAdminStats: build.query({
      query: () => ({
        url: "/api/v1/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    getParcelMovement: build.query({
      query: (year) => ({
        url: "/api/v1/dashboard/parcel-movement",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
    getParcelOwnerGrowth: build.query({
      query: (year) => ({
        url: "/api/v1/dashboard/parcel-owner-growth",
        method: "GET",
        params: { year },
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAdminStatsQuery, useGetParcelMovementQuery, useGetParcelOwnerGrowthQuery  } = dashboardApi;

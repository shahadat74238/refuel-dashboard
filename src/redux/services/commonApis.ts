import baseApis from "../baseApis";

const userApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    changeCustomerStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/api/v1/user/change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: ["common"],
    }),
  }),
});

export const { useChangeCustomerStatusMutation } = userApis;

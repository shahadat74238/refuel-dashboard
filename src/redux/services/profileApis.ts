import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    userMyProfile: build.query({
      query: () => ({
        url: "/dashboard/get-admin-detail",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/dashboard/edit-admin-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useUserMyProfileQuery, useUpdateProfileMutation } = profileApis;

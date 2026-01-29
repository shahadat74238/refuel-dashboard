import baseApis from "../baseApis";

const profileApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    userMyProfile: build.query({
      query: () => ({
        url: "/api/v1/user/get-me",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/api/v1/user/update-me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const { useUserMyProfileQuery, useUpdateProfileMutation } = profileApis;

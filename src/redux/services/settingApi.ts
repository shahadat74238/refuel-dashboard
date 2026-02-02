import baseApis from "../baseApis";

const manageApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/settings/get-terms-and-conditions",
        method: "GET",
      }),
      providesTags: ["termsAndConditions"],
    }),
    updateTermsAndConditions: builder.mutation({
      query: ({ id, data }) => ({
        url: `/settings/update-terms-and-conditions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["termsAndConditions"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/settings/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["privacyPolicy"],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/settings/update-privacy-policy/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["privacyPolicy"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} = manageApis;

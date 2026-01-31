import baseApis from "../baseApis";

const manageApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/api/v1/settings/terms/get",
        method: "GET",
      }),
      providesTags: ["termsAndConditions"],
    }),
    updateTermsAndConditions: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/settings/terms/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["termsAndConditions"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/api/v1/settings/privacy/get",
        method: "GET",
      }),
      providesTags: ["privacyPolicy"],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/settings/privacy/update/${id}`,
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

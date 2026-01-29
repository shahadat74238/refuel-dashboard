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
    getFaq: builder.query({
      query: () => ({
        url: "/api/v1/settings/faq/get-all",
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/api/v1/settings/faq/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/v1/settings/faq/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/api/v1/settings/faq/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = manageApis;

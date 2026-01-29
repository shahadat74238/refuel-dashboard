import baseApis from "../baseApis";

const parcelApis = baseApis.injectEndpoints({
  endpoints: (build) => ({
    getAllParcel: build.query({
      query: (params) => ({
        url: "/api/v1/parcel/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["parcel"],
    }),
    getSingleParcel: build.query({
      query: (id: string) => ({
        url: `/api/v1/parcel/get/${id}`,
        method: "GET",
      }),
      providesTags: ["parcel"],
    }),
    rejectParcel: build.mutation({
      query: ({ id, rejection_reason }) => ({
        url: `/api/v1/parcel/reject/${id}`,
        method: "PATCH",
        body: { rejection_reason },
      }),
      invalidatesTags: ["parcel"],
    }),
    proposePrice: build.mutation({
      query: (data) => ({
        url: "/api/v1/parcel/propose-price",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["parcel"],
    }),

    makeFinalOffer: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/v1/parcel/final-offer/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["parcel"],
    }),
    acceptPrice: build.mutation({
      query: ({ id }) => ({
        url: `/api/v1/parcel/accept-price/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["parcel"],
    }),
  }),
});

export const {
  useGetAllParcelQuery,
  useGetSingleParcelQuery,
  useRejectParcelMutation,
  useProposePriceMutation,
  useMakeFinalOfferMutation,
  useAcceptPriceMutation, 
} = parcelApis;

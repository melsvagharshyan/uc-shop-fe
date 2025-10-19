import { api } from "../api";

const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<
      { url: string },
      { orderId: string; amount: number }
    >({
      query: (body) => ({
        url: "/payments/create",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      }),
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;

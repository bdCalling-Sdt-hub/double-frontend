import baseApi from './baseApi';

const orderApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
                getOrders: build.query({
                        query: (args) => {
                                const params = new URLSearchParams();

                                if (args) {
                                        args.forEach((item) => {
                                                if (item.value !== null && item.value !== undefined) {
                                                        params.append(item.name, item.value);
                                                }
                                        });
                                }
                                return {
                                        url: '/order',
                                        method: 'GET',
                                        params,
                                };
                        },
                        providesTags: ['Orders'],
                        transformResponse: (response) => {
                                return { data: response.data, meta: response.pagination };
                        },
                }),

                createOrder: build.mutation({
                        query: (values) => {
                                return {
                                        url: '/order',
                                        method: 'POST',
                                        body: values,
                                };
                        },
                        invalidatesTags: ['Orders'],
                }),
                updateOrder: build.mutation({
                        query: ({ id, data }) => {
                                return {
                                        url: `/order/${id}`,
                                        method: 'PATCH',
                                        body: data,
                                };
                        },
                        invalidatesTags: ['Orders'],
                }),
        }),
});

export const { useGetOrdersQuery, useUpdateOrderMutation, useCreateOrderMutation } = orderApi;

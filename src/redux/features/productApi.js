import baseApi from './baseApi';

const productApi = baseApi.injectEndpoints({
        endpoints: (builder) => ({
                getAllProducts: builder.query({
                        query: (args) => {
                                const params = new URLSearchParams();

                                if (args) {
                                        args.forEach((item) => {
                                                if (item.value !== null && item.value !== undefined)
                                                        params.append(item.name, item.value);
                                        });
                                }
                                return {
                                        url: '/product',
                                        method: 'GET',
                                        params,
                                };
                        },
                        transformResponse: (response) => ({
                                data: response.data,
                                meta: response.pagination,
                        }),
                        providesTags: ['Products'],
                }),
                getProductById: builder.query({
                        query: (id) => ({
                                url: `/product/${id}`,
                                method: 'GET',
                        }),
                        providesTags: ['Products'],
                        transformResponse: (response) => response.data,
                }),

                createProduct: builder.mutation({
                        query: (values) => ({
                                url: '/product/create-product',
                                method: 'POST',
                                body: values,
                        }),
                        invalidatesTags: ['Products'],
                }),
                updateProduct: builder.mutation({
                        query: (args) => ({
                                url: `/product/${args.id}`,
                                method: 'PATCH',
                                body: args.data,
                        }),
                        invalidatesTags: ['Products'],
                }),

                deleteProduct: builder.mutation({
                        query: (id) => ({
                                url: `/product/${id}`,
                                method: 'DELETE',
                        }),
                        invalidatesTags: ['Products'],
                }),
        }),
});

export const {
        useGetAllProductsQuery,
        useUpdateProductMutation,
        useDeleteProductMutation,
        useCreateProductMutation,
        useGetProductByIdQuery,
} = productApi;

import baseApi from './baseApi';

const categoryApi = baseApi.injectEndpoints({
        endpoints: (builder) => ({
                addCategory: builder.mutation({
                        query: (values) => ({
                                url: 'category/create-category',
                                method: 'POST',
                                body: values,
                        }),
                        invalidatesTags: ['Categories'],
                }),
                getAllCategories: builder.query({
                        query: () => ({
                                url: '/category',
                                method: 'GET',
                        }),
                        transformResponse: (response) => {
                                return {
                                        data: response.data,
                                        meta: response.pagination,
                                };
                        },
                        providesTags: ['Categories'],
                }),
                singleCategory: builder.query({
                        query: (id) => ({
                                url: `/category/${id}`,
                                method: 'GET',
                        }),
                        transformResponse: (response) => response.data,
                        providesTags: ['Categories'],
                }),
                deleteCategory: builder.mutation({
                        query: (id) => ({
                                url: `/category/${id}`,
                                method: 'DELETE',
                        }),
                        invalidatesTags: ['Categories'],
                }),
        }),
});

export const { useAddCategoryMutation, useGetAllCategoriesQuery, useDeleteCategoryMutation, useSingleCategoryQuery } =
        categoryApi;

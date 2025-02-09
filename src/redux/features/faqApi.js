import baseApi from './baseApi';

export const faqApi = baseApi.injectEndpoints({
        endpoints: (build) => ({
                getFaq: build.query({
                        query: () => ({
                                url: '/faq',
                                method: 'GET',
                        }),
                        providesTags: ['Faq'],
                        transformResponse: (response) => {
                                return response.data;
                        },
                }),
                addFaq: build.mutation({
                        query: (data) => ({
                                url: '/faq/create-faq',
                                method: 'POST',
                                body: data,
                        }),
                        invalidatesTags: ['Faq'],
                }),
                updateFaq: build.mutation({
                        query: ({ id, data }) => {
                                return {
                                        url: `/faq/${id}`,
                                        method: 'PATCH',
                                        body: data,
                                };
                        },
                        invalidatesTags: ['Faq'],
                }),
                deleteFaq: build.mutation({
                        query: (id) => {
                                return {
                                        url: `/faq/${id}`,
                                        method: 'DELETE',
                                };
                        },
                        invalidatesTags: ['Faq'],
                }),
        }),
});

export const { useGetFaqQuery, useAddFaqMutation, useUpdateFaqMutation, useDeleteFaqMutation } = faqApi;

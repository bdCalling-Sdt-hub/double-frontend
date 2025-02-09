import baseApi from './baseApi';

const aboutApi = baseApi.injectEndpoints({
        endpoints: (builder) => ({
                getAbout: builder.query({
                        query: () => ({
                                url: '/about',
                                method: 'GET',
                        }),
                        providesTags: ['About'],
                }),
                addAbout: builder.mutation({
                        query: (values) => ({
                                url: '/about/create-content',
                                method: 'POST',
                                body: values,
                        }),
                        invalidatesTags: ['About'],
                }),
                deleteAbout: builder.mutation({
                        query: (id) => ({
                                url: `/about/${id}`,
                                method: 'DELETE',
                        }),
                        invalidatesTags: ['About'],
                }),
        }),
});

export const { useGetAboutQuery, useAddAboutMutation, useDeleteAboutMutation } = aboutApi;

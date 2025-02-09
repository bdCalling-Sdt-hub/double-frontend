import baseApi from './baseApi';

const ruleApi = baseApi.injectEndpoints({
        endpoints: (builder) => ({
                getTermsAndConditions: builder.query({
                        query: () => ({
                                url: '/rule/terms-and-conditions',
                                method: 'GET',
                        }),
                        providesTags: ['Rule'],
                        transformResponse: (response) => response.data,
                }),
                addTermsAndConditions: builder.mutation({
                        query: (values) => ({
                                url: '/rule/terms-and-conditions',
                                method: 'POST',
                                body: values,
                        }),
                        invalidatesTags: ['Rule'],
                }),

                updateTermsAndConditions: builder.mutation({
                        query: (data) => ({
                                url: `/rule/terms-and-conditions`,
                                method: 'PATCH',
                                body: data,
                        }),
                        invalidatesTags: ['Rule'],
                }),

                //////////////////////////////////this is for privacy policy////////////////////////////////////
                getPrivacyPolicy: builder.query({
                        query: () => ({
                                url: '/rule/privacy-policy',
                                method: 'GET',
                        }),
                        providesTags: ['Rule'],
                        transformResponse: (response) => response.data,
                }),
                addPrivacyPolicy: builder.mutation({
                        query: (values) => ({
                                url: '/rule/privacy-policy',
                                method: 'POST',
                                body: values,
                        }),
                        invalidatesTags: ['Rule'],
                }),
                updatePrivacyPolicy: builder.mutation({
                        query: (values) => ({
                                url: '/rule/privacy-policy',
                                method: 'PATCH',
                                body: values,
                        }),
                        invalidatesTags: ['Rule'],
                }),
        }),
});

export const {
        useGetTermsAndConditionsQuery,
        useAddTermsAndConditionsMutation,
        useGetPrivacyPolicyQuery,
        useAddPrivacyPolicyMutation,
        useUpdateTermsAndConditionsMutation,
        useUpdatePrivacyPolicyMutation,
} = ruleApi;

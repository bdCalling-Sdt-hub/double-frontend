import baseApi from './baseApi';

const authApi = baseApi.injectEndpoints({
        endpoints: (builder) => ({
                getAllProduct: builder.query({
                        query: (args) => {
                                const params = new URLSearchParams();

                                if (args) {
                                        args.forEach((item) => {
                                                params.append(item.name, item.value);
                                        });
                                }

                                return {
                                        url: '/products',
                                        method: 'GET',
                                        params,
                                };
                        },
                }),
                login: builder.mutation({
                        query: (values) => ({
                                url: '/auth/login',
                                method: 'POST',
                                body: values,
                        }),
                }),
                forgotPassword: builder.mutation({
                        query: (values) => ({
                                url: '/auth/forget-password',
                                method: 'POST',
                                body: values,
                        }),
                }),
                verifyOtp: builder.mutation({
                        query: (values) => ({
                                url: '/auth/verify-email',
                                method: 'POST',
                                body: values,
                        }),
                }),
                resetPassword: builder.mutation({
                        query: (values) => ({
                                url: '/auth/reset-password',
                                method: 'POST',
                                body: values,
                        }),
                }),
                changePassword: builder.mutation({
                        query: (values) => ({
                                url: '/auth/change-password',
                                method: 'POST',
                                body: values,
                        }),
                }),
        }),
});

export const {
        useLoginMutation,
        useForgotPasswordMutation,
        useVerifyOtpMutation,
        useResetPasswordMutation,
        useChangePasswordMutation,
} = authApi;
export default authApi;

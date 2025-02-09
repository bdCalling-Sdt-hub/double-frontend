import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://68.178.202.182:5000';
const baseApi = createApi({
        reducerPath: 'baseApi',
        baseQuery: fetchBaseQuery({
                baseUrl: `${baseUrl}/api/v1`,
                credentials: 'include',
                prepareHeaders: (headers, { endpoint }) => {
                        // console.log(endpoint);
                        if (endpoint == 'resetPassword') {
                                const token = localStorage.getItem('oneTimeToken');
                                if (token) {
                                        headers.set('Authorization', token);
                                }
                        } else {
                                const token = localStorage.getItem('authToken');
                                if (token) {
                                        headers.set('Authorization', `Bearer ${token}`);
                                }
                        }
                        return headers;
                },
        }),
        endpoints: () => ({}),
        tagTypes: ['Product', 'Rule', 'Order', 'About', 'Category', 'Contact'],
});

export default baseApi;

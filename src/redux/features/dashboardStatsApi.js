import baseApi from './baseApi';

const dashboardStatsApi = baseApi.injectEndpoints({
        endpoints: (builder) => ({
                getDashboardStats: builder.query({
                        query: () => ({
                                url: '/order/overview',
                                method: 'GET',
                        }),
                        transformResponse: (response) => response.data,
                }),
        }),
});

export const { useGetDashboardStatsQuery } = dashboardStatsApi;

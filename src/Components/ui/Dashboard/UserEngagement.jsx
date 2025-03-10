import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetDashboardStatsQuery } from '../../../redux/features/dashboardStatsApi';

const UserEngagement = () => {
        const { data: orderOverview } = useGetDashboardStatsQuery([]);
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);
        console.log(orderOverview);

        const [selectedYear, setSelectedYear] = useState(currentYear.toString());

        return (
                <div className="bg-white p-5 w-[100%] h-[400px] rounded-2xl border">
                        <div className="flex justify-between items-center mb-5">
                                <h2 className="font-bold">Order Monthly Overview</h2>
                                <div className="relative">
                                        <select
                                                value={selectedYear}
                                                onChange={(e) => setSelectedYear(e.target.value)}
                                                className="px-3 py-2 w-32 rounded-md border cursor-pointer"
                                                style={{
                                                        maxHeight: '150px',
                                                        overflowY: 'scroll',
                                                }}
                                        >
                                                {years
                                                        .slice()
                                                        .reverse()
                                                        .map((year) => (
                                                                <option key={year} value={year}>
                                                                        {year}
                                                                </option>
                                                        ))}
                                        </select>
                                </div>
                        </div>
                        <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                        data={orderOverview?.monthlyOverview}
                                        margin={{
                                                top: 5,
                                                right: 0,
                                                left: 0,
                                                bottom: 40,
                                        }}
                                >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis dataKey={'order'} />
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" align="center" />
                                        <Line type="monotone" dataKey="order" stroke="#173616" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="userCount" stroke="#5c2579cc" />
                                </LineChart>
                        </ResponsiveContainer>
                </div>
        );
};

export default UserEngagement;

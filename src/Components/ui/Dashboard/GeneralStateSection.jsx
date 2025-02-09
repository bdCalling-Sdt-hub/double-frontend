import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { IoHourglassOutline } from 'react-icons/io5';
import { FaArrowUpFromGroundWater } from 'react-icons/fa6';
import { useGetDashboardStatsQuery } from '../../../redux/features/dashboardStatsApi';

const GeneralStateSection = () => {
        const { data: orderOverview } = useGetDashboardStatsQuery([]);

        const data = [
                {
                        title: 'Total Products',
                        value: orderOverview?.totalProducts,
                        bgColor: 'bg-green-100',
                        icon: <FaArrowUpFromGroundWater className="text-green-500" size={28} />,
                },
                {
                        title: 'Total Delivered Orders',
                        value: orderOverview?.totalDeliverOrder,
                        bgColor: 'bg-green-50',
                        icon: <FaCheckCircle className="text-green-500" size={28} />,
                },
                {
                        title: 'Total Canceled Orders',
                        value: orderOverview?.totalCancelOrder,
                        bgColor: 'bg-red-50',
                        icon: <FaTimesCircle className="text-red-500" size={28} />,
                },
                {
                        title: 'Total Pending Orders',
                        value: orderOverview?.totalPendingOrder,
                        bgColor: 'bg-yellow-50',
                        icon: <IoHourglassOutline className="text-yellow-500" size={28} />,
                },
        ];

        return (
                <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-4">
                        {data.map((item, index) => (
                                <div
                                        key={index}
                                        className={`${item.bgColor} p-6 rounded-xl shadow-md transition-shadow duration-300 border border-gray-100`}
                                >
                                        <div className="flex items-center space-x-4">
                                                <div className="p-3 bg-white rounded-full shadow-sm">{item.icon}</div>
                                                <div>
                                                        <h2 className="text-lg font-medium text-gray-700">
                                                                {item.title}
                                                        </h2>
                                                        <h3 className="text-2xl font-bold text-gray-900">
                                                                {item.value}
                                                        </h3>
                                                </div>
                                        </div>
                                </div>
                        ))}
                </div>
        );
};

export default GeneralStateSection;

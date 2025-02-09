import GeneralStateSection from '../../Components/ui/Dashboard/GeneralStateSection';
import RunningOrdersTable from '../../Components/ui/Dashboard/RunningOrdersTable';
import UserEngagement from '../../Components/ui/Dashboard/UserEngagement';

const DashboardHome = () => {
        return (
                <div>
                        <GeneralStateSection />

                        <div className="gap-6 mt-10 w-full md:flex">
                                <div className="my-6 w-5/12"> {<RunningOrdersTable />}</div>
                                <div className="my-6 w-7/12">{<UserEngagement />}</div>
                        </div>
                </div>
        );
};

export default DashboardHome;
{
        /* <div className="flex gap-6 items-center mt-10 w-full">
<div className="flex flex-col justify-center py-3 w-5/12 bg-white rounded-2xl border">
        <p className="px-4 text-base font-semibold py-">Sales and Revenue Tracking</p>
        <SalesTrackingChart />
</div>
<div className="flex gap-4 w-7/12">
        <TopBuyersPage />
        <div className="w-[40%] border rounded-2xl bg-white p-4 flex flex-col items-center">
                <h1 className="mb-4 text-lg font-semibold">Order Summary</h1>

                <div className="relative w-40 h-40">
                        <svg
                                className="absolute inset-0 transform -rotate-90"
                                viewBox="0 0 36 36"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                                {/* Outer circle (background) */
}
// <circle
//         cx="18"
//         cy="18"
//         r="16"
//         fill="none"
//         className="stroke-current text-[#d8f5d9]"
//         strokeWidth="4"
// ></circle>
// {/* Progress circle */}
// <circle
//         cx="18"
//         cy="18"
//         r="16"
//         fill="none"
//         className="stroke-current text-[#173616]"
//         strokeWidth="4"
//         strokeDasharray={`${2 * Math.PI * 16}`}
//         strokeDashoffset={`${
//                 (2 *
//                         Math.PI *
//                         16 *
//                         (100 - orderSummary?.done)) /
//                 100
//         }`}
//         strokeLinecap="round"
// ></circle>
// </svg>

{
        /* Center percentage display */
}
//         <div className="flex absolute top-1/2 left-1/2 flex-col justify-center items-center w-24 h-24 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-secondary">
//                 <span className="text-2xl font-bold">
//                         {orderSummary?.done}%
//                 </span>
//         </div>
// </div>

//                 <div className="flex gap-6 items-center">
//                         <div className="flex gap-2 items-center">
//                                 <div className="w-4 h-3 rounded-3xl bg-primary"></div>
//                                 <p className="text-sm font-medium">
//                                         Done: {orderSummary?.done}%
//                                 </p>
//                         </div>
//                         <div className="flex gap-2 items-center">
//                                 <div className="w-4 h-3 rounded-3xl bg-secondary"></div>
//                                 <p className="text-sm font-medium">
//                                         In Progress:{' '}
//                                         {orderSummary?.inProgress.toFixed(1)}%
//                                 </p>
//                         </div>
//                 </div>
//         </div>
// </div>
// </div> */}

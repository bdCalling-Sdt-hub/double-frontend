import { Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useGetOrdersQuery } from '../../../redux/features/orderApi';

const RunningOrdersTable = () => {
        const { data: ordersData } = useGetOrdersQuery();
        console.log(ordersData);
        const columns = [
                {
                        title: 'Order Number',
                        dataIndex: 'orderId',
                        key: 'orderId',
                },
                {
                        title: 'Price',
                        dataIndex: 'price',
                        key: 'price',
                        render: (text) => `$${text}`,
                },
                {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                        key: 'quantity',
                },
                {
                        title: 'Order Date',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (date) => moment(date).format('Do MMM, YYYY'),
                },
        ];

        return (
                <div className="border bg-white h-[400px] p-5 rounded-2xl">
                        <div className="flex justify-between items-center">
                                <h1 className="mb-2 font-bold">Running Orders</h1>
                                <Link to={'/dashboard/order-management'}>
                                        <Button className="bg-secondary border-secondary">View All</Button>
                                </Link>
                        </div>
                        <Table columns={columns} pagination={false} dataSource={ordersData?.data.slice(0, 3)} />
                </div>
        );
};

export default RunningOrdersTable;

import { Input, Table, Select } from 'antd';
import { useGetOrdersQuery, useUpdateOrderMutation } from '../../../redux/features/orderApi';
import { useState } from 'react';
import toast from 'react-hot-toast';

const { Option } = Select;

const OrderManagement = () => {
        const [page, setPage] = useState(1);
        const [searchText, setSearchText] = useState('');
        const [selectedStatus, setSelectedStatus] = useState('ALL');
        const { data: orderData } = useGetOrdersQuery([
                { name: 'page', value: page },
                { name: 'searchTerm', value: searchText },
                { name: 'status', value: selectedStatus == 'ALL' ? undefined : selectedStatus },
        ]);
        const [updateOrderStatus] = useUpdateOrderMutation();

        const handleOrderStatusChange = async (id, status) => {
                try {
                        const res = await updateOrderStatus({ id, status }).unwrap();

                        if (res.success) {
                                toast.success(res.message);
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };

        const columns = [
                {
                        title: 'Order No',
                        dataIndex: 'orderId',
                        key: 'orderId',
                },
                {
                        title: 'User Email',
                        dataIndex: 'email',
                        key: 'email',
                },
                {
                        title: 'Payment By',
                        dataIndex: 'fullName',
                        key: 'fullName',
                },
                {
                        title: 'Total Items',
                        dataIndex: 'quantity',
                        key: 'quantity',
                },
                {
                        title: 'Price',
                        dataIndex: 'price',
                        key: 'price',
                },

                {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (text, record) => {
                                let statusStyle = {};
                                switch (text) {
                                        case 'PENDING':
                                                statusStyle = { color: 'orange', backgroundColor: '#fff4e6' };
                                                break;
                                        case 'SHIPPED':
                                                statusStyle = { color: 'blue', backgroundColor: '#e6f7ff' };
                                                break;
                                        case 'DELIVERED':
                                                statusStyle = { color: 'green', backgroundColor: '#e6ffed' };
                                                break;
                                        case 'CANCELED':
                                                statusStyle = { color: 'red', backgroundColor: '#fff2f0' };
                                                break;
                                        default:
                                                statusStyle = { color: 'black', backgroundColor: 'white' };
                                }

                                return (
                                        <Select
                                                mode="dropdown"
                                                value={text}
                                                onChange={(value) => handleOrderStatusChange(record._id, value)}
                                                style={{
                                                        width: 120,
                                                        color: statusStyle.color,
                                                        backgroundColor: statusStyle.backgroundColor,
                                                }}
                                        >
                                                <Select.Option value="PENDING" style={{ backgroundColor: '#fff4e6' }}>
                                                        PENDING
                                                </Select.Option>
                                                <Select.Option value="SHIPPED" style={{ backgroundColor: '#e6f7ff' }}>
                                                        SHIPPED
                                                </Select.Option>
                                                <Select.Option value="DELIVERED" style={{ backgroundColor: '#e6ffed' }}>
                                                        DELIVERED
                                                </Select.Option>
                                                <Select.Option value="CANCELED" style={{ backgroundColor: '#fff2f0' }}>
                                                        CANCELED
                                                </Select.Option>
                                        </Select>
                                );
                        },
                },
        ];

        const handleStatusChange = (value) => {
                setSelectedStatus(value);
        };

        return (
                <div className="p-8">
                        <h1 className="mb-6 text-2xl font-bold text-start">Order Management</h1>
                        <div className="flex items-center mb-4">
                                <Input
                                        placeholder="Search products..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="py-3 w-[50%] mr-4"
                                />
                                <Select
                                        placeholder="Filter by status"
                                        value={selectedStatus}
                                        onChange={handleStatusChange}
                                        style={{ width: 150, height: 50 }}
                                >
                                        <Option value="ALL">All</Option>
                                        <Option value="PENDING">Pending</Option>
                                        <Option value="PROCESSING">Processing</Option>
                                        <Option value="SHIPPED">Shipped</Option>
                                        <Option value="DELIVERED">Delivered</Option>
                                        <Option value="CANCELED">Canceled</Option>
                                </Select>
                        </div>
                        <Table
                                columns={columns}
                                dataSource={orderData?.data}
                                rowKey="orderNo"
                                pagination={{
                                        pageSize: orderData?.meta?.limit,
                                        total: orderData?.meta?.total,

                                        onChange: (page) => {
                                                setPage(page);
                                        },
                                }}
                        />
                </div>
        );
};

export default OrderManagement;

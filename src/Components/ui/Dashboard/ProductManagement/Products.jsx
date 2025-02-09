import { useState } from 'react';
import { Table, Input, Tag, Popconfirm } from 'antd';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router';
import { IoMdAdd } from 'react-icons/io';
import { useDeleteProductMutation, useGetAllProductsQuery } from '../../../../redux/features/productApi';
import getImageUrl from '../../../../utils/getImageUrl';
import moment from 'moment';
import toast from 'react-hot-toast';

const Products = () => {
        const [page, setPage] = useState(1);
        const [searchText, setSearchText] = useState('');
        const { data: productData } = useGetAllProductsQuery([
                { name: 'page', value: page },
                { name: 'searchTerm', value: searchText },
        ]);
        const [deleteProduct] = useDeleteProductMutation();

        const handleDelete = async (id) => {
                try {
                        const res = await deleteProduct(id).unwrap();
                        if (res.success) {
                                toast.success('Product deleted successfully');
                        } else {
                                toast.error('Something went wrong');
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };

        // Columns for the Ant Design table
        const columns = [
                { title: 'ID', dataIndex: '_id', key: '_id' },
                {
                        title: 'Product Name',
                        key: 'name',
                        render: (_, record) => (
                                <div className="flex items-center space-x-3">
                                        <img
                                                src={getImageUrl(record?.image[0])}
                                                alt={record.name}
                                                className="object-cover w-10 h-10 rounded-full"
                                        />
                                        <span>{record.name}</span>
                                </div>
                        ),
                },
                { title: 'Weight', dataIndex: 'weight', key: 'weight' },
                {
                        title: 'Category',
                        dataIndex: 'category',
                        key: 'category',
                        render: (text) => <span>{text?.name}</span>,
                },
                { title: 'Price', dataIndex: 'price', key: 'price' },
                {
                        title: 'Date',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (text) => <span>{moment(text).format('Do MMM, YYYY')}</span>,
                },
                // { title: 'Store', dataIndex: 'store', key: 'store' },
                {
                        title: 'Status',
                        key: 'status',
                        render: (_, record) => (
                                <Tag
                                        color={
                                                record.status === 'In Stock'
                                                        ? 'green'
                                                        : record.status === 'Out of Stock'
                                                        ? 'orange'
                                                        : 'red'
                                        }
                                >
                                        {record.status}
                                </Tag>
                        ),
                },
                {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                                <div className="flex gap-1 items-center">
                                        <Link to={`/dashboard/edit-product/${record._id}`}>
                                                <FaRegEdit className="" size={20} />
                                        </Link>
                                        <Popconfirm
                                                title="Are you sure you want to delete this product?"
                                                onConfirm={() => handleDelete(record._id)}
                                        >
                                                <MdDelete className="text-red-600 cursor-pointer" size={20} />
                                        </Popconfirm>
                                </div>
                        ),
                },
        ];

        return (
                <div className="p-4">
                        <h1 className="mb-4 text-2xl font-bold text-start">Products</h1>

                        <div className="flex gap-10 justify-between">
                                <Input
                                        placeholder="Search products..."
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        className="mb-4 py-3 w-[50%]"
                                />
                                <Link to={'/dashboard/add-product'}>
                                        <button className="flex items-center gap-1 rounded-lg justify-center bg-[#173616] text-white p-4 ">
                                                {' '}
                                                <IoMdAdd /> Add Product
                                        </button>
                                </Link>
                        </div>

                        <Table
                                dataSource={productData?.data}
                                columns={columns}
                                rowKey="id"
                                bordered={false}
                                className="shadow-md table-no-border"
                                pagination={{
                                        pageSize: productData?.meta?.limit,
                                        total: productData?.meta?.total,
                                        onChange: (page) => setPage(page),
                                }}
                        />
                </div>
        );
};

export default Products;

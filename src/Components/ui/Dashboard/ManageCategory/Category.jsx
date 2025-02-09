import { Button, Form, Input, Modal, Popconfirm, Space, Table, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {
        useAddCategoryMutation,
        useDeleteCategoryMutation,
        useGetAllCategoriesQuery,
} from '../../../../redux/features/categoryApi';
import toast from 'react-hot-toast';
import getImageUrl from '../../../../utils/getImageUrl';
import { BsTrash3 } from 'react-icons/bs';

const Category = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [addCategory] = useAddCategoryMutation();
        const { data: categoryData } = useGetAllCategoriesQuery([]);

        const [form] = Form.useForm();

        const [deleteCategory] = useDeleteCategoryMutation();
        const handleDelete = async (id) => {
                try {
                        const res = await deleteCategory(id).unwrap();
                        if (res.success) {
                                toast.success(res.message);
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };
        const columns = [
                {
                        title: 'Category Name',
                        dataIndex: 'name',
                        key: 'name',
                },
                {
                        title: 'Description',
                        dataIndex: 'description',
                        key: 'description',

                        ellipsis: true,
                },
                {
                        title: 'Image',
                        dataIndex: 'image',
                        key: 'image',
                        render: (text) => (
                                <img
                                        className="object-cover w-10 h-10 rounded-full"
                                        src={getImageUrl(text)}
                                        alt="category image"
                                        height={50}
                                />
                        ),
                },

                {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                                <Space>
                                        <Popconfirm
                                                title="Are you sure you want to delete this category?"
                                                onConfirm={() => handleDelete(record._id)}
                                                okText="Yes"
                                                cancelText="No"
                                        >
                                                <Button
                                                        type="text"
                                                        icon={
                                                                <BsTrash3
                                                                        size={20}
                                                                        color="red"
                                                                        className="text-red-600"
                                                                />
                                                        }
                                                />
                                        </Popconfirm>
                                </Space>
                        ),
                },
        ];

        const showModal = () => {
                setIsModalOpen(true);
        };

        const handleCancel = () => {
                setIsModalOpen(false);
        };

        const normFile = (e) => {
                if (Array.isArray(e)) {
                        return e;
                }
                return e && e.fileList;
        };

        const onFinish = async (values) => {
                try {
                        const formData = new FormData();
                        formData.append('image', values.image[0].originFileObj);
                        formData.append('data', JSON.stringify(values));

                        const res = await addCategory(formData).unwrap();
                        if (res.success) {
                                toast.success('Category added successfully');
                                setIsModalOpen(false);
                                form.resetFields();
                        } else {
                                toast.error('Something went wrong');
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };
        return (
                <div>
                        <div className="flex justify-between items-center mb-3">
                                <h1 className="mb-6 text-2xl font-bold text-start">Manage Categories</h1>
                                <Button style={{ backgroundColor: '#00863D' }} type="primary" onClick={showModal}>
                                        <PlusOutlined /> Add Category
                                </Button>
                        </div>
                        <Table pagination={false} columns={columns} dataSource={categoryData?.data} />
                        <Modal footer={null} centered title="Add Category" open={isModalOpen} onCancel={handleCancel}>
                                <Form onFinish={onFinish} form={form} layout="vertical">
                                        <Form.Item
                                                name="name"
                                                label="Category Name"
                                                rules={[{ required: true, message: 'Please input category name!' }]}
                                        >
                                                <Input />
                                        </Form.Item>
                                        <Form.Item
                                                name="description"
                                                label="Description"
                                                rules={[
                                                        {
                                                                required: true,
                                                                message: 'Please input category description!',
                                                        },
                                                ]}
                                        >
                                                <Input />
                                        </Form.Item>
                                        <Form.Item
                                                name="image"
                                                label="Image"
                                                valuePropName="fileList"
                                                getValueFromEvent={normFile}
                                        >
                                                <Upload
                                                        multiple={false}
                                                        name="logo"
                                                        action="/upload.do"
                                                        listType="picture"
                                                        maxCount={1}
                                                >
                                                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                                                </Upload>
                                        </Form.Item>

                                        <Form.Item>
                                                <Button
                                                        style={{ backgroundColor: '#00863D' }}
                                                        type="primary"
                                                        htmlType="submit"
                                                >
                                                        Submit
                                                </Button>
                                        </Form.Item>
                                </Form>
                        </Modal>
                </div>
        );
};

export default Category;

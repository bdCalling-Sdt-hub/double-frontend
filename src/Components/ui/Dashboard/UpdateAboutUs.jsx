import { Button, Form, Input, Modal, Popconfirm, Space, Table, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

import toast from 'react-hot-toast';

import { useAddAboutMutation, useDeleteAboutMutation, useGetAboutQuery } from '../../../redux/features/aboutApi';
import getImageUrl from '../../../utils/getImageUrl';
import { MdDelete } from 'react-icons/md';

const UpdateAboutUs = () => {
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [addAbout] = useAddAboutMutation();
        const [deleteAbout] = useDeleteAboutMutation();
        const { data: aboutData } = useGetAboutQuery([]);

        const [form] = Form.useForm();

        const handleDelete = async (id) => {
                try {
                        const res = await deleteAbout(id).unwrap();
                        if (res.success) {
                                toast.success(res.message);
                        } else {
                                toast.error('Something went wrong');
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };
        const columns = [
                {
                        title: 'Title',
                        dataIndex: 'title',
                        key: 'title',
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
                                        alt="about image"
                                        height={50}
                                />
                        ),
                },
                {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                                <Space size="middle">
                                        <Popconfirm
                                                title="Are you sure to delete this about?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => {
                                                        handleDelete(record._id);
                                                }}
                                        >
                                                <Button danger icon={<MdDelete size={24} />} />
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

                        const res = await addAbout(formData).unwrap();
                        if (res.success) {
                                toast.success('About section added successfully');
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
                                <h1 className="mb-6 text-2xl font-bold text-start">Manage About Sections</h1>
                                <Button style={{ backgroundColor: '#00863D' }} type="primary" onClick={showModal}>
                                        <PlusOutlined /> Add About Section
                                </Button>
                        </div>
                        <Table pagination={false} columns={columns} dataSource={aboutData?.data} />
                        <Modal
                                footer={null}
                                centered
                                title="Add About Section"
                                open={isModalOpen}
                                onCancel={handleCancel}
                        >
                                <Form onFinish={onFinish} form={form} layout="vertical">
                                        <Form.Item
                                                name="title"
                                                label="Title"
                                                rules={[{ required: true, message: 'Please input the title!' }]}
                                        >
                                                <Input />
                                        </Form.Item>

                                        <Form.Item
                                                name="description"
                                                label="Description"
                                                rules={[{ required: true, message: 'Please input the description!' }]}
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

export default UpdateAboutUs;

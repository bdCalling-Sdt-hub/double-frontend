import { useState } from 'react';
import { Table, Button, Modal, Input, Form, Tooltip } from 'antd';
import { useGetContactQuery, useUpdateContactMutation } from '../../redux/features/contactApi';
import toast from 'react-hot-toast';

const SubscriberManagement = () => {
        const { data: subscribers } = useGetContactQuery();
        const [replyContact] = useUpdateContactMutation();
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [selectedSubscriber, setSelectedSubscriber] = useState(null);

        const handleReply = async (id, description) => {
                const values = {
                        id,
                        data: {
                                description,
                        },
                };
                try {
                        const res = await replyContact(values).unwrap();
                        if (res.success) {
                                toast.success(res.message);
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };
        const columns = [
                {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                },
                {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                },
                {
                        title: 'Phone',
                        dataIndex: 'phone',
                        key: 'phone',
                },
                {
                        title: 'Message',
                        dataIndex: 'message',
                        key: 'message',

                        render: (text) => (
                                <Tooltip title={text}>
                                        <p className="line-clamp-1">{text}</p>
                                </Tooltip>
                        ),
                },
                {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => (
                                <Button
                                        style={{
                                                backgroundColor: '#173616',
                                        }}
                                        type="primary"
                                        onClick={() => showReplyModal(record)}
                                >
                                        Reply
                                </Button>
                        ),
                },
        ];

        const showReplyModal = (subscriber) => {
                setSelectedSubscriber(subscriber);
                setIsModalVisible(true);
        };

        const handleCancel = () => {
                setIsModalVisible(false);
                setSelectedSubscriber(null);
        };

        return (
                <div className="p-8">
                        <h1 className="mb-4 text-2xl font-bold">Subscriber Management</h1>
                        <Table dataSource={subscribers} columns={columns} />
                        <Modal
                                title={`Reply to ${selectedSubscriber?.name}`}
                                visible={isModalVisible}
                                onCancel={handleCancel}
                                footer={null}
                        >
                                <Form onFinish={(values) => handleReply(selectedSubscriber._id, values.description)}>
                                        <Form.Item
                                                name="description"
                                                rules={[{ required: true, message: 'Please enter your message' }]}
                                        >
                                                <Input.TextArea rows={4} placeholder="Enter your message" />
                                        </Form.Item>
                                        <Form.Item>
                                                <Button
                                                        style={{ backgroundColor: '#173616' }}
                                                        type="primary"
                                                        htmlType="submit"
                                                >
                                                        Send Reply
                                                </Button>
                                        </Form.Item>
                                </Form>
                        </Modal>
                </div>
        );
};

export default SubscriberManagement;

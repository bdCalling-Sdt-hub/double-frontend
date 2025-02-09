import { Button, Collapse, Modal, Input, Form, Space } from 'antd';
import { useState } from 'react';
import logo from '../.././../assets/Frame 1000011842.png';
import {
        useAddFaqMutation,
        useDeleteFaqMutation,
        useGetFaqQuery,
        useUpdateFaqMutation,
} from '../../../redux/features/faqApi';
import toast from 'react-hot-toast';

const { TextArea } = Input;

const FaqManagement = () => {
        const [activePanel, setActivePanel] = useState(null);
        const { data: faqs } = useGetFaqQuery([]);
        const [addFaq] = useAddFaqMutation();
        const [updateFaq] = useUpdateFaqMutation();
        const [deleteFaq] = useDeleteFaqMutation();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [form] = Form.useForm();
        const [isEditing, setIsEditing] = useState(false); // Determine if editing
        const [currentFaq, setCurrentFaq] = useState(null); // Store current FAQ data for update

        const handlePanelChange = (key) => {
                setActivePanel(key ? Number(key) : null);
        };

        const handleAddFaq = async (values) => {
                if (isEditing) {
                        const updatedFaq = {
                                data: values,
                                id: currentFaq._id,
                        };
                        const res = await updateFaq(updatedFaq).unwrap();
                        if (res.success) {
                                toast.success(res.message);
                        }
                } else {
                        const res = await addFaq(values).unwrap();
                        if (res.success) {
                                toast.success(res.message);
                        }
                }

                setIsModalOpen(false);
                form.resetFields();
                setIsEditing(false);
                setCurrentFaq(null);
        };

        const handleEditFaq = (faq) => {
                setIsEditing(true);
                setCurrentFaq(faq);
                form.setFieldsValue({
                        question: faq.question,
                        answer: faq.answer,
                });
                setIsModalOpen(true);
        };

        const handleDeleteFaq = async (id) => {
                const res = await deleteFaq(id).unwrap();
                if (res.success) {
                        toast.success(res.message);
                }
        };

        return (
                <div className="p-8 mx-auto max-w-7xl md:p-20 md:px-40">
                        <h1 className="mb-10 text-2xl font-bold text-center md:text-4xl">
                                FAQ <span className="text-[#00863D]">Management</span>
                        </h1>

                        <Collapse
                                accordion
                                expandIconPosition="end"
                                bordered={false}
                                onChange={handlePanelChange}
                                className="space-y-3 bg-transparent"
                        >
                                {faqs?.map((item) => (
                                        <Collapse.Panel
                                                key={item.key}
                                                header={item.question}
                                                className={`rounded-2xl ${
                                                        activePanel === Number(item.key)
                                                                ? 'bg-[#ebfff4] border-t-8 border-[#033F1B]'
                                                                : 'bg-white'
                                                }`}
                                        >
                                                <div
                                                        className={`p-4 ${
                                                                activePanel === Number(item.key)
                                                                        ? 'text-black'
                                                                        : 'text-gray-600'
                                                        }`}
                                                >
                                                        {item.answer}
                                                        <div className="mt-10 border-t">
                                                                <Space className="mt-4">
                                                                        <Button
                                                                                className="text-white bg-blue-500"
                                                                                onClick={() => handleEditFaq(item)}
                                                                        >
                                                                                Edit
                                                                        </Button>
                                                                        <Button
                                                                                className="text-white bg-red-500"
                                                                                onClick={() =>
                                                                                        handleDeleteFaq(item._id)
                                                                                }
                                                                        >
                                                                                Delete
                                                                        </Button>
                                                                </Space>
                                                        </div>
                                                </div>
                                        </Collapse.Panel>
                                ))}
                        </Collapse>

                        <div className="my-2 w-full text-center md:my-5">
                                <Button
                                        className="bg-[#00863D] text-white py-6 md:py-5 border-[#00863D] font-semibold"
                                        onClick={() => setIsModalOpen(true)}
                                >
                                        Add FAQ
                                        <span>
                                                <img src={logo} alt="" />
                                        </span>
                                </Button>
                        </div>

                        <Modal
                                title={isEditing ? 'Edit FAQ' : 'Add New FAQ'}
                                visible={isModalOpen}
                                onCancel={() => {
                                        setIsModalOpen(false);
                                        setIsEditing(false);
                                        form.resetFields();
                                }}
                                footer={null}
                        >
                                <Form form={form} onFinish={handleAddFaq} layout="vertical">
                                        <Form.Item
                                                name="question"
                                                label="Question"
                                                rules={[{ required: true, message: 'Please enter a question' }]}
                                        >
                                                <Input placeholder="Enter FAQ question" />
                                        </Form.Item>
                                        <Form.Item
                                                name="answer"
                                                label="Answer"
                                                rules={[{ required: true, message: 'Please enter an answer' }]}
                                        >
                                                <TextArea rows={4} placeholder="Enter FAQ answer" />
                                        </Form.Item>
                                        <Form.Item>
                                                <Button
                                                        type="primary"
                                                        htmlType="submit"
                                                        className="bg-[#00863D] text-white border-[#00863D]"
                                                >
                                                        {isEditing ? 'Save Changes' : 'Add FAQ'}
                                                </Button>
                                        </Form.Item>
                                </Form>
                        </Modal>
                </div>
        );
};

export default FaqManagement;

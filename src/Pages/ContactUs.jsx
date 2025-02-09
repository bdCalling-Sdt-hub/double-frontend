import TitleBg from '../Components/ui/TitleBg';
import { MdEmail } from 'react-icons/md';

import { Button, Form, Input } from 'antd';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useAddContactMutation } from '../redux/features/contactApi';

const ContactUs = () => {
        const [form] = Form.useForm();
        const [addContact, { isLoading }] = useAddContactMutation();

        const onFinish = async (values) => {
                try {
                        const res = await addContact(values).unwrap();
                        if (res.success) {
                                toast.success(res.message);
                                form.resetFields();
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };

        return (
                <>
                        <Helmet>
                                <title>Contact Us - Doublet24</title>
                        </Helmet>
                        <TitleBg title="Contact Us" />
                        <div className="relative h-[1100px]">
                                <div className="absolute h-full inset-0 bg-gradient-to-t from-[#eaf7ea] -z-10"></div>
                                <div className="mx-auto mt-20 max-w-7xl min-h-screen">
                                        <div className="flex flex-col mx-5 md:w-[50%] md:mx-auto mb-10 p-5 rounded-2xl border gap-5 items-center justify-center shadow-xl border-t-8 border-t-[#004620]">
                                                <div className="p-5 bg-gray-100 rounded-full">
                                                        <MdEmail className="text-[#0caf55]" size={40} />
                                                </div>
                                                <h1 className="mt-3 text-2xl font-semibold">Email</h1>
                                                <p className="text-xl font-bold">cannasseursconsulting@gmail.com</p>
                                        </div>

                                        <div className="md:w-[50%] w-[80%] mx-auto shadow-lg">
                                                <div className="bg-[#033F1B] pb-10 md:pt-20 pt-5 md:px-16 px-7 rounded-2xl shadow-lg">
                                                        <div className="mb-6 space-y-3 text-center">
                                                                <h2 className="text-2xl text-[#FCD707] font-bold text-center">
                                                                        Get In Touch{' '}
                                                                        <span className="text-white">With Us</span>
                                                                </h2>
                                                                <p className="text-white">
                                                                        We’ll get back to you as soon as possible.
                                                                </p>
                                                        </div>
                                                        <Form
                                                                form={form}
                                                                layout="vertical"
                                                                onFinish={onFinish}
                                                                className="space-y-4"
                                                        >
                                                                {/* Full Name */}
                                                                <Form.Item
                                                                        name="name"
                                                                        label={
                                                                                <span className="text-white">
                                                                                        Business Name
                                                                                </span>
                                                                        }
                                                                        rules={[
                                                                                {
                                                                                        required: true,
                                                                                        message: 'Please enter your full name',
                                                                                },
                                                                        ]}
                                                                >
                                                                        <Input placeholder="Enter your full name" />
                                                                </Form.Item>

                                                                {/* Email */}
                                                                <Form.Item
                                                                        name="email"
                                                                        label={
                                                                                <span className="text-white">
                                                                                        Email
                                                                                </span>
                                                                        }
                                                                        rules={[
                                                                                {
                                                                                        required: true,
                                                                                        message: 'Please enter your email',
                                                                                },
                                                                        ]}
                                                                >
                                                                        <Input
                                                                                type="email"
                                                                                placeholder="Enter your email"
                                                                        />
                                                                </Form.Item>

                                                                {/* Phone Number */}
                                                                <Form.Item
                                                                        name="phone"
                                                                        label={
                                                                                <span className="text-white">
                                                                                        Phone Number
                                                                                </span>
                                                                        }
                                                                        rules={[
                                                                                {
                                                                                        required: true,
                                                                                        message: 'Please enter your phone number',
                                                                                },
                                                                        ]}
                                                                >
                                                                        <Input placeholder="Enter your phone number" />
                                                                </Form.Item>

                                                                {/* Message */}
                                                                <Form.Item
                                                                        name="message"
                                                                        label={
                                                                                <span className="text-white">
                                                                                        Message
                                                                                </span>
                                                                        }
                                                                        rules={[
                                                                                {
                                                                                        required: true,
                                                                                        message: 'Please enter your message',
                                                                                },
                                                                        ]}
                                                                >
                                                                        <Input.TextArea
                                                                                rows={4}
                                                                                placeholder="Enter your message"
                                                                        />
                                                                </Form.Item>

                                                                {/* Submit Button */}
                                                                <Form.Item>
                                                                        <Button
                                                                                type="primary"
                                                                                htmlType="submit"
                                                                                className="w-full bg-[#0c9b45] font-semibold text-white py-5"
                                                                        >
                                                                                {isLoading
                                                                                        ? 'Sending...'
                                                                                        : 'Send Message'}
                                                                        </Button>
                                                                </Form.Item>
                                                        </Form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </>
        );
};

export default ContactUs;

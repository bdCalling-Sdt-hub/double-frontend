import { Divider, Form, Input, Button } from 'antd';

import { MdOutlineEmail } from 'react-icons/md';

import leftBgImg from '../../assets/line-left-04.png.png';
import rightBgImg from '../../assets/earth-round.png.png';
import toast from 'react-hot-toast';
import { useAddContactMutation } from '../../redux/features/contactApi';

const ContactUsSection = () => {
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
                <div className="relative  bg-[#033F1B] py-10">
                        <div className="md:h-[600px] max-w-7xl mx-auto md:flex">
                                <div className="pt-10 md:w-6/12 md:pt-28 md:ps-28 ps-10 md:pe-10">
                                        <div className="text-2xl text-white clash md:text-4xl">
                                                <h1>
                                                        For <span className="text-[#FCD707]">Wholesale Inquiries,</span>
                                                </h1>
                                                <h1>Contact Us Today!</h1>
                                        </div>
                                        <Divider type="horizontal" className="w-[20%] bg-gray-600 mx-auto" />

                                        <p className="text-sm text-white">
                                                Looking to stock premium THCA flower for your business? Get in touch
                                                with us for unbeatable wholesale prices and quality products.
                                        </p>

                                        <div className="space-y-8 mt-10 ms-5 md:ms:0 w-[80%]">
                                                <div className="relative">
                                                        <div className="p-5 px-8 bg-white rounded-lg ps-12">
                                                                <h3 className="text-[#00863D]">Email</h3>
                                                                <p className="font-semibold">
                                                                        cannasseursconsulting@gmail.com
                                                                </p>
                                                        </div>
                                                        <div className="absolute top-5 -left-6 p-4 w-12 bg-yellow-400 rounded-lg">
                                                                <MdOutlineEmail />
                                                        </div>
                                                </div>
                                        </div>
                                </div>

                                <div className="flex justify-center items-center pb-10 mt-10 md:w-6/12 md:pb-0 md:mt-0 md:justify-start">
                                        <div className="bg-[#005125] md:pb-0 pb-5 h-full md:pt-10 pt-5 md:px-16 px-7 rounded-lg shadow-lg w-[80%] z-10">
                                                <div className="mb-6 space-y-3 text-center">
                                                        <h2 className="text-2xl text-[#FCD707] font-bold text-center">
                                                                Send Us Message
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
                                                                label={<span className="text-white">Full Name</span>}
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
                                                                label={<span className="text-white">Email</span>}
                                                                rules={[
                                                                        {
                                                                                required: true,
                                                                                message: 'Please enter your email',
                                                                        },
                                                                ]}
                                                        >
                                                                <Input type="email" placeholder="Enter your email" />
                                                        </Form.Item>

                                                        {/* Phone Number */}
                                                        <Form.Item
                                                                name="phone"
                                                                label={<span className="text-white">Phone Number</span>}
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
                                                                label={<span className="text-white">Message</span>}
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
                                                                        className="w-full bg-[#FCD707] font-bold text-lg py-5 text-black"
                                                                >
                                                                        {isLoading
                                                                                ? 'Submitting...'
                                                                                : 'Submit Your Message'}
                                                                </Button>
                                                        </Form.Item>
                                                </Form>
                                        </div>
                                </div>
                        </div>
                        <div className="absolute top-0">
                                <img src={leftBgImg} alt="" />
                        </div>
                        <div className="absolute top-0 right-5">
                                <img src={rightBgImg} alt="" />
                        </div>
                </div>
        );
};

export default ContactUsSection;

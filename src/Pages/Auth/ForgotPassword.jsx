import { Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../redux/features/authApi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
        const navigate = useNavigate();
        const [forgotPassword] = useForgotPasswordMutation();

        const onFinish = async (values) => {
                try {
                        const response = await forgotPassword(values).unwrap();
                        if (response?.success) {
                                toast.success('An OTP has been sent to your email!');
                                localStorage.setItem('email', values?.email);
                                navigate(`/auth/verify-otp`);
                        }
                } catch (error) {
                        toast.error(error?.data?.message);
                        console.log(error);
                }
        };

        return (
                <div>
                        <div className="mb-8 text-center">
                                <h1 className="text-[25px] font-semibold mb-6">Forgot Password</h1>
                                <p className="w-[90%] mx-auto text-base">
                                        Enter your email below to reset your password
                                </p>
                        </div>

                        <Form layout="vertical" onFinish={onFinish}>
                                <Form.Item
                                        label={<p>Email</p>}
                                        name="email"
                                        id="email"
                                        rules={[
                                                {
                                                        required: true,
                                                        message: 'Please input your email!',
                                                },
                                        ]}
                                >
                                        <Input
                                                placeholder="Enter your email address"
                                                style={{
                                                        height: 40,
                                                        border: '1px solid #d9d9d9',
                                                        outline: 'none',
                                                        boxShadow: 'none',
                                                }}
                                        />
                                </Form.Item>

                                <Form.Item>
                                        <button
                                                type="submit"
                                                style={{
                                                        width: '100%',
                                                        height: 45,
                                                        fontWeight: '400px',
                                                        fontSize: '18px',
                                                        marginTop: 20,
                                                }}
                                                className="flex items-center justify-center bg-[#173616] text-white rounded-lg"
                                        >
                                                Send OTP
                                        </button>
                                </Form.Item>
                        </Form>
                </div>
        );
};

export default ForgotPassword;

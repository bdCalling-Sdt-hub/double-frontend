import { Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FormItem from '../../Components/common/FormItem';
import { useLoginMutation } from '../../redux/features/authApi';

const Login = () => {
        const navigate = useNavigate();
        const [login, { isLoading }] = useLoginMutation();

        const onFinish = async (values) => {
                try {
                        console.log(values);
                        const response = await login(values).unwrap();

                        if (response?.success) {
                                localStorage.setItem('authToken', response?.data?.accessToken);
                                toast.success('Login successful!');
                                navigate('/dashboard');
                        }
                } catch (error) {
                        toast.error(error.data.message || 'An error occurred');
                        console.log(error);
                }
        };

        return (
                <div>
                        <div className="mb-8 text-center">
                                <h1 className="mb-6 text-3xl font-semibold">Login</h1>
                                <p>Please enter your email and password to continue</p>
                        </div>
                        <Form
                                onFinish={onFinish}
                                layout="vertical"
                                initialValues={{
                                        remember: false, // Default state for the checkbox
                                }}
                        >
                                {/* Email Field */}
                                <FormItem
                                        name="email"
                                        label="Email"
                                        rules={[
                                                { required: true, message: 'Please input your email!' },
                                                { type: 'email', message: 'Please enter a valid email!' },
                                        ]}
                                />

                                {/* Password Field */}
                                <Form.Item
                                        name="password"
                                        label={<p>Password</p>}
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                        <Input.Password
                                                placeholder="Enter your password"
                                                style={{
                                                        height: 40,
                                                        border: '1px solid #d9d9d9',
                                                        outline: 'none',
                                                        boxShadow: 'none',
                                                }}
                                        />
                                </Form.Item>

                                {/* Remember Me and Forgot Password */}
                                <Form.Item style={{ marginBottom: 0 }}>
                                        <div className="flex justify-between items-center">
                                                {/* Remember Me Checkbox */}
                                                <Checkbox className="text-sm">Remember Me</Checkbox>

                                                {/* Forgot Password Link */}
                                                <a
                                                        href="/auth/forgot-password"
                                                        className="text-sm text-blue-500 hover:text-blue-700"
                                                >
                                                        Forgot Password?
                                                </a>
                                        </div>
                                </Form.Item>

                                {/* Submit Button */}
                                <Form.Item style={{ marginBottom: 0 }}>
                                        <button
                                                type="submit"
                                                style={{
                                                        width: '100%',
                                                        height: 45,
                                                        fontWeight: 400,
                                                        fontSize: 18,
                                                        marginTop: 20,
                                                }}
                                                className={`flex items-center justify-center bg-[#173616] text-white rounded-lg`}
                                        >
                                                {isLoading ? 'Loading...' : ' Sign in'}
                                        </button>
                                </Form.Item>
                        </Form>
                </div>
        );
};

export default Login;

import { Button, Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../redux/features/authApi';
import toast from 'react-hot-toast';

const ResetPassword = () => {
        const navigate = useNavigate();
        const [resetPassword] = useResetPasswordMutation();

        const onFinish = async (values) => {
                const resetPasswordPayload = {
                        ...values,
                        token: localStorage.getItem('oneTimeToken'),
                };
                try {
                        const response = await resetPassword(resetPasswordPayload).unwrap();
                        if (response?.success) {
                                toast.success(response?.message || 'Password reset successful!');
                                navigate(`/auth/login`);
                                localStorage.removeItem('oneTimeToken');
                                localStorage.removeItem('email');
                        }
                } catch (error) {
                        toast.error(error?.data?.message);
                        console.log(error);
                }
        };

        return (
                <div>
                        <div className="mb-12 text-center">
                                <h1 className="text-[25px] font-semibold mb-6">Reset Password</h1>
                                <p className="w-[80%] mx-auto">
                                        Please enter your new password to reset your account credentials.
                                </p>
                        </div>

                        <Form layout="vertical" onFinish={onFinish}>
                                {/* New Password */}
                                <Form.Item
                                        name="newPassword"
                                        label={<p className="font-semibold text-[#5C5C5C]">New Password</p>}
                                        rules={[
                                                { required: true, message: 'Please input your new password!' },
                                                { min: 6, message: 'Password must be at least 6 characters!' },
                                        ]}
                                        style={{ marginBottom: 0 }}
                                >
                                        <Input.Password
                                                placeholder="Enter new password"
                                                style={{
                                                        border: '1px solid #E0E4EC',
                                                        height: '52px',
                                                        background: 'white',
                                                        borderRadius: '8px',
                                                        outline: 'none',
                                                }}
                                                className="mb-6"
                                        />
                                </Form.Item>

                                {/* Confirm Password */}
                                <Form.Item
                                        name="confirmPassword"
                                        label={<p className="font-semibold text-[#5C5C5C]">Confirm Password</p>}
                                        dependencies={['newPassword']}
                                        hasFeedback
                                        rules={[
                                                { required: true, message: 'Please confirm your password!' },
                                                ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                                if (!value || getFieldValue('newPassword') === value) {
                                                                        return Promise.resolve();
                                                                }
                                                                return Promise.reject(
                                                                        new Error(
                                                                                'The new password that you entered do not match!',
                                                                        ),
                                                                );
                                                        },
                                                }),
                                        ]}
                                >
                                        <Input.Password
                                                placeholder="Confirm new password"
                                                style={{
                                                        border: '1px solid #E0E4EC',
                                                        height: '52px',
                                                        background: 'white',
                                                        borderRadius: '8px',
                                                        outline: 'none',
                                                }}
                                                className="mb-6"
                                        />
                                </Form.Item>

                                {/* Submit Button */}
                                <Form.Item style={{ marginBottom: 0 }}>
                                        <Button
                                                htmlType="submit"
                                                style={{
                                                        width: '100%',
                                                        height: 45,
                                                        fontWeight: '400px',
                                                        fontSize: '18px',
                                                        background: '#173616',
                                                        marginTop: 20,
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                }}
                                        >
                                                Update
                                        </Button>
                                </Form.Item>
                        </Form>
                </div>
        );
};

export default ResetPassword;

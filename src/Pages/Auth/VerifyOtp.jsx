import { Button, Form } from 'antd';
import { useState } from 'react';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { useVerifyOtpMutation } from '../../redux/features/authApi';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
        const navigate = useNavigate();

        const [otp, setOtp] = useState();
        const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

        const onFinish = async () => {
                if (!otp || otp.length !== 4) {
                        toast.error('Please enter 4 digits 3424 OTP');
                        return;
                }
                const values = {
                        email: localStorage.getItem('email'),
                        oneTimeCode: Number(otp),
                };

                try {
                        const response = await verifyOtp(values).unwrap();
                        if (response?.success) {
                                toast.success('Please set a new password');
                                localStorage.removeItem('email');
                                localStorage.setItem('oneTimeToken', response?.data);
                                navigate(`/auth/reset-password`);
                        }
                } catch (error) {
                        toast.error(error?.data?.message);
                        console.log(error);
                }
        };

        return (
                <div>
                        <div className="mb-6 text-center">
                                <h1 className="text-[25px] font-semibold mb-6">Verify OTP</h1>
                                <p className="w-[80%] mx-auto">
                                        We&apos;ve sent a verification code to your email. Please check your inbox and
                                        enter the code here.
                                </p>
                        </div>

                        <Form layout="vertical" onFinish={onFinish}>
                                <div className="flex justify-center items-center mb-6">
                                        <OTPInput
                                                value={otp}
                                                onChange={(otp) => setOtp(otp)}
                                                numInputs={4}
                                                inputStyle={{
                                                        height: 50,
                                                        width: 50,
                                                        borderRadius: '8px',
                                                        margin: '16px',
                                                        fontSize: '20px',
                                                        border: '1px solid #173616',
                                                        color: '#2B2A2A',
                                                        outline: 'none',
                                                        marginBottom: 10,
                                                }}
                                                renderInput={(props) => <input {...props} />}
                                        />
                                </div>

                                <Form.Item style={{ marginBottom: 0 }}>
                                        <Button
                                                htmlType="submit"
                                                style={{
                                                        width: '100%',
                                                        height: 40,
                                                        border: '1px solid #d9d9d9',
                                                        outline: 'none',
                                                        boxShadow: 'none',
                                                        background: '#173616',
                                                        color: 'white',
                                                }}
                                        >
                                                {isLoading ? 'Verifying...' : 'Verify'}
                                        </Button>
                                </Form.Item>
                        </Form>
                </div>
        );
};

export default VerifyOtp;

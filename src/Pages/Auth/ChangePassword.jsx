import { Button, Form, Input } from 'antd';
import { useChangePasswordMutation } from '../../redux/features/authApi';
import toast from 'react-hot-toast';

const ChangePassword = () => {
        const [form] = Form.useForm();

        const [changePassword] = useChangePasswordMutation();

        const onFinish = async (values) => {
                try {
                        const response = await changePassword(values).unwrap();
                        if (response?.success) {
                                toast.success(response?.message || 'Password changed successfully!');
                        }
                } catch (error) {
                        toast.error(error?.data?.message);
                        console.log(error);
                }
        };

        return (
                <div className="bg-white p-5 rounded-2xl w-[50%] mx-auto h-[500px]">
                        <Form
                                layout="vertical"
                                form={form} // Connect the form instance
                                onFinish={onFinish}
                                className="mx-auto w-full"
                        >
                                <Form.Item
                                        name="currentPassword"
                                        label={<p>Current Password</p>}
                                        rules={[
                                                {
                                                        required: true,
                                                        message: 'Please Enter Current Password!',
                                                },
                                        ]}
                                >
                                        <Input.Password
                                                style={{ background: 'transparent' }}
                                                placeholder="Enter current password"
                                                className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
                                        />
                                </Form.Item>

                                <Form.Item
                                        name="newPassword"
                                        rules={[
                                                {
                                                        required: true,
                                                        message: 'Please Enter New Password!',
                                                },
                                        ]}
                                        label={<p>New Password</p>}
                                >
                                        <Input.Password
                                                style={{ background: 'transparent' }}
                                                placeholder="Enter new password"
                                                className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
                                        />
                                </Form.Item>

                                <Form.Item
                                        label={<p>Confirm Password</p>}
                                        name="confirmPassword"
                                        rules={[
                                                {
                                                        required: true,
                                                        message: 'Please Enter Confirm Password!',
                                                },
                                        ]}
                                >
                                        <Input.Password
                                                style={{ background: 'transparent' }}
                                                placeholder="Enter confirm password"
                                                className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500"
                                        />
                                </Form.Item>

                                <Form.Item
                                        style={{
                                                marginBottom: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                        }}
                                >
                                        <Button
                                                htmlType="submit"
                                                block
                                                style={{
                                                        width: 178,
                                                        height: 48,
                                                        fontWeight: '400px',
                                                        background: '#173616',
                                                        color: 'white',
                                                }}
                                                className="w-full text-sm leading-4 roboto-medium"
                                        >
                                                Submit
                                        </Button>
                                </Form.Item>
                        </Form>
                </div>
        );
};

export default ChangePassword;

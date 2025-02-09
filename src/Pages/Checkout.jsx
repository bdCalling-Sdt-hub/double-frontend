import { Form, Input, Button, Card, Modal } from 'antd';
import { useState } from 'react';
import TitleBg from '../Components/ui/TitleBg';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import getImageUrl from '../utils/getImageUrl';
import { useCreateOrderMutation } from '../redux/features/orderApi';
import toast from 'react-hot-toast';
import { clearCart } from '../redux/features/cart/cartSlice';

const Checkout = () => {
        const [isModalVisible, setIsModalVisible] = useState(false);

        const { items: cartItems, total, subtotal } = useSelector((state) => state.cart);
        const [createOrder, { isLoading }] = useCreateOrderMutation();
        const dispatch = useDispatch();

        const onFinish = async (values) => {
                const orderDataFormat = {
                        fullName: values.fullName,
                        email: values.email,
                        phone: values.phone,
                        country: values.country,
                        state: values.state,
                        address: values.address,
                        cartItems: cartItems.map((item) => ({
                                productId: item._id,
                                weight: Number(item.weight),
                                quantity: Number(item.quantity),
                                price: Number(item.price),
                        })),
                };
                try {
                        const res = await createOrder(orderDataFormat).unwrap();
                        if (res.success) {
                                setIsModalVisible(true);
                                dispatch(clearCart());
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };

        const handleOk = () => {
                setIsModalVisible(false);
        };

        return (
                <div className="bg-white">
                        <Helmet>
                                <title>Checkout - Doublet24</title>
                        </Helmet>
                        <TitleBg title="CHECKOUT" />
                        <div>
                                <div className="p-10 mx-auto max-w-7xl">
                                        <Form layout="vertical" className="gap-5 w-full md:flex" onFinish={onFinish}>
                                                <div className="md:w-[70%] md:p-10">
                                                        <h2 className="mb-4 text-lg">Billing Information</h2>
                                                        <Form.Item
                                                                label="Business Name"
                                                                name="fullName"
                                                                rules={[{ required: true }]}
                                                        >
                                                                <Input className="py-2" placeholder="Business Name" />
                                                        </Form.Item>
                                                        <div className="flex gap-5 w-full">
                                                                <Form.Item
                                                                        label="Country"
                                                                        name="country"
                                                                        rules={[{ required: true }]}
                                                                        className="w-1/2"
                                                                >
                                                                        <Input className="py-2" placeholder="Country" />
                                                                </Form.Item>
                                                                <Form.Item
                                                                        label="State/Province"
                                                                        name="state"
                                                                        rules={[{ required: true }]}
                                                                        className="w-1/2"
                                                                >
                                                                        <Input
                                                                                className="py-2"
                                                                                placeholder="State/Province"
                                                                        />
                                                                </Form.Item>
                                                        </div>
                                                        <Form.Item
                                                                label="Street Address"
                                                                name="address"
                                                                rules={[{ required: true }]}
                                                        >
                                                                <Input className="py-2" placeholder="Street Address" />
                                                        </Form.Item>
                                                        <Form.Item
                                                                label="Email"
                                                                name="email"
                                                                rules={[{ required: true, type: 'email' }]}
                                                        >
                                                                <Input className="py-2" placeholder="Email" />
                                                        </Form.Item>
                                                        <Form.Item
                                                                label="Phone"
                                                                name="phone"
                                                                rules={[{ required: true }]}
                                                        >
                                                                <Input className="py-2" placeholder="Phone" />
                                                        </Form.Item>
                                                        <h1 className="mb-2 text-2xl font-bold">Additional Info</h1>
                                                        <Form.Item label="Order Notes (Optional)" name="orderNotes">
                                                                <Input.TextArea placeholder="Order Notes (Optional)" />
                                                        </Form.Item>
                                                </div>

                                                <div className="md:w-[30%] border border-t-8 border-t-[#005125] rounded-2xl p-1">
                                                        <h2 className="px-8 mt-8 text-xl font-bold">Order Summary</h2>
                                                        {cartItems.length === 0 ? (
                                                                <p className="py-8 text-center">
                                                                        Your cart is empty. Please add some products to
                                                                        checkout.
                                                                </p>
                                                        ) : (
                                                                <Card className="w-full border-none">
                                                                        <ul>
                                                                                {cartItems.map((item) => (
                                                                                        <li
                                                                                                key={item._id}
                                                                                                className="flex justify-between items-center py-2"
                                                                                        >
                                                                                                <img
                                                                                                        src={getImageUrl(
                                                                                                                item.image,
                                                                                                        )}
                                                                                                        alt={item.name}
                                                                                                        className="object-cover w-16 h-16"
                                                                                                />
                                                                                                <span className="ml-4">
                                                                                                        {item.name}
                                                                                                </span>
                                                                                                <span className="ml-4">
                                                                                                        $
                                                                                                        {item.price.toFixed(
                                                                                                                2,
                                                                                                        )}
                                                                                                </span>
                                                                                        </li>
                                                                                ))}
                                                                                <li className="flex justify-between items-center py-3 font-bold border-t">
                                                                                        <span>Subtotal:</span>
                                                                                        <span>
                                                                                                ${subtotal.toFixed(2)}
                                                                                        </span>
                                                                                </li>
                                                                                <li className="flex justify-between items-center py-3 font-bold border-t">
                                                                                        <span>Shipping:</span>
                                                                                        <span>Free</span>
                                                                                </li>
                                                                                <li className="flex justify-between items-center py-3 font-bold border-t">
                                                                                        <span>Total:</span>
                                                                                        <span>${total.toFixed(2)}</span>
                                                                                </li>
                                                                        </ul>
                                                                </Card>
                                                        )}

                                                        {cartItems.length === 0 ? (
                                                                <Link to="/">
                                                                        <Button className=" w-full bg-[#005125] text-white mb-2 py-4 rounded-3xl">
                                                                                Go back to home
                                                                        </Button>
                                                                </Link>
                                                        ) : (
                                                                <Button
                                                                        htmlType="submit"
                                                                        className=" w-full bg-[#005125] text-white mb-2 py-4 rounded-3xl"
                                                                >
                                                                        {isLoading ? 'Processing...' : 'Place Order'}
                                                                </Button>
                                                        )}
                                                </div>
                                        </Form>
                                </div>
                        </div>

                        {/* Custom Confirmation Modal */}
                        <Modal
                                title="Payment Complete"
                                open={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleOk}
                                footer={[
                                        <Link key="home" to={'/'}>
                                                <Button
                                                        key="home"
                                                        className=" bg-[#005125] text-white  mx-auto rounded-3xl py-2"
                                                        onClick={handleOk}
                                                >
                                                        Go to Home
                                                </Button>
                                        </Link>,
                                ]}
                                className="border-t-8 border-t-[#005125] rounded-2xl"
                        >
                                <div className="flex flex-col justify-center items-center py-20 text-center">
                                        <FaCheckCircle className="text-[#005125]" size={80} />
                                        <p className="my-2 text-lg font-bold text-[#005125]">
                                                Thank you for your order! Your payment is complete.
                                        </p>
                                        <p className="text-gray-500">
                                                We’ll notify you as soon as your order is on its way. If you have any
                                                questions or need assistance, feel free to contact our support team.
                                        </p>
                                </div>
                        </Modal>
                </div>
        );
};

export default Checkout;

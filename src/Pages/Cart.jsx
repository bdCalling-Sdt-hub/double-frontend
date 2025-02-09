import { Table } from 'antd';

import TitleBg from '../Components/ui/TitleBg';

import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import getImageUrl from '../utils/getImageUrl';
import { quantityDecrement, quantityIncrement, removeFromCart } from '../redux/features/cart/cartSlice';

const Cart = () => {
        const { items: cartItems, total, subtotal } = useSelector((state) => state.cart);

        const dispatch = useDispatch();

        const handleIncrement = (key) => {
                dispatch(quantityIncrement(key));
        };

        const handleDecrement = (key) => {
                dispatch(quantityDecrement(key));
        };

        const handleDelete = (key) => {
                dispatch(removeFromCart(key));
        };

        const columns = [
                {
                        title: 'Product',
                        dataIndex: 'product',
                        key: 'product',
                        render: (product, record) => (
                                <div className="flex gap-4 items-center">
                                        <img
                                                src={getImageUrl(record.image)}
                                                alt={record.name}
                                                className="object-cover w-16 h-16"
                                        />
                                        <span>{record.name}</span>
                                </div>
                        ),
                },
                {
                        title: 'Price',
                        dataIndex: 'price',
                        key: 'price',
                        render: (price) => `$${price.toFixed(2)}`,
                },
                {
                        title: 'Quantity',
                        dataIndex: 'quantity',
                        key: 'quantity',
                        render: (quantity, record) => (
                                <div className="flex gap-4 items-center mt-3">
                                        <div className="flex gap-3 items-center p-2 font-semibold rounded-2xl border border-gray-300">
                                                <button
                                                        onClick={() => handleDecrement(record._id)}
                                                        className="px-3 py-1 bg-gray-200 rounded-2xl border"
                                                >
                                                        -
                                                </button>
                                                <span className="text-xl">{quantity}</span>
                                                <button
                                                        onClick={() => handleIncrement(record._id)}
                                                        className="px-3 py-1 bg-gray-200 rounded-2xl border"
                                                >
                                                        +
                                                </button>
                                        </div>
                                </div>
                        ),
                },
                {
                        title: 'Subtotal',
                        dataIndex: 'subtotal',
                        key: 'subtotal',
                        render: (subtotal) => <p>${subtotal}</p>,
                },
                {
                        title: 'Action',
                        key: 'action',
                        render: (_, record) => (
                                <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete(record._id)}
                                >
                                        X
                                </button>
                        ),
                },
        ];

        return (
                <div>
                        <Helmet>
                                <title>Cart - Doublet24</title>
                        </Helmet>
                        <TitleBg title="CART" />
                        <div className="gap-10 p-5 mx-auto w-full max-w-7xl md:p-20 md:flex">
                                <div className="md:w-[70%]">
                                        <Table
                                                className="border-t-8 border-t-[#173616] rounded-2xl"
                                                dataSource={cartItems}
                                                columns={columns}
                                                pagination={false}
                                                scroll={{ x: 700 }}
                                        />
                                </div>
                                <div className="md:w-[30%] border-t-8 mt-10 md:mt-0 border-t-[#173616] bg-white rounded-2xl">
                                        <div className="p-6">
                                                {cartItems.length > 0 ? (
                                                        <>
                                                                <h1 className="pb-3 mb-4 text-2xl font-bold border-b-2">
                                                                        Cart Total
                                                                </h1>

                                                                <div className="flex justify-between pb-3 mb-2 text-lg border-b-2">
                                                                        <span>Subtotal:</span>
                                                                        <span className="font-semibold">
                                                                                ${subtotal.toFixed(2)}
                                                                        </span>
                                                                </div>
                                                                <div className="flex justify-between pb-3 mb-2 text-lg border-b-2">
                                                                        <span>Shipping:</span>
                                                                        <span className="font-semibold">Free</span>
                                                                </div>
                                                                <div className="flex justify-between pb-3 mb-2 text-lg">
                                                                        <span>Total:</span>
                                                                        <span className="font-semibold">
                                                                                ${total.toFixed(2)}
                                                                        </span>
                                                                </div>

                                                                <Link to={'/checkout'}>
                                                                        <button className="w-full mt-4 bg-[#173616] text-white py-3 rounded-2xl hover:bg-[#145014]">
                                                                                Proceed to Checkout
                                                                        </button>
                                                                </Link>
                                                        </>
                                                ) : (
                                                        <div className="flex justify-center items-center h-full">
                                                                <div className="text-center">
                                                                        {/* <img src={emptyCart} alt="" className="mx-auto" /> */}
                                                                        <h1 className="text-2xl font-bold">
                                                                                Your Cart is Empty
                                                                        </h1>
                                                                        <p className="text-lg text-gray-500">
                                                                                Please add some items to your cart
                                                                                first.
                                                                        </p>
                                                                        <Link to={'/'}>
                                                                                <button className="mt-4 bg-[#173616] text-white py-3 px-5 rounded-2xl hover:bg-[#145014]">
                                                                                        Go Shopping
                                                                                </button>
                                                                        </Link>
                                                                </div>
                                                        </div>
                                                )}
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

export default Cart;

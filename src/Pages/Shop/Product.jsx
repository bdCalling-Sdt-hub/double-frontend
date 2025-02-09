import TitleBg from '../../Components/ui/TitleBg';
import { useEffect, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import ProductCard from '../../Components/ui/ProductCard';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { useGetAllProductsQuery, useGetProductByIdQuery } from '../../redux/features/productApi';
import getImageUrl from '../../utils/getImageUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { Button, Form, Input, Modal } from 'antd';
import { useCreateOrderMutation } from '../../redux/features/orderApi';

const Product = () => {
        const params = useParams();
        const dispatch = useDispatch();
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [createOrder, { isLoading }] = useCreateOrderMutation();
        const { data: product } = useGetProductByIdQuery(params.id);
        const { data: relatedProducts } = useGetAllProductsQuery(
                [{ name: 'category', value: product?.category?._id }],
                { skip: !product },
        );

        const [mainImage, setMainImage] = useState('');

        useEffect(() => {
                if (product) {
                        setMainImage(getImageUrl(product.image[0]));
                }
        }, [product]);
        const [selectedWeight, setSelectedWeight] = useState('1');

        const handleAddToCart = () => {
                const cartProduct = {
                        _id: product._id,
                        name: product.name,
                        weight: selectedWeight,
                        price: product.price,
                        image: product.image[0],
                };
                dispatch(addToCart(cartProduct));
                toast.success('This product added to cart!');
                console.log(cartProduct);
        };

        const handleDirectOrder = async (values) => {
                const orderProduct = {
                        fullName: values.fullName,
                        email: values.email,
                        phone: values.phone,
                        country: values.country,
                        state: values.state,
                        address: values.address,
                        productId: product._id,
                        weight: Number(selectedWeight),
                        quantity: 1,
                        price: product.price,
                };
                console.log(orderProduct);
                try {
                        const res = await createOrder(orderProduct).unwrap();
                        if (res.success) {
                                toast.success('Order placed successfully!');
                                setIsModalOpen(false);
                        }
                } catch (error) {
                        toast.error(error?.data?.message || 'Something went wrong');
                }
        };

        return (
                <>
                        <TitleBg title={product?.name} />
                        <div className="p-8 mx-auto max-w-7xl md:p-28 font-fontTwo">
                                <div className="gap-5 justify-center items-center md:flex">
                                        <div className="md:w-[45%] flex flex-col items-center">
                                                {/* Main Image */}
                                                <div className="mb-5 w-full">
                                                        <img
                                                                className="md:w-[600px] w-[350px] h-[300px] md:h-[440px]"
                                                                src={mainImage}
                                                                alt="Main Image"
                                                        />
                                                </div>

                                                {/* Thumbnail Images */}
                                                <div className="grid grid-cols-4 gap-2">
                                                        {product?.image?.map((image, index) => (
                                                                <img
                                                                        key={index}
                                                                        src={getImageUrl(image)}
                                                                        alt={`Thumbnail ${index + 1}`}
                                                                        className="w-20 h-20 transition-transform transform cursor-pointer md:h-28 md:w-28 hover:scale-110"
                                                                        onClick={() => setMainImage(getImageUrl(image))}
                                                                />
                                                        ))}
                                                </div>
                                        </div>
                                        <div className="md:space-y-4 md:w-[55%] mt-7 md:mt-0">
                                                <h1 className="text-2xl md:text-3xl clash">{product?.name}</h1>
                                                <div className="flex gap-2">
                                                        {/* <div className="flex gap-1">
                                                                <FaStar className="text-orange-600" />
                                                                <FaStar className="text-orange-600" />
                                                                <FaStar className="text-orange-600" />
                                                                <FaStar className="text-orange-600" />
                                                                <FaStar className="text-orange-600" />
                                                        </div>
                                                        <p>{productData?.reviews.length} Reviews</p> */}
                                                </div>
                                                <div className="flex gap-3 text-3xl font-bold text-[#00863D]">
                                                        <p>${product?.price}</p>
                                                </div>
                                                <p className="leading-5">{product?.description}</p>
                                                <div className="flex gap-10 items-center mt-10 md:mt-0">
                                                        <h1 className="text-2xl font-bold">Weight</h1>
                                                        {/* Dropdown for weight selection */}
                                                        <select
                                                                value={selectedWeight}
                                                                onChange={(e) => setSelectedWeight(e.target.value)}
                                                                className="border rounded-xl px-4 py-3 w-[40%] bg-gray-200"
                                                        >
                                                                <option value="1">1 Unit</option>
                                                                <option value="2">2 Unit</option>
                                                                <option value="3">3 Unit</option>
                                                                <option value="4">4 Unit</option>
                                                                <option value="5">5 Unit</option>
                                                        </select>
                                                </div>

                                                {/* Quantity and Price */}
                                                {/* <div className="flex gap-4 items-center mt-3">
                                                        <div className="flex gap-3 items-center p-2 font-semibold rounded-2xl border border-gray-300">
                                                                <button
                                                                        onClick={() =>
                                                                                setQuantity((prev) =>
                                                                                        prev > 1 ? prev - 1 : 1,
                                                                                )
                                                                        }
                                                                        className="px-3 py-1 bg-gray-200 rounded-2xl border"
                                                                >
                                                                        -
                                                                </button>
                                                                <span className="text-xl">{quantity}</span>
                                                                <button
                                                                        onClick={() => setQuantity((prev) => prev + 1)}
                                                                        className="px-3 py-1 bg-gray-200 rounded-2xl border"
                                                                >
                                                                        +
                                                                </button>
                                                        </div>
                                                        <p className="text-xl font-bold text-[#005125]">
                                                                ${totalPrice.toFixed(2)}
                                                        </p>
                                                </div> */}

                                                {/* Add to Cart Button */}
                                                <div className="flex gap-4 mb-5 font-bold md:text-xl md:mb-0">
                                                        <button
                                                                onClick={() => handleAddToCart()}
                                                                className="mt-4 w-40  text-[#005125] px-5 py-3 rounded-xl border border-[#005125] hover:bg-[#006F2C] hover:text-white"
                                                        >
                                                                Add to Cart
                                                        </button>

                                                        <button
                                                                onClick={() => setIsModalOpen(true)}
                                                                className="mt-4 w-40 bg-[#005125] text-white px-5 py-3 rounded-xl hover:bg-[#006F2C]"
                                                        >
                                                                Order Now
                                                        </button>
                                                </div>
                                                <h1 className="flex gap-2 items-center">
                                                        <span className="font-bold">Available:</span>
                                                        {product?.status === 'In Stock' ? (
                                                                <span className="flex gap-1 text-green-600">
                                                                        {product?.status} <FiCheckSquare />
                                                                </span>
                                                        ) : (
                                                                <span className="text-red-500">Out Of Stock</span>
                                                        )}
                                                </h1>
                                                {/* <h1>
                                                        <span className="font-bold">Tags: </span> {productData?.tags}
                                                </h1> */}
                                                <h1>
                                                        <span className="font-bold">Category:</span>{' '}
                                                        {product?.category?.name}
                                                </h1>
                                        </div>
                                </div>
                                {/* <div className="mt-10">
                                        <ConfigProvider
                                                theme={{
                                                        token: {
                                                                colorPrimary: '#173616', // Set your active tab underline color
                                                        },
                                                }}
                                        >
                                                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                                        </ConfigProvider>
                                </div> */}
                        </div>
                        <div className="px-8 mx-auto mb-10 max-w-7xl font-fontTwo">
                                <h1 className="clash md:text-4xl text-2xl border-b-4 border-[#00863D] md:w-[28%] w-[70%]">
                                        <span className="text-[#00863D]">Related</span> Products
                                </h1>
                                <div className="grid grid-cols-1 md:grid-cols-3">
                                        {relatedProducts?.data?.map((product, i) => (
                                                <ProductCard key={i} product={product} />
                                        ))}
                                </div>
                        </div>

                        <Modal width={720} open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                                <Form layout="vertical" className="" onFinish={handleDirectOrder}>
                                        <div className="">
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
                                                                <Input className="py-2" placeholder="State/Province" />
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
                                                <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                                                        <Input className="py-2" placeholder="Phone" />
                                                </Form.Item>
                                                <h1 className="mb-2 text-2xl font-bold">Additional Info</h1>
                                                <Form.Item label="Order Notes (Optional)" name="orderNotes">
                                                        <Input.TextArea placeholder="Order Notes (Optional)" />
                                                </Form.Item>

                                                <div>
                                                        <Form.Item>
                                                                <Button
                                                                        style={{
                                                                                width: '100%',
                                                                                backgroundColor: '#005125',
                                                                                height: 48,
                                                                        }}
                                                                        type="primary"
                                                                        htmlType="submit"
                                                                >
                                                                        {isLoading ? 'Placing Order...' : 'Place Order'}
                                                                </Button>
                                                        </Form.Item>
                                                </div>
                                        </div>
                                </Form>
                        </Modal>
                </>
        );
};

export default Product;

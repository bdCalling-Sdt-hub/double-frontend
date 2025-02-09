import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from '../../assets/footerLogoWhite.png';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router';
import { Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import { useGetAllCategoriesQuery } from '../../redux/features/categoryApi';

const Footer = () => {
        const { data: categoryData } = useGetAllCategoriesQuery();

        return (
                <div className=" bg-[#173616]">
                        <div className="md:min-h-[350px] md:pt-28 pt-10 text-white max-w-7xl mx-auto">
                                <div className="gap-9 justify-center items-start px-10 md:flex md:px-20">
                                        <div>
                                                <img className="mb-5" src={logo} alt="logo" />
                                                <p className="md:w-[400px]">
                                                        Premium wholesale provider of THCA hemp flower. Quality you can
                                                        trust, prices you&apos;ll love
                                                </p>
                                                <div className="flex gap-5 justify-start items-center my-5">
                                                        <div className="p-2 rounded-md border border-white">
                                                                <FaFacebookF />
                                                        </div>
                                                        <div className="p-2 rounded-md border border-white">
                                                                <FaXTwitter />
                                                        </div>
                                                        <div className="p-2 rounded-md border border-white">
                                                                <FaInstagram />
                                                        </div>
                                                        <div className="p-2 rounded-md border border-white">
                                                                <FaLinkedinIn />
                                                        </div>
                                                </div>
                                        </div>
                                        <div>
                                                <h1 className="my-5 font-semibold">Useful Link</h1>
                                                <ul className="space-y-3 text-gray-300">
                                                        <li className="font-bold">
                                                                <Link to={'/auth/login'}>Admin Login</Link>
                                                        </li>
                                                        <li>
                                                                <Link to={'/aboutUs'}>About Us</Link>
                                                        </li>
                                                        <li>
                                                                <Link to={'/contactUs'}>Contact Us</Link>
                                                        </li>
                                                        <li>
                                                                <Link to={'/f-a-q'}>Faqs</Link>
                                                        </li>
                                                </ul>
                                        </div>
                                        <div>
                                                <h1 className="my-5 font-semibold">Categories</h1>
                                                <ul className="space-y-3 text-gray-300">
                                                        {categoryData?.data?.slice(0, 3).map((category) => (
                                                                <li key={category._id}>
                                                                        <Link to={`/shop/category/${category._id}`}>
                                                                                {category.name}
                                                                        </Link>
                                                                </li>
                                                        ))}
                                                </ul>
                                        </div>
                                        <div className="p-6 mx-auto max-w-sm rounded-lg">
                                                <h1 className="mb-2 text-xl font-semibold">Stay Update</h1>
                                                <p className="mb-4 text-gray-300">Get real time Update from us.</p>
                                                <Form
                                                        name="subscribe"
                                                        onFinish={() => {
                                                                toast.success('Subscribed Successfully!');
                                                        }}
                                                >
                                                        <div className="flex">
                                                                <Form.Item
                                                                        name="email"
                                                                        rules={[
                                                                                {
                                                                                        required: true,
                                                                                        type: 'email',
                                                                                        message: 'Please enter a valid email',
                                                                                },
                                                                        ]}
                                                                >
                                                                        <Input
                                                                                placeholder="Email"
                                                                                className="bg-transparent bg-white border-none focus:outline-none placeholder:text-gray-400"
                                                                                style={{
                                                                                        boxShadow: 'none',
                                                                                        border: 'none',
                                                                                }}
                                                                        />
                                                                </Form.Item>
                                                                <Form.Item>
                                                                        <Button
                                                                                type="primary"
                                                                                htmlType="submit"
                                                                                className="bg-[#5BBE6A] text-white font-semibold hover:bg-[#4CA95B]"
                                                                                style={{
                                                                                        borderTopLeftRadius: 0,
                                                                                        borderBottomLeftRadius: 0,
                                                                                        border: 'none',
                                                                                }}
                                                                        >
                                                                                Subscribe
                                                                        </Button>
                                                                </Form.Item>
                                                        </div>
                                                        <div className="text-lg text-white">
                                                                <li>
                                                                        <Link to={'/terms-and-conditions'}>
                                                                                Terms & Conditions
                                                                        </Link>
                                                                </li>
                                                                <li>
                                                                        <Link to={'/privacy-policy'}>
                                                                                Privacy Policy
                                                                        </Link>
                                                                </li>
                                                        </div>
                                                </Form>
                                        </div>
                                </div>
                        </div>
                        <div className="flex py-5 bg-[#173616] text-gray-400 border-t-2 border-gray-700 items-end justify-center">
                                <p>All right reserved The Cannabis Club © 2024</p>
                        </div>{' '}
                </div>
        );
};

export default Footer;

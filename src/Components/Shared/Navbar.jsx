import { useState, useRef } from 'react';
// import { FaRegHeart } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { IoCartOutline } from 'react-icons/io5';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useGetAllCategoriesQuery } from '../../redux/features/categoryApi';
import { useSelector } from 'react-redux';

const Navbar = () => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const totalCartItems = useSelector((state) => state.cart.items.length);

        const menuRef = useRef(null);
        const { data: categoryData } = useGetAllCategoriesQuery();

        const navOptions = [
                { label: 'Home', path: '/' },
                {
                        label: (
                                <Dropdown
                                        overlay={
                                                <Menu>
                                                        {categoryData?.data?.map((category) => (
                                                                <Menu.Item key={category?._id}>
                                                                        <NavLink to={`/shop/category/${category?._id}`}>
                                                                                {category.name}
                                                                        </NavLink>
                                                                </Menu.Item>
                                                        ))}
                                                </Menu>
                                        }
                                        trigger={['click']}
                                >
                                        <span className="dropdown-link">
                                                Shop <DownOutlined />
                                        </span>
                                </Dropdown>
                        ),
                },
                { label: 'FAQ', path: '/f-a-q' },
                { label: 'About Us', path: '/aboutUs' },
                { label: 'Contact Us', path: '/contactUs' },
        ];

        return (
                <div className="bg-[#f3faf3]">
                        <div className="flex relative justify-between items-center px-5 py-5 mx-auto max-w-7xl navbar lg:px-20">
                                {/* Mobile menu toggle */}
                                <button className="z-50 lg:hidden" onClick={() => setIsMenuOpen((prev) => !prev)}>
                                        {isMenuOpen ? <HiX size={30} /> : <HiOutlineMenuAlt3 size={30} />}
                                </button>

                                {/* Logo */}
                                <img
                                        src={logo}
                                        alt="logo"
                                        className="absolute left-1/2 transform -translate-x-1/2 logo lg:static lg:transform-none"
                                />

                                {/* Nav Menu */}
                                <div
                                        ref={menuRef}
                                        className={`absolute lg:relative top-16 left-0 lg:top-0 lg:left-auto w-full lg:w-auto lg:flex flex-col lg:flex-row bg-[#F9FDF9] lg:bg-yellow-50 shadow-lg lg:shadow-none p-5 lg:p-2 lg:rounded-2xl space-y-4 lg:space-y-0 lg:space-x-6 transition-all duration-300 z-50 ${
                                                isMenuOpen ? 'block' : 'hidden'
                                        }`}
                                >
                                        {navOptions.map((option, index) => {
                                                if (!option.path) {
                                                        // Render the "Shop" dropdown without a NavLink
                                                        return (
                                                                <div
                                                                        key={index}
                                                                        className="flex flex-col justify-center items-center px-3 py-1 nav-link"
                                                                >
                                                                        {option.label}
                                                                </div>
                                                        );
                                                }
                                                // Render other navigable items
                                                return (
                                                        <NavLink
                                                                key={index}
                                                                to={option.path}
                                                                className={({ isActive }) =>
                                                                        `nav-link flex flex-col items-center justify-center px-3 py-4 rounded-lg ${
                                                                                isActive
                                                                                        ? 'bg-[#FFC313]'
                                                                                        : 'hover:bg-gray-200'
                                                                        }`
                                                                }
                                                                end
                                                                onClick={() => setIsMenuOpen(false)}
                                                        >
                                                                {option.label}
                                                        </NavLink>
                                                );
                                        })}
                                </div>

                                {/* Right Icons */}
                                <div className="flex gap-4 nav-icons">
                                        {/* <NavLink to="/favorite">
                                                <Badge count={5}>
                                                        <FaRegHeart size={24} />
                                                </Badge>
                                        </NavLink> */}
                                        <NavLink to="/cart">
                                                <Badge count={totalCartItems}>
                                                        <IoCartOutline size={24} />
                                                </Badge>
                                        </NavLink>
                                </div>
                        </div>
                </div>
        );
};

export default Navbar;

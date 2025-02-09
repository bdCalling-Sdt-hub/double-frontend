import { useEffect, useState } from 'react';
import { Menu, Modal } from 'antd';
import { MdAdd, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuLayoutDashboard, LuUsers } from 'react-icons/lu';
import Cookies from 'js-cookie';
import logo from '../../assets/logoGreenBg.png';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import './Sidebar.css';

const Sidebar = () => {
        const location = useLocation();
        const path = location.pathname;
        const [selectedKey, setSelectedKey] = useState('');
        const [openKeys, setOpenKeys] = useState([]);
        const navigate = useNavigate();

        const handleLogout = () => {
                Modal.confirm({
                        centered: true,
                        title: 'Logout',
                        content: 'Are you sure you want to logout?',
                        onOk() {
                                localStorage.removeItem('authToken');
                                localStorage.removeItem('refreshToken');
                                sessionStorage.removeItem('authToken');
                                sessionStorage.removeItem('refreshToken');
                                Cookies.remove('refreshToken');
                                navigate('/auth/login');
                        },
                });
        };

        const menuItems = [
                {
                        key: '/dashboard',
                        icon: <LuLayoutDashboard size={24} />,
                        label: <Link to="/dashboard">Dashboard</Link>,
                },
                {
                        key: '/dashboard/product-management',
                        icon: <MdOutlineProductionQuantityLimits size={24} />,
                        label: <Link to="/dashboard/product-management">Product Management</Link>,
                },
                {
                        key: '/dashboard/category',
                        icon: <MdAdd size={24} />,
                        label: <Link to="/dashboard/category">Add Category</Link>,
                },
                {
                        key: '/dashboard/add-product',
                        icon: <MdAdd size={24} />,
                        label: <Link to="/dashboard/add-product">Add Product</Link>,
                },
                {
                        key: '/dashboard/order-management',
                        icon: <AiOutlineUnorderedList size={24} />,
                        label: <Link to="/dashboard/order-management">Order Management</Link>,
                },
                {
                        key: '/dashboard/subscriber-management',
                        icon: <LuUsers size={24} />,
                        label: <Link to="/dashboard/subscriber-management">Subscriber Management</Link>,
                },

                {
                        key: 'subMenuSetting',
                        icon: <IoSettingsOutline size={24} />,
                        label: 'Settings',
                        children: [
                                // {
                                //         key: '/dashboard/personal-info',
                                //         label: <Link to="/dashboard/personal-info">Personal Information</Link>,
                                // },
                                {
                                        key: '/dashboard/change-password',
                                        label: <Link to="/dashboard/change-password">Change Password</Link>,
                                },
                                {
                                        key: '/dashboard/terms-and-conditions',
                                        label: <Link to="/dashboard/terms-and-conditions">Terms and Conditions</Link>,
                                },
                                {
                                        key: '/dashboard/privacy-policy',
                                        label: <Link to="/dashboard/privacy-policy">Privacy Policy</Link>,
                                },
                                {
                                        key: '/dashboard/faq-management',
                                        label: <Link to="/dashboard/faq-management">Update FAQ</Link>,
                                },
                                {
                                        key: '/dashboard/update-about-us',
                                        label: <Link to="/dashboard/update-about-us">Update About Us</Link>,
                                },
                        ],
                },
                {
                        key: '/logout',
                        icon: <IoIosLogOut size={24} />,
                        label: <p onClick={handleLogout}>Logout</p>,
                },
        ];

        useEffect(() => {
                const selectedItem = menuItems.find(
                        (item) => item.key === path || item.children?.some((sub) => sub.key === path),
                );
                if (selectedItem) {
                        setSelectedKey(path);
                        const parentItem = menuItems.find((item) => item.children?.some((sub) => sub.key === path));
                        setOpenKeys(parentItem ? [parentItem.key] : []);
                }
        }, [path]);

        const handleOpenChange = (keys) => {
                setOpenKeys(keys);
        };

        return (
                <div style={{ marginTop: '1.25rem' }}>
                        <div style={{ padding: '0 2.5rem' }}>
                                <Link
                                        to="/"
                                        style={{
                                                marginBottom: '2.5rem',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: '1rem 0',
                                        }}
                                >
                                        <img src={logo} alt="Logo" />
                                </Link>
                        </div>
                        <Menu
                                mode="inline"
                                theme="dark"
                                selectedKeys={[selectedKey]}
                                openKeys={openKeys}
                                onOpenChange={handleOpenChange}
                                style={{
                                        borderRight: 'none',
                                        background: 'transparent',
                                }}
                                items={menuItems}
                        />
                </div>
        );
};

export default Sidebar;

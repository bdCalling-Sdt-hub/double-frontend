import { createBrowserRouter } from 'react-router';
import Main from '../Layout/Main/Main';
import Home from '../Pages/Home/Home';
import Shop from '../Pages/Shop/Shop';
import FAQ from '../Pages/FAQ';
import AboutUs from '../Pages/AboutUs';
import ContactUs from '../Pages/ContactUs';
import Product from '../Pages/Shop/Product';
import Cart from '../Pages/Cart';
import Checkout from '../Pages/Checkout';
import FavouritePage from '../Pages/FavouritePage';
import Auth from '../Layout/Auth';
import Login from '../Pages/Auth/Login';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import VerifyOtp from '../Pages/Auth/VerifyOtp';
import ResetPassword from '../Pages/Auth/ResetPassword';
import Dashboard from '../Layout/Dashboard/Dashboard';
import DashboardHome from '../Pages/Dashboard/DashboardHome';
import Products from '../Components/ui/Dashboard/ProductManagement/Products';
import AddProducts from '../Components/ui/Dashboard/ProductManagement/AddProducts';
import EditProducts from '../Components/ui/Dashboard/ProductManagement/EditProducts';
import OrderManagement from '../Components/ui/Dashboard/OrderManagement';
import Category from '../Components/ui/Dashboard/ManageCategory/Category';
import SubCategory from '../Components/ui/Dashboard/ManageCategory/SubCategory';
import UserManagement from '../Components/ui/Dashboard/UserManagement';
import PrivacyPolicy from '../Components/ui/Dashboard/Settings/PrivacyPolicy';
import TermsAndConditions from '../Components/ui/Dashboard/Settings/TermsAndConditions';
import ChangePassword from '../Pages/Auth/ChangePassword';

import Notifications from '../Pages/Dashboard/Notifications';
import FaqManagement from '../Components/ui/Dashboard/FaqManagement';
import UpdateAboutUs from '../Components/ui/Dashboard/UpdateAboutUs';
import PrivateRoute from '../provider/PrivateRoute';
import PrivacyPolicyPage from '../Pages/PrivacyPolicy';
import TermsAndConditionsPage from '../Pages/TermsAndConditions';
import SubscriberManagement from '../Pages/Dashboard/SubscriberManagement';

export const router = createBrowserRouter([
        {
                path: '/',
                element: <Main />,
                children: [
                        {
                                path: '/',
                                element: <Home />,
                        },
                        {
                                path: '/shop/category/:id',
                                element: <Shop />,
                        },
                        {
                                path: '/shop/category/:id/:id',
                                element: <Product />,
                        },
                        {
                                path: '/f-a-q',
                                element: <FAQ />,
                        },
                        {
                                path: '/aboutUs',
                                element: <AboutUs />,
                        },
                        {
                                path: '/contactUs',
                                element: <ContactUs />,
                        },
                        {
                                path: '/favorite',
                                element: <FavouritePage />,
                        },
                        {
                                path: '/cart',
                                element: <Cart />,
                        },
                        {
                                path: '/checkout',
                                element: <Checkout />,
                        },

                        {
                                path: '/terms-and-conditions',
                                element: <TermsAndConditionsPage />,
                        },
                        {
                                path: '/privacy-policy',
                                element: <PrivacyPolicyPage />,
                        },
                ],
        },
        {
                path: '/dashboard',
                element: (
                        <PrivateRoute>
                                <Dashboard />
                        </PrivateRoute>
                ),
                children: [
                        {
                                path: '/dashboard',
                                element: <DashboardHome />,
                        },
                        {
                                path: 'product-management',
                                element: <Products />,
                        },
                        {
                                path: 'add-product',
                                element: <AddProducts />,
                        },
                        {
                                path: 'edit-product/:id',
                                element: <EditProducts />,
                        },
                        {
                                path: 'order-management',
                                element: <OrderManagement />,
                        },
                        {
                                path: 'user-management',
                                element: <UserManagement />,
                        },
                        {
                                path: 'subscriber-management',
                                element: <SubscriberManagement />,
                        },
                        // {
                        //   path: "/edit-order/:id",
                        //   element: <AddProducts />,
                        // },
                        {
                                path: 'category',
                                element: <Category />,
                        },
                        {
                                path: 'notifications',
                                element: <Notifications />,
                        },
                        {
                                path: 'subCategory',
                                element: <SubCategory />,
                        },

                        {
                                path: 'change-password',
                                element: <ChangePassword />,
                        },
                        {
                                path: 'privacy-policy',
                                element: <PrivacyPolicy />,
                        },
                        {
                                path: 'terms-and-conditions',
                                element: <TermsAndConditions />,
                        },
                        {
                                path: 'faq-management',
                                element: <FaqManagement />,
                        },
                        {
                                path: 'update-about-us',
                                element: <UpdateAboutUs />,
                        },
                ],
        },
        {
                path: '/auth',
                element: <Auth />,
                children: [
                        {
                                path: 'login',
                                element: <Login />,
                        },
                        {
                                path: 'forgot-password',
                                element: <ForgotPassword />,
                        },

                        {
                                path: 'verify-otp',
                                element: <VerifyOtp />,
                        },
                        {
                                path: 'reset-password',
                                element: <ResetPassword />,
                        },
                ],
        },
]);

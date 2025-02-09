import logo from '../../assets/randomProfile2.0.png';
// import { useFetchAdminProfileQuery } from "../../redux/apiSlices/authSlice";

const Header = () => {
        // const { data: userData, isLoading } = useFetchAdminProfileQuery();
        const isLoading = false;
        const userData = {
                data: {
                        role: 'admin',
                        name: 'Alison Burger',
                },
        };

        if (isLoading) {
                return <div className="flex justify-center items-center my-20 text-lg text-secondary">Loading...</div>;
        }

        return (
                <div className="flex gap-5 justify-end items-center">
                        <div className="flex justify-center items-center rounded-3xl border-4">
                                <img className="w-12 h-12 rounded-full" src={logo} alt="" />
                                <h1 className="mx-2 mt-2 text-lg font-bold">{userData?.data?.name}</h1>
                        </div>
                </div>
        );
};

export default Header;

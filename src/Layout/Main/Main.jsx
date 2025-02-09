import { Outlet, ScrollRestoration } from "react-router";
import Navbar from "../../Components/Shared/Navbar";
import Footer from "../../Components/Shared/Footer";
import AgeRestrictions from "../../Components/ui/AgeRestrictions";

const Main = () => {
  return (
    <div className="font-fontTwo">
      <AgeRestrictions />
      <Navbar />

      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Main;

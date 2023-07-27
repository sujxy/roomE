import { Outlet } from "react-router-dom";
import Navbar from "../scenes/navbar";

const Layout = () => {
  return (
    <div className="w-screen ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;

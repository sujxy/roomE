// navbar
import react from "react";
import Logo from "@/components/logo";
import NavUser from "@/scenes/widgets/navuser";
import NavMenu from "@/scenes/widgets/navmenu";

const Navbar = () => {
  return (
    <div className="static top-0 w-screen h-20 flex justify-between items-center pl-14 pr-6 py-3 shadow-md">
      <Logo />
      <div className="basis-7/10 flex justify-between items-center gap-24">
        <NavMenu />
        <NavUser />
      </div>
    </div>
  );
};

export default Navbar;

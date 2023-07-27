import { useContext, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LogIn,
  LogOut,
  MapPin,
  User2,
  UserCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "@/components/userContext";

const NavUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, ready } = useContext(UserContext);
  const navigate = useNavigate();

  if (!ready) {
    return "Loading..";
  }

  return (
    <div className="relative flex flex-row gap-6 justify-around items-center shadow-md py-2 px-3 w-3/10 border rounded-full">
      <div className="flex gap-2">
        <div className="w-8 flex jsutify-center items-center rounded-full  bg-gray-500 text-center  ">
          {user?.picturePath ? (
            <img
              src={`http://127.0.0.1:3001/assets/${user.picturePath}`}
              className="w-8 h-8 object-cover rounded-full "
            />
          ) : (
            <User2 className="text-white" size={30} />
          )}
        </div>
        <div>
          <h2 className="font-poppins font-semibold text-xs ">
            {user ? user.username : "Username"}
          </h2>
          <p className="font-poppins font-light text-xs text-blue-600 ">role</p>
        </div>
      </div>

      <div className="flex gap-1">
        <MapPin strokeWidth={1.75} className="text-blue-600 w-6 h-6" />
        <h3>location</h3>
      </div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <ChevronUp color="#545454" strokeWidth={1.75} className="w-6 h-6" />
        ) : (
          <ChevronDown color="#545454" strokeWidth={1.75} className="w-6 h-6" />
        )}
      </button>

      {isOpen &&
        (!user ? (
          <div className="absolute px-4 py-1 top-14 w-full flex flex-col  z-50 bg-white rounded-xl border shadow-md ">
            <div
              className="flex items-center hover:cursor-pointer justify-between gap-2  py-3 px-5 hover:bg-gray-50 hover:border-l-4 hover:border-blue-600 transition-all duration-200"
              onClick={() => navigate("/auth")}
            >
              <LogIn color="#545454" strokeWidth={1.75} className="w-6 h-6" />

              <h2 className="font-poppins font-light grow text-center text-gray-500">
                Login
              </h2>
            </div>
            <div className="border-b border-gray-300 w-full h-0"></div>
            <div className="flex items-center hover:cursor-pointer justify-between gap-2 py-3 px-5  hover:bg-gray-50 hover:border-l-4 hover:border-blue-600 transition-all duration-200">
              <MapPin strokeWidth={1.75} color="#545454" className="w-6 h-6" />

              <h2 className="font-poppins font-light grow text-center text-gray-500">
                Location
              </h2>
            </div>
          </div>
        ) : (
          <div className="absolute px-4 py-1  top-14 w-full flex flex-col z-50  bg-white rounded-xl border shadow-md">
            <div className="flex items-center hover:cursor-pointer justify-between  gap-2 py-3 px-5  hover:bg-gray-50 hover:border-l-4 hover:border-blue-600 transition-all duration-200">
              <UserCircle2 className="text-gray-500 w-6 h-6 " />

              <h2 className="font-poppins font-light grow text-center text-gray-500">
                Profile
              </h2>
            </div>
            <div className="border-b border-gray-300 w-full h-0"></div>
            <div className="flex items-center hover:cursor-pointer justify-between  gap-2 py-3 px-5  hover:bg-gray-50 hover:border-l-4 hover:border-blue-600 transition-all duration-200">
              <MapPin strokeWidth={1.75} color="#545454" className="w-6 h-6" />
              <h2 className="font-poppins font-light grow text-center text-gray-500">
                Location
              </h2>
            </div>
            <div className="border-b border-gray-300 w-full h-0"></div>
            <div
              onClick={() => setUser(null)}
              className="flex items-center hover:cursor-pointer justify-between  gap-2 py-3 px-5  hover:bg-gray-50 hover:border-l-4 hover:border-blue-600 transition-all duration-200"
            >
              <LogOut color="#545454" strokeWidth={1.75} className="w-6 h-6" />
              <h2 className="font-poppins font-light grow text-center text-gray-500">
                Log out
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NavUser;
{
  /* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg> */
}
//  hover:bg-gray-300 hover:border-l transition-all duration-200



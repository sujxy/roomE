const NavMenu = () => {
  return (
    <div className=" flex flex-row gap-6 justify-around items-center shadow-md py-2 px-3 w-auto rounded-full border">
      <div className="hover:cursor-pointer pl-3">
        <h2 className="font-poppins font-semibold text-xs ">Location</h2>
        <p className="font-poppins font-extralight text-xs">
          Where do you want to Live?
        </p>
      </div>
      <div className="border-r border-gray-400 h-8"></div>
      <div className="hover:cursor-pointer">
        <h2 className="font-poppins font-semibold text-xs ">Move in</h2>
        <p className="font-poppins font-extralight text-xs">
          When do you plan to move ?{" "}
        </p>
      </div>
      <div className="border-r border-gray-400 h-8"></div>
      <div className="hover:cursor-pointer">
        <h2 className="font-poppins font-semibold text-xs ">Roomies</h2>
        <p className="font-poppins font-extralight text-xs">Add roomies?</p>
      </div>
      <button className="bg-primary p-2 rounded-full hover:scale-200 transition-all duration-100 ease-out ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-white "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};

export default NavMenu;

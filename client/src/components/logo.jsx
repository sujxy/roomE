import react from "react";
import { useNavigate } from "react-router-dom";

const Logo = ({ size = "lg" }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex justify-center items-center gap-1 w-16 h-auto hover:cursor-pointer"
    >
      <h1 className={`font-righteous text-4xl`}>room</h1>
      <img src="/favicon.png" className={`w-9`} />
    </div>
  );
};

export default Logo;
// ${size === "sm" ? "sm" : "4xl"}

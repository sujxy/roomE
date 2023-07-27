import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/components/userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircle, User2 } from "lucide-react";
import axios from "axios";

const AccountPage = () => {
  const { user, setUser, ready } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const inputRef = useRef();
  const navigate = useNavigate();

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user) {
    navigate("/auth");
  }

  const { subpage } = useParams();

  const genClasses = (type = null) => {
    let utilities =
      "px-3 py-1 font-poppins text-light rounded-full border border-gray";
    if (type === subpage || (subpage === undefined && type === "profile")) {
      utilities +=
        " bg-blue-500 rounded-full text-white border border-blue-500";
    }
    return utilities;
  };

  const setLogout = async () => {
    const { result } = await axios.post("/logout");
    if (result) {
      navigate("/");
      setUser(null);
    }
  };

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleClick = () => {
    setIsEdit(true);
    setShowButton(true);
    inputRef.current.click();
  };
  const handleFileSubmit = async () => {
    const formData = new FormData();
    formData.append("picture", selectedFile);
    formData.append("picturePath", selectedFile.name);
    const { data } = await axios.patch("/profile/changePicture", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setUser(data);

    setIsEdit(false);
    setShowButton(false);
    setSelectedFile(null);
  };

  return (
    <div className="w-full mt-4 text-center mx-auto ">
      <div className="flex justify-center items-center gap-6 ">
        <Link className={genClasses("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={genClasses("saved")} to={"/account/saved"}>
          saved
        </Link>
        <Link className={genClasses("myListings")} to={"/account/myListings"}>
          My Listings
        </Link>
      </div>

      <div className="h-[640px] mt-4 flex justify-center items-center gap-8 px-16 py-6">
        <div className="basis-3/10 rounded-lg border  shadow-xl  h-full w-1/3 flex flex-col p-4 justify-center items-center ">
          <div className="relative w-full h-full pt-4  bg-white ">
            {!isEdit && user.picturePath ? (
              <img
                onClick={handleClick}
                src={`http://127.0.0.1:3001/assets/${user.picturePath}`}
                className="w-60 h-60 rounded-full object-cover shadow-md mx-auto"
              />
            ) : (
              <img
                onClick={handleClick}
                src={
                  isEdit && selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : `http://127.0.0.1:3001/assets/defaultProfile.jpeg`
                }
                className="w-60 h-60 rounded-full object-cover shadow-md mx-auto"
              />
            )}
            {showButton && (
              <button
                onClick={handleFileSubmit}
                className="absolute top-4 left-12 p-2 rounded-full bg-blue-400"
              >
                <CheckCircle className="text-white h-6 w-6" />
              </button>
            )}
            <input
              type="file"
              className="z-10 collapse  "
              onChange={handleChange}
              ref={inputRef}
            />
          </div>
          <div className="w-full h-full rounded bg-white ">
            <div className="flex justify-between items-center px-8 py-4 ">
              <h2 className="font-poppins font-bold text-md">Name</h2>
              <p className="font-poppins font-light text-gray-500 text-md">
                {user.username}
              </p>
            </div>
            <div className="flex justify-between items-center px-8 py-4 border-y-2">
              <h2 className="font-poppins font-bold text-md">Email</h2>
              <p className="font-poppins font-light text-gray-500 text-md">
                {user.email}
              </p>
            </div>
            <div className="flex justify-between items-center px-8 py-4">
              <h2 className="font-poppins font-bold text-md">Phone</h2>
              <p className="font-poppins font-light text-gray-500 text-md">
                9890972705
              </p>
            </div>
            <div className="flex justify-between items-center px-8 py-4 gap-1 mt-4">
              <h2 className="font-poppins font-light  text-gray-500 text-md">
                Log out of this account
              </h2>
              <button
                onClick={setLogout}
                className="font-poppins font-bold px-4 py-2 rounded-full bg-blue-400 text-white text-md hover:bg-blue-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="basis-7/10 h-full bg-gray-400 w-2/3"></div>
      </div>
    </div>
  );
};

export default AccountPage;

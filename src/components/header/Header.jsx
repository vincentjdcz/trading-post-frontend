import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import PropTypes from "prop-types";
import { HiSearch, HiUser } from "react-icons/hi";
import { useEffect, useState } from "react";
const Header = ({ onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profilePicture = useSelector((state) => state.auth.profilePicture);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Force header re-render when logging in", isLoggedIn);
  }, [isLoggedIn, profilePicture])
  const handleLogout = async () => {
    try {
      //https://trading-post-backend-production.up.railway.app
      //http://localhost:3000
      const response = await fetch(
        "https://trading-post-backend-production.up.railway.app/api/auth/logout",
        {
          method: "POST", // Use POST method for logout
          credentials: "include", // Include credentials to send cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      const data = await response.json();
      console.log(data.message); // "Logout successful"
      // Clear local storage
      localStorage.clear();

      // Dispatch an action to reset the Redux state
      dispatch(logout()); // Make sure to define this action in your Redux slice
      navigate("/");
      // You can also redirect the user or update your state here
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <header className="bg-blue-500 text-white py-4 fixed top-0 left-0 w-full z-50 shadow">
      <div className="container px-7 flex justify-between items-center min-w-full">
        <div className="flex items-center">
          {/* Sidebar toggle */}
          {/* 
          <button
            onClick={onToggleSidebar}
            className="p-2 mr-2 rounded hover:bg-blue-600 focus:outline-none focus-ring focus:ring-blue-400 text-white bg-blue-400"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          */}
          {/* Logo */}
          <div className="text-lg font-bold">Trading Post</div>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-3 flex">
          <a
            href="/explore"
            className="hover:underline hover:text-slate-300 text-white"
          >
            <HiSearch className="w-8 h-8 "/>

          </a>
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none bg-transparent p-0">
          {
            profilePicture ? <img className="w-8 h-8 rounded-full" src={profilePicture} /> :
            <HiUser className="w-8 h-8" />
          }
          
          </button>
          
          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-10 w-48 bg-white text-black shadow-lg rounded-lg p-2 flex flex-col items-center">
              {isLoggedIn ? (
                <a href="/myProfile" className="block px-4 py-2 hover:bg-gray-200">
                  My Profile
                </a>
              ) : (
                <a href="/login" className="block px-4 py-2 hover:bg-gray-200">
                  Log In
                </a>
              )}
              {isLoggedIn && (
                <a href="#" onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }} className="block px-4 py-2 hover:bg-gray-200">
                  Log Out
                </a>
              )}
            </div>
          )}

          
        </nav>
      </div>
    </header>
  );
};
Header.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
};

export default Header;

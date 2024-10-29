import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from "../../../redux/authSlice";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      //https://trading-post-backend-production.up.railway.app
      //http://localhost:3000
      const response = await fetch('https://trading-post-backend-production.up.railway.app/api/auth/logout', {
          method: 'POST', // Use POST method for logout
          credentials: 'include', // Include credentials to send cookies
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error('Logout failed');
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
      console.error('Error:', error);
  }
  }
  return (
    <header className="bg-blue-500 text-white py-4 fixed top-0 left-0 w-full z-50 shadow">
      <div className="container px-7 flex justify-between items-center min-w-full">
        {/* Logo */}
        <div className="text-lg font-bold">Trading Post</div>

        {/* Navigation Links */}
        <nav className="space-x-7">
          <a
            href="/explore"
            className="hover:underline hover:text-slate-300 text-white"
          >
            Explore Posts
          </a>

          {isLoggedIn ? (
            <a
              href="/my-posts"
              className="hover:underline hover:text-slate-300 text-white"
            >
              My Posts
            </a>
          ) : (
            <a
              href="/login"
              className="hover:underline hover:text-slate-300 text-white"
            >
              Log In
            </a>
          )}

          {isLoggedIn ? (
            <a
              href="#"
              onClick={handleLogout}
              className="hover:underline hover:text-slate-300 text-white"
            >
              Log Out
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
};

export default Header;

import { Link, useLocation } from "react-router-dom";
import { Home, LogOut, User } from "lucide-react";

const Header = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const isMatchDetails = location.pathname.includes("/match-details");

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    <header className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-lg w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section with SVG Icon */}
        <Link to="/" className="flex items-center space-x-2">
         
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 inline-block text-transparent bg-clip-text">Football </span> Aura
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          {isMatchDetails && (
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          )}
          <Link
            to="/about"
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-600 transition duration-300"
          >
            <User className="w-5 h-5" />
            <span>About</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition duration-300"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
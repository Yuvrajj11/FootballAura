/*Working code*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Auth({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAuth = async (e) => {
    e.preventDefault();
  
    // Validate email format
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
  
    const endpoint = isLogin ? "/login" : "/signup";
  
    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setErrorMessage(data.message); // Show different error messages
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        class="relative group">
      <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-700 to-orange-600 blur opacity-65 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div
        className="relative max-w-md w-full space-y-8 bg-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-700"
      >
        
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-500 inline-block text-transparent bg-clip-text">{isLogin ? "Welcome Back!" : "Join Us Today!"}</h2>
        </div>

        {/* Display Error Message */}
        {errorMessage && (
            <div className="text-red-500 bg-red-100 border border-red-500 p-3 rounded-lg text-center">
              {errorMessage}
            </div>
         )}

        <form className="mt-6 space-y-6" onSubmit={handleAuth}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border bg-gray-800 text-white rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-400"
            placeholder="Email address"
          />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border bg-gray-800 text-white rounded-lg focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-400"
            placeholder="Password"
          />
          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </motion.button>
        </form>

        <div className="text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-orange-400 mt-4">
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
      </motion.div>
    </div>
  );
}

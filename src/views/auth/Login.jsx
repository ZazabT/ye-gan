import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAuthStore from "../../stores/UserAuthStore";
import sideImage from "../../assets/authsideimage.jpg";
const Login = () => {
  const { login, error, loading } = userAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      return;
    }

    try {
      await login(email, password);

      if (!error) {
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 to-indigo-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          {/* Left Side - Image */}
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Login</h2>
            <p className="mb-6 text-gray-600">
              Sign in to your account to access exclusive features.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="border border-gray-300 py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:shadow-md"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="border border-gray-300 py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none hover:shadow-md"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-lg shadow-lg text-white transition-transform transform ${
                  loading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 hover:scale-105"
                } focus:ring-4 focus:ring-purple-300 focus:outline-none`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="loader border-purple-500 border-2 border-t-2 w-5 h-5 rounded-full animate-spin"></span>
                    <span></span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              {error && (
                <p className="text-red-500 text-sm mt-4 bg-red-100 p-2 rounded-md text-center">
                  {error}
                </p>
              )}
            </form>
            <div className="mt-4 text-center">
              <a href="/register" className="text-blue-600 hover:underline">
                Don&apos;t have an account? Register
              </a>
            </div>
          </div>

          {/* Right Side - Image */}
          <div
            className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${sideImage})`,
            }}
          >
            <div className="text-center flex flex-col">

            <h1 className="text-white text-4xl font-bold mb-3">Welcome Back</h1>
            <p className="text-white text-lg text-center">
              Access your account and continue your journey with us.{" "}
              <a href="/register" className="text-yellow-300 font-semibold underline">
                Register here
              </a>
              .
            </p>
            </div>
           
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Login;

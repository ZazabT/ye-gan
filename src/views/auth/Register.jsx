import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuthStore from '../../stores/UserAuthStore';
import sideImage from '../../assets/authsideimage.jpg';


const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = userAuthStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password_confirmation: '',
    age: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, password_confirmation, age } = formData;

    await register(firstName, lastName, email, password, password_confirmation, age);

    if (!error) {
      navigate('/');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-xl overflow-hidden">
          {/* Left Side - Logo */}
          <div
            className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${sideImage})`,
            }}
          >
            <h1 className="text-white text-4xl font-bold mb-3">Welcome</h1>
            <p className="text-white text-lg text-center">
              Discover the best experiences and start your journey with us today.{' '}
              <a href="#" className="text-yellow-300 font-semibold underline">
                Learn more
              </a>
            </p>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full lg:w-1/2 py-16 px-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Register</h2>
            <p className="mb-6 text-gray-600">
              Create your account. It’s free and only takes a minute.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border border-gray-300 py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none hover:shadow-md"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border border-gray-300 py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none hover:shadow-md"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-300 py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none hover:shadow-md"
                required
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-gray-300 py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none hover:shadow-md"
                required
              />
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="border border-gray-300 py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none hover:shadow-md"
                required
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="border border-gray-300 py-2 px-4 rounded-lg w-full focus:ring-2 focus:ring-purple-500 focus:outline-none hover:shadow-md"
                required
              />
              <div className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
                  required
                />
                <span className="ml-2 text-sm">
                  I accept the{' '}
                  <a href="#" className="text-purple-500 font-semibold underline">
                    Terms of Use
                  </a>{' '}
                  &{' '}
                  <a href="#" className="text-purple-500 font-semibold underline">
                    Privacy Policy
                  </a>
                </span>
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
                  "Register"
                )}
              </button>
              {error && (
                <p className="text-red-500 text-sm mt-4 bg-red-100 p-2 rounded-md">
                  {error}
                </p>
              )}
            </form>
            <div className="mt-4 text-center">
              <a href="/login" className="text-blue-600 hover:underline">
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

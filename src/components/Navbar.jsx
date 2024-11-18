import { useEffect, useState } from 'react';
import userAuthStore from '../stores/UserAuthStore';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control mobile menu
  const { checkAuth, logout, isAuthenticated, user } = userAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = async () => {
    await logout();
    toggleModal();
  };

  const handleLogin = () => {
    toggleModal();
    navigate('/login');
  };

  const handleSignin = () => {
    toggleModal();
    navigate('/register');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar flex flex-col md:flex-row justify-between items-center px-6 py-4 ">
      {/* Logo */}
      <div
        className="logo flex items-center mb-4 md:mb-0 transition-transform duration-300 ease-in-out hover:scale-105 hover:-rotate-3 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img src={Logo} alt="Company Logo" className="w-40 h-auto" />
      </div>


      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none"
        >
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'} text-2xl`}></i>
        </button>
      </div>

      {/* Search Bar */}
      <div className={`search-bar flex flex-col md:flex-row items-center justify-center gap-1 shadow-xl rounded-full border border-gray-300 bg-white p-2 px-3 max-w-[400px] w-full ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
        {/* Where to search */}
        <div className="flex items-center gap-2 px-4 border-r border-gray-200">
          <input
            type="text"
            className="h-10 w-full focus:outline-none focus:ring-0 text-gray-700 placeholder-black transition duration-300 ease-in-out"
            style={{  fontWeight: 600 }}
            placeholder="Where"
            aria-label="Where to search"
          />
          {/* <i className="fas fa-map-marker-alt text-gray-500" aria-hidden="true"></i> */}
        </div>

        {/* When to search */}
        <div className="flex items-center gap-2 px-4 border-r border-gray-300">
          <input
            type="text"
            className="h-10 w-full focus:outline-none focus:ring-0 text-gray-700 placeholder-black  transition duration-300 ease-in-out"
            style={{  fontWeight:600}}
            placeholder="When"
            aria-label="When to search"
          />
          {/* <i className="fas fa-calendar-alt text-gray-500" aria-hidden="true"></i> */}
        </div>

        {/* Guests */}
        <div className="flex items-center gap-2 px-4">
          <input
            type="text"
            className="h-10 w-full focus:outline-none focus:ring-0 text-gray-400 placeholder-black transition duration-300 ease-in-out"
            style={{  fontWeight: 600 }}
            placeholder="Guests"
            aria-label="Number of guests"
          />
          {/* <i className="fas fa-user text-gray-500" aria-hidden="true"></i> */}
        </div>

        {/* Search Button */}
        <button className="bg-[#50087b] text-white rounded-full px-4 md:px-6 py-2 hover:bg-[#6a0dad] transition transform duration-300 hover:scale-105">
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* User Profile */}
      <div className="relative flex items-center gap-4 md:gap-6 mt-4 md:mt-0">
        <button
          className="text-base font-medium text-gray-700 hover:text-[#50087b] transition"
          onClick={() => {
            if (isAuthenticated) {
              if (user?.isHomeOwner === 1) {
                 
                navigate('/add-listing');
              } else {
                navigate('/add-host-info');
              }
            } else {
              navigate('/login');
            }
          }}
        >
          Make your Yegna
        </button>

        {/* Profile Button */}
        <div className="relative">
          <div
            onClick={toggleModal}
            className={`flex items-center cursor-pointer border border-gray-300 rounded-full px-4 py-2 hover:shadow-md transition transform duration-300 ${isModalOpen ? 'scale-105' : ''}`}
          >
            <i className="fas fa-bars text-gray-600 transition-transform duration-300" aria-hidden="true"></i>
            {isAuthenticated ? (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#50087b] text-white text-lg ml-2 font-bold">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : ''}
              </div>
            ) : (
              <i className="fas fa-user-circle text-gray-600 ml-2 text-3xl" aria-hidden="true"></i>
            )}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-transform duration-300 transform ${isModalOpen ? 'scale-100' : 'scale-0'}`}>
              <ul className="py-2">
                {!isAuthenticated && (
                  <>
                    <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer" onClick={handleLogin}>
                      LogIn
                    </li>
                    <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer" onClick={handleSignin}>
                      SignUp
                    </li>
                  </>
                )}
                {isAuthenticated && (
                  <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer" onClick={() => navigate('/guest-profile')}>Guest Profile</li>
                )}
                {isAuthenticated && user?.isHomeOwner === 1 && (
                  <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer" onClick={() => navigate('/host-profile')}>Host Profile</li>
                )}
                <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer">Settings</li>
                {isAuthenticated && (
                  <li className="px-4 py-2 hover:bg-purple-100 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Overlay to close modal when clicking outside */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40"
          onClick={toggleModal}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;

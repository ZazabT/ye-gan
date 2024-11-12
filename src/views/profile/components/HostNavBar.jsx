import Logo from '../../../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

const HostNavBar = ({ hostProfile, navLinks }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const backEndUrl = 'http://localhost:8000';

    return (
        <div>
            <nav className="bg-white border-b flex justify-between items-center px-8 py-4 md:px-12 lg:px-20">
                {/* Logo */}
                <img
                    src={Logo}
                    alt="logo"
                    className="w-32 hover:scale-105 duration-200 cursor-pointer"
                    onClick={() => navigate("/")}
                />

                {/* Primary Navigation Links */}
                <ul className="flex items-center text-md font-medium">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <a
                                href={link.path}
                                className={`px-4 py-3 rounded-full transition duration-200 ${
                                    location.pathname === link.path
                                        ? 'text-black border-b-2 border-black'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Secondary Navigation Links */}
                <ul className="flex items-center space-x-4">
                    {/* Add Icon*/}

                    <li>
                        <a href="/add-listing" className="relative text-gray-600 hover:text-green-600 transition duration-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v14M5 12h14"
                                />
                            </svg>
                        </a>
                    </li>






                    {/* Notification Icon */}


                    <li>
                        <a href="#" className="relative text-gray-600 hover:text-blue-600 transition duration-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11a6 6 0 00-5-5.91V4a1 1 0 10-2 0v1.09A6 6 0 006 11v3c0 .295-.105.571-.293.793L4 17h5m6 0a3 3 0 11-6 0"
                                />
                            </svg>
                            {/* Notification Badge */}
                            <span className="absolute top-0 right-0 bg-red-600 h-2 w-2 rounded-full"></span>
                        </a>
                    </li>

                    {/* Avatar */}
                    <li>
                        <a href="#" className="flex items-center">
                            <img
                                src={`${backEndUrl}/${hostProfile?.profilePicture}`}
                                alt="User Avatar"
                                className="h-12 w-12 rounded-full border border-gray-300"
                            />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default HostNavBar;

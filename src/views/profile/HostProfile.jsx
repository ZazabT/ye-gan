import { useEffect, useState } from 'react';
import userAuthStore from '../../stores/UserAuthStore';
import hostProfileStore from '../../stores/HostProfile';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import HostListingCard from './components/HostListingCard';
const HostProfile = () => {
    const { getHostProfile, hostProfile, loading: hostProfileLoading, error: hostProfileError } = hostProfileStore();
    const { token, user } = userAuthStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const currentHostingLists = hostProfile?.listings?.filter(listing => listing.status === 'active' && listing.confirmed === 1);
    // const currentHostingListsCount = currentHostingLists.length;

    useEffect(() => {
        const fetchHostProfile = async () => {
            if (user && token) {
                const userId = user.id;
                if (userId) {
                    if (user.isHomeOwner) {
                        try {
                            await getHostProfile(userId, token);
                        } catch (error) {
                            console.error("Failed to fetch host profile:", error);
                        }
                    } else {
                        console.error("User is not a homeowner, redirecting to home.");
                        navigate("/");
                    }
                } else {
                    console.error("User ID is not available.");
                }
            } else {
                console.log("User or token not available, redirecting to login.");
                navigate("/login"); 
            }
        };

        fetchHostProfile();
    }, [user, token, getHostProfile, navigate]);

    if (hostProfileLoading) {
        return <div>Loading...</div>;
    }

    if (hostProfileError) {
        return <div>Error loading profile: {hostProfileError}</div>;
    }

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div>
            {/* Host Nav Bar */}
            <nav className='bg-white border-b flex justify-between items-center p-5'>
                <img src={Logo} alt="logo" className='w-20' />
                <ul className='flex items-center space-x-4'>
                    <li><a href="#" className='text-gray-600 hover:text-gray-900'>Home</a></li>
                    <li><a href="#" className='text-gray-600 hover:text-gray-900'>Listings</a></li>
                    <li><a href="#" className='text-gray-600 hover:text-gray-900'>Bookings</a></li>
                    <li><a href="#" className='text-gray-600 hover:text-gray-900'>Messages</a></li>
                </ul>
                <ul className='flex items-center space-x-4'>
                    <li><a href="#" className='text-gray-600 hover:text-gray-900'>Profile</a></li>
                    <li><a href="#" className='text-gray-600 hover:text-gray-900'>Logout</a></li>
                </ul>
            </nav>

            {/* Body */}
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-6 py-6">
                {/* Welcome Message */}
                <h1 className="text-3xl text-[#252525] font-semibold mb-4">Welcome, {hostProfile?.username}!</h1>

                {/* Navigation for Tabs */}
                <div className="flex space-x-4 mb-4">
                    {[`Current Hosting ()`, "Available Bookings", "Messages", "Reviews"].map((label, index) => (
                        <button 
                            key={index}
                            onClick={() => handleTabClick(index)} 
                            className={`py-2 px-4 rounded-full border ${activeTab === index ? 'border-black border-2': 'border-gray-300 bg-white'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div style={{ width: '100%', overflow: 'hidden' }}>
                    {activeTab === 0 && (
                        <div className="p-5 bg-[#f7f7f7] rounded-xl mb-4">
                            <div className='w-full grid lg:grid-cols-3 gap-4 sm:grid-cols-1  md:grid-cols-2'>
                              {currentHostingLists?.map((listing) => (
                                <HostListingCard key={listing.id} listing={listing} />
                              ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 1 && (
                        <div className="p-5 bg-gray-100 rounded-lg mb-4">
                            <h2 className="text-xl font-semibold">Available Bookings</h2>
                            <div>Details about available bookings...</div>
                        </div>
                    )}

                    {activeTab === 2 && (
                        <div className="p-5 bg-gray-100 rounded-lg mb-4">
                            <h2 className="text-xl font-semibold">Messages</h2>
                            <div>Your messages will appear here...</div>
                        </div>
                    )}

                    {activeTab === 3 && (
                        <div className="p-5 bg-gray-100 rounded-lg mb-4">
                            <h2 className="text-xl font-semibold">Reviews</h2>
                            <div>Your reviews will appear here...</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HostProfile;

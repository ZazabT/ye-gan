import { useEffect, useState, useRef } from 'react';
import userAuthStore from '../../../../stores/UserAuthStore';
import hostProfileStore from '../../../../stores/HostProfile';
import { useNavigate } from 'react-router-dom';
import HostNavBar from '../HostNavBar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Footer from '../../../../components/footer';

const HostListingPage = () => {
    const { getHostProfile, hostProfile, loading: hostProfileLoading, error: hostProfileError } = hostProfileStore();
    const { token, user } = userAuthStore();
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const dropdownRef = useRef(null);
    
    const navLinks = [
        { path: '/host-profile', label: 'Yegna' },
        { path: '/host-profile-listings', label: 'Listings' },
        { path: '/host-profile-bookings', label: 'Bookings' },
        { path: `/host/messages/${hostProfile?.id}`, label: 'Messages' },
    ];

    const myListings = hostProfile?.listings;
    const numberOfListings = myListings?.length;
    const backEndUrl = 'http://localhost:8000';

    const handleDropdownToggle = (id) => {
        setDropdownVisible((prev) => (prev === id ? null : id));
    };

    const handleAction = async (listingId, action) => {
        try {
            if (action === 'update') {
                console.log('Update ' + listingId);
            }
            if (action === 'delete') {
                console.log('Delete ' + listingId);
            }
        } catch (error) {
            console.error('Error handling booking action:', error);
        }
        setDropdownVisible(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchHostProfile = async () => {
            if (user && token) {
                const userId = user.id;
                if (userId && user.isHomeOwner) {
                    try {
                        await getHostProfile(userId, token);
                    } catch (error) {
                        console.error("Failed to fetch host profile:", error);
                    }
                } else {
                    navigate("/");
                }
            } else {
                navigate("/login");
            }
        };
        fetchHostProfile();
    }, [user, token, getHostProfile, navigate]);

    if (hostProfileLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (hostProfileError) {
        return <div>Error loading profile: {hostProfileError}</div>;
    }

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <HostNavBar hostProfile={hostProfile} navLinks={navLinks} />

            <div className="px-6 py-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Your Listings</h1>
                <p className="mt-2 text-gray-600">
                    Welcome to your Listings Page! Here, you can manage all the properties you have listed. Easily view the details of each listing, update information, and monitor the performance of your listings to ensure a great experience for your guests. This is where you can showcase the best of what you offer and attract potential bookings!
                </p>

                <p className="mt-1 text-black" style={{ fontWeight: '800' }}>
                  You currently have <strong>{numberOfListings}</strong> listings to review.
              </p>

            </div>
            
            {/* Main Content */}
            {numberOfListings === 0 ? (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500 font-semibold">No Listings yet.</p>
                </div>
            ) : (
                <div className="containe mx-auto px-6 py-10 ">
                    <div className="">
                        <table className="min-w-full text-left text-normal font-normal border-collapse">
                            <thead className="bg-gray-100 text-black font-bold">
                                <tr>
                                    <th className="py-4 px-5 border-b">Listing</th>
                                    <th className="py-4 px-5 text-center border-b">Bathrooms</th>
                                    <th className="py-4 px-5 text-center border-b">Bedrooms</th>
                                    <th className="py-4 px-5 text-center border-b">Beds</th>
                                    <th className="py-4 px-5 text-center border-b">Starting Date</th>
                                    <th className="py-4 px-5 text-center border-b">Ending Date</th>
                                    <th className="py-4 px-5 text-center border-b">Price per Night</th>
                                    <th className="py-4 px-5 text-center border-b">Status</th>
                                    <th className="py-4 px-5 text-center border-b">Confirmed</th>
                                    <th className="py-4 px-5 text-center border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myListings?.map((listing, index) => (
                                    <tr key={listing.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="py-4 px-5 border-r">
                                            <div className="flex items-center">
                                                <img
                                                    src={`${backEndUrl}/${listing?.item_images.find(image => image.isMain === 1).image_url}`}
                                                    className="w-12 h-12 rounded-lg"
                                                    alt={listing.title}
                                                />
                                                <span className="ml-3 truncate" style={{ maxWidth: '200px' }}>{listing.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-center border-r">{listing.bathrooms}</td>
                                        <td className="py-4 px-5 text-center border-r">{listing.bedrooms}</td>
                                        <td className="py-4 px-5 text-center border-r">{listing.beds}</td>
                                        <td className="py-4 px-5 text-center border-r">{new Date(listing.start_date).toLocaleDateString()}</td>
                                        <td className="py-4 px-5 text-center border-r">{new Date(listing.end_date).toLocaleDateString()}</td>
                                        <td className="py-4 px-5 text-center border-r">br {listing.price_per_night}</td>
                                        <td className="py-4 px-5 text-center border-r">
                                            <span className={`px-3 py-1 rounded-full font-semibold ${listing.status === 'active' ? 'bg-green-100 text-green-600' : listing.status === 'inactive' ? 'bg-yellow-100 text-yellow-600' : listing.status === 'soldout' ? 'bg-red-100 text-red-600' : listing.status === 'inactive' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-center">
                                            <span className={`px-3 py-1 rounded-full font-semibold ${listing.confirmed === 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {listing.confirmed === 1 ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-center relative" ref={dropdownRef}>
                                            <BsThreeDotsVertical
                                                className="cursor-pointer text-gray-600 hover:text-gray-800"
                                                onClick={() => handleDropdownToggle(listing.id)}
                                            />
                                            {dropdownVisible === listing.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                    {listing.bookings.length > 0 ? (
                                                        <p className="px-5 py-2 text-sm text-red-400">
                                                            There is a booking, so you can’t delete or update.
                                                        </p>
                                                    ) : (
                                                        <div>
                                                            <button
                                                                onClick={() => handleAction(listing.id, 'update')}
                                                                className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-100 transition-colors"
                                                            >
                                                                Update
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(listing.id, 'delete')}
                                                                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition-colors"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default HostListingPage;

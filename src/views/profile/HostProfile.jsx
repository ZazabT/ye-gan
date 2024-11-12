import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import userAuthStore from '../../stores/UserAuthStore';
import hostProfileStore from '../../stores/HostProfile';
import bookingStore from '../../stores/BookingStore';
import HostListingCard from './components/HostListingCard';
import HostBookingCard from './components/HostBookingCard';
import HostTodayCheckinCard from './components/HostTodayCheckinCard';
import HostNavBar from './components/HostNavBar';

const HostProfile = () => {
    const { getHostProfile, hostProfile, loading: hostProfileLoading, error: hostProfileError } = hostProfileStore();
    const { bookings, loading: bookingLoading, getMyListingBooking  , error: bookingError , getTodaysCheckins , todaysCheckins } = bookingStore();
    const { token, user } = userAuthStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const navLinks = [
        { path: '/host-profile', label: 'Yegna' },
        { path: '/host-profile-listings', label: 'Listings' },
        { path: '/host-profile-bookings', label: 'Bookings' },
        { path: `/host/messages/${hostProfile?.id}`, label: 'Messages' },
    ];

    const myListings = hostProfile?.listings;
    const currentHostingLists = useMemo(
        () => myListings?.filter(listing => listing.status === 'active' && listing.confirmed === 1),
        [myListings]
    );
    const acceptedBookings = useMemo(() => bookings?.filter(booking => booking.status === 'accepted'), [bookings]);
    const memoizedTodaysCheckins = useMemo(() => todaysCheckins, [todaysCheckins]);
    const checkedInForTodayNum =memoizedTodaysCheckins?.length; 
    

    useEffect(() => {
        const fetchHostProfile = async () => {
            if (!user || !token) {
                navigate('/login');
                return;
            }
            if (!user.isHomeOwner) {
                navigate('/');
                return;
            }
            try {
                await getTodaysCheckins(hostProfile.id, token);
                await getHostProfile(user.id, token);
                await getMyListingBooking(hostProfile.id, token);
            } catch (error) {
                console.error("Failed to fetch host profile:", error);
            }
        };

        fetchHostProfile();
    }, [user, token, getHostProfile, navigate, getMyListingBooking , hostProfile.id , getTodaysCheckins]);

    if (hostProfileLoading || bookingLoading) {
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
        <div>
            <HostNavBar hostProfile={hostProfile} navLinks={navLinks} />
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-16">
                <h1 className="text-4xl text-gray-800 font-bold mb-8">Welcome, {hostProfile?.username}!</h1>
                <p className="text-base text-gray-700 italic mb-12 leading-relaxed rounded-lg ">
                    &ldquo;Hello, {hostProfile?.username}! Your hosting dashboard awaits—an organized space where you
                    can effortlessly manage your exclusive listings, stay on top of bookings, and keep in touch with
                    guests. Dive in to handle every detail with ease, elegance, and efficiency.&rdquo;
                </p>

                {/* Tab Navigation */}
                <div className="flex space-x-4 mb-8">
                    { [ `Checkins for today (${checkedInForTodayNum})` ,`Current Hosting (${currentHostingLists?.length})`, `Accepted Bookings (${acceptedBookings?.length})`, "Messages (0)", "Reviews (0)"].map((label, index) => (
                        <button 
                            key={index}
                            onClick={() => setActiveTab(index)} 
                            className={`py-2 px-6 rounded-full text-sm font-medium transition-colors 
                            ${activeTab === index ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="w-full">
                    {activeTab === 0 && (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                            {
                                memoizedTodaysCheckins?.map(checkin => (
                                    <HostTodayCheckinCard key={checkin.id} booking={checkin} />
                                ))
                            }
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                            {currentHostingLists?.map(listing => (
                                <HostListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                            {acceptedBookings?.map(booking => (
                                <HostBookingCard key={booking.id} booking={booking} />
                            ))}
                        </div>
                    )}
                    {activeTab === 3 && (
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">Messages</h2>
                            <p className="text-gray-600">Your messages will appear here...</p>
                        </div>
                    )}
                    {activeTab === 4 && (
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">Reviews</h2>
                            <p className="text-gray-600">Your reviews will appear here...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HostProfile;

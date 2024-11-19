import { useEffect, useState, useMemo } from 'react';
import userAuthStore from '../../stores/UserAuthStore';
import guestProfileStore from '../../stores/GuestProfile';
import bookingStore from '../../stores/BookingStore';
import { useNavigate } from 'react-router-dom';
import GuestBookingCard from './components/GuestBookingCard';
import  GuestNavBar from './components/GuestNavBar';
import Footer from '../../components/footer';

const GuestProfile = () => {
    const { getGuestProfile, guestProfile, loading: guestProfileLoading, error: guestProfileError } = guestProfileStore();
    const { bookings, loading: bookingLoading, error: bookingError , getAllMyBookings } = bookingStore();
    const { token, user } = userAuthStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const navLinks = [
      { path: '/guest-profile', label: 'Yane' },
      { path: '/guest-profile-bookings', label: 'Bookings' },
      { path: `/guest/messages/${guestProfile?.id}`, label: 'Messages' },
      { path: '/guest/Profile', label: 'Profile' }
    ];

    const acceptedBookings = useMemo(() => bookings?.filter(booking => booking.status === 'accepted'), [bookings]);
    const acceptedBookingsCount = acceptedBookings?.length;

    useEffect(() => {
        const fetchGuestProfile = async () => {
            if (user && token) {
                try {
                    await getAllMyBookings(guestProfile.id, token);
                    await getGuestProfile(user.id, token);
                } catch (error) {
                    console.error("Failed to fetch guest profile:", error);
                }
            } else {
                navigate("/login"); 
            }
        };

        fetchGuestProfile();
    }, [user, token, getGuestProfile, getAllMyBookings, navigate ,guestProfile.id]);

    if (guestProfileLoading || bookingLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (guestProfileError) {
        return <div>Error loading profile: {guestProfileError}</div>;
    }

    const handleTabClick = (index) => setActiveTab(index);

    return (
        <div>
            <GuestNavBar guestProfile={guestProfile} navLinks={navLinks} />
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-16">
                <h1 className="text-4xl text-gray-800 font-bold mb-8">Welcome, {guestProfile?.username}!</h1>
                <p className="text-base text-gray-700 italic mb-12 leading-relaxed rounded-lg">
                    &ldquo;Hello, {guestProfile?.username}! Manage your bookings, messages, and reviews here to make the most of your experience.&rdquo;
                </p>

                <div className="flex space-x-4 mb-8">
                    {[`Accepted Bookings (${acceptedBookingsCount})`, "Messages (0)", "Reviews (0)"].map((label, index) => (
                        <button 
                            key={index}
                            onClick={() => handleTabClick(index)} 
                            className={`py-2 px-6 rounded-full text-sm font-medium transition-colors 
                            ${activeTab === index ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <div className="w-full">
                    {activeTab === 0 && (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                            {acceptedBookings?.map((booking) => (
                                <GuestBookingCard key={booking.id} booking={booking} />
                            ))}
                        </div>
                    )}

                    {activeTab === 1 && (
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">Messages</h2>
                            <p className="text-gray-600">Your messages will appear here...</p>
                        </div>
                    )}

                    {activeTab === 2 && (
                        <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-3">Reviews</h2>
                            <p className="text-gray-600">Your reviews will appear here...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default GuestProfile;

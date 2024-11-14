import { useEffect } from 'react';
import userAuthStore from '../../../../stores/UserAuthStore';
import guestProfileStore from '../../../../stores/GuestProfile';
import bookingStore from '../../../../stores/BookingStore';
import { useNavigate } from 'react-router-dom';
import GuestNavBar from '../GuestNavBar';
import Footer from '../../../../components/footer';

const GuestBookingPage = () => {
    const { getGuestProfile, guestProfile, loading: guestProfileLoading, error: guestProfileError } = guestProfileStore();
    const { bookings, loading: bookingLoading, getAllMyBookings, error: bookingError } = bookingStore();
    const { token, user } = userAuthStore();
    const navigate = useNavigate();
    
    const navLinks = [
        { path: '/guest-profile', label: 'My Profile' },
        { path: '/guest-profile-bookings', label: 'Bookings' },
        { path: `/guest/messages/${guestProfile?.id}`, label: 'Messages' },
        { path: '/guest/reviews', label: 'Reviews' }
    ];

    const navigateToDetails = (id) => {
        navigate(`/guest-profile-bookings/${id}`);
    };

    const numberOfBookings = bookings?.length;

    useEffect(() => {
        const fetchHostBooking = async () => {
            if (user && token) {
                const userId = user.id;
                try {
                    await getAllMyBookings(guestProfile.id, token);
                    await getGuestProfile(userId, token);
                } catch (error) {
                    console.error("Failed to fetch host profile:", error);
                }
            } else {
                navigate("/login");
            }
        };
        fetchHostBooking();
    }, [user, token, getAllMyBookings, navigate, getGuestProfile , guestProfile.id]);

    if (guestProfileLoading || bookingLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (bookingError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500 font-semibold">Error loading data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <GuestNavBar guestProfile={guestProfile} navLinks={navLinks} />


            <div className="px-6 py-6">
            <h1 className="text-3xl font-bold text-gray-800">Manage Your Reservations</h1>
            <p className="mt-4 text-lg text-gray-700">
                Welcome to your Guest Reservation Page! This is your central hub to manage all your property bookings with ease. 
                Keep track of your reservation details, confirm bookings, and stay informed about payment statuses. 
                We strive to provide you with a seamless and enjoyable experience throughout your stay.
            </p>
            <p className="mt-1 text-black" style={{ fontWeight: '800' }}>
                You currently have <span className="font-semibold text-gray-800">{numberOfBookings}</span> reservations awaiting confirmation. 
                Review your bookings and stay up to date to make your travel experience as smooth as possible.
            </p>
        </div>


            {/* Main Content */}
            <div className="px-6 py-8 container mx-auto">
                {/* Header Section */}
                {numberOfBookings === 0 ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <p className="text-gray-500 font-semibold">No Bookings yet.</p>
                    </div>
                ) : (
                    <div className="overflow-hidden">
                        {/* Bookings Table */}
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 font-semibold">
                                    <th className="py-4 px-5 border-b">Booking ID</th>
                                    <th className="py-4 px-5 text-center border-b">Booked At</th>
                                    <th className="py-4 px-5 text-center border-b">List Title</th>
                                    <th className="py-4 px-5 text-center border-b">Host Name</th>
                                    <th className="py-4 px-5 text-center border-b">Guest Count</th>
                                    <th className="py-4 px-5 text-center border-b">Check-in</th>
                                    <th className="py-4 px-5 text-center border-b">Check-out</th>
                                    <th className="py-4 px-5 text-center border-b">Total Price</th>
                                    <th className="py-4 px-5 text-center border-b">Status</th>
                                    <th className="py-4 px-5 text-center border-b">Payment Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {bookings?.map((booking, index) => (
                                    <tr
                                        key={booking.id}
                                        className={`hover:bg-gray-100 transition ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                        onClick={() => navigateToDetails(booking.id)}
                                    >
                                        <td className="py-4 px-5 border-r">{booking.id}</td>
                                        <td className="py-4 px-5 text-center border-r">{new Date(booking.created_at).toLocaleDateString()}</td>
                                        <td className="py-4 px-5 border-r">
                                            <div className="flex flex-col justify-start">
                                                <span
                                                    className="transition-colors duration-200 ease-in-out text-secondary-inverse hover:text-primary overflow-hidden whitespace-nowrap text-ellipsis"
                                                    style={{ maxWidth: '200px' }}
                                                >
                                                    {booking.listing.title}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-center border-r">
                                            {`${booking.listing.host?.user?.firstName} ${booking.listing.host?.user?.lastName}`}
                                        </td>
                                        <td className="py-4 px-5 text-center border-r">{booking.guest_count}</td>
                                        <td className="py-4 px-5 text-center border-r">{new Date(booking.checkin_date).toLocaleDateString()}</td>
                                        <td className="py-4 px-5 text-center border-r">{new Date(booking.checkout_date).toLocaleDateString()}</td>
                                        <td className="py-4 px-5 text-center border-r">${parseFloat(booking.total_price || 0).toFixed(2)}</td>
                                        <td className="py-4 px-5 text-center border-r">
                                            <span
                                                className={`px-3 py-1 rounded-full font-semibold ${booking.status === 'accepted' ? 'text-green-600 bg-green-100' : booking.status === 'rejected' ? 'text-red-600 bg-red-100' : booking.status === 'pending' ? 'text-yellow-600 bg-yellow-100' : 'text-gray-600 bg-gray-100'}`}
                                            >
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full font-semibold ${booking.payment_status === 'paid' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}
                                            >
                                                {booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default GuestBookingPage;

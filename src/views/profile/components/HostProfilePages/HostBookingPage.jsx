import { useState, useEffect ,useRef} from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import userAuthStore from '../../../../stores/UserAuthStore';
import hostProfileStore from '../../../../stores/HostProfile';
import bookingStore from '../../../../stores/BookingStore';
import HostNavBar from '../HostNavBar';
import ListingNotificationCard from '../../../../components/listing/ListingNotificationCard'; 
import Footer from '../../../../components/footer';

const HostBookingPage = () => {
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false); 
    const [notificationType, setNotificationType] = useState(''); // 'success' or 'error'
    const [notificationMessage, setNotificationMessage] = useState('');
    const { getHostProfile, hostProfile, loading: hostProfileLoading, error: hostProfileError } = hostProfileStore();
    const { bookings, loading: bookingLoading, getMyListingBooking, error: bookingError, acceptBooking, rejectBooking } = bookingStore();
    const { token, user } = userAuthStore();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();



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

    const navLinks = [
        { path: '/host-profile', label: 'Yegna' },
        { path: '/host-profile-listings', label: 'Listings' },
        { path: '/host-profile-bookings', label: 'Bookings' },
        { path: `/host/messages/${hostProfile?.id}`, label: 'Messages' },
    ];

    const numberOfBookings = bookings?.length || 0;

    const handleDropdownToggle = (id) => {
        setDropdownVisible((prev) => (prev === id ? null : id));
    };

    const showNotification = (type, message) => {
        setNotificationType(type);
        setNotificationMessage(message);
        setNotificationVisible(true);
        setTimeout(() => setNotificationVisible(false), 3000); // Hide after 3 seconds
    };

    useEffect(() => {
        if (user && token) {
          const fetchHostProfileData = async () => {
            try {
              await getHostProfile(user.id, token);
            } catch (error) {
              console.error('Failed to fetch host profile:', error);
            }
          };
          fetchHostProfileData();
        }
      }, [user, token, getHostProfile]);
      
      useEffect(() => {
        if (hostProfile?.id && token) {
          const fetchBookings = async () => {
            try {
              await getMyListingBooking(hostProfile.id, token);
            } catch (error) {
              console.error('Failed to fetch bookings:', error);
            }
          };
          fetchBookings();
        }
      }, [hostProfile?.id, token, getMyListingBooking ]);
      

    const handleAction = async (bookingId, action) => {
        try {
            if (action === 'accept') {
                await acceptBooking(bookingId, token);
                showNotification('success', 'Booking accepted successfully!');
            }

            if (action === 'reject') {
                await rejectBooking(bookingId, token);
                showNotification('success', 'Booking rejected!');
            }
            if(action === 'detail'){
                navigate(`/host-profile-booking/${bookingId}`);
            }


            await getMyListingBooking(hostProfile.id, token);
            
        } catch (error) {
            console.error('Error handling booking action:', error);
            showNotification('error', error.message );
           

        }
        setDropdownVisible(null);
    };

    if (bookingLoading || hostProfileLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (bookingError || hostProfileError) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500 font-semibold">Error loading data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <HostNavBar hostProfile={hostProfile} navLinks={navLinks} />
            <div className="px-6 py-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Your Bookings</h1>
                <p className="mt-4 text-lg text-gray-700">
                    Welcome to your Host Booking Page! This is your central hub to manage all your property bookings with ease. 
                    Stay in control of your bookings by quickly accepting or rejecting booking requests, viewing important booking details, 
                    and keeping track of payment statuses. Our goal is to ensure a smooth and seamless experience for both you and your guests!
                </p>
                <p className="mt-1 text-black" style={{ fontWeight: '800' }}>
                    You currently have <span className="font-semibold text-gray-800">{numberOfBookings}</span> bookings awaiting your review. 
                    Take action and stay up to date to provide the best experience possible.
                </p>
            </div>

            {/* Main Content */}

            {
               numberOfBookings ===0 ? (
                <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500 font-semibold">No Bookings yet.</p>
              </div>
               ) : (
                <div className="px-6 py-8 container mx-auto ">
                {/* Notification Card */}
                <ListingNotificationCard
                    visible={notificationVisible}
                    type={notificationType}
                    message={notificationMessage}
                    onClose={() => setNotificationVisible(false)}
                />

                {/* Table */}
                <div className="">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 font-semibold">
                                <th className="py-4 px-5 border-b">Booking ID</th>
                                <th className="py-4 px-5 text-center border-b">Booked At</th>
                                <th className="py-4 px-5 text-center border-b">List Title</th>
                                <th className="py-4 px-5 text-center border-b">Guest Name</th>
                                <th className="py-4 px-5 text-center border-b">Guest Count</th>
                                <th className="py-4 px-5 text-center border-b">Check-in</th>
                                <th className="py-4 px-5 text-center border-b">Check-out</th>
                                <th className="py-4 px-5 text-center border-b">Total Price</th>
                                <th className="py-4 px-5 text-center border-b">Status</th>
                                <th className="py-4 px-5 text-center border-b">Payment Status</th>
                                <th className="py-4 px-5 text-center border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 overflow-auto">
                            {bookings?.map((booking, index) => (
                                <tr key={booking.id} className={`hover:bg-gray-100 transition ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="py-4 px-5 border-r">{booking.id}</td>
                                    <td className="py-4 px-5 text-center border-r">{new Date(booking.created_at).toLocaleDateString()}</td>
                                    <td className="py-4 px-5 border-r border-stone-300">
                                        <div className="flex flex-col justify-start">
                                            <span className="transition-colors duration-200 ease-in-out text-secondary-inverse hover:text-primary overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: '200px' }}>
                                                {booking.listing.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-center border-r">{`${booking.guest?.user?.firstName} ${booking.guest?.user?.lastName}`}</td>
                                    <td className="py-4 px-5 text-center border-r">{booking.guest_count}</td>
                                    <td className="py-4 px-5 text-center border-r">{new Date(booking.checkin_date).toLocaleDateString()}</td>
                                    <td className="py-4 px-5 text-center border-r">{new Date(booking.checkout_date).toLocaleDateString()}</td>
                                    <td className="py-4 px-5 text-center border-r">${parseFloat(booking.total_price || 0).toFixed(2)}</td>
                                    <td className="py-4 px-5 text-center border-r">
                                        <span className={`px-3 py-1 rounded-full font-semibold ${booking.status === 'accepted' ? 'text-green-600 bg-green-100' : booking.status === 'rejected' ? 'text-red-600 bg-red-100' : booking.status === 'pending' ? 'text-yellow-600 bg-yellow-100' : 'text-gray-600 bg-gray-100'}`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-center">
                                        <span className={`px-3 py-1 rounded-full font-semibold ${booking.payment_status === 'paid' ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100'}`}>
                                            {booking.payment_status === 'paid' ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5 text-center relative"  ref={dropdownRef}>
                                        <BsThreeDotsVertical onClick={() => handleDropdownToggle(booking.id)} />
                                        {dropdownVisible === booking.id && (
                                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                                               <button 
                                                onClick={() => handleAction(booking.id, 'accept')} 
                                                className={`w-full px-4 py-2 text-sm text-green-600 hover:bg-green-100 ${booking.status === 'accepted' ? 'cursor-not-allowed' : ''}`} 
                                                disabled={booking.status === 'accepted'}
                                                >
                                                Accept
                                                </button>
                                                <button onClick={() => 
                                                handleAction(booking.id, 'reject')} 
                                                className={`w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 ${booking.status === 'rejected' ? 'cursor-not-allowed' : ''}`} 
                                                 disabled={booking.status === 'rejected'}>Reject</button>
                                                <button onClick={() => handleAction(booking.id, 'detail')} className="w-full px-4 py-2 text-sm text-white text-bold bg-indigo-500 hover:bg-indigo-400">Detail</button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
               )
               
            }
            

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HostBookingPage;

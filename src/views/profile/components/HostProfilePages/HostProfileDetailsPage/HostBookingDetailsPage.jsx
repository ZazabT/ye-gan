import { useParams } from "react-router-dom";
import { useEffect } from "react";
import bookingStore from "../../../../../stores/BookingStore";
import userAuthStore from "../../../../../stores/UserAuthStore";
import hostProfileStore from "../../../../../stores/HostProfile";
import HostNavBar from "../../HostNavBar";
import { use } from "framer-motion/client";

const HostBookingDetailsPage = () => {
    const { id } = useParams();
    const { getBookingById, booking, error: bookingError, loading: bookingLoading } = bookingStore();
    const { getHostProfile, hostProfile, error: hostProfileError, loading: hostProfileLoading } = hostProfileStore();
    const { token , user } = userAuthStore();

    // Update navLinks to include dynamic booking ID
    const navLinks = [
        { path: `/host-profile-booking/${id}`, label: 'Bookings' }, // Link to the same booking details page
        { path: '/message', label: 'Messages' }
    ];

    useEffect(() => {
        getBookingById(id, token);
        getHostProfile( user.id, token); 
    }, [getBookingById, id, token, getHostProfile , user.id]);

    if (bookingLoading || hostProfileLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {/* Nav bar */}
            <HostNavBar hostProfile={hostProfile} navLinks={navLinks} />
            {/* Booking details rendering logic can go here */}
            <div>
                {/* Display booking details here */}
                {bookingLoading && <p>Loading booking details...</p>}
                {bookingError && <p>Error loading booking details: {bookingError}</p>}
                {booking && <div>{/* Render booking details */}</div>}
            </div>
        </div>
    );
}

export default HostBookingDetailsPage;

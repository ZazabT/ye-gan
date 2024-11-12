import Logo from '../../../assets/logo.png';

const GuestBookingCard = ({ booking }) => {
    const backEndUrl = 'http://localhost:8000';
    const mainImage = booking?.listing?.item_images?.find(image => image.isMain === 1);
    const image = `${backEndUrl}/${mainImage.image_url}`;

    // Helper function to format the date
    const formatDateRange = (checkinDate, checkoutDate) => {
        const options = { month: 'short', day: 'numeric' };
        const checkin = new Date(checkinDate).toLocaleDateString('en-US', options);
        const checkout = new Date(checkoutDate).toLocaleDateString('en-US', options);
        return `${checkin} - ${checkout}`;
    };

    // Helper function to calculate the number of nights
    const calculateNights = (checkinDate, checkoutDate) => {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        return Math.ceil((checkout - checkin) / (1000 * 3600 * 24));
    };

    // Helper function to calculate days left until check-in
    const calculateDaysLeft = (checkinDate) => {
        const today = new Date();
        const checkin = new Date(checkinDate);
        const daysLeft = Math.ceil((checkin - today) / (1000 * 3600 * 24));
        return daysLeft > 0 ? daysLeft : 0; // Return 0 if the date has passed
    };

    const nightsStay = calculateNights(booking.checkin_date, booking.checkout_date);
    const daysLeft = calculateDaysLeft(booking.checkin_date);

    return (
        <article className="relative flex flex-col overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 max-w-sm w-full h-auto mx-auto hover:cursor-pointer flex-grow-0 flex-shrink-0">
            <img
                src={image}
                alt={booking?.listing?.title || 'Booking Image'}
                className="absolute inset-0 h-full w-full object-cover rounded-xl transition-opacity duration-300 opacity-80"
            />
            {/* Darker overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 rounded-xl"></div>
            <div className="relative z-10 p-6">
                <h3 className="text-xl font-bold text-white line-clamp-1 mb-2">{booking?.listing?.title}</h3>
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-extrabold text-teal-400">br{booking?.total_price}</span>
                    <span className="text-md font-light text-gray-300">for {booking?.guest_count} guest(s)</span>
                </div>
                <p className={`mt-1 text-md font-semibold ${booking.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                    Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </p>
                <p className="mt-1 text-md font-medium text-yellow-300">
                    Days Left for Check-in: <span className="font-bold">{daysLeft} day(s)</span>
                </p>
                <ul className="mt-4 space-y-3 text-white">
                    <li className="flex items-center text-sm">
                        <svg className="h-5 w-5 text-teal-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Guest: {booking?.guest?.user?.firstName} {booking?.guest?.user?.lastName}
                    </li>
                    <li className="flex items-center text-sm">
                        <svg className="h-5 w-5 text-teal-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {formatDateRange(booking.checkin_date, booking.checkout_date)}
                    </li>
                    {/* <li className="flex items-center text-sm">
                        <svg className="h-5 w-5 text-teal-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Nights Stay: {nightsStay}
                    </li>
                    <li className="flex items-center text-sm">
                        <svg className={`h-5 w-5 ${booking?.guest?.rating ? 'text-yellow-400' : 'text-gray-500'} mr-2`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9l-5 4.73L18.18 22 12 18.27 5.82 22 7 13.73 2 9l6.91-.74L12 2z" />
                        </svg>
                        Guest Rating: {booking?.guest?.rating !== null ? (
                            <span className="font-bold">{' ⭐'.repeat(booking.guest.rating)}</span>
                        ) : (
                            ' Not rated yet'
                        )}
                    </li> */}
                </ul>
            </div>
        </article>
    );
};

export default GuestBookingCard;

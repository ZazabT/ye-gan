import Logo from '../../../assets/logo.png';

const HostBookingCard = ({ booking }) => {
    const backEndUrl = 'http://localhost:8000';
    const mainImage = booking?.listing?.item_images.find(image => image.isMain === 1);
    const image = `${backEndUrl}/${mainImage?.image_url || Logo}`; // Fallback to logo if no image
    console.log('Booking Image: ' + image);

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
        const timeDiff = checkout - checkin; // Difference in milliseconds
        const nightCount = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert to days
        return nightCount;
    };

    const nightsStay = calculateNights(booking.checkin_date, booking.checkout_date);

    return (
        <article className="relative isolate flex flex-col overflow-hidden rounded-2xl px-15  max-w-sm w-full h-auto mx-auto hover:cursor-pointer hover:scale-105">
            <img
                src={image}
                alt={booking?.listing?.title || 'Booking Image'}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: 0.7 }} // Adjust opacity here if needed
            />
            {/* Darker overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="z-10 p-6">
                <h3 className="text-lg font-bold text-white line-clamp-1 mb-2">
                    {booking?.listing?.title}
                </h3>
                <span className="text-3xl font-extrabold text-white">${booking?.total_price}</span>
                <span className="text-lg font-medium text-white"> for {booking?.guest_count} guest(s)</span>
                <p className="text-lg font-medium text-white">Nights Stay: {nightsStay}</p>
                <span className={`text-lg font-bold ${booking.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                    Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <ul className="space-y-2 text-white mt-4">
                    <li className="flex items-center">
                        <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-md">Guest: {booking?.guest?.user?.firstName} {booking?.guest?.user?.lastName}</p>
                    </li>
                    <li className="flex items-center">
                        <svg className="h-6 w-6 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-md">{formatDateRange(booking.checkin_date, booking.checkout_date)}</p>
                    </li>
                    <li className="flex items-center">
                        <svg className="h-6 w-6 text-yellow-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9l-5 4.73L18.18 22 12 18.27 5.82 22 7 13.73 2 9l6.91-.74L12 2z" />
                        </svg>
                        <p className="text-md">
                            Guest Rating: 
                            {booking?.guest?.rating !== null ? (
                                <span className="font-bold">{' ⭐'.repeat(booking.guest.rating)}</span>
                            ) : (
                                ' Not rated yet'
                            )}
                        </p>
                    </li>
                </ul>
            </div>
        </article>
    );
};

export default HostBookingCard;

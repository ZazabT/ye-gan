// import Logo from '../../../assets/logo.png';

// const GuestBookingCard = ({ booking }) => {
//     const backEndUrl = 'http://localhost:8000';
//     const mainImage = booking?.listing?.item_images?.find(image => image.isMain === 1);
//     const image = `${backEndUrl}/${mainImage.image_url}`;

//     // Helper function to format the date
//     const formatDateRange = (checkinDate, checkoutDate) => {
//         const options = { month: 'short', day: 'numeric' };
//         const checkin = new Date(checkinDate).toLocaleDateString('en-US', options);
//         const checkout = new Date(checkoutDate).toLocaleDateString('en-US', options);
//         return `${checkin} - ${checkout}`;
//     };

//     // Helper function to calculate the number of nights
//     const calculateNights = (checkinDate, checkoutDate) => {
//         const checkin = new Date(checkinDate);
//         const checkout = new Date(checkoutDate);
//         return Math.ceil((checkout - checkin) / (1000 * 3600 * 24));
//     };

//     // Helper function to calculate days left until check-in
//     const calculateDaysLeft = (checkinDate) => {
//         const today = new Date();
//         const checkin = new Date(checkinDate);
//         const daysLeft = Math.ceil((checkin - today) / (1000 * 3600 * 24));
//         return daysLeft > 0 ? daysLeft : 0; // Return 0 if the date has passed
//     };

//     const nightsStay = calculateNights(booking.checkin_date, booking.checkout_date);
//     const daysLeft = calculateDaysLeft(booking.checkin_date);

//     return (
//         <article className="relative flex flex-col overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 max-w-sm w-full h-auto mx-auto hover:cursor-pointer flex-grow-0 flex-shrink-0">
//             <img
//                 src={image}
//                 alt={booking?.listing?.title || 'Booking Image'}
//                 className="absolute inset-0 h-full w-full object-cover rounded-xl transition-opacity duration-300 opacity-80"
//             />
//             {/* Darker overlay with gradient */}
//             <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 rounded-xl"></div>
//             <div className="relative z-10 p-6">
//                 <h3 className="text-xl font-bold text-white line-clamp-1 mb-2">{booking?.listing?.title}</h3>
//                 <div className="flex items-center space-x-2 mb-2">
//                     <span className="text-2xl font-extrabold text-teal-400">br{booking?.total_price}</span>
//                     <span className="text-md font-light text-gray-300">for {booking?.guest_count} guest(s)</span>
//                 </div>
//                 <p className={`mt-1 text-md font-semibold ${booking.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
//                     Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                 </p>
//                 <p className="mt-1 text-md font-medium text-yellow-300">
//                     Days Left for Check-in: <span className="font-bold">{daysLeft} day(s)</span>
//                 </p>
//                 <ul className="mt-4 space-y-3 text-white">
//                     <li className="flex items-center text-sm">
//                         <svg className="h-5 w-5 text-teal-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         Guest: {booking?.guest?.user?.firstName} {booking?.guest?.user?.lastName}
//                     </li>
//                     <li className="flex items-center text-sm">
//                         <svg className="h-5 w-5 text-teal-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         {formatDateRange(booking.checkin_date, booking.checkout_date)}
//                     </li>
//                     {/* <li className="flex items-center text-sm">
//                         <svg className="h-5 w-5 text-teal-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                         Nights Stay: {nightsStay}
//                     </li>
//                     <li className="flex items-center text-sm">
//                         <svg className={`h-5 w-5 ${booking?.guest?.rating ? 'text-yellow-400' : 'text-gray-500'} mr-2`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9l-5 4.73L18.18 22 12 18.27 5.82 22 7 13.73 2 9l6.91-.74L12 2z" />
//                         </svg>
//                         Guest Rating: {booking?.guest?.rating !== null ? (
//                             <span className="font-bold">{' ⭐'.repeat(booking.guest.rating)}</span>
//                         ) : (
//                             ' Not rated yet'
//                         )}
//                     </li> */}
//                 </ul>
//             </div>
//         </article>
//     );
// };

// export default GuestBookingCard;











import Logo from '../../../assets/logo.png';
import { FaCalendarAlt, FaUser, FaMoon, FaStar } from 'react-icons/fa';
import { CiMoneyCheck1 } from "react-icons/ci";

const GuestBookingCard = ({ booking }) => {
    const backEndUrl = 'http://localhost:8000';
    const mainImage = booking?.listing?.item_images.find(image => image.isMain === 1);
    const image = `${backEndUrl}/${mainImage?.image_url || Logo}`;

    const formatDateRange = (checkinDate, checkoutDate) => {
        const options = { month: 'short', day: 'numeric' };
        const checkin = new Date(checkinDate).toLocaleDateString('en-US', options);
        const checkout = new Date(checkoutDate).toLocaleDateString('en-US', options);
        return `${checkin} - ${checkout}`;
    };

    const calculateNights = (checkinDate, checkoutDate) => {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        return Math.ceil((checkout - checkin) / (1000 * 3600 * 24));
    };

    const calculateDaysLeft = (checkinDate) => {
        const today = new Date();
        const checkin = new Date(checkinDate);
        const daysLeft = Math.ceil((checkin - today) / (1000 * 3600 * 24));
        return daysLeft > 0 ? daysLeft : 0;
    };

    const nightsStay = calculateNights(booking.checkin_date, booking.checkout_date);
    const daysLeft = calculateDaysLeft(booking.checkin_date);

    return (
        <a href="3" onClick={(e) => e.preventDefault()}>
            <div className="relative flex flex-col bg-white max-w-sm w-full h-auto transition-transform transform hover:scale-95 border border-gray-100 rounded-lg border-opacity-70">
                <div className="relative h-48 overflow-hidden text-white rounded-md">
                    <img src={image} alt="Property" className="object-cover w-full h-full opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50" />
                    <div className="absolute bottom-2 left-2 text-white p-2 text-base font-semibold rounded line whitespace-nowrap text-ellipsis overflow-hidden max-w-[75%]">
                        {booking?.listing?.title || 'Property Title'}
                    </div>
                    <div className={`absolute bottom-2 right-2 p-1 text-xs text-extrabold rounded ${booking?.isPaid ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {booking?.isPaid ? 'Paid' : 'Not Paid'}
                    </div>

                    {daysLeft > 0 ? (
                            <div className="absolute top-2 left-2 bg-emerald-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                {daysLeft} Days Left
                            </div>
                        ) : daysLeft === 0 ? (
                            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                Renting
                            </div>
                        ) : daysLeft < 0 && new Date() < new Date(booking.checkout_date) ? (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                Checked Out
                            </div>
                        ) : (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                Already Checked Out
                            </div>
                        )}
                </div>

                <div className="px-4 py-2">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="text-xs bg-cyan-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                            <FaMoon />
                            <span>{nightsStay} Nights</span>
                        </div>
                        <div className="text-xs bg-yellow-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                            <FaUser />
                            <span>{booking.guest_count} Guests</span>
                        </div>
                        <div className="text-xs bg-green-600 text-white px-3 py-1 rounded-full flex items-center space-x-1">
                        <CiMoneyCheck1 className='text-base'/>
                        <span>brr {booking.total_price}</span>
                        </div>
                    </div>
                    <p className="text-slate-600 font-light text-sm mb-1">Check-in/Check-out:</p>
                    <p className="text-slate-800 font-semibold text-sm flex items-center space-x-1">
                        <FaCalendarAlt />
                        <span>{formatDateRange(booking.checkin_date, booking.checkout_date)}</span>
                    </p>
                </div>

                <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 ">
                    <div className="flex items-center">
                        {booking?.guest?.profilePicture ? (
                            <img
                                alt={booking?.guest?.username || `${booking?.guest?.user?.firstName} ${booking?.guest?.user?.lastName}`}
                                src={`${backEndUrl}/${booking?.guest?.profilePicture}`}
                                className="h-8 w-8 rounded-full"
                            />
                        ) : (
                            <div className="h-8 w-8 rounded-full bg-purple-300 flex items-center justify-center text-bold text-white">
                                {(booking?.guest?.username
                                    ? booking?.guest?.username.charAt(0)
                                    : `${booking?.guest?.user?.firstName?.charAt(0)}${booking?.guest?.user?.lastName?.charAt(0)}`) || ''}
                            </div>
                        )}
                        <div className="flex flex-col ml-2 text-xs">
                            <span className="text-slate-800 font-semibold">
                                {booking?.guest?.username || `${booking?.guest?.user?.firstName} ${booking?.guest?.user?.lastName}`}
                            </span>
                            <span className="text-slate-600">Guest</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-0">
                        <button className="text-sm font-bold text-gray-800 p-1">
                            4.5
                        </button>
                        <span>
                            <FaStar size={15} color="gold" />
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default GuestBookingCard;

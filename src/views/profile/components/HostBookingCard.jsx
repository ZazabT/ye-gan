import Logo from '../../../assets/logo.png';
import { FaCalendarAlt, FaUser, FaMoon, FaStar } from 'react-icons/fa';
import { CiMoneyCheck1 } from "react-icons/ci";

const HostBookingCard = ({ booking }) => {
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
        <a href="javascript:void(0)">
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
                                On Board
                            </div>
                        ) : daysLeft < 0 && new Date() < new Date(booking.checkout_date) ? (
                            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                They Left
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

export default HostBookingCard;

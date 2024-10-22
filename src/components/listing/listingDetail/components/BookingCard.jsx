import { useState, useMemo } from 'react';
import { DateRange } from 'react-date-range';
import { format, parseISO, addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './BookingCard.css';
import { enGB } from 'date-fns/locale';
import bookingStore from '../../../../stores/BookingStore';
import ListingNotificationCard from '../../ListingNotificationCard';
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ listing }) => {
  const { loading, error: bookingError, reserve } = bookingStore();
  const startDateParsed = parseISO(listing?.start_date);
  const endDateParsed = parseISO(listing?.end_date);
  const navigate = useNavigate();

  // Constants for fees
  const PRICE_PER_NIGHT = parseFloat(listing?.price_per_night) || 150;
  const CLEANING_FEE = 50;
  const SERVICE_FEE = 40;

  // State management
  const [guestCount, setGuestCount] = useState(1);
  const [openDate, setOpenDate] = useState(false);
  const [dateRange, setDateRange] = useState([{
    startDate: startDateParsed || new Date(),
    endDate: endDateParsed || addDays(new Date(), 2),
    key: 'selection',
  }]);
  const [notification, setNotification] = useState({ visible: false, type: '', message: '' });

  // Price calculation
  const nightCount = (dateRange[0]?.endDate - dateRange[0]?.startDate) / (1000 * 60 * 60 * 24);
  const totalBeforeTaxes = (PRICE_PER_NIGHT * nightCount) + CLEANING_FEE + SERVICE_FEE;

  // Get reserved dates
  const getReservedDates = () => {
    const reservedDates = [];
    listing?.bookings?.forEach(booking => {
      if (booking.status === 'accepted') {
        const checkinDate = parseISO(booking.checkin_date);
        const checkoutDate = parseISO(booking.checkout_date);
        // Collect all dates in the range of each booking
        for (let d = checkinDate; d <= checkoutDate; d = addDays(d, 1)) {
          reservedDates.push(d);
        }
      }
    });
    return reservedDates;
  };

  // Memoized disabled dates
  const disabledDates = useMemo(() => {
    const reservedDates = getReservedDates();
    const allDisabledDates = [];
    const currentDate = new Date();
    const maxDisabledRange = 3 * 365;

    // Disable dates outside of available range
    for (let d = addDays(startDateParsed, -1); d >= addDays(currentDate, -maxDisabledRange); d = addDays(d, -1)) {
      allDisabledDates.push(d);
    }
    for (let d = addDays(endDateParsed, 1); d <= addDays(currentDate, maxDisabledRange); d = addDays(d, 1)) {
      allDisabledDates.push(d);
    }

    // Disable all reserved dates
    return [...allDisabledDates, ...reservedDates];
  }, [listing, startDateParsed, endDateParsed]);

  const handleGuestIncrement = () => {
    if (guestCount < listing?.max_guest) {
      setGuestCount(prevCount => prevCount + 1);
    }
  };

  const handleGuestDecrement = () => {
    if (guestCount > 1) {
      setGuestCount(prevCount => prevCount - 1);
    }
  };

  // Updated Date Change Function
  const handleDateChange = (ranges) => {
    const { selection } = ranges;

    if (selection.startDate && selection.endDate) {
      setDateRange([selection]);
    }
  };

  const handleReserve = async () => {
    const checkinDate = dateRange[0]?.startDate;
    const checkoutDate = dateRange[0]?.endDate;

    console.log('Check-in Date:', checkinDate);
    console.log('Check-out Date:', checkoutDate);

    if (!checkinDate || !checkoutDate) {
      return showNotification('error', 'Please select valid check-in and check-out dates.');
    }

    // Format the dates for the API
    const formattedCheckinDate = format(checkinDate, 'yyyy-MM-dd');
    const formattedCheckoutDate = format(checkoutDate, 'yyyy-MM-dd');

    console.log('Formatted Check-in Date:', formattedCheckinDate);
    console.log('Formatted Check-out Date:', formattedCheckoutDate);

    // Log parameters before calling reserve
    console.log('Calling reserve with params:', {
      listingId: listing?.id,
      checkinDate: formattedCheckinDate,
      checkoutDate: formattedCheckoutDate,
      totalPrice: totalBeforeTaxes,
    });

    try {
      await reserve(listing?.id, formattedCheckinDate, formattedCheckoutDate, totalBeforeTaxes);
      showNotification('success', 'Successfully added your listing!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Error adding listing:', error);
      showNotification('error', error?.message || 'An error occurred while adding the listing.');
    }
  };

  const showNotification = (type, message) => {
    setNotification({ visible: true, type, message });
  };

  const closeNotification = () => {
    setNotification({ visible: false, type: '', message: '' });
  };

  return (
    <div className="max-w-md mx-auto border border-gray-300 px-12 py-3 rounded-2xl shadow-xl bg-white">
      {/* Price and Night */}
      <div className="flex items-baseline space-x-2 mb-4 mt-4">
        <h2 className="text-2xl font-semibold text-black mb-4">bir {listing?.price_per_night}</h2>
        <span className="text-gray-600">/ night</span>
      </div>

      {/* Date Range Picker */}
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <div className="relative mb-4">
            <label className="absolute top-0 left-2 text-gray-500 transform -translate-y-6 scale-75 origin-[0_0] transition-all duration-200 ease-in-out">
              Check-in
            </label>
            <input
              type="text"
              readOnly
              value={`${format(dateRange[0]?.startDate, 'MM/dd/yyyy')}`}
              className="text-gray-600 w-full h-12 border p-5 rounded-l-md py-3 border-black"
              onClick={() => setOpenDate(prev => !prev)}
            />
          </div>

          <div className="relative mb-4">
            <label className="absolute top-0 left-2 text-gray-500 transform -translate-y-6 scale-75 origin-[0_0] transition-all duration-200 ease-in-out">
              Check-out
            </label>
            <input
              type="text"
              readOnly
              value={`${format(dateRange[0]?.endDate, 'MM/dd/yyyy')}`}
              className="text-gray-600 w-full h-12 border p-5 rounded-r-md py-3 border-l-0 border-black"
              onClick={() => setOpenDate(prev => !prev)}
            />
          </div>
        </div>

        {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            showSelectionPreview={true}
            minDate={new Date()} // Allow selection from today onward
            disabledDates={disabledDates}
            rangeColors={['#5a0a8d']}
            locale={enGB}
            className="rounded-lg"
          />
        )}
      </div>

      {/* Guests Selector */}
      <div className="mb-4 relative flex justify-center items-center">
        <div className="flex justify-between items-center border border-black rounded-lg p-3">
          <button
            onClick={handleGuestDecrement}
            className="font-extrabold text-2xl px-4 text-[#5a0a8d] hover:scale-125"
          >
            -
          </button>
          <span className="text-lg">{guestCount} guest{guestCount > 1 ? 's' : ''}</span>
          <button
            onClick={handleGuestIncrement}
            className="font-extrabold text-2xl px-4 text-[#5a0a8d] hover:scale-125"
          >
            +
          </button>
        </div>
      </div>

      {/* Reserve Button */}
      <button
        className="w-full py-3 px-4 rounded-lg bg-[#5a0a8d] text-white font-semibold"
        onClick={handleReserve}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Reserve'}
      </button>

      {/* Notification */}
      {notification.visible && (
        <ListingNotificationCard
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </div>
  );
};

export default BookingCard;
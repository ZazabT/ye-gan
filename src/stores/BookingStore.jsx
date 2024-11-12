import axios from "axios";
import { ca, fi } from "date-fns/locale";
import { create } from "zustand";

const bookingStore = create((set) => ({
  // Variables
  bookings: [],
  booking: null,
  error: null,
  loading: false,
  success: null,
  todaysCheckins: [],
  guestTodayCheckins: [],

  // Functions 

  // Reserve a booking
  reserve: async (listingId, checkinDate, checkoutDate, totalPrice, guestCount) => {
    // Start loading
    set({ loading: true, error: null, success: null });

    // Log parameters before the API call
    console.log('Preparing to send request with data:', {
      listing_id: listingId,
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      total_price: totalPrice,
      guest_count: guestCount,
    });

    // Try to reserve the listing
    try {
      const response = await axios.post('http://localhost:8000/api/booking/reserve', {
        listing_id: listingId,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        total_price: totalPrice,
        guest_count: guestCount
      }, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      console.log('API response:', response);

      if (response.data.status === 201) {
        set({ success: response.data.message });
        return true;
      } else {
        throw new Error('Failed to reserve booking.');
      }
    } catch (error) {
      handleError(error, set);
    } finally {
      set({ loading: false });
    }
  },

  // Get all bookings for a specific host
  getMyListingBooking: async (id, token) => {
    set({ loading: true, error: null });

    console.log('Preparing to send request with data:', {
      listing_id: id,
    });

    try {
      const response = await axios.get(`http://localhost:8000/api/bookings/host/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('API response:', response);

      if (response.data.status === 200) {
        set({ bookings: response.data.bookings });
        console.log('Bookings:', response.data.bookings);
        return true;
      } else {
        throw new Error('Failed to retrieve host bookings.');
      }
    } catch (error) {
      handleError(error, set);
    } finally {
      set({ loading: false });
    }
  },

  // Get all bookings for a specific guest
  getAllMyBookings: async (id, token) => {
    set({ loading: true, error: null });

    console.log('Preparing to send request with data:', {
      guest_id: id,
    });

    try {
      const response = await axios.get(`http://localhost:8000/api/bookings/guest/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('API response:', response);

      if (response.data.status === 200) {
        set({ bookings: response.data.bookings });
        console.log('Bookings:', response.data.bookings);
        return true;
      } else {
        throw new Error('Failed to retrieve guest bookings.');
      }
    } catch (error) {
      handleError(error, set);
    } finally {
      set({ loading: false });
    }
  },

  // Get a booking by ID
  getBookingById: async (id, token) => {
    set({ loading: true, error: null });

    console.log('Preparing to send request with data:', {
      booking_id: id,
    });

    try {
      const response = await axios.get(`http://localhost:8000/api/booking/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('API response:', response);

      if (response.data.status === 200) {
        set({ booking: response.data.booking });
        console.log('Booking:', response.data.booking);
        return true;
      } else {
        throw new Error('Failed to retrieve booking.');
      }
    } catch (error) {
      handleError(error, set);
    } finally {
      set({ loading: false });
    }
  },

   // Accept the booking
   acceptBooking: async (id, token) => {

    // try to accept the booking
    try{
      // start loading
      set({ loading: true, error: null, success: null });

      // log parameters before the API call
      console.log('Preparing to send request with data:', {
        booking_id: id,
      });

      // try to accept the booking
      const response = await axios.put(`http://localhost:8000/api/booking/acceptbooking/${id}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // log the API response
      console.log('API response:', response);
      // check if the API call was successful
      if (response.data.status === 200) {
        set({ success: response.data.message });
        return true;
      } else {
        throw new Error('Failed to accept booking.');
      }
    } catch (error) {
      // handle the error
      handleError(error, set);
    }finally {
      // stop loading
      set({ loading: false });
    }

  },


  // reject the booking'
  rejectBooking: async (id, token) => {

    // try to reject the booking
    try{
      // start loading
      set({ loading: true, error: null, success: null });

      // log parameters before the API call
      console.log('Preparing to send request with data:', {
        booking_id: id,
      });

      // try to reject the booking
      const response = await axios.put(`http://localhost:8000/api/booking/rejectbooking/${id}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // log the API response
      console.log('API response:', response);
      // check if the API call was successful
      if (response.data.status === 200) {
        set({ success: response.data.message });
        return true;
      } else {
        throw new Error('Failed to reject booking.');
      }
    } catch (error) {
      // handle the error
      handleError(error, set);
    }finally {
      // stop loading
      set({ loading: false });
    }
    },
  
  // get todays checkins for the host 
  getTodaysCheckins: async (id, token) => {
    // try to get todays checkins
    try{
      // start loading
      set({ loading: true, error: null });
      
      // log parameters before the API call
      console.log('Preparing to send request with data:', {
        host_id: id,
      });

      // try to get todays checkins
      const response = await axios.get(`http://localhost:8000/api/bookings/host/today/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // log the API response
      console.log('API response:', response);

      // check if the status is 200
      if(response.data.status === 200){
        set({ todaysCheckins: response.data.bookings });
        return true;
      } else {
        throw new Error('Failed to get todays checkins.');
      }
    }catch (error) {
      // handle the error
      handleError(error, set);
    }finally {
      // stop loading
      set({ loading: false });
    }
    
  },


  // get todays checkins for the guest
  getTodaysCheckinsGuest: async (id, token) => {
    
  }
}));


 

// Helper function for handling errors
const handleError = (error, set) => {
  if (error.response) {
    console.error('Error response:', error.response.data.message);
    set({ error: error.response.data.error });
  } else if (error.request) {
    console.error('Error request:', error.request);
    set({ error: 'No response received from the server.' });
  } else {
    console.error('Error message:', error.message);
    set({ error: 'An error occurred while processing the request.' });
  }
  throw new Error('An unexpected error occurred.');
};

export default bookingStore;

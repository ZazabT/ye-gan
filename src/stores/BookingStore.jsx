import axios from "axios";
import { create } from "zustand";


const bookingStore = create((set) =>({
  // Variables
  bookings : [],
  error: null,
  loading: false,



  // Functions 

              // reserve
              reserve: async (listingId, checkinDate, checkoutDate, totalPrice) => {
                // Start loading
                set({ loading: true });
            
                // Log parameters before the API call
                console.log('Preparing to send request with data:', {
                    listing_id: listingId,
                    checkin_date: checkinDate,
                    checkout_date: checkoutDate,
                    total_price: totalPrice,
                });
            
                // Try to reserve the listing
                try {
                    const response = await axios.post('http://localhost:8000/api/booking/reserve', {
                        listing_id: listingId,
                        checkin_date: checkinDate,
                        checkout_date: checkoutDate,
                        total_price: totalPrice,
                    }, { 
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
                    });
            
                    // Log the entire response object
                    console.log('API response:', response);
            
                    // Check if the response is ok 
                    if (response.data.status === 201) {
                        set({ success: response.data.message });
                        return true;
                    } else {
                        throw new Error('Failed to add listing.'); 
                    }
                } catch (error) {
                    if (error.response) {
                        console.error('Error response:', error.response.data);
                        set({ error: error.response.data.error }); 
                        throw new Error(`Error from server: ${error.response.data.error}`); 
                    } else if (error.request) {
                        console.error('Error request:', error.request);
                        set({ error: 'No response received from the server.' }); 
                        throw new Error('No response received from the server.'); 
                    } else {
                        console.error('Error message:', error.message);
                        set({ error: 'An error occurred while adding the listing.' }); 
                        throw new Error('An unexpected error occurred.'); // Change to a more specific error
                    }
                } finally {
                    set({ loading: false });
                }
            },
            


              // get all booking for spasific Host 
              getMyListingBooking : async (id) =>{

              },

              // gett all booking for spasific guest 
              getAllMyBookings: async (id) =>{

              }
              
}));  



export default bookingStore;
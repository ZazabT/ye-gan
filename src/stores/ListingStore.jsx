import axios from "axios";
import { create } from "zustand";

const listingStore = create((set) => ({
    // State variables
    listings: [],
    myListings: [],
    listing: {},
    error: null,
    success: null,
    loading: false,
    formData: {
        categories: [],
        title: '',
        description: '',
        images: [],
        beds: '',
        max_guest: '',
        bedrooms: '',
        bathrooms: '',
        location_id: '',
        rules: '',
        price_per_night: '',
        start_date: '',
        end_date: '',
    },
    
    // Functions
    // Set form data
    setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
    
    // Clear form data
    clearFormData: () => set(() => ({
        formData: {
            categories: [],
            title: '',
            description: '',
            images: [],
            beds: '',
            max_guest: '',
            bedrooms: '',
            bathrooms: '',
            location_id: '',
            rules: '',
            price_per_night: '',
            start_date: '',
            end_date: '',
        },
    })),
    
    // Add listing
    addListing: async (formData) => {
        set({ loading: true, error: null, success: null }); // Reset error and success
        try {
            const response = await axios.post('http://localhost:8000/api/listings/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
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
                throw new Error(error.response.data.error); 
            } else if (error.request) {
                console.error('Error request:', error.request);
                set({ error: 'No response received from the server.' }); 
                throw new Error('No response received from the server.'); 
            } else {
                console.error('Error message:', error.message);
                set({ error: 'An error occurred while adding the listing.' }); 
                throw new Error('An error occurred while adding the listing.');
            }
        } finally {
            set({ loading: false });
        }
    },
    

    // Get all listings
    getAllListing: async () => {
        set({ loading: true, error: null }); // Reset error
        try {
            const response = await axios.get('http://localhost:8000/api/listings');
            if (response.data.status === 200) {
                set({ listings: response.data.listings });
            }
        } catch (error) {
            set({ error: error.response?.data?.error || 'Failed to fetch listings.' });
        } finally {
            set({ loading: false });
        }
    },

    // Get a specific listing
    getListing: async (id) => {
        set({ loading: true, error: null }); // Reset error
        try {
            const response = await axios.get(`http://localhost:8000/api/listing/${id}`);
            if (response.data.status === 200) {
                set({ listing: response.data.listing });
            }
        } catch (error) {
            set({ error: error.response?.data?.error || 'Failed to fetch listing.' });
        } finally {
            set({ loading: false });
        }
    },

   
}));

export default listingStore;

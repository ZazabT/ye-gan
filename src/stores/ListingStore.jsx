import axios from "axios";
import { create } from "zustand";

const listingStore = create((set) => ({
    // State variables
    listings: [],
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
                return true; // Indicate success
            } else {
                throw new Error('Failed to add listing.'); // Throw error if status is not 201
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                set({ error: error.response.data.error }); // Set error message
                throw new Error(error.response.data.message); // Throw error for handling in handleSubmit
            } else if (error.request) {
                console.error('Error request:', error.request);
                set({ error: 'No response received from the server.' }); // Generic error message
                throw new Error('No response received from the server.'); // Throw error for handling in handleSubmit
            } else {
                console.error('Error message:', error.message);
                set({ error: 'An error occurred while adding the listing.' }); // Generic error message
                throw new Error('An error occurred while adding the listing.'); // Throw error for handling in handleSubmit
            }
        } finally {
            set({ loading: false });
        }
    },
    

    // Get all listings
    getAllListing: async () => {
        set({ loading: true, error: null }); // Reset error
        try {
            const response = await axios.get('http://localhost:8000/api/listing');
            if (response.data.status === 200) {
                set({ listings: response.data.listings });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || 'Failed to fetch listings.' });
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
            set({ error: error.response?.data?.message || 'Failed to fetch listing.' });
        } finally {
            set({ loading: false });
        }
    },
}));

export default listingStore;

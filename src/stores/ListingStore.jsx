import axios from "axios";
import { create } from "zustand";


const listingStore = create((set) => ({
    // variables
    listings: [],
    error: null,
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
        location: '',
        rules: '',
        price_per_night: '',
        start_date: '',
        end_date: '',

    },
    
    // Functions
                 // setFormData
                        setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
                // clearFormData
                        clearFormData: () => set(() => ({
                            formData: {
                                category: '',
                                title: '',
                                description: '',
                                images: [],
                                beds: '',
                                maxGuests: '',
                                bedrooms: '',
                                bathrooms: '',
                                rules: '',
                                price: '',
                                startDate: '',
                                endDate: '',
                            },
                        })),
                                
                // addListing
                        addListing: async (formData) => {
                            set({ loading: true });
                            try {
                                const response = await axios.post('http://localhost:8000/api/listing', formData);
                                if (response.data.status === 201) {
                                    set({ success: response.data.message });
                                }
                            } catch (error) {
                                set({ error: error.response.data.message });
                            } finally {
                                set({ loading: false });
                            }
                        },
                
                
                // getAllListing
                        getAllListing: async () => {
                            set({ loading: true });
                            try {
                                const response = await axios.get('http://localhost:8000/api/listing');
                                if (response.data.status === 200) {
                                    set({ listings: response.data.listings });
                                }
                            } catch (error) {
                                set({ error: error.response.data.message });
                            } finally {
                                set({ loading: false });
                            }
                        },

                
                // getListing
                        getListing: async (id) => {
                            set({ loading: true });
                            try {
                                const response = await axios.get(`http://localhost:8000/api/listing/${id}`);
                                if (response.data.status === 200) {
                                    set({ listing: response.data.listing });
                                }
                            } catch (error) {
                                set({ error: error.response.data.message });
                            } finally {
                                set({ loading: false });
                            }
                        },
    
}));






export default listingStore
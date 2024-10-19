import axios from "axios";
import { create } from "zustand";

const listingStore = create((set) => ({
    // variables
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
                                max_guest: '',
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
                                const response = await axios.post('http://localhost:8000/api/listings/create', formData ,{
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                                    },
                                });
                                if (response.data.status === 201) {
                                    set({ success: response.data.message });
                                }
                            } catch (error) {
                                if (error.response) {
                                    // The request was made and the server responded with a status code
                                    console.error('Error response:', error.response.data);
                                    console.error('Error status:', error.response.status);
                                } else if (error.request) {
                                    // The request was made but no response was received
                                    console.error('Error request:', error.request);
                                } else {
                                    // Something happened in setting up the request that triggered an Error
                                    console.error('Error message:', error.message);
                                }
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
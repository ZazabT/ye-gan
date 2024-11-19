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
    backendUrl: 'http://localhost:8000',

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
             // Log the data before making the API request
        console.log('Preparing to send PUT request with data:', formData);
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

    // Update listing
   // Update listing
updateListing: async (id, formData, token) => {
    set({ loading: true, error: null, success: null }); // Start loading

    // Destructure formData for easy access
    const {
        categories,
        title,
        description,
        images,
        beds,
        max_guest,
        bedrooms,
        bathrooms,
        location_id,
        rules,
        price_per_night,
        start_date,
        end_date,
    } = formData;

    try {
        // Prepare the JSON object to send in the PUT request
        const updatedData = {
            categories,
            title,
            description,
            images,
            beds,
            max_guest,
            bedrooms,
            bathrooms,
            location_id,
            rules,
            price_per_night,
            start_date,
            end_date,
        };

        // Log the data before making the API request
        console.log('Preparing to send PUT request with data:', updatedData);

        // Send the PUT request
        const response = await axios.put(
            `http://localhost:8000/api/listing/update/${id}`,
            updatedData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        // Log the API response
        console.log('API response:', response);

        // Check if the API call was successful
        if (response.data.status === 200) {
            set({ success: response.data.message });
            return true;
        } else {
            throw new Error('Failed to update listing.');
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
            set({ error: 'An error occurred while updating the listing.' });
            throw new Error('An error occurred while updating the listing.');
        }
    } finally {
        set({ loading: false }); // Stop loading
    }
},



    // Delete listing
    deleteListing: async (id , token) => {
        // Start loading
        set({ loading: true, error: null });

        //try to delete lising with id 
        try{
            // Log parameters before the API call
            console.log('Preparing to send delete request with data Listing id:', {
                id,
            });
            const response = await axios.delete(`http://localhost:8000/api/listing/delete/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Log the API response
            console.log('API response:', response);

            //check if the API call was successful
            if (response.data.status === 200) {
                set({ success: response.data.message });
                return true;
            } else {
                throw new Error('Failed to delete listing.');
            }

        }catch (error) {
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
    getListing: async (id ) => {

        set({ loading: true, error: null }); 
        try {
            
            // Log parameters before the API call
            console.log('Preparing to send get request with data Listing id:', {
                id,
            });

            const response = await axios.get(`http://localhost:8000/api/listing/getList/${id}`);
            if (response.data.status === 200) {
                // Set the listing data
                set({ listing: response.data.listing });

                // Log the API response
                console.log('API response:', response);

            // Define a function to format the date
            const  formatDate = (date) => {
                    const d = new Date(date);
                    return d.toISOString().split('T')[0]; 
                };

            // Use the store's formatDate method
            const startDate = formatDate(response.data.listing.start_date);
            const endDate = formatDate(response.data.listing.end_date);
                // Populate the formData state with the listing data
                set({
                    formData: {
                        categories: response.data.listing.categories || [],
                        title: response.data.listing.title || '',
                        description: response.data.listing.description || '',
                        images: response.data.listing.item_images|| [],
                        beds: response.data.listing.beds || '',
                        max_guest: response.data.listing.max_guest || '',
                        bedrooms: response.data.listing.bedrooms || '',
                        bathrooms: response.data.listing.bathrooms || '',
                        location_id: response.data.listing.location_id || '',
                        rules: response.data.listing.rules || '',
                        price_per_night: response.data.listing.price_per_night || '',
                        start_date: startDate || '',
                        end_date: endDate || '',

                    },
                });
            }
        } catch (error) {
            set({ error: error.response?.data?.error || 'Failed to fetch listing.' });
        } finally {
            set({ loading: false });
        }
    },
    

    // get all listing for spasific Host
    getMyListing: async (id) => {
        set({ loading: true, error: null }); // Reset error
        try {
            const response = await axios.get(`http://localhost:8000/api/listing/my/${id}`);
            if (response.data.status === 200) {
                set({ myListings: response.data.listings });
            }
        } catch (error) {
            set({ error: error.response?.data?.error || 'Failed to fetch listings.' });
        } finally {
            set({ loading: false });
        }
    },
}));

export default listingStore;

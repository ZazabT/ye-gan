import axios from "axios";
import { create } from "zustand";

const geustProfileStore = create((set) => ({
    guestProfile: {},
    error: null,
    success: null,
    loading: false,
    formData: {
        username: '',
        profilePicture:'',
        phone_number: '',
        rating: '',
         
    },


        // setData
        setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),

        //clearData
        clearFormData: () => set((state) => ({ formData: { ...state.formData } })),

        // createHostProfile
        createGuestProfile: async (formData) => {
            set({ loading: true, error: null });
            try {
                const response = await axios.post('http://localhost:8000/api/host/create', formData ,{
                    headers :{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.status === 200) {
                    set({ success: response.data.message });
                }
            } catch (error) {
                set({ error: error.response.data.error});
            } finally {
                set({ loading: false });
            }
        },

        // getHostProfile
        getGuestProfile: async (id, token) => {
            // Start loading
            set({ loading: true, error: null });
        
            // Try to get guest profile
            console.log("00000000");
            try {
                console.log("!!!!!!!!!!!!!!!");
                console.log('Fetching guest profile for ID:', id);
                const response = await axios.get(`http://localhost:8000/api/guest/profile/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                console.log('Response received:', response); // Debugging log
        
                if (response.data.status === 200) {
                    set({ guestProfile: response.data.guestProfile[0] });
                    set({ success: response.data.message });
                } else {
                    console.error('Unexpected status code:', response.data.status); // Debugging log for unexpected status
                    set({ error: 'Unexpected response status' });
                }
        
                console.log('Guest profile:', response.data.guestProfile); 
            } catch (error) {
                console.error('Error fetching guest profile:', error); 
                if (error.response) {
                    // Server responded with a status other than 200
                    console.error('Response data:', error.response.data); // Log response data
                    console.error('Response status:', error.response.status); // Log response status
                    console.error('Response headers:', error.response.headers); // Log response headers
                    set({ error: error.response.data.error });
                } else if (error.request) {
                    // Request was made but no response received
                    console.error('Request data:', error.request); // Log request data
                    set({ error: 'No response received from the server' });
                } else {
                    // Something happened in setting up the request
                    console.error('Error message:', error.message); // Log error message
                    set({ error: 'Error in setting up the request' });
                }
            } finally {
                set({ loading: false });
            }
        },
        
        // update host profile
        updateGuestProfile: async (formData , id) => {
            set({ loading: true, error: null });
            try {
                const response = await axios.post(`http://localhost:8000/api/host/profile/update/${id}`, formData, {
                    headers :{
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.status === 200) {
                    set({ success: response.data.message });
                    set({ hostProfile: response.data.hostProfile });
                }
            } catch (error) {
                set({ error: error.response.data.error});
            } finally {
                set({ loading: false });
            }
        }
}));







export default geustProfileStore;
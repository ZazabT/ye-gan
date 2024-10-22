import axios from "axios";
import { create } from "zustand";

const hostProfileStore = create((set) => ({
    hostProfile: {},
    error: null,
    success: null,
    loading: false,
    hostListing: [],
    formData: {
        username: '',
        hostDescription: '',
        profilePicture:'',
        country: '',
        city: '',
        region: '',
        phone_number: '',
        facebook: '',
        instagram: '',
        telegram: '',
        tiktok: '',
        frontIdImage: '',
        backIdImage: '',
    },


        // setData
        setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),

        //clearData
        clearFormData: () => set((state) => ({ formData: { ...state.formData } })),

        // createHostProfile
        createHostProfile: async (formData) => {
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
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    set({ error: error.response.data.error }); 
                    throw new Error(error.response.data.message); 
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

        // getHostProfile
        getHostProfile:async (id) =>{
                    // start loading
                    set({ loading: true, error: null });

                    //try to get user profile
                    try {
                        const response = await axios.get(`http://localhost:8000/api/host/profile/${id}`, {} , {
                            headers :{
                                'Content-Type': 'multipart/form-data',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                        if(response.data.status === 200){
                            set({ hostProfile: response.data.hostProfile });
                            set({ success: response.data.message });
                        }
                    } catch (error) {
                        set({ error: error.response.data.error});
                    } finally {
                        set({ loading: false });
                    }
        },

        // update host profile
        updateHostProfile: async (formData , id) => {
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







export default hostProfileStore;
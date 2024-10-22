import { rating } from "@material-tailwind/react";
import axios from "axios";
import { create } from "zustand";

const geustProfileStore = create((set) => ({
    hostProfile: {},
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
        getGuestProfile:async (id) =>{
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
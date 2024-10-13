import axios from "axios";
import { create } from "zustand";


const catagoryStore = create((set) => ({
    catagories:[],
    error: null,
    loading: false,
    getCatagories: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("http://localhost:8000/api/categories")
            if(response.data.status === 200){
            set({ catagories: response.data.categories });
            }
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ loading: false });
        }
    },
}));





export default catagoryStore;
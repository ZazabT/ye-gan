import axios from "axios";
import { create } from "zustand";



const listingStore = create((set) => ({
    listings: [],
    error: null,
    loading: false,
    getListing: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("http://localhost:8000/api/listings");
            if (response.status === 200) {
                set({ listings: response.data.listings });
            }
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ loading: false });
        }
    },
}));



export default listingStore
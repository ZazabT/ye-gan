import axios from "axios";
import { create } from "zustand";

const categoryStore = create((set) => ({
    catagories: [],
    error: null,
    loading: false,

    getCatagories: async () => {
        set({ loading: true, error: null }); // Reset error on fetch start
        try {
            const response = await axios.get("http://localhost:8000/api/categories");
            if (response.data.status === 200) {
                set({ catagories: response.data.categories });
            } else {
                set({ error: "Failed to fetch categories." });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default categoryStore;

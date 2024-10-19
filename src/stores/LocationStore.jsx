import axios from "axios";
import { create } from "zustand";

const locationStore = create((set) => ({
    locations: [],
    error: null,
    loading: false,

    getAllLocations: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("http://localhost:8000/api/locations");
            if (response.data.status === 200) {
                set({ locations: response.data.locations });
            } else {
                set({ error: "Failed to fetch locations." });
            }
        } catch (error) {
            set({ error: error.response ? error.response.data.message : error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default locationStore;

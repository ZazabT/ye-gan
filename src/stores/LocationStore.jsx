import axios from "axios";
import { create } from "zustand";


const locationStore = create((set) => ({
    // variables
    locations: [],
    error: null,
    loading: false,


    // function 
              
               // get all locations
               getAllLocations: async () => {
                   set({ loading: true });
                   try {
                       const response = await axios.get("http://localhost:8000/api/locations");
                       if (response.data.status === 200) {
                           set({ locations: response.data.locations });
                       }
                   } catch (error) {
                       set({ error: error.response.data.message });
                   } finally {
                       set({ loading: false });
                   }
               }
}));






export default locationStore;
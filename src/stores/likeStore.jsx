import axios from "axios";
import { create } from "zustand";

const likeStore = create((set) => ({
  // State for tracking if a listing is liked and like count
  liked: false,
  likeCount: 0,
  loading: false,

  // Action to toggle like
  toggleLike: async (listingId) => {
    try {
      // Send a POST request to toggle the like status
      const response = await axios.post(`/listings/${listingId}/like` , 
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      if (response.data.status) {
        // Update the store with the new like status and count
        set({
          liked: response.data.liked,
          likeCount: response.data.like_count
        });
      }
    } catch (error) {
      console.error("Error toggling like", error);
    }
  },

  // Fetch liked listings for the user
  fetchLikedListings: async (userId) => {
    try {
      const response = await axios.get( `/listings/likedListings/${userId}` ,
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      if (response.data.status === 200) {
        // Process the response and store liked listings if needed
        // For example, store them as an array in the state
        set({
          likedListings: response.data.listings,
        });
      }
    } catch (error) {
      console.error("Error fetching liked listings", error);
    }
  },
  likedListings: [],
}));

export default likeStore;

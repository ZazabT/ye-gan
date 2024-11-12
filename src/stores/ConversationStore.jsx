import axios from "axios";
import { create } from "zustand";



const conversationStore = create((set , get) => ({
    users: [],
    messages: [],
    error: null,
    loading: false,


    // sayHi function
    sayHi: async (hostId, guestId, bookingId, token) => {
        try{
            set({ loading: true, error: null });
            // log parameters before the API call
            console.log("Preparing to send request with data:", {
                host_id: hostId,
                guest_id: guestId,
                booking_id: bookingId,
                token:token
            })
            const response = await axios.post(`http://localhost:8000/api/sayHi`,{
                'host_id' : hostId, 
                'guest_id' : guestId,
                'booking_id' : bookingId
            },
            
            {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("API response:", response);
            if (response.data.status === 200) {
                // set({ conversations: response.data.conversations });
                console.log("Conversations:", response.data.conversation);
                return true;
            } else {
                throw new Error("Failed to retrieve conversations.");
            }
        } catch (error) {
           set({error:error.response.data.error});
        } finally {
            set({ loading: false });
        }
    },

    // get all users that have conversation with
    usersConversationWith: async (id, token) => {
        try{
            set({ loading: true, error: null });
            const response = await axios.get(`http://localhost:8000/api/usersConversationWith/${id}`,{
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("API response:", response);
            if (response.data.status === 200) {
                set({ users: response.data.users });
                console.log("Users:", response.data.users);
                return true;
            } else {
                throw new Error("Failed to retrieve users.");
            }
        } catch (error) {
           set({error:error.response.data.error});
        } finally {
            set({ loading: false });
        }
    },

    // get message fot the conversation
    getMessageForConversation: async (id, token) => {
        console.log('Function Called');
        try{
            set({loading:true});
            const response = await axios.get(`http://localhost:8000/api/getConversationMessages/${id}`,{
                headers: { 'Authorization': `Bearer ${token}` }
            })
            console.log("API response:", response);
            if (response.data.status === 200) {
                set({ messages: response.data.messages });
                console.log("Messages:", response.data.messages);
                // console.log('Messages:', get().messages);
                return true;
            } else {
                throw new Error("Failed to retrieve messages.");
            }
        } catch (error) {
           set({error:error.response.data.error});
        } finally {
            set({ loading: false });
        }
    }

}));




export default conversationStore;
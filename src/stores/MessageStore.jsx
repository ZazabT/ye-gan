import axios from "axios";
import { create } from "zustand";

const messageStore = create((set) => ({
    messages: [],
    error: null,
    loading: false,

    // Functions
    sendMessage: async (conversationId, message , token , senderId) => {

        try {
            set({ loading: true });
            const response = await axios.post(`http://localhost:8000/api/sendmessage`, { 
                conversation_id: conversationId,
                message: message,
                sender_id: senderId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("API response:", response);
            if (response.data.status === 200) {
                set({ messages: response.data.messages });
                console.log("Messages:", response.data.messages);
                return true;
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error("Error:", error);
            set({ error: error.response?.data?.error || "Failed to send message" });
            return false;
        } finally {
            set({ loading: false });
        }
        
    }
    
}));




export default messageStore;

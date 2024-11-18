import axios from "axios";
import { create } from "zustand";

const userAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null, // Store user data from localStorage if available
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
    loading: false,

    // Login
    login: async (email, password) => {
        set({ loading: true });

        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            if (response.data.status === 200) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data in localStorage
                set({ user: response.data.user, token: response.data.access_token, isAuthenticated: true });
                console.log('User logged in successfully. user' , response.data.user);
            }
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ loading: false });
        }
    },

    // Register
    register: async (firstName, lastName, email, password, password_confirmation, age) => {
        set({ loading: true });

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                firstName,
                lastName,
                email,
                password,
                password_confirmation,
                age,
            });

            if (response.data.status === 201) {
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data in localStorage
                set({ user: response.data.user, token: response.data.access_token, isAuthenticated: true });
            }

        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ loading: false });
        }
    },

    // Logout
    logout: async () => {
        set({ loading: true });
        
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.post('http://localhost:8000/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('user'); // Clear user data from localStorage
                set({ token: null, user: null, isAuthenticated: false });
            }
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ loading: false });
        }
    },

    // Check if there is a user
    checkAuth: async () => {
        const token = localStorage.getItem('token');
        if (token) {
            set({ loading: true });
            try {
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                set({
                    user: response.data,
                    loading: false, 
                    isAuthenticated: true
                });
                
            } catch (error) {
                set({ error: error.response.data.message });
                localStorage.removeItem('token');
                localStorage.removeItem('user'); // Clear user data if token is invalid
                set({
                    user: null,
                    token: null,
                    loading: false, 
                    isAuthenticated: false,
                });
            } finally {
                set({ loading: false });
            }
        } else {
            console.log('No token found.');
        }
    }
}));

export default userAuthStore;

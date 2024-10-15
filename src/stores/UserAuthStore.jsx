import axios from "axios"; 
import { create } from "zustand";

const userAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    error: null,
    loading: false,

    // Login
    login: async (email, password) => {
        set({ loading: true });

        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            console.log(response); // Debugging log
            if (response.data.status === 200) {
                localStorage.setItem('token', response.data.access_token);
                set({ user: response.data.user, token: response.data.access_token, isAuthenticated: true });
                console.log('Login successful:', response.data.user); // Debugging log
            } 
        } catch (error) {
            set({ error: error.response.data.message });
            console.error('Login error:', error.response.data.message); // Debugging log
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
                set({ user: response.data.user, token: response.data.access_token, isAuthenticated: true });
                console.log('Registration successful:', response.data.user); // Debugging log
            }

        } catch (error) {
            set({ error: error.response.data.message });
            console.error('Registration error:', error.response.data.message); // Debugging log
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
                set({ token: null, user: null, isAuthenticated: false });
                console.log('Logout successful'); // Debugging log
            }
        } catch (error) {
            set({ error: error.response.data.message });
            console.error('Logout error:', error.response.data.message); // Debugging log
        } finally {
            set({ loading: false });
        }
    },

    // Check if there is a user
    checkAuth: async () => {
        set({ loading: true });
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('User data retrieved:', response.data); // Debugging log
                set({
                    user: response.data,
                    loading: false, 
                    isAuthenticated: true
                });
            } catch (error) {
                console.error('Token validation failed:', error);
                set({ error: error.response.data.message });
                localStorage.removeItem('token');
                set({
                    user: null,
                    token: null,
                    loading: false, 
                    isAuthenticated: false,
                });
            }
        } else {
            console.log('No token found.');
            set({ loading: false, isAuthenticated: false }); 
        }
    }
}));

export default userAuthStore;

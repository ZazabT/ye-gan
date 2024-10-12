import axios from "axios"; 
import { create } from "zustand";


const userAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token')|| null,
    isAuthenticated: !!localStorage.getItem('token'),
    error:null,
    loding: false,  


    // Login
    login: async (email, password) => {
        set({ loding: true });
        
        // try to log in 
        try {
            const response = await axios.post('http://localhost:8000/api/login', {email, password});
            // if status 200

             if(response.data.status ==200){
                localStorage.setItem('token', response.data.access_token);
                set({ user: response.data.user, token: response.data.access_token, isAuthenticated: true });
                
             }

        } catch (error) {
            set({ error: error.response.data.message });
        }finally{
            set({ loding: false });
        }
        
    },


    // Register

    register: async (firstName , lastName , email , password  , password_confirmation , age , currentLocation) =>{
           // set loding to true
           set({loding:true}); 

           // try to register 
           try{
            const response = await axios.post('http://localhost:8000/api/register' , {
                firstName ,
                 lastName ,
                  email ,
                   password ,
                    password_confirmation  ,
                     age ,
                      currentLocation});

                      // if status is 200 

                      if(response.data.status == 200){
                        localStorage.setItem('token', response.data.access_token);
                        set({ user: response.data.user, token: response.data.access_token, isAuthenticated: true });
                      }

  
           } catch (error){
               set({error: error.response.data.message});
           }finally{
            set({loding:false});
           }
        },



        // Logout
        logout: async () => {
              set({loding:true});
              
              // check if there is a token or user first 
              const token = localStorage.getItem('token');
              if(!token) return;

              // try to logout

              try {
                const response = await axios.post('http://localhost:8000/api/logout', {}, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });

                 // if status 200 
                 if(response.data.status == 200){
                    // remove the localstorage token 
                    localStorage.removeItem('token');
                    set({token:null , user: null, isAuthenticated: false });
                 }
              } catch (error) {
                set({error : error.response.data.message});
              }finally{
                set({loding : false});
              }
        },

        // cheack if there is user 

        cheackAuth: async () =>{
            set({ loading: true });
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    set({
                        user: response.data.user,
                        token: response.data.access_token,
                        loading: false, 
                        isAuthenticated: true
                    });
                } catch (error) {
                    console.error('Token validation failed:', error);
                    set({error : error.response.data.message});
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
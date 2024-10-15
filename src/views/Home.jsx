import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Catagory from "../components/catagory/Catagory"; 
import userAuthStore from "../stores/UserAuthStore";
const Home = () => {
    const {isAuthenticated , checkAuth} = userAuthStore();
    useEffect(() => {
        checkAuth()
    }, [checkAuth , isAuthenticated]) 
    return (
        <div>
           <Navbar />
           <Catagory/>
        </div>
        
    );
}

export default Home;

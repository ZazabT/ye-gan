import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Catagory from "../components/catagory/Catagory"; 
import userAuthStore from "../stores/UserAuthStore";
import Listing from "../components/listing/Listing";
const Home = () => {
    const {isAuthenticated , checkAuth} = userAuthStore();
    useEffect(() => {
        checkAuth()
    }, [checkAuth , isAuthenticated]) 
    return (
        <div>
           <Navbar />
           <Catagory/>
           <Listing/>
        </div>
        
    );
}

export default Home;

import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Catagory from "../components/catagory/Catagory"; 
import userAuthStore from "../stores/UserAuthStore";
import Listing from "../components/listing/Listing";
import Footer from "../components/footer";
const Home = () => {
    const {isAuthenticated , checkAuth} = userAuthStore();
    useEffect(() => {
        checkAuth()
    }, [checkAuth , isAuthenticated]) 

    // const { pathname } = useLocation();

    // useEffect(() => {
    //   // Scroll to the top whenever the route changes
    //   window.scrollTo(0, 0);
    // }, [pathname]);
    return (
        <div>
           <Navbar />
           <Catagory/>
           <Listing/>


           {/* Footer */}
           <Footer />
        </div>
        
    );
}

export default Home;

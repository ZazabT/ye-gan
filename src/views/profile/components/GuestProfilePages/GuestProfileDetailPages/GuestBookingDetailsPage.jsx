import { useParams } from "react-router-dom";
import { useEffect } from "react";
import bookingStore from "../../../../../stores/BookingStore";
import userAuthStore from "../../../../../stores/UserAuthStore";
import guestProfileStore from "../../../../../stores/GuestProfile";
import GuestNavBar from "../../GuestNavBar";
import conversationStore from "../../../../../stores/ConversationStore";
import { useNavigate } from "react-router-dom";


const GuestBookingDetailsPage = () => {
    const { id } = useParams();
    const { getBookingById, booking, error: bookingError, loading: bookingLoading } = bookingStore();
    const { getGuestProfile, guestProfile, loading: guestProfileLoading, error: guestProfileError } = guestProfileStore();
    const { token , user } = userAuthStore();
    const {sayHi , error:conversationError , loading:conversationLoading} = conversationStore();
    const navigate = useNavigate();

    // Update navLinks to include dynamic booking ID



    const sayHello = async () => {
        try {
            await sayHi( booking?.listing.host.id , guestProfile.id, booking?.id, token);  
            if(!conversationError){
                // navigate(`guest/message/${id}`);
            }
        } catch (error) {
           console.log(error);
        }
    }
    
    

    useEffect(() => {
        getBookingById(id, token);
        getGuestProfile( user.id, token); 
    }, [getBookingById, id, token, getGuestProfile , user.id]);

    if (bookingLoading || guestProfileLoading) {
      return(
        <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
      )  
    }

    return (
        <div>
            {/* Nav bar */}
            {/* Booking details rendering logic can go here */}
            <div className="flex justify-center items-center  min-h-screen">
                {
                    booking?.hasMessage === 0 ? (
                          <button onClick={() =>sayHello()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Say Hello to the Host</button>
                    ) : (
                        <p>You alrady contacted the host</p>
                    )
                }
            </div>
        </div>
    );
}

export default GuestBookingDetailsPage;

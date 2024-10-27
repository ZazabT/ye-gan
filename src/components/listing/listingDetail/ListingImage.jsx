import Navbar from "../../Navbar"
import { useLocation } from 'react-router-dom';
const ListingImage = () => {
 
    const location = useLocation();
    const ListingImage = location.state?.images || [];
    const backEndUrl = 'http://localhost:8000';
  return (
    <div>
        <Navbar />

        {/* Show listing images */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {ListingImage.map((image, index) => (
                <img key={index} src={`${backEndUrl}/${image.image_url}`} alt={`Image ${index}`} className="w-full p-2 hover:scale-105 transition-transform" />
            ))}

            {/* Back button */}
            <button
                onClick={() => window.history.back()}
                className="fixed top-40 left-45 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 z-10"
            >
                <i className="fas fa-arrow-left text-xl h-6 w-6"></i>
            </button>
        </div>
         
    </div>
  )
}

export default ListingImage

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import listingStore from '../../../stores/ListingStore';
import Navbar from '../../Navbar';
import ListingDetailLoading from './components/ListongDetailLoading';
import BookingCard from './components/BookingCard';
import { useNavigate } from 'react-router-dom';
const ListingDetail = () => {
  const { error: listingError, loading, getListing, listing } = listingStore();
  const { id } = useParams();
  const backEndUrl = 'http://localhost:8000';
  const location = `${listing?.location?.city}, ${listing?.location?.region} ${listing?.location?.country}`;
  const name = `${listing?.host?.user?.firstName} ${listing?.host?.user?.lastName}`;
  const email = listing?.host?.user?.email;
  const navigate = useNavigate();

  // Fetch listing details
  useEffect(() => {
    const fetchListingDetails = async () => {
      await getListing(id);
    };
    fetchListingDetails();
  }, [id, getListing]);

  if (listingError) {
    return <div className="text-red-500 font-semibold">Error loading listing details: {listingError}</div>;
  }

  if (loading) {
    return <ListingDetailLoading />;
  }

  // Ensure listing and listing.item_images are defined
  if (!listing || !listing.item_images) {
    return <div className="text-gray-500 font-semibold">No listing found</div>;
  }

  const imageHeight = "h-[29rem]"; 

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{listing.title}</h1>

        {/* Main Image and Thumbnail Grid */}
        <div className="flex gap-2">
          {/* Main Image */}
          <div className={`relative ${imageHeight} w-2/3`}>
            {listing.item_images.slice(0, 1).map((image, index) => (
              <img
                key={index}
                src={`${backEndUrl}/${image.image_url}`}
                alt={`Main Image of ${listing.title}`}
                className={`w-full h-full object-cover rounded-xl shadow-lg transition-shadow duration-300 transform hover:shadow-xl hover:scale-105`} 
              />
            ))}
            {/* Show All Images Button */}
            <button className="absolute bottom-4 left-4 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300" onClick={
              () => {
                   // Navigate to the listing image page
                    navigate('/listing/images' , {state: {
                      images: listing.item_images}});
              }
            }>
              Show All Images
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className={`grid grid-cols-2 gap-2 ${imageHeight}`}>
            {listing.item_images.slice(1, 5).map((image, index) => (
              <div key={index} className="p-1">
                <img
                  src={`${backEndUrl}/${image.image_url}`}
                  alt={`Thumbnail ${index + 2} of ${listing.title}`}
                  className={`w-full h-[14rem] object-cover rounded-lg transition-shadow duration-300 transform hover:shadow-lg hover:scale-105 ${index === 3 ? 'rounded-br-2xl' : ''} ${index === 1 ? 'rounded-tr-2xl' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between'>
        {/* Left Section */}
        <div className='w-2/3'>
          {/* Location Section */}
          <h2 className="text-2xl font-semibold text-gray-700">{location}</h2>
          {/* Bed, Bath, and Guest Information */}
          <h3 className="text-lg mb-2 text-gray-600">
            {listing.max_guest} guests · {listing.bedrooms} bedrooms · {listing.bathrooms} baths · {listing.beds} beds
          </h3>
          {/* Description */}
          {/* <p className="text-gray-700">{listing.description}</p> */}
        </div>

        {/* Right Section (Booking Card) */}
         <div className="w-1/3 p-2">
         <BookingCard listing={listing} />
        </div>

      </div>

      {/* Host Card */}
      <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg mt-16 transition-transform transform hover:scale-105 duration-300">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img
                      alt="Host"
                      src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                      className="shadow-lg rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                    />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">22</span>
                      <span className="text-sm text-gray-400">Listings</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">4.8</span>
                      <span className="text-sm text-gray-400">Ratings</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">5</span>
                      <span className="text-sm text-gray-400">Years Hosting</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Host Information Section */}
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800">{name}</h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blue-400"></i>
                  Los Angeles, California
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="mt-6 mb-10 border-t border-gray-200 pt-6 text-center">
                <h4 className="text-lg font-semibold mb-2">Contact Me:</h4>
                <p className="text-gray-600 flex justify-center items-center">
                  <i className="fas fa-envelope mr-2 text-lg text-blue-400"></i>
                  Email: <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-400">{email}</a>
                </p>
                <p className="text-gray-600 flex justify-center items-center">
                  <i className="fas fa-phone mr-2 text-lg text-blue-400"></i>
                  Phone: <span>(123) 456 - 7890</span>
                </p>

                {/* Social Media Links */}
                <div className="flex justify-center mt-4 space-x-4">
                  <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-500 transition duration-300">
                    <i className="fab fa-facebook-square"></i>
                  </a>
                  <a href="#" aria-label="Twitter" className="text-blue-600 hover:text-blue-500 transition duration-300">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" aria-label="Instagram" className="text-blue-600 hover:text-blue-500 transition duration-300">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetail;




import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import listingStore from '../../../stores/ListingStore';
import Navbar from '../../Navbar';
import ListingDetailLoading from './components/ListongDetailLoading';
import BookingCard from './components/BookingCard';
import { useNavigate } from 'react-router-dom';
import { WiStars } from "react-icons/wi";
import { MdCleaningServices } from "react-icons/md";
import { LuCheckCircle2 } from "react-icons/lu";
import { FaRegMessage } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoPricetagOutline } from "react-icons/io5";


const ListingDetail = () => {
  const { error: listingError, loading, getListing, listing } = listingStore();
  const { id } = useParams();
  const backEndUrl = 'http://localhost:8000';
  const location = `${listing?.location?.city}, ${listing?.location?.region} ${listing?.location?.country}`;
  const name = `${listing?.host?.user?.firstName} ${listing?.host?.user?.lastName}`;
  const profilePicture = listing?.host?.profilePicture;
  const email = listing?.host?.user?.email;
  const navigate = useNavigate();


  const demoReviews = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        profilePicture: 'https://via.placeholder.com/50', // Replace with actual image URL
      },
      rating: 4.5,
      comment: 'Great place, very clean and well located. The host was super friendly!',
      date: 'September 12, 2023',
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        profilePicture: 'https://via.placeholder.com/50',
      },
      rating: 5,
      comment: 'Fantastic experience! The amenities were top-notch and the place was very cozy.',
      date: 'August 18, 2023',
    },
    {
      id: 3,
      user: {
        name: 'Alex Johnson',
        profilePicture: 'https://via.placeholder.com/50',
      },
      rating: 4,
      comment: 'Nice location, but a bit noisy at night. Overall, a good stay.',
      date: 'July 30, 2023',
    },
  ];


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

      {/* Title and image part */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">{listing.title}</h1>

        {/* Main Image and Thumbnail Grid */}
        <div className="flex gap-2">
          {/* Main Image */}
          <div className={`relative ${imageHeight} w-2/3 overflow-hidden`}> 
            {listing.item_images.slice(0, 1).map((image, index) => (
              <img
                key={index}
                src={`${backEndUrl}/${image.image_url}`}
                alt={`Main Image of ${listing.title}`}
                className={`w-full h-full object-cover rounded-xl shadow-lg transition-shadow duration-300 transform hover:shadow-xl hover:scale-125`} 
              />
            ))}
            {/* Show All Images Button */}
            <button className="absolute bottom-4 left-4 bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300" onClick={() => {
                // Navigate to the listing image page
                navigate('/listing/images', { state: { images: listing.item_images } });
              }}>
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
       
       {/* listing details and booking card */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between '>
        {/* Left Section */}
        <div className='w-2/3 p-4'>
          {/* Location Section */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">{location}</h2>
          {/* Bed, Bath, and Guest Information */}
          <h3 className="text-lg mb-2 text-gray-600">
            {listing.max_guest} guests · {listing.bedrooms} bedrooms · {listing.bathrooms} baths · {listing.beds} beds
          </h3>
          {/* Rating and Review Section */}
          <div className="mt-2 mb-4 text-[#222222]">
            <p className="flex items-center gap-2 text-lg font-semibold">
              <div className="flex items-center">
                <i className="fas fa-star "></i>
                <span className=""> 4.76</span>
              </div>
              <a href="#" className="cursor-pointer underline hover:text-[#878787]">
                68 reviews
              </a>
            </p>
          </div>
          <hr className='my-4' />
          {/* Hosted by */}
          <div className="mt-4">
            <div className="flex items-center mt-2">
            <div className="flex-shrink-0">
            {listing.host?.profilePicture ? (
              <img 
                className="w-16 h-16 rounded-full  transition-transform duration-200 transform hover:scale-105" 
                src={`${backEndUrl}/${listing.host.profilePicture}`} 
                alt="Host Profile" 
              />
            ) : (
              <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-300 bg-gray-200 text-gray-600 font-semibold transition-transform duration-200 transform hover:scale-105"> {/* Add hover effect */}
                {listing.host?.username[0]}
              </div>
            )}
            </div>

              <div className="flex-1 min-w-0 ms-4">
                <h2 className="text-xl font-semibold text-gray-800">Hosted by {name}</h2>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  12 years Hosting
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                ${listing.price} {/* Update to use actual price from listing */}
              </div>
            </div>
            <hr className="my-4 border-gray-300" />
          </div>
          {/* Amenities */}
          <div className="mt-4 ">
            <h3 className="text-lg font-semibold text-[#222222] mb-2">What this place offers</h3>
            <div className="mt-4">
              {/* Demo amenities data */}
              <ul className="grid grid-cols-2 gap-4 text-lg" >
                {[
                  { name: 'Wi-Fi', icon: 'fas fa-wifi' },
                  { name: 'Air Conditioning', icon: 'fas fa-wind' },
                  { name: 'Heating', icon: 'fas fa-fire' },
                  { name: 'Kitchen', icon: 'fas fa-utensils' },
                  { name: 'Washer', icon: 'fas fa-tshirt' },
                  { name: 'Parking', icon: 'fas fa-parking' },
                  { name: 'TV', icon: 'fas fa-tv' },
                  { name: 'Gym', icon: 'fas fa-dumbbell' },
                  { name: 'Pool', icon: 'fas fa-swimming-pool' },
                  { name: 'Pets Allowed', icon: 'fas fa-paw' }
                ].map((amenity, index) => (
                  <li key={index} className="text-[#222222] flex items-center">
                    <i className={`${amenity.icon} mr-2`}></i>
                    {amenity.name}
                  </li>
                ))}
              </ul>
            </div>

          </div>
                
        {/* Description */}
        <hr className='mt-6' />
        <div className='pt-4 pr-10 mt-2 mr-28'>
          <p className="text-gray-700 mb-2">
            <strong>Experience the luxury of our listing:</strong>
          </p>
          <p className="text-gray-700 mb-2">{listing.description}</p>
          <p className="text-gray-700">
            <em>Book your stay now!</em>
          </p>
        </div>


        </div>

        {/* Right Section (Booking Card) */}
        <div className="w-1/3 p-2">
        <div className="sticky top-20"> 
          <BookingCard listing={listing} />
        </div>
        </div>

      </div>

  {/* Reviews and Rating Section */}
  <hr className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" />
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
    {/* Rating and Stars Row */}
    <div className="flex flex-row items-center mb-4">
      <span className="material-symbols-outlined text-7xl text-yellow-500"><WiStars /></span>
      <div className="text-8xl font-bold mx-2">4.76</div>
      <span className="material-symbols-outlined text-7xl text-yellow-500"><WiStars /></span>
    </div>

    {/* Descriptive Text Column */}
    <div className="text-sm font-semibold text-gray-500 text-center mt-4">
       This is the rating that speaks volumes! Experience the charm of one of the most cherished homes on Airbnb, renowned for its exceptional ratings, glowing reviews, and unparalleled reliability. 
    </div>
  </div>
    
 {/* Specific Ratings Section */}
<div className="mt-4 max-w-7xl">
  <div className="grid grid-cols-6">
    {/* Column 1: Overall Rating */}
    <div className="p-4 border-r-2 border-gray-300 flex flex-col items-start">
      <h2 className="text-sm mt-2">Overall Rating</h2>
      <p className="text-lg font-semibold">4.5</p>
    </div>

    {/* Column 2: Accuracy Rating */}
    <div className="p-4 border-r-2 border-gray-300 flex flex-col items-start">
    
      
      <h2 className="text-sm mt-2">Accuracy</h2>

      <p className="text-lg font-semibold">4.7</p>
      <LuCheckCircle2 />
    </div>

    {/* Column 3: Value Rating */}
    <div className="p-4 border-r-2 border-gray-300 flex flex-col items-start">

      <h2 className="text-sm mt-2">Value</h2>
      <p className="text-lg font-semibold">4.3</p>
      <IoPricetagOutline />
    </div>

    {/* Column 4: Cleanliness Rating */}
    <div className="p-4 border-r-2 border-gray-300 flex flex-col items-start">
      <h2 className="text-sm mt-2">Cleanliness</h2>
    
      <p className="text-lg font-semibold">4.8</p>
      <MdCleaningServices />
    </div>

    {/* Column 5: Communication Rating */}
    <div className="p-4 border-r-1 border-black flex flex-col items-start">
      <h2 className="text-sm mt-2">Communication</h2>
      <p className="text-lg font-semibold">4.9</p>
      <FaRegMessage />
    </div>

    {/* Column 6: Location Rating */}
    <div className="p-4 flex flex-col items-start">
      <h2 className="text-sm mt-2">Location</h2>
      <p className="text-lg font-semibold">4.6</p>
      <SlLocationPin />
    </div>
  </div>
</div>


    </>
  );
};

export default ListingDetail;

//    {/* Host Card */}
//    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//    <div className="w-full lg:w-4/12 px-4 mx-auto">
//      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg mt-16 transition-transform transform hover:scale-105 duration-300">
//        <div className="px-6">
//          <div className="flex flex-wrap justify-center">
//            <div className="w-full px-4 flex justify-center">
//              <div className="relative">
//                <img
//                  alt="Host"
//                  src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
//                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
//                  className="shadow-lg rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
//                />
//              </div>
//            </div>
//            <div className="w-full px-4 text-center mt-20">
//              <div className="flex justify-center py-4 lg:pt-4 pt-8">
//                <div className="mr-4 p-3 text-center">
//                  <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">22</span>
//                  <span className="text-sm text-gray-400">Listings</span>
//                </div>
//                <div className="mr-4 p-3 text-center">
//                  <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">4.8</span>
//                  <span className="text-sm text-gray-400">Ratings</span>
//                </div>
//                <div className="lg:mr-4 p-3 text-center">
//                  <span className="text-xl font-bold block uppercase tracking-wide text-blue-600">5</span>
//                  <span className="text-sm text-gray-400">Years Hosting</span>
//                </div>
//              </div>
//            </div>
//          </div>

//          {/* Host Information Section */}
//          <div className="text-center mt-12">
//            <h3 className="text-xl font-semibold leading-normal mb-2 text-gray-800">{name}</h3>
//            <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold">
//              <i className="fas fa-map-marker-alt mr-2 text-lg text-blue-400"></i>
//              Los Angeles, California
//            </div>
//          </div>

//          {/* Contact Information Section */}
//          <div className="mt-6 mb-10 border-t border-gray-200 pt-6 text-center">
//            <h4 className="text-lg font-semibold mb-2">Contact Me:</h4>
//            <p className="text-gray-600 flex justify-center items-center">
//              <i className="fas fa-envelope mr-2 text-lg text-blue-400"></i>
//              Email: <a href={`mailto:${email}`} className="text-blue-600 hover:text-blue-400">{email}</a>
//            </p>
//            <p className="text-gray-600 flex justify-center items-center">
//              <i className="fas fa-phone mr-2 text-lg text-blue-400"></i>
//              Phone: <span>(123) 456 - 7890</span>
//            </p>

//            {/* Social Media Links */}
//            <div className="flex justify-center mt-4 space-x-4">
//              <a href="#" aria-label="Facebook" className="text-blue-600 hover:text-blue-500 transition duration-300">
//                <i className="fab fa-facebook-square"></i>
//              </a>
//              <a href="#" aria-label="Twitter" className="text-blue-600 hover:text-blue-500 transition duration-300">
//                <i className="fab fa-twitter"></i>
//              </a>
//              <a href="#" aria-label="Instagram" className="text-blue-600 hover:text-blue-500 transition duration-300">
//                <i className="fab fa-instagram"></i>
//              </a>
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>




// <span class="material-symbols-outlined">
// hotel_class
// </span>




{/* <span class="material-symbols-outlined">
license
</span> */}




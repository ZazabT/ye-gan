import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import listingStore from '../../../stores/ListingStore';
import Navbar from '../../Navbar';

const ListingDetail = () => {
  const { error: listingError, loading, getListing, listing } = listingStore();
  const { id } = useParams();
  const backEndUrl = 'http://localhost:8000';
  const location = `${listing?.location?.city}, ${listing?.location?.state} ${listing?.location?.country}`;
  const name = `${listing?.host?.user?.firstName} ${listing?.host?.user?.lastName}`;

  // Fetch listing details
  useEffect(() => {
    const fetchListingDetails = async () => {
      await getListing(id);
    };
    fetchListingDetails();
  }, [id, getListing]);

  if (listingError) {
    return <div className="text-red-500">Error loading listing details: {listingError.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Ensure listing and listing.item_images are defined
  if (!listing || !listing.item_images) {
    return <div>No listing found</div>;
  }

  // Set desired height for images
  const imageHeight = "h-[29rem]"; 

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-semibold mb-6">{listing.title}</h1>
        
        {/* Main Image and Thumbnail Grid */}
        <div className="flex gap-1">
          {/* Main Image */}
          <div className={`relative ${imageHeight}`}>
            {listing.item_images.slice(0, 1).map((image, index) => (
              <img
                key={index}
                src={`${backEndUrl}${image.image_url}`}
                alt={`Main Image of ${listing.title}`}
                className={`w-full h-full object-cover rounded-l-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-95`} 
              />
            ))}
            {/* Show All Images Button */}
            <button className="absolute bottom-4 left-4 bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition-colors duration-300">
              Show All Images
            </button>
          </div>
          
          {/* Thumbnail Images */}
          <div className={`grid grid-cols-2 gap-1 ${imageHeight}`}>
            {listing.item_images.slice(1, 5).map((image, index) => (
              <div key={index} className={`p-1`}>
                <img
                  src={`${backEndUrl}${image.image_url}`}
                  alt={`Thumbnail ${index + 2} of ${listing.title}`}
                  className={`w-full h-[14rem] object-cover hover:shadow-lg transition-shadow duration-300 transform hover:scale-95 ${index === 3 ? 'rounded-br-2xl' : ''} ${index === 1 ? 'rounded-tr-2xl' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">{location}</h2>
      </div>

      {/* Bed, Bath, and Guest Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg mb-2 text-gray-800">
          {listing.max_guest} guests · {listing.bedrooms} bedrooms · {listing.bathrooms} baths · {listing.beds} beds
        </h3>
      </div>

      {/* Host Card */}
      <div className="pt-16 bg-blueGray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <img alt="Host" src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                      <span className="text-sm text-blueGray-400">Listings</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span>
                      <span className="text-sm text-blueGray-400"></span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span>
                      <span className="text-sm text-blueGray-400">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">{name}</h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  Los Angeles, California
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  Solution Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  University of Computer Science
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      An artist of considerable range, Jenna the name taken
                      by Melbourne-raised, Brooklyn-based Nick Murphy
                      writes, performs and records all of his own music,
                      giving it a warm, intimate feel with a solid groove
                      structure. An artist of considerable range.
                    </p>
                    <a href="javascript:void(0);" className="font-normal text-pink-500">
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank" rel="noopener noreferrer"> Creative Tim</a>.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ListingDetail;

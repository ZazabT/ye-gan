import { HeartIcon } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline'; // Import Calendar icon

const ListingCart = ({ listing, navigateToDetails }) => {
  // Main image
  const mainImage = listing.item_images.find(image => image.isMain === 1);
  

  const location = `${listing.location.city}, ${listing.location.region}, ${listing.location.country}`;
  const backEndUrl = 'http://localhost:8000';
  const imageUrl = mainImage ? `${backEndUrl}/${mainImage.image_url}` : 'https://via.placeholder.com/150';
  console.log(imageUrl);
  // Date formatting
  const formatDateRange = (startDate, endDate) => {
    const options = { month: 'short', day: 'numeric' };
    return `${new Date(startDate).toLocaleDateString('en-US', options)} - ${new Date(endDate).toLocaleDateString('en-US', options)}`;
  };

  // Get start and end dates from listing
  const dateRange = formatDateRange(listing.start_date, listing.end_date);

  return (
    <div className="relative group " onClick={navigateToDetails}>
      <a className=" rounded-lg p-2 shadow-lg transition-transform transform hover:scale-105 bg-white max-w-sm mx-auto min-h-[400px] flex flex-col justify-between">
        {/* Heart icon for likes */}
        <div className="absolute top-3 right-3 cursor-pointer">
          <HeartIcon className={`h-6 w-6 text-white transition-colors hover:scale-125 hover:text-red-500 `} />
        </div>

        <img
          alt={listing.title}
          src={imageUrl}
          className="h-56 w-full rounded-md object-cover"
        />

        <div className="mt-2 flex-grow">
          <dl>
            <div>
              <dt className="sr-only">Price</dt>
              <dd className="text-lg font-bold text-gray-800">Birr {listing.price_per_night}</dd>
            </div>
            
            <div>
              <dt className="sr-only">Title</dt>
              <dd className="font-bold text-gray-700">{listing.title || 'Unknown location'}</dd>
            </div>
            <div>
              <dt className="sr-only">Address</dt>
              <dd className="font-medium text-gray-500">{location || 'Unknown location'}</dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm">
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-0">
              <svg className="h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              <div>
                <p className="text-gray-500">Beds</p>
                <p className="font-medium">{listing.beds || 0} beds</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 mb-2 sm:mb-0">
              <svg className="h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <div>
                <p className="text-gray-500">Bathrooms</p>
                <p className="font-medium">{listing.bathrooms || 0} bathrooms</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2">
              <svg className="h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <div>
                <p className="text-gray-500">Bedrooms</p>
                <p className="font-medium">{listing.bedrooms || 0} bedrooms</p>
              </div>
            </div>
          </div>

          {/* Date Range Section */}
          {/* <div className="mt-5 flex items-center justify-end text-sm text-gray-500">
            <CalendarIcon className="h-5 w-5 text-indigo-700 mr-1" aria-hidden="true" />
            <p>{dateRange}</p>
          </div> */}
        </div>
      </a>
    </div>
  );
};

export default ListingCart;

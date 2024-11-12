import { HeartIcon } from '@heroicons/react/24/solid';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubBold } from "react-icons/pi";
import { RiDoorOpenLine } from "react-icons/ri";

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
  const status = listing.status;
   // return noting 
  if (status === 'inactive') {
    return null;
  }
  return (
    <div className="relative group " onClick={navigateToDetails}>
       {/* If the listing is active  */}
      {
        status === 'active' && (
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
                <dd className="font-bold text-gray-800 line-clamp-1">{listing.title || 'Unknown location'}</dd>
              </div>
              <div>
                <dt className="sr-only">Address</dt>
                <dd className="font-medium text-gray-500">{location || 'Unknown location'}</dd>
              </div>
            </dl>
  
            <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm">
              <div className="inline-flex items-center gap-2 mb-2 sm:mb-0">
              <IoBedOutline className='h-5 w-5 text-indigo-800'/>
                <div>
                  <p className="text-gray-500">Beds</p>
                  <p className="font-medium">{listing.beds || 0} beds</p>
                </div>
              </div>
  
              <div className="inline-flex items-center gap-2 mb-2 sm:mb-0">
              <PiBathtubBold className='h-5 w-5 text-indigo-800'/>
                <div>
                  <p className="text-gray-500">Bathrooms</p>
                  <p className="font-medium">{listing.bathrooms || 0} bathrooms</p>
                </div>
              </div>
  
              <div className="inline-flex items-center gap-2">
              <RiDoorOpenLine className='h-5 w-5 text-indigo-800'/>
                <div>
                  <p className="text-gray-500">Bedrooms</p>
                  <p className="font-medium">{listing.bedrooms || 0} bedrooms</p>
                </div>
              </div>
            </div>
  
            {/* Date Range Section */}
            <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
              <CalendarIcon className="h-3 w-3 text-indigo-800 mr-1" aria-hidden="true" />
              <p>{dateRange}</p>
            </div>
          </div>
        </a>
        )  
      }

       {/* If the listing is soldout */}
      {
        status === 'soldout' && (
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
              <dd className="text-lg font-bold text-red-700 line-through">Sold out</dd>
            </div>
            
            <div>
              <dt className="sr-only">Title</dt>
              <dd className="font-bold text-gray-800 line-clamp-1 line-through-red-500">{listing.title || 'Unknown location'}</dd>
            </div>
            <div>
              <dt className="sr-only">Address</dt>
              <dd className="font-medium text-gray-500 line-through-red-500">{location || 'Unknown location'}</dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm">
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-0">
            <IoBedOutline className='h-5 w-5 text-indigo-800'/>
              <div>
                <p className="text-gray-500">Beds</p>
                <p className="font-medium line-through-red-500">{listing.beds || 0} beds</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 mb-2 sm:mb-0">
            <PiBathtubBold className='h-5 w-5 text-indigo-800'/>
              <div>
                <p className="text-gray-500">Bathrooms</p>
                <p className="font-medium line-through-red-500">{listing.bathrooms || 0} bathrooms</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2">
            <RiDoorOpenLine className='h-5 w-5 text-indigo-800'/>
              <div>
                <p className="text-gray-500">Bedrooms</p>
                <p className="font-medium line-through-red-500">{listing.bedrooms || 0} bedrooms</p>
              </div>
            </div>
          </div>

          
          {/* Date Range Section */}
          <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
              <CalendarIcon className="h-3 w-3 text-indigo-800 mr-1" aria-hidden="true" />
              <p>{dateRange}</p>
            </div>
        </div>
      </a>
        )
      } 

       {/* if the listing is camingsoon */}
      {
       status === 'comingsoon' && (
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
              <dd className="text-lg font-bold text-gray-800">Camingsoon</dd>
            </div>
            
            <div>
              <dt className="sr-only">Title</dt>
              <dd className="font-bold text-gray-800 line-clamp-1">{listing.title || 'Unknown location'}</dd>
            </div>
            <div>
              <dt className="sr-only">Address</dt>
              <dd className="font-medium text-gray-500">{location || 'Unknown location'}</dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm">
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-0">
            <IoBedOutline className='h-5 w-5 text-indigo-800'/>
              <div>
                <p className="text-gray-500">Beds</p>
                <p className="font-medium">{listing.beds || 0} beds</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 mb-2 sm:mb-0">
            <PiBathtubBold className='h-5 w-5 text-indigo-900'/>
              <div>
                <p className="text-gray-500">Bathrooms</p>
                <p className="font-medium">{listing.bathrooms || 0} bathrooms</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2">
            <RiDoorOpenLine className='h-5 w-5 text-indigo-800'/>
              <div>
                <p className="text-gray-500">Bedrooms</p>
                <p className="font-medium">{listing.bedrooms || 0} bedrooms</p>
              </div>
              
            </div>

       
          </div>

          {/* Date Range Section */}
          <div className="mt-2 flex items-center justify-end text-sm text-gray-500">
            <CalendarIcon className="h-3 w-3 text-indigo-800 mr-1" aria-hidden="true" />
            <p>{dateRange}</p>
          </div>
        </div>
      </a>
       )
      }
      
    </div>
  );
};

export default ListingCart;

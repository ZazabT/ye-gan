import React from 'react';

const ListingDetailLoading = () => {
  const skeletonHeight = "h-[29rem]";

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
        {/* Title */}
        <div className="h-8 bg-gray-300 rounded w-2/3 mb-6"></div>

        {/* Main Image and Thumbnails Grid */}
        <div className="flex gap-2">
          {/* Main Image Skeleton */}
          <div className={`relative bg-gray-300 rounded-xl shadow-lg w-2/3 ${skeletonHeight}`}></div>

          {/* Thumbnail Skeletons */}
          <div className={`grid grid-cols-2 gap-2 ${skeletonHeight}`}>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="p-1">
                <div className="bg-gray-300 rounded-lg h-[14rem]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Left and Right Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between animate-pulse">
        {/* Left Section */}
        <div className="w-2/3 space-y-4">
          {/* Location Skeleton */}
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>

          {/* Bed, Bath, Guest Information Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>

          {/* Description Skeleton */}
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        {/* Right Section (Booking Card) */}
        <div className="w-1/3 bg-gray-200 shadow-lg rounded-xl p-10 h-[40rem]"></div>
      </div>

      {/* Host Card Skeleton */}
      {/* <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="bg-gray-300 rounded-lg shadow-lg h-[18rem]"></div>
        </div>
      </div> */}
    </>
  );
};

export default ListingDetailLoading;

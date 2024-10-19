const ListingCardLoading = () => {
    return (
      <div className="grid grid-cols-1 xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="w-full rounded-lg shadow-lg animate-pulse">
            {/* Image placeholder */}
            <div className="h-48 bg-gray-300"></div>
            {/* Text placeholders */}
            <div className="px-6 py-4">
              <div className="h-6 bg-gray-300 mb-2"></div>
              <div className="h-4 bg-gray-300 w-2/3"></div>
            </div>
            {/* Additional placeholders */}
            <div className="px-6 pt-4 pb-2">
              <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-300 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ListingCardLoading;
  
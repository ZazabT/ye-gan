const CategoryLoading = () => {
    return (
      <div className="flex overflow-x-auto space-x-6 p-4">
        {/* Render multiple loading cards for a horizontal slider effect */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center w-20 animate-pulse">
            {/* Skeleton for the icon */}
            <div className="w-8 h-8 bg-gray-300 rounded-full mb-2"></div>
            {/* Skeleton for the category name */}
            <div className="h-3 bg-gray-300  w-full"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default CategoryLoading;
  
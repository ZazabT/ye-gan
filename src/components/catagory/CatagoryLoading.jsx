const CategoryLoading = () => {
    return (
      <div className="flex overflow-x-auto space-x-6 p-4">
        {/* Render multiple loading cards for a horizontal slider effect */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center w-20 animate-pulse">
            {/* Skeleton for the icon */}
            <div className="w-16 h-16 bg-gray-300 rounded-xl mb-2"></div>
            {/* Skeleton for the category name */}
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  };
  
  export default CategoryLoading;
  
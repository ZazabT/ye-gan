<div className="flex flex-wrap items-center mb-8">
{/* Listing Count */}
<div className="flex-grow text-2xl font-bold text-gray-700">
  <p>{hostProfileLoading ? "Loading listings..." : `${numberOfListings} Listings`}</p>
</div>

{/* Search Input */}
<div className="flex-grow max-w-md">
  <div className="w-full bg-white border rounded-lg shadow-sm">
    <form className="flex items-center p-2">
      <input
        type="text"
        placeholder="Search here"
        className="w-full px-3 py-2 text-gray-800 rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none transition duration-150"
      >
        Search
      </button>
    </form>
  </div>
</div>

{/* Create Button */}
<div className="flex-grow flex justify-end">
  <button
    className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-600 transition duration-200 transform hover:scale-105"
    title="Create new listing"
  >
    Create new listing
  </button>
</div>
</div>

// Listing table header



<div className="flex items-center mb-8">
{/* Listing Count */}
<h1 className="text-black font-bold text-3xl">{numberOfBookings} Listings</h1>

{/* Search Input */}
<div className="flex-1 mx-4">
    <form className="relative">
        <input
            type="text"
            placeholder="Search here"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 text-white bg-gray-800 rounded-md hover:bg-gray-700 transition duration-150"
        >
            Search
        </button>
    </form>
</div>

{/* Create Button */}
<button
    className="ml-auto relative inline-flex items-center justify-center px-5 py-2 text-lg font-semibold text-white bg-gray-900 rounded-md hover:shadow-md transition duration-200"
>
    <span className="absolute inset-0 bg-gradient-to-r from-green-200 via-green-300 to-green-400 blur-md opacity-70 transition-all duration-500 group-hover:opacity-100"></span>
    <span className="relative z-10">Create new listing</span>
</button>
</div>


// booking table header



https://www.youtube.com/watch?v=UyEZ74l40yU
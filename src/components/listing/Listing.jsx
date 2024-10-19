import { useEffect } from "react";
import listingStore from "../../stores/ListingStore";
import ListingCart from "./ListingCart";
import ListingCardLoading from "./ListingCardLoading";

const Listing = () => {
  const { listings, error: listingError, loading, getAllListing } = listingStore();

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      await getAllListing();
    };

    fetchListings();
  }, [getAllListing]);

  // Check if listings is correctly fetched
  console.log("listings data:", listings);

  // Loading state
  if (loading) {
    return (
     
      <ListingCardLoading />
    );
  }

  // Error handling
  if (listingError) {
    return <div>Error loading listings: {listingError.message}</div>;
  }

  // Render listings when not loading
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
      {listings?.length > 0 ? (
        listings.map((listing) => <ListingCart key={listing.id} listing={listing} />)
      ) : (
        <div className="w-full h-full flex items-center justify-center">No listings available</div>
      )}
    </div>
  );
};

export default Listing;

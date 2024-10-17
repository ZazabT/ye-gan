import ListingCart from "./ListingCart"
const Listing = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ListingCart />
    </div>
  )
}

export default Listing

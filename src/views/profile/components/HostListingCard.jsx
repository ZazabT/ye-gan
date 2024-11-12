

const HostListingCard = ({ listing }) => {
    const mainImage = listing.item_images.find(image => image.isMain === 1);
    const backEndUrl = 'http://localhost:8000';
    const image = `${backEndUrl}/${mainImage.image_url}`;
    
    console.log('Listing Image' + image);

    const formatDateRange = (startDate, endDate) => {
        const options = { month: 'short', day: 'numeric' };
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Check if start and end are in the same month
        if (start.getMonth() === end.getMonth()) {
            return `${start.toLocaleDateString('en-US', options)} - ${end.getDate()}`;
        } else {
            return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`;
        }
    };
    const dateRange = formatDateRange(listing.start_date, listing.end_date);

    return (
        <article className="relative isolate flex flex-col overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm w-full h-auto mx-auto hover:cursor-pointer hover:scale-105">
            <img
                src={`${backEndUrl}/${mainImage.image_url}`}
                alt={listing.title}
                className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
            <h3 className="z-10 mt-3 text-lg font-bold text-white line-clamp-1">
                {listing.title}
            </h3>
            <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                {dateRange || 'City of love'} 
            </div>
         
        </article>
    );
};

export default HostListingCard;

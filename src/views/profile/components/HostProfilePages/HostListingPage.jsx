import { useEffect } from 'react';
import userAuthStore from '../../../../stores/UserAuthStore';
import hostProfileStore from '../../../../stores/HostProfile';
import { useNavigate } from 'react-router-dom';
import HostNavBar from '../HostNavBar';

const HostListingPage = () => {
    const { getHostProfile, hostProfile, loading: hostProfileLoading, error: hostProfileError } = hostProfileStore();
    const { token, user } = userAuthStore();
    const navigate = useNavigate();
    const navLinks = [
      { path: '/host-profile', label: 'Yegna' },
      { path: '/host-profile-listings', label: 'Listings' },
      { path: '/host-profile-bookings', label: 'Bookings' },
      { path: `/host/messages/${hostProfile?.id}`, label: 'Messages' },
  ];

    const myListings = hostProfile?.listings;
    const numberOfListings = myListings?.length;
    const backEndUrl = 'http://localhost:8000';

    useEffect(() => {
        const fetchHostProfile = async () => {
            if (user && token) {
                const userId = user.id;
                if (userId) {
                    if (user.isHomeOwner) {
                        try {
                            await getHostProfile(userId, token);
                        } catch (error) {
                            console.error("Failed to fetch host profile:", error);
                        }
                    } else {
                        console.error("User is not a homeowner, redirecting to home");
                        navigate("/");
                    }
                } else {
                    console.error("User ID is not available.");
                }
            } else {
                console.log("User or token not available, redirecting to login.");
                navigate("/login"); 
            }
        };

        fetchHostProfile();
    }, [user, token, getHostProfile, navigate]);

    if (hostProfileLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
    }

    if (hostProfileError) {
        return <div>Error loading profile: {hostProfileError}</div>;
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
          {/* Navbar */}
          <HostNavBar hostProfile={hostProfile}  navLinks={navLinks}/>
      
          {/* Main Content */}

          {
            numberOfListings === 0 ? (
              <div className="flex justify-center items-center min-h-screen">
              <p className="text-gray-500 font-semibold">No Listings yet.</p>
             </div>
            ) : (
              <div className="container mx-auto px-6 py-10">
            {/* Header Section */}
  
            {/* Table */}
            <div className="overflow-hidden">
              {hostProfileLoading ? (
                <div className="text-center py-10 text-gray-500">Loading listings...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-normal font-normal">
                    <thead className="bg-gray-100 text-black font-bold">
                      <tr>
                        <th className="py-4 px-5  border-b">Listing</th>
                        <th className="py-4 px-5  text-center  border-b">Bathrooms</th>
                        <th className="py-4 px-5  text-center border-b">Bedrooms</th>
                        <th className="py-4 px-5  text-center  border-b">Bed_number</th>
                        <th className="py-4 px-5  text-center  border-b">Starting Date</th>
                        <th className="py-4 px-5  text-center  border-b">Ending Date</th>
                        <th className="py-4 px-5  text-center  border-b">Price per Night</th>
                        <th className="py-4 px-5  text-center  border-b">Status</th>
                        <th className="py-4 px-5  text-center  border-b">Confirmed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myListings?.map((listing, index) => (
                        <tr key={listing.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                           <td className="py-2 px-5 border-r border-stone-300">
                              <div className="flex items-center">
                                <div className="relative inline-block shrink-0 rounded-xl me-3">
                                  <img
                                    src={`${backEndUrl}/${listing?.item_images.find(image => image.isMain === 1).image_url}`}
                                    className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                                    alt={listing.title}
                                  />
                                </div>
                                <div className="flex flex-col justify-start">
                                  <span className="mb-1 transition-colors duration-200 ease-in-out  text-secondary-inverse hover:text-primary overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: '200px' }}>
                                    {listing.title}
                                  </span>
                                </div>
                              </div>
                            </td>
                          <td className="py-4 px-5 text-center  border-r">{listing.bathrooms}</td>
                          <td className="py-4 px-5 text-center  border-r">{listing.bedrooms}</td>
                          <td className="py-4 px-5 text-center  border-r">{listing.beds}</td>
                          <td className="py-4 px-5 text-center  border-r">{new Date(listing.start_date).toLocaleDateString()}</td>
                          <td className="py-4 px-5 text-center  border-r">{new Date(listing.end_date).toLocaleDateString()}</td>
                          <td className="py-4 px-5 text-center  border-r">${listing.price_per_night}</td>
                          <td className="py-4 px-5 text-center border-r">
                            <span
                              className={`px-3 py-1 rounded-full font-semibold ${
                                listing.status === 'active' ? 'bg-green-100 text-green-600' :
                                listing.status === 'inactive' ? 'bg-yellow-100 text-yellow-600' :
                                listing.status === 'soldout' ? 'bg-red-100 text-red-600' :
                                'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-center">
                            <span
                              className={`px-3 py-1 rounded-full font-semibold ${
                                listing.confirmed === 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                              }`}
                            >
                              {listing.confirmed === 1 ? 'Yes' : 'No'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
            )
          }
          
        </div>
      );
};

export default HostListingPage;

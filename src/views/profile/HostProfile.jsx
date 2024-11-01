import { useEffect, useState } from 'react';
import userAuthStore from '../../stores/UserAuthStore';
import hostProfileStore from '../../stores/HostProfile';
import bookingStore from '../../stores/BookingStore';
import { useNavigate } from 'react-router-dom';
import HostListingCard from './components/HostListingCard';
import HostBookingCard from './components/HostBookingCard';
import HostNavBar from './components/HostNavBar';
import { useMemo } from 'react';
const HostProfile = () => {
    const { getHostProfile, hostProfile, loading: hostProfileLoading, error: hostProfileError } = hostProfileStore();
    const { bookings , loading:bookingLoading , getMyListingBooking } = bookingStore();
    const { token, user } = userAuthStore();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const navLinks = [
      { path: '/host-profile', label: 'Yegna' },
      { path: '/host-profile-listings', label: 'Listings' },
      { path: '/host-profile-bookings', label: 'Bookings' },
      { path: '#', label: 'Messages' }
  ];

    
    const myListings = hostProfile?.listings;
    const currentHostingLists = useMemo(() =>myListings?.filter(listing => listing.status === 'active' && listing.confirmed === 1) , [myListings]);
    const currentHostingListsCount = currentHostingLists?.length;
    // Filter accepted bookings from listings
    const acceptedBookings = useMemo(()=>bookings?.filter(booking => booking.status === 'accepted') , [bookings]);
    // Count of accepted bookings
    const acceptedBookingsCpunt = acceptedBookings?.length 
    useEffect(() => {
        const fetchHostProfile = async () => {
            if (user && token) {
                const userId = user.id;
                if (userId) {
                    if (user.isHomeOwner) {
                        try {
                            await getHostProfile(userId, token);
                            await getMyListingBooking(userId, token);
                        } catch (error) {
                            console.error("Failed to fetch host profile:", error);
                        }
                    } else {
                        console.error("User is not a homeowner, redirecting to home.");
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
    }, [user, token, getHostProfile, navigate , getMyListingBooking]);

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

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div>
            {/* Host Nav Bar */}
            <HostNavBar hostProfile={hostProfile} navLinks={navLinks}/>
          
            {/* Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-16">
            {/* Welcome Message */}
            <h1 className="text-4xl text-gray-800 font-bold mb-8">Welcome, {hostProfile?.username}!</h1>

            {/* Welcome Paragraph */}
            <p className="text-base text-gray-700 italic mb-12 leading-relaxed rounded-lg ">
            &ldquo; Heelloo, {hostProfile?.username}! Your hosting dashboard awaits—an organized space where you can effortlessly manage your exclusive listings, stay on top of bookings, and keep in touch with guests. Dive in to handle every detail with ease, elegance, and efficiency. &rdquo;
            </p>


            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8">
                {[`Current Hosting (${currentHostingListsCount})`, `Accepted Bookings (${acceptedBookingsCpunt})`, "Messages (0)", "Reviews (0)"].map((label, index) => (
                    <button 
                        key={index}
                        onClick={() => handleTabClick(index)} 
                        className={`py-2 px-6 rounded-full text-sm font-medium transition-colors 
                        ${activeTab === index ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`
                    }>
                        {label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="w-full">
                {activeTab === 0 && (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                        {currentHostingLists?.map((listing) => (
                            <HostListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                )}

                {activeTab === 1 && (
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                    {acceptedBookings?.map((booking) => (
                        <HostBookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
                )}

                {activeTab === 2 && (
                    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-3">Messages</h2>
                        <p className="text-gray-600">Your messages will appear here...</p>
                    </div>
                )}

                {activeTab === 3 && (
                    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-3">Reviews</h2>
                        <p className="text-gray-600">Your reviews will appear here...</p>
                    </div>
                )}
            </div>
</div>

        </div>
    );
};

export default HostProfile;

















































































































































































































{/* <div class="font-[sans-serif] text-[#333]">
    <div class="max-w-5xl mx-auto">
      <div class="text-center">
        <h2 class="text-4xl font-bold mb-4">Pricing</h2>
        <p class="text-sm text-gray-500">Change your plant according your needs</p>
      </div>
      <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-12 max-sm:max-w-sm max-sm:mx-auto">
        <div class="border rounded-md p-6">
          <h3 class="text-2xl font-semibold mb-1">Starter</h3>
          <p class="text-sm text-gray-500">For Individuals and Small Teams</p>
          <div class="mt-6">
            <h3 class="text-2xl font-semibold">$10 <sub class="text-gray-400 text-xs">per month</sub></h3>
          </div>
          <div class="mt-6">
            <h4 class="text-xl font-semibold mb-1">Include</h4>
            <p class="text-sm text-gray-500">Everything you get in this plan</p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                50 Page Unlock
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                10 GB Storage
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                6 Team Members
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                Unlimited Book Mark
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                Unlimited basic feature
              </li>
            </ul>
            <button type="button" class="w-full mt-6 px-2 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md">Buy now</button>
          </div>
        </div>
        <div class="border rounded-md p-6">
          <h3 class="text-2xl font-semibold mb-1 flex items-center">Professional <span class="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-md ml-3">Best Deal</span></h3>
          <p class="text-sm text-gray-500">For Individuals and Largest Teams</p>
          <div class="mt-6">
            <h3 class="text-2xl font-semibold">$20 <sub class="text-gray-400 text-xs">per month</sub></h3>
          </div>
          <div class="mt-6">
            <h4 class="text-xl font-semibold mb-1">Include</h4>
            <p class="text-sm text-gray-500">Everything you get in this plan</p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                100 Page Unlock
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                20 GB Storage
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                8 Team Members
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                Unlimited Book Mark
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                Unlimited basic feature
              </li>
            </ul>
            <button type="button" class="w-full mt-6 px-2 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md">Buy now</button>
          </div>
        </div>
        <div class="border rounded-md p-6">
          <h3 class="text-2xl font-semibold mb-1">Business</h3>
          <p class="text-sm text-gray-500">For Multiples and Largest Teams</p>
          <div class="mt-6">
            <h3 class="text-2xl font-semibold">$100 <sub class="text-gray-400 text-xs">per month</sub></h3>
          </div>
          <div class="mt-6">
            <h4 class="text-xl font-semibold mb-1">Include</h4>
            <p class="text-sm text-gray-500">Everything you get in this plan</p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                300 Page Unlock
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                100 GB Storage
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                100 Team Members
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                Unlimited Book Mark
              </li>
              <li class="flex items-center text-sm text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" class="mr-3 fill-green-500" viewBox="0 0 24 24">
                  <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
                </svg>
                Unlimited basic feature
              </li>
            </ul>
            <button type="button" class="w-full mt-6 px-2 py-2 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  </div> */}
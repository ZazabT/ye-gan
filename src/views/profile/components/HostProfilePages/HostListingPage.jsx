import { useEffect, useState, useRef } from 'react';
import userAuthStore from '../../../../stores/UserAuthStore';
import hostProfileStore from '../../../../stores/HostProfile';
import listingStore from '../../../../stores/ListingStore';
import ListingNotificationCard from '../../../../components/listing/ListingNotificationCard'; 
import { useNavigate } from 'react-router-dom';
import locationStore from '../../../../stores/LocationStore';
import HostNavBar from '../HostNavBar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Footer from '../../../../components/footer';

const HostListingPage = () => {
    const { getHostProfile, hostProfile, loading: hostProfileLoading, error: hostProfileError } = hostProfileStore();
    const [notificationVisible, setNotificationVisible] = useState(false); 
    const [notificationType, setNotificationType] = useState(''); // 'success' or 'error'
    const [notificationMessage, setNotificationMessage] = useState('');
    const {deleteListing , listing, formData , setFormData,updateListing , getListing , error: listingError , loading: listingLoading } = listingStore();
    const {getAllLocations , locations ,loading: locationLoading} = locationStore();
    const { token, user } = userAuthStore();
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(null);
    const dropdownRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showModal, setShowModal] =useState(false);
    const [selectedListingId, setSelectedListingId] = useState(null);
    const navLinks = [
        { path: '/host-profile', label: 'Yegna' },
        { path: '/host-profile-listings', label: 'Listings' },
        { path: '/host-profile-bookings', label: 'Bookings' },
        { path: `/host/messages/${hostProfile?.id}`, label: 'Messages' },
    ];

    const myListings = hostProfile?.listings;
    const numberOfListings = myListings?.length;
    const backEndUrl = 'http://localhost:8000';


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'city') {
        const selectedLocation = locations.find(
            (location) => location.city === value
        );
        setFormData((prevData) => ({
            ...prevData,
            location_id: selectedLocation ? selectedLocation.id : '', 
        }));
    }
    
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                categories: checked
                    ? [...formData.categories, value]
                    : formData.categories.filter(cat => cat !== value)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleDropdownToggle = (id) => {
        setDropdownVisible((prev) => (prev === id ? null : id));
    };

    const handleAction = async (listingId, action) => {
        try {
            if (action === 'update') {
                console.log('Update ' + listingId);
                await getListing(listingId, token);  // Fetching the listing
                await getAllLocations();  // Fetching all locations
                setShowModal(true);  // Opening modal
            }            
            if (action === 'delete') {
                setSelectedListingId(listingId);
                setIsModalVisible(true);  // Show modal
            }
        } catch (error) {
            console.error('Error handling booking action:', error);
        }
        setDropdownVisible(null);
    };



    // Handle image change and update the formData state with the selected images
  
    const handleSaveChanges = async (id) => {

        console.log(formData);
        try {
            await updateListing(id, formData , token);
            showNotification('success', 'Listing updated successfully!');
            await getHostProfile(user.id, token);
        } catch (error) {
            console.error('Error updating listing:', error);
            showNotification('error', error.message);
        } finally {
            setShowModal(false);
        }
    };


    const confirmDelete = async () => {
        try {
            if (selectedListingId) {
                await deleteListing(selectedListingId, token);
                showNotification('success', 'Listing deleted successfully!');

                // Refresh listings
                await getHostProfile(user.id, token);
            
            
            }
        } catch (error) {
            console.error('Error handling delete action:', error);
            showNotification('error', error.message);


        } finally {
            setIsModalVisible(false); 
            setSelectedListingId(null); 
        }
    };

    const showNotification = (type, message) => {
        setNotificationType(type);
        setNotificationMessage(message);
        setNotificationVisible(true);
        setTimeout(() => setNotificationVisible(false), 4000); // Hide after 4 seconds
    };

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             setDropdownVisible(null);
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    useEffect(() => {
        const fetchHostProfile = async () => {
            if (user && token) {
                const userId = user.id;
                console.log('User :' , user);
                console.log('User ID:', userId  , 'Is Home Owner:', user.isHomeOwner);
                console.log('Token:', token); 
                if (userId) {
                    try {
                        await getHostProfile(userId, token);
                    } catch (error) {
                        console.error("Failed to fetch host profile:", error);
                    }
                } else {
                    navigate("/");
                }
            } else {
                navigate("/login");
            }
        };
        fetchHostProfile();
    }, [user, token, getHostProfile, navigate  ,  ]);

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
        <div className="min-h-screen">
            {/* Navbar */}
            <HostNavBar hostProfile={hostProfile} navLinks={navLinks} />


            {/* Notification Card */}
            <ListingNotificationCard
                    visible={notificationVisible}
                    type={notificationType}
                    message={notificationMessage}
                    onClose={() => setNotificationVisible(false)}
                />


                    {/* Delete Modal */}
                    {isModalVisible && (
                        <div id="deleteModal" tabIndex="-1" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50">
                            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                    <button type="button" onClick={() => setIsModalVisible(false)} className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                    <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                    </svg>
                                    <p className="mb-4 text-gray-500 dark:text-gray-300">Are you sure you want to delete this item?</p>
                                    <div className="flex justify-center items-center space-x-4">
                                        <button onClick={() => setIsModalVisible(false)} className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600">
                                            No, cancel
                                        </button>
                                        <button onClick={confirmDelete} className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 dark:bg-red-500 dark:hover:bg-red-600">
                                            Yes, I&apos;m sure
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

            
                      {/* Update Modal */}
                      {showModal ? (
                        <>
                            <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-opacity duration-300 ease-in-out opacity-100 ">
                            <div className="relative w-full mx-auto max-w-7xl pt-10 transition-transform transform scale-100 md:scale-95">
                                {
                                    listingLoading || locationLoading ? (
                                        <div className="flex justify-center items-center min-h-screen">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                                        </div>
                                    ) : (
                                        <div>

                                             {/* Modal Content */}
                                      <div className="border-0 rounded-lg shadow-lg relative bg-white flex flex-col w-full outline-none focus:outline-none my-10">

                                                {/* Modal Header with Close Button */}
                                                <div className="flex justify-between items-center pt-6 pb-4 px-8 border-b border-solid border-blueGray-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold">{formData?.title}</h3>
                                                    <button
                                                    className="text-2xl font-semibold text-black bg-transparent border-0 outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                    >
                                                    <span className="text-black opacity-75">×</span>
                                                    </button>
                                                </div>

                                                {/* Modal Body */}
                                                <div className="relative p-12 flex-auto">

                                                    {/* Loading Indicator */}
                                                    {listingLoading || locationLoading ? (
                                                    <div className="flex justify-center items-center min-h-screen">
                                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                                                    </div>
                                                    ) : (
                                                    <>
                                                        {/* Title */}
                                                        <label className="block text-gray-700 text-sm font-bold m-2">Property Title</label>
                                                        <input
                                                        type="text"
                                                        value={formData?.title}
                                                        onChange={handleChange}
                                                        placeholder="Enter your property title (e.g., Cozy Urban Retreat)"
                                                        name="title"
                                                        className="mt-4 w-full border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-black transition"
                                                        required
                                                        />

                                                        {/* Description */}
                                                        <label className="block text-gray-700 text-sm font-bold m-2">Property Description</label>
                                                        <textarea
                                                        placeholder="Describe your property..."
                                                        value={formData?.description}
                                                        onChange={handleChange}
                                                        name="description"
                                                        className="mt-4 border border-gray-400 w-full rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
                                                        rows={10}
                                                        required
                                                        />

                                                        {/* Image Upload and Preview */}
                                                        <label className="block text-gray-700 text-sm font-bold m-2">Property Images</label>
                                                        <input
                                                        type="file"
                                                        name="images"
                                                        accept="image/*"
                                                        multiple
                                                        className="mt-4 w-full border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-black transition"
                                                        onChange={handleImageChange}
                                                        />
                                                        
                                                        {/* Image Previews */}
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                        {formData.images && formData.images.length > 0 ? (
                                                            <>
                                                            <div className="col-span-1 md:col-span-1 mb-4">
                                                                <img
                                                                src={`${backEndUrl}/${formData.images[0].image_url}`}
                                                                alt="Preview 1"
                                                                className="w-full h-auto rounded-lg shadow-lg"
                                                                style={{ height: '300px', objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                            {formData.images.slice(1).map((image, index) => (
                                                                <div key={index} className="col-span-1 mb-4">
                                                                <img
                                                                    src={`${backEndUrl}/${image.image_url}`}
                                                                    alt={`Preview ${index + 2}`}
                                                                    className="w-full h-auto rounded-md shadow-md"
                                                                    style={{ height: '150px', objectFit: 'cover' }}
                                                                />
                                                                </div>
                                                            ))}
                                                            </>
                                                        ) : (
                                                            <div className="col-span-3 text-center text-gray-500">No images uploaded</div>
                                                        )}
                                                        </div>

                                                        {/* Number of Beds, Baths, etc. */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                                                        {/* Input fields for Beds, Bedrooms, Bathrooms, Max Guests */}
                                                        <div className="flex flex-col ">
                                                            <label className="block text-gray-700 text-sm font-bold m-2">Number of Beds</label>
                                                            <input
                                                            type="number"
                                                            name="beds"
                                                            placeholder="0"
                                                            value={formData?.beds}
                                                            onChange={handleChange}
                                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                                            min="0"
                                                            />  
                                                        </div>
                                                    <div className="flex flex-col ">
                                                    <label className="block text-gray-700 text-sm font-bold m-2">Number of bedrooms</label>
                                                            <input
                                                            type="number"
                                                            name="bedrooms"
                                                            placeholder="0"
                                                            value={formData?.bedrooms}
                                                            onChange={handleChange}
                                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                                            min="0"
                                                            />
                                                    </div>

                                                    <div className="flex flex-col ">
                                                    <label className="block text-gray-700 text-sm font-bold m-2">Number of Bathrooms</label>
                                                            <input
                                                            type="number"
                                                            name="bathrooms"
                                                            placeholder="0"
                                                            value={formData?.bathrooms}
                                                            onChange={handleChange}
                                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                                            min="0"
                                                            />
                                                    </div>


                                                    <div className="flex flex-col ">
                                                    <label className="block text-gray-700 text-sm font-bold m-2">Number of Guest</label>
                                                            <input
                                                            type="number"
                                                            name="max_guest"
                                                            placeholder="0"
                                                            value={formData?.max_guest}
                                                            onChange={handleChange}
                                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                                            min="0"
                                                            />
                                                    </div>
                                                        
                                                </div>

                                                        {/* Location */}
                                                        <label className="block text-gray-700 text-sm font-bold m-2">Location</label>
                                                        <select
                                                        value={formData?.location_id}
                                                        onChange={handleChange}
                                                        id="location_id"
                                                        name="location_id"
                                                        className="w-full border border-gray-300 rounded p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                                                        >
                                                        <option value="">Select Location</option>
                                                        {locations.map((location, index) => (
                                                            <option key={index} value={location.id}>
                                                            {`${location.country} - ${location.region} - ${location.city}`}
                                                            </option>
                                                        ))}
                                                        </select>

                                                        {/* Start and End Date */}
                                                        <div className="mt-8">
                                                        <label className="block text-gray-700 text-sm font-bold m-2">Start Date</label>
                                                        <input
                                                            value={formData?.start_date}
                                                            onChange={handleChange}
                                                            type="date"
                                                            id="start_date"
                                                            name="start_date"
                                                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ease-in-out hover:border-blue-400"
                                                        />
                                                        </div>

                                                        {/* End Date */}
                                                        <div className="mt-8">
                                                        <label className="block text-gray-700 text-sm font-bold m-2">End Date</label>
                                                        <input
                                                            value={formData?.end_date}
                                                            onChange={handleChange}
                                                            type="date"
                                                            id="end_date"
                                                            name="end_date"
                                                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ease-in-out hover:border-blue-400"
                                                        />
                                                        </div>

                                                        {/* Home Rules */}
                                                        <label className="block text-gray-700 text-sm font-bold m-2">Home Rules and Regulations</label>
                                                        <textarea
                                                        value={formData?.rules}
                                                        onChange={handleChange}
                                                        id="rules"
                                                        name="rules"
                                                        placeholder="Add a brief description of the rules you want your guests to follow."
                                                        className="w-full border border-gray-300 rounded p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                                                        rows={6}
                                                        />
                                                    </>
                                                    )}

                                                </div>

                                                {/* Footer */}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                    className="text-red-500 font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                    >
                                                    Close
                                                    </button>
                                                    <button
                                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => handleSaveChanges(listing?.id)}
                                                    >
                                                    Save Changes
                                                    </button>
                                                </div>
                                                </div>

                                        </div>
                                    )
                        
                                    }
                               
                            </div>
                            </div>
                            <div className="opacity-50 fixed inset-0 bg-black z-40"></div>
                        </>
                        ) : null}



            <div className="px-6 py-6">
                <h1 className="text-3xl font-bold text-gray-800">Manage Your Listings</h1>
                <p className="mt-2 text-gray-600">
                    Welcome to your Listings Page! Here, you can manage all the properties you have listed. Easily view the details of each listing, update information, and monitor the performance of your listings to ensure a great experience for your guests. This is where you can showcase the best of what you offer and attract potential bookings!
                </p>

                <p className="mt-1 text-black" style={{ fontWeight: '800' }}>
                  You currently have <strong>{numberOfListings}</strong> listings to review.
              </p>

            </div>
            
            {/* Main Content */}
            {numberOfListings === 0 ? (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500 font-semibold">No Listings yet.</p>
                </div>
            ) : (
                <div className="containe mx-auto px-6 py-10 ">
                    <div className="">
                        <table className="min-w-full text-left text-normal font-normal border-collapse">
                            <thead className="bg-gray-100 text-black font-bold">
                                <tr>
                                    <th className="py-4 px-5 border-b">Listing</th>
                                    <th className="py-4 px-5 text-center border-b">Bathrooms</th>
                                    <th className="py-4 px-5 text-center border-b">Bedrooms</th>
                                    <th className="py-4 px-5 text-center border-b">Beds</th>
                                    <th className="py-4 px-5 text-center border-b">Starting Date</th>
                                    <th className="py-4 px-5 text-center border-b">Ending Date</th>
                                    <th className="py-4 px-5 text-center border-b">Price per Night</th>
                                    <th className="py-4 px-5 text-center border-b">Status</th>
                                    <th className="py-4 px-5 text-center border-b">Confirmed</th>
                                    <th className="py-4 px-5 text-center border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myListings?.map((listing, index) => (
                                    <tr key={listing.id} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                        <td className="py-4 px-5 border-r">
                                            <div className="flex items-center">
                                                <img
                                                    src={`${backEndUrl}/${listing?.item_images.find(image => image.isMain === 1).image_url}`}
                                                    className="w-12 h-12 rounded-lg"
                                                    alt={listing.title}
                                                />
                                                <span className="ml-3 truncate" style={{ maxWidth: '200px' }}>{listing.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-5 text-center border-r">{listing.bathrooms}</td>
                                        <td className="py-4 px-5 text-center border-r">{listing.bedrooms}</td>
                                        <td className="py-4 px-5 text-center border-r">{listing.beds}</td>
                                        <td className="py-4 px-5 text-center border-r">{new Date(listing.start_date).toLocaleDateString()}</td>
                                        <td className="py-4 px-5 text-center border-r">{new Date(listing.end_date).toLocaleDateString()}</td>
                                        <td className="py-4 px-5 text-center border-r">br {listing.price_per_night}</td>
                                        <td className="py-4 px-5 text-center border-r">
                                            <span className={`px-3 py-1 rounded-full font-semibold ${listing.status === 'active' ? 'bg-green-100 text-green-600' : listing.status === 'inactive' ? 'bg-yellow-100 text-yellow-600' : listing.status === 'soldout' ? 'bg-red-100 text-red-600' : listing.status === 'inactive' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-center">
                                            <span className={`px-3 py-1 rounded-full font-semibold ${listing.confirmed === 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                {listing.confirmed === 1 ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-5 text-center relative" ref={dropdownRef}>
                                            <BsThreeDotsVertical
                                                className="cursor-pointer text-gray-600 hover:text-gray-800"
                                                onClick={() => handleDropdownToggle(listing.id)}
                                            />
                                            {dropdownVisible === listing.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                    {listing.bookings.length > 0 ? (
                                                        <p className="px-5 py-2 text-sm text-red-400">
                                                            There is a booking, so you can’t delete or update.
                                                        </p>
                                                    ) : (
                                                        <div>
                                                            <button
                                                                onClick={() => handleAction(listing.id, 'update')}
                                                                className="w-full px-4 py-2 text-sm text-green-600 hover:bg-green-100 transition-colors"
                                                            >
                                                                Update
                                                            </button>
                                                            <button 
                                                            onClick={() => handleAction(listing.id, 'delete')} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition-colors" >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Footer */}
            <Footer/>
        </div>
    );
};

export default HostListingPage;

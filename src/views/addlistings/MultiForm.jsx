import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useListingStore from '../../stores/ListingStore';
import locationStore from '../../stores/LocationStore';
import catagoryStore from '../../stores/CatagoryStore';
import { useNavigate } from 'react-router-dom';
import ListingNotificationCard from '../../components/listing/ListingNotificationCard';
function MultiForm() {

    const {locations, getAllLocations} = locationStore();
    const {catagories, getCatagories} = catagoryStore();
    const { formData, setFormData, clearFormData  ,addListing , loading } = useListingStore();
    const [step, setStep] = useState(1);
    const totalSteps = 9;
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ visible: false, type: '', message: '' });
   
    // const stepTitles = [
    //     "Categories",    
    //     "Title & Desc",  
    //     "Guests, Beds & Baths",
    //     "Photos",
    //     "Pricing",                       
    //     "House Rules" ,
    //     "Submit",
    // ];
    


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

 
    const nextStep = () => {
        if (validateStep()) {
            setStep(step + 1);
        } else {
            alert("Please fill in all required fields.");
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const validateStep = () => {
        switch (step) {
            case 1: return formData.categories?.length > 0;
            case 2: return formData.title && formData.description;
            case 3: return formData.images && formData.images?.length > 0;
            case 4: return formData.beds && formData.max_guest &&formData.bathrooms;
            case 5: return formData.location_id;
            case 6: return formData.start_date && formData.end_date;
            case 7: return formData.price_per_night;
            case 8: return formData.rules;
            default: return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit form data to backend    
        try {
            await (addListing(formData));
            setNotification({ visible: true, type: 'success', message: 'Successfully added your listing!' });
            clearFormData();
            setTimeout(() => {
                navigate('/');
            }, 5000);
        }catch (error) {
            console.error('Error adding listing:', error);
            setNotification({ visible: true, type: 'error', message: error.message || 'An error occurred while adding the listing.' });
        } 
        
    };

    const closeNotification = () => {
        setNotification({ visible: false, type: '', message: '' }); // Hide notification
    };
     // feach location 
     useEffect(() => {
        const fetchLocation = async () => {
            await getAllLocations();
        }
        fetchLocation();
    } ,[]);

    // feach catagory 
    useEffect(() => {
        const fetchCatagory = async () => {
            await getCatagories();
        }
        fetchCatagory();
    } ,[]);
 
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-white">
            <div className="container max-w-screen-xl mx-auto">
                <div className="text-6xl font-bold whitespace-pre-line text-center tracking-tighter">
                    Create Your Listing
                </div>
                <div className="mt-12">
                    <div className="flex items-center justify-between">
                        {[...Array(totalSteps)].map((_, index) => (
                            <div key={index} className="flex-1 flex items-center">
                                <div className="relative flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${index < step ? 'bg-green-500 text-white' : index === step ? 'bg-black text-white' : 'border-gray-400 text-gray-400'}`}>
                                        {index + 1}
                                    </div>
                                    <div className={`mt-2 text-sm ${index < step ? 'font-semibold text-gray-500' : 'text-gray-400'}`}>
                                        Step {index + 1}
                                    </div>
                                </div>
                                {index < totalSteps - 1 && <div className="flex-1 h-1 mx-2 bg-gray-400"></div>}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-center">
                        <div className={`text-lg font-semibold`}>
                            {step === 1 && "Select a Category"}
                            {step === 2 && "Add Title and Description"}
                            {step === 3 && "Upload Images"}
                            {step === 4 && "Enter Property Details"}
                            {step === 5 && "Set Location"}
                            {step === 6 && "Set Pricing"}
                            {step === 7 && "Add Your House Rules"}
                            {step === 8 && "Review Your Listing"}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-12 md:w-4/5 mx-auto rounded-3xl p-8 shadow-lg bg-white">
                    
                    {step === 1 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="py-8 px-6"
                        >
                            <div className="text-base font-light text-center">Step 1/8</div>
                            <div className="mt-4 text-3xl font-semibold text-center">Select Categories</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {catagories.map((category) => {
                                    const isSelected = formData.categories.includes(category.id);
                                    return (
                                        <div
                                            key={category.id} // Use category.id instead of index for better key management
                                            onClick={() => {
                                                const newCategories = isSelected 
                                                    ? formData.categories.filter(catId => catId !== category.id) 
                                                    : [...formData.categories, category.id];
                                                setFormData({ ...formData, categories: newCategories });
                                            }}
                                            className={`relative p-4 border rounded-lg shadow-md flex items-center cursor-pointer transition-transform duration-200 hover:scale-105 ${isSelected ? 'bg-green-500 text-white' : 'bg-white border-gray-300 hover:bg-gray-100'}`}
                                        >
                                            {/* Category icon alongside the label */}
                                            <i className={`${category.icon} text-2xl mr-2`}></i>
                                            <span className={`text-xl text-center flex-grow ${isSelected ? 'font-bold' : 'font-medium'}`}>{category.name}</span>
                                            {/* Optional: Add a checkmark icon if the category is selected */}
                                            {isSelected && <i className="fas fa-check absolute top-2 right-2 text-white"></i>}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-center mt-6">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className={`bg-black text-white font-bold py-2 px-6 rounded hover:bg-gray-800 transition ${!validateStep() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!validateStep()}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}


                    {step === 2 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="py-8"
                        >
                            <div className="text-base font-light text-center">Step 2/8</div>
                            <div className="mt-4 text-2xl font-semibold text-center">
                                Add Title and Description
                            </div>
                            <div className="mt-2 text-center text-gray-600">
                                Detail the key aspects of your listing, from interior design to outdoor spaces. Your words will help guests imagine their perfect getaway.
                            </div>
                            
                            <input
                                type="text"
                                placeholder="Enter your property title (e.g., Cozy Urban Retreat)"
                                name="title"
                                className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                                value={formData.title}
                                onChange={handleChange}
                            />
                            
                            <textarea
                                placeholder="Describe your property: Experience the perfect blend of comfort and luxury in our beautifully appointed [Type of Property: e.g., apartment, villa, cottage]. Nestled in the heart of [Location], our space is designed to be your tranquil retreat while providing easy access to the vibrant local culture."
                                name="description"
                                className="mt-4 border border-gray-400 w-full rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
                                rows={20}
                                value={formData.description}
                                onChange={handleChange}
                            />
                            
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition"
                                    disabled={!validateStep()}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}


                    {step === 3 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="py-8"
                        >
                            <div className="text-base font-light text-center">Step 3/8</div>
                            <div className="mt-4 text-3xl text-center">Upload Images</div>
                            <div className="mt-2 text-center text-gray-600">
                                To showcase your property effectively, please upload **more than 5 images**. Include photos of the interior, exterior, and any unique features.
                            </div>
                            
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                            />
                            
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition"
                                    disabled={!validateStep() || formData.images?.length <= 5} // Disable button if less than 6 images are uploaded
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}


{step === 4 && (
    <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="py-8 px-4 md:px-8 lg:px-16"
    >
        {/* Step Indicator */}
        <div className="text-sm font-light text-center text-gray-500">Step 4 of 8</div>

        {/* Section Title */}
        <div className="mt-4 text-3xl text-center font-semibold text-gray-900">Enter Property Details</div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {/* Number of Beds */}
            <div className="flex flex-col">
                <label htmlFor="beds" className="text-lg font-medium text-gray-700 mb-2">Number of Beds</label>
                <input
                    type="number"
                    name="beds"
                    placeholder="0"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={formData.beds}
                    min="0"
                    onChange={handleChange}
                />
            </div>

            {/* Number of Bedrooms */}
            <div className="flex flex-col">
                <label htmlFor="bedrooms" className="text-lg font-medium text-gray-700 mb-2">Number of Bedrooms</label>
                <input
                    type="number"
                    id='bedrooms'
                    name="bedrooms"
                    placeholder="0"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={formData.bedrooms}
                    min="0"
                    onChange={handleChange}
                />
            </div>

            {/* Number of Bathrooms */}
            <div className="flex flex-col">
                <label htmlFor="bathrooms" className="text-lg font-medium text-gray-700 mb-2">Number of Bathrooms</label>
                <input
                    type="number"
                    name="bathrooms"
                    id='bathrooms'
                    placeholder="0"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={formData.bathrooms}
                    min="0"
                    onChange={handleChange}
                />
            </div>

            {/* Max Guests */}
            <div className="flex flex-col">
                <label htmlFor="max_guest" className="text-lg font-medium text-gray-700 mb-2">Max Guests</label>
                <input
                    type="number"
                    name="max_guest"
                    id='max_guest'
                    placeholder="0"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={formData.max_guest}
                    min="0"
                    onChange={handleChange}
                />
            </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
            <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-black font-semibold py-2 px-6 rounded-md hover:bg-gray-400 transition duration-200"
            >
                Previous
            </button>

            <button
                type="button"
                onClick={nextStep}
                className={`bg-black text-white font-semibold py-2 px-6 rounded-md hover:bg-gray-700 transition duration-200 ${!validateStep() ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!validateStep()}
            >
                Next
            </button>
        </div>
    </motion.div>
)}




                    {step === 5 && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="py-8 px-4 md:px-8 lg:px-16 bg-white shadow-lg rounded-lg"
                    >
                        <div className="text-base font-light text-center text-gray-500">Step 5/8</div>
                        <div className="mt-4 text-3xl font-semibold text-center text-gray-800">
                        Add Location
                        </div>

                        <div className="mt-6">
                        <label htmlFor="location_id" className="text-lg font-medium text-gray-700">
                            Location
                        </label>
                        <select
                            id="location_id"
                            name="location_id"
                            className="w-full border border-gray-300 rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                            value={formData.location_id} 
                            onChange={handleChange}
                        >
                            <option value="">Select Location</option>
                            {locations.map((location, index) => (
                            <option key={index} value={location.id}>
                                {`${location.country} - ${location.region} - ${location.city}`}
                            </option>
                            ))}
                        </select>
                        </div>

                        <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={prevStep}
                            className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={nextStep}
                            className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition"
                            disabled={!validateStep()}
                        >
                            Next
                        </button>
                        </div>
                    </motion.div>
                    )}

                    
                    {step === 6 && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="py-12 px-8 md:px-12 lg:px-24 bg-white shadow-2xl rounded-2xl"
                    >
                        {/* Step Indicator */}
                        <div className="text-sm font-medium text-center text-gray-400 tracking-wider">Step 6/8</div>

                        {/* Heading */}
                        <div className="mt-4 text-4xl font-extrabold text-center text-gray-800">
                        Set Your Availability
                        </div>

                        {/* Subheading */}
                        <div className="mt-2 text-base font-normal text-center text-gray-500">
                        Please choose the dates you are available for hosting
                        </div>

                        {/* Start Date Input */}
                        <div className="mt-8">
                        <label htmlFor="start_date" className="block text-lg font-semibold text-gray-700 mb-3">
                            Start Date
                        </label>
                        <div className="relative">
                            <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ease-in-out hover:border-blue-400"
                            value={formData.start_date}
                            onChange={handleChange}
                            />
                            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            📅
                            </span>
                        </div>
                        </div>

                        {/* End Date Input */}
                        <div className="mt-8">
                        <label htmlFor="end_date" className="block text-lg font-semibold text-gray-700 mb-3">
                            End Date
                        </label>
                        <div className="relative">
                            <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 ease-in-out hover:border-blue-400"
                            value={formData.end_date}
                            onChange={handleChange}
                            />
                            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                            📅
                            </span>
                        </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-10">
                        {/* Previous Button */}
                        <button
                            type="button"
                            onClick={prevStep}
                            className="bg-gray-100 text-gray-700 font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 hover:text-gray-900 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Previous
                        </button>

                        {/* Next Button */}
                        <button
                            type="button"
                            onClick={nextStep}
                            className={`${
                            !validateStep() ? 'bg-gray-400' : 'bg-black'
                            } text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                            !validateStep() ? 'hover:bg-gray-500' : 'hover:bg-gray-700'
                            }`}
                            disabled={!validateStep()}
                        >
                            Next
                        </button>
                        </div>
                    </motion.div>
                    )}


                    {step === 7 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="py-8 px-4 md:px-8 lg:px-16 bg-white shadow-lg rounded-lg"
                        >
                            <div className="text-base font-light text-center text-gray-500">Step 6/8</div>
                            <div className="mt-4 text-3xl font-semibold text-center text-gray-800">Set Pricing</div>

                            <div className="mt-8 flex flex-col items-center">
                                <label className="text-lg font-medium text-gray-700 mb-4">
                                    Price: <span className="text-black font-bold">bir{formData.price_per_night}</span>
                                </label>

                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={formData.price_per_night}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2 transition focus:outline-none focus:ring-2 focus:ring-gray-400 hover:bg-gray-300"
                                    onChange={(e) => handleChange({ target: { name: 'price_per_night', value: e.target.value } })}
                                />

                                <input
                                    type="number"
                                    name="price_per_night"
                                    placeholder="Enter Price"
                                    className="mt-4 w-1/4 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-400 transition shadow-sm text-center font-bold"
                                    value={formData.price_per_night}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-300 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Previous
                                </button>

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-black text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black"
                                    disabled={!validateStep()}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}

                   
                    
                    {step === 8 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="py-8 px-4 md:px-8 lg:px-16 bg-white shadow-lg rounded-lg"
                        >
                            <div className="text-base font-light text-center text-gray-500">Final Step - 7/8</div>
                            <div className="mt-4 text-3xl font-semibold text-center text-gray-800">
                                Add Your Home Rules
                            </div>

                            <div className="mt-6">
                                <label
                                    htmlFor="homeRules"
                                    className="text-lg font-medium text-gray-700"
                                >
                                    Home Rules Description
                                </label>
                                <textarea
                                    id="rules"
                                    name="rules"
                                    placeholder="Add a brief description of the rules you want your guests to follow."
                                    className="w-full border border-gray-300 rounded p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-black transition"
                                    rows={9}
                                    value={formData.rules}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-between mt-8">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-300 text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                >
                                    Previous
                                </button>

                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-black text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-gray-800 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black"
                                    disabled={!validateStep()}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    )}

                  

                    {step === 9 && (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="py-8 px-4 md:px-8 lg:px-16 bg-white shadow-lg rounded-lg"
                        >
                            <div className="text-base font-light text-center text-gray-500">Step 8/8</div>
                            <div className="mt-4 text-3xl font-semibold text-center text-gray-800">Review Your Listing</div>

                            <div className="mt-6 text-left space-y-4">
                                {/* Step 1: Category */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Category:</strong> {formData.categories?.length > 0 ? formData.categories.join(', ') : 'N/A'}
                                    </div>
                                </div>

                                {/* Step 2: Title */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Title:</strong> {formData.title || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 3: Description */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Description:</strong> {formData.description || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 4: Property Details */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Number of Beds:</strong> {formData.beds || 'N/A'}
                                    </div>
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Max Guests:</strong> {formData.max_guest || 'N/A'}
                                    </div>
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Bedrooms:</strong> {formData.bedrooms || 'N/A'}
                                    </div>
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Bathrooms:</strong> {formData.bathrooms || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 5: Location */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Location:</strong> {formData.location_id || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 6: Rules */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>House Rules:</strong> {formData.rules || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 7: Pricing */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Price per Night:</strong> ${formData.price_per_night || 'N/A'}
                                    </div>
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Start Date:</strong> {formData.start_date || 'N/A'}
                                    </div>
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>End Date:</strong> {formData.end_date || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 8: Images */}
                                <div className="mt-4">
                                    <strong>Images:</strong>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {formData.images && formData.images?.length > 0 ? (
                                        <>
                                            <div className="col-span-1 md:col-span-1 mb-4">
                                                <img
                                                    src={URL.createObjectURL(formData.images[0])}
                                                    alt="Preview 1"
                                                    className="w-full h-auto rounded-lg shadow-lg"
                                                    style={{ height: '300px', objectFit: 'cover' }} // Larger first image
                                                />
                                            </div>
                                            {formData.images.slice(1).map((image, index) => (
                                                <div key={index} className="col-span-1 mb-4">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Preview ${index + 2}`}
                                                        className="w-full h-auto rounded-md shadow-md"
                                                        style={{ height: '150px', objectFit: 'cover' }} // Smaller images
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="col-span-3 text-center text-gray-500">No images uploaded</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:bg-gray-400 hover:scale-105"
                                >
                                    Previous
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:bg-green-600 hover:scale-105"
                                >
                                    Submit
                                </button>
                            </div>
                        </motion.div>
                    )}


                    
                </form>
            </div>
        
        {/* Notification Pop-Up */}
        <ListingNotificationCard
                visible={notification.visible}
                type={notification.type}
                message={notification.message}
                onClose={closeNotification}
            />
    
        </div>

    );
}

export default MultiForm;

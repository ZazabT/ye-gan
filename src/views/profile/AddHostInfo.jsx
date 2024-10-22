import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ListingNotificationCard from '../../components/listing/ListingNotificationCard';
import hostProfileStore from '../../stores/HostProfile';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { add, set } from 'date-fns';


function AddHostInfo() {
    const [step, setStep] = useState(1);
    const totalSteps = 8;
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ visible: false, type: '', message: '' });
    const { formData, setFormData, clearFormData  , createHostProfile , error:addHostInfoError} = hostProfileStore();
  
    

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
          ...formData,
          [name]: value,
      });
  };

  const handlePhoneChange = (value) => {
    // Use the setFormData method from Zustand store to update phone_number
    hostProfileStore.getState().setFormData({ phone_number: value });
    
    // Log the updated form data using Zustand's getState to see the latest state
    const updatedFormData = hostProfileStore.getState().formData;
    console.log('Updated FormData:', updatedFormData, value);
};


 // Assuming imagePreview is a state variable for previews
 const [imagePreview, setImagePreview] = useState({
  profilePicture: null,
  front_id: null,
  back_id: null,
});

const handleFileChange = (event) => {
  const { name, files } = event.target;
  const file = files[0];

  if (file) {
    // Update the Zustand store with the file
    hostProfileStore.getState().setFormData({
      [name]: file,
    });

    // Create a FileReader to preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview((prev) => ({
        ...prev,
        [name]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  }
};



 
    const nextStep = () => {
        if (validateStep()) {
            setStep(step + 1);
        } else {
            alert("Please fill in all required fields.");
        }

        console.log(formData)
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const validateStep = () => {
        switch (step) {
            case 1: return true;
            case 2: return formData.username && formData.hostDescription;
            case 3: return formData.profilePicture !== null;
            case 4: return formData.country && formData.region && formData.city;
            case 5: return formData.phone_number;
            case 6: return formData.facebook || formData.instagram || formData.telegram || formData.tiktok;
            case 7: return formData.front_id !== null && formData.back_id !== null;
            default: return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        // try to submint the info to backend
        try{
             await createHostProfile(formData);
             setNotification({ visible: true, type: 'success', message: 'Successfully added your listing!' });

             // navigate to add listing page after 2 sec 
             setTimeout(() => {
                 navigate('/add-listing');
                 clearFormData();
             } , 2000)
        }catch(error){
          console.error('Error adding listing:', error);
          // Only set notification if an error occurs
          setNotification({ visible: true, type: 'error', message: addHostInfoError || 'An error occurred while adding the listing.' });
        }
        
    };
    
    const closeNotification = () => {
        setNotification({ visible: false, type: '', message: '' }); // Hide notification
    };
    return (
        <div className="relative min-h-screen flex items-center justify-center ">
            <div className="container max-w-screen-xl mx-auto">
            <div className="text-6xl font-bold whitespace-pre-line text-center tracking-tighter">
     Hello You Welcome to your Profile.
</div>
{/* <div className="mt-12">
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
            {step === 1 && "We're happy because you're about to become a host!"}
            {step === 2 && "Add User and Description"}
            {step === 3 && "Upload Profile Photos"}
            {step === 4 && "Enter Current Location"}
            {step === 5 && "Phone Number"}
            {step === 6 && "Social Media"}
            {step === 7 && "Verification"}
            {step === 8 && "Review Your Listing"}
        </div>
    </div>
</div> */}

<form onSubmit={handleSubmit} className="mt-12 md:w-4/5 mx-auto rounded-3xl p-8 shadow-lg bg-white">



{step === 1 && (
    <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="py-12 px-6 md:px-10 lg:px-16"
    >
        {/* Step Indicator */}
        <div className="text-base font-light text-center text-gray-500">Step 1/8</div>

        {/* Section Title */}
        <div className="mt-6 text-4xl font-bold text-center text-gray-800">Get Ready to Be a Host!</div>

        {/* Introductory Text */}
        <p className="mt-4 text-center text-gray-500 text-lg leading-relaxed">
            We&apos;re thrilled because you&apos;re about to join our amazing community of hosts. Before you begin, we just need to gather a bit of information about you to help set you up for success.
        </p>

        {/* Image with Animation */}
        <div className="flex justify-center mt-8 w-full">
    <motion.div
        className="w-full max-full h-auto rounded-lg shadow-xl overflow-hidden"
        initial={{ opacity: 0.85 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
    >
        <video
            src="https://videos.pexels.com/video-files/7578554/7578554-sd_640_360_30fps.mp4"
            className="w-full h-auto object-cover"
            autoPlay
            loop
            muted
            playsInline
        />
    </motion.div>
</div>


        {/* Call to Action Text */}
        <p className="mt-10 text-center text-lg text-gray-700 font-semibold">
            Ready to get started and create your incredible listing?
        </p>

        {/* Motivational Sentence */}
        <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-center text-gray-600 italic"
        >
            Your journey as a host begins here—let's make it memorable!
        </motion.p>

        {/* Additional Motivational Text */}
        <div className="mt-8">
            <p className="text-center text-2xl font-bold text-gray-800 leading-tight">
                Turn your property or activity into a revenue-generating asset!
            </p>
            <p className="text-center mt-4 text-xl text-gray-700 font-semibold leading-tight">
                You’re just moments away from opening doors to new possibilities.
            </p>

            <p className="mt-6 text-center text-lg text-gray-500 leading-relaxed">
                Imagine offering unique stays or memorable experiences that bring joy to travelers from all over the world, while also earning money at your own pace and terms.
            </p>

            <p className="mt-4 text-center text-gray-600 text-lg leading-relaxed">
                Hosting with us means flexibility: set your own rules, control your availability, and choose how much you want to earn. 
                From short-term stays to long-term rentals, you’re in charge of the experience you create.
                Plus, you’ll have the full support of our platform, giving you the tools and tips you need to succeed.
            </p>

            <p className="mt-4 text-center text-gray-500 text-lg leading-relaxed">
                Start today, and you’ll not only earn money but also build lasting connections and memories with people from all walks of life. 
                Whether you’re hosting a cozy home, a vacation property, or a thrilling local activity, we’re here to help every step of the way.
            </p>
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center mt-8">
            <button
                type="button"
                onClick={nextStep}
                className={`bg-[#50087b] text-white font-bold py-3 px-10 rounded-lg hover:bg-purple-700 transition-transform duration-300 transform hover:scale-105 ${
                    !validateStep() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!validateStep()}
            >
                Let&apos;s Go!
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
            Add Your Info
        </div>
        <div className="mt-2 text-center text-gray-600">
            Help your guests get to know you and what you have to offer. Share a little bit about yourself and the space you’re listing.
        </div>

        {/* Host Username Input */}
        <input
            type="text"
            placeholder="Enter your username (e.g., JohnDoe123)"
            name="username"
            className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black transition"
            value={formData.username}
            onChange={handleChange}
        />

        {/* Host Personal Description */}
        <textarea
            placeholder="Describe yourself: Share who you are, your interests, and why you enjoy hosting."
            name="hostDescription"
            className="mt-4 border border-gray-400 w-full rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black transition"
            rows={20}
            value={formData.hostDescription}
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
    className="py-8 px-4 md:px-8 lg:px-16"
  >
    {/* Step Indicator */}
    <div className="text-base font-light text-center text-gray-500">Step 3/8</div>

    {/* Heading */}
    <div className="mt-4 text-3xl font-semibold text-center text-gray-800">Upload Your Profile Picture</div>

    {/* Instructions */}
    <div className="mt-2 text-center text-gray-600">
      A great profile picture helps guests feel more comfortable booking with you. Please upload a clear photo of yourself.
    </div>

    {/* File Input */}
    <input
      type="file"
      name="profilePicture"
      accept="image/*"
      onChange={handleFileChange}
      className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black transition"
    />

    {/* Display Selected Image Preview */}
    {imagePreview.profilePicture && (
      <div className="mt-4 flex justify-center">
        <img
          src={imagePreview.profilePicture}
          alt="Profile Preview"
          className="rounded-full shadow-lg w-32 h-32 object-cover" 
        />
      </div>
    )}

    {/* Navigation Buttons */}
    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={prevStep}
        className="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:bg-gray-400 hover:scale-105"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={nextStep}
        className="bg-black text-white font-bold py-2 px-4 rounded-lg shadow transition-transform transform hover:bg-gray-800 hover:scale-105"
        disabled={!validateStep()} 
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
        <div className="mt-4 text-3xl text-center font-semibold text-gray-900">Enter Your Current Living Location</div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {/* Country */}
            <div className="flex flex-col">
                <label htmlFor="country" className="text-lg font-medium text-gray-700 mb-2">Country</label>
                <input
                    type="text"
                    name="country"
                    placeholder="Ethiopia"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={formData.country}
                    onChange={handleChange}
                />
            </div>

          
            {/* Street Address */}
            <div className="flex flex-col">
                <label htmlFor="street_address" className="text-lg font-medium text-gray-700 mb-2">Region</label>
                <input
                    type="text"
                    name="region"
                    id="street_address"
                    placeholder="Addis Ababa"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={formData.region}
                    onChange={handleChange}
                />
            </div>

             {/* City */}
             <div className="flex flex-col">
                <label htmlFor="city" className="text-lg font-medium text-gray-700 mb-2">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Bole"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    value={formData.city}
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
        className="py-8 px-4 md:px-8 lg:px-16"
    >
        {/* Step Indicator */}
        <div className="text-base font-light text-center text-gray-500">Step 5 of 8</div>

        {/* Section Title */}
        <div className="mt-4 text-3xl font-semibold text-center text-gray-800">Provide Your Phone Number</div>

        {/* Phone Number Input */}
        <label htmlFor="phone_number" className="block text-lg font-semibold text-gray-800 mb-2">
            Phone Number
        </label> 
        <div>
            <PhoneInput
                country={'us'}
                id="phone_number"
                name="phone_number"
                placeholder="Enter your phone number"
                className=""
                value={hostProfileStore.getState().formData.phone_number} // Access the phone number from the store
                onChange={handlePhoneChange} // Call the updated function
                inputProps={{
                    required: true,
                    'aria-label': 'Phone number',
                }}
            />
        </div>

        <p className="mt-2 text-sm text-gray-600">We will send a verification code to this number.</p>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
            <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition transform hover:scale-105"
            >
                Back
            </button>
            <button
                type="button"
                onClick={nextStep}
                className={`bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition transform hover:scale-105 ${
                    !validateStep() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
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
        className="py-12 px-8 md:px-12 lg:px-24"
    >
        {/* Step Indicator */}
        <div className="text-sm font-medium text-center text-gray-400 tracking-wider">Step 6/8</div>

        {/* Heading */}
        <div className="mt-4 text-4xl font-extrabold text-center text-gray-800">
            Add Your Social Media Links
        </div>

        {/* Subheading */}
        <div className="mt-2 text-base font-normal text-center text-gray-500">
            Please enter the links to your social media profiles.
        </div>

        {/* Social Media Links Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
            {/* Facebook */}
            <div className="flex flex-col">
                <label htmlFor="facebook" className="text-lg font-medium text-gray-700 mb-2">Facebook</label>
                <input
                    type="url"
                    name="facebook"
                    placeholder="https://facebook.com/your-profile"
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-[#3e5c9a] transition duration-300"
                    value={formData.facebook}
                    onChange={handleChange}
                />
            </div>

            {/* Instagram */}
            <div className="flex flex-col">
                <label htmlFor="instagram" className="text-lg font-medium text-gray-700 mb-2">Instagram</label>
                <input
                    type="url"
                    name="instagram"
                    placeholder="https://instagram.com/your-profile"
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-pink-500 transition duration-300"
                    value={formData.instagram}
                    onChange={handleChange}
                />
            </div>

            {/* Telegram */}
            <div className="flex flex-col">
                <label htmlFor="telegram" className="text-lg font-medium text-gray-700 mb-2">Telegram</label>
                <input
                    type="url"
                    name="telegram"
                    placeholder="https://telegram.me/your-profile"
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
                    value={formData.telegram}
                    onChange={handleChange}
                />
            </div>

            {/* Other (LinkedIn, Twitter, etc.) */}
            <div className="flex flex-col">
                <label htmlFor="other_social" className="text-lg font-medium text-gray-700 mb-2">Tiktok</label>
                <input
                    type="url"
                    name="tiktok"
                    placeholder="https://tiktok.com/your-profile.com"
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-4 focus:ring-black transition duration-300"
                    value={formData.tiktok}
                    onChange={handleChange}
                />
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
    className="py-8 px-4 md:px-8 lg:px-16"
  >
    {/* Step Indicator */}
    <div className="text-base font-light text-center text-gray-500">Step 7/8</div>

    {/* Heading */}
    <div className="mt-4 text-3xl font-semibold text-center text-gray-800">Upload Your ID (Matawakiya)</div>

    {/* Subheading */}
    <div className="mt-2 text-base font-normal text-center text-gray-500">
      Please upload both the front and back photos of your legal ID (Matawakiya in Amharic).
    </div>

    {/* Front ID Upload */}
    <div className="mt-8">
      <label htmlFor="frontIdImage" className="block text-lg font-medium text-gray-700 mb-3">
        Front of ID (Matawakiya)
      </label>
      <input
        type="file"
        id="frontIdImage"
        name="frontIdImage" 
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-400 transition duration-300"
        onChange={(e) => handleFileChange(e, 'front_id')} // Updated to pass field name
      />
      {/* Preview for Front ID */}
      {imagePreview.front_id && (
        <img
          src={imagePreview.front_id}
          alt="Front ID Preview"
          className="mt-4 w-full h-auto border rounded-lg"
        />
      )}
    </div>

    {/* Back ID Upload */}
    <div className="mt-8">
      <label htmlFor="backIdImage" className="block text-lg font-medium text-gray-700 mb-3">
        Back of ID (Matawakiya)
      </label>
      <input
        type="file"
        id="backIdImage"
        name="backIdImage"  
        accept="image/*"
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-gray-400 transition duration-300"
        onChange={(e) => handleFileChange(e, 'back_id')} // Updated to pass field name
      />
      {/* Preview for Back ID */}
      {imagePreview.back_id && (
        <img
          src={imagePreview.back_id}
          alt="Back ID Preview"
          className="mt-4 w-full h-auto border rounded-lg"
        />
      )}
    </div>

    {/* Navigation Buttons */}
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
                            className="py-8 px-4 md:px-8 lg:px-1"
                        >
                            <div className="text-base font-light text-center text-gray-500">Step 8/8</div>
                            <div className="mt-4 text-3xl font-semibold text-center text-gray-800">Review Your Listing</div>

                            <div className="mt-6 text-left space-y-4">
                                {/* Step 1: Category */}

                                {/* Step 2: Title */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Username:</strong> {formData.username || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 3: Description */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Description:</strong> {formData.hostDescription || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 4: Property Details */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Number of Beds:</strong> {formData.country || 'N/A'}
                                    </div>
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Max Guests:</strong> {formData.region || 'N/A'}
                                    </div>
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Bedrooms:</strong> {formData.bedrooms || 'N/A'}
                                    </div>
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Bathrooms:</strong> {formData.city || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 5: Location */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>Location:</strong> {formData.phone_number || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 6: Rules */}
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                    <div className="font-medium text-lg text-gray-700">
                                        <strong>House Rules:</strong> {formData.facebook || 'N/A'}
                                        <strong>House Rules:</strong> {formData.instagram || 'N/A'}
                                        <strong>House Rules:</strong> {formData.telegram || 'N/A'}
                                        <strong>House Rules:</strong> {formData.tiktok || 'N/A'}
                                    </div>
                                </div>

                                {/* Step 7: Pricing */}
                                {/* Step 8: Images */}
                                <div className="mt-4">
                                    <strong>Images:</strong>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {formData.profilePicture && formData.profilePicture?.length > 0 ? (
                                        <>
                                            <div className="col-span-1 md:col-span-1 mb-4">
                                                <img
                                                    src={URL.createObjectURL(formData.profilePicture[0])}
                                                    alt="Preview 1"
                                                    className="w-full h-auto rounded-lg shadow-lg"
                                                    style={{ height: '300px', objectFit: 'cover' }} // Larger first image
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col-span-3 text-center text-gray-500">No Profile uploaded</div>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {formData.backIdImage && formData.backIdImage?.length > 0 ? (
                                        <>
                                            <div className="col-span-1 md:col-span-1 mb-4">
                                                <img
                                                    src={URL.createObjectURL(formData.backIdImage[0])}
                                                    alt="Preview 1"
                                                    className="w-full h-auto rounded-lg shadow-lg"
                                                    style={{ height: '300px', objectFit: 'cover' }} // Larger first image
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col-span-3 text-center text-gray-500">No Back uploaded</div>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {formData.frontIdImage && formData.frontIdImage?.length > 0 ? (
                                        <>
                                            <div className="col-span-1 md:col-span-1 mb-4">
                                                <img
                                                    src={URL.createObjectURL(formData.frontIdImage[0])}
                                                    alt="Preview 1"
                                                    className="w-full h-auto rounded-lg shadow-lg"
                                                    style={{ height: '300px', objectFit: 'cover' }} 
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="col-span-3 text-center text-gray-500">No Front uploaded</div>
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

export default AddHostInfo;





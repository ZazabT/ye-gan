import { useState } from 'react';
import { motion } from 'framer-motion';
import useListingStore from '../../stores/ListingStore';

function MultiForm() {
    const { formData, setFormData, clearFormData } = useListingStore();
    const [step, setStep] = useState(1);
    const totalSteps = 6;
    const categoriesList = [
        { label: "Apartment", value: "apartment" },
        { label: "House", value: "house" },
        { label: "Cabin", value: "cabin" },
        { label: "Villa", value: "villa" },
        { label: "Condo", value: "condo" },
        { label: "Loft", value: "loft" },
        { label: "Studio", value: "studio" },
        { label: "Townhouse", value: "townhouse" },
    ];


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
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

        console.log(formData);
    };
    

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    // const handleCategoryChange = (value) => {
    
    
    //     setFormData((prevFormData) => {
    //         const categories = prevFormData.categories.includes(value)
    //             ? prevFormData.categories.filter((category) => category !== value)  // Remove if exists
    //             : [...prevFormData.categories, value];  // Add if not exists
    
    //         return { categories };
    //     });
    // };
    
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
            case 1: return formData.categories.length > 0;
            case 2: return formData.title && formData.description;
            case 3: return formData.images && formData.images.length > 0;
            case 4: return formData.beds && formData.maxGuests;
            case 5: return formData.price;
            default: return true;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement submission logic (e.g., API call here)
        // const response = await submitListing(formData);
        clearFormData();
        setStep(6); // Move to confirmation step
    };

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
                            {step === 5 && "Set Pricing"}
                            {step === 6 && "Review Your Listing"}
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
                            className="py-8"
                        >
                            <div className="text-base font-light text-center">Step 1/6</div>
                            <div className="mt-4 text-3xl text-center">Select Categories</div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                {categoriesList.map((category, index) => {
                                    const isSelected = formData.categories.includes(category.value);
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                const newCategories = isSelected 
                                                    ? formData.categories.filter(cat => cat !== category.value) 
                                                    : [...formData.categories, category.value];
                                                setFormData({ ...formData, categories: newCategories });
                                                localStorage.setItem('multiFormData', JSON.stringify({ ...formData, categories: newCategories }));
                                            }}
                                            className={`p-4 border rounded-lg shadow-md flex items-center cursor-pointer transition-colors duration-200 ${isSelected ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                                        >
                                            <span className={`text-xl text-center ${isSelected ? 'font-bold' : ''}`}>{category.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className={`bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition ${!validateStep() ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            <div className="text-base font-light text-center">Step 2/6</div>
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
                                rows={6}
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
                            <div className="text-base font-light text-center">Step 3/6</div>
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
                                    disabled={!validateStep() || formData.images.length <= 5} // Disable button if less than 6 images are uploaded
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
                            <div className="text-base font-light text-center">Step 4/6</div>
                            <div className="mt-4 text-3xl text-center font-semibold">Enter Property Details</div>

                            <div className="flex flex-col md:flex-row md:space-x-4 mt-6">
                                <div className="flex flex-col w-full md:w-1/3">
                                    <label htmlFor="beds" className="text-lg font-medium mb-2">Number of Beds</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        name="beds"
                                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                        value={formData.beds}
                                        min="0" // Prevents negative values
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col w-full md:w-1/3 mt-4 md:mt-0">
                                    <label htmlFor="bathrooms" className="text-lg font-medium mb-2">Number of Bathrooms</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        name="bathrooms"
                                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                        value={formData.bathrooms}
                                        min="0" // Prevents negative values
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex flex-col w-full md:w-1/3 mt-4 md:mt-0">
                                    <label htmlFor="maxGuests" className="text-lg font-medium mb-2">Max Guests</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        name="maxGuests"
                                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                        value={formData.maxGuests}
                                        min="0" // Prevents negative values
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="bg-gray-300 text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className={`bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-200 ${!validateStep() ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            <div className="text-base font-light text-center">Step 5/6</div>
                            <div className="mt-4 text-3xl font-semibold text-center">Set Pricing</div>

                            <div className="mt-6 flex flex-col items-center">
                                <label className="text-lg font-medium">Price: ${formData.price}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000" // Set maximum price limit here
                                    value={formData.price}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                                    onChange={(e) => handleChange({ target: { name: 'price', value: e.target.value } })}
                                />
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Enter Price"
                                    className="mt-4 w-full border border-gray-300 rounded p-2 focus:outline-none"
                                    value={formData.price}
                                    onChange={handleChange}
                                />
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
                        <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="py-8">
                            <div className="text-base font-light text-center">Step 6/6</div>
                            <div className="mt-4 text-3xl text-center">Review Your Listing</div>
                            <div className="mt-6 text-left">
                                <div><strong>Category:</strong> {formData.categories.join(', ')}</div>
                                <div><strong>Title:</strong> {formData.title}</div>
                                <div><strong>Description:</strong> {formData.description}</div>
                                <div><strong>Number of Beds:</strong> {formData.beds}</div>
                                <div><strong>Max Guests:</strong> {formData.maxGuests}</div>
                                <div><strong>Price:</strong> ${formData.price}</div>
                                <div className="mt-4"><strong>Images:</strong></div>
                                <div className="grid grid-cols-3 gap-2">
                                    {formData.images && formData.images.length > 0 ? (
                                        formData.images.map((image, index) => (
                                            <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} className="w-full h-auto rounded-md" />
                                        ))
                                    ) : (
                                        <div>No images uploaded</div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={prevStep} className="bg-gray-300 text-black font-bold py-2 px-4 rounded hover:bg-gray-400 transition">
                                    Previous
                                </button>
                                <button type="submit" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition">
                                    Submit Listing
                                </button>
                            </div>
                        </motion.div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default MultiForm;

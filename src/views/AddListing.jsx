// import { useState } from 'react';
// import axios from 'axios';
// import userAuthStore from '../stores/UserAuthStore';

// const AddListing = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [address, setAddress] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [country, setCountry] = useState('');
//   const [price, setPrice] = useState('');
//   const [maxGuest, setMaxGuest] = useState('');
//   const [noBed, setNoBed] = useState('');
//   const [noBath, setNoBath] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const { isAuthenticated, token } = userAuthStore();

//   const handleImageChange = (e) => {
//     const selectedFiles = e.target.files;
//     setImages(selectedFiles);
//     const previews = Array.from(selectedFiles).map((file) => URL.createObjectURL(file));
//     setImagePreviews(previews);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('address', address);
//     formData.append('city', city);
//     formData.append('state', state);
//     formData.append('country', country);
//     formData.append('price_per_night', price);
//     formData.append('max_guest', maxGuest);
//     formData.append('no_bed', noBed);
//     formData.append('no_bath', noBath);
//     formData.append('start_date', startDate);
//     formData.append('end_date', endDate);

//     Array.from(images).forEach((image) => {
//       formData.append('images[]', image); // Ensure 'images[]' matches the backend's expected key
//     });

//     try {
//       const response = await axios.post('http://localhost:8000/api/listings/add', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Listing created successfully');
//       // Optionally, reset form fields here
//       setTitle('');
//       setDescription('');
//       setAddress('');
//       setCity('');
//       setState('');
//       setCountry('');
//       setPrice('');
//       setMaxGuest('');
//       setNoBed('');
//       setNoBath('');
//       setStartDate('');
//       setEndDate('');
//       setImages([]);
//       setImagePreviews([]);
//     } catch (error) {
//       console.error('There was an error creating the listing!', error);
//       alert('Failed to create listing. Please check console for more details.');
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8">
//       <h2 className="text-3xl font-bold mb-8 text-center">Add New Listing</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
//         {/* Title */}
//         <div>
//           <label className="block text-lg font-medium mb-1">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-lg font-medium mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             rows="4"
//             required
//           ></textarea>
//         </div>

//         {/* Address */}
//         <div>
//           <label className="block text-lg font-medium mb-1">Address</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             required
//           />
//         </div>

//         {/* City, State, Country */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div>
//             <label className="block text-lg font-medium mb-1">City</label>
//             <input
//               type="text"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium mb-1">State</label>
//             <input
//               type="text"
//               value={state}
//               onChange={(e) => setState(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium mb-1">Country</label>
//             <input
//               type="text"
//               value={country}
//               onChange={(e) => setCountry(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//         </div>

//         {/* Price, Max Guests, No. of Beds, No. of Baths */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <div>
//             <label className="block text-lg font-medium mb-1">Price per Night</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium mb-1">Max Guests</label>
//             <input
//               type="number"
//               value={maxGuest}
//               onChange={(e) => setMaxGuest(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium mb-1">Number of Beds</label>
//             <input
//               type="number"
//               value={noBed}
//               onChange={(e) => setNoBed(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium mb-1">Number of Baths</label>
//             <input
//               type="number"
//               value={noBath}
//               onChange={(e) => setNoBath(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//         </div>

//         {/* Dates */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-lg font-medium mb-1">Start Date</label>
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-lg font-medium mb-1">End Date</label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>
//         </div>

//         {/* Images */}
//         <div>
//           <label className="block text-lg font-medium mb-1">Images</label>
//           <input
//             type="file"
//             multiple
//             onChange={handleImageChange}
//             className="w-full p-2 border rounded-md"
            
//           />
//         </div>

//         {/* Image Previews */}
//         <div className="flex space-x-4">
//           {imagePreviews.map((preview, index) => (
//             <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover" />
//           ))}
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="mt-6 bg-blue-600 text-white p-3 rounded-md w-full">
//           Add Listing
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddListing;

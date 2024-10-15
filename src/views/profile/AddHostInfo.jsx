// src/components/HostInput.js

import { useState } from 'react';
import axios from 'axios'; 
import userAuthStore from '../../stores/UserAuthStore';

const AddHostInfo = () => {
  const [hostDescription, setHostDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState([]);
  const { isAuthenticated, token } = userAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formData = new FormData();
    formData.append('host_describtion', hostDescription);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/host/create', formData ,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message); // Display success message
      // Optionally, redirect or reset form here
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('An error occurred while creating the host profile.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Your Host Profile</h1>
      {errors.length > 0 && (
        <div className="mb-4">
          <ul className="text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="host_describtion" className="block text-sm font-medium text-gray-700">Host Description</label>
          <textarea
            id="host_describtion"
            value={hostDescription}
            onChange={(e) => setHostDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
          <input
            type="file"
            id="profile_picture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            className="mt-1 block w-full text-gray-700 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Create Host Profile
        </button>
      </form>
    </div>
  );
};

export default AddHostInfo;

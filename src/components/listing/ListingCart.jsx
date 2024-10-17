import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline'; 

const ListingCart = () => {
  return (
    <div className="relative group">
      <a href="#" className="block rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 bg-white">
        {/* Heart icon for likes */}
        <div className="absolute top-3 right-3 cursor-pointer">
          <HeartIcon className={`h-6 w-6 text-gray-400 transition-colors`} />
        </div>

        <img
          alt=""
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-56 w-full rounded-md object-cover"
        />

        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">Price</dt>
              <dd className="text-lg font-bold text-gray-800">$240,000</dd>
            </div>

            <div>
              <dt className="sr-only">Address</dt>
              <dd className="font-medium text-gray-700">123 Wallaby Avenue, Park Road</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="inline-flex items-center gap-2">
              <svg
                className="h-5 w-5 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                />
              </svg>
              <div>
                <p className="text-gray-500">Parking</p>
                <p className="font-medium">2 spaces</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2">
              <svg
                className="h-5 w-5 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <div>
                <p className="text-gray-500">Bathroom</p>
                <p className="font-medium">2 rooms</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2">
              <svg
                className="h-5 w-5 text-indigo-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <div>
                <p className="text-gray-500">Bedroom</p>
                <p className="font-medium">4 rooms</p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ListingCart;

import React from "react";

const CatagorySlide = ({ catagory }) => {
  return (
    <div className="relative inline-block mx-2 transition-transform duration-300 hover:scale-105">
      <div className="flex flex-col items-center">
        <i className={`${catagory.icon} text-xl text-gray-500 mb-2`} /> 
        <h3 className="font-light text-sm text-center text-gray-800">{catagory.name}</h3> 
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300">
        {catagory.description}
      </div>
    </div>
  );
};

export default CatagorySlide;
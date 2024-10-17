const CatagorySlide = ({ catagory }) => {
  return (
    <div className="relative inline-block mx-2 transition-transform duration-300 hover:scale-105">
      {/* Icon on top */}
      <div className="flex flex-col items-center mb-2">
        <i className={`${catagory.icon} text-xl text-gray-500`} />
        <h3 className="font-light text-sm text-center text-gray-800">{catagory.name}</h3>
      </div>

      {/* Hover description */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#50087b] text-white text-xs p-2 rounded opacity-0 hover:opacity-100 transition-opacity duration-300 z-1000">
        {catagory.description}
      </div>

      {/* Tab navigation similar to the provided template */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CatagorySlide;

import { useEffect } from "react";
import catagoryStore from "../../stores/CatagoryStore";
import CatagorySlide from "./CatagorySlider";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";
import CatagoryLoading from "./CatagoryLoading";

const Catagory = () => {
  const { catagories, getCatagories ,loading} = catagoryStore();

  // Fetch the categories
  useEffect(() => {
    const fetchCatagories = async () => {
      await getCatagories();
    };
    fetchCatagories();
  }, [getCatagories]);

  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollBy({ left: 500, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-between p-4 gap-2 bg-white shadow-md rounded-lg max-h-[100px] overflow-hidden">
        <CatagoryLoading />
      </div>
  );
  }
 

  return (
    <div className="flex items-center justify-between p-4 gap-2 shadow-md rounded-lg max-h-[100px] overflow-hidden ">
      {/* Categories Part */}
      <div className="relative flex-grow overflow-hidden px-10">
        <div className="flex items-center mb-2">
          <button
            aria-label="Slide Left"
            className="opacity-75 hover:opacity-100 transition-opacity duration-300 p-2 bg-gray-200 rounded-full shadow hover:shadow-lg flex justify-center items-center"
            onClick={slideLeft}
          >
            <MdChevronLeft size={30} />
          </button>

          <div
            id="slider"
            className="flex w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
          >
            {catagories?.map((catagory) => (
              <div key={catagory.id} className="inline-block p-2">
                <CatagorySlide catagory={catagory} />
              </div>
            ))}
          </div>

          <button
            aria-label="Slide Right"
            className="opacity-75 hover:opacity-100 transition-opacity duration-300 p-2 bg-gray-200 rounded-full shadow hover:shadow-lg flex justify-center items-center"
            onClick={slideRight}
          >
            <MdChevronRight size={30} />
          </button>
        </div>
      </div>

      {/* Filter Part - positioned next to the slider */}
      <div className="flex items-center border border-gray-300 pl-4 pr-4 p-2 rounded-xl hover:cursor-pointer hover:bg-gray-100 ml-2 transition-colors duration-200">
        <VscSettings size={20} className="text-gray-600" />
        <h3 className="ml-2 text-lg font-medium text-gray-800">Filters</h3>
      </div>
    </div>
  );
};

export default Catagory;

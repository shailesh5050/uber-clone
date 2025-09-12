
import { useEffect } from "react";
const LocationSearchPanel = ({ vehiclePanel, setVehiclePanel,suggestions,setFormData,selectedInput,formData }) => {
  // useEffect(() => {
  //   if (formData.location && formData.destination && 
  //       suggestions.includes(formData.destination)) {
  //     setVehiclePanel(true);
  //   }
  // }, [formData, suggestions, setVehiclePanel]);

 
  return (
    <div className="spacing-responsive">
      {suggestions.map((location, index) => (
        <div
          onClick={() => {setFormData({ ...formData, [selectedInput]: location });}}
          key={index}
          className="btn-touch flex border-2 p-2 sm:p-3 bg-white mb-2 sm:mb-3 select-none cursor-pointer rounded-xl border-gray-200 hover:border-gray-300 active:border-black gap-3 sm:gap-4 shadow-sm items-center justify-start transition-all duration-200 active:scale-95"
        >
          <div className="bg-gray-100 p-2 sm:p-3 rounded-full flex-shrink-0">
            <i className="ri-map-pin-2-fill text-responsive-sm text-gray-600"></i>
          </div>
          <h4 className="font-medium text-responsive-sm text-gray-800 flex-1 min-w-0 truncate">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;

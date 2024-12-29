
import { useEffect } from "react";
const LocationSearchPanel = ({ vehiclePanel, setVehiclePanel,suggestions,setFormData,selectedInput,formData }) => {
  // useEffect(() => {
  //   if (formData.location && formData.destination && 
  //       suggestions.includes(formData.destination)) {
  //     setVehiclePanel(true);
  //   }
  // }, [formData, suggestions, setVehiclePanel]);

 
  return (
    <div>
      {suggestions.map((location, index) => (
        <div
          onClick={() => {setFormData({ ...formData, [selectedInput]: location });}}
          key={index}
          className="flex border-2 p-1 bg-white m-1 select-none cursor-pointer rounded-xl my-2 border-white active:border-black gap-4 shadow-sm items-center justify-start"
        >
          <h2 className="bg-[#eee] p-3 rounded-full m-1">
            <i className="ri-map-pin-2-fill"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;

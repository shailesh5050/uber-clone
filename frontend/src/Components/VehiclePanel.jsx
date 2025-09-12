import React from "react";

const VehiclePanel = ({setConfirmRidePanelOpen,fair,setSelectedVehicle}) => {

  function handleVehicleSelection(vehicleType){
    setSelectedVehicle(vehicleType);
    setConfirmRidePanelOpen(true);
  }

  return (
    <div className="w-full">
      <h3 className="text-responsive-2xl font-semibold mb-4 sm:mb-6">Choose a vehicle</h3>
      
      {/* Vehicle Options */}
      <div className="space-y-3 sm:space-y-4">
        <div 
          onClick={() => handleVehicleSelection('car')} 
          className="btn-touch flex border-gray-300 select-none cursor-pointer w-full px-3 sm:px-4 py-3 sm:py-4 border-2 hover:border-gray-400 active:border-black rounded-xl items-center transition-all duration-200 active:scale-95"
        >
          <img
            src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
            alt="Uber Go"
            className="h-10 sm:h-12 lg:h-14 w-12 sm:w-15 lg:w-16 mr-3 sm:mr-4 lg:mr-5 rounded-sm object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-responsive-sm">
              Uber Go <i className="ri-user-fill"></i>
            </h4>
            <h5 className="font-medium text-responsive-xs text-gray-600">2 mins away</h5>
            <p className="font-light text-responsive-xs text-gray-500">Affordable</p>
          </div>
          <h2 className="text-responsive-lg font-semibold flex-shrink-0">₹{fair.car}</h2>
        </div>

        <div 
          onClick={() => handleVehicleSelection('motorcycle')} 
          className="btn-touch flex border-gray-300 select-none cursor-pointer w-full px-3 sm:px-4 py-3 sm:py-4 border-2 hover:border-gray-400 active:border-black rounded-xl items-center transition-all duration-200 active:scale-95"
        >
          <img
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt="Uber Moto"
            className="h-10 sm:h-12 lg:h-14 w-12 sm:w-15 lg:w-16 mr-3 sm:mr-4 lg:mr-5 rounded-sm object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-responsive-sm">
              Uber Moto <i className="ri-user-fill"></i>
            </h4>
            <h5 className="font-medium text-responsive-xs text-gray-600">2 mins away</h5>
            <p className="font-light text-responsive-xs text-gray-500">Affordable</p>
          </div>
          <h2 className="text-responsive-lg font-semibold flex-shrink-0">₹{fair.motorcycle}</h2>
        </div>

        <div 
          onClick={() => handleVehicleSelection('auto')} 
          className="btn-touch flex border-gray-300 select-none cursor-pointer w-full px-3 sm:px-4 py-3 sm:py-4 border-2 hover:border-gray-400 active:border-black rounded-xl items-center transition-all duration-200 active:scale-95"
        >
          <img
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt="Uber Auto"
            className="h-10 sm:h-12 lg:h-14 w-12 sm:w-15 lg:w-16 mr-3 sm:mr-4 lg:mr-5 rounded-sm object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-responsive-sm">
              Uber Auto <i className="ri-user-fill"></i>
            </h4>
            <h5 className="font-medium text-responsive-xs text-gray-600">2 mins away</h5>
            <p className="font-light text-responsive-xs text-gray-500">Affordable</p>
          </div>
          <h2 className="text-responsive-lg font-semibold flex-shrink-0">₹{fair.auto}</h2>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;

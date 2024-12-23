import React from "react";

const VehiclePanel = ({setConfirmRidePanelOpen}) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mt-5">Choose a vehicle</h3>
      {/* Vehicle Options */}
      <div onClick={() => setConfirmRidePanelOpen(true)} className="flex border-gray-300 select-none cursor-pointer w-full mt-1 px-3 py-1 border-2 active:border-black rounded-xl items-center justify-center">
        <img
          src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
          alt="Uber Go"
          className="h-12 mr-5 w-15 rounded-sm"
        />
        <div className="w-1/2">
          <h4 className="font-medium text-sm">
            Uber Go <i className="ri-user-fill"></i>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-light text-xs">Affordable</p>
        </div>
        <h2 className="text-xl font-semibold">₹193.50</h2>
      </div>
      <div onClick={() => setConfirmRidePanelOpen(true)} className="flex border-gray-300 select-none cursor-pointer w-full mt-1 px-3 py-1 border-2 border-black rounded-xl  items-center justify-center">
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
          className="h-12 mr-5 w-15 rounded-sm"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-sm">
            Uber Moto
            <span>
              <i className="ri-user-fill"></i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-light text-xs">Affordable</p>
        </div>
        <h2 className="text-xl font-semibold">₹65.50</h2>
      </div>

      <div onClick={() => setConfirmRidePanelOpen(true)} className="flex border-gray-300 select-none cursor-pointer w-full mt-1 px-3 py-1 border-2 border-black rounded-xl  items-center justify-center">
        <img
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_1152/v1569012915/assets/4f/599c47-7f5c-4544-a5d2-926babc8e113/original/Lux.png"
          alt=""
          className="h-10 mr-5 w-13 rounded-sm"
        />
        <div className=" w-1/2">
          <h4 className="font-medium text-sm">
            Uber Lux
            <span>
              <i className="ri-user-fill"></i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-light text-xs">Luxiury</p>
        </div>
        <h2 className="text-xl font-semibold">₹295.50</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;

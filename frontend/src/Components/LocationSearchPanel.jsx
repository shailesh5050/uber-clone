import React from "react";

const LocationSearchPanel = ({ vehiclePanel, setVehiclePanel }) => {
  const shopLocations = [
    "Sadar Bazaar, Chandni Chowk, Delhi 110006",
    "Fashion Street, Colaba Causeway, Mumbai, Maharashtra 400005",
    "Commercial Street, Shivajinagar, Bengaluru, Karnataka 560001",
    "Johari Bazaar, Gangori Bazar, Jaipur, Rajasthan 302001",
    "T Nagar, Usman Road, Chennai, Tamil Nadu 600017",
    "Mubarakpur, Lalganj Raebareli, Uttar Pradesh",
  ];

  return (
    <div>
      {shopLocations.map((location, index) => (
        <div
          onClick={() => setVehiclePanel(true)}
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

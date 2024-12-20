import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    destination: "",
  });
  const panalRef = useRef(null);
  const closePanelIconRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panalRef.current, {
        height: "70%",
      });
      gsap.to(closePanelIconRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panalRef.current, {
        height: 0,
      });
      gsap.to(closePanelIconRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the action with form data
    console.log("Form Submitted: ", formData);

    if (formData.location && formData.destination) {
      alert(
        `Searching trip from ${formData.location} to ${formData.destination}`
      );
      // Reset the form after submission
      setFormData({
        location: "",
        destination: "",
      });
      setPanelOpen(false);
    } else {
      alert("Please fill in both fields!");
    }
  };

  return (
    <div>
      <img
        src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
        alt=""
        className="w-20 absolute top-0 left-0 mt-4 ml-4"
      />
      <div className="h-screen w-screen relative">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="h-[70%] w-full object-cover"
        />
        <div className="bg-white absolute top-0  flex flex-col justify-end pt-2 h-full bottom-0">
          <h5
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute top-3 opacity-0 right-5 text-2xl"
            ref={closePanelIconRef}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold px-5">Find a trip</h4>
          <div className="h-[30%] p-5">
            <form onSubmit={handleSubmit}>
              <input
                name="location"
                type="text"
                placeholder="Enter your location"
                className="border-2 border-black px-8 py-2 text-base rounded-lg w-full mt-2"
                onClick={() => setPanelOpen(true)}
                value={formData.location}
                onChange={handleChange}
              />
              <input
                name="destination"
                type="text"
                placeholder="Enter your destination"
                className="border-2 border-black px-8 py-2 text-base rounded-lg w-full mt-3"
                value={formData.destination}
                onChange={handleChange}
              />
            </form>
          </div>
          <div ref={panalRef} className="bg-gray-100 h-80">
            <LocationSearchPanel />
          </div>
        </div>
      </div>
      <div className="fixed translate-y-full w-full bg-white p-5 z-10 bottom-0">
        <h3 className="text-2xl font-semibold mt-5">Choose a vehicle</h3>
        <div className="flex border-gray-300 select-none cursor-pointer w-full mt-1 px-3 py-1 border-2 active:border-black rounded-xl  items-center justify-center">
          <img
            src="https://i.pinimg.com/474x/8d/21/7b/8d217b1000b642005fea7b6fd6c3d967.jpg"
            alt=""
            className="h-12 mr-5 w-15 rounded-sm"
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-sm">
              Uber Go{" "}
              <span>
                <i className="ri-user-fill"></i>
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-light text-xs">Affordable</p>
          </div>
          <h2 className="text-xl font-semibold">₹193.50</h2>
        </div>

        <div className="flex border-gray-300 select-none cursor-pointer w-full mt-1 px-3 py-1 border-2 border-black rounded-xl  items-center justify-center">
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

        <div className="flex border-gray-300 select-none cursor-pointer w-full mt-1 px-3 py-1 border-2 border-black rounded-xl  items-center justify-center">
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
    </div>
  );
};

export default Home;

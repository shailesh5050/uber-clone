import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";

// Custom hook for GSAP animations
const useGSAP = (animationCallback, dependencies) => {
  useEffect(() => {
    animationCallback();
  }, dependencies);
};

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const panalRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const closePanelIconRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const [formData, setFormData] = useState({
    location: "",
    destination: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // GSAP animation for the location panel
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
    if (vehiclePanel) {
      gsap.to(panalRef.current, {
        height: 0,
      });
      gsap.to(closePanelIconRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen, vehiclePanel]);

  // GSAP animation for the vehicle panel
  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [vehiclePanel]);

  // GSAP animation for the vehicle panel
  useGSAP(() => {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRidePanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [confirmRidePanelOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.location && formData.destination) {
      alert(
        `Searching trip from ${formData.location} to ${formData.destination}`
      );
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
        alt="Uber Logo"
        className="w-20 absolute top-0 left-0 mt-4 ml-4"
      />
      <div className="h-screen w-screen relative">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
          className="h-[70%] w-full object-cover"
        />
        <div className="bg-white absolute top-0 flex flex-col justify-end pt-2 h-full bottom-0">
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
          <div ref={panalRef} className="bg-gray-100">
            <LocationSearchPanel
              vehiclePanel={vehiclePanel}
              setVehiclePanel={setVehiclePanel}
            />
          </div>
        </div>
      </div>

      {/***************** Vehicle Panel ************************/}
      <div
        ref={vehiclePanelRef}
        className="fixed translate-y-full w-full bg-white p-5 z-10 bottom-0"
      >
        <VehiclePanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} />
      </div>
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full"
      >
        <ConfirmRide setConfirmRidePanelOpen={setConfirmRidePanelOpen} />
      </div>
    </div>
  );
};

export default Home;

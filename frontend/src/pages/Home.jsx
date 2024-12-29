import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
import axios from "axios";
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
  const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] = useState(false);
  const [waitingForDriverPanelOpen, setWaitingForDriverPanelOpen] = useState(false);
  const panalRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const closePanelIconRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);
  const [fair, setFair] = useState(0);
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

  // GSAP animation for the looking for driver panel
  useGSAP(() => {
    if (lookingForDriverPanelOpen) {
      gsap.to(lookingForDriverPanelRef.current, {
        y: 0,
      });
    }else{
      gsap.to(lookingForDriverPanelRef.current, {
        y: "100%",
      });

    }
  }, [lookingForDriverPanelOpen]);

  // GSAP animation for the waiting for driver panel
  useGSAP(() => {
    if (waitingForDriverPanelOpen) {
      gsap.to(waitingForDriverPanelRef.current, {
        y: 0,
      });
    }
  }, [waitingForDriverPanelOpen]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.location && formData.destination) {
      setFormData({
        location: "",
        destination: "",
      });
      setPanelOpen(false);
    } else {
      alert("Please fill in both fields!");
    }
  };
const [suggestions, setSuggestions] = useState([]);
const [selectedInput, setSelectedInput] = useState('');
const debounceTimer = useRef(null);

useEffect(() => {
  if (formData.location || formData.destination) {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-sugestions`, {
          params: {input: selectedInput === 'location' ? formData.location : formData.destination},
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }, 1000);
   // console.log(formData);
  }

  return () => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  };
}, [formData.location, formData.destination]);

// Clear suggestions when input is clicked
  useEffect(() => {
    setSuggestions([]);
  }
  , [selectedInput]);

  //if formData.destination have value and suggestions array contains the value of formData.destination then close suggestion panel
  useEffect(() => {
    if (formData.location && formData.destination && suggestions.includes(formData.destination)) {
      setPanelOpen(false);
    }
  }
  , [formData]);

  //function to get the fair of the ride
  async function getFair() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/get-fair`, {
        pickup: formData.location,
        destination: formData.destination,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFair(response.data);
    } catch (error) {
      console.error('Error fetching fair:', error);
    }
  }
  function findTrip() {
    getFair();
    setVehiclePanel(true);
  }

  

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
                onClick={() => {setPanelOpen(true);setSelectedInput('location')}}
                value={formData.location}
                onChange={handleChange}
                required
              />
              <input
                name="destination"
                type="text"
                placeholder="Enter your destination"
                className="border-2 border-black px-8 py-2 text-base rounded-lg w-full mt-3"
                value={formData.destination}
                onClick={() => {setPanelOpen(true);setSelectedInput('destination')}}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="bg-black text-white w-full py-2 rounded-lg mt-3"
                onClick={() => {
                  findTrip();
                }
                }
              >
                Find Trip
              </button>
            </form>
          </div>
          <div ref={panalRef} className="bg-gray-100">
            <LocationSearchPanel
              vehiclePanel={vehiclePanel}
              setVehiclePanel={setVehiclePanel}
              suggestions={suggestions}
              setFormData={setFormData}
              selectedInput={selectedInput}
              formData={formData}
            />
          </div>
        </div>
      </div>

      {/***************** Vehicle Panel ************************/}
     
        <div
          ref={vehiclePanelRef}
          className="fixed translate-y-full w-full bg-white p-5 z-10 bottom-0"
        >
          <VehiclePanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} fair={fair} />
        </div>
     

      {/***************** Confirm Ride Panel ************************/}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full"
      >
        <ConfirmRide setConfirmRidePanelOpen={setConfirmRidePanelOpen} setLookingForDriverPanelOpen={setLookingForDriverPanelOpen} />
      </div>

      {/***************** Looking For Driver Panel ************************/}
      <div
        ref={lookingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full"
      >
        <LookingForDriver setConfirmRidePanelOpen={setConfirmRidePanelOpen} />
      </div>

      {/***************** Waiting For Driver Panel ************************/}
      <div
        ref={waitingForDriverPanelRef}
        className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-14 translate-y-full"
      >
        <WaitingForDriver setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen} />
      </div>
    </div>
  );
};

export default Home;

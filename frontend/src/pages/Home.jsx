import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
import axios from "axios";
import { useSocket } from "../Context/SocketContext";
import { useUserData } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
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
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [formData, setFormData] = useState({
    location: "",
    destination: "",
  });

  const { socket } = useSocket();
  const { user } = useUserData();
  const [rideData, setRideData] = useState(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    user._id && socket.emit("join", { userId: user._id, isCaptain: false });
  }, [user._id, socket]);

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
    } else {
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
      setPanelOpen(false);
    } else {
      alert("Please fill in both fields!");
    }
  };
  const [suggestions, setSuggestions] = useState([]);
  const [selectedInput, setSelectedInput] = useState('');
  const debounceTimer = useRef(null);

  // Fetch suggestions when user types in location or destination input fields and debounce the API calls
  useEffect(() => {
    if (formData.location || formData.destination) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-sugestions`, {
            params: { input: selectedInput === 'location' ? formData.location : formData.destination },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setSuggestions(response.data);
        } catch (error) {
          setError('Error fetching suggestions');
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
      setError('Error fetching fair');
    }
  }
  function findTrip() {
    getFair();
    setVehiclePanel(true);
  }

  //function to book a ride
  async function createRide() {
    // console.log(pickup, destination, selectedVehicle);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/create-ride`, {
        pickup: formData.location,
        destination: formData.destination,
        vehicleType: selectedVehicle,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLookingForDriverPanelOpen(true);
    } catch (error) {
      setError('Error booking ride');
    }
  }

  useEffect(() => {

    if (socket) {

      socket.on("ride-confirmed", (data) => {
        if (data?.ride) {
          setRideData(data.ride);
          setVehiclePanel(false);
          setWaitingForDriverPanelOpen(true);

        } else {
          setError('Invalid data received for ride-confirmed');
        }
      });
    }
  }, [socket])

  useEffect(() => {
    if (socket) {
      socket.on("ride-started", (data) => {
        if (data?.ride) {

          setWaitingForDriverPanelOpen(false);
          navigate("/riding", { state: { ride: data.ride } });

        } else {
          setError('Invalid data received for ride-started');
        }
      });
    }
  }, [socket])
  return (
    <div className="relative">
      <img
        src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
        alt="Uber Logo"
        className="w-16 sm:w-20 lg:w-24 absolute top-0 left-0 mt-2 sm:mt-4 ml-2 sm:ml-4 z-20 pt-safe pl-safe"
      />
      <div className="min-h-screen-safe w-full relative overflow-hidden">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
          className="h-[60%] sm:h-[65%] lg:h-[70%] w-full object-cover"
        />
        <div className="bg-white absolute top-0 flex flex-col justify-end pt-2 h-full bottom-0 w-full">
          <h5
            onClick={() => {
              setPanelOpen(false);
            }}
            className="btn-touch absolute top-3 opacity-0 right-3 sm:right-5 text-xl sm:text-2xl cursor-pointer z-10"
            ref={closePanelIconRef}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-responsive-2xl font-semibold spacing-responsive-x mb-2 sm:mb-4">Find a trip</h4>
          <div className="min-h-[30%] spacing-responsive">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                name="location"
                type="text"
                placeholder="Enter your location"
                className="btn-touch border-2 border-gray-300 focus:border-black px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-responsive-base rounded-lg w-full transition-colors duration-200"
                onClick={() => { setPanelOpen(true); setSelectedInput('location') }}
                value={formData.location}
                onChange={handleChange}
                required
              />
              <input
                name="destination"
                type="text"
                placeholder="Enter your destination"
                className="btn-touch border-2 border-gray-300 focus:border-black px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-responsive-base rounded-lg w-full transition-colors duration-200"
                value={formData.destination}
                onClick={() => { setPanelOpen(true); setSelectedInput('destination') }}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="btn-touch bg-black text-white w-full py-3 sm:py-4 rounded-lg text-responsive-base font-medium hover:bg-gray-800 active:scale-95 transition-all duration-200"
                onClick={() => {
                  findTrip();
                }
                }
              >
                Find Trip
              </button>
            </form>
          </div>
          <div ref={panalRef} className="bg-gray-100 overflow-y-auto">
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
        className="fixed translate-y-full w-full bg-white spacing-responsive z-20 bottom-0 pb-safe rounded-t-2xl shadow-2xl max-h-[80vh] overflow-y-auto"
      >
        <VehiclePanel setSelectedVehicle={setSelectedVehicle} setConfirmRidePanelOpen={setConfirmRidePanelOpen} fair={fair} />
      </div>

      {/***************** Confirm Ride Panel ************************/}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-20 bottom-0 bg-white spacing-responsive pt-8 sm:pt-12 translate-y-full pb-safe rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <ConfirmRide
          createRide={createRide}
          pickup={formData.location}
          destination={formData.destination}
          fair={fair[selectedVehicle]}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
          setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}
        />
      </div>

      {/***************** Looking For Driver Panel ************************/}
      <div
        ref={lookingForDriverPanelRef}
        className="fixed w-full z-20 bottom-0 bg-white spacing-responsive pt-8 sm:pt-12 translate-y-full pb-safe rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <LookingForDriver
          pickup={formData.location}
          destination={formData.destination}
          fair={fair[selectedVehicle]}
          setConfirmRidePanelOpen={setConfirmRidePanelOpen}
        />
      </div>

      {/***************** Waiting For Driver Panel ************************/}
      <div
        ref={waitingForDriverPanelRef}
        className="fixed w-full z-20 bottom-0 bg-white spacing-responsive pt-8 sm:pt-12 translate-y-full pb-safe rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <WaitingForDriver rideData={rideData} setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen} />
      </div>
    </div>
  );
};

export default Home;

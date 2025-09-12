import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useContext } from "react";
import axios from "axios";
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";
import RidePopUp from "../Components/RidePopUp";
import CaptainDetails from "../Components/CaptainDetails";
import { useCaptainData } from "../Context/CaptainContext";
import { useSocket } from "../Context/SocketContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [error, setError] = useState(null);
  const { socket } = useSocket();
  const { captain } = useCaptainData();

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useEffect(() => {
    captain?._id &&
      socket.emit("join", { userId: captain._id, isCaptain: true });
  }, [captain, socket]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: { ltd: latitude, lng: longitude },
          });
        });
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [captain?._id, socket]);

  useEffect(() => {
    if (!socket) {
      setError("Socket connection error");
      return;
    }

    socket.on("new-ride", (data) => {
      if (data?.ride) {
        setRide(data.ride);
        setRidePopupPanel(true);
      } else {
        setError("Invalid ride data received");
      }
    });

    return () => {
      socket.off("new-ride");
    };
  }, [socket]);

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  const confirmRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/confirm`,
        {
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("captain-token")}`,
          },
        }
      );
      setRidePopupPanel(false);
    } catch (error) {
      setError("Error confirming ride");
    }
  };

  return (
    <div className="min-h-screen-safe">
      <div className="fixed spacing-responsive-x pt-safe top-0 flex items-center justify-between w-full z-10 bg-white/90 backdrop-blur-sm">
        <img
          className="w-12 sm:w-16 lg:w-20"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <Link
          to="/captain-home"
          className="btn-touch h-10 w-10 sm:h-12 sm:w-12 bg-white flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 active:scale-95"
        >
          <i className="text-lg sm:text-xl font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      
      <div className="h-[60%] sm:h-[65%] pt-16 sm:pt-20">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map Background"
        />
      </div>
      
      <div className="h-[40%] sm:h-[35%] spacing-responsive pb-safe">
        <CaptainDetails />
      </div>
      
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-20 bottom-0 translate-y-full bg-white spacing-responsive pt-8 sm:pt-12 pb-safe rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-20 bottom-0 translate-y-full bg-white spacing-responsive pt-8 sm:pt-12 pb-safe overflow-y-auto"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
      
      {error && (
        <div className="fixed top-0 left-0 w-full h-screen bg-red-500 text-white spacing-responsive flex items-center justify-center z-30">
          <div className="text-center">
            <h3 className="text-responsive-xl font-bold mb-2">Error</h3>
            <p className="text-responsive-base">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptainHome;

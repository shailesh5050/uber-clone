import { GoogleMap, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCurrentPosition = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentPosition(pos);
        setIsLoading(false);
        setError(null);
      },
      (error) => {
        setError("Failed to get your location. Please check your location permissions.");
        setIsLoading(false);
      },
      options
    );
  };

  useEffect(() => {
    getCurrentPosition();
    const intervalId = setInterval(getCurrentPosition, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading location...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {currentPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultOptions}
        >
          <Marker
            position={currentPosition}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default LiveTracking;

async function getAddressCoordinates(address) {
    const MAP_KEY = process.env.MAP_KEY;
   try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAP_KEY}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.status !== 'OK') {
      throw new Error(`Geocoding error: ${data.status}`);
    }
    const location = data.results[0]?.geometry?.location;
    if (!location) {
      throw new Error('Location not found');
    }
    return { lat: location.lat, lng: location.lng };
  } catch (error) {
    console.error('Failed to get address coordinates:', error);
    throw error;
  }
}

async function getDistanceTimeData(origin, destination) {
  const MAP_KEY = process.env.MAP_KEY;
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${MAP_KEY}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.status !== 'OK') {
      throw new Error(`Distance matrix error: ${data.status}`);
    }
    const element = data.rows[0]?.elements[0];
    if (!element) {
      throw new Error('Element not found');
    }
    return {
      distance: element.distance.text,
      duration: element.duration.text
    };
  } catch (error) {
    console.error('Failed to get distance and time:', error);
    throw error;
  }
}

async function getSugestionsData(input) {
    const MAP_KEY = process.env.MAP_KEY;
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${MAP_KEY}`);
        if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.status !== 'OK') {
        throw new Error(`Place autocomplete error: ${data.status}`);
        }
        return data.predictions.map(prediction => prediction.description);
    } catch (error) {
        console.error('Failed to get suggestions:', error);
        throw error;
    }
    
    
}
export { getAddressCoordinates, getDistanceTimeData, getSugestionsData };
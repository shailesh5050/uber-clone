import { getAddressCoordinates,getDistanceTimeData,getSugestionsData } from '../services/maps.service.js';

async function getCoordinates(req, res) {
  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const coordinates = await getAddressCoordinates(address);
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get coordinates' });
  }
}
async function getDistanceTime(req, res) {
    const { origin, destination } = req.query;
    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
    }
    
    try {
        const distanceTime = await getDistanceTimeData(origin, destination);
        res.json(distanceTime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get distance and time' });
    }
    }
  async function getSugestions(req, res) {
    const { input } = req.query;
    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }
  
    try {
      const sugestions = await getSugestionsData(input);
      res.json(sugestions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get sugestions' });
    }
  }



export { getCoordinates, getDistanceTime, getSugestions };

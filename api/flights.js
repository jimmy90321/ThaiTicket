// Vercel API route for SerpApi
module.exports = async function handler(req, res) {
  const { departure_id, arrival_id, outbound_date, return_date } = req.query;

  if (!departure_id || !arrival_id || !outbound_date || !return_date) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const apiKey = process.env.SERPAPI_KEY;
  
  try {
    // Search with deep_search for more accurate results
    const searchUrl = `https://serpapi.com/search?engine=google_flights&departure_id=${departure_id}&arrival_id=${arrival_id}&gl=tw&hl=zh-TW&currency=TWD&outbound_date=${outbound_date}&return_date=${return_date}&deep_search=true&api_key=${apiKey}`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    res.status(200).json(searchData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

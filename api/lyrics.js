import axios from 'axios';

export default async function handler(req, res) {
  const { artist, song, timestamps = 'true' } = req.query;

  if (!artist || !song) {
    return res.status(400).json({ error: 'artist and song are required' });
  }

  try {
    const response = await axios.get('https://test-0k.onrender.com/lyrics', {
      params: { artist, song, timestamps },
    });

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    res.status(error.response?.status || 500).json({
      error: 'Unable to fetch lyrics',
      details: error.response?.data || error.message,
    });
  }
}

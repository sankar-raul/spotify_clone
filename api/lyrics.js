import axios from 'axios';
import https from 'https';

export default async function handler(req, res) {
  const { q } = req.query;

  // Create an HTTPS agent with SSL verification disabled
  const httpsAgent = new https.Agent({
    rejectUnauthorized: true, // Bypass SSL certificate validation
  });

  try {
    const response = await axios.get('https://test-0k.onrender.com/lyrics', {
      params: { q },
      httpsAgent,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    res.status(500).json({ error: 'Unable to fetch lyrics' });
  }
}

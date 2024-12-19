import axios from 'axios';

export default async function handler(req, res) {
  const { q } = req.query; // Extract query string from request
  res.end(JSON.stringify(q));
//   try {
//     const response = await axios.get(`https://api.textyl.co/api/lyrics`, {
//       params: { q },
//     });
//     res.status(200).json(response.data); // Send back the data
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
}

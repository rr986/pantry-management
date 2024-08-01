import axios from 'axios';

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { imageUrl } = req.body;

  try {
    const response = await axios.post('https://<your-region>-<your-project-id>.cloudfunctions.net/classifyImage', { imageUrl });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error calling classifyImage function:', error);
    res.status(500).end();
  }
};

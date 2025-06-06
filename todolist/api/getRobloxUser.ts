import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    axios.post(`https://users.roblox.com/v1/users/username`).then(response => res.status(200).json(response.data));

  
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Roblox user data' });
  }
}

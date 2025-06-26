import { connectDB } from '@/utils/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  await connectDB();
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.status(200).json(user);
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

import { connectDB } from '@/utils/db';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectDB();
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'User exists' });

  const user = await User.create({ name, email, password });
  res.status(201).json({ message: 'User registered' });
}

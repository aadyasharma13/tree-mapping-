import { connectDB } from '@/utils/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  await connectDB();
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=604800`);
  res.status(200).json({ message: 'Login successful' });
}

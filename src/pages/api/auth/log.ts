import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();
    if (req.method === 'POST') {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username }).exec();

            if (!user || !(await user.matchPassword(password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '12h',
            });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

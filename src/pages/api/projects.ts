import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongodb';
import Project from '../../models/Project'; // Убедитесь, что эта модель существует
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === 'GET') {
        const token = req.headers.authorization?.split(' ')[1]; // Извлечение токена из заголовка

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = (decoded as any).id; // Предполагается, что id сохранен в токене

            // Получение всех проектов для текущего пользователя
            const projects = await Project.find({ user: userId });
            res.status(200).json({ projects });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        const { name } = req.body;
        const token = req.headers.authorization?.split(' ')[1]; // Извлечение токена из заголовка

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = (decoded as any).id; // Предполагается, что id сохранен в токене

            const project = new Project({ name, user: userId }); // Создание нового проекта
            await project.save(); // Сохранение проекта в базе данных

            res.status(201).json({ message: 'Project created successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

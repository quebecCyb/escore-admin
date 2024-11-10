import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Project from '@/models/Project'; // Update with the correct path to your Project model

async function connectDB() {
    if (mongoose.connection.readyState === 1) return; // Already connected, return early

    await mongoose.connect(process.env.MONGODB_URI as string);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const { projectId } = req.query;
    console.log(`Extracting and updating project #${projectId}`)

    if (req.method === 'POST') {
        try {
            // Parse and validate the data from the request body
            const data = req.body;

            // Find the project by ID and update its snapshot
            const updatedProject = await Project.findByIdAndUpdate(
                projectId,
                { snapshot: data },
                { new: true, runValidators: true }
            );

            if (!updatedProject) {
                console.log('Project not found')
                return res.status(404).json({ message: 'Project not found' });
            }

            res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error updating project', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

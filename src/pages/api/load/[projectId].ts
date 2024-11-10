import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import Project, {IProject} from '@/models/Project'; // Adjust this import based on your file structure

// Connect to the database
async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    const { projectId } = req.query;

    if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required' });
    }

    if (req.method === 'GET') {
        try {
            // Find the project by ID and retrieve its snapshot
            const project: IProject = await Project.findById(projectId).exec();

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            // Return the snapshot data
            return res.status(200).json(project.snapshot);
        } catch (error) {
            console.error('Error fetching project data:', error);
            return res.status(500).json({ message: 'Server error', error });
        }
    } else {
        // If the method is not GET, return a 405 (Method Not Allowed) status
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default handler;

import { useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const ProjectsPage = ({ projects }) => {
    const [projectName, setProjectName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get token from local storage
        const token = localStorage.getItem('token');

        if (!token) {
            // Redirect to login if no token
            router.push('/log-3');
            return;
        }

        // Send request to create a project
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: projectName }),
        });

        if (res.ok) {
            setProjectName(''); // Clear input field
            router.reload(); // Reload page
        } else {
            const errorData = await res.json();
            console.error(errorData); // Handle error
        }
    };

    return (
        <div className="projects-container">
            <div className="form-section">
                <h1>Create a Project</h1>
                <form onSubmit={handleSubmit} className="project-form">
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        className="project-input"
                    />
                    <button type="submit" className="project-button">Create Project</button>
                </form>
            </div>
            <div className="projects-list">
                <h2>Your Projects</h2>
                {projects.length === 0 ? (
                    <p>No projects found.</p>
                ) : (
                    <ul>
                        {projects.map((project) => (
                            <li key={project._id} className="project-item">
                                <a href={'/project/' + project._id}>{project.name}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <style jsx>{`
                .projects-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2rem;
                    background-color: #f0f4f8;
                    min-height: 100vh;
                }

                .form-section {
                    width: 100%;
                    max-width: 500px;
                    padding: 2rem;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .project-form h1 {
                    margin-bottom: 1.5rem;
                    color: #333;
                }

                .project-input {
                    color: black;
                    width: 100%;
                    padding: 0.75rem;
                    margin-bottom: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                }

                .project-input:focus {
                    outline: none;
                    border-color: #0070f3;
                    box-shadow: 0 0 4px rgba(0, 112, 243, 0.2);
                }

                .project-button {
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #0070f3;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .project-button:hover {
                    background-color: #005bb5;
                }

                .projects-list {
                    width: 100%;
                    max-width: 500px;
                    background-color: #ffffff;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    text-align: left;
                }

                .projects-list h2 {
                    margin-bottom: 1rem;
                    color: #333;
                }

                .project-item {
                    list-style: none;
                    margin: 0.5rem 0;
                    padding: 0.5rem;
                    border-bottom: 1px solid #ddd;
                }

                .project-item a {
                    color: #0070f3;
                    text-decoration: none;
                    font-size: 1rem;
                }

                .project-item a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

// SSR for fetching user projects
export async function getServerSideProps({ req }) {
    const { token } = req.cookies;

    if (!token) {
        return {
            redirect: {
                destination: '/log-1',
                permanent: false,
            },
        };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch projects for the current user
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch projects');
        }

        const data = await res.json();
        return {
            props: {
                projects: data.projects || [],
            },
        };
    } catch (error) {
        console.error(error);
        // return {
        //     redirect: {
        //         destination: '/log-2',
        //         permanent: false,
        //     },
        // };
    }
}

export default ProjectsPage;

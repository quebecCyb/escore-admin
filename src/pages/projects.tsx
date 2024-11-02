import { useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const ProjectsPage = ({ projects }) => {
    const [projectName, setProjectName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Получение токена из cookies
        const token = localStorage.getItem('token');

        if (!token) {
            // Если токен отсутствует, перенаправить на страницу входа
            router.push('/auth/login');
            return;
        }

        // Отправка запроса на создание проекта
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: projectName }),
        });

        if (res.ok) {
            // Если проект успешно создан, обновить список проектов
            setProjectName(''); // Очистка поля ввода
            router.reload(); // Обновление страницы
        } else {
            const errorData = await res.json();
            console.error(errorData);
            // Обработка ошибки
        }
    };

    return (
        <div>
            <h1>Create a Project</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                />
                <button type="submit">Create Project</button>
            </form>
            <h2>Your Projects</h2>
            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project._id}><a href={'/project/' + project._id}>{project.name}</a></li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// SSR для получения проектов пользователя
export async function getServerSideProps({ req }) {
    const { token } = req.cookies;

    if (!token) {
        return {
            redirect: {
                destination: '/log',
                permanent: false,
            },
        };
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = (decoded as any).id;

        // Получаем проекты для текущего пользователя
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
                projects: data.projects || [], // Передаем проекты в компонент
            },
        };
    } catch (error) {
        console.error(error);
        return {
            redirect: {
                destination: '/log',
                permanent: false,
            },
        };
    }
}

export default ProjectsPage;

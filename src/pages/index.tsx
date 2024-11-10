import Layout from "@/components/Layout";
import SwotList from "@/components/SwotList";
import jwt from "jsonwebtoken";
import Link from "next/link";

export default function Home() {
    return (
        <Layout>
            <Link href={'/projects'}>Projects</Link>
        </Layout>
    );
}

export async function getServerSideProps({req}) {

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
        jwt.verify(token, process.env.JWT_SECRET);
        return { props: {} };
    } catch {
        return {
            redirect: {
                destination: '/log',
                permanent: false,
            },
        };
    }
}


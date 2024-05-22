// components/Layout.js
import Head from 'next/head';
import Link from 'next/link';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Script from "next/script";
// import styles from './Layout.module.css'; // Импортируем CSS модуль

const Layout = ({ children, title = 'Default Title' }: any) => {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
                      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
                      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Windmill Dashboard</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link rel="stylesheet" href="/assets/css/tailwind.output.css"/>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.css"
                />
            </Head>


            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <Sidebar/>

                <div className="flex flex-col flex-1 w-full">
                <Header/>

                    <main className="h-full overflow-y-auto">
                        <div className="container px-6 mb-5 mx-auto grid">
                            {children}
                        </div>
                    </main>
                </div>
            </div>


            <Script
                src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
                defer
            ></Script>
            <Script src="/assets/js/init-alpine.js"></Script>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js"
                defer
            ></Script>

        </div>
    );
};

export default Layout;

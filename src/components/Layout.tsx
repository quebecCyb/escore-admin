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

            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                {/*<Sidebar/>*/}

                <div className="flex flex-col flex-1 w-full">
                {/*<Header/>*/}

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

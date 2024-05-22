import React, { useState } from 'react';
import Link from 'next/link';

const Sidebar = () => {
    const [isPagesMenuOpen, setPagesMenuOpen] = useState(false);

    const togglePagesMenu = () => {
        setPagesMenuOpen(!isPagesMenuOpen);
    };

    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
            <div className="py-4 text-gray-500 dark:text-gray-400">
                <Link href="/">
                    <span className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200">CarLog Admin</span>
                </Link>
                <ul className="mt-6">
                    <li className="relative px-6 py-3">
                        <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                        <Link href="/dashboard">
                            <span className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100">
                                <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                </svg>
                                <span className="ml-4">Dashboard</span>
                            </span>
                        </Link>
                    </li>
                </ul>
                {/* More navigation items here */}
                <ul>
                    {/* Additional Links */}
                    <li className="relative px-6 py-3">
                        <button
                            className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                            onClick={togglePagesMenu} aria-haspopup="true">
                          <span className="inline-flex items-center">
                            <svg className="w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" strokeWidth="2">
                              <path
                                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                            </svg>
                            <span className="ml-4">Pages</span>
                          </span>
                            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                        {isPagesMenuOpen && (
                            <ul className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                                aria-label="submenu">
                                <li className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200">
                                    <Link href="/login">Login</Link>
                                </li>
                                {/* More submenu items */}
                            </ul>
                        )}
                    </li>
<<<<<<< HEAD
=======
                    <li className="relative px-6 py-3">
                        <a href='https://consul.fordka.info/'
                           className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                           aria-haspopup="true">
                          <span className="inline-flex items-center">
                            <span className={'fa fa-clock'}></span>
                            <span className="ml-4">Consul (Uptime)</span>
                          </span>
                        </a>
                    </li>

                    <li className="relative px-6 py-3">
                        <a href='https://log.fordka.info/'
                           className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                           aria-haspopup="true">
                          <span className="inline-flex items-center">
                            <span className={'fa fa-list'}></span>
                            <span className="ml-4">ELK (Logs)</span>
                          </span>
                        </a>
                    </li>


                    <li className="relative px-6 py-3">
                        <a href='https://kong.fordka.info/'
                           className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                           aria-haspopup="true">
                          <span className="inline-flex items-center">
                            <span className={'fa fa-cloud'}></span>
                            <span className="ml-4">Kong (Gateway)</span>
                          </span>
                        </a>
                    </li>
>>>>>>> origin/main
                </ul>
                <div className="px-6 my-6">
                    <button
                        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                        Create account
                        <span className="ml-2" aria-hidden="true">+</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

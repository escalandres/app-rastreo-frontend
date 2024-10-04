
const Header = () => {
    return (
        <nav
            id="navbar"
            className="backdrop-blur-sm fixed w-full z-20 top-0 start-0 px-auto"
            >
            <div
                className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
            >
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse order-0">
                    <img src="/icons/favicon.svg" className="h-12" alt="Cosmos Logo" />
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                    ></span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                    >
                        <ul
                            className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0"
                        >
                            <li>
                                <a 
                                    href="#inicio"
                                    className="block py-2 px-3 text-white 0 text-xl rounded md:bg-transparent md:p-0 md:hover:text-[#FF6E6C] md:dark:hover:text-[#FF6E6C]"
                                    aria-current="page">Inicio
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#cosmos"
                                    className="block py-2 px-3 text-xl text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF6E6C] md:p-0 md:dark:hover:text-[#FF6E6C] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >Sobre Cosmos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#solucion"
                                    className="block py-2 px-3 text-xl text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF6E6C] md:p-0 md:dark:hover:text-[#FF6E6C] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 text-border"
                                    >Solución
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#beneficios"
                                    className="block py-2 px-3 text-xl text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF6E6C] md:p-0 md:dark:hover:text-[#FF6E6C] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >Beneficios
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#team"
                                    className="block py-2 px-3 text-xl text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF6E6C] md:p-0 md:dark:hover:text-[#FF6E6C] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >Equipo
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#epilogo"
                                    className="block py-2 px-3 text-xl text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#FF6E6C] md:p-0 md:dark:hover:text-[#FF6E6C] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >Epílogo
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                </div>

                <a
                        href="/login"
                        className="text-white bg-[#FF6E6C] hover:bg-[#e65856] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center order-2"
                        >Iniciar sesión
                    </a>
                <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"></path>
                    </svg>
                </button>
                
            </div>
            
        </nav>
    );
};

export default Header;

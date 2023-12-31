import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getEmpresa, getEmpresaListItems } from "~/models/empresa.server";
import { requireUserId } from "~/session.server";

export const meta: V2_MetaFunction = () => [{ title: "EncontraTudo" }];


export const loader = async ({ request }: LoaderArgs) => {
    const userId = await requireUserId(request);
    const empresas = await getEmpresaListItems({ userId }); // a cidadeListItems sempre requere o userId do usuario, posteriormente será removido isso.
    return json({ empresas });
};

export default function EmpresasIndexPage() {
    const data = useLoaderData<typeof loader>();
    //const user = useUser();

    return (
        <main className="h-screen bg-gray-600">
            <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8 mr-3"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            EncontraTudo
                        </span>
                    </Link>
                    <button
                        data-collapse-toggle="navbar-dropdown"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-dropdown"
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
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-dropdown"
                    >
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/cidades"
                                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                >
                                    Cidades
                                </Link>
                            </li>

                            <li>
                                <Link to="/usuarios"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Usuários
                                </Link>
                            </li>
                            <li>
                                <Link to="/negocios"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Negócios
                                </Link>
                            </li>
                            <li>
                                <Link to="/anuncios"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    Anúncios
                                </Link>
                            </li>

                            <li>
                                <button
                                    id="dropdownNavbarLink"
                                    data-dropdown-toggle="dropdownNavbar"
                                    className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                                >
                                    Meus Dados{" "}
                                    <svg
                                        className="w-2.5 h-2.5 ml-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="m1 1 4 4 4-4"
                                        />
                                    </svg>
                                </button>
                                {/*<!-- Dropdown menu --> */}
                                <div
                                    id="dropdownNavbar"
                                    className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                                >
                                    <ul
                                        className="py-2 text-sm text-gray-700 dark:text-gray-400"
                                        aria-labelledby="dropdownLargeButton"
                                    >
                                        <li>
                                            <a
                                                href="/"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Painel de Controle
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="/"
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                Earnings
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a
                                            href="/"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            Sair
                                        </a>
                                    </div>**
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Header */}
            <div className="relative">
                <div className="mx-auto flex space-x-2 justify-center">
                    <div className="relative  overflow-hidden rounded-2xl">
                        <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
                            <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                                <span className="block uppercase text-black drop-shadow-md">
                                    Empresas
                                </span>
                            </h1>

                            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
                                <div className="grid grid-rows-4 grid-flow-col gap-4 mb-4">
                                    {data.empresas.length === 0 ? (
                                        <p>
                                            Nenhuma empresa encontrada. Vá até a aba Categoria na barra de navegação e{" "}
                                            <Link to="novaempresa" className="text-white underline">
                                                cadastre uma.
                                            </Link>
                                        </p>
                                    ) : (
                                        <div className="">

                                            {data.empresas.map((empresa: any) => (
                                                <div key={empresa.id} className="py-2 px-4 mb-4 bg-green-500 text-white justify-center font-semibold rounded-md shadown-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">

                                                    <button>
                                                        <NavLink
                                                            to={empresa.id}
                                                        >
                                                            {empresa.nomeEmpresa}
                                                        </NavLink>
                                                        <p>{empresa.descricaoEmpresa}</p>
                                                        <p>{empresa.enderecoEmpresa}</p>
                                                    </button>
                                                </div>
                                            ))}

                                        </div>

                                    )}

                                    {/* <div className="grid grid-rows-4 grid-flow-col gap-4 mb-4">
                  <div className="">
                    <div className="py-2 px-4 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                      <p className="">Save changes</p>
                    </div>
                  </div>
                  </div> */}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    );
}

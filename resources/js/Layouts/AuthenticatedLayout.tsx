import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/components/ApplicationLogo";
import Dropdown from "@/components/Dropdown";
import FlashMessage from "@/components/ui/FlashMessage";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import Sidebar from "@/components/Sidebar";

export default function AuthenticatedLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white border-b border-gray-100">

                {/* FULL WIDTH FLEX ROW */}
                <div className="flex justify-between items-center h-20 px-4">

                    {/* LEFT CONTENT at absolute left */}
                    <div className="flex items-center space-x-6 px-16">
                        <Link href="/">
                            <ApplicationLogo className="block h-14 w-auto fill-current text-gray-800" />
                        </Link>

                        {/* <div className="hidden space-x-8 sm:flex">
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </NavLink>
                        </div> */}
                    </div>

                    {/* RIGHT CONTENT stays inside container */}
                    <div className="hidden sm:flex sm:items-center">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 transition"
                                    >
                                        {user?.name}

                                        <svg
                                            className="ms-2 -me-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a1 1 0 011.4-.02L10 10.17l3.37-2.98a1 1 0 011.33 1.48l-4 3.53a1 1 0 01-1.33 0l-4-3.53a1 1 0 01-.04-1.44z"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                </div>
            </nav>






            {/* Layout With Sidebar */}
            <FlashMessage />
            <main className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-8">{children}</div>
            </main>
        </div>
    );
}

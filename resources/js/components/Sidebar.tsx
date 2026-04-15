import { useState } from "react";
import { sidebarItems, SidebarItem } from "@/Config/sidebar.config";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-72 bg-white shadow-lg border-r border-gray-200 p-6 hidden sm:flex flex-col min-h-screen">

            {/* Scrollable menu */}
            <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
                {Array.isArray(sidebarItems) &&
                    sidebarItems.map((item) =>
                        item.children ? (
                            <SidebarDropdown key={item.label} item={item} />
                        ) : (
                            <SidebarLink key={item.label} item={item} />
                        )
                    )}
            </nav>

            {/* Fixed logout */}
            <div className="mt-auto border-t pt-4">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 transition"
                >
                    <i className="fa-solid fa-right-from-bracket mr-3"></i>
                    Logout
                </Link>
            </div>
        </aside>
    );
}

function SidebarLink({ item }: { item: SidebarItem }) {
    const { url } = usePage();

    const currentPath = url.split("?")[0];
    const itemPath = item.href
        ? new URL(item.href, window.location.origin).pathname
        : "";

    let isActive =
        currentPath === itemPath || currentPath.startsWith(itemPath + "/");

    if (item.label === "Jobs List" && currentPath.startsWith("/admin/job-applications")) {
        isActive = true;
    }
    return (
        <Link
            href={item.href!}
            className={`
                flex items-center px-4 py-2 rounded-lg transition
                ${isActive
                    ? "bg-pink-600 text-white"
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                }
            `}
        >
            {item.icon && <item.icon className="w-5 h-5 mr-3 shrink-0" />}
            {item.label}
        </Link>
    );
}

function SidebarDropdown({ item }: { item: SidebarItem }) {
    const { url } = usePage();

    const currentPath = url.split("?")[0];

    const isChildActive = item.children?.some((child) => {
        if (!child.href) return false;

        const childPath = new URL(child.href, window.location.origin).pathname;

        return currentPath === childPath || currentPath.startsWith(childPath + "/");
    });

    const [open, setOpen] = useState(isChildActive);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`
                    flex items-center justify-between w-full px-4 py-2 rounded-lg transition
                    ${isChildActive
                        ? "bg-pink-600 text-white"
                        : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                    }
                `}
            >
                <span className="flex items-center gap-3">
                    {item.icon && <item.icon className="w-5 h-5 shrink-0" />}
                    {item.label}
                </span>

                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && (
                <ul className="ml-8 mt-2 space-y-2 border-l border-pink-100 pl-3">
                    {item.children?.map((child) => {
                        const childPath = child.href
                            ? new URL(child.href, window.location.origin).pathname
                            : "";

                        const childActive =
                            currentPath === childPath ||
                            currentPath.startsWith(childPath + "/");

                        return (
                            <Link
                                key={child.label}
                                href={child.href!}
                                className={`
                block px-3 py-2 rounded-md transition
                ${childActive
                                        ? "bg-pink-100 text-pink-700 font-medium"
                                        : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                                    }
            `}
                            >
                                {child.label}
                            </Link>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

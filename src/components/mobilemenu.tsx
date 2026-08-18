"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, FolderKanban, Newspaper, Mail, Settings } from "lucide-react";

const links = [
    { href: "/", label: "Home", icon: House },
    { href: "/projects", label: "Projects", icon: FolderKanban },
    { href: "/blog", label: "Blog", icon: Newspaper },
    { href: "/contact", label: "Contacto", icon: Mail },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Menu() {
    const pathname = usePathname();

    return (
        <nav className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
            <ul className="flex items-center justify-between rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg px-2 py-2">
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

                    return (
                        <li key={href} className="flex-1">
                            <Link
                                href={href}
                                className={`flex flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition-colors ${
                                    isActive
                                        ? "text-blue-500"
                                        : "text-gray-500 dark:text-gray-400 hover:text-blue-500"
                                }`}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                <span>{label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

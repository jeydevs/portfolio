"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FolderKanban,
    House,
    Mail,
    Newspaper,
    PanelLeftClose,
    PanelLeftOpen,
    Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
    { href: "/", label: "Home", icon: House },
    { href: "/projects", label: "Proyectos", icon: FolderKanban },
    { href: "/blog", label: "Blog", icon: Newspaper },
    { href: "/contact", label: "Contacto", icon: Mail },
    { href: "/settings", label: "Settings", icon: Settings },
];

const STORAGE_KEY = "sidebar-collapsed";

export function SideBar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem(STORAGE_KEY) === "1") setCollapsed(true);
    }, []);

    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    }, [collapsed]);

    return (
        <aside
            className={cn(
                "sticky top-0 hidden h-screen shrink-0 flex-col gap-1 border-r border-sidebar-border bg-sidebar p-5 transition-[width] duration-200 md:flex",
                collapsed ? "w-18" : "w-[25%] max-w-75"
            )}
        >
            <div
                className={cn(
                    "mb-6 flex items-center",
                    collapsed ? "justify-center" : "justify-between"
                )}
            >
                {!collapsed && (
                    <span className="px-2 text-lg font-bold text-sidebar-foreground">
                        JeyDevs
                    </span>
                )}
                <button
                    type="button"
                    onClick={() => setCollapsed((c) => !c)}
                    aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    {collapsed ? (
                        <PanelLeftOpen size={18} />
                    ) : (
                        <PanelLeftClose size={18} />
                    )}
                </button>
            </div>

            <ul className="flex flex-col gap-1">
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive =
                        href === "/" ? pathname === "/" : pathname.startsWith(href);

                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                title={collapsed ? label : undefined}
                                className={cn(
                                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    collapsed && "justify-center px-0",
                                    isActive
                                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                {!collapsed && label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}

"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

const options = [
    { value: "light", label: "Claro", icon: Sun },
    { value: "dark", label: "Oscuro", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
] as const;

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="inline-flex items-center gap-1 rounded-lg bg-muted p-1">
            {options.map(({ value, label, icon: Icon }) => {
                const isActive = mounted && theme === value;

                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setTheme(value)}
                        aria-pressed={isActive}
                        className={cn(
                            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon className="size-4" />
                        {label}
                    </button>
                );
            })}
        </div>
    );
}

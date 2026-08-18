import { Palette, Sparkles } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Settings() {
    return (
        <main className="flex-1 bg-white font-sans dark:bg-zinc-950">
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6 sm:gap-7 sm:p-8 lg:gap-8 lg:p-10">
                <div>
                    <h1 className="text-xl font-bold sm:text-2xl">Settings</h1>
                    <p className="text-sm text-muted-foreground">
                        Personaliza tu experiencia en el sitio.
                    </p>
                </div>

                <Card className="w-full [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Palette className="size-4" />
                            Apariencia
                        </CardTitle>
                        <CardDescription>
                            Elige cómo quieres ver el sitio.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ThemeToggle />
                    </CardContent>
                </Card>

                <Card className="w-full [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            {/* <Sparkles className="size-4" /> */}
                            Más preferencias
                        </CardTitle>
                        <CardDescription>
                            Estoy trabajando en más opciones de personalización. Vuelve
                            pronto.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </main>
    );
}

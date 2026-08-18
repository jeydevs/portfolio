import { Layers } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const technologies = [
    "Python",
    "TypeScript",
    "JavaScript",
    "Java",
    "C#",
    "SQL",
    "React",
    "Next.js",
    "React Three Fiber",
    "Three.js",
    "NestJS",
    "Express.js",
    "Flask",
    "FastAPI",
    "MySQL",
    "SQL Server",
    "Redis",
    "Docker",
    "Nginx",
    "Google Cloud",
    "Hetzner",
    "Figma",
    "Git",
];

const languages = [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "B2" },
];

export function TechStack() {
    return (
        <Card className="w-full [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Layers className="size-4" />
                    Habilidades y Tecnologías
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                        <Badge
                            key={tech}
                            variant="secondary"
                            className="h-auto px-3 py-1 text-sm"
                        >
                            {tech}
                        </Badge>
                    ))}
                </div>

                <div>
                    <h3 className="mb-2 text-xs font-semibold text-muted-foreground uppercase">
                        Idiomas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {languages.map((lang) => (
                            <Badge
                                key={lang.name}
                                variant="outline"
                                className="h-auto px-3 py-1 text-sm"
                            >
                                {lang.name} · {lang.level}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

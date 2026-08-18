import { Briefcase } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ExperienceItem = {
    role: string;
    company: string;
    period: string;
    highlights: string[];
    tags: string[];
};

const experience: ExperienceItem[] = [
    {
        role: "Desarrollador Full Stack",
        company: "Kuantica Consulting Services · Guayaquil, Ecuador",
        period: "Ene. 2025 — Actualidad",
        highlights: [
            "Diseñé y desarrollé agentes virtuales de IA con interacción por voz en tiempo real, integrando arquitecturas multi-agente y sistemas RAG para clasificar y enrutar conversaciones automáticamente.",
            "Implementé experiencias 3D interactivas en el navegador con Three.js y React Three Fiber, mejorando la inmersión y usabilidad del asistente virtual.",
            "Construí y mantuve backends escalables con NestJS, integrando APIs externas, bases de datos relacionales, jobs programados y Redis para cache y colas.",
            "Administré la infraestructura de despliegue con Docker y Nginx, y configuré observabilidad (Prometheus, Grafana, Loki) para monitorear rendimiento y disponibilidad en producción.",
        ],
        tags: ["NestJS", "Three.js", "React Three Fiber", "Docker", "Redis"],
    },
    {
        role: "Programador Junior — RPA Developer",
        company: "Kuantica Consulting Services · Guayaquil, Ecuador",
        period: "Jul. 2024 — Ene. 2025",
        highlights: [
            "Diseñé y desarrollé soluciones RPA con Python, Playwright y Electroneek para automatizar procesos críticos, optimizando tiempos de ejecución y reduciendo costos operativos.",
            "Desarrollé y di mantenimiento a aplicaciones web internas para la gestión de información y digitalización de procesos, integrando APIs REST para optimizar flujos de trabajo.",
        ],
        tags: ["Python", "Playwright", "Electroneek"],
    },
];

export function Experience() {
    return (
        <Card className="w-full [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Briefcase className="size-4" />
                    Experiencia
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <div className="absolute top-0 bottom-0 left-1.5 w-px bg-border" />

                    <ol className="flex flex-col gap-6">
                        {experience.map((item) => (
                            <li key={`${item.company}-${item.period}`} className="relative pl-8">
                                <span className="absolute top-1 left-0 size-3 rounded-full bg-primary ring-4 ring-background" />

                                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                                    <div>
                                        <p className="text-sm font-semibold">{item.role}</p>
                                        <p className="text-sm text-muted-foreground">{item.company}</p>
                                    </div>
                                    <span className="text-xs whitespace-nowrap text-muted-foreground">
                                        {item.period}
                                    </span>
                                </div>

                                <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                                    {item.highlights.map((highlight) => (
                                        <li key={highlight}>{highlight}</li>
                                    ))}
                                </ul>

                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {item.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </CardContent>
        </Card>
    );
}

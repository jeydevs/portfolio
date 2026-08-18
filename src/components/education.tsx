import { GraduationCap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type EducationItem = {
    institution: string;
    program: string;
    period: string;
};

const education: EducationItem[] = [
    {
        institution: "Universidad de Guayaquil",
        program: "Ingeniería de Software — 7.mo semestre",
        period: "2020 — Actualidad",
    },
    {
        institution: "Code Bootcamp ESPOL",
        program: "Full Stack Web Developer",
        period: "Abr. 2025 — Nov. 2025",
    }
];

export function Education() {
    return (
        <Card className="w-full [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <GraduationCap className="size-4" />
                    Educación
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {education.map((item) => (
                    <div key={item.institution}>
                        <p className="text-sm font-semibold">{item.institution}</p>
                        <p className="text-sm text-muted-foreground">{item.program}</p>
                        <p className="text-xs text-muted-foreground">{item.period}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

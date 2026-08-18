import {  Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const interests = [
    "IA Systems",
    "3D Web Experiences",
    "Game Development",
    "Software Architecture",
    "System Design",
    "DevOps",
    "Web Development",
    "Automatización",
];

export function Interests() {
    return (
        <Card className="w-full [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <Star className="size-4" />
                    Intereses
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                        <Badge
                            key={interest}
                            variant="outline"
                            className="h-auto px-3 py-1 text-sm"
                        >
                            {interest}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

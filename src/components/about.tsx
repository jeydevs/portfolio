import { Mail, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { ProfilePhoto } from "./profilephoto";

export function AboutMe() {
    return (
        <Card className="w-full [--card-spacing:--spacing(5)] sm:[--card-spacing:--spacing(6)]">
            <CardContent className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:text-left">
                    <ProfilePhoto />

                    <div className="flex flex-1 flex-col items-center gap-1 sm:items-start">
                        <h1 className="text-xl font-bold sm:text-2xl">
                            Hola, soy Jefferson Olvera
                        </h1>
                        <h2 className="text-sm font-medium text-muted-foreground sm:text-base">
                            Desarrollador Full Stack
                        </h2>
                        <Badge variant="secondary" className="mt-1 h-auto gap-1 px-2.5 py-1 mb-4 text-sm sm:mt-2">
                            <MapPin className="size-3" />
                            Guayaquil, Ecuador
                        </Badge>

                        <p className="text-center text-sm text-muted-foreground sm:text-left sm:text-base ">
                            Soy desarrollador de software enfocado en el desarrollo de aplicaciones escalables, soluciones impulsadas por inteligencia artificial y experiencias digitales interactivas.
                            Trabajo tanto en frontend como en backend, utilizando tecnologías como NextJs, NestJS, .NET, Three.js, WebGL y WebRTC. También tengo interés y experiencia explorando la integración de agentes de IA y experiencias de voz en aplicaciones modernas.
                        </p>
                    </div>

                    <div className="flex flex-row gap-2 sm:shrink-0">
                        <Button
                            nativeButton={false}
                            render={<a href="mailto:olverasuarezjeff@gmail.com" />}
                        >
                            Contáctame
                        </Button>
                        <Button
                            variant="outline"
                            nativeButton={false}
                            render={
                                <a
                                    href="https://www.linkedin.com/in/jeffersonolvera/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                />
                            }
                        >
                            LinkedIn
                        </Button>
                    </div>
                </div>


            </CardContent>
        </Card>
    );
}

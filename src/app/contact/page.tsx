import { Mail } from "lucide-react";

import { UnderConstruction } from "@/components/under-construction";
import { LinkedinIcon } from "@/components/icons/linkedin";

export default function Contact() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center bg-white font-sans dark:bg-zinc-950">
            <UnderConstruction
                title="Contacto"
                description="Estoy armando esta sección. Mientras tanto, puedes escribirme directamente."
            />
            <div className="flex items-center justify-center gap-4">
                <a
                    href="mailto:olverasuarezjeff@gmail.com"
                    aria-label="Enviar correo"
                    className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                    <Mail className="size-5" />
                </a>
                <a
                    href="https://www.linkedin.com/in/jeffersonolvera/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                    <LinkedinIcon className="size-5" />
                </a>
            </div>
        </main>
    );
}

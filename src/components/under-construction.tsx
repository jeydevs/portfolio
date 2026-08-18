import { Construction } from "lucide-react";

export function UnderConstruction({
    title,
    description = "Esta sección está en construcción. Vuelve pronto para ver las novedades.",
}: {
    title: string;
    description?: string;
}) {
    return (
        <div className="flex flex-col items-center gap-4 p-8 text-center sm:p-12">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
                <Construction className="size-8 text-muted-foreground" />
            </div>
            <div className="flex flex-col gap-1.5">
                <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
                <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}

import { UnderConstruction } from "@/components/under-construction";

export default function Blog() {
    return (
        <main className="flex flex-1 items-center justify-center bg-white font-sans dark:bg-zinc-950">
            <UnderConstruction
                title="Blog"
                description="Todavía no he publicado artículos, pero ya estoy trabajando en el primero."
            />
        </main>
    );
}

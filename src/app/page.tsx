import { AboutMe } from "@/components/about";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Interests } from "@/components/interests";
import { TechStack } from "@/components/techstack";

export default function About() {
  return (
    <main className="flex-1 bg-white font-sans dark:bg-zinc-950">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 p-6 sm:gap-7 sm:p-8 lg:grid-cols-3 lg:gap-8 lg:p-10">
        <div className="lg:col-span-3">
          <AboutMe />
        </div>
        <div className="lg:col-span-3">
          <Experience />
        </div>
        <div className="lg:col-span-2">

        </div>
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-7 lg:col-span-3 lg:gap-8">
          <Education />
          <Interests />
        </div>
        <div className="lg:col-span-3">
          <TechStack />
        </div>
      </div>
    </main>
  );
}

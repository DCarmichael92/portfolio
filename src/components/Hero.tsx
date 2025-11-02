// Hero banner with resume-aligned summary and badges.
import { Cloud, TerminalSquare, Cpu, ShieldCheck } from "lucide-react";
import { Certs } from "./Certs";

const glassBox =
  "flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-5";

export function Hero() {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold">
            Mission-driven Software Engineer & Intelligence Analyst (TS/SCI)
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            I build scalable backend and cloud systems in AWS using Java and Python. I deliver customer-facing
            and internal tools with SDLC best practices, cloud-native architectures, and CI/CD—collaborating
            across teams to ship secure, reliable outcomes.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Washington, D.C • Open to Cloud / Software / DevSecOps roles
          </p>

          {/* Tech chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs">AWS</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Java</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Python</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Elasticsearch</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Docker</span>
          </div>

          {/* Certifications */}
          <Certs />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 md:mt-0">
          <div className={glassBox}><Cloud /></div>
          <div className={glassBox}><TerminalSquare /></div>
          <div className={glassBox}><Cpu /></div>
          <div className={`${glassBox} col-span-3 md:col-span-1`}><ShieldCheck /></div>
        </div>
      </div>
    </section>
  );
}

// Renders a project card with glass effect (from Card) and hover interactions.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";
import { ExternalLink } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  const statusColor = project.status === "completed" ? "bg-emerald-600" : "bg-amber-600";

  return (
    <Card className="transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {project.name}
          <span className={`text-white text-xs px-2 py-1 rounded ${statusColor}`}>
            {project.status.replace("-", " ")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="flex gap-4 text-sm items-center">
          {project.repo && (
            <a className="underline inline-flex items-center gap-1" href={project.repo} target="_blank" rel="noreferrer">
              Source <ExternalLink size={14} />
            </a>
          )}
          {project.demo && (
            <a className="underline inline-flex items-center gap-1" href={project.demo} target="_blank" rel="noreferrer">
              Live demo <ExternalLink size={14} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

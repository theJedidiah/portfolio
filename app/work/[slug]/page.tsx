import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Briefcase, Code2, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Work
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                project.role === "product"
                  ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                  : project.role === "engineering"
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                  : "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800"
              }`}
            >
              {project.role === "product" ? (
                <Briefcase size={12} />
              ) : project.role === "engineering" ? (
                <Code2 size={12} />
              ) : (
                <>
                  <Briefcase size={12} />
                  <Code2 size={12} />
                </>
              )}
              {project.roleLabel}
            </span>
            <span className="text-sm text-slate-400 dark:text-slate-500">{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
            {project.description}
          </p>
        </header>

        {/* Tech Stack & Tools */}
        <section className="mb-12 p-6 rounded-2xl bg-zinc-50 dark:bg-slate-800/50 border border-zinc-200 dark:border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.techStack.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-zinc-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.tools.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-zinc-200 dark:border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Case Study Content */}
        <div className="space-y-12">
          {project.problem && (
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">The Problem</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.problem}</p>
            </section>
          )}

          {project.solution && (
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">The Solution</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{project.solution}</p>
            </section>
          )}

          {project.outcome && (
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">The Outcome</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{project.outcome}</p>
              
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 text-center"
                    >
                      <span className="text-lg font-semibold text-slate-900 dark:text-white">{metric}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 dark:text-slate-400">Interested in working together?</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              Get in Touch
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


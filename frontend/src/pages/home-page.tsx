import { useEffect, useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

import { getPublicProjects } from "@/features/projects/projects.api";
import type { Project } from "@/features/projects/projects.types";
import DiscoveryCard from "@/features/search/ui/discovery-card";

function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    async function loadProjects() {
      try {
        const publicProjects = await getPublicProjects(0, 3);

        if (isCurrent) {
          setProjects(publicProjects);
        }
      } catch {
        if (isCurrent) {
          setHasError(true);
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border bg-primary-light">

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-16 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              The ideas network
            </p>
            <h1 className="max-w-2xl font-heading text-5xl leading-[1.02] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
              Good ideas get better together.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-text-secondary sm:text-xl">
              Ivesome is where ambitious people share early ideas, find the
              right collaborators, and turn a spark into something real.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/search"
                className="button inline-flex items-center gap-2 bg-primary text-white transition hover:bg-primary-hover"
              >
                Explore ideas <ArrowRight size={17} />
              </Link>
              <Link
                to="/ideas/new"
                className="button inline-flex items-center gap-2 border border-border bg-surface text-text-primary transition hover:border-primary hover:text-primary"
              >
                Share an idea <Lightbulb size={17} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent-hover">
              How does it work
            </p>
            <h2 className="font-heading text-3xl text-text-primary sm:text-4xl">
              Main milestones of an idea
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

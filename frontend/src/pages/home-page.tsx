import { useEffect, useState } from "react";
import {
  ArrowRight,
  Lightbulb,
  Users,
  Rocket,
  Handshake,
  MessagesSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getProjects } from "@/features/projects/projects.api";
import type { Project } from "@/features/projects/projects.types";
import DiscoveryCard from "@/features/search/ui/discovery-card";
import Card from "@/shared/ui/card";
import Marquee from "@/shared/ui/marquee";

function HomePage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let isCurrent = true;

    async function loadProjects() {
      try {
        const publicProjects = await getProjects(
          undefined,
          undefined,
          undefined,
          0,
          10,
        );

        if (isCurrent) {
          setProjects(publicProjects);
        }
      } catch (e) {
        if (isCurrent) {
          console.error(e);
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
      <section className="relative main-container-narrow overflow-hidden border-b border-border bg-primary-light py-24!">
        <div className="relative grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {t("app.home.hero.tagline")}
            </p>
            <h1 className="max-w-2xl font-heading text-5xl leading-[1.02] tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
              {t("app.home.hero.heading")}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-text-secondary sm:text-xl">
              {t("app.home.hero.description")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/search"
                className="button inline-flex items-center gap-2 bg-primary text-white transition hover:bg-primary-hover"
              >
                {t("app.home.hero.actions.explore")} <ArrowRight size={17} />
              </Link>
              <Link
                to="/ideas/new"
                className="button inline-flex items-center gap-2 border border-border bg-surface text-text-primary transition hover:border-primary hover:text-primary"
              >
                {t("app.home.hero.actions.share")} <Lightbulb size={17} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-148 lg:justify-self-end">
            {projects.length > 0 && (
              <div className="relative overflow-hidden">
                <Marquee duration={40} pauseOnHover>
                  <div className="flex gap-4 mr-4">
                    {projects.map((project) => (
                      <DiscoveryCard key={project.id} project={project} />
                    ))}
                  </div>
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-linear-to-r from-primary-light to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-4 bg-linear-to-l from-primary-light to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="main-container-narrow py-24!">
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent-hover">
              {t("app.home.howItWorks.tagline")}
            </p>
            <h2 className="font-heading text-3xl text-text-primary sm:text-4xl">
              {t("app.home.howItWorks.title")}
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card className="group flex min-h-52 flex-col justify-between transition hover:-translate-y-1 hover:border-primary">
              <div>
                <Lightbulb
                  size={40}
                  strokeWidth={1.5}
                  className="mb-8 text-accent-hover transition group-hover:text-primary-hover"
                />
                <h3 className="text-heading text-text-primary">
                  {t("app.home.howItWorks.steps.discover.title")}
                </h3>
                <p className="mt-2 text-text-secondary">
                  {t("app.home.howItWorks.steps.discover.description")}
                </p>
              </div>
            </Card>

            <Card className="group flex min-h-52 flex-col justify-between transition hover:-translate-y-1 hover:border-primary">
              <div>
                <MessagesSquare
                  size={40}
                  strokeWidth={1.5}
                  className="mb-8 text-accent-hover transition group-hover:text-primary-hover"
                />
                <h3 className="text-heading text-text-primary">
                  {t("app.home.howItWorks.steps.discuss.title")}
                </h3>
                <p className="mt-2 text-text-secondary">
                  {t("app.home.howItWorks.steps.discuss.description")}
                </p>
              </div>
            </Card>

            <Card className="group flex min-h-52 flex-col justify-between transition hover:-translate-y-1 hover:border-primary">
              <div>
                <Users
                  size={40}
                  strokeWidth={1.5}
                  className="mb-8 text-accent-hover transition group-hover:text-primary-hover"
                />
                <h3 className="text-heading text-text-primary">
                  {t("app.home.howItWorks.steps.collaborate.title")}
                </h3>
                <p className="mt-2 text-text-secondary">
                  {t("app.home.howItWorks.steps.collaborate.description")}
                </p>
              </div>
            </Card>

            <Card className="group flex min-h-52 flex-col justify-between transition hover:-translate-y-1 hover:border-primary">
              <div>
                <Handshake
                  size={40}
                  strokeWidth={1.5}
                  className="mb-8 text-accent-hover transition group-hover:text-primary-hover"
                />
                <h3 className="text-heading text-text-primary">
                  {t("app.home.howItWorks.steps.develop.title")}
                </h3>
                <p className="mt-2 text-text-secondary">
                  {t("app.home.howItWorks.steps.develop.description")}
                </p>
              </div>
            </Card>

            <Card className="group flex min-h-52 flex-col justify-between transition hover:-translate-y-1 hover:border-primary sm:col-span-2 lg:col-span-1">
              <div>
                <Rocket
                  size={40}
                  strokeWidth={1.5}
                  className="mb-8 text-accent-hover transition group-hover:text-primary-hover"
                />
                <h3 className="text-heading text-text-primary">
                  {t("app.home.howItWorks.steps.launch.title")}
                </h3>
                <p className="mt-2 text-text-secondary">
                  {t("app.home.howItWorks.steps.launch.description")}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
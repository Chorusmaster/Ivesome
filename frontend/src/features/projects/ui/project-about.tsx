import Card from "@/shared/ui/card";
import { useTranslation } from "react-i18next";

function ProjectAbout({ description }: { description?: string | null }) {
  const { t } = useTranslation();

  return (
    <Card>
      <h2 className="heading text-text-primary">{t("projects.projectAbout.title")}</h2>
      <p className="text-text-secondary whitespace-pre-line">{description}</p>
    </Card>
  );
}

export default ProjectAbout;

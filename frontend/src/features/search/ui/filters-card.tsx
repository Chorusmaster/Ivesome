import Card from "@/shared/ui/card";
import { SlidersHorizontal } from "lucide-react";
import FilterGroup from "./filter-group";
import type { ProjectStage } from "@/features/projects/projects.types";
import type { FilterOption } from "./filter-group";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type ProjectFilters = {
  stages?: ProjectStage[];
  tags?: string[];
};

type FiltersCardProps = {
  onChange: (filters: ProjectFilters) => void;
};

function FiltersCard({ onChange }: FiltersCardProps) {
  const { t } = useTranslation();
  const [selectedStages, setSelectedStages] = useState<ProjectStage[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const stageOptions: FilterOption<ProjectStage>[] = [
    { value: "TEAM_BUILDING", label: t("search.filters.groups.stage.options.teamBuilding") },
    { value: "DEVELOPMENT", label: t("search.filters.groups.stage.options.development") },
    { value: "LAUNCHED", label: t("search.filters.groups.stage.options.launched") },
  ];

  const tagsOptions: FilterOption<string>[] = [
    { value: "fintech", label: t("search.filters.groups.tags.options.fintech") },
    { value: "saas", label: t("search.filters.groups.tags.options.saas") },
  ];

  const handleStageChange = (stages: ProjectStage[]) => {
    setSelectedStages(stages);

    onChange({
      stages,
      tags: selectedTags,
    });
  };

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);

    onChange({
      stages: selectedStages,
      tags,
    });
  };

  const handleReset = () => {
    setSelectedStages([]);
    setSelectedTags([]);

    onChange({
      stages: [],
      tags: [],
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-subheading text-text-primary flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-primary" />
          {t("search.filters.title")}
        </h2>

        <button
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary-hover hover:underline"
        >
          {t("search.filters.reset")}
        </button>
      </div>

      <FilterGroup
        title={t("search.filters.groups.stage.title")}
        options={stageOptions}
        value={selectedStages}
        onChange={handleStageChange}
      />

      <hr className="border-border my-4" />

      <FilterGroup
        title={t("search.filters.groups.tags.title")}
        options={tagsOptions}
        value={selectedTags}
        onChange={handleTagsChange}
      />
    </Card>
  );
}

export default FiltersCard;
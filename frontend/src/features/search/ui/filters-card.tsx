import Card from "@/shared/ui/card";
import { SlidersHorizontal } from "lucide-react";
import FilterGroup from "./filter-group";
import type { ProjectStage } from "@/features/projects/projects.types";
import type { FilterOption } from "./filter-group";
import { useState } from "react";

const stageOptions: FilterOption<ProjectStage>[] = [
  { value: "TEAM_BUILDING", label: "Team building" },
  { value: "DEVELOPMENT", label: "In development" },
  { value: "LAUNCHED", label: "Launched" },
];

const tagsOptions: FilterOption<string>[] = [
  { value: "fintech", label: "Fintech" },
  { value: "saas", label: "SaaS" },
];

export type ProjectFilters = {
  stages?: ProjectStage[];
  tags?: string[];
};

type FiltersCardProps = {
  onChange: (filters: ProjectFilters) => void;
};

function FiltersCard({ onChange }: FiltersCardProps) {
  const [selectedStages, setSelectedStages] = useState<ProjectStage[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
          Filters
        </h2>

        <button
          onClick={handleReset}
          className="text-sm text-primary hover:text-primary-hover hover:underline"
        >
          Reset
        </button>
      </div>

      <FilterGroup
        title="Stage"
        options={stageOptions}
        value={selectedStages}
        onChange={handleStageChange}
      />

      <hr className="border-border my-4" />

      <FilterGroup
        title="Tags"
        options={tagsOptions}
        value={selectedTags}
        onChange={handleTagsChange}
      />
    </Card>
  );
}

export default FiltersCard;

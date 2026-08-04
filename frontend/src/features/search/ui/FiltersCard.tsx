import Card from "@/shared/ui/Card";
import { SlidersHorizontal } from "lucide-react";

function FiltersCard() {
  return (
    <Card>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-subheading flex items-center gap-2">
            <SlidersHorizontal size="20" className="text-primary"></SlidersHorizontal>
            Filters
          </h2>
          <button className="text-sm text-primary hover:text-primary-hover hover:underline">Reset</button>
        </div>
      </div>
      <div className="flex items-center gap-2 font-medium">
        <input id="all_filters" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="all_filters">All (15)</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="in_development_filter" name="in_development" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="in_development_filter">In development (10)</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="team_formation_filter" name="team_formation" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="team_formation_filter">Team formation (5)</label>
      </div>
    </Card>
  );
}

export default FiltersCard;

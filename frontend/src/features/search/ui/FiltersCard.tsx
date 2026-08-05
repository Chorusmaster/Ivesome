import Card from "@/shared/ui/Card";
import { SlidersHorizontal } from "lucide-react";

function FiltersCard() {
  return (
    <Card>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-subheading flex items-center gap-2">
            <SlidersHorizontal size="20" className="text-primary"></SlidersHorizontal>
            Filters
          </h2>
          <button className="text-sm text-primary hover:text-primary-hover hover:underline">Reset</button>
        </div>
      </div>
      <div className="font-medium text-body mb-2">
        Stage
      </div>
      <div className="flex items-center gap-2">
        <input id="team_formation_filter" name="team_formation" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="team_formation_filter">Team formation</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="in_development_filter" name="in_development" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="in_development_filter">In development</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="mvp_filter" name="mvp" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="mvp_filter">MVP</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="startup_filter" name="startup" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="startup_filter">Startup</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="ready_filter" name="ready" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="ready_filter">Ready</label>
      </div>

      <hr className="border-border mt-4 mb-4"></hr>

      <div className="font-medium text-body mb-2">
        Category
      </div>
      <div className="flex items-center gap-2">
        <input id="fintech_filter" name="fintech" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="fintech_filter">Fintech</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="saas_filter" name="saas" type="checkbox" className="size-4 accent-primary"></input>
        <label htmlFor="saas_filter">SaaS</label>
      </div>
    </Card>
  );
}

export default FiltersCard;

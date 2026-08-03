import StarIcon from "@/assets/icons/star.svg?react";
import StarIconFill from "@/assets/icons/star-fill.svg?react";
import CommentIcon from "@/assets/icons/comment.svg?react";
import ClockIcon from "@/assets/icons/clock.svg?react";

function SearchPage() {
  return (
    <div>
      <h1 className="font-heading pb-2 text-text-primary text-title">Search ideas</h1>
      <div className="text-text-secondary">Formed based on your preferences and interactions with the platform</div>

      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer select-none">All</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border select-none">Ideas</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border select-none">Startups</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border select-none">People</button>
        </div>
        <div>Sorted: <span className="font-bold">By rating</span></div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-3">
          <div className="bg-surface border border-border rounded-card shadow-card p-6 flex gap-4">
            <div>
              <div className="w-16 h-16 border-3 border-primary bg-primary-light rounded-xl flex items-center justify-center text-heading font-heading text-primary select-none">NU</div>
            </div>

            <div>
              <div className="flex pb-4 justify-between items-start">
                <div className="w-[90%]">
                  <h2 className="font-heading text-heading mb-3">Nudge — a habit tracker for remote development teams</h2>
                  <div className="text-text-secondary">A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings.</div>
                </div>
                <div className="rounded-full bg-primary-light text-primary px-2 py-0.5">Idea</div>
              </div>

              <div className="flex gap-2">
                <div className="rounded-md text-sm px-2 py-1 font-mono text-muted bg-background border border-border">#productivity</div>
                <div className="rounded-md text-sm px-2 py-1 font-mono text-muted bg-background border border-border">#saas</div>
                <div className="rounded-md text-sm px-2 py-1 font-mono text-muted bg-background border border-border">#b2b</div>
              </div>

              <div className="flex justify-between mt-4">
                <div className="flex gap-4 items-center">
                  <div className="flex">
                    <div className="rounded-full bg-primary-light border-2 border-white text-xs text-primary w-6 h-6 flex items-center justify-center select-none">MK</div>
                    <div className="rounded-full bg-primary-light border-2 border-white text-xs text-primary w-6 h-6 flex items-center justify-center -ml-2 select-none">MD</div>
                    <div className="rounded-full bg-primary-light border-2 border-white text-xs text-primary w-6 h-6 flex items-center justify-center -ml-2 select-none">YB</div>
                    <div className="rounded-full bg-primary-light border-2 border-white text-xs text-primary w-6 h-6 flex items-center justify-center -ml-2 select-none">+2</div>
                  </div>
                  <div className="text-muted text-sm">Team formation</div>
                </div>

                <div className="flex gap-4">
                  <div className="flex gap-1 items-center text-text-secondary">
                    <button><StarIcon /></button>
                    142
                  </div>
                  <div className="flex gap-1 items-center text-text-secondary">
                    <button><CommentIcon /></button>
                    38
                  </div>
                  <div className="flex gap-1 items-center text-text-secondary">
                    <ClockIcon />
                    3 hours ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-surface border border-border rounded-card shadow-card p-4">
            <h2 className="font-medium text-subheading mb-3">Filters</h2>
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
          </div>
        </div>
      </div>
    </div>
    );
}

export default SearchPage;
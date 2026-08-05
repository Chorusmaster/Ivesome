import DiscoveryCard from "@/features/search/ui/DiscoveryCard";
import FiltersCard from "@/features/search/ui/FiltersCard";

function SearchPage() {
  return (
    <div>
      <h1 className="font-heading pb-2 text-text-primary text-title">Search ideas</h1>
      <div className="text-text-secondary">Formed based on your preferences and interactions with the platform</div>

      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer select-none">All</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">Ideas</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">Startups</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">People</button>
        </div>
        <div>Sorted: <span className="font-bold">By rating</span></div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8 mb-16">
        <div className="col-span-3 flex flex-col gap-6">
          <DiscoveryCard 
            title="Nudge — a habit tracker for remote development teams"
            description="A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings."
            tags={["productivity", "saas", "b2b"]}
            upvotes={142}
            comments={38}
            publishedAt={new Date("2023-10-01")}
            type="idea"
          >
          </DiscoveryCard>
          <DiscoveryCard 
            title="Nudge — a habit tracker for remote development teams"
            description="A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings."
            tags={["productivity", "saas", "b2b"]}
            upvotes={150}
            comments={2}
            publishedAt={new Date("2026-05-01")}
            type="project"
          >
          </DiscoveryCard>
          <DiscoveryCard 
            title="Nudge — a habit tracker for remote development teams"
            description="A lightweight Slack bot that turns daily stand-ups into quick, private habits, complete with team productivity analytics, and without any extra meetings."
            tags={["productivity", "saas", "b2b"]}
            upvotes={142}
            comments={38}
            publishedAt={new Date("2026-08-04")}
            type="project"
          >
          </DiscoveryCard>
        </div>
        <div>
          <FiltersCard></FiltersCard>
        </div>
      </div>
    </div>
    );
}

export default SearchPage;
function SearchPage() {
  return (
    <div>
      <h1 className="font-heading pb-2 text-text-primary text-title">Search ideas</h1>
      <div className="text-text-secondary">Formed based on your preferences and interactions with the platform</div>

      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer">All</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border">Ideas</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border">Startups</button>
          <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border">People</button>
        </div>
        <div>Sorted: <span className="font-bold">By rating</span></div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-3">
          <div className="bg-surface border border-border rounded-card shadow-card p-6 flex gap-4">
            <div>
              <div className="w-16 h-16 border-3 border-primary bg-primary-light rounded-xl flex items-center justify-center text-heading font-heading text-primary">NU</div>
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
            </div>
          </div>
        </div>
        <div>
          <div className="bg-surface border border-border rounded-card shadow-card p-4">
            No filters yet
          </div>
        </div>
      </div>
    </div>
    );
}

export default SearchPage;
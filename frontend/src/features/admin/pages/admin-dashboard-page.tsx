import Card from "@/shared/ui/card";

function AdminDashboardPage() {
  return (
    <div className="main-container-narrow">
      <h1 className="font-heading pb-2 text-text-primary text-title">
        Admin Dashboard
      </h1>
      <div className="text-text-secondary">
        Community moderation and system monitoring
      </div>

      <Card className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-subheading font-heading">Reports</h2>
          <div className="flex gap-2">
            <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer select-none">
              All
            </button>
            <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">
              Pending
            </button>
            <button className="bg-surface px-4 py-1 rounded-full cursor-pointer border border-border hover:border-primary transition select-none">
              Resolved
            </button>
          </div>
        </div>

        <div className="mt-4 w-full overflow-hidden rounded-lg border border-border">
          <table className="w-full">
            <thead className="bg-surface">
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  Report ID
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  Reported By
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  Reported Content
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  Reason
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  Status
                </th>
                <th className="text-left px-4 py-2 text-small text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr:nth-child(odd)]:bg-background [&>tr:nth-child(even)]:bg-surface">
              <tr className="border-b border-border">
                <td className="px-4 py-2 text-small">1</td>
                <td className="px-4 py-2 text-small">John Doe</td>
                <td className="px-4 py-2 text-small">Jane Smith</td>
                <td className="px-4 py-2 text-small">Inappropriate content</td>
                <td className="px-4 py-2 text-small">Pending</td>
                <td className="px-4 py-2 text-small w-px whitespace-nowrap">
                  <div className="flex gap-2">
                    <button className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition">View</button>
                    <button className="button bg-primary text-white hover:bg-primary-hover transition">Resolve</button>
                  </div>
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-2 text-small">2</td>
                <td className="px-4 py-2 text-small">Jane Doe</td>
                <td className="px-4 py-2 text-small">Jane Smith</td>
                <td className="px-4 py-2 text-small">Inappropriate content</td>
                <td className="px-4 py-2 text-small">Pending</td>
                <td className="px-4 py-2 text-small w-px whitespace-nowrap">
                  <div className="flex gap-2">
                    <button className="button border border-border text-text-secondary hover:text-primary hover:border-primary transition">View</button>
                    <button className="button bg-primary text-white hover:bg-primary-hover transition">Resolve</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AdminDashboardPage;

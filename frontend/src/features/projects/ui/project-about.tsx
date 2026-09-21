import Card from "@/shared/ui/card";

function ProjectAbout({ description }: { description?: string | null }) {
  return (
    <Card>
      <h2 className="heading text-text-primary">About idea</h2>
      <p className="text-text-secondary whitespace-pre-line">{description}</p>
    </Card>
  );
}

export default ProjectAbout;

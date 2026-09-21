import Card from "@/shared/ui/card";

function ProfileAbout({ aboutText }: { aboutText: string }) {
  return (
    <Card>
      <h2 className="heading text-text-primary">About</h2>
      <p className="text-text-secondary whitespace-pre-line">{aboutText}</p>
    </Card>
  );
}

export default ProfileAbout;

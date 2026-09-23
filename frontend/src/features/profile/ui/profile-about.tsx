import { useTranslation } from "react-i18next";
import Card from "@/shared/ui/card";

function ProfileAbout({ aboutText }: { aboutText: string }) {
  const { t } = useTranslation();

  return (
    <Card>
      <h2 className="heading text-text-primary">{t("profile.about")}</h2>
      <p className="text-text-secondary whitespace-pre-line">{aboutText}</p>
    </Card>
  );
}

export default ProfileAbout;

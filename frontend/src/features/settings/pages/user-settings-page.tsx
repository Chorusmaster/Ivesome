import { useAuth } from "@/features/auth/auth.context";
import { useNavigate } from "react-router-dom";
import Card from "@/shared/ui/card";
import Select from "@/shared/ui/select";

export default function UserSettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/register");
    return;
  }

  return (
    <div className="main-container-narrow">
      <h1 className="font-heading pb-2 text-text-primary text-title">User settings</h1>
      <div className="text-text-secondary mb-4">Manage your account and personal preferences.</div>

      <Card>
        <div className="flex flex-col gap-4">
          <Select 
            onChange={(e) => {
              const theme = e.target.value;

              document.documentElement.classList.toggle(
                "dark",
                theme === "dark"
              );

              localStorage.setItem("theme", theme);
            }}
            label="Theme" 
            defaultValue={document.documentElement.classList.contains("dark") ? "dark" : "light"}
            options={[{value: "light", label: "☀️ Light"}, {value: "dark", label: "🌠 Dark"}]} />
        </div>
      </Card>
    </div>
  )
}

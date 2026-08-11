import ProfileForm from "@/features/profile/ui/profile-form";

function ProfileEditPage() {

  return (
    <div className="main-container-narrow">
      <div className="mb-8">
        <h1 className="font-heading mb-2 text-text-primary text-title">
          Edit profile
        </h1>
        <div className="text-text-secondary">
          Update how others see you on Ivesome
        </div>
      </div>

      <ProfileForm />
    </div>
  );
}

export default ProfileEditPage;

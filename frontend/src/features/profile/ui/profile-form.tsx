import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import type { ProfileLinkInput } from "../profile.types";
import { useAuth } from "@/features/auth/auth.context.js";

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";
import Textarea from "@/shared/ui/textarea";
import FileUpload from "@/shared/ui/file-upload";

function ProfileForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, refreshUser, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [login, setLogin] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [links, setLinks] = useState<ProfileLinkInput[]>([]);
  const [generalError, setGeneralError] = useState("");

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const skillsFormatted = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const interestsFormatted = interests
        .split(",")
        .map((interest) => interest.trim())
        .filter(Boolean);

      await updateProfile({
        firstName,
        lastName,
        avatar,
        login,
        location,
        bio,
        about,
        skills: skillsFormatted,
        interests: interestsFormatted,
        links,
      });

      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorsData = error.response?.data;
        if (errorsData?.errors) {
          console.log(errorsData?.errors);
        } else if (errorsData?.message) {
          setGeneralError(errorsData?.message);
        }
      } else {
        setGeneralError(t("profile.form.unexpectedError"));
      }
    }
  };

  const newLink: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    if (links.length < 10) {
      setLinks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          link: "",
        },
      ]);
    }
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const loadUser = async () => {
      await refreshUser();
    };

    if (!user) {
      loadUser();
      return;
    }

    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
    setLogin(user?.login ?? "");
    setLocation(user?.location ?? "");
    setBio(user?.bio ?? "");
    setAbout(user?.about ?? "");
    setSkills(user?.skills?.join(", ") ?? "");
    setInterests(user?.interests?.join(", ") ?? "");
    setLinks(
      (user?.links ?? []).map((link) => {
        return { id: crypto.randomUUID(), link: link.link };
      }),
    );
  }, [user]);

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <Card>
        <div className="heading mb-8 text-text-primary">
          {t("profile.form.basicInfo")}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            label={t("profile.form.firstName")}
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t("profile.form.firstNamePlaceholder")}
          />
          <Input
            label={t("profile.form.lastName")}
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t("profile.form.lastNamePlaceholder")}
          />
        </div>
        <Input
          label={t("profile.form.login")}
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder={t("profile.form.loginPlaceholder")}
          className="mb-4"
        />
        <Input
          label={t("profile.form.location")}
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder={t("profile.form.locationPlaceholder")}
        />
      </Card>

      <Card>
        <div className="heading mb-8 text-text-primary">
          {t("profile.form.aboutYou")}
        </div>
        <Textarea
          label={t("profile.form.bio")}
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder={t("profile.form.bioPlaceholder")}
          className="min-h-16 resize-none mb-4"
        />
        <Textarea
          label={t("profile.form.about")}
          id="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder={t("profile.form.aboutPlaceholder")}
          className="min-h-36"
        />
      </Card>

      <Card>
        <div className="heading mb-8 text-text-primary">
          {t("profile.form.skillsAndLinks")}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label={t("profile.form.skills")}
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder={t("profile.form.skillsPlaceholder")}
            className="mb-4"
          />

          <Input
            label={t("profile.form.interests")}
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder={t("profile.form.interestsPlaceholder")}
          />
        </div>

        <div>
          <div className="font-medium text-text-primary">
            {t("profile.form.websites")}
          </div>
          <div className="flex gap-4 items-start">
            <button
              type="button"
              onClick={newLink}
              disabled={links.length >= 10}
              className="mt-2 text-text-primary button shrink-0 border border-border bg-surface px-3 text-sm hover:shadow-sm disabled:shadow-none disabled:text-muted disabled:border-muted"
            >
              {t("profile.form.newLink")}
            </button>
            <div className="flex-1 flex flex-col gap-2">
              {links.map((link) => (
                <div key={link.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      type="url"
                      value={link.link}
                      onChange={(e) => {
                        setLinks((prev) =>
                          prev.map((item) =>
                            item.id === link.id
                              ? { ...item, link: e.target.value }
                              : item,
                          ),
                        );
                      }}
                      placeholder="https://your-site.dev"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLink(link.id)}
                    className="button h-10.5 min-w-10.5 shrink-0 border border-border bg-surface px-3 text-sm text-muted hover:border-danger hover:text-danger"
                    aria-label={t("profile.form.deleteLink")}
                  >
                    {t("profile.form.delete")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="heading mb-8 text-text-primary">
          {t("profile.form.profilePhoto")}
        </div>
        <FileUpload file={avatar} setFile={setAvatar} />
      </Card>

      <Card className="flex justify-between">
        <Link
          to="/profile"
          className="button bg-surface text-text-primary hover:shadow-sm border border-border"
        >
          {t("profile.form.cancel")}
        </Link>
        <div>
          {generalError && (
            <span className="text-danger text-small mr-4">{generalError}</span>
          )}
          <button
            type="submit"
            className="button bg-primary hover:bg-primary-hover text-white"
          >
            {t("profile.form.saveChanges")}
          </button>
        </div>
      </Card>
    </form>
  );
}

export default ProfileForm;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import type { ProfileLinkInput } from "../profile.types";
import { useAuth } from "@/features/auth/auth.context.js";

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";
import Textarea from "@/shared/ui/textarea";
import FileUpload from "@/shared/ui/file-upload";

function ProfileForm() {
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
  const [links, setLinks] = useState<ProfileLinkInput[]>([]);
  const [generalError, setGeneralError] = useState("");

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const skillsFormatted = skills.split(",").map(skill => skill.trim());
      await updateProfile({firstName, lastName, avatar, login, location, bio, about, skills: skillsFormatted, links});

      navigate("/profile");
    } catch(error) {
      if (axios.isAxiosError(error)) {
        const errorsData = error.response?.data;
        if (errorsData?.errors) {
          console.log(errorsData?.errors);
        } else if (errorsData?.message) {
          setGeneralError(errorsData?.message);
        }
      } else {
        setGeneralError(
          "An unexpected error occurred. Please try again later.",
        );
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
    setLinks((user?.links ?? []).map((link) => {return {id: crypto.randomUUID(), link: link.link}}));
  }, [user]);

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <Card>
        <div className="heading mb-8">Basic information</div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            label="First name"
            id="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
          />
          <Input
            label="Last name"
            id="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />
        </div>
        <Input
          label="Login"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Product designer & founder"
          className="mb-4"
        />
        <Input
          label="Location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, Country"
        />
      </Card>

      <Card>
        <div className="heading mb-8">About you</div>
        <Textarea
          label="Short bio"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="One sentence that describes you"
          className="min-h-16 resize-none mb-4"
        />
        <Textarea
          label="About"
          id="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Background, interests, what you're building on Ivesome..."
          className="min-h-36"
        />
      </Card>

      <Card>
        <div className="heading mb-8">Skills and links</div>
        <Input
          label="Skills & interests"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="product design, saas, b2b"
          className="mb-4"
        />
        <div>
          <div className="font-medium text-text-primary">Websites</div>
          <div className="flex gap-4 items-start">
            <button
              type="button"
              onClick={newLink}
              disabled={links.length >= 10}
              className="mt-2 button shrink-0 border border-border bg-surface px-3 text-sm hover:shadow-sm disabled:shadow-none disabled:text-muted disabled:border-muted"
            >
              New link
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
                    className="button h-[42px] min-w-[42px] shrink-0 border border-border bg-surface px-3 text-sm text-muted hover:border-danger hover:text-danger"
                    aria-label="Delete link"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="heading mb-8">Profile photo</div>
        <FileUpload file={avatar} setFile={setAvatar} />
      </Card>

      <Card className="flex justify-between">
        <Link
          to="/profile"
          className="button bg-surface hover:shadow-sm border border-border"
        >
          Cancel
        </Link>
        <div>
          {generalError && (
            <span className="text-danger text-small mr-4">{generalError}</span>
          )}
          <button
            type="submit"
            className="button bg-primary hover:bg-primary-hover text-white"
          >
            Save changes
          </button>
        </div>
      </Card>
    </form>
  );
}

export default ProfileForm;

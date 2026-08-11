import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";
import Textarea from "@/shared/ui/textarea";
import FileUpload from "@/shared/ui/file-upload";

function ProfileForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(name, role, location, bio, about, skills, website, linkedin);

    navigate("/profile");
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>

      <Card>
        <div className="heading mb-8">Basic information</div>
        <Input
          label="Full name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mb-4"
        />
        <Input
          label="Role / headline"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
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
        <div className="heading mb-8">Profile photo</div>
        <FileUpload />
      </Card>

      <Card>
        <div className="heading mb-8">About you</div>
        <Textarea
          label="Short bio"
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="One sentence that describes what you do and what you're looking for"
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
        <div className="heading mb-8">Skills & links</div>
        <Input
          label="Skills & interests"
          id="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="product design, saas, b2b"
          className="mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Website"
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://your-site.dev"
          />
          <Input
            label="LinkedIn"
            id="linkedin"
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/you"
          />
        </div>
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

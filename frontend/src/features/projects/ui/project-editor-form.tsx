import { useEffect, useRef, useState } from "react";

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";
import Textarea from "@/shared/ui/textarea";
import Select from "@/shared/ui/select";
import MultipleFileUpload from "@/shared/ui/multiple-file-upload";
import FileUpload from "@/shared/ui/file-upload";
import type { MultipleFileUploadRef } from "@/shared/ui/multiple-file-upload";

import type { CreateProjectPayload } from "../projects.types";

interface ProjectEditorFormProps {
  onSubmit: (data: CreateProjectPayload) => Promise<void> | void;
  onCancel: () => void;
  initialValues?: {
    title?: string;
    shortDescription?: string;
    description?: string;
    tags?: string[];
    skills?: string[];
    visibility?: "PRIVATE" | "PUBLIC";
  };
}

function ProjectEditorForm({
  onSubmit,
  onCancel,
  initialValues,
}: ProjectEditorFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [shortDescription, setShortDescription] = useState(
    initialValues?.shortDescription ?? "",
  );
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [tags, setTags] = useState((initialValues?.tags ?? []).join(", "));
  const [skills, setSkills] = useState(
    (initialValues?.skills ?? []).join(", "),
  );
  const [visibility, setVisibility] = useState<"PRIVATE" | "PUBLIC">(
    initialValues?.visibility ?? "PRIVATE",
  );
  const [logo, setLogo] = useState<File | undefined>(undefined);
  const [media, setMedia] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const uploadRef = useRef<MultipleFileUploadRef>(null);

  useEffect(() => {
    setTitle(initialValues?.title ?? "");
    setShortDescription(initialValues?.shortDescription ?? "");
    setDescription(initialValues?.description ?? "");
    setTags((initialValues?.tags ?? []).join(", "));
    setSkills((initialValues?.skills ?? []).join(", "));
    setVisibility(initialValues?.visibility ?? "PRIVATE");
  }, [initialValues]);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!onSubmit) return;

    try {
      setIsSubmitting(true);

      await onSubmit({
        title,
        shortDescription,
        description,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        logo,
        media,
        visibility,
      });
      uploadRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <Card>
        <div className="heading mb-8 text-text-primary">Basic information</div>

        <Input
          label="Title"
          id="title"
          placeholder="Some super cool idea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />

        <Textarea
          label="Short description"
          id="short_description"
          placeholder="One sentence that explains the essence of your idea"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="min-h-16 resize-none mb-4"
        />

        <Textarea
          label="Long description"
          id="long_description"
          placeholder="Problem, solution, audience, how it differs from existing products..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-36 mb-4"
        />

        <Select
          className="mb-4"
          label="Visibility"
          value={visibility}
          onChange={(e) =>
            setVisibility(e.target.value as "PRIVATE" | "PUBLIC")
          }
          options={[
            { value: "PRIVATE", label: "Private" },
            { value: "PUBLIC", label: "Public" },
          ]}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Tags"
            id="tags"
            placeholder="productivity, saas, b2b"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <Input
            label="Skills"
            id="skills"
            placeholder="backend, Node.js, Express.js"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <div className="heading mb-8 text-text-primary">Avatar</div>

        <FileUpload file={logo} setFile={setLogo} />
      </Card>

      <Card>
        <div className="heading mb-8 text-text-primary">Media</div>

        <MultipleFileUpload ref={uploadRef} files={media} setFiles={setMedia} />
      </Card>

      <Card className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            onCancel();
            uploadRef.current?.reset();
          }}
          className="button bg-surface hover:shadow-sm border border-border mr-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="button bg-primary hover:bg-primary-hover text-white"
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
      </Card>
    </form>
  );
}

export default ProjectEditorForm;

import Card from "@/shared/ui/card";
import Input from "@/shared/ui/input";
import Textarea from "@/shared/ui/textarea";
import Select from "@/shared/ui/select";
import FileUpload from "@/shared/ui/file-upload";

function NewIdeaPage() {
  return (
    <div className="main-container-narrow">
      <div className="mb-8">
        <h1 className="font-heading mb-2 text-text-primary text-title">New idea</h1>
        <div className="text-text-secondary mb-8">Share with the world what's on your mind today</div>
      </div>

      <form className="flex flex-col gap-8">
        <Card>
          <div className="heading mb-8">Basic information</div>
          <Input label="Title" id="title" placeholder="Some super cool idea" className="mb-4"></Input>
          <Textarea label="Short description" id="short_description" placeholder="One sentence that explains the essence of your idea" className="min-h-16 resize-none mb-4"></Textarea>
          <Textarea label="Long description" id="long_description" placeholder="Problem, solution, audience, how it differs from existing products..." className="min-h-36 mb-4"></Textarea>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Tags" id="tags" placeholder="productivity, saas, b2b"></Input>
            <Select label="Visibility" options={[
              {value: "private", label:"Private"},
              {value: "public", label:"Public"}
            ]} />
          </div>
        </Card>

        <Card>
          <div className="heading mb-8">Media</div>
          <FileUpload />
        </Card>

        <Card className="flex justify-between">
          <button className="button bg-surface hover:shadow-sm border border-border mr-2">Cancel</button>
          <div>
            <button className="button bg-surface hover:shadow-sm border border-border mr-2">Save as draft</button>
            <button className="button bg-primary hover:bg-primary-hover text-white">Publish</button>
          </div>
        </Card>
      </form>
    </div>
    );
}

export default NewIdeaPage;
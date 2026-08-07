import { ImagePlus } from "lucide-react";

function FileUpload() {
  return (
    <div className="w-full rounded-card border-2 border-border bg-background border-dashed flex flex-col justify-center items-center py-12 select-none">
      <ImagePlus size={32} className="text-muted mb-2" />
      <p className="text-text-primary font-medium mb-1">Drag & Drop your image here</p>
      <p className="text-muted text-small">Supported formats: PNG, JPG, JPEG, WEBP</p>
    </div>
  );
}

export default FileUpload;
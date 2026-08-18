import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";

type FileUploadProps = {
  file: File | undefined,
  setFile: (file: File | undefined) => void
}

function FileUpload({file, setFile}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    setFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full rounded-card border-2 border-dashed flex flex-col justify-center items-center py-12 select-none cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-background"
        }`}
      >
        <ImagePlus size={32} className="text-muted mb-2" />

        {file ? (
          <>
            
            <p className="text-text-primary font-medium mb-1">
              {file.name}
            </p>
            <p className="text-muted text-small">
              Drag & Drop another image to replace it
            </p>
          </>
        ) : (
          <>
            <p className="text-text-primary font-medium mb-1">
              Drag & Drop your image here
            </p>
            <p className="text-muted text-small">
              Supported formats: PNG, JPG, JPEG, WEBP
            </p>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (selectedFile) {
            handleFile(selectedFile);
          }
        }}
      />
    </>
  );
}

export default FileUpload;
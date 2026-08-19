import { useImperativeHandle, useRef, forwardRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";

type MultipleFileUploadProps = {
  files: File[];
  setFiles: (files: File[]) => void;
  maxFilesCount?: number;
};

export type MultipleFileUploadRef = {
  reset: () => void;
};

const MultipleFileUpload = forwardRef<
  MultipleFileUploadRef,
  MultipleFileUploadProps
>(({ files, setFiles, maxFilesCount=10 }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const reset = () => {
    previews.forEach((preview) => URL.revokeObjectURL(preview));

    setFiles([]);
    setPreviews([]);
  };

  useImperativeHandle(ref, () => ({
    reset,
  }));

  const handleFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    const remaining = maxFilesCount - files.length;

    if (remaining <= 0) return;

    const validFiles = imageFiles.slice(0, remaining);

    const validFilePreviews = validFiles.map((file) =>
      URL.createObjectURL(file)
    );

    setFiles([...files, ...validFiles]); 
    setPreviews([...previews, ...validFilePreviews]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    handleFiles(Array.from(e.dataTransfer.files));
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    const removedFilePreview = previews[index];
    setPreviews(previews.filter((_, i) => i !== index));
    URL.revokeObjectURL(removedFilePreview);
  };

  return (
    <div className="w-full">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full rounded-card border-2 border-dashed flex flex-col justify-center items-center py-10 select-none cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border bg-background"
        }`}
      >
        <ImagePlus size={32} className="text-muted mb-2" />

        <p className="text-text-primary font-medium mb-1">
          Drag & Drop your images here
        </p>

        <p className="text-muted text-small">
          or click to select multiple images
        </p>

        <p className="text-muted text-small mt-1">
          PNG, JPG, JPEG, WEBP
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />

      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative aspect-square rounded-card overflow-hidden border border-border group"
            >
              <img
                src={previews[index]}
                alt={file.name}
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

MultipleFileUpload.displayName = "MultipleFileUpload";

export default MultipleFileUpload;
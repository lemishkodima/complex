"use client";
import SelectBtn from "@/components/ui/select-btn/SelectBtn";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useTranslation } from "react-i18next";

const FileUpload = ({ setFile }: { setFile: (file: any) => void }) => {
  const [filename, setFileName] = useState<string | undefined>();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFileName(acceptedFiles[0].name);
    setFile(acceptedFiles[0]);
  }, []);
  const { t } = useTranslation("contact");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div className="relative ">
      <div
        {...getRootProps()}
        className={clsx(
          "dropzone border border-transparent rounded-xl border-dashed pt-10 pb-5 w-fit  flex items-center"
        )}
      >
        <input {...getInputProps()} />

      </div>
    </div>
  );
};

export default FileUpload;

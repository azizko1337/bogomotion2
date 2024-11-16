"use client";
import React from "react";
import { Button } from "./ui/button";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { TypographyInlineCode } from "./ui/typography";
import { Input } from "@/components/ui/input";

function Uploader() {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Wybierz plik");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);

    // preview
    const previewURL = URL.createObjectURL(e.target.files[0]);
    setUploadedFile({ fileName: e.target.files[0].name, filePath: previewURL });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        process.env.BACKEND_URL + "/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);
    } catch (err) {
      setUploadPercentage(0);
    }
  };

  console.log("uploadedFile", file);

  return (
    <div className="">
      <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2 items-center">
          {uploadedFile ? (
            <div className="w-full max-w-[500px]">
              <img
                className="w-full"
                src={uploadedFile.filePath}
                alt={uploadedFile.fileName}
              />
            </div>
          ) : (
            <ImagePlus size={102} />
          )}
          <Input type="file" onChange={onChange} />
          <TypographyInlineCode>{filename}</TypographyInlineCode>
        </div>
        <Progress value={uploadPercentage} />
        <div className="flex justify-end w-full">
          <Button type="submit">Prześlij</Button>
        </div>
      </form>
    </div>
  );
}

export default Uploader;

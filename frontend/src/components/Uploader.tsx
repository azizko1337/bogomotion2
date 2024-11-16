"use client";
import React from "react";
import { Button } from "./ui/button";
import { ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { TypographyInlineCode } from "./ui/typography";
import { Input } from "@/components/ui/input";
import { SpinnerDiv } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Uploader() {
  const { toast } = useToast();
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Wybierz plik");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  const allowedExtensions = ["png", "jpg", "jpeg", "mp3", "wav"];

  const onChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
 
       if (!allowedExtensions.includes(fileExtension)) {
      setMessage(
        "Niedozwolony typ pliku. Dozwolone rozszerzenia: png, jpg, jpeg, mp3, wav."
      );
      return;
    }

    setFile(selectedFile);
    setFilename(selectedFile.name);

    // preview
    const previewURL = URL.createObjectURL(selectedFile);
    setUploadedFile({ fileName: selectedFile.name, filePath: previewURL });
  };

  const onSubmit = async (e) => {
    setMessage("");
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
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
      const data = res.data.data;

      console.log(data);

      if (data.error || !data.passed) {
        setMessage("Plik nie przeszedł wymagań jakości.");
      } else {
        let emotion = "nieznana";
        switch (data.emotion) {
          case "angry":
            emotion = "złość";
            break;
          case "happy":
            emotion = "szczęście";
            break;
          case "disgust":
            emotion = "obrzydzenie";
            break;
          case "fear":
            emotion = "strach";
            break;
          case "neutral":
            emotion = "neutralność";
            break;
          case "sad":
            emotion = "smutek";
          case "surprise":
            emotion = "zaskoczenie";
            break;
        }
        toast({
          title: "Plik został przesłany pomyślnie.",
          description: `Rozpoznana emocja: ${emotion}, wskaźnik jakości: ${data.quality}.`,
        });
      }

      setFile("");
      setFilename("Wybierz plik");
      setUploadedFile({});

      setLoading(false);
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);
    } catch (err) {
      setMessage("Próbka nie spełnia wymogów jakościowych.");
      setUploadPercentage(0);
      setLoading(false);
    }
  };

  if (loading) {
    return <SpinnerDiv size="large" />;
  }

  return (
    <div className="">
      {message && (
        <Alert className="my-4" variant="destructive">
          <AlertTitle>Błąd</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
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

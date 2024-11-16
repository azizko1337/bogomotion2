"use client";

import Uploader from "@/components/Uploader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { TypographyH1 } from "@/components/ui/typography";

function Add() {
  const { user } = useAuth();

  const router = useRouter();

  if (user === null) {
    router.push("/");
    return null;
  }

  return (
    <div className="grow flex flex-col justify-center">
      <TypographyH1>Dodaj dataset</TypographyH1>
      <div className="w-full grow flex items-center justify-center">
        <Uploader />
      </div>
    </div>
  );
}

export default Add;

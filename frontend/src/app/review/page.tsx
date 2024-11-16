"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";

import ReviewPanel from "@/components/ReviewPanel";

function Review() {
  const { user } = useAuth();
  const router = useRouter();
  if (user === null) {
    router.push("/");
    return null;
  }

  function onSubmit(values: {
    angry: number;
    disgust: number;
    fear: number;
    happy: number;
    neutral: number;
    sad: number;
    surprise: number;
  }) {
    console.log(values);
  }

  return (
    <div>
      <TypographyH1>Oceń dataset</TypographyH1>
      <div className="w-full grow flex flex-col items-center justify-center gap-6 lg:flex-row">
        <div className="w-full max-w-[600px] h-[500px]"></div>
        <ReviewPanel onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default Review;

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { TypographyH1 } from "@/components/ui/typography";

import DecidePanel from "@/components/DecidePanel";

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
      <TypographyH1>Zatwierdź ocenę</TypographyH1>
      <div className="w-full grow flex flex-col items-center justify-center gap-6 lg:flex-row">
        <div className="w-full max-w-[600px] h-[500px]"></div>
        <DecidePanel
          values={{
            angry: 33,
            disgust: 0,
            fear: 0,
            happy: 0,
            neutral: 0,
            sad: 0,
            surprise: 0,
          }}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default Review;

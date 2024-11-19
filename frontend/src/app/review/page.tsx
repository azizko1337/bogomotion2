"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { TypographyH1 } from "@/components/ui/typography";
import { useEffect, useState } from "react";

import { SpinnerDiv } from "@/components/ui/spinner";
import ReviewPanel from "@/components/ReviewPanel";
import { useToast } from "@/hooks/use-toast";

function Review() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [values, setValues] = useState({
    angry: 0,
    disgust: 0,
    fear: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    surprise: 0,
  });
  const [asset, setAsset] = useState(null);
  async function fetchAsset() {
    try {
      setAsset(null);
      setValues({
        angry: 0,
        disgust: 0,
        fear: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        surprise: 0,
      });
      const response = await fetch(process.env.BACKEND_URL + "/asset", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (data.error) {
        throw new Error(data.errorMessage);
      }
      setAsset(data.data.asset);
      if (data.data.review) {
        setValues({
          angry: Math.floor(data.data.review.angry * 100),
          disgust: Math.floor(data.data.review.disgust * 100),
          fear: Math.floor(data.data.review.fear * 100),
          happy: Math.floor(data.data.review.happy * 100),
          neutral: Math.floor(data.data.review.neutral * 100),
          sad: Math.floor(data.data.review.sad * 100),
          surprise: Math.floor(data.data.review.surprise * 100),
        });
      }
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Brak danych do oceny.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchAsset();
  }, []);

  async function onSubmit(values: {
    angry: number;
    disgust: number;
    fear: number;
    happy: number;
    neutral: number;
    sad: number;
    surprise: number;
  }) {
    const standarizedValues = {
      angry: values.angry / 100,
      disgust: values.disgust / 100,
      fear: values.fear / 100,
      happy: values.happy / 100,
      neutral: values.neutral / 100,
      sad: values.sad / 100,
      surprise: values.surprise / 100,
    };
    try {
      const response = await fetch(process.env.BACKEND_URL + "/review", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset_id: asset.id,
          values: standarizedValues,
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.errorMessage);
      }
      await fetchAsset();

      toast({
        title: "Dodano zasób",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Błąd serwera.",
        variant: "destructive",
      });
      router.push("/");
    }
  }

  if (user === null) {
    router.push("/");
    return null;
  }

  if (!asset) {
    return <SpinnerDiv />;
  }

  return (
    <div>
      <TypographyH1>Oceń dataset</TypographyH1>
      <div className="w-full grow flex flex-col items-center justify-center gap-6 lg:flex-row my-8">
        <div
          className="w-full max-w-[600px] h-[500px] overflow-hidden"
          style={{
            backgroundImage: `url(${asset?.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* <img className="w-full" src={asset.src} /> */}
        </div>
        <ReviewPanel
          values={values}
          setValues={setValues}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default Review;

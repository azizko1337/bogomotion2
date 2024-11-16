"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { TypographyH1 } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

import DecidePanel from "@/components/DecidePanel";

function Decide() {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchAsset();
  }, []);

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
      const response = await fetch(
        process.env.BACKEND_URL + "/average_review",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.errorMessage);
      }

      setAsset(data.data.asset);
      setValues({
        angry: Math.floor(data.data.asset.angry * 100),
        disgust: Math.floor(data.data.asset.disgust * 100),
        fear: Math.floor(data.data.asset.fear * 100),
        happy: Math.floor(data.data.asset.happy * 100),
        neutral: Math.floor(data.data.asset.neutral * 100),
        sad: Math.floor(data.data.asset.sad * 100),
        surprise: Math.floor(data.data.asset.surprise * 100),
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Brak danych do decyzji.",
        variant: "destructive",
      });
      router.push("/");
    }
  }

  async function onSubmit(value) {
    try {
      const res = await fetch(process.env.BACKEND_URL + "/decide", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          asset_id: asset?.asset_id,
          value,
        }),
      });
      const data = await res.json();

      toast({
        title: "Dodano decyzję.",
      });

      await fetchAsset();
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Błąd serwera.",
        variant: "destructive",
      });
    }
  }

  if (user === null) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <TypographyH1>Zatwierdź ocenę</TypographyH1>
      <div className="w-full grow flex flex-col items-center justify-center gap-6 lg:flex-row my-8">
        <div className="w-full max-w-[600px] h-[500px] overflow-hidden">
          <img src={asset?.src} />
        </div>
        <DecidePanel values={values} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default Decide;

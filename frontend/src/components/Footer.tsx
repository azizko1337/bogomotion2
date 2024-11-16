"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SpinnerDiv } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

function Footer() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleQuery() {
    setAnswer("");
    setLoading(true);
    if (query.split(" ").length < 5) {
      console.log(query.split(" ").length);
      setAnswer("Zbyt krótkie zapytanie");
      setLoading(false);
      return;
    }

    // fetch data
    try {
      const response = await fetch(process.env.BACKEND_URL + "/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal: AbortSignal.timeout(200000),
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      console.log(data);

      // if (data.error) {
      //   throw new Error("Błąd serwera.");
      // }
      setAnswer(data.data.response);
    } catch (error) {
      console.log(error);
      setAnswer("Błąd serwera.");
    }

    setLoading(false);
  }

  return (
    <footer className="border-t border-border/40 py-6 dark:border-border md:py-0">
      <div className="flex justify-end items-center gap md:h-24 p-5 max-w-6xl mx-auto">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          Zbudowano podczas{" "}
          <a
            href="https://hackemotion.us.edu.pl/"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Hackathonu
          </a>
          . Kod jest dostępny na{" "}
          <a
            href="https://github.com/azizko1337"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      <Sheet>
        <SheetTrigger className="absolute bottom-1 left-1">Open</SheetTrigger>
        <SheetContent className="gap-4 flex flex-col">
          {loading ? (
            <SpinnerDiv />
          ) : (
            <>
              <SheetHeader>
                <SheetTitle>Asystent LLM</SheetTitle>
                <SheetDescription>
                  Asystent może podawać informacje błędne, służy tylko jako
                  sugestia.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-2 items-end">
                <Input
                  placeholder="Wpisz pytanie"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button onClick={handleQuery}>Zadaj pytanie</Button>
                <Textarea
                  className="text-foreground h-[400px]"
                  value={answer}
                  disabled={true}
                />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </footer>
  );
}

export default Footer;

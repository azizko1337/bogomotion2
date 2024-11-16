import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { TypographyMuted, TypographyInlineCode } from "./ui/typography";
import { Button } from "@/components/ui/button";

function DecidePanel(props: {
  values: {
    angry: number;
    disgust: number;
    fear: number;
    happy: number;
    neutral: number;
    sad: number;
    surprise: number;
  };
}) {
  const { values } = props;

  //   function handleChange(key: string, value: number) {
  //     setValues((prev) => ({ ...prev, [key]: value }));
  //   }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // onSubmit(values);
      }}
      className="w-full max-w-[250px] flex flex-col gap-5"
    >
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Złość <TypographyInlineCode>({values.angry})%</TypographyInlineCode>
          </TypographyMuted>
          <Progress value={values.angry} />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Odraza{" "}
            <TypographyInlineCode>({values.disgust})%</TypographyInlineCode>
          </TypographyMuted>
          <Progress value={values.disgust} />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Strach <TypographyInlineCode>({values.fear})%</TypographyInlineCode>
          </TypographyMuted>
          <Progress value={values.fear} />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Wesołość{" "}
            <TypographyInlineCode>({values.happy})%</TypographyInlineCode>
          </TypographyMuted>
          <Progress value={values.happy} />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Neutralność{" "}
            <TypographyInlineCode>({values.neutral})%</TypographyInlineCode>
          </TypographyMuted>
          <Progress value={values.neutral} />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Smutność{" "}
            <TypographyInlineCode>({values.sad})%</TypographyInlineCode>
          </TypographyMuted>
          <Progress value={values.sad} />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Zaskoczenie{" "}
            <TypographyInlineCode>({values.surprise})%</TypographyInlineCode>
          </TypographyMuted>
          <Progress value={values.surprise} />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" variant="default">
          Przyjmij
        </Button>
        <Button type="submit" variant="secondary">
          Odrzuć
        </Button>
      </div>
    </form>
  );
}

export default DecidePanel;

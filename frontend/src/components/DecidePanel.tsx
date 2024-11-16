import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { TypographyMuted, TypographyInlineCode } from "./ui/typography";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

function DecidePanel(props: {
  onSubmit: (value) => void;
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
  const { onSubmit, values } = props;
  const [value, setValue] = useState(0);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
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
      <div className="my-4">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Zgadzam się na{" "}
            <TypographyInlineCode>({value})%</TypographyInlineCode>
          </TypographyMuted>
          <Slider
            value={[value]}
            onValueChange={(newValue) => setValue(newValue[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" variant="default">
          Wyślij
        </Button>
      </div>
    </form>
  );
}

export default DecidePanel;

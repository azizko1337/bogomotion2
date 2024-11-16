import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { TypographyMuted, TypographyInlineCode } from "./ui/typography";
import { Button } from "@/components/ui/button";

function ReviewPanel(props: {
  onSubmit: (values: {
    angry: number;
    disgust: number;
    fear: number;
    happy: number;
    neutral: number;
    sad: number;
    surprise: number;
  }) => void;
}) {
  const { onSubmit } = props;

  const [values, setValues] = useState({
    angry: 0,
    disgust: 0,
    fear: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    surprise: 0,
  });

  function handleChange(key: string, value: number) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="w-full max-w-[250px] flex flex-col gap-5"
    >
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Złość <TypographyInlineCode>({values.angry})%</TypographyInlineCode>
          </TypographyMuted>
          <Slider
            value={[values.angry]}
            onValueChange={(newValue) => handleChange("angry", newValue[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Odraza{" "}
            <TypographyInlineCode>({values.disgust})%</TypographyInlineCode>
          </TypographyMuted>
          <Slider
            value={[values.disgust]}
            onValueChange={(newValue) => handleChange("disgust", newValue[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Strach <TypographyInlineCode>({values.fear})%</TypographyInlineCode>
          </TypographyMuted>
          <Slider
            value={[values.fear]}
            onValueChange={(newValue) => handleChange("fear", newValue[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Wesołość{" "}
            <TypographyInlineCode>({values.happy})%</TypographyInlineCode>
          </TypographyMuted>
          <Slider
            value={[values.happy]}
            onValueChange={(newValue) => handleChange("happy", newValue[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Neutralność{" "}
            <TypographyInlineCode>({values.neutral})%</TypographyInlineCode>
          </TypographyMuted>
          <Slider
            value={[values.neutral]}
            onValueChange={(newValue) => handleChange("neutral", newValue[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Smutność{" "}
            <TypographyInlineCode>({values.sad})%</TypographyInlineCode>
          </TypographyMuted>
          <Slider
            value={[values.sad]}
            onValueChange={(newValue) => handleChange("sad", newValue[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="grow flex flex-col gap-1">
          <TypographyMuted>
            Zaskoczenie{" "}
            <TypographyInlineCode>({values.surprise})%</TypographyInlineCode>
          </TypographyMuted>
          <Slider
            value={[values.surprise]}
            onValueChange={(newValue) => handleChange("surprise", newValue[0])}
            min={0}
            max={100}
            step={1}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Oceń</Button>
      </div>
    </form>
  );
}

export default ReviewPanel;

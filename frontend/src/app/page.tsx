import { TypographyH1 } from "@/components/ui/typography";

function Index() {
  return (
    <div
      className="grow flex justify-center items-center opacity-90 rounded"
      style={{
        backgroundImage: "url(/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TypographyH1 className="">BOGOMOTION 2.0</TypographyH1>
    </div>
  );
}

export default Index;

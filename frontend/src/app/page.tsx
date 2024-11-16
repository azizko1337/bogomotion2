import { TypographyH1 } from "@/components/ui/typography";

function Index() {
  return (
    <div
      className="grow flex justify-center items-center"
      style={{
        backgroundImage: "url(/background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <TypographyH1>BOGOMOTION 2.0</TypographyH1>
    </div>
  );
}

export default Index;

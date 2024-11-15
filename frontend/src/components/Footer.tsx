function Footer() {
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
    </footer>
  );
}

export default Footer;

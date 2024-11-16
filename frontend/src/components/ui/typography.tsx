import { cn } from "@/lib/utils";

type Props = {
  children: string;
  className: string | undefined;
};

export function TypographyH1(props: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className
      )}
    >
      {props.children}
    </h1>
  );
}

export function TypographyH2(props: Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        props.className
      )}
    >
      {props.children}
    </h2>
  );
}

export function TypographyH3(props: Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        props.className
      )}
    >
      {props.children}
    </h3>
  );
}

export function TypographyH4(props: Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        props.className
      )}
    >
      {props.children}
    </h4>
  );
}

export function TypographyP(props: Props) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}>
      {props.children}
    </p>
  );
}

export function TypographyBlockquote(props: Props) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", props.className)}>
      {props.children}
    </blockquote>
  );
}

export function TypographyList(props: { className: string; items: string[] }) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {props.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function TypographyInlineCode(props: Props) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        props.className
      )}
    >
      {props.children}
    </code>
  );
}

export function TypographyLead(props: Props) {
  return (
    <p className={cn("text-xl text-muted-foreground", props.className)}>
      {props.children}
    </p>
  );
}

export function TypographyLarge(props: Props) {
  return (
    <p className={cn("text-lg font-semibold", props.className)}>
      {props.children}
    </p>
  );
}

export function TypographySmall(props: Props) {
  return (
    <p className={cn("text-sm font-medium leading-none", props.className)}>
      {props.children}
    </p>
  );
}

export function TypographyMuted(props: Props) {
  return (
    <p className={cn("text-sm text-muted-foreground", props.className)}>
      {props.children}
    </p>
  );
}

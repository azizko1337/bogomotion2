"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthPopover from "./AuthPopover";

import { useTheme } from "next-themes";
import { useAuth } from "@/context/authContext";

import Link from "next/link";

function NavBar() {
  const { setTheme } = useTheme();
  const { user } = useAuth();

  if (user === null || user === "loading") {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            Hackathon
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Strona główna
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <AuthPopover />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Jasny
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Ciemny
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  Systemowy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full md:hidden"
                >
                  <Menu />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                <div className="grid gap-4 p-4">
                  <SheetClose>
                    <Link
                      href="/"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                      prefetch={false}
                    >
                      Strona główna
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          Hackathon
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/add"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Dodaj dataset
          </Link>
          <Link
            href="/review"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Oceń dataset
          </Link>
          <Link
            href="/decide"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            Zatwierdź oceny
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <AuthPopover />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Jasny
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Ciemny
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                Systemowy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <Menu />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
              <div className="grid gap-4 p-4">
                <SheetClose>
                  <Link
                    href="/add"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    Dodaj dataset
                  </Link>
                  <Link
                    href="/review"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    Oceń dataset
                  </Link>
                  <Link
                    href="/decide"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    Zatwierdź oceny
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default NavBar;

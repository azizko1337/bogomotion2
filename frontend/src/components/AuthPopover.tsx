import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

import LoginForm from "./LoginForm";

import { useAuth } from "@/context/authContext";
import { useToast } from "@/hooks/use-toast";

function AuthPopover() {
  const router = useRouter();
  const { toast } = useToast();

  const { user, setUser } = useAuth();

  async function handleLogout() {
    await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    setUser(null);
    router.push("/");

    // toast({
    //   title: "Wylogowano",
    // });
  }

  if (user === "loading") {
    return <Spinner size="small" />;
  }

  if (user === null) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost">
            <User />
            Zaloguj się
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Zaloguj się</h4>
              <p className="text-sm text-muted-foreground">
                aby uzyskać pełnię funkcji.
              </p>
              <LoginForm />
            </div>
            <div className="grid gap-2">
              <Link href="/auth/register">
                <PopoverClose asChild>
                  <Button variant="link">
                    Nie masz konta? Zarejestruj się.
                  </Button>
                </PopoverClose>
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <User />
          {user.email.split("@")[0]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{user.email}</h4>
            <p className="text-sm text-muted-foreground">
              Cieszymy się że wróciłeś!
            </p>
          </div>
          <div className="flex flex-col items-center">
            <PopoverClose asChild>
              <Button disabled={true} variant="secondary">
                <Link href="/auth/user">Edytuj dane profilu</Link>
              </Button>
            </PopoverClose>
          </div>
          <div className="grid gap-2">
            <PopoverClose asChild>
              <Button variant="link" onClick={handleLogout}>
                Wspóldzielisz komputer? Wyloguj się.
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default AuthPopover;

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

import { ComponentType } from "react";

import { SpinnerDiv } from "@/components/ui/spinner";

const withAuth = (WrappedComponent: ComponentType) => {
  const Wrapper = (props: Record<string, unknown>) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/auth/login");
      }
    }, [user, router]);

    if (user === "loading") {
      return <SpinnerDiv size="large" />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;

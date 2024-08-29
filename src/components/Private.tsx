import { useSession } from "next-auth/react";
import Loader from "./Loader";
import { AuthPage } from "@/components/auth/page";

export default function Private({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    return <AuthPage />;
  }

  if (!data) {
    return <Loader />;
  }

  return <>{children}</>;
}

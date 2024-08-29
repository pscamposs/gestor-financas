// Organize os imports
"use client";
import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import Sidebar from "@/components/Sidebar";
import Dashboard from "./dashboard/page";
import ModalContainer from "@/components/modal/ModalContainer";
import { ModalContextProvider } from "@/context/useModal";
import { AlertContextProvider } from "@/context/useAlert";
import { Alerts } from "@/components/Alerts";
import Private from "@/components/Private";

function AppProviders({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient({}), []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AlertContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </AlertContextProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default function Home() {
  const [viewPage, setViewPage] = useState<React.ReactElement>(<Dashboard />);

  return (
    <AppProviders>
      <main className="flex overflow-hidden">
        <Alerts />
        <Private>
          <Sidebar setView={setViewPage} />
          <section className="flex-1 p-4 w-dvw">{viewPage}</section>
        </Private>
        <ModalContainer />
      </main>
    </AppProviders>
  );
}

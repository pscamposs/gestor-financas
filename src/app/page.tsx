"use client";
import { useState, ReactNode, ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import Sidebar from "@/components/Sidebar";
import Dashboard from "./dashboard/page";
import ModalContainer from "@/components/modal/ModalContainer";
import { ModalContextProvider } from "@/context/useModal";
import { AlertContextProvider } from "@/context/useAlert";
import { Alerts } from "@/components/Alerts";
import Private from "@/components/Private";

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AlertContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </AlertContextProvider>
    </SessionProvider>
  );
}

const queryClient = new QueryClient();

export default function Home() {
  const [viewPage, setViewPage] = useState<ReactElement>(<Dashboard />);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

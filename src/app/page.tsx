"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import Dashboard from "./dashboard/page";
import ModalContainer from "@/components/modal/ModalContainer";
import { ModalContextProvider } from "@/context/useModal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  const [viewPage, setViewPage] = useState<React.ReactElement>(<Dashboard />);

  return (
    <main className="flex overflow-hidden relative">
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          <Sidebar setView={setViewPage} />
          <section className="flex-1 p-4 w-dvw">{viewPage}</section>
          <ModalContainer />
        </ModalContextProvider>
      </QueryClientProvider>
    </main>
  );
}

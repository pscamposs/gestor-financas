"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [viewPage, setViewPage] = useState<React.ReactElement>(<Dashboard />);

  return (
    <main className="flex overflow-hidden">
      <Sidebar setView={setViewPage} />
      <section className="flex-1 p-4 w-dvw">{viewPage}</section>
    </main>
  );
}

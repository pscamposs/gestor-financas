"use client";
import Banks from "@/app/banks/page";
import Dashboard from "@/app/dashboard/page";
import Finances from "@/app/finances/page";
import SettingsPage from "@/app/settings/setting";
import { ArrowLeftRight, CreditCard, Home, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { ReactElement, useState } from "react";

interface SidebarItemProps {
  icon: ReactElement;
  isActive: boolean;
  page: ReactElement;
  onClick: (page: ReactElement) => void;
}

const SidebarItem = ({ icon, isActive, page, onClick }: SidebarItemProps) => {
  return (
    <li
      onClick={() => onClick(page)}
      className={`hover:text-sky-600 cursor-pointer ${
        isActive ? "text-sky-500" : ""
      }`}
    >
      {icon}
    </li>
  );
};

const sidebarItems = [
  { label: "home", icon: <Home />, page: <Dashboard /> },
  {
    label: "finances",
    icon: <ArrowLeftRight />,
    page: <Finances />,
  },
  {
    label: "banks",
    icon: <CreditCard />,
    page: <Banks />,
  },
  { label: "settings", icon: <Settings />, page: <SettingsPage /> },
];

const Sidebar = ({ setView }: { setView: (page: ReactElement) => void }) => {
  const [activeItem, setActiveItem] = useState<string>("home");

  const handleClick = (label: string, page: ReactElement) => {
    setActiveItem(label);
    setView(page);
  };

  const {} = useSession({
    required: true,
    onUnauthenticated: () => {},
  });

  return (
    <aside className="p-8 h-screen">
      <div className="flex flex-col justify-between items-center h-full">
        <ul className="flex flex-col gap-4">
          {sidebarItems.slice(0, 3).map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              page={item.page}
              isActive={item.label === activeItem}
              onClick={(page) => handleClick(item.label, page)}
            />
          ))}
        </ul>
        <ul>
          {sidebarItems.slice(3, 4).map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              page={item.page}
              isActive={item.label === activeItem}
              onClick={(page) => handleClick(item.label, page)}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

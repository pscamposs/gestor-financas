"use client";
import Dashboard from "@/app/dashboard/page";
import { ArrowLeftRight, Home, Settings } from "lucide-react";
import React, { useState } from "react";

interface SidebarItemProps {
  icon: React.ReactElement;
  isActive: boolean;
  page: React.ReactElement;
  onClick: (page: React.ReactElement) => void;
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
    page: <div>Finances Page</div>,
  },
  { label: "settings", icon: <Settings />, page: <div>Settings Page</div> },
];

const Sidebar = ({
  setView,
}: {
  setView: (page: React.ReactElement) => void;
}) => {
  const [activeItem, setActiveItem] = useState<string>("home");

  const handleClick = (label: string, page: React.ReactElement) => {
    setActiveItem(label);
    setView(page);
  };

  return (
    <aside className="p-8 h-screen">
      <div className="flex flex-col justify-between items-center h-full">
        <ul className="flex flex-col gap-4">
          {sidebarItems.slice(0, 2).map((item) => (
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
          {sidebarItems.slice(2, 3).map((item) => (
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

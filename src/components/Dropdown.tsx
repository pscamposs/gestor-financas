import React from "react";

interface DropDownOption {
  label: string;
  onClick: () => void;
}

interface DropDownProps {
  icon: React.ReactElement;
  options: DropDownOption[];
}

export default function DropDown({ icon, options }: DropDownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <button
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      {isOpen && (
        <div
          className={`fixed right-20  p-2 w-[200px] bg-white border-2 border-zinc-200 z-20 rounded`}
        >
          <ul>
            {options.map((option) => (
              <li
                key={option.label}
                onClick={option.onClick}
                className="hover:bg-zinc-100 py-2 rounded text-start px-1 font-bold"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
}

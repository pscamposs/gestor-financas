import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: React.ReactElement;
}

const Button: React.FC<ButtonProps> = ({ label, icon, ...props }) => {
  return (
    <button
      className="flex gap-2 text-sky-500 hover:text-sky-700 text-start p-1.5 rounded-md"
      {...props}
    >
      {icon}
      {label}
    </button>
  );
};

export default Button;

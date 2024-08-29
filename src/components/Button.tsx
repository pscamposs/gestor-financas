import React, { ButtonHTMLAttributes, FC, ReactElement } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon: ReactElement;
}

const Button: FC<ButtonProps> = ({ label, icon, ...props }) => {
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

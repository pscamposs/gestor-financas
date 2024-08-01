interface ButtonProps {
  label: String;
  icon: React.ReactElement;
}

export default function Button({ label, icon }: ButtonProps) {
  return (
    <button className="text-sky-500 hover:text-sky-700 w-40 text-start p-1.5 rounded-md">
      {icon}
      {label}
    </button>
  );
}

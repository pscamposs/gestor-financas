import { ReactElement } from "react";

interface CardProps {
  title: string;
  subtitle: string;
  value: any;
  baseTitle: string;
  icon?: ReactElement;
}

export default function Card({
  title,
  subtitle,
  baseTitle,
  value,
  icon,
}: CardProps) {
  return (
    <div className="w-[350px] p-4 rounded-lg bg-sky-500 relative m-2">
      <section className="text-start text-zinc-50 font-bold">
        <h2 className="text-2xl line-clamp-1">{title}</h2>
        <p className="text-sm">{subtitle}</p>
        <h3 className="text-3xl font-extrabold">{value}</h3>
        <span className="text-sm">{baseTitle}</span>
      </section>
      <section className="text-zinc-50 absolute right-4 bottom-4">
        {icon}
      </section>
    </div>
  );
}

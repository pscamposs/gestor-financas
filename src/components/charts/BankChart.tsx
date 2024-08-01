import React from "react";

interface BankMetricProps {
  color: string;
  title: string;
  total: number;
}

const data: BankMetricProps[] = [
  {
    title: "Nubank",
    total: 1242.24,
    color: "#C4B5FD",
  },
  {
    title: "Inter",
    total: 524.9,
    color: "#FDBA74",
  },
  {
    title: "Itaú",
    total: 192.12,
    color: "#FCD34D",
  },
];

let calcProgress = (bank: BankMetricProps) => {
  let total = data.reduce((acc, current) => acc + current.total, 0);
  let percent = Math.round((bank.total / total) * 100);
  console.log(percent);
  return percent;
};

const ProgressBar = ({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) => {
  return (
    <div className="relative h-2 bg-zinc-100 rounded-md overflow-hidden">
      <div
        className="h-full absolute top-0 left-0"
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

const BankMetric: React.FC<{ bank: BankMetricProps }> = ({ bank }) => {
  return (
    <div className="py-2">
      <div className="flex justify-between">
        <h2 className={`text-sm font-semibold`} style={{ color: bank.color }}>
          {bank.title}
        </h2>
        <h3 className="text-red-300 text-xl font-bold">{bank.total}</h3>
      </div>
      <div className="relative">
        <ProgressBar progress={calcProgress(bank)} color={bank.color} />
      </div>
    </div>
  );
};

export default function BankChart() {
  return (
    <div className="p-8 inline-block mt-8 w-96 cursor-default ">
      <h3 className="text-zinc-600 font-bold">Gastos Bancários</h3>
      <div>
        {data.map((bank, index) => (
          <BankMetric key={index} bank={bank} />
        ))}
      </div>
      <hr className="my-4" />
      <div>
        <h2 className="text-zinc-600 font-bold">Total</h2>
        <p className="text-red-300">
          {(
            Math.round(
              data.reduce((acc, current) => acc + current.total, 0) * 100
            ) / 100
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

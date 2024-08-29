"use client";
import { formatCurrency } from "@/utils/FormatterUtils";
import React, { useEffect, useState } from "react";

const calcProgress = (bankTotal: number, total: number) => {
  return total === 0 ? 0 : Math.round((bankTotal / total) * 100);
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

const BankMetric: React.FC<{
  bank: string;
  total: number;
  overallTotal: number;
  banks: InvoiceProps[];
}> = ({ bank, total, overallTotal, banks }) => {
  const getBankColor = (bank: string) => {
    return banks.find((b) => b.bank_label === bank)?.bank_color || "#000";
  };

  return (
    <div className="py-2">
      <div className="flex justify-between">
        <h2
          className="text-sm font-semibold"
          style={{ color: getBankColor(bank) }}
        >
          {bank}
        </h2>
        <h3 className="text-red-300 text-xl font-bold">
          {formatCurrency(total)}
        </h3>
      </div>
      <div className="relative">
        <ProgressBar
          progress={calcProgress(total, overallTotal)}
          color={getBankColor(bank)}
        />
      </div>
    </div>
  );
};

export default function BankChart({ data }: { data: InvoiceProps[] }) {
  const [banks, setBanks] = useState<Record<string, number>>({});
  const [banksTotal, setBanksTotal] = useState(0);

  useEffect(() => {
    const totals = data.reduce((acc, invoice) => {
      const { bank_label, value, flow } = invoice;

      if (flow != "Entrada") {
        const numericValue = Number(value);

        if (!isNaN(numericValue)) {
          acc[bank_label] = (acc[bank_label] || 0) + numericValue;
        }
      }

      return acc;
    }, {} as Record<string, number>);

    const total = Object.values(totals).reduce(
      (sum, bankTotal) => sum + bankTotal,
      0
    );

    setBanks(totals);
    setBanksTotal(total);
  }, [data]);

  return (
    <div className="p-8 inline-block mt-8 w-96 cursor-default">
      <h3 className="text-zinc-600 font-bold">Gastos Bancários</h3>
      <div>
        {Object.entries(banks).map(([bank, total]) => (
          <BankMetric
            key={bank}
            bank={bank}
            banks={data}
            total={total}
            overallTotal={banksTotal}
          />
        ))}
      </div>
      <hr className="my-4" />
      <div>
        <h2 className="text-zinc-600 font-bold">Total</h2>
        <p className="text-red-300">{formatCurrency(banksTotal)}</p>
      </div>
    </div>
  );
}

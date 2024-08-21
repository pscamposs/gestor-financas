import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const getMetrics = (data: InvoiceProps[]) => {
  const metrics: { name: string; Entrada: number; Saida: number }[] = [];
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  data.forEach((invoice) => {
    const invoiceDate = new Date(invoice.date);
    const month = invoiceDate.getMonth();
    const day = invoiceDate.getDate();

    let adjustedMonth = month;
    if (day > invoice.bank_closing_day) {
      adjustedMonth = (month + 1) % 12;
    }

    let metric = metrics.find((m) => m.name === monthNames[adjustedMonth]);
    if (!metric) {
      metric = { name: monthNames[adjustedMonth], Entrada: 0, Saida: 0 };
      metrics.push(metric);
    }

    if (invoice.flow === "Entrada") {
      metric.Entrada += Number(invoice.value) / 100;
    } else if (invoice.flow === "Saída") {
      metric.Saida += Number(invoice.value) / 100;
    }
  });
  metrics.sort(
    (a, b) => monthNames.indexOf(a.name) - monthNames.indexOf(b.name)
  );

  return metrics;
};

export default function InvoiceChart({ data }: { data: InvoiceProps[] }) {
  return (
    <div className="p-8 inline-block mt-8 cursor-default">
      <h3 className="text-zinc-600 font-bold">Métricas Mensais</h3>
      <BarChart
        width={1000}
        height={400}
        data={getMetrics(data)}
        margin={{
          top: 16,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Entrada" fill="#65a30d" />
        <Bar dataKey="Saida" fill="#dc2626" />
      </BarChart>
    </div>
  );
}

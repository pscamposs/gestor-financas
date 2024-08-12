import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Fev",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Mar",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Abr",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Mai",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Jun",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Jul",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Ago",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Set",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Out",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Nov",
    Entrada: 4000,
    Saida: 2400,
  },
  {
    name: "Dez",
    Entrada: 4000,
    Saida: 2400,
  },
];

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

    let metric = metrics.find((m) => m.name === monthNames[month]);
    if (!metric) {
      metric = { name: monthNames[month], Entrada: 0, Saida: 0 };
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

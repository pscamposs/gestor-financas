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

export default function InvoiceChart() {
  return (
    <div className="p-8 inline-block mt-8 cursor-default">
      <h3 className="text-zinc-600 font-bold">Métricas Mensais</h3>
      <BarChart
        width={500}
        height={400}
        data={data}
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

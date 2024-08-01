import Button from "@/components/Button";
import Card from "@/components/Card";
import BankChart from "@/components/charts/BankChart";
import InvoiceChart from "@/components/charts/InvoiceChart";
import {
  BookOpen,
  BookUser,
  Calculator,
  Calendar,
  CreditCard,
  FileChartColumnIncreasing,
} from "lucide-react";

export default function Dashboard() {
  return (
    <section>
      <h1 className="text-3xl">Dashboard</h1>
      <div className="flex w-[70%] flex-wrap py-4">
        <Card
          title="Olá Patrick Soares."
          subtitle="Limite dos cartões de crédito"
          value={0}
          baseTitle="Total"
          icon={<BookUser size={48} />}
        />
        <Card
          title="Ago. 2024"
          subtitle="Fatura dos cartões de crédito"
          value={0}
          baseTitle="Mês"
          icon={<FileChartColumnIncreasing size={48} />}
        />
        <Card
          title="Ano 2024"
          subtitle="Fatura dos cartões de crédito"
          value={0}
          baseTitle="Total"
          icon={<Calendar size={48} />}
        />
      </div>
      <div className="flex gap-4 overflow-x-auto w-[70%]">
        <Button label="Meus Cartões" icon={<CreditCard />} />
        <Button label="Meus emprestimos" icon={<Calculator />} />
        <Button label="Minhas faturas" icon={<BookOpen />} />
      </div>
      <div className="bg-sky-500 py-8 w-[60%] rounded-md px-4 mt-4">
        <p className="text-indigo-50 font-bold text-xl">Não há alertas</p>
      </div>
      <div className="flex flex-wrap justify-start max-md:hidden">
        <div className="overflow-x-auto">
          <InvoiceChart />
        </div>
        <div>
          <BankChart />
        </div>
      </div>
    </section>
  );
}

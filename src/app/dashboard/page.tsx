import Button from "@/components/Button";
import Card from "@/components/Card";
import BankChart from "@/components/charts/BankChart";
import InvoiceChart from "@/components/charts/InvoiceChart";
import { useCalculateTotals } from "@/hook/use-calculate";
import { formatCurrency } from "@/utils/FormatterUtils";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  BookUser,
  Calculator,
  Calendar,
  ChartBar,
  CreditCard,
  FileChartColumnIncreasing,
} from "lucide-react";

const useDashboardData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchDashboard"],
    queryFn: async () => {
      const response = await fetch("/api/profile");
      const data = await response.json();
      return data;
    },
  });

  return { data, isLoading, error };
};

export default function Dashboard() {
  const { data, isLoading, error } = useDashboardData();
  const { creditTotal, monthlyTotal, annualTotal } = useCalculateTotals(
    data?.invoices
  );
  if (isLoading || !data) return <div>loading...</div>;

  const availableLimit = data.profile.salary - monthlyTotal;

  return (
    <section>
      <h1 className="text-3xl">Dashboard</h1>
      <div className="flex flex-wrap py-4">
        <Card
          title={`Olá ${data.profile.name}`}
          subtitle="Salário líquido mensal"
          value={formatCurrency(data.profile.salary)}
          baseTitle="Total"
          icon={<BookUser size={48} />}
        />
        <Card
          title={`Seu limite`}
          subtitle="Limite disponível"
          value={formatCurrency(availableLimit)}
          baseTitle="Total"
          icon={<ChartBar size={48} />}
        />
        <Card
          title={`Mês ${new Date().getMonth() + 1}`}
          subtitle="Fatura dos cartões de crédito"
          value={formatCurrency(creditTotal)}
          baseTitle="Mensal"
          icon={<FileChartColumnIncreasing size={48} />}
        />
        {/* <Card
          title={`Mês ${new Date().getMonth() + 1}`}
          subtitle="Pagamento total do mês"
          value={formatCurrency(monthlyTotal)}
          baseTitle="Mensal"
          icon={<FileChartColumnIncreasing size={48} />}
        /> */}
        <Card
          title={`Ano ${new Date().getFullYear()}`}
          subtitle="Gastos totais anuais"
          value={formatCurrency(annualTotal)}
          baseTitle="Total"
          icon={<Calendar size={48} />}
        />
      </div>
      <div className="flex gap-4 overflow-x-auto w-[70%]">
        <Button label="Meus bancos" icon={<CreditCard />} />
        <Button label="Meus empréstimos" icon={<Calculator />} />
        <Button label="Minhas faturas" icon={<BookOpen />} />
      </div>
      <div className="bg-sky-500 py-8 w-[60%] rounded-md px-4 mt-4">
        <p className="text-indigo-50 font-bold text-xl">Não há alertas</p>
      </div>
      <div className="flex flex-wrap justify-start max-md:hidden">
        <div className="overflow-x-auto">
          <InvoiceChart data={data?.invoices} />
        </div>
        <div>
          <BankChart data={data?.invoices} />
        </div>
      </div>
    </section>
  );
}

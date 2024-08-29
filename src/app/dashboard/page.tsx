"use client";
import Card from "@/components/Card";
import BankChart from "@/components/charts/BankChart";
import InvoiceChart from "@/components/charts/InvoiceChart";
import Loader from "@/components/Loader";
import { useAlert } from "@/hook/use-alert-contex";
import { useCalculateTotals } from "@/hook/use-calculate";
import { formatCurrency } from "@/utils/FormatterUtils";
import { useQuery } from "@tanstack/react-query";
import {
  BookUser,
  Calendar,
  ChartBar,
  FileChartColumnIncreasing,
} from "lucide-react";

export default function Dashboard() {
  const { sendAlert } = useAlert();

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch("/api/profile");
      if (!response.ok)
        sendAlert({
          title: "Ops",
          message: "Erro ao buscar perfil",
          variant: "error",
        });
      return response.json();
    },
  });

  const {
    data: invoices,
    isLoading: invoicesIsLoading,
    error: invoicesError,
  } = useQuery({
    queryKey: ["fetchInvoices"],
    queryFn: async () => {
      const response = await fetch("/api/invoice");
      if (!response.ok)
        sendAlert({
          title: "Ops",
          message: "Erro ao buscar faturas",
          variant: "error",
        });
      return response.json() as Promise<InvoiceProps[]>;
    },
  });

  const { creditTotal, annualTotal, limitTotal } = useCalculateTotals(
    invoices,
    profileData?.profile?.salary
  );

  const isLoading = profileIsLoading || invoicesIsLoading;
  const isError = profileError || invoicesError;

  const userName = profileData?.profile?.name ?? "...";
  const userSalary = profileData?.profile?.salary ?? 0;

  if (isLoading || isError) return <Loader />;

  return (
    <section>
      <h1 className="text-3xl">Dashboard</h1>
      <div className="flex flex-wrap py-4">
        <Card
          title={`Olá ${userName}`}
          subtitle="Salário líquido mensal"
          value={formatCurrency(userSalary)}
          baseTitle="Total"
          icon={<BookUser size={48} />}
        />
        <Card
          title="Seu limite"
          subtitle="Limite disponível"
          value={formatCurrency(limitTotal)}
          baseTitle={`Mês ${new Date().getMonth() + 1}`}
          icon={<ChartBar size={48} />}
        />
        <Card
          title={`Mês ${new Date().getMonth() + 1}`}
          subtitle="Fatura dos cartões de crédito"
          value={formatCurrency(creditTotal)}
          baseTitle="Mensal"
          icon={<FileChartColumnIncreasing size={48} />}
        />
        <Card
          title={`Ano ${new Date().getFullYear()}`}
          subtitle="Gastos totais anuais"
          value={formatCurrency(annualTotal)}
          baseTitle="Total"
          icon={<Calendar size={48} />}
        />
      </div>

      <div className="bg-sky-500 py-8 w-[60%] rounded-md px-4 mt-4">
        <p className="text-indigo-50 font-bold text-xl">Não há alertas</p>
      </div>
      <div className="flex flex-wrap justify-start max-md:hidden">
        <div className="overflow-x-auto">
          <InvoiceChart data={invoices || []} salary={userSalary} />
        </div>
        <div>
          <BankChart data={invoices || []} />
        </div>
      </div>
    </section>
  );
}

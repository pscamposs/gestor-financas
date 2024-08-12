import Button from "@/components/Button";
import InvoiceModal from "@/components/modal/InvoiceModal";
import useModal from "@/hook/use-modal-context";
import { formatCurrency, formatDate } from "@/utils/FormatterUtils";
import { useQuery } from "@tanstack/react-query";
import { Cross } from "lucide-react";

export default function Finances() {
  const { openModal } = useModal();

  let { data, isPending, error, refetch } = useQuery({
    queryKey: ["fetchInvoices"],
    queryFn: async () => {
      const response = await fetch("/api/invoice");
      const data: InvoiceProps[] = await response.json();
      return data;
    },
  });

  const handleCreateInvoice = () => {
    openModal(<InvoiceModal refetch={refetch} />);
  };

  const handleEditInvoice = (data: InvoiceProps) => {
    openModal(<InvoiceModal data={data} refetch={refetch} />);
  };

  const handleDeleteInvoice = async (id: number) => {
    let response = await fetch(`/api/invoice/${id}`, {
      method: "DELETE",
    });
    refetch();
  };

  return (
    <section>
      <h2 className="text-3xl">Finanças</h2>
      <p className="text-zinc-500">Tabela de faturas</p>

      <div className="p-8">
        <div className="flex justify-between my-4   ">
          <h3>Faturas</h3>
          <Button
            label="Adicionar"
            icon={<Cross />}
            onClick={handleCreateInvoice}
          />
        </div>
        <div className="relative overflow-x-auto max-h-[600px]">
          <table className="w-full text-sm text-left rtl:text-right text-zinc-600">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="py-4">ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Método</th>
                <th>Parcelas</th>
                <th>Fluxo</th>
                <th>Data</th>
                <th>Banco</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((invoice: InvoiceProps) => {
                return (
                  <tr
                    className="bg-white border-b hover:bg-zinc-50"
                    key={invoice.id}
                  >
                    <td className="py-4">{invoice.id}</td>
                    <td>{invoice.name}</td>
                    <td>{invoice.description}</td>
                    <td>{formatCurrency(invoice.value)}</td>
                    <td>{invoice.method}</td>
                    <td>{invoice.installments}</td>
                    <td>{invoice.flow}</td>
                    <td>{formatDate(invoice.date)}</td>
                    <td>
                      <div className="flex gap-2 items-center">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: invoice.bank_icon,
                          }}
                          className="w-6"
                        ></div>
                        <p>{invoice.bank_label}</p>
                      </div>
                    </td>{" "}
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="text-sky-500"
                          onClick={() => handleEditInvoice(invoice)}
                        >
                          Editar
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDeleteInvoice(invoice.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

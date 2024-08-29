import Button from "@/components/Button";
import DropDown from "@/components/Dropdown";
import Loader from "@/components/Loader";
import InvoiceModal from "@/components/modal/InvoiceModal";
import { useAlert } from "@/hook/use-alert-contex";
import { useModal } from "@/hook/use-modal-context";
import { formatCurrency, formatDate } from "@/utils/FormatterUtils";
import { useQuery } from "@tanstack/react-query";
import { BookDashed, Cross, Ellipsis } from "lucide-react";
import { useMemo } from "react";

// Componente para renderizar a tabela de faturas
const InvoicesTable = ({
  data,
  onEdit,
  onDelete,
}: {
  data: InvoiceProps[];
  onEdit: (invoice: InvoiceProps) => void;
  onDelete: (id: number) => void;
}) => {
  const rows = useMemo(() => {
    return data.map((invoice) => (
      <tr className="bg-white border-b hover:bg-zinc-50" key={invoice.id}>
        <td className="py-4">{invoice.id}</td>
        <td>{invoice.name}</td>
        <td>
          <div className="flex gap-2 items-center">
            <div
              dangerouslySetInnerHTML={{ __html: invoice.bank_icon }}
              className="w-6"
            ></div>
            <p>{invoice.bank_label}</p>
          </div>
        </td>
        <td>{formatCurrency(invoice.value)}</td>
        <td>{invoice.method}</td>
        <td>{invoice.installments}</td>
        <td>{invoice.flow}</td>
        <td>{formatDate(invoice.date)}</td>
        <td>{invoice.description}</td>
        <td>
          <DropDown
            icon={<Ellipsis />}
            options={[
              {
                label: "Editar",
                onClick: () => onEdit(invoice),
              },
              {
                label: "Excluir",
                onClick: () => onDelete(invoice.id),
              },
            ]}
          />
        </td>
      </tr>
    ));
  }, [data, onEdit, onDelete]);

  return (
    <table className="w-full text-sm text-left rtl:text-right text-zinc-600">
      <thead className="sticky top-0 bg-white">
        <tr>
          <th className="py-4">ID</th>
          <th>Nome</th>
          <th>Banco</th>
          <th>Valor</th>
          <th>Método</th>
          <th>Parcelas</th>
          <th>Fluxo</th>
          <th>Data</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default function Finances() {
  const { sendAlert } = useAlert();
  const { openModal } = useModal();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["fetchInvoices"],
    queryFn: async () => {
      const response = await fetch("/api/invoice");
      if (!response.ok) {
        const data = await response.json();
        const { message } = data;
        sendAlert({
          title: "Ops",
          message: message,
          variant: "error",
        });
      }
      return response.json() as Promise<InvoiceProps[]>;
    },
  });

  const handleCreateInvoice = () => {
    openModal(<InvoiceModal refetch={refetch} />);
  };

  const handleEditInvoice = (data: InvoiceProps) => {
    openModal(<InvoiceModal data={data} refetch={refetch} />);
  };

  const handleDeleteInvoice = async (id: number) => {
    try {
      const response = await fetch(`/api/invoice/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        const { message } = data;
        sendAlert({
          title: "Ops",
          message: message,
          variant: "error",
        });
        throw new Error(message);
      } else {
        sendAlert({
          title: "Sucesso",
          message: "Fatura excluída com sucesso",
          variant: "success",
        });
        refetch();
      }
    } catch (error) {
      sendAlert({
        title: "Ops",
        message: "Erro ao deletar a fatura",
        variant: "error",
      });
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red-500">Erro ao carregar faturas.</div>;

  return (
    <section>
      <h2 className="text-3xl">Finanças</h2>
      <p className="text-zinc-500">Tabela de faturas</p>

      <div className="p-8">
        <div className="flex justify-between my-4">
          <h3 className="text-xl font-semibold">Faturas</h3>
          <Button
            label="Adicionar"
            icon={<Cross />}
            onClick={handleCreateInvoice}
          />
        </div>
        <div className="relative overflow-x-auto max-h-[600px]">
          {data?.length ? (
            <InvoicesTable
              data={data}
              onEdit={handleEditInvoice}
              onDelete={handleDeleteInvoice}
            />
          ) : (
            <div className="text-center">
              <p className="flex justify-center gap-2 text-2xl text-zinc-400 items-center h-[calc(100dvh-500px)]">
                <BookDashed /> Nada para mostrar
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

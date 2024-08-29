import Button from "@/components/Button";
import DropDown from "@/components/Dropdown";
import Loader from "@/components/Loader";
import BankModal from "@/components/modal/BankModal";
import { useAlert } from "@/hook/use-alert-contex";
import { useModal } from "@/hook/use-modal-context";
import { useQuery } from "@tanstack/react-query";
import { BookDashed, Cross, Ellipsis } from "lucide-react";
import { useMemo } from "react";

// Componente para renderizar a tabela de bancos
const BanksTable = ({
  data,
  onEdit,
  onDelete,
}: {
  data: BankProps[];
  onEdit: (bank: BankProps) => void;
  onDelete: (id: number) => void;
}) => {
  const rows = useMemo(() => {
    return data.map((bank) => (
      <tr className="bg-white border-b hover:bg-zinc-50" key={bank.id}>
        <td className="py-4 font-normal">{bank.id}</td>
        <td>
          <div className="flex gap-2 items-center">
            <div
              dangerouslySetInnerHTML={{ __html: bank.icon }}
              className="w-6"
            ></div>
            <p>{bank.label}</p>
          </div>
        </td>
        <td>{bank.invoice_closing_day}</td>
        <td>{bank.color}</td>
        <td>
          <DropDown
            icon={<Ellipsis />}
            options={[
              {
                label: "Editar",
                onClick: () => onEdit(bank),
              },
              {
                label: "Excluir",
                onClick: () => onDelete(bank.id),
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
          <th>ID</th>
          <th>Nome do banco</th>
          <th>Dia do fechamento</th>
          <th>Cor</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default function Banks() {
  const { sendAlert } = useAlert();

  const { openModal } = useModal();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["fetchBanks"],
    queryFn: async () => {
      const response = await fetch("/api/bank");
      if (!response.ok) throw new Error("Failed to fetch banks");
      return response.json() as Promise<BankProps[]>;
    },
  });

  const handleCreateBank = () => {
    openModal(<BankModal refetch={refetch} />);
  };

  const handleEditBank = (data: BankProps) => {
    openModal(<BankModal data={data} refetch={refetch} />);
  };

  const handleDeleteBank = async (id: number) => {
    try {
      const response = await fetch(`/api/bank/${id}`, {
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
      } else {
        sendAlert({
          title: "Sucesso",
          message: "Banco excluído com sucesso",
          variant: "success",
        });
        refetch();
      }
    } catch (error) {
      sendAlert({
        title: "Ops",
        message: "Erro ao deletar o banco",
        variant: "error",
      });
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-red-500">Erro ao carregar bancos.</div>;

  return (
    <section>
      <h2 className="text-3xl">Bancos</h2>
      <p className="text-zinc-500">Tabela de bancos</p>
      <div className="p-8">
        <div className="flex justify-between my-4">
          <h3 className="text-xl font-semibold">Bancos</h3>
          <Button
            label="Adicionar"
            icon={<Cross />}
            onClick={handleCreateBank}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto max-h-[600px]">
        {data?.length ? (
          <BanksTable
            data={data}
            onEdit={handleEditBank}
            onDelete={handleDeleteBank}
          />
        ) : (
          <div className="text-center">
            <p className="flex justify-center gap-2 text-2xl text-zinc-400 items-center h-[calc(100dvh-500px)]">
              <BookDashed /> Nada para mostrar
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

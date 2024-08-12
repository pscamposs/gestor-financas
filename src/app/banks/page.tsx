import Button from "@/components/Button";
import BankModal from "@/components/modal/BankModal";
import { Table, THead } from "@/components/Table";
import useModal from "@/hook/use-modal-context";
import { useQuery } from "@tanstack/react-query";
import { Cross } from "lucide-react";

export default function Banks() {
  const { openModal } = useModal();

  let { data, isPending, error, refetch } = useQuery({
    queryKey: ["fetchInvoices"],
    queryFn: async () => {
      const response = await fetch("/api/bank");
      const data: BankProps[] = await response.json();
      return data;
    },
  });

  const handleCreateBank = () => {
    openModal(<BankModal refetch={refetch} />);
  };

  const handleEditBank = (data: BankProps) => {
    openModal(<BankModal data={data} refetch={refetch} />);
  };

  const handleDeleteBank = async (id: number) => {
    let response = await fetch(`/api/bank/${id}`, {
      method: "DELETE",
    });
    refetch();
  };

  return (
    <section>
      <h2 className="text-3xl">Bancos</h2>
      <p className="text-zinc-500">Tabela de bancos</p>
      <div className="p-8">
        <div className="flex justify-between my-4   ">
          <h3>Bancos</h3>
          <Button
            label="Adicionar"
            icon={<Cross />}
            onClick={handleCreateBank}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto max-h-[600px]">
        <Table>
          <THead>
            <th>ID</th>
            <th>Nome do banco</th>
            <th>Dia do fechamento</th>
            <th>Cor</th>
            <th>Ação</th>
          </THead>
          <tbody>
            {data?.map((bank: BankProps) => {
              return (
                <tr
                  className="bg-white border-b hover:bg-zinc-50"
                  key={bank.id}
                >
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
                    <div className="flex gap-2">
                      <button
                        className="text-sky-500"
                        onClick={() => handleEditBank(bank)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteBank(bank.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </section>
  );
}

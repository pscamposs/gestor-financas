"use client";
"use client";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { useModal } from "@/hook/use-modal-context";
import { ChangeEvent, FormEvent, useState } from "react";
import { Selector } from "../Selector";
import { useQuery } from "@tanstack/react-query";

let flowSelectorData = [
  {
    label: "Entrada",
  },
  {
    label: "Saída",
  },
];

let paymentMethodData = [
  {
    label: "Crédito",
  },
  {
    label: "Débito",
  },
  { label: "Dinheiro" },
];

interface InvoiceModalProps {
  data?: InvoiceProps;
  refetch: () => void;
}

export default function InvoiceModal({ data, refetch }: InvoiceModalProps) {
  let { closeModal } = useModal();

  let initialData = data
    ? {
        ...data,
        bank: data.bank_label,
        date: new Date(data.date).toISOString().substr(0, 10),
      }
    : {};

  let [formData, setFormData] = useState<InvoiceProps | any>(initialData);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (data) {
      setFormData((prevFormData: InvoiceProps) => ({
        ...prevFormData,
        date: new Date(data?.date).toISOString().substr(0, 10),
      }));
    }

    const response = await fetch("/api/invoice", {
      method: data ? "PUT" : "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "Application/Json",
      },
    });

    if (response.status == 200) {
      refetch();
      closeModal();
    }
  }

  const handleInputChange = (e: ChangeEvent<any>) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectorChange = (name: string, value: OptionProps[]) => {
    setFormData((prev: any) => {
      const newFormData = { ...prev };

      if (value.length === 0) {
        delete newFormData[name];
      } else if (name === "bank") {
        newFormData[name] = value[0].id;
      } else {
        newFormData[name] = value[0].label;
      }
      return newFormData;
    });
  };

  let { data: bankSelectorData, isPending } = useQuery({
    queryKey: ["fetchBanks"],
    queryFn: async () => {
      let response = await fetch("/api/bank");
      return await response.json();
    },
  });

  if (isPending) return <p>Loading...</p>;

  return (
    <div className="bg-white p-8">
      <h3 className="text-zinc-500 ">{data ? "Editar" : "Registrar"} Valor</h3>
      <form onSubmit={onSubmit}>
        <div className="flex gap-2 flex-wrap">
          <Input
            label="Nome"
            required
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
          />
          <Input
            label="Valor"
            type="currency"
            required
            description="Em centavos"
            name="value"
            value={formData?.value}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <TextArea
            label="Descrição"
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Selector
            placeholder="Selecione o método..."
            label="Tipo de Pagamento"
            options={paymentMethodData}
            name="method"
            required
            value={formData?.method}
            onChangeHandler={(value) => handleSelectorChange("method", value)}
          />
          <Input
            label="Parcelas"
            type="number"
            description="Apenas para crédito"
            name="installments"
            value={formData?.installments}
            onChange={handleInputChange}
            disabled={formData && formData.method != "Crédito"}
            required={formData && formData.method == "Crédito"}
          />
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Selector
            placeholder="Selecione o fluxo..."
            label="Fluxo"
            options={flowSelectorData}
            name="flow"
            required
            value={formData?.flow}
            onChangeHandler={(value) => handleSelectorChange("flow", value)}
          />
          <Input
            label="Data"
            type="date"
            required
            name="date"
            value={
              formData.date &&
              new Date(formData?.date).toISOString().substr(0, 10)
            }
            onChange={handleInputChange}
          />
        </div>
        <Selector
          placeholder="Selecione o banco..."
          label="Banco"
          options={bankSelectorData}
          name="bank"
          required
          value={formData?.bank}
          onChangeHandler={(value) => handleSelectorChange("bank", value)}
        />
        <div className="my-2">
          <button className="bg-sky-500 text-zinc-50 px-4 py-2">
            Finalizar
          </button>
          <button
            className="text-red-500 px-4 py-2"
            onClick={() => closeModal()}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

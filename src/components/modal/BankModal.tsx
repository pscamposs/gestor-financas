import { isValidSvg } from "@/utils/FormatterUtils";
import { Input } from "../Input";
import { TextArea } from "../TextArea";
import { useModal } from "@/hook/use-modal-context";
import { useState } from "react";
import Button from "../Button";
import { useAlert } from "@/hook/use-alert-contex";

interface InvoiceModalProps {
  data?: BankProps;
  refetch: () => void;
}

export default function BankModal({ data, refetch }: InvoiceModalProps) {
  let { closeModal } = useModal();

  let [formData, setFormData] = useState<BankProps | any>(data);
  let [isSvgValid, setIsSvgValid] = useState<boolean>(true);

  let { sendAlert } = useAlert();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (data) {
      setFormData((prevFormData: InvoiceProps) => ({
        ...prevFormData,
      }));
    }
    if (!isSvgValid) {
      sendAlert({
        title: "Erro",
        message: "Corrija o icone do banco.",
        variant: "error",
      });
      return;
    }

    const response = await fetch("/api/bank", {
      method: data ? "PUT" : "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "Application/Json",
      },
    });

    if (response.ok) {
      refetch();
      closeModal();
    } else {
      let data = await response.json();
      let { error, details } = data;
      sendAlert({
        title: error,
        message: details,
        variant: "error",
      });
    }
  }

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value: data } = e.target;

    let value: any = data;
    if (name === "image") {
      setIsSvgValid(isValidSvg(value));
    }
    if (name === "invoice_closing_day") {
      value = Number(data);
    }
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-8">
      <h3 className="text-zinc-500 ">{data ? "Editar" : "Registrar"} Banco</h3>
      <form onSubmit={onSubmit}>
        <div className="flex gap-2 flex-wrap">
          <Input
            label="Nome"
            required
            name="label"
            value={formData?.label}
            onChange={handleInputChange}
          />
          <Input
            label="Dia do fechamento"
            type="number"
            required
            description="Fatura"
            name="invoice_closing_day"
            value={formData?.invoice_closing_day}
            onChange={handleInputChange}
            max={31}
            min={1}
          />
        </div>
        <div>
          <Input
            label="Cor do banco"
            name="color"
            type="color"
            value={formData?.color}
            onChange={handleInputChange}
            required
          />
          <TextArea
            label="Icone do banco"
            name="icon"
            description="Svg"
            value={formData?.icon}
            onChange={handleInputChange}
            required
          />
          {isSvgValid ? (
            <div className="py-2">
              <p className="text-zinc-300 font-light py-2">Preview:</p>
              <div
                dangerouslySetInnerHTML={{ __html: formData?.icon }}
                className="w-7 "
              ></div>
            </div>
          ) : (
            <p className="text-red-500 py-1">Svg inválido</p>
          )}
        </div>
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

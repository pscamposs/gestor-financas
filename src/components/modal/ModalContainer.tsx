import { useModal } from "@/hook/use-modal-context";

export default function ModalContainer() {
  const { isOpen, modal } = useModal();

  if (isOpen) {
    return (
      <div className="flex justify-center items-center absolute top-0 left-0 w-dvw h-dvh bg-zinc-500/35 z-50 px-8">
        {modal}
      </div>
    );
  }
}

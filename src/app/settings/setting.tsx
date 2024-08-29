import Button from "@/components/Button";
import { Input } from "@/components/Input";
import Loader from "@/components/Loader";
import { useAlert } from "@/hook/use-alert-contex";
import { useQuery } from "@tanstack/react-query";
import { LogOut, Save } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { sendAlert } = useAlert();

  const { data, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await fetch("/api/profile");
      const data = await response.json();
      return data;
    },
  });

  const [profile, setProfile] = useState({} as ProfileProps);

  useEffect(() => {
    if (!data?.profile) return;
    setProfile(data.profile as ProfileProps);
  }, [data]);

  if (isPending) return <Loader />;

  const handleChange = (e: any) => {
    setProfile((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const salary = formData.get("salary");

    const response = await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ name, salary }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const { message } = await response.json();
      sendAlert({
        title: "Sucesso",
        message: message,
        variant: "success",
      });
    } else {
      const { error } = await response.json();
      sendAlert({
        title: error.code,
        message: error.message,
        variant: "error",
      });
    }
  };

  if (status === "loading") return <Loader />;

  return (
    <section>
      <h2 className="text-3xl">Configurações</h2>
      <p className="text-zinc-500">Personalize sua conta</p>
      <div>
        <form onSubmit={handleSave}>
          <div className="flex gap-2 flex-wrap">
            <Input
              label="Nome"
              value={profile.name}
              onChange={handleChange}
              name="name"
            />
            <Input
              label="Salário mensal"
              type="currency"
              onChange={handleChange}
              name="salary"
              value={profile.salary}
            />
          </div>
          <div className="flex gap-4 items-center">
            <Button type="submit" label="Salvar" icon={<Save />} />
            <button
              type="button"
              onClick={() => signOut()}
              className="flex gap-2 text-red-500 hover:text-red-400 "
            >
              <LogOut />
              <span>Sair</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

import { useAlert } from "@/hook/use-alert-contex";
import { AlertCircle, Check, CheckCircle } from "lucide-react";

const AlertContainer = ({ alert }: { alert: AlertProps }) => {
  return (
    <div className="flex gap-4 items-center bg-zinc-50 px-8 py-2">
      <div>
        {alert.variant === "error" && <AlertCircle className="text-red-500" />}
        {alert.variant === "success" && (
          <CheckCircle className="text-green-500" />
        )}
      </div>
      <div>
        <p className="font-bold text-gray-900">{alert.message}</p>
        <span className="font-medium text-zinc-500">{alert.title}</span>
      </div>
    </div>
  );
};

export const Alerts = () => {
  const { alerts } = useAlert();

  return (
    <div className="fixed inline-block right-4 bottom-4 z-50 divide-y-2 divide-zinc-200">
      {alerts?.map((alert) => {
        return <AlertContainer alert={alert} key={alert.title} />;
      })}
    </div>
  );
};

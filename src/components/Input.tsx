import { formatCurrency } from "@/utils/FormatterUtils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  description?: string;
}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  const [inFocus, setInFocus] = useState(false);
  const [visible, setVisible] = useState(props.type !== "password");

  const handleCurrency = () => {
    if (!props.value) return "";
    return formatCurrency(Number(props.value));
  };

  const handleType = () => {
    if (props.type == "currency" && inFocus) {
      return "number";
    } else if (props.type == "currency" && !inFocus) {
      return "text";
    } else if (props.type == "password") {
      return visible ? "text" : "password";
    } else {
      return props.type;
    }
  };

  return (
    <div className="text-sm ">
      <label
        htmlFor={props.label.toLowerCase()}
        className="block text-zinc-600 my-0.5 rounded "
      >
        {props.label}
        {props.required && <span className="text-red-600 ml-1">*</span>}
        <span className="text-xs text-zinc-300">{props.description}</span>
      </label>
      {props.type == "currency" && (
        <input className="hidden" {...props} name={props.name} />
      )}
      <div
        className={`${
          !inFocus ? "border-none" : "border-sky-500"
        }  overflow-hidden flex border`}
      >
        <input
          className="w-full bg-zinc-100 outline-none py-2 px-1.5 text-gray-700"
          {...props}
          type={handleType()}
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
          value={
            props.type == "currency" && !inFocus
              ? handleCurrency()
              : props.value
          }
          id={props.label.toLowerCase()}
        />
        {props.type == "password" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setVisible(!visible);
            }}
            className="p-1.5 bg-zinc-100 text-zinc-300"
            type="button"
          >
            {visible ? <EyeOff className="w-5" /> : <Eye className="w-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

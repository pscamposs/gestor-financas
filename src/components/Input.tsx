interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  description?: string;
}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <div className="text-sm ">
      <label
        htmlFor={props.label.toLowerCase()}
        className="block text-zinc-600 my-0.5 rounded "
      >
        {props.label}{" "}
        {props.required && <span className="text-red-600">*</span>}
        <span className="text-xs text-zinc-300 ml-1">{props.description}</span>
      </label>
      <input
        className="w-full bg-zinc-100 outline-sky-500 py-2 px-1.5 text-gray-700"
        {...props}
        id={props.label.toLowerCase()}
      />
    </div>
  );
};

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <div className="text-sm ">
      <label htmlFor={label} className="block text-zinc-600 my-0.5 rounded ">
        {label}
        {props.required && <span className="text-red-600">*</span>}

        <span className="text-xs text-zinc-300 ml-1">{props.description}</span>
      </label>
      <textarea
        className="w-full bg-zinc-100 outline-sky-500 py-2 px-1.5 text-gray-700 resize-none"
        {...props}
        id={label}
      />
    </div>
  );
};

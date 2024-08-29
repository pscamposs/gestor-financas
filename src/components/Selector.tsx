import { X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface OptionProps {
  label: string;
  icon?: string;
}

interface SelectorListItemProps {
  onClick: (option: OptionProps) => void;
  option: OptionProps;
}

interface SelectorItemProps {
  onClick: (option: OptionProps) => void;
  option: OptionProps;
}

interface SelectorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: OptionProps[];
  onChangeHandler?: (selectedItems: OptionProps[]) => void;
}

const SelectorListItem: React.FC<SelectorListItemProps> = ({
  onClick,
  option,
}) => (
  <li
    className="cursor-pointer p-2 bg-zinc-50 hover:bg-zinc-200 transition-all"
    onClick={() => onClick(option)}
    aria-label={option.label}
  >
    <div className="flex items-center gap-2">
      {option.icon && (
        <div
          dangerouslySetInnerHTML={{ __html: option.icon }}
          className="w-6"
        />
      )}
      {option.label}
    </div>
  </li>
);

const SelectorItem: React.FC<SelectorItemProps> = ({ onClick, option }) => (
  <button
    className="flex bg-sky-200 text-xs items-center gap-1 p-1.5 hover:bg-sky-100 transition-all"
    onClick={() => onClick(option)}
    aria-label={`Remove ${option.label}`}
  >
    <div className="flex items-center gap-2">
      {option.icon && (
        <div
          dangerouslySetInnerHTML={{ __html: option.icon }}
          className="w-6"
        />
      )}
      {option.label}
    </div>
    <X size={12} />
  </button>
);

export const Selector: React.FC<SelectorProps> = ({
  label,
  options,
  onChangeHandler,
  ...props
}) => {
  const [selectedItems, setSelectedItems] = useState<OptionProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] =
    useState<OptionProps[]>(options);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectItem = (option: OptionProps) => {
    setIsOpen(false);
    if (selectedItems.some((item) => item.label === option.label)) return;
    const newSelectedItems = [...selectedItems, option];
    setSelectedItems(newSelectedItems);
    inputRef.current?.setAttribute("value", option.label);
    onChangeHandler?.(newSelectedItems);
  };

  const handleRemoveItem = (option: OptionProps) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.label !== option.label
    );
    setSelectedItems(newSelectedItems);
    inputRef.current?.setAttribute("value", "");
    setFilteredOptions(options);
    onChangeHandler?.(newSelectedItems);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setFilteredOptions(
      options.filter((option) => option.label.toLowerCase().includes(value))
    );
    setIsOpen(true);
  };

  const handleDocumentClick = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  return (
    <div className="text-sm w-full" ref={containerRef}>
      <label htmlFor={label} className="block text-zinc-600 my-0.5 rounded">
        {label} {props.required && <span className="text-red-600">*</span>}
      </label>
      <div className="relative bg-zinc-100 outline-sky-500 text-gray-700 pb-1">
        <input
          {...props}
          type="text"
          className="w-full bg-inherit outline-none py-2 px-1.5"
          onFocus={() => setIsOpen(true)}
          onChange={handleInputChange}
          ref={inputRef}
          aria-haspopup="listbox"
          aria-activedescendant={
            selectedItems.length ? selectedItems[0].label : undefined
          }
        />
        <div className="flex gap-1 flex-wrap pl-1">
          {selectedItems.map((item) => (
            <SelectorItem
              key={item.label}
              option={item}
              onClick={handleRemoveItem}
            />
          ))}
        </div>
        {isOpen && (
          <ul
            className="absolute bg-zinc-100 z-20 w-full my-1.5 rounded overflow-hidden"
            role="listbox"
            aria-expanded={isOpen}
          >
            {filteredOptions.map((option) => (
              <SelectorListItem
                key={option.label}
                option={option}
                onClick={handleSelectItem}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

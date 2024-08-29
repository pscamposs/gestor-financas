interface ProfileProps {
  id?: number;
  name?: string;
  salary?: number;
  email?: string;
}

interface InvoiceProps {
  id: number;
  name: string;
  description: string;
  value: number;
  method: string;
  installments: number;
  flow: string;
  date: string;
  bank_label: string;
  bank_color: string;
  bank_icon: string;
  bank_closing_day: number;
}

interface DashboardProps {
  profile: ProfileProps;
  invoices: InvoiceProps[];
}

interface BankProps {
  id: number;
  label: string;
  color: string;
  icon: string;
  invoice_closing_day: number;
}

interface SelectorProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: OptionProps[];
  onChangeHandler?: (value: OptionProps[]) => void;
}

interface SelectorListItemProps {
  option: OptionProps;
  onClick: (option: OptionProps) => void;
}

interface OptionProps {
  id?: number;
  icon?: string;
  label: string;
}

interface SelectorItemProps {
  option: OptionProps;
  onClick: (option: OptionProps) => void;
}

interface AlertProps {
  title: string;
  message: string;
  variant: "success" | "error";
}

interface AlertContextProps {
  sendAlert: (alert: AlertProps) => void;
  alerts: AlertProps[];
}
